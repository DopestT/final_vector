"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MOCK_DEALS, STATUS_CONFIG } from "@/lib/mock-data";

const AUDIT_LOG = [
  { id: "a1", action: "Deal Created", actor: "john@example.com", target: "Software Development Contract", time: "Jun 1, 2026 09:00", severity: "info" },
  { id: "a2", action: "Terms Accepted", actor: "nexus@nexusdigital.com", target: "Software Development Contract", time: "Jun 2, 2026 14:15", severity: "info" },
  { id: "a3", action: "Funds Secured", actor: "System", target: "Software Development Contract", time: "Jun 3, 2026 10:00", severity: "success" },
  { id: "a4", action: "Dispute Filed", actor: "john@example.com", target: "Equipment Supply Deal", time: "Jun 15, 2026 09:45", severity: "danger" },
  { id: "a5", action: "Proof Submitted", actor: "nexus@nexusdigital.com", target: "Software Development Contract", time: "Jun 16, 2026 09:30", severity: "info" },
  { id: "a6", action: "KYC Verified", actor: "System", target: "john@example.com", time: "Jun 1, 2026 08:55", severity: "success" },
  { id: "a7", action: "Login — New Device", actor: "john@example.com", target: "Chrome / macOS", time: "Jun 19, 2026 07:30", severity: "warn" },
];

const COMPLIANCE_FLAGS = [
  { id: "f1", deal: "Equipment Supply Deal", flag: "Open dispute — funds frozen", severity: "danger", dealId: "deal-004" },
  { id: "f2", deal: "Brand Partnership Agreement", flag: "Funding overdue by 4 days", severity: "warn", dealId: "deal-003" },
  { id: "f3", deal: "Consulting Retainer", flag: "Terms not yet accepted by counterparty", severity: "info", dealId: "deal-005" },
];

const SEVERITY_STYLE = {
  info: { color: "#60a5fa", bg: "rgba(59,130,246,0.08)" },
  success: { color: "var(--dl-green)", bg: "rgba(34,197,94,0.08)" },
  warn: { color: "var(--dl-gold)", bg: "rgba(201,168,76,0.08)" },
  danger: { color: "var(--dl-red)", bg: "rgba(239,68,68,0.1)" },
};

