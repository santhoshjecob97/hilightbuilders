type EventProps = { category?: string; source?: string };
type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: (...args: unknown[]) => void;
  }
}
let initialized = false;
function hasOptionalConsent() {
  try {
    return localStorage.getItem("hilight-consent-v1") === "all";
  } catch {
    return false;
  }
}
function initAnalytics() {
  if (initialized || !hasOptionalConsent() || typeof window === "undefined")
    return;
  const ga = import.meta.env.VITE_GA4_ID?.trim();
  const meta = import.meta.env.VITE_META_PIXEL_ID?.trim();
  const ads = import.meta.env.VITE_GOOGLE_ADS_ID?.trim();
  const validGa = ga && /^G-[A-Z0-9]+$/i.test(ga) ? ga : undefined;
  const validAds = ads && /^AW-[0-9]+$/i.test(ads) ? ads : undefined;
  if (validGa || validAds) {
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag || ((...args: unknown[]) => window.dataLayer!.push(args));
    window.gtag("js", new Date());
    if (validGa)
      window.gtag("config", validGa, {
        anonymize_ip: true,
        allow_google_signals: false,
      });
    if (validAds) window.gtag("config", validAds);
    const firstId = validGa || validAds;
    if (!document.querySelector(`script[data-hilight-ga="${firstId}"]`)) {
      const s = document.createElement("script");
      s.async = true;
      s.dataset.hilightGa = firstId;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(firstId)}`;
      document.head.appendChild(s);
    }
  }
  if (meta && /^[0-9]{5,20}$/.test(meta) && !window.fbq) {
    const f: any = function (...args: unknown[]) {
      (f.callMethod ? f.callMethod : (f.queue = f.queue || [])).push(args);
    };
    f.queue = [];
    f.version = "2.0";
    window.fbq = f;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
    f("init", meta);
    f("track", "PageView");
  }
  initialized = true;
}
if (typeof window !== "undefined")
  window.addEventListener("hilight:analytics-consent", initAnalytics);
export function trackEvent(name: string, props: EventProps = {}) {
  if (!hasOptionalConsent()) return;
  initAnalytics();
  const safe = { event_category: props.category, event_label: props.source };
  window.gtag?.("event", name, safe);
  window.fbq?.("trackCustom", name, {
    category: props.category,
    source: props.source,
  });
}
