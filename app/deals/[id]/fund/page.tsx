"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import {
  MOCK_DEALS,
  PROVIDER_FEES,
  getPlatformFee,
  getPricingTier,
  estimateProviderFee,
} from "@/lib/mock-data";

type FeeResponsibility = "buyer" | "seller" | "split";

const PAYMENT_METHODS = [
  { id: "bank", label: "Bank Transfer (ACH / Wire)", time: "1-3 business days", icon: "🏦" },
  { id: "card", label: "Credit / Debit Card", time: "Instant", icon: "💳" },
  { id: "escrow", label: "Certified Escrow Partner", time: "2-5 business days", icon: "🔐" },
];

const FEE_RESP_OPTIONS: { id: FeeResponsibility; label: string; desc: string }[] = [
  { id: "buyer", label: "Buyer pays", desc: "Protection fee added to buyer's total" },
  { id: "seller", label: "Seller pays", desc: "Protection fee deducted from seller's payout" },
  { id: "split", label: "Split fee", desc: "Each party pays half the protection fee" },
];

function feeRespLabel(resp: FeeResponsibility) {
  return FEE_RESP_OPTIONS.find((o) => o.id === resp)?.label ?? "";
}

export default function FundDealPage() {
  const params = useParams();
  const deal = MOCK_DEALS.find((d) => d.id === params.id) || MOCK_DEALS[0];
  const [method, setMethod] = useState("bank");
  const [feeResp, setFeeResp] = useState<FeeResponsibility>("buyer");
  const [confirmed, setConfirmed] = useState(false);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: deal.currency }).format(n);

  const platformFee = getPlatformFee(deal.amount);
  const tier = getPricingTier(deal.amount);
  const providerFeeAmt = estimateProviderFee(deal.amount, method);
  const platformFeeAmt = typeof platformFee === "number" ? platformFee : 0;

  // Buyer total and seller receive based on responsibility
  const buyerDLFee =
    feeResp === "buyer" ? platformFeeAmt : feeResp === "split" ? platformFeeAmt / 2 : 0;
  const sellerDLFee =
    feeResp === "seller" ? platformFeeAmt : feeResp === "split" ? platformFeeAmt / 2 : 0;

  const buyerTotal = deal.amount + buyerDLFee + providerFeeAmt;
  const sellerReceives = deal.amount - sellerDLFee;

  const providerFeeStr = `${PROVIDER_FEES[method]
    ? (PROVIDER_FEES[method].rate * 100).toFixed(2).replace(/\.?0+$/, "") + "%"
    : "—"}${PROVIDER_FEES[method]?.flat ? ` + ${fmt(PROVIDER_FEES[method].flat)}` : ""}`;

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
            Deal Protected
          </h1>
          <p className="mb-2" style={{ color: "var(--dl-muted-light)" }}>
            {fmt(deal.amount)} is now secured through our certified payment partner.
          </p>
          <p className="text-sm mb-2" style={{ color: "var(--dl-muted)" }}>
            Funds will be released only upon your written approval of the delivered work.
          </p>
          <div
            className="text-xs mb-8 px-5 py-3 rounded-lg inline-block text-left"
            style={{
              background: "var(--dl-card)",
              border: "1px solid var(--dl-border)",
              color: "var(--dl-muted-light)",
            }}
          >
            <p>
              DealLock fees are charged when a deal is funded/protected. Creating a draft deal is
              free.
            </p>
            <p className="mt-1">
              DealLock does not hold funds directly. Payments are processed through third-party
              escrow/payment partners.
            </p>
          </div>
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
              style={{
                background: "var(--dl-card)",
                color: "var(--dl-text)",
                border: "1px solid var(--dl-border)",
              }}
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
          <Link
            href={`/deals/${deal.id}/terms`}
            className="text-sm mb-4 inline-block"
            style={{ color: "var(--dl-muted-light)" }}
          >
            ← Terms
          </Link>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--dl-text)" }}>
            Fund Protected Deal
          </h1>
          <p className="text-sm" style={{ color: "var(--dl-muted-light)" }}>
            Free to create. Pay only when you protect a deal.
          </p>
        </div>

        {/* Deal summary + tier */}
        <div
          className="p-4 rounded-xl mb-6"
          style={{
            background: "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, var(--dl-card) 100%)",
            border: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-xs font-semibold mb-0.5" style={{ color: "var(--dl-muted-light)" }}>
                DEAL
              </div>
              <div className="text-sm font-medium" style={{ color: "var(--dl-text)" }}>
                {deal.title}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--dl-muted)" }}>
                {deal.counterparty}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold" style={{ color: "var(--dl-text)" }}>
                {fmt(deal.amount)}
              </div>
              <div
                className="text-xs px-2 py-0.5 rounded mt-1 inline-block"
                style={{
                  background: "rgba(201,168,76,0.12)",
                  color: "var(--dl-gold)",
                }}
              >
                {tier.name}
              </div>
            </div>
          </div>
          {platformFee === "custom" && (
            <div
              className="text-xs p-2 rounded"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "var(--dl-red)",
              }}
            >
              ⚠ This deal exceeds $5,000 and requires manual compliance review before funding.
            </div>
          )}
        </div>

        {/* Payment method */}
        <div className="mb-6">
          <label
            className="block text-xs font-semibold mb-3"
            style={{ color: "var(--dl-muted-light)" }}
          >
            PAYMENT METHOD
          </label>
          <div className="space-y-2">
            {PAYMENT_METHODS.map((m) => {
              const p = PROVIDER_FEES[m.id];
              const feeStr = p
                ? `${(p.rate * 100).toFixed(2).replace(/\.?0+$/, "")}%${p.flat ? ` + ${fmt(p.flat)}` : ""}`
                : "—";
              return (
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
                    <div className="text-sm font-medium" style={{ color: "var(--dl-text)" }}>
                      {m.label}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--dl-muted-light)" }}>
                      Provider fee: {feeStr} · {m.time}
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
              );
            })}
          </div>
        </div>

        {/* Fee responsibility */}
        <div className="mb-6">
          <label
            className="block text-xs font-semibold mb-1"
            style={{ color: "var(--dl-muted-light)" }}
          >
            WHO PAYS THE DEALLOCK PROTECTION FEE?
          </label>
          <p className="text-xs mb-3" style={{ color: "var(--dl-muted)" }}>
            DealLock platform fees are separate from third-party payment provider fees.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {FEE_RESP_OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => setFeeResp(o.id)}
                className="p-3 rounded-lg text-left transition-all"
                style={{
                  background: feeResp === o.id ? "rgba(201,168,76,0.08)" : "var(--dl-card)",
                  border: `1px solid ${feeResp === o.id ? "var(--dl-gold)" : "var(--dl-border)"}`,
                }}
              >
                <div
                  className="text-xs font-semibold mb-0.5"
                  style={{ color: feeResp === o.id ? "var(--dl-gold)" : "var(--dl-text)" }}
                >
                  {o.label}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: "var(--dl-muted)" }}>
                  {o.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Fee breakdown */}
        <div
          className="p-4 rounded-xl mb-4"
          style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)" }}
        >
          <div
            className="text-xs font-semibold mb-4"
            style={{ color: "var(--dl-muted-light)" }}
          >
            FEE BREAKDOWN
          </div>
          <div className="space-y-2.5">
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--dl-muted-light)" }}>Deal amount</span>
              <span style={{ color: "var(--dl-text)" }}>{fmt(deal.amount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--dl-muted-light)" }}>
                DealLock protection fee
                <span
                  className="ml-1.5 text-xs px-1.5 py-0.5 rounded"
                  style={{ background: "rgba(201,168,76,0.1)", color: "var(--dl-gold)" }}
                >
                  {feeRespLabel(feeResp)}
                </span>
              </span>
              <span style={{ color: "var(--dl-text)" }}>
                {platformFee === "custom" ? "Custom" : fmt(platformFeeAmt)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--dl-muted-light)" }}>
                Est. third-party provider fee
                <span className="ml-1 text-xs" style={{ color: "var(--dl-muted)" }}>
                  ({providerFeeStr})
                </span>
              </span>
              <span style={{ color: "var(--dl-text)" }}>{fmt(providerFeeAmt)}</span>
            </div>
            <div
              className="pt-3 mt-1"
              style={{ borderTop: "1px solid var(--dl-border)" }}
            >
              <div className="flex justify-between text-sm font-semibold mb-1.5">
                <span style={{ color: "var(--dl-text)" }}>Total buyer pays</span>
                <span style={{ color: "var(--dl-gold)" }}>{fmt(buyerTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--dl-muted-light)" }}>Seller receives (est.)</span>
                <span style={{ color: "var(--dl-green)" }}>{fmt(sellerReceives)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copy notices */}
        <div
          className="p-3 rounded-lg mb-3 text-xs space-y-1"
          style={{
            background: "rgba(59,130,246,0.05)",
            border: "1px solid rgba(59,130,246,0.15)",
            color: "var(--dl-muted-light)",
          }}
        >
          <p>
            🔒 DealLock does not hold funds directly. Payments are processed through third-party
            escrow/payment partners.
          </p>
          <p>
            DealLock platform fees are separate from third-party payment provider fees.
          </p>
          <p>
            DealLock fees are charged when a deal is funded/protected. Creating a draft deal is
            free.
          </p>
        </div>

        <Button
          size="lg"
          className="w-full"
          onClick={() => setConfirmed(true)}
          disabled={platformFee === "custom"}
        >
          {platformFee === "custom"
            ? "Manual Review Required"
            : `Confirm & Protect — ${fmt(buyerTotal)} total`}
        </Button>
        {platformFee === "custom" && (
          <p className="text-xs text-center mt-2" style={{ color: "var(--dl-muted)" }}>
            Deals over $5,000 require manual compliance review. Contact support to proceed.
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}
