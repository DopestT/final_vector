"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";

const DEAL_TYPES = [
  "Service Contract",
  "Real Estate",
  "Partnership",
  "Supply Agreement",
  "Consulting",
  "Licensing",
  "Investment",
  "Other",
];

export default function CreateDealPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    dealType: "",
    counterparty: "",
    counterpartyEmail: "",
    amount: "",
    currency: "USD",
    deadline: "",
    description: "",
    useAI: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const canProceed1 = form.title && form.dealType && form.counterparty && form.counterpartyEmail;
  const canProceed2 = form.amount && form.deadline;

  if (submitted) {
    return (
      <DashboardLayout>
        <div className="max-w-xl mx-auto px-6 py-20 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-6"
            style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}
          >
            ✓
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{ color: "var(--dl-text)" }}>
            Deal Created
          </h1>
          <p className="mb-8" style={{ color: "var(--dl-muted-light)" }}>
            Your deal has been created and sent to {form.counterparty} for review. Both parties must accept terms before funding.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/deals/deal-001/terms"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--dl-gold)", color: "#080c1a" }}
            >
              Review Terms
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
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm mb-4 inline-block" style={{ color: "var(--dl-muted-light)" }}>
            ← Dashboard
          </Link>
          <h1 className="text-2xl font-bold" style={{ color: "var(--dl-text)" }}>
            Create Secure Deal
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--dl-muted-light)" }}>
            Define your deal terms — both parties must review and accept before any funds move.
          </p>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {["Deal Info", "Financials", "Description"].map((label, i) => {
            const n = i + 1;
            const active = step === n;
            const done = step > n;
            return (
              <div key={label} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: done ? "var(--dl-green)" : active ? "var(--dl-gold)" : "var(--dl-card)",
                      color: done || active ? "#080c1a" : "var(--dl-muted)",
                      border: `1px solid ${done ? "var(--dl-green)" : active ? "var(--dl-gold)" : "var(--dl-border)"}`,
                    }}
                  >
                    {done ? "✓" : n}
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: active ? "var(--dl-text)" : "var(--dl-muted)" }}
                  >
                    {label}
                  </span>
                </div>
                {i < 2 && (
                  <div className="w-8 h-px mx-1" style={{ background: "var(--dl-border)" }} />
                )}
              </div>
            );
          })}
        </div>

        <div
          className="p-6 rounded-xl"
          style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)" }}
        >
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-base font-semibold mb-4" style={{ color: "var(--dl-text)" }}>
                Deal Information
              </h2>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--dl-muted-light)" }}>
                  Deal Title *
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Software Development Contract"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none focus:ring-1"
                  style={{
                    background: "var(--dl-surface)",
                    border: "1px solid var(--dl-border)",
                    color: "var(--dl-text)",
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--dl-muted-light)" }}>
                  Deal Type *
                </label>
                <select
                  name="dealType"
                  value={form.dealType}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{
                    background: "var(--dl-surface)",
                    border: "1px solid var(--dl-border)",
                    color: form.dealType ? "var(--dl-text)" : "var(--dl-muted)",
                  }}
                >
                  <option value="" disabled>Select deal type</option>
                  {DEAL_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--dl-muted-light)" }}>
                  Counterparty Name *
                </label>
                <input
                  name="counterparty"
                  value={form.counterparty}
                  onChange={handleChange}
                  placeholder="Company or individual name"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{
                    background: "var(--dl-surface)",
                    border: "1px solid var(--dl-border)",
                    color: "var(--dl-text)",
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--dl-muted-light)" }}>
                  Counterparty Email *
                </label>
                <input
                  name="counterpartyEmail"
                  type="email"
                  value={form.counterpartyEmail}
                  onChange={handleChange}
                  placeholder="email@company.com"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{
                    background: "var(--dl-surface)",
                    border: "1px solid var(--dl-border)",
                    color: "var(--dl-text)",
                  }}
                />
              </div>

              <div
                className="flex items-start gap-3 p-3 rounded-lg"
                style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)" }}
              >
                <input
                  type="checkbox"
                  id="useAI"
                  checked={form.useAI}
                  onChange={(e) => setForm((f) => ({ ...f, useAI: e.target.checked }))}
                  className="mt-0.5"
                  style={{ accentColor: "var(--dl-gold)" }}
                />
                <label htmlFor="useAI" className="text-sm cursor-pointer" style={{ color: "var(--dl-muted-light)" }}>
                  <span className="font-medium" style={{ color: "var(--dl-gold)" }}>Use AI Deal Builder</span>
                  {" "}— auto-generate structured terms based on your deal type
                </label>
              </div>

              <div className="flex justify-end pt-2">
                <Button onClick={() => canProceed1 && setStep(2)} disabled={!canProceed1}>
                  Continue →
                </Button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-base font-semibold mb-4" style={{ color: "var(--dl-text)" }}>
                Financials & Timeline
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--dl-muted-light)" }}>
                    Deal Amount *
                  </label>
                  <input
                    name="amount"
                    type="number"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                    style={{
                      background: "var(--dl-surface)",
                      border: "1px solid var(--dl-border)",
                      color: "var(--dl-text)",
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--dl-muted-light)" }}>
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={form.currency}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                    style={{
                      background: "var(--dl-surface)",
                      border: "1px solid var(--dl-border)",
                      color: "var(--dl-text)",
                    }}
                  >
                    <option value="USD">USD — US Dollar</option>
                    <option value="EUR">EUR — Euro</option>
                    <option value="GBP">GBP — British Pound</option>
                    <option value="CAD">CAD — Canadian Dollar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--dl-muted-light)" }}>
                  Deal Deadline *
                </label>
                <input
                  name="deadline"
                  type="date"
                  value={form.deadline}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{
                    background: "var(--dl-surface)",
                    border: "1px solid var(--dl-border)",
                    color: "var(--dl-text)",
                  }}
                />
              </div>

              <div
                className="p-3 rounded-lg text-xs"
                style={{
                  background: "var(--dl-surface)",
                  border: "1px solid var(--dl-border)",
                  color: "var(--dl-muted-light)",
                }}
              >
                🔒 Funds are processed and protected through third-party escrow and payment partners.
                DealLock does not hold or custody funds directly.
              </div>

              <div className="flex justify-between pt-2">
                <Button variant="secondary" onClick={() => setStep(1)}>← Back</Button>
                <Button onClick={() => canProceed2 && setStep(3)} disabled={!canProceed2}>
                  Continue →
                </Button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-base font-semibold mb-4" style={{ color: "var(--dl-text)" }}>
                Deal Description & Terms Summary
              </h2>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--dl-muted-light)" }}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe the deal, deliverables, and key conditions..."
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
                  style={{
                    background: "var(--dl-surface)",
                    border: "1px solid var(--dl-border)",
                    color: "var(--dl-text)",
                  }}
                />
              </div>

              {/* Summary */}
              <div
                className="p-4 rounded-lg space-y-2"
                style={{ background: "var(--dl-surface)", border: "1px solid var(--dl-border)" }}
              >
                <div className="text-xs font-semibold mb-3" style={{ color: "var(--dl-muted-light)" }}>
                  DEAL SUMMARY
                </div>
                {[
                  ["Title", form.title || "—"],
                  ["Type", form.dealType || "—"],
                  ["Counterparty", form.counterparty || "—"],
                  ["Amount", form.amount ? `${form.currency} ${Number(form.amount).toLocaleString()}` : "—"],
                  ["Deadline", form.deadline || "—"],
                  ["AI Builder", form.useAI ? "Enabled" : "Manual"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span style={{ color: "var(--dl-muted)" }}>{k}</span>
                    <span style={{ color: "var(--dl-text)" }}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <Button variant="secondary" onClick={() => setStep(2)}>← Back</Button>
                <div className="flex gap-3">
                  {form.useAI && (
                    <Link
                      href="/deals/ai-builder"
                      className="px-4 py-2 rounded-lg text-sm font-semibold"
                      style={{
                        background: "transparent",
                        color: "var(--dl-gold)",
                        border: "1px solid var(--dl-gold-dim)",
                      }}
                    >
                      AI Builder →
                    </Link>
                  )}
                  <Button onClick={() => setSubmitted(true)}>
                    Create Deal
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
