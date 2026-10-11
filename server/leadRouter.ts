import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure, adminProcedure } from "./_core/trpc";
import {
  changeLeadStatus,
  createLead,
  exportLeads,
  findLeadBySubmissionKey,
  getLeadFloorPlans,
  listLeads,
  saveLeadNote,
} from "./leadDb";
import { storageGetSignedUrl, storagePut } from "./storage";
import { leadSources, leadStatuses } from "../drizzle/schema";

const sourceSchema = z.enum(leadSources).catch("Other");
const fileSchema = z
  .object({
    fileName: z.string().trim().min(1).max(200),
    mimeType: z.enum(["application/pdf", "image/jpeg", "image/png"]),
    dataBase64: z.string().max(7_000_000),
  })
  .optional();
export const submitSchema = z
  .object({
    kind: z.enum(["residential", "commercial", "construction", "general"]),
    fullName: z.string().trim().min(2).max(160),
    phone: z
      .string()
      .trim()
      .regex(
        /^(?:\+?91[\s-]?)?[6-9]\d{9}$/,
        "Enter a valid Indian mobile number."
      ),
    email: z.string().trim().email().max(320).optional().or(z.literal("")),
    location: z.string().trim().min(2).max(200),
    companyName: z.string().max(200).optional(),
    designation: z.string().max(120).optional(),
    businessType: z.string().max(140).optional(),
    propertyType: z.string().max(100).optional(),
    area: z.string().max(60).optional(),
    bedrooms: z.string().max(30).optional(),
    projectType: z.string().max(100).optional(),
    serviceRequirements: z.string().max(1500).optional(),
    budget: z.string().max(80).optional(),
    startDate: z.string().max(100).optional(),
    possessionStatus: z.string().max(100).optional(),
    requirements: z.string().max(3000).optional(),
    consent: z.union([z.literal("yes"), z.literal(true)]),
    source: sourceSchema,
    website: z.string().max(500).optional(),
    submissionKey: z.string().uuid(),
    floorPlan: fileSchema,
  })
  .superRefine((v, ctx) => {
    if (v.kind === "commercial" && !v.email)
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Email is required for commercial enquiries.",
      });
    if (v.kind === "commercial" && !v.companyName?.trim())
      ctx.addIssue({
        code: "custom",
        path: ["companyName"],
        message: "Company name is required.",
      });
    if (v.kind === "commercial" && !v.businessType?.trim())
      ctx.addIssue({
        code: "custom",
        path: ["businessType"],
        message: "Business type is required.",
      });
  });
export type LeadSubmitInput = z.infer<typeof submitSchema>;

const requests = new Map<string, number[]>();
function allowRequest(ip: string) {
  const now = Date.now();
  const recent = (requests.get(ip) || []).filter(t => now - t < 15 * 60_000);
  if (recent.length >= 6) return false;
  recent.push(now);
  requests.set(ip, recent);
  if (requests.size > 5000)
    for (const [key, vals] of requests) {
      if (!vals.some(t => now - t < 15 * 60_000)) requests.delete(key);
    }
  return true;
}
function csvCell(value: unknown) {
  const text = String(value ?? "").replace(/[\r\n]+/g, " ");
  const safe = /^[=+\-@\t]/.test(text) ? `'${text}` : text;
  return `"${safe.replace(/"/g, '""')}"`;
}