const TABS = ["Overview", "All Deals", "Compliance Flags", "Audit Log"] as const;
type Tab = typeof TABS[number];

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm mb-4 inline-block" style={{ color: "var(--dl-muted-light)" }}>
            ← Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--dl-text)" }}>
                Admin & Compliance
              </h1>
              <p className="text-sm" style={{ color: "var(--dl-muted-light)" }}>
                Deal oversight, compliance monitoring, and audit trail.
              </p>
            </div>
            <div
              className="px-3 py-1.5 rounded text-xs font-semibold"
              style={{ background: "rgba(201,168,76,0.1)", color: "var(--dl-gold)", border: "1px solid rgba(201,168,76,0.25)" }}
            >
              Admin Access
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-xl w-fit" style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)" }}>
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: tab === t ? "var(--dl-surface)" : "transparent",
                color: tab === t ? "var(--dl-text)" : "var(--dl-muted)",
                border: tab === t ? "1px solid var(--dl-border)" : "1px solid transparent",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === "Overview" && (
          <div>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Deals", value: MOCK_DEALS.length, color: "var(--dl-text)" },
                {
                  label: "Total Value",
                  value: fmt(MOCK_DEALS.reduce((s, d) => s + d.amount, 0)),
                  color: "var(--dl-gold)",
                },
                {
                  label: "Active Disputes",
                  value: MOCK_DEALS.filter((d) => d.status === "disputed").length,
                  color: "var(--dl-red)",
                },
                {
                  label: "Compliance Flags",
                  value: COMPLIANCE_FLAGS.length,
                  color: "#f97316",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-5 rounded-xl"
                  style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)" }}
                >
                  <div className="text-2xl font-bold mb-1" style={{ color: s.color }}>
                    {s.value}
                  </div>
                  <div className="text-sm" style={{ color: "var(--dl-muted-light)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Recent flags */}
              <div>
                <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--dl-text)" }}>
                  Active Compliance Flags
                </h2>
                <div className="space-y-2">
                  {COMPLIANCE_FLAGS.map((f) => {
                    const s = SEVERITY_STYLE[f.severity as keyof typeof SEVERITY_STYLE];
                    return (
                      <Link
                        key={f.id}
                        href={`/deals/${f.dealId}/evidence`}
                        className="block p-3 rounded-lg"
                        style={{ background: s.bg, border: `1px solid ${s.color}33` }}
                      >
                        <div className="text-xs font-semibold mb-0.5" style={{ color: s.color }}>
                          {f.deal}
                        </div>
                        <div className="text-xs" style={{ color: "var(--dl-muted-light)" }}>
                          {f.flag}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Recent audit */}
              <div>
                <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--dl-text)" }}>
                  Recent Audit Events
                </h2>
                <div className="space-y-2">
                  {AUDIT_LOG.slice(0, 4).map((a) => {
                    const s = SEVERITY_STYLE[a.severity as keyof typeof SEVERITY_STYLE];
                    return (
                      <div
                        key={a.id}
                        className="p-3 rounded-lg flex items-start gap-3"
                        style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)" }}
                      >
                        <div
                          className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                          style={{ background: s.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium" style={{ color: "var(--dl-text)" }}>
                            {a.action}
                          </div>
                          <div className="text-xs truncate" style={{ color: "var(--dl-muted)" }}>
                            {a.actor} · {a.target}
                          </div>
                        </div>
                        <div className="text-xs flex-shrink-0" style={{ color: "var(--dl-muted)" }}>
                          {a.time.split(" ").slice(0, 3).join(" ")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Deals */}
        {tab === "All Deals" && (
          <div>
            <div className="overflow-hidden rounded-xl" style={{ border: "1px solid var(--dl-border)" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "var(--dl-surface)", borderBottom: "1px solid var(--dl-border)" }}>
                    {["Deal", "Counterparty", "Amount", "Status", "Safety", "Actions"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold"
                        style={{ color: "var(--dl-muted-light)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_DEALS.map((deal, i) => {
                    const cfg = STATUS_CONFIG[deal.status];
                    const scoreColor = deal.safetyScore >= 80 ? "var(--dl-green)" : deal.safetyScore >= 60 ? "var(--dl-gold)" : "var(--dl-red)";
                    return (
                      <tr
                        key={deal.id}
                        style={{
                          background: i % 2 === 0 ? "var(--dl-card)" : "var(--dl-surface)",
                          borderBottom: "1px solid var(--dl-border)",
                        }}
                      >
                        <td className="px-4 py-3">
                          <div className="font-medium" style={{ color: "var(--dl-text)" }}>{deal.title}</div>
                          <div className="text-xs" style={{ color: "var(--dl-muted)" }}>{deal.id}</div>
                        </td>
                        <td className="px-4 py-3" style={{ color: "var(--dl-muted-light)" }}>
                          {deal.counterparty}
                        </td>
                        <td className="px-4 py-3 font-medium" style={{ color: "var(--dl-text)" }}>
                          {fmt(deal.amount)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${cfg.bg} ${cfg.color}`}
                          >
                            {cfg.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold" style={{ color: scoreColor }}>
                            {deal.safetyScore}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            href={`/deals/${deal.id}/evidence`}
                            className="text-xs"
                            style={{ color: "var(--dl-gold)" }}
                          >
                            View →
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Compliance Flags */}
        {tab === "Compliance Flags" && (
          <div className="space-y-3">
            {COMPLIANCE_FLAGS.map((f) => {
              const s = SEVERITY_STYLE[f.severity as keyof typeof SEVERITY_STYLE];
              return (
                <div
                  key={f.id}
                  className="p-5 rounded-xl flex items-center justify-between gap-4"
                  style={{ background: "var(--dl-card)", border: `1px solid ${s.color}44` }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
                      style={{ background: s.bg, color: s.color }}
                    >
                      {f.severity === "danger" ? "⚠" : f.severity === "warn" ? "!" : "i"}
                    </div>
                    <div>
                      <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--dl-text)" }}>
                        {f.deal}
                      </div>
                      <div className="text-sm" style={{ color: "var(--dl-muted-light)" }}>{f.flag}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Link
                      href={`/deals/${f.dealId}/evidence`}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}44` }}
                    >
                      View Deal
                    </Link>
                    <button
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ background: "var(--dl-surface)", color: "var(--dl-muted-light)", border: "1px solid var(--dl-border)" }}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Audit Log */}
        {tab === "Audit Log" && (
          <div className="overflow-hidden rounded-xl" style={{ border: "1px solid var(--dl-border)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--dl-surface)", borderBottom: "1px solid var(--dl-border)" }}>
                  {["Event", "Actor", "Target", "Timestamp", "Severity"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold"
                      style={{ color: "var(--dl-muted-light)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AUDIT_LOG.map((a, i) => {
                  const s = SEVERITY_STYLE[a.severity as keyof typeof SEVERITY_STYLE];
                  return (
                    <tr
                      key={a.id}
                      style={{
                        background: i % 2 === 0 ? "var(--dl-card)" : "var(--dl-surface)",
                        borderBottom: "1px solid var(--dl-border)",
                      }}
                    >
                      <td className="px-4 py-3 font-medium" style={{ color: "var(--dl-text)" }}>
                        {a.action}
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--dl-muted-light)" }}>
                        {a.actor}
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--dl-muted-light)" }}>
                        {a.target}
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--dl-muted)" }}>
                        {a.time}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-xs px-2 py-0.5 rounded capitalize"
                          style={{ background: s.bg, color: s.color }}
                        >
                          {a.severity}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
