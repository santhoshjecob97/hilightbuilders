import { useMemo, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { ArrowRight, ArrowUpRight, Download, LockKeyhole } from "lucide-react";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { trackEvent } from "@/lib/analytics";
import { ArrowLink, PageShell, SectionLabel } from "@/components/SiteChrome";
import { LeadForm } from "@/components/LeadForm";
import { AdminLeadDetail } from "@/components/AdminLeadDetail";
import { BUSINESS_WHATSAPP } from "@/data/businessConfig";
import { insights, processSteps, projects, serviceList } from "@/data/site";

const hero = (title: string, copy: string, img?: string) => (
  <section className="subhero">
    <div
      className="subhero-backdrop"
      style={
        img
          ? {
              backgroundImage: `linear-gradient(90deg,rgba(18,20,22,.84),rgba(18,20,22,.22)),url(${img})`,
            }
          : undefined
      }
    />
    <div className="wrap subhero-inner">
      <SectionLabel>HILIGHT BUILDERS · CHENNAI</SectionLabel>
      <h1>{title}</h1>
      <p>{copy}</p>
      <Link className="button button-orange" href="/contact">
        Discuss your project <ArrowUpRight size={16} />
      </Link>
    </div>
  </section>
);

export function ResidentialPage() {
  return (
    <PageShell>
      <main>
        {hero(
          "A home, thoughtfully made.",
          "Home interiors shaped around the way you live—with considered materials, clear scope and coordinated execution.",
          "/assets/living-room.jpg"
        )}
        <section className="wrap pad-section split-content">
          <div>
            <SectionLabel>For the everyday</SectionLabel>
            <h2>
              Spaces that feel
              <br />
              <em>like your own.</em>
            </h2>
            <p>
              From a single room to a complete home, we begin with how you live,
              what you need to store, and how your requirements fit the space
              and budget.
            </p>
            <Link className="text-cta" href="/contact">
              Discuss your home interiors <ArrowRight size={16} />
            </Link>
          </div>
          <ul className="service-list">
            {serviceList.slice(0, 9).map((s, i) => (
              <li key={s}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {s}
                <ArrowUpRight size={15} />
              </li>
            ))}
          </ul>
        </section>
        <section className="material-band">
          <div className="wrap material-grid">
            <div>
              <SectionLabel>Finish & material direction</SectionLabel>
              <h2>
                Choose with
                <br />
                <em>the whole room in mind.</em>
              </h2>
            </div>
            <p>
              Light, touch, cleaning routines, durability and budget all affect
              material choices. We discuss a considered direction for finishes
              as part of the agreed brief, then confirm selections against
              actual samples and project conditions.
            </p>
          </div>
        </section>
        <section className="wrap pad-section">
          <SectionLabel>Style directions</SectionLabel>
          <h2>
            Start with a feeling.
            <br />
            <em>Shape it around you.</em>
          </h2>
          <p className="section-intro">
            Warm contemporary, quiet minimal and natural modern references are
            starting points—not fixed packages. Materials and details are
            selected against your brief, room conditions and agreed scope.
          </p>
          <div className="room-grid style-grid">
            {["Warm contemporary", "Quiet minimal", "Natural modern"].map(
              (style, i) => (
                <article className="room-tile" key={style}>
                  <span>0{i + 1}</span>
                  <h3>{style}</h3>
                  <p>
                    A reference direction to discuss, then refine for the space
                    and its use.
                  </p>
                </article>
              )
            )}
          </div>
        </section>
        <section className="wrap pad-section">
          <SectionLabel>Room by room</SectionLabel>
          <h2>
            Every room has
            <br />
            <em>a different rhythm.</em>
          </h2>
          <div className="room-grid">
            {[
              "Living rooms",
              "Modular kitchens",
              "Bedrooms & wardrobes",
              "TV & pooja units",
              "Storage & home offices",
              "Lighting & ceilings",
            ].map((x, i) => (
              <div className="room-tile" key={x}>
                <span>0{i + 1}</span>
                <h3>{x}</h3>
                <p>
                  Planned around use, proportions and the agreed project scope.
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="wrap pad-section">
          <div className="section-heading">
            <div>
              <SectionLabel>Concept preview</SectionLabel>
              <h2>
                A first look at
                <br />
                <em>one possible direction.</em>
              </h2>
            </div>
            <p>
              Illustrative only. This concept is not represented as a completed
              HILIGHT BUILDERS project.
            </p>
          </div>
          <div className="project-grid">
            {projects
              .filter(project => project.kind === "Residential")
              .map(project => (
                <article className="project-card" key={project.id}>
                  <div className="project-image">
                    <img src={project.image} alt={project.alt} loading="lazy" />
                    <span className="concept-chip">Concept visualisation</span>
                  </div>
                  <div className="project-meta">
                    <span>RESIDENTIAL · CONCEPT</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.scope}</p>
                </article>
              ))}
          </div>
          <Link className="text-cta" href="/projects">
            Explore the concept portfolio <ArrowRight size={16} />
          </Link>
        </section>
        <section className="faq-section wrap">
          <SectionLabel>Common questions</SectionLabel>
          <h2>
            A few things to
            <br />
            <em>consider first.</em>
          </h2>
          <details>
            <summary>Can you plan a complete home or just one room?</summary>
            <p>
              Project scope is discussed around your requirements. Share the
              rooms you are considering in the enquiry form.
            </p>
          </details>
          <details>
            <summary>Can I discuss renovation as well as a new home?</summary>
            <p>
              Yes. Select renovation in the form and include the current
              condition and your intended changes so the team can understand the
              brief.
            </p>
          </details>
          <details>
            <summary>When will I receive an estimate?</summary>
            <p>
              Requirements, site conditions and the agreed scope inform the
              estimate. A detailed scope and estimate are prepared as part of
              the project journey.
            </p>
          </details>
        </section>
        <section className="form-panel wrap" id="enquiry">
          <div>
            <SectionLabel>Start with your home</SectionLabel>
            <h2>
              Let’s understand
              <br />
              <em>your brief.</em>
            </h2>
            <p>
              Share a few details. The team can follow up to understand your
              home and next steps.
            </p>
          </div>
          <LeadForm kind="residential" />
        </section>
      </main>
    </PageShell>
  );
}

export function CommercialPage() {
  return (
    <PageShell>
      <main>
        {hero(
          "Workplaces with purpose.",
          "Commercial interiors planned around workflow, brand identity, customer experience, space utilisation, durability, budget and the intended opening schedule.",
          "/assets/office.jpg"
        )}
        <section className="wrap pad-section split-content">
          <div>
            <SectionLabel>For business owners & teams</SectionLabel>
            <h2>
              Designed around
              <br />
              <em>how you operate.</em>
            </h2>
            <p>
              Every commercial brief balances how people move, what customers
              experience, the brand the space represents and the opening
              schedule the business needs.
            </p>
            <Link className="text-cta" href="/contact">
              Discuss your commercial project <ArrowRight size={16} />
            </Link>
          </div>
          <ul className="service-list">
            {[
              "Corporate offices",
              "Retail shops",
              "Restaurants & cafés",
              "Clinics & healthcare",
              "Salons & spas",
              "Gyms & fitness studios",
              "Showrooms",
              "Reception & meeting spaces",
              "Commercial renovation",
              "Turnkey execution",
            ].map((s, i) => (
              <li key={s}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {s}
                <ArrowUpRight size={15} />
              </li>
            ))}
          </ul>
        </section>
        <section className="commercial-factors">
          <div className="wrap">
            <SectionLabel>Plan for the real working day</SectionLabel>
            <div className="factor-grid">
              {[
                [
                  "Workflow",
                  "Staff routes, customer movement and the work that happens in each zone.",
                ],
                [
                  "Identity",
                  "A consistent material and spatial direction that reflects the business brief.",
                ],
                [
                  "Durability",
                  "Finishes and details considered against expected use and maintenance.",
                ],
                [
                  "Opening schedule",
                  "Decisions sequenced around the intended opening or completion date.",
                ],
              ].map(([title, body], i) => (
                <article key={title}>
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="form-panel wrap" id="enquiry">
          <div>
            <SectionLabel>Commercial enquiry</SectionLabel>
            <h2>
              Tell us about
              <br />
              <em>your business.</em>
            </h2>
            <p>
              Share the space, intended use and schedule. We’ll follow up to
              understand what you need.
            </p>
          </div>
          <LeadForm kind="commercial" />
        </section>
      </main>
    </PageShell>
  );
}

export function ConstructionPage() {
  return (
    <PageShell>
      <main>
        {hero(
          "From scope to handover.",
          "Construction coordination, renovation and interior execution, with responsibilities defined to match the agreed scope.",
          "/assets/construction.jpg"
        )}
        <section className="wrap pad-section split-content">
          <div>
            <SectionLabel>Construction & turnkey</SectionLabel>
            <h2>
              Plan the work.
              <br />
              <em>Clarify the scope.</em>
            </h2>
            <p>
              Project requirements, site conditions and the contracted
              responsibilities define what is included. Design or engineering
              services are not assumed in-house; any professional scope and
              partner responsibilities are confirmed before appointment.
            </p>
            <Link className="text-cta" href="/contact">
              Discuss your construction project <ArrowRight size={16} />
            </Link>
          </div>
          <ul className="service-list">
            {[
              "Residential construction",
              "Design & build coordination",
              "Renovation",
              "Interior execution",
              "Project coordination",
              "Handover management",
            ].map((s, i) => (
              <li key={s}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {s}
                <ArrowUpRight size={15} />
              </li>
            ))}
          </ul>
        </section>
        <section className="scope-note wrap">
          <span className="note-mark">i</span>
          <div>
            <strong>Clear scope, agreed in writing.</strong>
            <p>
              Deliverables, responsibilities, exclusions, scheduling and
              handover arrangements depend on the proposal and agreement for
              each project.
            </p>
          </div>
        </section>
        <section className="form-panel wrap">
          <div>
            <SectionLabel>Construction enquiry</SectionLabel>
            <h2>
              Start with a<br />
              <em>clear brief.</em>
            </h2>
          </div>
          <LeadForm kind="construction" />
        </section>
      </main>
    </PageShell>
  );
}

const categories = [
  "All",
  "Residential",
  "Commercial",
  "Kitchens",
  "Living Rooms",
  "Bedrooms",
  "Offices",
  "Retail",
  "Renovation",
];
export function ProjectsPage() {
  const [selected, setSelected] = useState("All");
  const shown = useMemo(
    () =>
      selected === "All"
        ? projects
        : projects.filter(p => p.tags.includes(selected)),
    [selected]
  );
  return (
    <PageShell>
      <main>
        {hero(
          "A considered body of work.",
          "Concept visualisations exploring possible directions for residential and commercial spaces.",
          "/assets/blueprint.jpg"
        )}
        <section className="wrap pad-section">
          <div className="portfolio-disclaimer">
            <span className="note-mark">i</span>
            <p>
              <strong>Concept portfolio.</strong> The images on this page are
              illustrative concept visualisations—not completed or commissioned
              HILIGHT BUILDERS projects. Approved client work can be added as it
              becomes available.
            </p>
          </div>
          <div
            className="filter-row"
            role="group"
            aria-label="Filter projects by category"
          >
            {categories.map(c => (
              <button
                key={c}
                className={selected === c ? "filter active" : "filter"}
                onClick={() => setSelected(c)}
              >
                {c}
              </button>
            ))}
          </div>
          {shown.length ? (
            <div className="project-grid portfolio-grid">
              {shown.map(p => (
                <article key={p.id} className="project-card">
                  <div className="project-image">
                    <img src={p.image} alt={p.alt} loading="lazy" />
                    <span className="concept-chip">Concept visualisation</span>
                  </div>
                  <div className="project-meta">
                    <span>{p.kind.toUpperCase()} · CONCEPT</span>
                    <span>
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.scope}</p>
                  <p className="project-details">
                    Project status: Concept visualisation
                    <br />
                    Location and area: Not applicable to concept imagery
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>{selected}</span>
              <p>No concept visualisation is listed in this category yet.</p>
            </div>
          )}
        </section>
      </main>
    </PageShell>
  );
}

export function ProcessPage() {
  return (
    <PageShell>
      <main>
        {hero(
          "Clarity at every stage.",
          "A twelve-step journey helps make decisions visible, from first enquiry through handover. Exact stages depend on the contracted scope.",
          "/assets/renovation.jpg"
        )}
        <section className="wrap pad-section">
          <div className="section-heading">
            <div>
              <SectionLabel>The project journey</SectionLabel>
              <h2>
                From first hello
                <br />
                <em>to handover.</em>
              </h2>
            </div>
            <p>
              Each project is different. Scope, site conditions and agreed
              responsibilities determine which stages apply.
            </p>
          </div>
          <div className="timeline">
            {processSteps.map((step, i) => (
              <article className="timeline-step" key={step}>
                <span className="timeline-n">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{step}</h3>
                  <p>
                    {
                      [
                        "Share what you are considering.",
                        "Discuss requirements, priorities and intended timing.",
                        "Where within scope, review the site and key measurements.",
                        "Align on the brief and decisions to be made.",
                        "Develop an appropriate concept and layout direction.",
                        "Consider materials, finishes and their use.",
                        "Define inclusions, exclusions and a detailed estimate.",
                        "Review the proposal and agree the project terms.",
                        "Plan procurement and the agreed schedule.",
                        "Coordinate execution and quality checks to the contracted scope.",
                        "Review identified items before completion.",
                        "Complete the agreed handover process.",
                      ][i]
                    }
                  </p>
                </div>
                <span className="timeline-dot" />
              </article>
            ))}
          </div>
        </section>
        <section className="closing-cta">
          <div className="wrap closing-inner">
            <span className="eyebrow">A GOOD NEXT STEP</span>
            <h2>
              Start with what
              <br />
              <em>you know today.</em>
            </h2>
            <Link href="/contact" className="button button-orange">
              Start your project <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

export function AboutPage() {
  return (
    <PageShell>
      <main>
        {hero(
          "Building trust. Creating legacies.",
          "A Chennai-based team coordinating residential and commercial interiors, construction, renovation and turnkey work.",
          "/assets/hero.jpg"
        )}
        <section className="wrap pad-section about-lead">
          <SectionLabel>Our approach</SectionLabel>
          <h2>
            Professional delivery
            <br />
            starts with <em>listening.</em>
          </h2>
          <p>
            HILIGHT BUILDERS works with property owners and businesses to
            understand the brief, align on scope and coordinate the next steps.
            Our approach is built around clear communication, considered
            decisions and responsibilities agreed before work progresses.
          </p>
        </section>
        <section className="team-band">
          <div className="wrap">
            <SectionLabel>The people behind the brief</SectionLabel>
            <div className="team-grid">
              <article>
                <span className="team-initial">S</span>
                <div>
                  <span className="eyebrow">FOUNDER</span>
                  <h3>Mr. Srinivasan</h3>
                  <p>Founder, HILIGHT BUILDERS</p>
                  <small>Biography and approved portrait pending.</small>
                </div>
              </article>
              <article>
                <span className="team-initial">S</span>
                <div>
                  <span className="eyebrow">BUSINESS OPERATIONS</span>
                  <h3>Mr. Santhosh</h3>
                  <p>Business Operations, HILIGHT BUILDERS</p>
                  <small>Biography and approved portrait pending.</small>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="wrap pad-section">
          <SectionLabel>Our commitment</SectionLabel>
          <div className="commitment-grid">
            <h2>
              Clear scope.
              <br />
              <em>Considered choices.</em>
            </h2>
            <p>
              We aim to keep communication open, explain the project scope, and
              coordinate design and execution against the agreed brief. Exact
              services, materials, timelines and responsibilities are confirmed
              for each project rather than assumed.
            </p>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

export function ContactPage() {
  return (
    <PageShell>
      <main>
        {hero(
          "Let’s talk about your space.",
          "Share what you are planning—home interiors, a commercial fit-out, construction, renovation or something still taking shape.",
          "/assets/studio.jpg"
        )}
        <section className="wrap contact-layout pad-section">
          <div className="contact-details">
            <SectionLabel>HILIGHT BUILDERS</SectionLabel>
            <h2>
              Start with
              <br />
              <em>a conversation.</em>
            </h2>
            <p>
              Choose the enquiry path that best fits your project. The details
              below reflect information supplied by the business.
            </p>
            <div className="contact-info">
              <strong>Chennai business address</strong>
              <p>
                No. 10/19, 1st Street, SSB Nagar,
                <br />
                Vadapalani, Chennai – 600026
              </p>
              <a href={`tel:${BUSINESS_WHATSAPP.replace(/\s/g, "")}`}>
                {BUSINESS_WHATSAPP} <ArrowUpRight size={15} />
              </a>
              <a
                href="mailto:midsrini@gmail.com"
                onClick={() =>
                  trackEvent("email_click", { category: "general" })
                }
              >
                midsrini@gmail.com <ArrowUpRight size={15} />
              </a>
              <small>
                WhatsApp and phone are provided for project enquiries. Business
                hours and a map pin have not been confirmed.
              </small>
            </div>
          </div>
          <div className="contact-form-wrap">
            <p className="enquiry-prompt">
              Select the enquiry type in the form below to show relevant project
              fields.
            </p>
            <div id="contact-form">
              <LeadForm kind="general" showKindSelector />
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

export function InsightsPage() {
  return (
    <PageShell>
      <main>
        {hero(
          "Ideas for better spaces.",
          "Sample planning notes on home interiors, commercial spaces, materials, budgets, renovation and project coordination."
        )}
        <section className="wrap pad-section">
          <div className="sample-banner">
            <span className="note-mark">i</span>
            <p>
              These articles are <strong>sample editorial content</strong> and
              should be reviewed and approved by HILIGHT BUILDERS before
              publication.
            </p>
          </div>
          <div className="insight-grid">
            {insights.map((article, i) => (
              <Link
                href={`/insights/${article.slug}`}
                className="insight-card"
                key={article.slug}
              >
                <span className="eyebrow">
                  {article.category.toUpperCase()} · SAMPLE
                </span>
                <span className="insight-number">0{i + 1}</span>
                <h3>{article.title}</h3>
                <p>{article.intro}</p>
                <span className="text-cta">
                  Read sample <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}

export function InsightArticlePage() {
  const [, params] = useRoute("/insights/:slug");
  const item = insights.find(x => x.slug === params?.slug);
  if (!item) return <NotFoundPage />;
  return (
    <PageShell>
      <main>
        {hero(item.title, item.intro)}
        <article className="wrap article-body pad-section">
          <span className="sample-tag">{item.label}</span>
          <p>{item.body}</p>
          <p>
            For a project-specific discussion, visit{" "}
            <Link href="/contact">Contact HILIGHT BUILDERS</Link>.
          </p>
          <ArrowLink href="/insights">Back to insights</ArrowLink>
        </article>
      </main>
    </PageShell>
  );
}

const legalCopy = {
  privacy: {
    title: "Privacy policy",
    body: "This draft describes the intended handling of information submitted through HILIGHT BUILDERS enquiry forms. The business must review and replace this editable placeholder with its actual data practices, retention periods, service providers, contact route and applicable legal notices before publication. No claim of legal compliance is made here.",
  },
  terms: {
    title: "Terms of use",
    body: "This draft is for review only. Website information is introductory and does not replace a project-specific proposal or written agreement. HILIGHT BUILDERS must review and approve the final terms, scope statements and disclaimers with its advisers before publication.",
  },
  consent: {
    title: "Enquiry consent",
    body: "By submitting an enquiry, you ask HILIGHT BUILDERS to contact you about the project details you have provided. Form consent and contact information are stored with your enquiry for follow-up. The final consent wording, lawful basis, retention and withdrawal process require company/legal review before publication.",
  },
  cookies: {
    title: "Cookie policy",
    body: "Optional analytics or advertising technologies are not active by default. If they are configured, the business must document their providers, purpose, consent choices and retention in this editable policy before activation. Review this text with the company and its legal adviser.",
  },
};
export function LegalPage({ page }: { page: keyof typeof legalCopy }) {
  const item = legalCopy[page];
  return (
    <PageShell>
      <main>
        {hero(
          item.title,
          "Editable draft · Company and legal review required before publication."
        )}
        <section className="wrap article-body pad-section">
          <div className="draft-banner">DRAFT — REVIEW BEFORE PUBLICATION</div>
          <p>{item.body}</p>
          <p>
            Contact: <a href="mailto:midsrini@gmail.com">midsrini@gmail.com</a>
          </p>
        </section>
      </main>
    </PageShell>
  );
}

export function AdminPage() {
  const me = trpc.auth.me.useQuery();
  const [status, setStatus] = useState<
    | "ALL"
    | "NEW"
    | "CONTACTED"
    | "QUALIFIED"
    | "CONSULTATION"
    | "SITE_VISIT"
    | "PROPOSAL"
    | "NEGOTIATION"
    | "WON"
    | "LOST"
  >("ALL");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [notice, setNotice] = useState("");
  const rows = trpc.admin.listLeads.useQuery(
    { status: status === "ALL" ? undefined : status, query },
    { enabled: me.data?.role === "admin" }
  );
  const change = trpc.admin.updateLead.useMutation({
    onSuccess: () => rows.refetch(),
  });
  const exportQuery = trpc.admin.exportLeads.useQuery(undefined, {
    enabled: false,
  });
  const selected = rows.data?.find(row => row.id === selectedId);
  const exportCsv = async () => {
    try {
      const result = await exportQuery.refetch();
      if (result.data) {
        const blob = new Blob([result.data], {
          type: "text/csv;charset=utf-8",
        });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "hilight-authorized-leads.csv";
        a.click();
        window.setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      }
    } catch {
      setNotice("Could not export records.");
    }
  };
  return (
    <PageShell>
      <main className="admin-main wrap pad-section">
        <SectionLabel>Private workspace · HILIGHT BUILDERS</SectionLabel>
        <h1>Lead inbox</h1>
        <p className="admin-intro">
          A private record of enquiries for authorized follow-up. Customer data
          is not available to public visitors.
        </p>
        {me.isLoading ? (
          <p>Checking your session…</p>
        ) : me.data?.role !== "admin" ? (
          <div className="admin-gate">
            <LockKeyhole size={26} />
            <h2>Owner access required</h2>
            <p>
              Sign in with the authorized HILIGHT BUILDERS administrator
              account. Public visitors cannot view leads.
            </p>
            <button
              className="button button-orange"
              onClick={() => startLogin()}
            >
              Sign in securely <ArrowUpRight size={15} />
            </button>
          </div>
        ) : (
          <>
            <div className="admin-toolbar">
              <input
                aria-label="Search enquiries"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search name, location or service"
              />
              <select
                aria-label="Filter by status"
                value={status}
                onChange={e => setStatus(e.target.value as typeof status)}
              >
                <option value="ALL">All statuses</option>
                {[
                  "NEW",
                  "CONTACTED",
                  "QUALIFIED",
                  "CONSULTATION",
                  "SITE_VISIT",
                  "PROPOSAL",
                  "NEGOTIATION",
                  "WON",
                  "LOST",
                ].map(value => (
                  <option key={value}>{value}</option>
                ))}
              </select>
              <button className="button button-dark" onClick={exportCsv}>
                <Download size={15} /> Export authorized records
              </button>
            </div>
            {notice && <p role="status">{notice}</p>}
            {rows.error ? (
              <p className="form-error" role="alert">
                The lead list could not be loaded.
              </p>
            ) : rows.isLoading ? (
              <p>Loading enquiries…</p>
            ) : (
              <>
                <p className="admin-count">
                  {rows.data?.length ?? 0} record
                  {rows.data?.length === 1 ? "" : "s"} shown · newest first (up
                  to 250)
                </p>
                <div className="lead-table-wrap">
                  <table className="lead-table">
                    <thead>
                      <tr>
                        <th>Enquiry</th>
                        <th>Contact</th>
                        <th>Project</th>
                        <th>Source</th>
                        <th>Status</th>
                        <th>Received</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(rows.data ?? []).map(row => (
                        <tr key={row.id}>
                          <td>
                            <button
                              className="lead-open"
                              type="button"
                              onClick={() => setSelectedId(row.id)}
                            >
                              {row.fullName}
                            </button>
                            <small>
                              {row.companyName || row.location || "—"}
                            </small>
                          </td>
                          <td>
                            <span>{row.phone}</span>
                            <small>{row.email || "—"}</small>
                          </td>
                          <td>
                            {row.kind}
                            <small>
                              {row.propertyType ||
                                row.businessType ||
                                row.projectType ||
                                "—"}
                            </small>
                          </td>
                          <td>{row.source || "Direct"}</td>
                          <td>
                            <select
                              aria-label={`Change status for ${row.fullName}`}
                              value={row.status}
                              disabled={change.isPending}
                              onChange={e =>
                                change.mutate({
                                  id: row.id,
                                  status: e.target.value as typeof row.status,
                                })
                              }
                            >
                              {[
                                "NEW",
                                "CONTACTED",
                                "QUALIFIED",
                                "CONSULTATION",
                                "SITE_VISIT",
                                "PROPOSAL",
                                "NEGOTIATION",
                                "WON",
                                "LOST",
                              ].map(value => (
                                <option key={value}>{value}</option>
                              ))}
                            </select>
                          </td>
                          <td>
                            {new Date(row.createdAt).toLocaleDateString(
                              "en-IN"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {selected && (
              <AdminLeadDetail
                key={selected.id}
                lead={selected}
                onClose={() => setSelectedId(null)}
                onUpdated={() => {
                  rows.refetch();
                  setNotice("Lead note and follow-up saved.");
                }}
              />
            )}
          </>
        )}
      </main>
    </PageShell>
  );
}

export function NotFoundPage() {
  const [, navigate] = useLocation();
  return (
    <PageShell>
      <main className="not-found wrap pad-section">
        <span className="eyebrow">404 · NOT FOUND</span>
        <h1>
          That page isn’t
          <br />
          <em>in the plan.</em>
        </h1>
        <p>Try the home page or tell us what you are looking for.</p>
        <button className="button button-orange" onClick={() => navigate("/")}>
          Back to home <ArrowRight size={16} />
        </button>
      </main>
    </PageShell>
  );
}
