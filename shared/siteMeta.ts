export type PageMeta = {
  title: string;
  description: string;
  heading: string;
  summary: string;
  noindex?: boolean;
};

const pages: Record<string, PageMeta> = {
  "/": {
    title: "HILIGHT BUILDERS | Interiors & Construction in Chennai",
    description:
      "Residential and commercial design, interiors, construction and turnkey execution in Chennai—tailored to your space, requirements and budget.",
    heading: "Spaces That Inspire. Built on Trust.",
    summary:
      "Residential and commercial design, interiors and turnkey execution tailored to your space, requirements and budget.",
  },
  "/residential": {
    title: "Home Interiors in Chennai | HILIGHT BUILDERS",
    description:
      "Plan complete home interiors in Chennai, from kitchens and wardrobes to lighting, storage and renovation.",
    heading: "A home, thoughtfully made.",
    summary:
      "Home interiors shaped around the way you live—with considered materials, clear scope and coordinated execution.",
  },
  "/commercial": {
    title: "Commercial Interiors in Chennai | HILIGHT BUILDERS",
    description:
      "Commercial interiors in Chennai planned around workflow, brand, customer experience, durability and your opening schedule.",
    heading: "Workplaces with purpose.",
    summary:
      "Office, retail, hospitality and other commercial environments planned around the people and work they serve.",
  },
  "/construction": {
    title: "Construction & Turnkey in Chennai | HILIGHT BUILDERS",
    description:
      "Discuss construction coordination, renovation and turnkey interior execution in Chennai with HILIGHT BUILDERS.",
    heading: "From scope to handover.",
    summary:
      "Construction coordination, renovation and interior execution, with responsibilities defined to match the agreed scope.",
  },
  "/projects": {
    title: "Project Portfolio | HILIGHT BUILDERS Chennai",
    description:
      "Explore clearly labelled concept visualisations for residential and commercial interiors.",
    heading: "A considered body of work.",
    summary:
      "These concept visualisations show possible directions; they are not represented as completed HILIGHT BUILDERS projects.",
  },
  "/process": {
    title: "Our Process | HILIGHT BUILDERS",
    description:
      "Understand the project journey, from initial enquiry and discovery to execution checks and handover.",
    heading: "Clarity at every stage.",
    summary:
      "The exact project stages depend on the contracted scope; our process makes the next step visible.",
  },
  "/about": {
    title: "About HILIGHT BUILDERS | Chennai",
    description:
      "Meet HILIGHT BUILDERS, led by Founder Mr. Srinivasan and Business Operations by Mr. Santhosh in Chennai.",
    heading: "Building trust. Creating legacies.",
    summary:
      "A Chennai-based team coordinating residential and commercial interiors, construction, renovation and turnkey work.",
  },
  "/contact": {
    title: "Contact HILIGHT BUILDERS | Chennai",
    description:
      "Discuss a residential, commercial, construction or renovation project with HILIGHT BUILDERS in Chennai.",
    heading: "Let’s talk about your space.",
    summary:
      "Share a few details about the project so the team can understand what you are planning.",
  },
  "/insights": {
    title: "Insights | HILIGHT BUILDERS Chennai",
    description:
      "Planning notes on home interiors, commercial spaces, materials, budgets, renovation and project coordination.",
    heading: "Ideas for better spaces.",
    summary:
      "Editorial planning notes. Articles are sample content until reviewed and approved by HILIGHT BUILDERS.",
  },
  "/privacy": {
    title: "Privacy Policy | HILIGHT BUILDERS",
    description:
      "Editable privacy policy draft for HILIGHT BUILDERS. Company/legal review is required before publication.",
    heading: "Privacy policy",
    summary: "Draft for company and legal review before publication.",
  },
  "/terms": {
    title: "Terms of Use | HILIGHT BUILDERS",
    description:
      "Editable terms of use draft for HILIGHT BUILDERS. Company/legal review is required before publication.",
    heading: "Terms of use",
    summary: "Draft for company and legal review before publication.",
  },
  "/consent": {
    title: "Enquiry Consent | HILIGHT BUILDERS",
    description:
      "Information about contact consent for HILIGHT BUILDERS enquiry forms.",
    heading: "Enquiry consent",
    summary:
      "Please review and approve this wording with the company before publication.",
  },
  "/cookies": {
    title: "Cookie Policy | HILIGHT BUILDERS",
    description:
      "Editable cookie policy draft for HILIGHT BUILDERS where applicable; company/legal review is required.",
    heading: "Cookie policy",
    summary: "Draft for company and legal review before publication.",
  },
  "/admin": {
    title: "Administration | HILIGHT BUILDERS",
    description: "Private administrative access.",
    heading: "Administration",
    summary: "Private area.",
    noindex: true,
  },
};

