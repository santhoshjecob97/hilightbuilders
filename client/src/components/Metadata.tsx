import { useEffect } from "react";
import { useLocation } from "wouter";
import { getPageMeta } from "@shared/siteMeta";

export function Metadata() {
  const [location] = useLocation();
  useEffect(() => {
    const meta = getPageMeta(location.split("?")[0]);
    document.title = meta.title;
    const set = (
      selector: string,
      key: string,
      value: string,
      attr = "name"
    ) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = value;
    };
    set('meta[name="description"]', "description", meta.description);
    set(
      'meta[name="robots"]',
      "robots",
      meta.noindex ? "noindex, nofollow" : "index, follow"
    );
    set('meta[property="og:title"]', "og:title", meta.title, "property");
    set(
      'meta[property="og:description"]',
      "og:description",
      meta.description,
      "property"
    );
    set(
      'meta[property="og:site_name"]',
      "og:site_name",
      "HILIGHT BUILDERS",
      "property"
    );
    set(
      'meta[property="og:type"]',
      "og:type",
      location.startsWith("/insights/") ? "article" : "website",
      "property"
    );
    set('meta[name="twitter:title"]', "twitter:title", meta.title);
    set(
      'meta[name="twitter:description"]',
      "twitter:description",
      meta.description
    );
    const origin = import.meta.env.VITE_PUBLIC_SITE_URL?.trim();
    if (origin) {
      try {
        const base = new URL(origin);
        if (base.protocol !== "https:") return;
        const canonical = new URL(location, base).href;
        const image = new URL(
          "/assets/hero.jpg",
          base
        ).href;
        let link = document.head.querySelector<HTMLLinkElement>(
          'link[rel="canonical"]'
        );
        if (!link) {
          link = document.createElement("link");
          link.rel = "canonical";
          document.head.appendChild(link);
        }
        link.href = canonical;
        set('meta[property="og:url"]', "og:url", canonical, "property");
        set('meta[property="og:image"]', "og:image", image, "property");
        set('meta[name="twitter:image"]', "twitter:image", image);
      } catch {
        /* Invalid optional public origin is ignored. */
      }
    }
  }, [location]);
  return null;
}
