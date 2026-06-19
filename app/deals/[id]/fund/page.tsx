"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import { MOCK_DEALS } from "@/lib/mock-data";

const PAYMENT_METHODS = [
  { id: "bank", label: "Bank Transfer (ACH / Wire)", fee: "0.25%", time: "1-3 business days", icon: "🏦" },
  { id: "card", label: "Credit / Debit Card", fee: "2.9% + $0.30", time: "Instant", icon: "💳" },
  { id: "escrow", label: "Certified Escrow Partner", fee: "1.0%", time: "2-5 business days", icon: "🔐" },
];

export default function FundDealPage() {
  const params = useParams();
  const deal = MOCK_DEALS.find((d) => d.id === params.id) || MOCK_DEALS[0];
  const [method, setMethod] = useState("bank");
  const [confirmed, setConfirmed] = useState(false);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: deal.currency }).format(n);

  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === method)!;

  if (confirmed) {
    return (
      <DashboardLayout>
        <div className="max-w-xl mx-auto px-6 py-20 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-6"
            style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}
          >
            🔐
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{ color: "var(--dl-text)" }}>
            Funds Protected
          </h1>
          <p className="mb-2" style={{ color: "var(--dl-muted-light)" }}>
            {fmt(deal.amount)} is now secured and held by our certified escrow partner.
          </p>
          <p className="text-sm mb-2" style={{ color: "var(--dl-muted)" }}>
            Funds will be released only upon your written approval of the delivered work.
          </p>
          <p className="text-xs mb-8 px-6 py-3 rounded-lg inline-block" style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)", color: "var(--dl-muted-light)" }}>
            Funds are processed and protected through third-party escrow and payment partners.
            DealLock does not hold or custody funds directly.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href={`/deals/${deal.id}/evidence`}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--dl-gold)", color: "#080c1a" }}
            >
              View Deal Timeline →
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
      <div className="max-w-xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link href={`/deals/${deal.id}/terms`} className="text-sm mb-4 inline-block" style={{ color: "var(--dl-muted-light)" }}>
            ← Terms
          </Link>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--dl-text)" }}>
            Fund Protected Deal
          </h1>
          <p className="text-sm" style={{ color: "var(--dl-muted-light)" }}>
            Funds are secured by our certified escrow partner and released only upon your approval.
          </p>
        </div>

        {/* Deal summary */}
        <div
          className="p-4 rounded-xl mb-6"
          style={{
            background: "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, var(--dl-card) 100%)",
            border: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <div className="text-xs font-semibold mb-3" style={{ color: "var(--dl-muted-light)" }}>DEAL SUMMARY</div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm" style={{ color: "var(--dl-muted-light)" }}>{deal.title}</span>
            <span className="text-sm font-semibold" style={{ color: "var(--dl-text)" }}>{fmt(deal.amount)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs" style={{ color: "var(--dl-muted)" }}>Counterparty</span>
            <span className="text-xs" style={{ color: "var(--dl-muted-light)" }}>{deal.counterparty}</span>
          </div>
        </div>

        {/* Payment method */}
        <div className="mb-6">
          <label className="block text-xs font-semibold mb-3" style={{ color: "var(--dl-muted-light)" }}>
            PAYMENT METHOD
          </label>
          <div className="space-y-2">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className="w-full p-4 rounded-xl text-left flex items-center gap-4 transition-all"
                style={{
                  background: method === m.id ? "rgba(201,168,76,0.07)" : "var(--dl-card)",
                  border: `1px solid ${method === m.id ? "var(--dl-gold)" : "var(--dl-border)"}`,
                }}
              >
                <span className="text-xl">{m.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium" style={{ color: "var(--dl-text)" }}>{m.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--dl-muted-light)" }}>
                    Fee: {m.fee} · {m.time}
                  </div>
                </div>
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{
                    border: `2px solid ${method === m.id ? "var(--dl-gold)" : "var(--dl-border)"}`,
                    background: method === m.id ? "var(--dl-gold)" : "transparent",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Breakdown */}
        <div
          className="p-4 rounded-xl mb-6 space-y-2"
          style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)" }}
        >
          <div className="text-xs font-semibold mb-3" style={{ color: "var(--dl-muted-light)" }}>PAYMENT BREAKDOWN</div>
          {[
            ["Deal Amount", fmt(deal.amount)],
            ["Platform Fee (0.5%)", fmt(deal.amount * 0.005)],
            ["Processing Fee", selectedMethod.fee],
            ["Total", fmt(deal.amount * 1.005)],
          ].map(([k, v], i) => (
            <div
              key={k}
              className={`flex justify-between text-sm ${i === 3 ? "pt-2 mt-2 font-semibold" : ""}`}
              style={{
                borderTop: i === 3 ? "1px solid var(--dl-border)" : "none",
                color: i === 3 ? "var(--dl-text)" : "var(--dl-muted-light)",
              }}
            >
              <span>{k}</span>
              <span style={{ color: i === 3 ? "var(--dl-gold)" : "var(--dl-text)" }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Compliance notice */}
        <div
          className="p-3 rounded-lg mb-6 text-xs"
          style={{
            background: "rgba(59,130,246,0.05)",
            border: "1px solid rgba(59,130,246,0.15)",
            color: "var(--dl-muted-light)",
          }}
        >
          🔒 Funds are processed and protected through third-party escrow and payment partners.
          DealLock does not hold or custody funds directly. Funds will only be released upon your explicit approval.
        </div>

        <Button size="lg" className="w-full" onClick={() => setConfirmed(true)}>
          Confirm & Protect {fmt(deal.amount)}
        </Button>
      </div>
    </DashboardLayout>
  );
}
