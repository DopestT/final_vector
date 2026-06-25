"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import { MOCK_DEALS } from "@/lib/mock-data";

const DEAL_TERMS = [
  "The Performing Party shall deliver all agreed outputs as defined in the deal description.",
  "Payment will be released upon written approval of delivery by the Receiving Party.",
  "All work product created under this agreement becomes property of the Receiving Party upon final payment.",
  "Either party may terminate this agreement with 14 days written notice.",
  "The Performing Party warrants that work will meet professional industry standards.",
  "Any disputes shall first be subject to a 14-day good-faith negotiation period.",
  "Confidential information disclosed during this deal is subject to a 24-month non-disclosure obligation.",
  "Funds are processed and protected through third-party escrow and payment partners. DealLock does not hold funds directly.",
];

export default function TermsPage() {
  const params = useParams();
  const deal = MOCK_DEALS.find((d) => d.id === params.id) || MOCK_DEALS[0];
  const [accepted, setAccepted] = useState(deal.termsAccepted);
  const [checkedTerms, setCheckedTerms] = useState<boolean[]>(Array(DEAL_TERMS.length).fill(false));
  const [submitted, setSubmitted] = useState(false);

  const allChecked = checkedTerms.every(Boolean);

  const toggleTerm = (i: number) => {
    setCheckedTerms((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  if (submitted || accepted) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-6"
            style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}
          >
            ✓
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{ color: "var(--dl-text)" }}>
            Terms Accepted
          </h1>
          <p className="mb-2" style={{ color: "var(--dl-muted-light)" }}>
            You have accepted the deal terms for <strong style={{ color: "var(--dl-text)" }}>{deal.title}</strong>.
          </p>
          <p className="text-sm mb-8" style={{ color: "var(--dl-muted)" }}>
            Waiting for {deal.counterparty} to accept.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href={`/deals/${deal.id}/fund`}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--dl-gold)", color: "#080c1a" }}
            >
              Proceed to Funding →
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
          <Link href="/dashboard" className="text-sm mb-4 inline-block" style={{ color: "var(--dl-muted-light)" }}>
            ← Dashboard
          </Link>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--dl-text)" }}>
            Review & Accept Terms
          </h1>
          <p className="text-sm" style={{ color: "var(--dl-muted-light)" }}>
            Both parties must review and accept all terms before funds are protected.
          </p>
        </div>

        {/* Deal header */}
        <div
          className="p-4 rounded-xl mb-6"
          style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)" }}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm font-semibold mb-1" style={{ color: "var(--dl-text)" }}>
                {deal.title}
              </div>
              <div className="text-xs" style={{ color: "var(--dl-muted-light)" }}>
                {deal.counterparty} · {deal.dealType}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold" style={{ color: "var(--dl-gold)" }}>
                {new Intl.NumberFormat("en-US", { style: "currency", currency: deal.currency }).format(deal.amount)}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--dl-muted)" }}>
                Due {deal.deadline}
              </div>
            </div>
          </div>
        </div>

        {/* Signatures status */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { party: "You", signed: false, pending: true },
            { party: deal.counterparty, signed: false, pending: false },
          ].map((p) => (
            <div
              key={p.party}
              className="p-3 rounded-lg flex items-center gap-3"
              style={{
                background: "var(--dl-card)",
                border: `1px solid ${p.signed ? "rgba(34,197,94,0.3)" : "var(--dl-border)"}`,
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                style={{
                  background: p.signed ? "rgba(34,197,94,0.1)" : "var(--dl-surface)",
                  color: p.signed ? "var(--dl-green)" : "var(--dl-muted)",
                }}
              >
                {p.signed ? "✓" : "○"}
              </div>
              <div>
                <div className="text-xs font-medium" style={{ color: "var(--dl-text)" }}>{p.party}</div>
                <div className="text-xs" style={{ color: p.signed ? "var(--dl-green)" : "var(--dl-muted)" }}>
                  {p.signed ? "Signed" : p.pending ? "Pending your review" : "Awaiting counterparty"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terms */}
        <div
          className="p-5 rounded-xl mb-6"
          style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)" }}
        >
          <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--dl-text)" }}>
            Deal Terms & Conditions
          </h2>
          <div className="space-y-3">
            {DEAL_TERMS.map((term, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors"
                onClick={() => toggleTerm(i)}
                style={{
                  background: checkedTerms[i] ? "rgba(34,197,94,0.04)" : "var(--dl-surface)",
                  border: `1px solid ${checkedTerms[i] ? "rgba(34,197,94,0.2)" : "var(--dl-border)"}`,
                }}
              >
                <div
                  className="w-5 h-5 rounded flex items-center justify-center text-xs flex-shrink-0 mt-0.5"
                  style={{
                    background: checkedTerms[i] ? "var(--dl-green)" : "var(--dl-card)",
                    border: `1px solid ${checkedTerms[i] ? "var(--dl-green)" : "var(--dl-border)"}`,
                    color: "#fff",
                  }}
                >
                  {checkedTerms[i] ? "✓" : ""}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--dl-text)" }}>
                  <span className="font-mono text-xs mr-2" style={{ color: "var(--dl-muted)" }}>
                    §{i + 1}
                  </span>
                  {term}
                </p>
              </div>
            ))}
          </div>
        </div>

        {!allChecked && (
          <p className="text-xs mb-4 text-center" style={{ color: "var(--dl-muted)" }}>
            Please review and check all {DEAL_TERMS.length} terms to proceed.
          </p>
        )}

        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => {}}
          >
            Request Changes
          </Button>
          <Button
            className="flex-1"
            disabled={!allChecked}
            onClick={() => setSubmitted(true)}
          >
            Accept All Terms →
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
