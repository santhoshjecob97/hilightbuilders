# HILIGHT BUILDERS Data Model

The Drizzle/MySQL schema is the source of truth. New feature tables are created with additive migrations; the same managed database is used by preview/development and publication.

| Entity | Purpose | Privacy / editorial rules |
|---|---|---|
| `leads` | Residential, commercial, construction and general enquiries; contact and qualification details, source, status, notes and follow-up date | Admin-only; no PII to analytics |
| `lead_status_history` | Ordered lead lifecycle transitions and optional notes | Admin-only audit trail |
| `uploaded_floor_plans` | Lead relation, random storage key, validated MIME/size and upload date | Key never shown publicly; authenticated admin only |
| `projects` | Portfolio metadata, scope, concept, materials, project type, status, location/area where verified | Concept records stay labelled; no invented completed work |
| `project_images` | Gallery URL, alt text and ordering | Use approved image or labelled concept |
| `services` | Editable service copy and visibility | Only verified offerings published |
| `blog_posts` | SEO title, description, category, content, slug and status | Sample/draft until editorial approval |
| `testimonials` | Client quote and approval flag | Empty unless source supplied; not public before approval |
| `team_members` | Approved name, role, biography and photo | No invented personal claims |
| `contact_enquiries` | Separate general contact form records where applicable | Admin-only; consent captured |

Lead statuses: `NEW`, `CONTACTED`, `QUALIFIED`, `CONSULTATION`, `SITE_VISIT`, `PROPOSAL`, `NEGOTIATION`, `WON`, `LOST`. Sources: Organic Search, Google Ads, Meta Ads, Instagram, LinkedIn, WhatsApp, Referral, Direct, Other. The public submit endpoint maps only allowlisted source values. Admin access and all mutations are checked server-side.
