# HILIGHT BUILDERS website

A managed, responsive website for HILIGHT BUILDERS, a Chennai interiors, construction, renovation and turnkey business. This release is optimized for mobile-first enquiries, with a restrained architectural/editorial look in charcoal, warm ivory and signature orange. The hero and portfolio visuals are AI-created **concept visualisations**, not claims of HILIGHT project work. The original supplied logo is retained and used.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Cinematic hero, consultation CTA, residential/commercial chooser, services, concept previews, process and verified contact |
| `/residential` | Home-interiors service scope, material direction, FAQs and a residential lead form |
| `/commercial` | Offices, retail, hospitality, clinics and commercial enquiry path |
| `/construction` | Construction coordination, renovation and turnkey scope |
| `/projects` | Filterable, clearly labelled concept-visualisation gallery |
| `/process` | Twelve typical steps from enquiry to handover |
| `/about` | Supplied leadership roles and business philosophy, without unverified bios |
| `/insights`, `/insights/:slug` | Sample editorial content explicitly marked for review |
| `/contact` | Supplied business address/email/phone, WhatsApp and general/Residential/Commercial enquiry choices |
| `/privacy`, `/terms`, `/consent`, `/cookies` | Editable drafts; business/legal review required before publication |
| `/admin` | OAuth-gated private lead operations |

`client/public/manus-routes.json` declares page routes. The platform handles `/sitemap.xml` and `/robots.txt`; review the generated sitemap and canonical-domain behavior after the real public domain is configured. No business domain is set yet, so server-generated canonicals and absolute social URLs are omitted rather than guessed.

## Stack and data flow

React 19, TypeScript 5.9, Vite 7, Wouter, Tailwind 4, Express 4, tRPC 11, Drizzle ORM 0.44 and managed MySQL, following the initialized Manus `web-db-user` starter. The application builds to `dist/public` and `dist/index.js`. It listens on `PORT` (3000 by default), binds the managed Preview interface, and exposes unauthenticated health at `/api/health`.

Public lead forms validate client and server data, normalize Indian mobile digits, require contact consent, deduplicate by a submission key, rate-limit repeated enquiries and store acknowledgement only after a committed MySQL insert. Residential, commercial, construction and general forms support optional PDF/JPG/PNG plans up to 5 MB. The server checks MIME signatures, stores opaque files via project storage, and issues short-lived signed downloads only after admin authorization. External email/CRM integrations have not been configured; no customer-email confirmation or external CRM sync is implied.

`/admin` uses real Manus OAuth identity and a server-side `admin` role check. Authorized staff can search/filter the latest 250 enquiries, update status, read/update notes and follow-up time, request signed plan links and export up to 5,000 authorized records as CSV. Public procedures do not expose lead records. SQL tables for projects/images, services, articles, team members and testimonials are prepared, but the user-facing admin content editor is not included in this first release; current public concept and sample content is source-controlled.

The supplied public contact is configured once in `client/src/data/businessConfig.ts` as `+91 90031 66068`, and used for `wa.me` and `tel:` links. This number is public information. The email is `midsrini@gmail.com`, the address is `No. 10/19, 1st Street, SSB Nagar, Vadapalani, Chennai – 600026`, and supplied GSTIN is `33EFBPS5010A1Z5`. Business hours and a verified map pin are not provided.

## Run and verify

```bash
pnpm dev
pnpm check
pnpm test
pnpm build
pnpm db:migrate
```

Do not use destructive schema resets. The managed MySQL database is shared between development/Preview and production. Validation used synthetic or read-only checks; do not send test leads containing real customer information.

Application code, logo assets, checked-in additive migrations and project guidance are kept in the canonical Git repository. `app.config.ts` points the Manus project branding to the durable HTTPS logo CDN. This project currently has auto-publish off; a checkpoint and a production publish are different operations.

## Launch gates

Before using a production domain, set and verify `PUBLIC_SITE_URL` and `VITE_PUBLIC_SITE_URL` with its HTTPS origin; check OAuth callbacks, absolute canonical/social URLs, generated sitemap and robots on that domain. Confirm business hours, locations/service area, scope/partners, team biographies, actual completed projects, approved testimonials and legal copy. Configure analytics only after its vendor and required consent wording are approved. Email, CRM and advertising tracking remain off until credentials and owner approvals are available. Read `DEPLOYMENT.md`, `DATABASE.md`, `plan.md`, `TODO.md` and `QA.md` before a release.
