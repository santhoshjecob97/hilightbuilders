# HILIGHT BUILDERS Website — Outcome Checklist

## 1. Brand, sitemap and responsive public site

- [x] Use the supplied company logo as source of truth when present; do not substitute an invented official logo when none is provided. Use brand HILIGHT BUILDERS, tagline “BUILDING TRUST. CREATING LEGACIES.”, Chennai, Tamil Nadu, India, founder Mr. Srinivasan, business operations Mr. Santhosh, address No. 10/19, 1st Street, SSB Nagar, Vadapalani, Chennai – 600026, email [midsrini@gmail.com](mailto:midsrini@gmail.com), GSTIN 33EFBPS5010A1Z5. Brand colors are #17191C, #202328, #F39800, #D66A00, #FFFFFF, #F5F3EF, #A6A8AB; use orange selectively. Use contemporary bold display typography, readable body text, generous whitespace, refined editorial headings. Personality is premium, architectural, modern, trustworthy, precise, sophisticated and customer-focused. Do not invent awards, certifications, clients, testimonials, completed project claims, stats or years of experience.

- [x] Provide responsive phone, tablet, laptop, desktop and large-screen layouts; compact navigation; readable hero headline and visible primary CTA on mobile; fast-loading imagery; forms usable without zoom; no horizontal overflow; no essential hover-only interactions. Support keyboard navigation, readable contrast, accessible labels/errors, and `prefers-reduced-motion`.

- [x] Implement working navigation and these route groups: Home; Residential Interiors; Commercial Interiors; Construction & Turnkey; Project Portfolio; Our Process; About Us; Contact; Insights/Blog with categories and article pages; editable Privacy Policy, Terms of Use, Enquiry Consent and Cookie Policy if applicable. Every page has a purpose and relevant next action.

## 2. Home, services, process, team, contact, insights and legal content

- [x] Home hero headline is “Spaces That Inspire. Built on Trust.” Support copy is “Residential and commercial design, interiors and turnkey execution tailored to your space, requirements and budget.” Primary CTA “Book a Consultation”; secondary “Explore Our Work”. Include residential/commercial service selector, company introduction, featured project previews, core services, design-to-handover process, reasons to choose HILIGHT BUILDERS, project enquiry CTA, contact details and footer. Do not claim unverified stats.

- [x] Residential page addresses apartments, villas, independent houses, new homeowners and renovation customers. Cover complete home interiors, living rooms, modular kitchens, bedrooms, wardrobes, TV units, pooja units, storage, lighting/false ceilings, furniture coordination, home offices and renovation. Include styles, room-by-room services, process, material/finish selection, featured projects, FAQs and consultation form. CTA “Discuss Your Home Interiors.”

- [x] Commercial page addresses business owners, founders, facility managers, retailers, franchise operators and commercial owners. Cover offices, shops, restaurants/cafés, clinics/healthcare, salons/spas, gyms, showrooms, reception/meeting spaces, renovation and turnkey. Explain planning around workflow, brand identity, customer experience, space use, durability, budget and intended opening schedule. Include dedicated commercial form and CTA “Discuss Your Commercial Project.”

- [x] Construction & Turnkey covers residential construction, design-and-build coordination, renovation, interior execution, project coordination and handover management; accurately explain scope/responsibilities, never imply unconfirmed in-house architectural/engineering services. CTA “Discuss Your Construction Project.”

- [x] Process page shows all twelve stages: initial enquiry; requirement discovery; site visit and measurements; design brief; concept and layout; material selection; detailed scope and estimate; proposal and agreement; procurement and scheduling; execution and quality checks; snag-list review; handover. Explain stages vary by contracted scope. CTA “Start Your Project.”

- [ ] About page introduces HILIGHT BUILDERS, Mr. Srinivasan as Founder and Mr. Santhosh in Business Operations, philosophy, client communication, design/execution coordination, transparent scope and professional delivery. Do not invent biographies, qualifications, awards or history; provide editable biography/photo fields.

- [ ] Contact page displays only the supplied verified business identity/address/email. Include contact form, residential/commercial selector, configurable phone/WhatsApp/business hours; do not invent a phone number or claim a staffed showroom. Embed a map only after address/pin verification. Label legal copy editable and requiring company review; invent no contractual/legal/compliance claims.

- [ ] Insights supports SEO-friendly categories, sample-labelled article pages, metadata, internal links and social sharing. Sample topics include home interior planning, modular kitchen choices, wardrobe materials, budget planning, office/retail/restaurant interiors, renovation, construction coordination and material maintenance.

## 3. Portfolio, concept visuals and imagery

