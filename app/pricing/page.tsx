import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { PRICING_TIERS } from "@/lib/mock-data";

const CHECK = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ display: "inline", flexShrink: 0, marginTop: 2 }}>
    <circle cx="7" cy="7" r="7" fill="rgba(34,197,94,0.15)" />
    <path d="M4 7l2 2 4-4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PricingPage() {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{
              background: "rgba(201,168,76,0.1)",
              border: "1px solid rgba(201,168,76,0.25)",
              color: "var(--dl-gold)",
            }}
          >
            ● Simple, transaction-based pricing
          </div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: "var(--dl-text)" }}>
            Free to create.
            <br />
            <span style={{ color: "var(--dl-gold)" }}>Pay only when you protect a deal.</span>
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--dl-muted-light)" }}>
            Your account is always free. DealLock charges a flat protection fee per deal —
            only when funds are secured.
          </p>
        </div>

        {/* Notice */}
        <div
          className="p-4 rounded-xl mb-10 text-sm text-center max-w-2xl mx-auto"
          style={{
            background: "var(--dl-card)",
            border: "1px solid var(--dl-border)",
            color: "var(--dl-muted-light)",
          }}
        >
          DealLock platform fees are separate from third-party payment provider fees. DealLock does
          not hold funds directly — payments are processed through third-party escrow/payment
          partners.
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-5 gap-4 mb-12">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="p-5 rounded-xl flex flex-col"
              style={{
                background: tier.highlighted ? "rgba(201,168,76,0.07)" : "var(--dl-card)",
                border: `1px solid ${tier.highlighted ? "var(--dl-gold)" : "var(--dl-border)"}`,
                position: "relative",
              }}
            >
              {tier.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: "var(--dl-gold)", color: "#080c1a" }}
                >
                  Recommended
                </div>
              )}

              <div className="mb-4">
                <div className="text-xs font-semibold mb-2" style={{ color: "var(--dl-muted-light)" }}>
                  {tier.id === "starter" ? "ACCOUNT" : "PROTECTION FEE"}
                </div>
                <div
                  className="text-2xl font-bold mb-0.5"
                  style={{ color: tier.highlighted ? "var(--dl-gold)" : "var(--dl-text)" }}
                >
                  {tier.id === "starter"
                    ? "Free"
                    : tier.platformFee === "custom"
                    ? "Custom"
                    : `$${tier.platformFee}`}
                </div>
                <div className="text-xs" style={{ color: "var(--dl-muted)" }}>
                  {tier.id === "starter"
                    ? "Always free"
                    : tier.platformFee === "custom"
                    ? "Per review"
                    : "Per protected deal"}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--dl-text)" }}>
                  {tier.name}
                </div>
                <div className="text-xs" style={{ color: "var(--dl-gold)" }}>
                  {tier.id === "starter"
                    ? "All users"
                    : tier.id === "manual"
                    ? "Over $5,000"
                    : `Up to $${tier.maxAmount!.toLocaleString()}`}
                </div>
              </div>

              <ul className="space-y-2 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs" style={{ color: "var(--dl-muted-light)" }}>
                    {CHECK}
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <Link
                  href={tier.id === "starter" ? "/deals/create" : "/deals/create"}
                  className="block w-full text-center px-3 py-2 rounded-lg text-xs font-semibold transition-opacity hover:opacity-90"
                  style={{
                    background: tier.highlighted ? "var(--dl-gold)" : "var(--dl-surface)",
                    color: tier.highlighted ? "#080c1a" : "var(--dl-text)",
                    border: `1px solid ${tier.highlighted ? "var(--dl-gold)" : "var(--dl-border)"}`,
                  }}
                >
                  {tier.id === "starter" ? "Create Free Account" : tier.id === "manual" ? "Contact Us" : "Start a Deal"}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Fee logic table */}
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="text-xl font-bold text-center mb-6" style={{ color: "var(--dl-text)" }}>
            How the protection fee is determined
          </h2>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--dl-border)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--dl-surface)", borderBottom: "1px solid var(--dl-border)" }}>
                  {["Deal Amount", "Protection Tier", "DealLock Fee"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold" style={{ color: "var(--dl-muted-light)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { range: "Up to $1,001", tier: "Standard Protected Deal", fee: "$2.99" },
                  { range: "$1,001.01 – $2,500", tier: "Plus Protected Deal", fee: "$4.99" },
                  { range: "$2,500.01 – $5,000", tier: "Secure Max Protected Deal", fee: "$9.99" },
                  { range: "Over $5,000", tier: "Manual Review Required", fee: "Custom" },
                ].map((row, i) => (
                  <tr
                    key={row.range}
                    style={{
                      background: i % 2 === 0 ? "var(--dl-card)" : "var(--dl-surface)",
                      borderBottom: i < 3 ? "1px solid var(--dl-border)" : "none",
                    }}
                  >
                    <td className="px-5 py-3" style={{ color: "var(--dl-text)" }}>{row.range}</td>
                    <td className="px-5 py-3" style={{ color: "var(--dl-muted-light)" }}>{row.tier}</td>
                    <td className="px-5 py-3 font-semibold" style={{ color: "var(--dl-gold)" }}>{row.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-6" style={{ color: "var(--dl-text)" }}>
            Common questions
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "Is my account free?",
                a: "Yes. Your DealLock account is always free. You can create deal drafts, send secure deal links, and preview terms at no cost.",
              },
              {
                q: "When do I get charged?",
                a: "DealLock fees are charged when a deal is funded/protected. Creating a draft deal is free. The protection fee is a flat rate based on the deal amount.",
              },
              {
                q: "Who pays the DealLock fee — buyer or seller?",
                a: "You choose. When funding a deal you can assign the fee to the buyer, the seller, or split it evenly between both parties.",
              },
              {
                q: "Are there other fees?",
                a: "Yes. Third-party payment and escrow providers charge their own processing fees. DealLock platform fees are separate from those provider fees. DealLock does not hold funds directly.",
              },
              {
                q: "What happens for deals over $5,000?",
                a: "Deals above $5,000 require manual compliance review. These are available to verified and business users only. Contact support to initiate a review.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="p-4 rounded-xl"
                style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)" }}
              >
                <div className="text-sm font-semibold mb-2" style={{ color: "var(--dl-text)" }}>
                  {item.q}
                </div>
                <div className="text-sm leading-relaxed" style={{ color: "var(--dl-muted-light)" }}>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            href="/deals/create"
            className="inline-block px-8 py-3.5 rounded-lg text-base font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--dl-gold)", color: "#080c1a" }}
          >
            Start a Free Draft Deal
          </Link>
          <p className="mt-3 text-xs" style={{ color: "var(--dl-muted)" }}>
            Free to create. Pay only when you protect a deal.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
