# HILIGHT BUILDERS — Website Plan

## Implementation approach

Use the initialized Manus-managed `web-db-user` stack: React 19, TypeScript 5.9, Vite 7, Wouter, Tailwind 4, Express 4, tRPC 11, Drizzle ORM 0.44 and managed MySQL. This differs from the preferred Next.js option because the initialized project already provides a maintained full-stack React/Express/database foundation, authenticated-user support, migrations, protected server procedures and a managed preview. Reuse those foundations rather than maintaining two frameworks. Package versions are pinned by `package.json` and `pnpm-lock.yaml`.

The first release prioritizes a cinematic-but-lightweight home hero, dedicated residential/commercial enquiry landing pages, an explicitly concept-labelled portfolio and reliable server-confirmed forms. Heavy real-time 3D is deferred until the core site is fast, responsive and converting; the first hero uses generated architectural imagery, CSS composition and restrained reduced-motion-aware reveals. The app also provides Construction & Turnkey, Process, About, Insights, Contact and Privacy/Terms/Consent pages. Shared header/footer, responsive navigation, section primitives, service content, article templates, enquiry forms and page metadata live in reusable modules. A private `/admin` lead inbox uses the starter’s real Manus OAuth session and server-side admin authorization; it will not expose lead data to public procedures. Drizzle migrations define lead, status-history, project/content and upload-index structures; portfolio/blog/team editing UI is staged for a follow-on rather than claimed here. Public enquiry writes use validated, rate-limited server procedures and database transactions where appropriate; forms show success only after server acknowledgement. Optional integrations are configuration-gated, not simulated.

The user supplied the HILIGHT Builders logo image; use it as the official visual mark and retain a source copy. The supplied material does not include project records or photography, testimonials, the exact phone/WhatsApp number, business hours, CRM, email provider, or a verified map pin. Do not fabricate these. Use contact details that were supplied, label created imagery and portfolio entries as **concept visualisations**, and hide phone/WhatsApp actions until a usable verified business number is configured. Do not claim the listed address is a staffed showroom or display an unverified map marker. Document configuration gaps clearly.

## Sitemap

- `/` — Home
- `/residential` — Residential interiors and home enquiry
- `/commercial` — Commercial interiors and commercial enquiry
- `/construction` — Construction, renovation and turnkey
- `/projects` — Filterable portfolio, with no invented completed projects
- `/process` — Twelve-stage project journey
- `/about` — Company and named leadership, with editable biography/photo placeholders
- `/insights` — Sample-labelled SEO-friendly insight index
- `/insights/:slug` — Sample-labelled article detail
- `/contact` — Verified contact details and general/residential/commercial enquiry choices
- `/privacy`, `/terms`, `/consent`, `/cookies` — Editable legal information, marked for company/legal review
- `/admin` — Authenticated private lead inbox, lifecycle updates, notes, follow-up, export and secure floor-plan links; server-enforced admin role

## Design system

