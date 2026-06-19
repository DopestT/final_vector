"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import { MOCK_DEALS } from "@/lib/mock-data";

type Action = "approve" | "changes" | "dispute" | null;

const SUBMITTED_FILES = [
  { name: "delivery_confirmation.pdf", size: "342 KB", verified: true },
  { name: "project_screenshots.zip", size: "1.8 MB", verified: true },
];

const CHECKLIST = [
  "All deliverables have been received as specified in the deal terms",
  "Work quality meets the agreed professional standards",
  "All milestone requirements have been fulfilled",
  "No outstanding items remain per the original scope",
];

export default function ReviewPage() {
  const params = useParams();
  const deal = MOCK_DEALS.find((d) => d.id === params.id) || MOCK_DEALS[1];
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: deal.currency }).format(n);

  const [checked, setChecked] = useState<boolean[]>(Array(CHECKLIST.length).fill(false));
  const [action, setAction] = useState<Action>(null);
  const [changesNote, setChangesNote] = useState("");
  const [disputeReason, setDisputeReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const allChecked = checked.every(Boolean);

  const toggleCheck = (i: number) => setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));

  if (submitted) {
    return (
      <DashboardLayout>
        <div className="max-w-xl mx-auto px-6 py-20 text-center">
          {action === "approve" && (
            <>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-6"
                style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}
              >
                ✓
              </div>
              <h1 className="text-2xl font-bold mb-3" style={{ color: "var(--dl-text)" }}>Deal Approved</h1>
              <p className="mb-2" style={{ color: "var(--dl-muted-light)" }}>
                You have approved the delivery. Funds of {fmt(deal.amount)} are being released to {deal.counterparty}.
              </p>
              <p className="text-xs mb-8" style={{ color: "var(--dl-muted)" }}>
                Funds released through third-party escrow partner. Settlement time: 1–3 business days.
              </p>
            </>
          )}
          {action === "changes" && (
            <>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-6"
                style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)" }}
              >
                ✍
              </div>
              <h1 className="text-2xl font-bold mb-3" style={{ color: "var(--dl-text)" }}>Changes Requested</h1>
              <p className="mb-8" style={{ color: "var(--dl-muted-light)" }}>
                Your change request has been sent to {deal.counterparty}. Funds remain protected until the matter is resolved.
              </p>
            </>
          )}
          {action === "dispute" && (
            <>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-6"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}
              >
                ⚖
              </div>
              <h1 className="text-2xl font-bold mb-3" style={{ color: "var(--dl-red)" }}>Dispute Filed</h1>
              <p className="mb-2" style={{ color: "var(--dl-muted-light)" }}>
                A dispute has been opened on this deal. Funds remain frozen until resolution.
              </p>
              <p className="text-xs mb-8" style={{ color: "var(--dl-muted)" }}>
                Our compliance team will review the evidence within 2 business days.
              </p>
            </>
          )}
          <div className="flex gap-3 justify-center">
            <Link
              href="/disputes"
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 ${action !== "dispute" ? "hidden" : ""}`}
              style={{ background: "var(--dl-red)", color: "#fff" }}
            >
              View Dispute
            </Link>
            <Link
              href={`/deals/${deal.id}/evidence`}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--dl-gold)", color: "#080c1a" }}
            >
              View Timeline →
            </Link>
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold"
              style={{ background: "var(--dl-card)", color: "var(--dl-text)", border: "1px solid var(--dl-border)" }}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link href={`/deals/${deal.id}/evidence`} className="text-sm mb-4 inline-block" style={{ color: "var(--dl-muted-light)" }}>
            ← Evidence Timeline
          </Link>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--dl-text)" }}>
            Approve / Request Changes / Dispute
          </h1>
          <p className="text-sm" style={{ color: "var(--dl-muted-light)" }}>
            Review the submitted proof and decide how to proceed.
          </p>
        </div>

        {/* Deal summary */}
        <div
          className="p-4 rounded-xl mb-6 flex justify-between items-start"
          style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)" }}
        >
          <div>
            <div className="text-sm font-semibold mb-1" style={{ color: "var(--dl-text)" }}>{deal.title}</div>
            <div className="text-xs" style={{ color: "var(--dl-muted-light)" }}>{deal.counterparty}</div>
          </div>
          <div className="text-right">
            <div className="text-base font-bold" style={{ color: "var(--dl-gold)" }}>{fmt(deal.amount)}</div>
            <div className="text-xs" style={{ color: "var(--dl-muted)" }}>pending release</div>
          </div>
        </div>

        {/* Submitted proof */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--dl-text)" }}>Submitted Proof</h2>
          <div className="space-y-2">
            {SUBMITTED_FILES.map((f) => (
              <div
                key={f.name}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)" }}
              >
                <span className="text-lg">📎</span>
                <div className="flex-1">
                  <div className="text-sm" style={{ color: "var(--dl-text)" }}>{f.name}</div>
                  <div className="text-xs" style={{ color: "var(--dl-muted)" }}>{f.size}</div>
                </div>
                {f.verified && (
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{ background: "rgba(34,197,94,0.1)", color: "var(--dl-green)" }}
                  >
                    Verified
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Acceptance checklist */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--dl-text)" }}>Review Checklist</h2>
          <div className="space-y-2">
            {CHECKLIST.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg cursor-pointer"
                onClick={() => toggleCheck(i)}
                style={{
                  background: checked[i] ? "rgba(34,197,94,0.04)" : "var(--dl-card)",
                  border: `1px solid ${checked[i] ? "rgba(34,197,94,0.2)" : "var(--dl-border)"}`,
                }}
              >
                <div
                  className="w-5 h-5 rounded flex items-center justify-center text-xs flex-shrink-0 mt-0.5"
                  style={{
                    background: checked[i] ? "var(--dl-green)" : "var(--dl-surface)",
                    border: `1px solid ${checked[i] ? "var(--dl-green)" : "var(--dl-border)"}`,
                    color: "#fff",
                  }}
                >
                  {checked[i] ? "✓" : ""}
                </div>
                <span className="text-sm" style={{ color: "var(--dl-text)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action selection */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--dl-text)" }}>Your Decision</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "approve" as Action, label: "Approve & Release", color: "var(--dl-green)", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)" },
              { id: "changes" as Action, label: "Request Changes", color: "var(--dl-gold)", bg: "rgba(201,168,76,0.08)", border: "rgba(201,168,76,0.3)" },
              { id: "dispute" as Action, label: "Open Dispute", color: "var(--dl-red)", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)" },
            ].map((a) => (
              <button
                key={a.id}
                onClick={() => setAction(a.id)}
                className="p-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: action === a.id ? a.bg : "var(--dl-card)",
                  border: `1px solid ${action === a.id ? a.border : "var(--dl-border)"}`,
                  color: action === a.id ? a.color : "var(--dl-muted-light)",
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* Conditional input */}
        {action === "changes" && (
          <div className="mb-6">
            <label className="block text-xs font-semibold mb-2" style={{ color: "var(--dl-muted-light)" }}>
              DESCRIBE REQUIRED CHANGES *
            </label>
            <textarea
              value={changesNote}
              onChange={(e) => setChangesNote(e.target.value)}
              rows={3}
              placeholder="What needs to be corrected or completed?"
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
              style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)", color: "var(--dl-text)" }}
            />
          </div>
        )}

        {action === "dispute" && (
          <div className="mb-6">
            <label className="block text-xs font-semibold mb-2" style={{ color: "var(--dl-red)" }}>
              DISPUTE REASON *
            </label>
            <textarea
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              rows={3}
              placeholder="Clearly describe the breach or failure and reference specific deal terms..."
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
              style={{
                background: "rgba(239,68,68,0.04)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "var(--dl-text)",
              }}
            />
            <p className="text-xs mt-2" style={{ color: "var(--dl-muted)" }}>
              Opening a dispute freezes all funds until resolution. Our compliance team will review within 2 business days.
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <Link
            href={`/deals/${deal.id}/evidence`}
            className="px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ background: "var(--dl-card)", color: "var(--dl-text)", border: "1px solid var(--dl-border)" }}
          >
            Cancel
          </Link>
          <Button
            className="flex-1"
            variant={action === "dispute" ? "danger" : action === "approve" ? "primary" : "primary"}
            disabled={
              !action ||
              (action === "approve" && !allChecked) ||
              (action === "changes" && !changesNote.trim()) ||
              (action === "dispute" && !disputeReason.trim())
            }
            onClick={() => setSubmitted(true)}
          >
            {action === "approve" && "Approve & Release Funds →"}
            {action === "changes" && "Send Change Request →"}
            {action === "dispute" && "File Dispute →"}
            {!action && "Select a decision above"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