export const leadRouter = router({
  submit: publicProcedure
    .input(submitSchema)
    .mutation(async ({ ctx, input }) => {
      if (input.website?.trim()) return { received: true };
      const ip = String(
        ctx.req.ip || ctx.req.socket.remoteAddress || "unknown"
      ).slice(0, 90);
      if (!allowRequest(ip))
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message:
            "Too many enquiries from this connection. Please try again later.",
        });
      const existing = await findLeadBySubmissionKey(input.submissionKey);
      if (existing) return { received: true };
      let file:
        | {
            storageKey: string;
            fileName: string;
            mimeType: string;
            sizeBytes: number;
          }
        | undefined;
      if (input.floorPlan) {
        let bytes: Buffer;
        try {
          bytes = Buffer.from(input.floorPlan.dataBase64, "base64");
        } catch {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "The floor-plan file could not be read.",
          });
        }
        if (bytes.length < 1 || bytes.length > 5 * 1024 * 1024)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Floor plans must be 5 MB or smaller.",
          });
        const signatures: Record<string, (b: Buffer) => boolean> = {
          "application/pdf": b => b.subarray(0, 5).toString() === "%PDF-",
          "image/jpeg": b => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
          "image/png": b =>
            b
              .subarray(0, 8)
              .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
        };
        if (!signatures[input.floorPlan.mimeType](bytes))
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "The file contents do not match a supported PDF/JPG/PNG type.",
          });
        const extension =
          input.floorPlan.mimeType === "application/pdf"
            ? "pdf"
            : input.floorPlan.mimeType === "image/png"
              ? "png"
              : "jpg";
        try {
          const stored = await storagePut(
            `floor-plans/${crypto.randomUUID()}.${extension}`,
            bytes,
            input.floorPlan.mimeType
          );
          file = {
            storageKey: stored.key,
            fileName: input.floorPlan.fileName
              .replace(/[\/\\\x00-\x1f]/g, "_")
              .slice(0, 200),
            mimeType: input.floorPlan.mimeType,
            sizeBytes: bytes.length,
          };
        } catch (error) {
          console.error(
            "[Lead upload] Storage unavailable",
            error instanceof Error ? error.message : "unknown"
          );
          throw new TRPCError({
            code: "SERVICE_UNAVAILABLE",
            message:
              "Secure floor-plan storage is unavailable; no enquiry was confirmed. Remove the attachment and retry, or contact us by email.",
          });
        }
      }
      try {
        await createLead(input, input.submissionKey, file);
        return { received: true };
      } catch (error) {
        console.error(
          "[Lead submit] Database unavailable",
          error instanceof Error ? error.message : "unknown"
        );
        throw new TRPCError({
          code: "SERVICE_UNAVAILABLE",
          message: "The enquiry could not be stored. Please try again shortly.",
        });
      }
    }),
});

export const adminRouter = router({
  listLeads: adminProcedure
    .input(
      z
        .object({
          status: z.enum(leadStatuses).optional(),
          query: z.string().max(120).optional(),
        })
        .optional()
    )
    .query(({ input }) => listLeads(input || {})),
  updateLead: adminProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        status: z.enum(leadStatuses),
        note: z.string().max(3000).optional(),
        followUpAt: z.date().nullable().optional(),
      })
    )
    .mutation(({ ctx, input }) =>
      input.note !== undefined
        ? saveLeadNote(input.id, input.note, input.followUpAt)
        : changeLeadStatus(input.id, input.status, ctx.user.id)
    ),
  exportLeads: adminProcedure.query(async () => {
    const rows = await exportLeads();
    const headers = [
      "id",
      "kind",
      "fullName",
      "phone",
      "email",
      "location",
      "companyName",
      "businessType",
      "propertyType",
      "area",
      "projectType",
      "serviceRequirements",
      "budget",
      "startDate",
      "status",
      "source",
      "consent",
      "createdAt",
    ];
    return [
      headers.join(","),
      ...rows.map(row =>
        headers.map(key => csvCell(row[key as keyof typeof row])).join(",")
      ),
    ].join("\\r\\n");
  }),
  floorPlans: adminProcedure
    .input(z.object({ leadId: z.number().int().positive() }))
    .query(async ({ input }) => {
      const docs = await getLeadFloorPlans(input.leadId);
      return Promise.all(
        docs.map(async doc => ({
          ...doc,
          downloadUrl: await storageGetSignedUrl(doc.storageKey),
        }))
      );
    }),
});
