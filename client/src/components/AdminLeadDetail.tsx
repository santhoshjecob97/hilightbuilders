import { useState } from "react";
import { Download, X } from "lucide-react";
import { trpc } from "@/lib/trpc";

type Status =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "CONSULTATION"
  | "SITE_VISIT"
  | "PROPOSAL"
  | "NEGOTIATION"
  | "WON"
  | "LOST";
type LeadView = {
  id: number;
  status: Status;
  notes: string | null;
  followUpAt: Date | null;
  fullName: string;
  phone: string;
  email: string | null;
  location: string;
  kind: string;
  companyName: string | null;
  businessType: string | null;
  requirements: string | null;
  budget: string | null;
  serviceRequirements: string | null;
};
function localDate(value: Date | null) {
  if (!value) return "";
  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 16);
}
export function AdminLeadDetail({
  lead,
  onClose,
  onUpdated,
}: {
  lead: LeadView;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [notes, setNotes] = useState(lead.notes || "");
  const [followUp, setFollowUp] = useState(localDate(lead.followUpAt));
  const plans = trpc.admin.floorPlans.useQuery({ leadId: lead.id });
  const save = trpc.admin.updateLead.useMutation({ onSuccess: onUpdated });
  return (
    <section className="lead-detail" aria-labelledby="lead-detail-title">
      <div className="lead-detail-heading">
        <div>
          <span className="eyebrow">Private lead record · {lead.kind}</span>
          <h2 id="lead-detail-title">{lead.fullName}</h2>
        </div>
        <button
          className="icon-button"
          type="button"
          aria-label="Close lead details"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>
      <div className="lead-detail-grid">
        <dl>
          <dt>Phone</dt>
          <dd>{lead.phone}</dd>
          <dt>Email</dt>
          <dd>{lead.email || "Not supplied"}</dd>
          <dt>Project location</dt>
          <dd>{lead.location}</dd>
          <dt>Business / project type</dt>
          <dd>
            {[lead.companyName, lead.businessType]
              .filter(Boolean)
              .join(" · ") || lead.kind}
          </dd>
          <dt>Budget</dt>
          <dd>{lead.budget || "Not supplied"}</dd>
          <dt>Services</dt>
          <dd>{lead.serviceRequirements || "Not supplied"}</dd>
          <dt>Requirements</dt>
          <dd>{lead.requirements || "Not supplied"}</dd>
        </dl>
        <div className="lead-followup">
          <label className="form-field">
            <span>Internal notes</span>
            <textarea
              rows={6}
              maxLength={3000}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Add an internal note"
            />
          </label>
          <label className="form-field">
            <span>Follow-up date and time</span>
            <input
              type="datetime-local"
              value={followUp}
              onChange={e => setFollowUp(e.target.value)}
            />
          </label>
          <button
            className="button button-dark"
            disabled={save.isPending}
            onClick={() =>
              save.mutate({
                id: lead.id,
                status: lead.status,
                note: notes,
                followUpAt: followUp ? new Date(followUp) : null,
              })
            }
          >
            {save.isPending ? "Saving…" : "Save note & follow-up"}
          </button>
          {save.error && (
            <p className="form-error" role="alert">
              {save.error.message}
            </p>
          )}
        </div>
      </div>
      <div className="lead-plan-files">
        <strong>Private floor plans</strong>
        {plans.isLoading ? (
          <span>Checking…</span>
        ) : plans.error ? (
          <span className="form-error">Could not load secure files.</span>
        ) : !plans.data?.length ? (
          <span>No plan attached.</span>
        ) : (
          plans.data.map(plan => (
            <a
              key={plan.id}
              href={plan.downloadUrl}
              target="_blank"
              rel="noreferrer"
              download
            >
              <Download size={14} />
              {plan.fileName} · {(plan.sizeBytes / (1024 * 1024)).toFixed(1)} MB
            </a>
          ))
        )}
      </div>
    </section>
  );
}
