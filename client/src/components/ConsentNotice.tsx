import { useEffect, useState } from "react";
import { Link } from "wouter";
export function ConsentNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      const choice = localStorage.getItem("hilight-consent-v1");
      setVisible(!choice);
      if (choice === "all")
        window.dispatchEvent(new CustomEvent("hilight:analytics-consent"));
    } catch {
      setVisible(true);
    }
  }, []);
  const choose = (choice: "essential" | "all") => {
    try {
      localStorage.setItem("hilight-consent-v1", choice);
    } catch {
      /* Optional preference storage may be blocked. */
    }
    setVisible(false);
    if (choice === "all")
      window.dispatchEvent(new CustomEvent("hilight:analytics-consent"));
  };
  if (!visible) return null;
  return (
    <aside
      className="consent-banner"
      role="region"
      aria-label="Privacy choices"
    >
      <p>
        Essential site storage supports enquiry forms. Optional analytics or
        marketing tags remain off unless you allow them.{" "}
        <Link href="/cookies">Cookie details</Link>.
      </p>
      <div>
        <button onClick={() => choose("essential")}>Essential only</button>
        <button className="consent-allow" onClick={() => choose("all")}>
          Allow optional
        </button>
      </div>
    </aside>
  );
}