export function getPageMeta(pathname: string): PageMeta {
  const path = pathname.replace(/\/$/, "") || "/";
  if (pages[path]) return pages[path];
  const articles: Record<string, PageMeta> = {
    "/insights/planning-home-interiors": {
      title: "Planning Home Interiors | HILIGHT BUILDERS",
      description:
        "Sample notes on routines, storage, scope and materials for a home-interior brief.",
      heading: "A useful starting point for planning home interiors",
      summary:
        "Sample editorial note: list daily routines, storage needs and project scope before comparing materials. Review before publication.",
    },
    "/insights/modular-kitchen-decisions": {
      title: "Modular Kitchen Decisions | HILIGHT BUILDERS",
      description:
        "Sample planning questions about kitchen workflow, storage, appliances and finishes.",
      heading: "Questions to ask when planning a modular kitchen",
      summary:
        "Sample editorial note: consider cooking habits, appliance sizes, ventilation and maintenance. Review before publication.",
    },
    "/insights/commercial-space-planning": {
      title: "Commercial Space Planning | HILIGHT BUILDERS",
      description:
        "Sample notes on workflow, customer movement, durability and opening dates for commercial interiors.",
      heading: "Plan a commercial space around its working day",
      summary:
        "Sample editorial note: map customer and staff journeys, circulation, durable finishes and intended opening date. Review before publication.",
    },
  };
  if (articles[path]) return articles[path];
  return {
    title: "Page not found | HILIGHT BUILDERS",
    description: "The requested page could not be found.",
    heading: "Page not found",
    summary: "The page you are looking for is not available.",
    noindex: true,
  };
}

