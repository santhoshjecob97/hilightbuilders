import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  MoveUpRight,
} from "lucide-react";
import { ArrowLink, PageShell, SectionLabel } from "@/components/SiteChrome";
import { projects, processSteps, services } from "@/data/site";

export default function Home() {
  const [audience, setAudience] = useState<"home" | "business">("home");
  return (
    <PageShell>
      <main>
        <section className="hero">
          <div
            className="hero-image"
            role="img"
            aria-label="Concept visualisation of a contemporary residence framed by tropical planting"
          />
          <div className="hero-shade" />
          <div className="hero-content wrap">
            <p className="hero-kicker">
              <span className="orange-rule" /> INTERIORS · CONSTRUCTION ·
              CHENNAI
            </p>
            <h1>
              Spaces That Inspire.
              <br />
              <em>Built on Trust.</em>
            </h1>
            <p className="hero-intro">
              Residential and commercial design, interiors and turnkey execution
              tailored to your space, requirements and budget.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="button button-orange">
                Book a Consultation <MoveUpRight size={16} />
              </Link>
              <Link href="/projects" className="button button-outline-light">
                Explore Our Work <ArrowRight size={16} />
              </Link>
            </div>
            <div className="hero-foot">
              <span>Vadapalani · Chennai</span>
              <a href="#intro" aria-label="Scroll to introduction">
                <ArrowDown size={17} />
              </a>
              <span>DESIGN · COORDINATE · DELIVER</span>
            </div>
          </div>
          <span className="hero-index">01 — HILIGHT BUILDERS</span>
        </section>

        <section className="intro-section wrap" id="intro">
          <SectionLabel>A thoughtful place to begin</SectionLabel>
          <div className="intro-grid">
            <h2>
              Good spaces begin
              <br />
              with <em>good conversations.</em>
            </h2>
            <div className="intro-copy">
              <p>
                Every brief is different. We take time to understand the people,
                work and practical needs behind a space—then coordinate a clear
                next step around the scope you agree.
              </p>
              <div className="founder-line">
                <span className="mini-mark">H</span>
                <span>
                  <strong>HILIGHT BUILDERS</strong>
                  <small>Chennai, Tamil Nadu</small>
                </span>
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>
        </section>

        <section className="audience-band">
          <div className="wrap audience-inner">
            <SectionLabel>What are you planning?</SectionLabel>
            <div
              className="audience-tabs"
              role="tablist"
              aria-label="Choose project type"
            >
              <button
                type="button"
                role="tab"
                aria-selected={audience === "home"}
                className={audience === "home" ? "active" : ""}
                onClick={() => setAudience("home")}
              >
                A home
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={audience === "business"}
                className={audience === "business" ? "active" : ""}
                onClick={() => setAudience("business")}
              >
                A business
              </button>
            </div>
            <div className="audience-result">
              <div>
                <span className="eyebrow">
                  {audience === "home"
                    ? "RESIDENTIAL INTERIORS"
                    : "COMMERCIAL INTERIORS"}
                </span>
                <h3>
                  {audience === "home"
                    ? "Made for the way you live."
                    : "Planned for the way you work."}
                </h3>
                <p>
                  {audience === "home"
                    ? "From a considered modular kitchen to a complete home, we help bring the rooms and details into one clear plan."
                    : "From workplaces to customer-facing spaces, we consider flow, identity, durability and the intended opening schedule."}
                </p>
              </div>
              <Link
                href={audience === "home" ? "/residential" : "/commercial"}
                className="round-arrow"
                aria-label="Explore this service"
              >
                <ArrowUpRight size={22} />
              </Link>
            </div>
          </div>
        </section>

        <section className="services-section wrap pad-section">
          <div className="section-heading">
            <div>
              <SectionLabel>What we do</SectionLabel>
              <h2>
                One considered scope.
                <br />
                <em>Every important detail.</em>
              </h2>
            </div>
            <p>
              Design and execution coordination for spaces that need to work
              beautifully and practically.
            </p>
          </div>
          <div className="service-grid">
            {services.map((service, i) => (
              <Link
                href={service.href}
                className={`service-card service-card-${i + 1}`}
                key={service.n}
              >
                <div className="service-photo">
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  <span className="concept-chip">Concept visualisation</span>
                </div>
                <div className="service-card-meta">
                  <span>{service.n} / SERVICE</span>
                  <ArrowUpRight size={18} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="portfolio-home">
          <div className="wrap pad-section">
            <div className="section-heading">
              <div>
                <SectionLabel>Ideas in space</SectionLabel>
                <h2>
                  A glimpse of what
                  <br />
                  <em>could be.</em>
                </h2>
              </div>
              <ArrowLink href="/projects">View concept portfolio</ArrowLink>
            </div>
            <div className="project-grid home-project-grid">
              {projects.slice(0, 2).map((project, i) => (
                <Link
                  href="/projects"
                  className={`project-card project-card-${i + 1}`}
                  key={project.id}
                >
                  <div className="project-image">
                    <img src={project.image} alt={project.alt} loading="lazy" />
                    <span className="concept-chip">Concept visualisation</span>
                  </div>
                  <div className="project-meta">
                    <span>{project.kind} · CONCEPT</span>
                    <span>
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.scope}</p>
                </Link>
              ))}
            </div>
            <div className="portfolio-note">
              <span className="note-mark">i</span>
              <p>
                These visuals are concepts created to illustrate design
                direction. They are{" "}
                <strong>
                  not presented as completed HILIGHT BUILDERS projects.
                </strong>
              </p>
            </div>
          </div>
        </section>

        <section className="process-home wrap pad-section">
          <div className="process-intro">
            <SectionLabel>From first conversation to handover</SectionLabel>
            <h2>
              A clear path,
              <br />
              <em>together.</em>
            </h2>
            <p>
              Exact steps depend on the contracted scope. We make the next
              decision visible before work moves forward.
            </p>
            <ArrowLink href="/process">See how the process works</ArrowLink>
          </div>
          <div className="process-steps">
            {[0, 1, 2, 3].map(i => (
              <div className="process-mini" key={i}>
                <span className="step-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  {processSteps[i === 0 ? 0 : i === 1 ? 2 : i === 2 ? 6 : 11]}
                </span>
                <Check size={15} />
              </div>
            ))}
          </div>
        </section>

        <section className="trust-band">
          <div className="wrap trust-inner">
            <div>
              <SectionLabel>Why HILIGHT BUILDERS</SectionLabel>
              <h2>
                Trust is built in
                <br />
                <em>the details.</em>
              </h2>
            </div>
            <div className="trust-points">
              <div>
                <span>01</span>
                <p>
                  <strong>Scope made clear</strong>
                  <br />
                  Requirements, inclusions and next steps are discussed before
                  the work progresses.
                </p>
              </div>
              <div>
                <span>02</span>
                <p>
                  <strong>Decisions with context</strong>
                  <br />
                  Materials, budget and timing are considered against your space
                  and priorities.
                </p>
              </div>
              <div>
                <span>03</span>
                <p>
                  <strong>Coordinated delivery</strong>
                  <br />
                  The agreed project scope shapes design, coordination and the
                  handover path.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="closing-cta">
          <div className="wrap closing-inner">
            <span className="eyebrow">YOUR SPACE · YOUR BRIEF</span>
            <h2>
              Every good project
              <br />
              starts with <em>a conversation.</em>
            </h2>
            <p>
              Tell us what you are planning. We’ll help clarify the next step.
            </p>
            <Link href="/contact" className="button button-orange">
              Book a Consultation <MoveUpRight size={16} />
            </Link>
            <div className="cta-mark">
              <span>H</span>
            </div>
          </div>
        </section>
        <section className="contact-strip wrap">
          <span>HILIGHT BUILDERS</span>
          <span>
            No. 10/19, 1st Street, SSB Nagar, Vadapalani, Chennai – 600026
          </span>
          <a href="mailto:midsrini@gmail.com">
            midsrini@gmail.com <ArrowUpRight size={14} />
          </a>
        </section>
      </main>
    </PageShell>
  );
}
