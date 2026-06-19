"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MOCK_DISPUTES, DisputeStatus } from "@/lib/mock-data";

const STATUS_STYLE: Record<DisputeStatus, { label: string; color: string; bg: string }> = {
  open: { label: "Open", color: "var(--dl-red)", bg: "rgba(239,68,68,0.1)" },
  under_review: { label: "Under Review", color: "#f97316", bg: "rgba(249,115,22,0.1)" },
  resolved: { label: "Resolved", color: "var(--dl-green)", bg: "rgba(34,197,94,0.1)" },
  escalated: { label: "Escalated", color: "var(--dl-red)", bg: "rgba(239,68,68,0.15)" },
};

const TIMELINE_STEPS = [
  { label: "Dispute Filed", done: true, date: "Jun 15, 2026" },
  { label: "Evidence Review", done: true, date: "Jun 16, 2026" },
  { label: "Mediation", done: false, date: "Pending" },
  { label: "Resolution", done: false, date: "TBD" },
];

export default function DisputeCenterPage() {
  const [selected, setSelected] = useState(MOCK_DISPUTES[0].id);
  const dispute = MOCK_DISPUTES.find((d) => d.id === selected) || MOCK_DISPUTES[0];
  const cfg = STATUS_STYLE[dispute.status];

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm mb-4 inline-block" style={{ color: "var(--dl-muted-light)" }}>
            ← Dashboard
          </Link>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--dl-text)" }}>
            Dispute Center
          </h1>
          <p className="text-sm" style={{ color: "var(--dl-muted-light)" }}>
            Structured resolution backed by documented evidence. All disputes are reviewed by our compliance team.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* List */}
          <div className="col-span-1">
            <h2 className="text-xs font-semibold mb-3" style={{ color: "var(--dl-muted-light)" }}>
              YOUR DISPUTES
            </h2>
            <div className="space-y-2">
              {MOCK_DISPUTES.map((d) => {
                const s = STATUS_STYLE[d.status];
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelected(d.id)}
                    className="w-full p-4 rounded-xl text-left transition-all"
                    style={{
                      background: selected === d.id ? "rgba(239,68,68,0.06)" : "var(--dl-card)",
                      border: `1px solid ${selected === d.id ? "rgba(239,68,68,0.3)" : "var(--dl-border)"}`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-sm font-semibold line-clamp-1" style={{ color: "var(--dl-text)" }}>
                        {d.dealTitle}
                      </span>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded flex-shrink-0"
                        style={{ background: s.bg, color: s.color }}
                      >
                        {s.label}
                      </span>
                    </div>
                    <div className="text-xs mb-1" style={{ color: "var(--dl-muted)" }}>
                      Filed {d.filedAt} by {d.filedBy}
                    </div>
                    <div className="text-xs font-medium" style={{ color: "var(--dl-red)" }}>
                      {fmt(d.amount)}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4">
              <Link
                href="/deals/deal-001/review"
                className="block w-full text-center px-3 py-2 rounded-lg text-xs font-semibold"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "var(--dl-red)",
                }}
              >
                + File New Dispute
              </Link>
            </div>
          </div>

          {/* Detail */}
          <div className="col-span-2">
            <div
              className="p-6 rounded-xl mb-4"
              style={{ background: "var(--dl-card)", border: `1px solid ${dispute.status === "resolved" ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}` }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-lg font-bold" style={{ color: "var(--dl-text)" }}>
                      {dispute.dealTitle}
                    </h2>
                    <span
                      className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}33` }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <div className="text-xs" style={{ color: "var(--dl-muted)" }}>
                    Dispute #{dispute.id} · Filed {dispute.filedAt} by {dispute.filedBy}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xl font-bold" style={{ color: "var(--dl-red)" }}>
                    {fmt(dispute.amount)}
                  </div>
                  <div className="text-xs" style={{ color: "var(--dl-muted)" }}>funds frozen</div>
                </div>
              </div>

              <div
                className="p-3 rounded-lg mb-4"
                style={{ background: "var(--dl-surface)", border: "1px solid var(--dl-border)" }}
              >
                <div className="text-xs font-semibold mb-1" style={{ color: "var(--dl-muted-light)" }}>DISPUTE REASON</div>
                <p className="text-sm" style={{ color: "var(--dl-text)" }}>{dispute.reason}</p>
              </div>

              {/* Timeline */}
              <div>
                <div className="text-xs font-semibold mb-3" style={{ color: "var(--dl-muted-light)" }}>RESOLUTION TIMELINE</div>
                <div className="flex items-center gap-0">
                  {TIMELINE_STEPS.map((step, i) => (
                    <div key={step.label} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1"
                          style={{
                            background: step.done ? "var(--dl-green)" : "var(--dl-surface)",
                            border: `1px solid ${step.done ? "var(--dl-green)" : "var(--dl-border)"}`,
                            color: step.done ? "#fff" : "var(--dl-muted)",
                          }}
                        >
                          {step.done ? "✓" : i + 1}
                        </div>
                        <div className="text-xs text-center" style={{ color: step.done ? "var(--dl-text)" : "var(--dl-muted)" }}>
                          {step.label}
                        </div>
                        <div className="text-xs" style={{ color: "var(--dl-muted)" }}>{step.date}</div>
                      </div>
                      {i < TIMELINE_STEPS.length - 1 && (
                        <div className="w-8 h-px" style={{ background: step.done ? "var(--dl-green)" : "var(--dl-border)" }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            {dispute.status !== "resolved" && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="p-3 rounded-lg text-sm font-semibold"
                  style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)", color: "var(--dl-text)" }}
                >
                  Submit Additional Evidence
                </button>
                <button
                  className="p-3 rounded-lg text-sm font-semibold"
                  style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)", color: "var(--dl-text)" }}
                >
                  Request Mediation
                </button>
                <button
                  className="p-3 rounded-lg text-sm font-semibold col-span-2"
                  style={{
                    background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "var(--dl-red)",
                  }}
                >
                  Escalate to Senior Review
                </button>
              </div>
            )}

            {dispute.status === "resolved" && (
              <div
                className="p-4 rounded-xl"
                style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)" }}
              >
                <div className="text-sm font-semibold mb-1" style={{ color: "var(--dl-green)" }}>
                  Dispute Resolved
                </div>
                <div className="text-sm" style={{ color: "var(--dl-muted-light)" }}>
                  This dispute was resolved on May 15, 2026. Funds have been disbursed per the resolution agreement.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
