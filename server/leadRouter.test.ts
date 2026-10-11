import { describe, expect, it } from "vitest";
import { TRPCError } from "@trpc/server";
import { adminRouter } from "./leadRouter";
import { submitSchema } from "./leadRouter";
import { getPageMeta, renderSeoShell } from "../shared/siteMeta";
import type { TrpcContext } from "./_core/context";

const base = {
  kind: "residential",
  fullName: "Asha Kumar",
  phone: "+91 9876543210",
  location: "Vadapalani, Chennai",
  consent: true,
  source: "Direct",
  submissionKey: "3bc6caaa-90df-4a18-8687-c0304db34cdd",
};
describe("lead submission validation", () => {
  it("accepts a valid residential enquiry with explicit contact consent", () => {
    expect(submitSchema.parse(base).consent).toBe(true);
  });
  it("rejects malformed Indian mobile numbers", () => {
    expect(() => submitSchema.parse({ ...base, phone: "123" })).toThrow();
  });
  it("requires a contactable email, company and business type for commercial leads", () => {
    expect(() => submitSchema.parse({ ...base, kind: "commercial" })).toThrow();
    expect(
      submitSchema.parse({
        ...base,
        kind: "commercial",
        email: "owner@example.in",
        companyName: "Studio",
        businessType: "Office",
      }).kind
    ).toBe("commercial");
  });
  it("accepts only the supported, size-bounded upload types", () => {
    expect(() =>
      submitSchema.parse({
        ...base,
        floorPlan: {
          fileName: "plan.exe",
          mimeType: "application/octet-stream",
          dataBase64: "AAAA",
        },
      })
    ).toThrow();
    expect(() =>
      submitSchema.parse({
        ...base,
        floorPlan: {
          fileName: "large.pdf",
          mimeType: "application/pdf",
          dataBase64: "A".repeat(7_000_001),
        },
      })
    ).toThrow();
  });
});

describe("admin authorization boundary", () => {
  it("rejects an unauthenticated lead-list request before accessing the database", async () => {
    const ctx = { req: {}, res: {}, user: null } as unknown as TrpcContext;
    await expect(
      adminRouter.createCaller(ctx).listLeads()
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
  it("rejects a signed-in non-admin", async () => {
    const ctx = {
      req: {},
      res: {},
      user: { id: 1, role: "user" },
    } as unknown as TrpcContext;
    await expect(
      adminRouter.createCaller(ctx).listLeads()
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

describe("route metadata", () => {
  it("provides specific, sample-labelled insight pages and a real noindex fallback", () => {
    expect(getPageMeta("/insights/planning-home-interiors").title).toContain(
      "Home Interiors"
    );
    expect(getPageMeta("/insights/missing-slug").noindex).toBe(true);
  });
  it("omits guessed canonical URLs and includes one only for configured HTTPS domains", () => {
    const shell =
      "<title>__SEO_TITLE__</title>__SEO_CANONICAL____SEO_NOSCRIPT__";
    expect(renderSeoShell(shell, "/residential")).not.toContain("canonical");
    expect(
      renderSeoShell(shell, "/residential", "https://www.example.test")
    ).toContain("https://www.example.test/residential");
  });
});
