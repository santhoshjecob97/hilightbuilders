import { Link, useLocation } from "wouter";
import { useState } from "react";
import { ArrowUpRight, Menu, X, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import {
  BUSINESS_WHATSAPP,
  BUSINESS_WHATSAPP_DIGITS,
} from "@/data/businessConfig";

const logo = "/assets/hilight-builders-logo.png";
const links = [
  ["Home", "/"],
  ["Residential", "/residential"],
  ["Commercial", "/commercial"],
  ["Construction", "/construction"],
  ["Projects", "/projects"],
  ["Our process", "/process"],
  ["About", "/about"],
  ["Insights", "/insights"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Link
        href="/"
        className="brand"
        aria-label="HILIGHT BUILDERS home"
        onClick={() => setOpen(false)}
      >
        <img
          src={logo}
          alt="HILIGHT BUILDERS monogram"
          width="46"
          height="46"
        />
        <span className="brand-copy">
          <strong>
            HILIGHT <i>BUILDERS</i>
          </strong>
          <small>BUILDING TRUST. CREATING LEGACIES.</small>
        </span>
      </Link>
      <button
        className="menu-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        className={`site-nav ${open ? "is-open" : ""}`}
        aria-label="Main navigation"
      >
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="nav-link"
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="nav-cta"
          onClick={() => setOpen(false)}
        >
          Let’s talk <ArrowUpRight size={15} />
        </Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" className="brand brand-footer">
            <img
              src={logo}
              alt="HILIGHT BUILDERS monogram"
              width="50"
              height="50"
            />
            <span className="brand-copy">
              <strong>
                HILIGHT <i>BUILDERS</i>
              </strong>
              <small>BUILDING TRUST. CREATING LEGACIES.</small>
            </span>
          </Link>
          <p>
            Residential interiors · Commercial interiors
            <br />
            Construction · Renovation · Turnkey solutions
          </p>
        </div>
        <div className="footer-links">
          <span className="eyebrow">Explore</span>
          <Link href="/residential">Residential interiors</Link>
          <Link href="/commercial">Commercial interiors</Link>
          <Link href="/construction">Construction & turnkey</Link>
          <Link href="/projects">Projects portfolio</Link>
          <Link href="/process">Our process</Link>
        </div>
        <div className="footer-links">
          <span className="eyebrow">Get in touch</span>
          <span>
            No. 10/19, 1st Street, SSB Nagar,
            <br />
            Vadapalani, Chennai – 600026
          </span>
          <a
            href={`tel:${BUSINESS_WHATSAPP.replace(/\s/g, "")}`}
            onClick={() => trackEvent("phone_click", { category: "general" })}
          >
            {BUSINESS_WHATSAPP}
          </a>
          <a
            href="mailto:midsrini@gmail.com"
            onClick={() => trackEvent("email_click", { category: "general" })}
          >
            midsrini@gmail.com
          </a>
          <Link href="/contact">
            Discuss a project <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} HILIGHT BUILDERS · Chennai, Tamil Nadu
        </span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/consent">Enquiry consent</Link>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppAction() {
  const [path] = useLocation();
  const number = BUSINESS_WHATSAPP_DIGITS;
  const category =
    path === "/residential"
      ? "residential"
      : path === "/commercial"
        ? "commercial"
        : path === "/construction"
          ? "construction"
          : path === "/projects"
            ? "renovation"
            : "general";
  const messages: Record<string, string> = {
    residential:
      "Hello HILIGHT BUILDERS, I would like to discuss home interiors.",
    commercial:
      "Hello HILIGHT BUILDERS, I would like to discuss a commercial interiors project.",
    construction:
      "Hello HILIGHT BUILDERS, I would like to discuss construction or turnkey work.",
    renovation:
      "Hello HILIGHT BUILDERS, I would like to discuss a renovation project.",
    general:
      "Hello HILIGHT BUILDERS, I would like to discuss an interior project.",
  };
  return (
    <a
      className="whatsapp-fab"
      href={`https://wa.me/${number}?text=${encodeURIComponent(messages[category])}`}
      aria-label="Message HILIGHT BUILDERS on WhatsApp"
      onClick={() => trackEvent("whatsapp_click", { category })}
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle size={19} />
      <span>Let’s talk</span>
    </a>
  );
}

export function PageShell({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className={dark ? "site dark-page" : "site"}>
      <Header />
      {children}
      <Footer />
      <WhatsAppAction />
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span />
      {children}
    </div>
  );
}
export function ArrowLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link href={href} className={`arrow-link ${light ? "arrow-light" : ""}`}>
      {children}
      <ArrowUpRight size={16} />
    </Link>
  );
}
