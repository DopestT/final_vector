"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";

type VerifStatus = "verified" | "pending" | "required" | "not_started";

interface VerifItem {
  id: string;
  title: string;
  desc: string;
  status: VerifStatus;
  completedDate?: string;
  impact: string;
}

const STATUS_STYLE: Record<VerifStatus, { label: string; color: string; bg: string }> = {
  verified: { label: "Verified", color: "var(--dl-green)", bg: "rgba(34,197,94,0.1)" },
  pending: { label: "In Review", color: "var(--dl-gold)", bg: "rgba(201,168,76,0.1)" },
  required: { label: "Required", color: "var(--dl-red)", bg: "rgba(239,68,68,0.1)" },
  not_started: { label: "Not Started", color: "var(--dl-muted-light)", bg: "var(--dl-card)" },
};

const INITIAL_ITEMS: VerifItem[] = [
  {
    id: "identity",
    title: "Identity Verification (KYC)",
    desc: "Government-issued ID scan and liveness check. Required for all deal participants.",
    status: "verified",
    completedDate: "Jun 1, 2026",
    impact: "+20 Safety Score",
  },
  {
    id: "email",
    title: "Email Address",
    desc: "Verified email tied to your DealLock account.",
    status: "verified",
    completedDate: "May 28, 2026",
    impact: "+5 Safety Score",
  },
  {
    id: "phone",
    title: "Phone Number",
    desc: "SMS-verified mobile number for 2FA and notifications.",
    status: "verified",
    completedDate: "May 28, 2026",
    impact: "+5 Safety Score",
  },
  {
    id: "business",
    title: "Business / Entity Verification",
    desc: "Company registration, EIN, and authorized signatory verification.",
    status: "pending",
    impact: "+15 Safety Score",
  },
  {
    id: "bank",
    title: "Bank Account Verification",
    desc: "Verified bank account for fund releases. Micro-deposit or instant link.",
    status: "required",
    impact: "+10 Safety Score",
  },
  {
    id: "aml",
    title: "AML Screening",
    desc: "Anti-money laundering check against global watchlists. Auto-renewed annually.",
    status: "not_started",
    impact: "+10 Safety Score",
  },
  {
    id: "accredited",
    title: "Accredited Investor Status",
    desc: "For deals above $250K. SEC-compliant accreditation documentation.",
    status: "not_started",
    impact: "Unlocks high-value deals",
  },
];

export default function VerificationPage() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [starting, setStarting] = useState<string | null>(null);

  const verified = items.filter((i) => i.status === "verified").length;
  const total = items.length;

  const startVerification = (id: string) => {
    setStarting(id);
    setTimeout(() => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "pending" as VerifStatus } : item
        )
      );
      setStarting(null);
    }, 1200);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm mb-4 inline-block" style={{ color: "var(--dl-muted-light)" }}>
            ← Dashboard
          </Link>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--dl-text)" }}>
            Verification Center
          </h1>
          <p className="text-sm" style={{ color: "var(--dl-muted-light)" }}>
            Complete verifications to increase your deal safety scores and unlock full platform access.
          </p>
        </div>

        {/* Progress overview */}
        <div
          className="p-5 rounded-xl mb-8 flex items-center gap-6"
          style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)" }}
        >
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--dl-surface)" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                stroke="var(--dl-green)"
                strokeWidth="3"
                strokeDasharray={`${(verified / total) * 100} 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold" style={{ color: "var(--dl-green)" }}>
                {verified}
              </span>
              <span className="text-xs" style={{ color: "var(--dl-muted)" }}>/{total}</span>
            </div>
          </div>
          <div>
            <div className="text-base font-semibold mb-1" style={{ color: "var(--dl-text)" }}>
              {verified} of {total} verifications complete
            </div>
            <div className="text-sm mb-3" style={{ color: "var(--dl-muted-light)" }}>
              {total - verified} remaining — complete all to maximize deal protection.
            </div>
            <div className="flex gap-3">
              {(["verified", "pending", "required", "not_started"] as VerifStatus[]).map((s) => {
                const count = items.filter((i) => i.status === s).length;
                const cfg = STATUS_STYLE[s];
                return count > 0 ? (
                  <div key={s} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
                    <span className="text-xs" style={{ color: "var(--dl-muted)" }}>
                      {count} {cfg.label}
                    </span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-3">
          {items.map((item) => {
            const cfg = STATUS_STYLE[item.status];
            return (
              <div
                key={item.id}
                className="p-5 rounded-xl"
                style={{
                  background: "var(--dl-card)",
                  border: `1px solid ${item.status === "required" ? "rgba(239,68,68,0.25)" : item.status === "verified" ? "rgba(34,197,94,0.15)" : "var(--dl-border)"}`,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5"
                      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}33` }}
                    >
                      {item.status === "verified" ? "✓" : item.status === "pending" ? "⏳" : item.status === "required" ? "!" : "○"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold" style={{ color: "var(--dl-text)" }}>
                          {item.title}
                        </span>
                        <span
                          className="text-xs px-1.5 py-0.5 rounded"
                          style={{ background: cfg.bg, color: cfg.color }}
                        >
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-xs mb-1" style={{ color: "var(--dl-muted-light)" }}>
                        {item.desc}
                      </p>
                      <div className="text-xs" style={{ color: "var(--dl-gold)" }}>
                        {item.impact}
                        {item.completedDate && (
                          <span style={{ color: "var(--dl-muted)", marginLeft: 8 }}>
                            Completed {item.completedDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {item.status === "verified" && (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(34,197,94,0.1)", color: "var(--dl-green)" }}
                      >
                        ✓
                      </div>
                    )}
                    {item.status === "pending" && (
                      <span className="text-xs" style={{ color: "var(--dl-gold)" }}>Under review</span>
                    )}
                    {(item.status === "required" || item.status === "not_started") && (
                      <Button
                        size="sm"
                        variant={item.status === "required" ? "primary" : "outline"}
                        onClick={() => startVerification(item.id)}
                        disabled={starting === item.id}
                      >
                        {starting === item.id ? "Starting…" : "Start"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="mt-6 p-3 rounded-lg text-xs"
          style={{
            background: "var(--dl-surface)",
            border: "1px solid var(--dl-border)",
            color: "var(--dl-muted-light)",
          }}
        >
          🔒 Verification data is encrypted at rest and never shared with counterparties without your consent. Processed in compliance with applicable KYC/AML regulations.
        </div>
      </div>
    </DashboardLayout>
  );
}
