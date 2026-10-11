import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const leadStatuses = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "CONSULTATION",
  "SITE_VISIT",
  "PROPOSAL",
  "NEGOTIATION",
  "WON",
  "LOST",
] as const;
export const leadSources = [
  "Organic Search",
  "Google Ads",
  "Meta Ads",
  "Instagram",
  "LinkedIn",
  "WhatsApp",
  "Referral",
  "Direct",
  "Other",
] as const;
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  submissionKey: varchar("submissionKey", { length: 64 }).notNull().unique(),
  kind: mysqlEnum("kind", [
    "residential",
    "commercial",
    "construction",
    "general",
  ]).notNull(),
  fullName: varchar("fullName", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 24 }).notNull(),
  email: varchar("email", { length: 320 }),
  location: varchar("location", { length: 200 }).notNull(),
  companyName: varchar("companyName", { length: 200 }),
  designation: varchar("designation", { length: 120 }),
  businessType: varchar("businessType", { length: 140 }),
  propertyType: varchar("propertyType", { length: 100 }),
  area: varchar("area", { length: 60 }),
  bedrooms: varchar("bedrooms", { length: 30 }),
  projectType: varchar("projectType", { length: 100 }),
  serviceRequirements: text("serviceRequirements"),
  budget: varchar("budget", { length: 80 }),
  startDate: varchar("startDate", { length: 100 }),
  possessionStatus: varchar("possessionStatus", { length: 100 }),
  requirements: text("requirements"),
  consent: boolean("consent").notNull().default(false),
  status: mysqlEnum("status", leadStatuses).notNull().default("NEW"),
  source: mysqlEnum("source", leadSources).notNull().default("Direct"),
  notes: text("notes"),
  followUpAt: timestamp("followUpAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Lead = typeof leads.$inferSelect;
export const leadStatusHistory = mysqlTable("lead_status_history", {
  id: int("id").autoincrement().primaryKey(),
  leadId: int("leadId").notNull(),
  status: mysqlEnum("status", leadStatuses).notNull(),
  changedBy: int("changedBy"),
  note: text("note"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export const uploadedFloorPlans = mysqlTable("uploaded_floor_plans", {
  id: int("id").autoincrement().primaryKey(),
  leadId: int("leadId").notNull(),
  storageKey: varchar("storageKey", { length: 500 }).notNull(),
  fileName: varchar("fileName", { length: 200 }).notNull(),
  mimeType: varchar("mimeType", { length: 80 }).notNull(),
  sizeBytes: int("sizeBytes").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  projectType: mysqlEnum("projectType", [
    "Residential",
    "Commercial",
    "Kitchen",
    "Living Room",
    "Bedroom",
    "Office",
    "Retail",
    "Renovation",
  ]).notNull(),
  location: varchar("location", { length: 200 }),
  area: varchar("area", { length: 80 }),
  scope: text("scope"),
  concept: text("concept"),
  materialDirection: text("materialDirection"),
  status: mysqlEnum("status", ["concept", "in_progress", "completed"])
    .notNull()
    .default("concept"),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export const projectImages = mysqlTable("project_images", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  imageUrl: varchar("imageUrl", { length: 600 }).notNull(),
  altText: varchar("altText", { length: 300 }).notNull(),
  sortOrder: int("sortOrder").notNull().default(0),
});
export const services = mysqlTable("services", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  title: varchar("title", { length: 180 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description").notNull(),
  published: boolean("published").notNull().default(false),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  title: varchar("title", { length: 220 }).notNull(),
  description: varchar("description", { length: 320 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  content: text("content").notNull(),
  status: mysqlEnum("status", ["draft", "sample", "published"])
    .notNull()
    .default("draft"),
  publishedAt: timestamp("publishedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  clientName: varchar("clientName", { length: 180 }).notNull(),
  quote: text("quote").notNull(),
  projectId: int("projectId"),
  approved: boolean("approved").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export const teamMembers = mysqlTable("team_members", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 180 }).notNull(),
  role: varchar("role", { length: 140 }).notNull(),
  biography: text("biography"),
  photoUrl: varchar("photoUrl", { length: 600 }),
  approved: boolean("approved").notNull().default(false),
  sortOrder: int("sortOrder").notNull().default(0),
});
export const contactEnquiries = mysqlTable("contact_enquiries", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 24 }).notNull(),
  email: varchar("email", { length: 320 }),
  enquiryType: varchar("enquiryType", { length: 60 }).notNull(),
  message: text("message"),
  consent: boolean("consent").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
