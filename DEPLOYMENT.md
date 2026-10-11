# HILIGHT BUILDERS — deployment & launch notes

## Current managed project

This site uses the project’s managed React/Vite frontend, Express/tRPC server, Manus OAuth session support and managed MySQL. The managed WebDev Preview uses the project’s configured port and `/api/health`; startup is `pnpm dev`. Production container configuration is already present in the project (`Dockerfile`, health path `/api/health`). Do not publish a build that has not been checkpointed and approved for release. Auto-publish is currently off.

Before a production publish, validate a clean checkpoint with `pnpm check`, `pnpm test`, `pnpm build`, and verify `/api/health`, public page status/head metadata and `/manus-routes.json`. The managed database is shared between Preview/development and production. The initial HILIGHT migration creates lead lifecycle, floor-plan index, project/content and contact tables; never reset/drop it to repair a deployment. Apply only reviewed additive migrations with `pnpm db:migrate`.

## Business configuration required

- Set `PUBLIC_SITE_URL` and `VITE_PUBLIC_SITE_URL` to the approved production `https://` origin. The server omits guessed canonicals until a real origin is configured. A domain is not yet configured in this project.
- The verified public phone and WhatsApp number `+91 90031 66068` is already single-sourced in `client/src/data/businessConfig.ts`; do not enter it in an environment variable or duplicate it across components.
- Add analytics IDs only after a business owner configures the vendor and approves consent/privacy wording. The browser-side identifiers are optional and are ignored until optional consent is stored. Do not put private keys in Vite variables.
- Add email transport and CRM only through the project’s protected server-side configuration. No email provider or CRM credentials are configured; form acknowledgement is shown only after the database confirms the lead, and no outbound acknowledgement email is implied.
- Verify business hours, map pin, service locations, contractor/partner responsibilities and final scope before adding them to public pages. The supplied business address and contact number are already displayed.
- Supply verified completed project details/photos and approved team biographies/testimonials. Until then, the site labels its portfolio imagery as concept visualisations; sample articles and legal pages remain marked for review.

## Authentication and private data

`/admin` uses the real project Manus OAuth session and a server-side `admin` role gate. The owner identity has been supplied via the protected project environment setting `OWNER_OPEN_ID`; it is used only by the server to promote the exact owner account. Never copy it into source, logs, browser configuration or release documentation. The owner role is assigned only for the matching identity; do not add a query-string or development bypass. Admin lead data, notes, follow-up date, CSV export and signed floor-plan download URLs are available only to an authenticated admin. Public routes expose no lead query. Never log form values or signed floor-plan URLs.

Floor plans must be PDF, JPG or PNG, at most 5 MB. The backend validates MIME signature and size before project storage, indexes the opaque key in MySQL, and returns one-hour signed downloads only to admins. The storage API does not provide runtime deletion; do not promise permanent erasure based on deleting an application record.

## Operations and maintenance

1. Review `README.md`, `plan.md`, `TODO.md`, `DATABASE.md` and the legal/sample-content approval status.
2. Configure the production origin and verified business integrations without disclosing provider secrets.
3. Confirm OAuth redirect/callback behavior on the final public origin with the authorized administrator.
4. Test residential/commercial/general forms with synthetic values only and confirm database acknowledgement, duplicate protection, status update, internal note, export and secure floor-plan access.
5. Check keyboard navigation, contrast, mobile form sizing and reduced-motion presentation after significant UI changes. Keep images lazy-loaded outside the hero and check size/performance after adding work samples.
6. Re-run `pnpm check`, `pnpm test` and `pnpm build`; apply only reviewed database migrations.
7. Configure the custom domain/HTTPS and production release through WebDev. Check the domain’s canonical/OG URLs, sitemap and robots behavior once the domain is verified. Production publication is separate from a code checkpoint.

This document is implementation guidance, not legal advice or a launch approval. The public domain and external email/CRM/analytics integrations are not configured in the preview as of this release; legal/sample content remains for review.