- [x] Provide portfolio filters Residential, Commercial, Kitchens, Living Rooms, Bedrooms, Offices, Retail and Renovation. A project record supports title, type, approved location, verified area, scope, design concept, material direction, status and image gallery. Distinguish completed, in-progress and concept visualisations, never represent a concept as a completed HILIGHT BUILDERS project. In absence of verified project data, use explicitly marked concept visualisations only.

- [x] Provide high-quality residential and commercial imagery with meaningful alt text, compressed/responsive handling, lazy-load noncritical assets, prevent layout shifts and keep initial load lightweight. Use restrained CSS/scroll reveal and graceful static fallback; use real-time 3D only with a suitable model and performance budget, lazy-loaded and not blocking content. No unnecessary spinning objects or audio; support reduced-motion and touch.

## 4. Lead capture, forms and conversions

- [x] Primary conversion is Book a Consultation. Secondary conversions are WhatsApp enquiry, phone contact, floor-plan upload, project estimate and commercial project enquiry. Use the user-supplied verified WhatsApp number in a single public setting; provide distinct prefilled WhatsApp messages for residential, commercial, construction, renovation and general enquiries. Track CTA clicks without unnecessarily storing personal information. Keep callback/estimate requests routed through the enquiry form until their contact and estimating workflows are verified.

- [x] Residential enquiry fields: full name; Indian phone; optional email; location; property type; approximate area; number of bedrooms; new home or renovation; requested services; indicative budget range; expected start date; optional floor-plan upload; additional requirements; contact consent.

- [x] Commercial enquiry fields: full name; company; designation; phone; email; business type; project location; approximate area; new fit-out or renovation; services; indicative budget; desired opening/completion date; property possession status; optional floor-plan upload; additional requirements; contact consent.

- [x] Validate required fields and Indian phone numbers server-side and client-side; expose accessible errors; show loading and submission states; show success only when the server confirms receipt; prevent duplicate submissions; give graceful failure. Securely store leads in configured backend/CRM; email acknowledgment only when email provider is configured; never expose API keys. Add spam protection, safe uploaded-file type/size checks and private ownership/authorization.

- [x] Lead status set is NEW, CONTACTED, QUALIFIED, CONSULTATION, SITE_VISIT, PROPOSAL, NEGOTIATION, WON and LOST. Capture available source from Organic Search, Google Ads, Meta Ads, Instagram, LinkedIn, WhatsApp, Referral, Direct or Other. Preserve notes, follow-up dates and history. Do not send personal data to analytics.

## 5. Secure administration and data

- [ ] Public site never exposes the admin dashboard or private lead records. Admin access uses real authenticated identity, server-side role checks, secure sessions and role-based permissions; no simulated Preview user/development bypass. Admin can access lead inbox, search/filters, detail, status updates, notes/follow-up dates, source attribution; portfolio/image/service/blog management; testimonial approval; basic analytics; export of authorized lead records.

- [x] Provide database structures for leads, project portfolio, project images, services, blog posts, testimonials, team members, contact enquiries, uploaded plans and lead status history. Use migrations and deterministic, additive changes. Uploaded files use safe storage and application ownership indexes; do not claim runtime deletion if unavailable. Validate all inputs, rate-limit and apply security headers/error handling/audit logging where appropriate; do not expose private customer data.

## 6. SEO, analytics and local discovery

- [ ] Add unique per-page titles/meta descriptions, canonical URLs, semantic headings, Open Graph, descriptive image alt, sitemap, robots.txt, verified-business structured data only, internal links and breadcrumbs where appropriate. Target Chennai search intent for interior designers, home interiors, modular kitchens, commercial interior contractors, office interiors, retail interiors, home renovation and turnkey interiors. Do not create fake location pages or claim unverified presence.

- [ ] Prepare integration points for GA4, Search Console, Google Ads conversion tracking, Meta Pixel subject to applicable consent, and CRM lead source. Track consultation form submissions, WhatsApp/phone/email clicks, floor-plan submissions, commercial/residential enquiries, qualified leads and proposal requests without sending PII. Provide residential/commercial landing page suitability for separate ads.

## 7. Security, configuration, testing, deployment and maintenance documentation

- [x] Provide example environment/configuration file containing no secrets. Keep protected values server-side. Use the supplied logo. Document any business contact number, CRM, email, analytics, Maps, business hours, verified portfolio or legal-review inputs that are still absent at implementation time; never imply a nonconfigured integration/form works.

- [x] Provide automated tests for important form, validation, authorization and content flows; run available type diagnostics, tests and production build. Verify source route declarations match a working HTTP 200 JSON `GET /manus-routes.json` manifest.

- [x] Provide website architecture, sitemap, design system, database schema and migrations, sample content labelled sample, deployment instructions, domain/hosting setup guide, maintenance guide and a truthful final QA report. No feature is described as complete unless implemented and tested. Preserve managed Preview and production boundary; do not publish without explicit supported authorization.
