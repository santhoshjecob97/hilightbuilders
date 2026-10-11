import { and, desc, eq, like, or } from "drizzle-orm";
import { getDb } from "./db";
import {
  leadStatusHistory,
  leads,
  uploadedFloorPlans,
  type Lead,
} from "../drizzle/schema";
import type { LeadSubmitInput } from "./leadRouter";

export async function findLeadBySubmissionKey(key: string) {
  const db = await getDb();
  if (!db) throw new Error("Lead database is unavailable.");
  const rows = await db
    .select({ id: leads.id })
    .from(leads)
    .where(eq(leads.submissionKey, key))
    .limit(1);
  return rows[0];
}
export async function createLead(
  input: LeadSubmitInput,
  key: string,
  file?: {
    storageKey: string;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
  }
) {
  const db = await getDb();
  if (!db) throw new Error("Lead database is unavailable.");
  return db.transaction(async tx => {
    const found = await tx
      .select({ id: leads.id })
      .from(leads)
      .where(eq(leads.submissionKey, key))
      .limit(1);
    if (found[0]) return { id: found[0].id, duplicate: true };
    const {
      floorPlan: _floorPlan,
      website: _website,
      submissionKey: _key,
      consent,
      ...fields
    } = input;
    const inserted = await tx
      .insert(leads)
      .values({
        ...fields,
        consent: Boolean(consent),
        submissionKey: key,
        status: "NEW",
      });
    const id = Number(inserted[0].insertId);
    await tx
      .insert(leadStatusHistory)
      .values({ leadId: id, status: "NEW", note: "Enquiry received" });
    if (file)
      await tx.insert(uploadedFloorPlans).values({ leadId: id, ...file });
    return { id, duplicate: false };
  });
}
export async function listLeads(
  filter: { status?: string; query?: string } = {}
) {
  const db = await getDb();
  if (!db) throw new Error("Lead database is unavailable.");
  const where = [];
  if (filter.status)
    where.push(eq(leads.status, filter.status as Lead["status"]));
  const query = filter.query?.trim();
  if (query) {
    const pattern = `%${query.slice(0, 120)}%`;
    where.push(
      or(
        like(leads.fullName, pattern),
        like(leads.phone, pattern),
        like(leads.email, pattern),
        like(leads.location, pattern),
        like(leads.companyName, pattern),
        like(leads.serviceRequirements, pattern)
      )!
    );
  }
  return db
    .select()
    .from(leads)
    .where(where.length ? and(...where) : undefined)
    .orderBy(desc(leads.createdAt))
    .limit(250);
}
export async function changeLeadStatus(
  id: number,
  status: Lead["status"],
  adminId: number
) {
  const db = await getDb();
  if (!db) throw new Error("Lead database is unavailable.");
  await db.transaction(async tx => {
    await tx
      .update(leads)
      .set({ status, updatedAt: new Date() })
      .where(eq(leads.id, id));
    await tx
      .insert(leadStatusHistory)
      .values({ leadId: id, status, changedBy: adminId });
  });
  return { success: true };
}
export async function saveLeadNote(
  id: number,
  note: string,
  followUp?: Date | null
) {
  const db = await getDb();
  if (!db) throw new Error("Lead database is unavailable.");
  await db
    .update(leads)
    .set({ notes: note, followUpAt: followUp ?? null, updatedAt: new Date() })
    .where(eq(leads.id, id));
  return { success: true };
}
export async function exportLeads() {
  const db = await getDb();
  if (!db) throw new Error("Lead database is unavailable.");
  return db.select().from(leads).orderBy(desc(leads.createdAt)).limit(5000);
}
export async function getLeadFloorPlans(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Lead database is unavailable.");
  return db
    .select()
    .from(uploadedFloorPlans)
    .where(eq(uploadedFloorPlans.leadId, id));
}
