import { useRef, useState } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { trackEvent } from "@/lib/analytics";

type Kind = "residential" | "commercial" | "construction" | "general";
type LeadSource =
  | "Organic Search"
  | "Google Ads"
  | "Meta Ads"
  | "Instagram"
  | "LinkedIn"
  | "WhatsApp"
  | "Referral"
  | "Direct"
  | "Other";
type FloorPlanMime = "application/pdf" | "image/jpeg" | "image/png";
type FormState = Record<string, string>;
const serviceOptions = [
  "Complete interiors",
  "Kitchen",
  "Living room",
  "Bedrooms & wardrobes",
  "Office",
  "Retail / hospitality",
  "Construction",
  "Renovation",
  "Turnkey execution",
];
const budgetOptions = [
  "Prefer to discuss",
  "Under ₹5 lakh",
  "₹5–10 lakh",
  "₹10–20 lakh",
  "₹20–40 lakh",
  "₹40 lakh+",
  "To be determined",
];
const dateOptions = [
  "As soon as possible",
  "Within 1–3 months",
  "Within 3–6 months",
  "More than 6 months",
  "To be discussed",
];
const phonePattern = /^(?:\+91[\s-]?)?[6-9]\d{9}$/;
function Field({
  label,
  name,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
  error,
  options,
  multiple,
}: {
  label: string;
  name: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  error?: string;
  options?: string[];
  multiple?: boolean;
}) {
  return (
    <label className={`form-field ${multiple ? "field-wide" : ""}`}>
      <span>
        {label}
        {required && <i> *</i>}
      </span>
      {options ? (
        <select
          name={name}
          value={value || ""}
          required={required}
          onChange={e => onChange(name, e.target.value)}
        >
          <option value="">Select an option</option>
          {options.map(o => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={value || ""}
          required={required}
          rows={3}
          placeholder={placeholder}
          onChange={e => onChange(name, e.target.value)}
          aria-invalid={!!error}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value || ""}
          required={required}
          placeholder={placeholder}
          onChange={e => onChange(name, e.target.value)}
          aria-invalid={!!error}
        />
      )}
      {error && (
        <small className="field-error" role="alert">
          {error}
        </small>
      )}
    </label>
  );
}
export function LeadForm({
  kind,
  showKindSelector = false,
}: {
  kind: Kind;
  showKindSelector?: boolean;
}) {
  const [values, setValues] = useState<FormState>({ kind });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [submissionKey] = useState(() => crypto.randomUUID());
  const trap = useRef<HTMLInputElement>(null);
  const mutation = trpc.leads.submit.useMutation({
    onSuccess: () => {
      trackEvent("lead_form_submission", { category: values.kind || kind });
      if (file)
        trackEvent("floor_plan_submission", { category: values.kind || kind });
      setSubmitted(true);
      setMessage(
        "Thank you. Your enquiry has been received by HILIGHT BUILDERS."
      );
    },
    onError: () =>
      setMessage(
        "We couldn’t submit your enquiry right now. Your information has not been confirmed as received—please try again shortly or email midsrini@gmail.com."
      ),
  });
  const set = (name: string, value: string) =>
    setValues(v => ({ ...v, [name]: value }));
  const currentKind: Kind = ((showKindSelector ? values.kind : kind) ||
    kind) as Kind;
  const commercial = currentKind === "commercial";
  const home = currentKind === "residential";
  const onFile = (selected: File | undefined) => {
    setFileError("");
    if (!selected) {
      setFile(null);
      return;
    }
    const allowed = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowed.includes(selected.type)) {
      setFileError("Choose a PDF, JPG or PNG floor plan.");
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      setFileError("The file must be 5 MB or smaller.");
      return;
    }
    setFile(selected);
  };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (mutation.isPending) return;
    const next: Record<string, string> = {};
    if (!values.fullName?.trim()) next.fullName = "Enter your full name.";
    const normalizedPhone = (values.phone || "").replace(/[()\s-]/g, "");
    if (!phonePattern.test(normalizedPhone))
      next.phone = "Enter a valid 10-digit Indian mobile number.";
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Enter a valid email address.";
    if (commercial && !values.email) next.email = "Enter your email address.";
    if (!values.location?.trim()) next.location = "Enter the project location.";
    if (commercial && !values.businessType?.trim())
      next.businessType = "Enter your business type.";
    if (!values.consent)
      next.consent = "Please consent to being contacted about this enquiry.";
    if (fileError) {
      setErrors(next);
      return;
    }
    setErrors(next);
    if (Object.keys(next).length) {
      document
        .querySelector(`[name="${Object.keys(next)[0]}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    let floorPlan:
      | { fileName: string; mimeType: FloorPlanMime; dataBase64: string }
      | undefined;
    if (file) {
      try {
        floorPlan = await new Promise((resolve, reject) => {
          const r = new FileReader();
          r.onload = () =>
            resolve({
              fileName: file.name,
              mimeType: file.type as FloorPlanMime,
              dataBase64: String(r.result).split(",")[1],
            });
          r.onerror = reject;
          r.readAsDataURL(file);
        });
      } catch {
        setMessage(
          "The selected floor plan could not be read. Remove it or choose another file."
        );
        return;
      }
    }
    const sourceParam =
      new URLSearchParams(window.location.search).get("utm_source") || "";
    const sourceMap: Record<string, LeadSource> = {
      google: "Google Ads",
      facebook: "Meta Ads",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      whatsapp: "WhatsApp",
      referral: "Referral",
    };
    const source: LeadSource =
      sourceMap[sourceParam.toLowerCase()] ||
      (document.referrer ? "Organic Search" : "Direct");
    mutation.mutate({
      ...values,
      fullName: values.fullName.trim(),
      phone: normalizedPhone,
      location: values.location.trim(),
      kind: currentKind,
      consent: "yes",
      submissionKey,
      serviceRequirements: values.serviceRequirements || "",
      source,
      website: trap.current?.value || "",
      ...(floorPlan ? { floorPlan } : {}),
    });
  };
  if (submitted)
    return (
      <div className="form-success" role="status">
        <span>
          <Check size={22} />
        </span>
        <h3>Thank you for getting in touch.</h3>
        <p>{message}</p>
        <small>
          Your enquiry has been received. HILIGHT BUILDERS will follow up using
          the contact details you provided.
        </small>
      </div>
    );
  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      <input
        className="honeypot"
        ref={trap}
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      {showKindSelector && (
        <label className="form-field field-wide">
          <span>What are you planning? *</span>
          <select
            id="lead-kind"
            value={currentKind}
            onChange={e => set("kind", e.target.value)}
          >
            <option value="general">General enquiry</option>
            <option value="residential">Residential interiors</option>
            <option value="commercial">Commercial interiors</option>
            <option value="construction">Construction / renovation</option>
          </select>
        </label>
      )}
      <div className="form-row">
        <Field
          label="Full name"
          name="fullName"
          value={values.fullName}
          required
          onChange={set}
          error={errors.fullName}
          placeholder="Your name"
        />
        <Field
          label="Phone number"
          name="phone"
          type="tel"
          value={values.phone}
          required
          onChange={set}
          error={errors.phone}
          placeholder="10-digit Indian mobile"
        />
      </div>
      <div className="form-row">
        <Field
          label="Email address"
          name="email"
          type="email"
          value={values.email}
          required={commercial}
          onChange={set}
          error={errors.email}
          placeholder="you@example.com"
        />
        <Field
          label="Project location"
          name="location"
          value={values.location}
          required
          onChange={set}
          error={errors.location}
          placeholder="Area / city"
        />
      </div>
      {home && (
        <div className="form-row">
          <Field
            label="Property type"
            name="propertyType"
            options={["Apartment", "Villa", "Independent house", "Other"]}
            value={values.propertyType}
            onChange={set}
          />
          <Field
            label="Approximate area"
            name="area"
            value={values.area}
            onChange={set}
            placeholder="e.g. 1,200 sq. ft."
          />
        </div>
      )}
      {home && (
        <div className="form-row">
          <Field
            label="Number of bedrooms"
            name="bedrooms"
            options={["Studio / 1", "2", "3", "4", "5+", "Not applicable"]}
            value={values.bedrooms}
            onChange={set}
          />
          <Field
            label="Project type"
            name="projectType"
            options={["New home", "Renovation", "Not sure yet"]}
            value={values.projectType}
            onChange={set}
          />
        </div>
      )}
      {commercial && (
        <div className="form-row">
          <Field
            label="Company name"
            name="companyName"
            value={values.companyName}
            required
            onChange={set}
            placeholder="Company"
          />
          <Field
            label="Your designation"
            name="designation"
            value={values.designation}
            onChange={set}
            placeholder="Your role"
          />
        </div>
      )}
      {(commercial || currentKind === "construction") && (
        <div className="form-row">
          <Field
            label="Business type"
            name="businessType"
            value={values.businessType}
            required={currentKind === "commercial"}
            onChange={set}
            error={errors.businessType}
            placeholder="Office, retail, clinic…"
          />
          <Field
            label="Approximate area"
            name="area"
            value={values.area}
            onChange={set}
            placeholder="e.g. 2,000 sq. ft."
          />
        </div>
      )}
      {(commercial || currentKind === "construction") && (
        <div className="form-row">
          <Field
            label="Fit-out type"
            name="projectType"
            options={[
              "New fit-out",
              "Renovation",
              "Construction / turnkey",
              "Not sure yet",
            ]}
            value={values.projectType}
            onChange={set}
          />
          <Field
            label="Possession status"
            name="possessionStatus"
            options={["Possession available", "Expected", "Under discussion"]}
            value={values.possessionStatus}
            onChange={set}
          />
        </div>
      )}
      <div className="form-row">
        <Field
          label="Indicative budget"
          name="budget"
          options={budgetOptions}
          value={values.budget}
          onChange={set}
        />
        <Field
          label={
            commercial ? "Desired opening / completion" : "Expected start date"
          }
          name="startDate"
          options={dateOptions}
          value={values.startDate}
          onChange={set}
        />
      </div>
      <fieldset className="service-picker field-wide">
        <legend>Services you’re considering</legend>
        <div>
          {serviceOptions.map(option => (
            <label key={option}>
              <input
                type="checkbox"
                checked={(values.serviceRequirements || "")
                  .split("| ")
                  .includes(option)}
                onChange={e =>
                  set(
                    "serviceRequirements",
                    e.target.checked
                      ? [values.serviceRequirements, option]
                          .filter(Boolean)
                          .join("| ")
                      : (values.serviceRequirements || "")
                          .split("| ")
                          .filter(x => x !== option)
                          .join("| ")
                  )
                }
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="form-field field-wide">
        <span>Floor plan (optional)</span>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
          onChange={e => onFile(e.target.files?.[0])}
        />
        <small>
          PDF, JPG or PNG · maximum 5 MB. Shared only for this enquiry.
        </small>
        {fileError && (
          <small className="field-error" role="alert">
            {fileError}
          </small>
        )}
      </label>
      <Field
        label="Additional requirements"
        name="requirements"
        type="textarea"
        value={values.requirements}
        onChange={set}
        placeholder="What would you like the team to know?"
      />
      <label className="consent-row field-wide">
        <input
          type="checkbox"
          checked={!!values.consent}
          onChange={e => set("consent", e.target.checked ? "yes" : "")}
        />
        <span>
          I agree that HILIGHT BUILDERS may contact me about this enquiry.{" "}
          <a href="/consent">Enquiry consent</a>.
        </span>
      </label>
      {errors.consent && (
        <small className="field-error field-wide" role="alert">
          {errors.consent}
        </small>
      )}
      {message && !submitted && (
        <p className="form-error field-wide" role="alert">
          {message}
        </p>
      )}
      <button
        className="button button-orange form-submit field-wide"
        type="submit"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <>
            <LoaderCircle size={16} className="spin" /> Sending…
          </>
        ) : (
          <>
            Send enquiry <ArrowUpRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}