- **Design movement:** Contemporary South Indian architectural editorial, with the restraint of a premium architecture journal and cinematic residential photography.
- **Core principles:** Architectural composition; warm, precise material storytelling; explicit scope and trust; conversion cues without pressure.
- **Color philosophy:** Charcoal `#17191C` / `#202328` anchors the work in confident permanence; warm white `#F5F3EF` makes surfaces feel tactile and humane; white supports readability; grey `#A6A8AB` is secondary; signature orange `#F39800` and deep orange `#D66A00` provide rare, decisive wayfinding and action emphasis, not glow or decoration.
- **Layout paradigm:** Asymmetric editorial columns and offset imagery, generous margins, alternating full-bleed photographs and contained text, a project index with varied image aspect ratios. On narrow screens, collapse cleanly to one column without horizontal overflow.
- **Signature elements:** A fine orange construction-line rule; restrained architectural corner/plan geometry in the mark and section labels; oversized chapter numerals in the process presentation.
- **Interaction philosophy:** Navigation and filters are obvious and keyboard accessible; image hover is supplementary; calls to action remain clear on touch. Forms provide inline error/working/success/failure states.
- **Animation:** Brief opacity/translate image reveals and restrained parallax only where useful; no continuous 3D or audio. CSS fallback first, IntersectionObserver/reduced-motion-aware reveal, no layout shift, and all motion disabled or reduced under `prefers-reduced-motion`.
- **Typography system:** Manrope for display and Inter for body/UI, with responsive clamp-based editorial headings, readable body line length, modest tracking on labels, and minimum comfortable mobile sizes.
- **Brand essence:** A Chennai-based partner for homeowners and business decision-makers seeking coordinated interiors, construction, renovation and turnkey delivery; precise, premium, dependable.
- **Brand voice:** Clear, specific and respectful, with no unsupported superlatives. Examples: “Spaces that inspire. Built on trust.” and “Tell us what you’re planning; we’ll help clarify the next step.”
- **Wordmark & logo:** Use the supplied orange HILIGHT monogram as the official mark, paired with a precise HILIGHT BUILDERS wordmark and tagline. The original JPEG stays intact; a transparent website rendition may be derived for clean placement. Use its actual hosted HTTPS asset URL in project logo metadata.
- **Signature brand color:** HILIGHT orange `#F39800`.

## Data and integrations

Persist enquiries and lifecycle changes in managed MySQL. Proposed entities: `leads`, `lead_status_history`, `projects`, `project_images`, `services`, `blog_posts`, `testimonials` (approval-gated and empty absent real source material), `team_members`, and `uploaded_floor_plans`; store lead source from validated campaign/referrer tags where available, never user PII in analytics. Lead statuses are `NEW`, `CONTACTED`, `QUALIFIED`, `CONSULTATION`, `SITE_VISIT`, `PROPOSAL`, `NEGOTIATION`, `WON`, `LOST`. Admin role check is server-side and uses real OAuth identity/owner authorization, not a public flag. Uploaded plans require server-side size/type checks, opaque object keys and authorization; do not return private files publicly.

Provide `.env.example` for business configuration and analytics identifiers (no secrets), but all secrets remain in platform secret configuration. GA4, Ads, Meta Pixel, CRM, email and Maps remain off until configured; consent governs optional marketing tags. WhatsApp/call actions appear only with a verified business number. Do not display an address map until the location/pin is verified. Acknowledgement email is sent only after an email transport is configured. Add SEO titles/descriptions/canonicals/OG, semantic headings, descriptive alt, sitemap, robots, LocalBusiness JSON-LD limited to verified facts, and accurate route manifest.

## Project structure

- `client/src/App.tsx` — Wouter route declarations and app providers.
- `client/src/pages/` — Public route pages plus protected admin view.
- `client/src/components/` — Shared site shell, navigation, footer, section primitives, consent UI, enquiry forms, portfolio filters and admin components.
- `client/src/lib/` — tRPC client, analytics hooks and safe configuration helpers.
- `client/src/index.css` — Design tokens, typography, global accessibility and responsive styles.
- `client/public/` — Static route manifest, robots, sitemap and favicon/metadata resources.
- `server/routers.ts` and feature routers — Public validated submissions, admin-only lead/content operations, health endpoint.
- `server/db.ts` and feature query modules — Database reads/writes.
- `drizzle/schema.ts`, `drizzle/*.sql` — Relational schema and additive MySQL migrations.
- `shared/` — Shared input/output types and validation schemas.
- Project root docs — `TODO.md`, `.env.example`, `README.md`, deployment, maintenance and QA documentation.

## Delivery boundary

Build and verify the managed Preview, route manifest, forms, authorization boundary, migrations, SEO, accessibility and mobile layout. Do not claim a fully configured CRM/email/marketing integration, verified portfolio, verified logo, business WhatsApp/call/map or production legal review until the missing business inputs or credentials are supplied. Checkpoint the implementation; publish only if the project’s existing publishing configuration and workflow explicitly permit it.