export function renderSeoShell(html: string, pathname: string, siteUrl = "") {
  const meta = getPageMeta(pathname);
  const esc = (s: string) =>
    s.replace(
      /[&<>"']/g,
      c =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c]!
    );
  let canonical = "";
  let absolute = "";
  try {
    const base = new URL(siteUrl);
    if (base.protocol === "https:") {
      absolute = new URL(pathname, base).toString();
      canonical = `<link rel="canonical" href="${esc(absolute)}">`;
    }
  } catch {
    /* No configured verified public origin: omit absolute metadata. */
  }
  const summary = esc(meta.summary);
  const title = esc(meta.title);
  const description = esc(meta.description);
  const robots = meta.noindex ? "noindex, nofollow" : "index, follow";
  const keywords =
    "Chennai interior design, home interiors, modular kitchens, commercial interiors, office interiors, renovation, turnkey interiors";
  const path = pathname.replace(/\/$/, "") || "/";
  const body: Record<string, string[]> = {
    "/": [
      "HILIGHT BUILDERS provides residential and commercial design, interiors, construction, renovation and turnkey execution in Chennai.",
      "Residential work can include complete home interiors, modular kitchens, storage, wardrobes, lighting and room-by-room planning. Commercial spaces are considered around workflow, brand, customer movement, durability and the intended opening schedule.",
      "Projects move from enquiry and discovery through scope and estimate, agreed execution and handover; stages depend on the contracted scope.",
    ],
    "/residential": [
      "Plan complete home interiors for apartments, villas and independent houses, for a new home or renovation.",
      "Room-by-room possibilities include living rooms, modular kitchens, bedrooms and wardrobes, TV and pooja units, storage, lighting, ceilings, furniture coordination and home offices.",
      "Material decisions consider light, use, cleaning routines, durability, project conditions and budget. Send an enquiry to discuss the requirements and scope.",
    ],
    "/commercial": [
      "Commercial spaces include offices, retail shops, restaurants and cafés, clinics, healthcare, salons, spas, gyms, showrooms, receptions and meeting rooms.",
      "Planning considers staff workflow, customer experience, brand direction, circulation, space utilisation, durability, budget and the intended opening schedule.",
      "Share your business type, location, area, fit-out or renovation requirements, possession status and desired completion date to discuss a commercial brief.",
    ],
    "/construction": [
      "Construction and turnkey discussions can include residential construction, renovation, design-and-build coordination, interior execution, project coordination and handover management.",
      "Responsibilities, included services, procurement, schedule and handover expectations are confirmed against the agreed scope. Architectural and engineering services are not assumed unless explicitly included.",
    ],
    "/projects": [
      "The portfolio presently contains illustrative concept visualisations, not claimed completed HILIGHT BUILDERS projects.",
      "Concept imagery is identified as concept work. A future project record can describe its type, approved location, verified area, scope, design direction, materials, status and image gallery after business review.",
    ],
    "/process": [
      "Typical stages are initial enquiry; requirement discovery; site visit and measurements; design brief; concept and layout; material selection; detailed scope and estimate; proposal and agreement; procurement and scheduling; execution and quality checks; snag-list review; and handover.",
      "The order and included stages vary with the contracted project scope and agreed responsibilities.",
    ],
    "/about": [
      "HILIGHT BUILDERS is a Chennai-based interiors, construction, renovation and turnkey business.",
      "Mr. Srinivasan is Founder and Mr. Santhosh leads Business Operations. No additional biography, qualification, certification or company-history claim is made without approval.",
    ],
    "/contact": [
      "Contact HILIGHT BUILDERS at midsrini@gmail.com or No. 10/19, 1st Street, SSB Nagar, Vadapalani, Chennai – 600026.",
      "Use the enquiry form for residential, commercial, construction, renovation or general projects. Phone and WhatsApp actions appear only when a verified business number is configured.",
    ],
    "/insights": [
      "Editorial planning notes cover home-interior briefs, modular-kitchen decisions and commercial-space planning.",
      "These sample articles are illustrative and require business approval before publication.",
    ],
    "/insights/planning-home-interiors": [
      "Start an interior brief by listing everyday routines, who uses each room, storage needs, work-from-home needs and rooms included in the project.",
      "Then compare possible layout and finish directions against the site conditions, required scope and budget. This article is sample editorial content and needs review before publication.",
    ],
    "/insights/modular-kitchen-decisions": [
      "A kitchen brief can consider cooking habits, preparation zones, storage, appliance dimensions, ventilation, counter use and cleaning routines.",
      "Material choices should be reviewed against maintenance, durability, cost and real samples. This article is sample editorial content and needs review before publication.",
    ],
    "/insights/commercial-space-planning": [
      "Map staff and customer journeys, circulation paths, work zones, reception, services and the use of each part of the space.",
      "Consider brand, durable finishes, budget, possession status and the intended opening date when sequencing decisions. This article is sample editorial content and needs review before publication.",
    ],
    "/privacy": [
      "This editable privacy notice is a draft. The company should confirm what data is collected, storage and retention, service providers, access controls and how a person can ask about an enquiry before publication.",
    ],
    "/terms": [
      "This editable terms page is a draft and does not create a project quote, schedule, warranty, scope or contractual commitment. The company and its legal adviser must approve the terms.",
    ],
    "/consent": [
      "Submitting an enquiry authorises HILIGHT BUILDERS to contact the person about that enquiry using the supplied details. Contact consent is stored with the lead. Legal review is required before publication.",
    ],
    "/cookies": [
      "Essential site storage supports form operation. Optional measurement or advertising tools remain disabled unless configured and accepted. Review provider names and purposes before enabling such tags.",
    ],
    "/admin": [
      "This is a private administrative area. Customer lead data is shown only after authenticated server-side admin authorization.",
    ],
  };
  const excerpts = (body[path] || [meta.summary])
    .map(text => `<p>${esc(text)}</p>`)
    .join("");
  const nav =
    path === "/admin"
      ? ""
      : `<nav aria-label="HILIGHT BUILDERS pages"><a href="/residential">Residential interiors</a> · <a href="/commercial">Commercial interiors</a> · <a href="/construction">Construction &amp; turnkey</a> · <a href="/projects">Our portfolio</a> · <a href="/process">Our process</a> · <a href="/contact">Contact</a></nav>`;
  const shareImagePath =
    "/assets/hero.jpg";
  const shareImage = absolute
    ? new URL(shareImagePath, siteUrl).toString()
    : "";
  const ogType = pathname.startsWith("/insights/") ? "article" : "website";
  const jsonLd =
    pathname === "/"
      ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "GeneralContractor", name: "HILIGHT BUILDERS", email: "midsrini@gmail.com", taxID: "33EFBPS5010A1Z5", address: { "@type": "PostalAddress", streetAddress: "No. 10/19, 1st Street, SSB Nagar, Vadapalani", addressLocality: "Chennai", postalCode: "600026", addressRegion: "Tamil Nadu", addressCountry: "IN" } }).replace(/</g, "\\u003c")}</script>`
      : "";
  return html
    .replaceAll("__SEO_KEYWORDS__", esc(keywords))
    .replaceAll("__SEO_TITLE__", title)
    .replaceAll("__SEO_DESCRIPTION__", description)
    .replaceAll("__SEO_CANONICAL__", canonical)
    .replaceAll("__SEO_ROBOTS__", robots)
    .replaceAll("__SEO_OG_TYPE__", ogType)
    .replaceAll(
      "__SEO_OG_URL__",
      absolute ? `<meta property="og:url" content="${esc(absolute)}">` : ""
    )
    .replaceAll(
      "__SEO_OG_IMAGE__",
      shareImage
        ? `<meta property="og:image" content="${esc(shareImage)}">`
        : ""
    )
    .replaceAll(
      "__SEO_TW_IMAGE__",
      shareImage
        ? `<meta name="twitter:image" content="${esc(shareImage)}">`
        : ""
    )
    .replaceAll("__SEO_JSONLD__", jsonLd)
    .replaceAll(
      "__SEO_NOSCRIPT__",
      `<noscript><main><h1>${esc(meta.heading)}</h1><p>${summary}</p><section>${excerpts}</section><p>HILIGHT BUILDERS · Chennai, Tamil Nadu · <a href="mailto:midsrini@gmail.com">midsrini@gmail.com</a></p>${nav}</main></noscript>`
    );
}
