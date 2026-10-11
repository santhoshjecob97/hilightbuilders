# HILIGHT BUILDERS — QA report

## Verified in the current managed Preview

- TypeScript check: passed.
- Automated tests: **14 passed** across 3 files. Coverage includes contact-field validation, malformed Indian mobile rejection, required commercial data, file MIME/size validation, anonymous/non-admin denial and route metadata/canonical behavior.
- Production build: frontend and Express bundle compile. The homepage JS bundle is **448 kB (135 kB gzip)** and secondary pages are **56.8 kB (12.5 kB gzip)** in a separate lazy-loaded chunk; no >500 kB chunk warning.
- Managed MySQL schema: read-only `information_schema` inspection confirmed 10 HILIGHT lead/content tables (leads, lead history, private upload index, projects, images, services, articles, testimonials, team members and contact enquiries). No lead/customer rows were read during verification.
- The database migration is additive `CREATE TABLE` SQL; no destructive statements.
- Stable Preview returns HTTP 200 for `/api/health`, `/manus-routes.json` (18 page routes), the home, residential, commercial and admin pages; unknown paths return 404. Route-specific title/content is present in the no-JavaScript HTML snapshot; the admin snapshot is noindex.
- The supplied logo and all 4 referenced generated architectural `.webp` concept assets return HTTP 200 through the managed Preview storage proxy. Direct access to `/manus-storage/` over the raw dev port is intentionally not used for asset validation.
- The verified public WhatsApp number `+91 90031 66068` is single-sourced in `client/src/data/businessConfig.ts`; the compiled site has `wa.me` and `tel:` actions.
- The private admin uses the normal Manus OAuth session, an `admin` server role, and a matching owner identity supplied through the protected `OWNER_OPEN_ID` project setting across environments. No secret values are present in source. Unit tests deny anonymous and non-admin operations.

## Remaining launch checks / limitations

- The real public domain and approved HTTPS canonical origin are not set. Production publish was **not** requested or submitted; public-domain OAuth callback, canonicals, social-image URLs, sitemap and robots behavior remain to check there.
- External OAuth sign-in as the owner and a real production lead submission were not exercised end-to-end. Optional floor-plan storage failure handling should be checked with synthetic data in the final environment.
- Business hours and a verified map pin are not supplied. Real completed-project records/photos, extended approved team biographies, testimonials and partner assignments were not included in the project files, so this version uses clearly labeled concept imagery and role-only profiles.
- CRM, outbound email, GA4, Google Ads and Meta Pixel integrations are not configured. Analytics calls remain inactive until supported IDs/vendor consent are configured.
- Insights and legal notices are review samples, not approved legal or project advice. A portfolio/blog/team/service/testimonial content-editor UI is not part of this release; the admin surface focuses on private lead operations.
- `/robots.txt` and `/sitemap.xml` were not served on the Preview origin; verify platform SEO gateway behavior once the actual public domain is configured.

No public site release was submitted. No test customer data was inserted.
