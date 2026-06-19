import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import { MOCK_DEALS, STATUS_CONFIG } from "@/lib/mock-data";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

function SafetyDot({ score }: { score: number }) {
  const color = score >= 80 ? "var(--dl-green)" : score >= 60 ? "var(--dl-gold)" : "var(--dl-red)";
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color }}>
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: color }} />
      {score}
    </span>
  );
}

export default function DashboardPage() {
  const activeDeal = MOCK_DEALS.find((d) => d.status === "active");
  const stats = {
    total: MOCK_DEALS.length,
    active: MOCK_DEALS.filter((d) => d.status === "active").length,
    pending: MOCK_DEALS.filter((d) => d.status.startsWith("pending")).length,
    disputed: MOCK_DEALS.filter((d) => d.status === "disputed").length,
    totalValue: MOCK_DEALS.reduce((s, d) => s + d.amount, 0),
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--dl-text)" }}>
              Dashboard
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--dl-muted-light)" }}>
              Thursday, June 19, 2026
            </p>
          </div>
          <Link
            href="/deals/create"
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--dl-gold)", color: "#080c1a" }}
          >
            + New Deal
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Deals", value: stats.total, sub: "all time" },
            { label: "Active Deals", value: stats.active, sub: "in progress", accent: true },
            { label: "Pending Action", value: stats.pending, sub: "require attention", warn: true },
            { label: "In Dispute", value: stats.disputed, sub: "under review", danger: stats.disputed > 0 },
          ].map((s) => (
            <div
              key={s.label}
              className="p-5 rounded-xl"
              style={{
                background: "var(--dl-card)",
                border: `1px solid ${s.danger ? "rgba(239,68,68,0.3)" : s.warn ? "rgba(201,168,76,0.2)" : "var(--dl-border)"}`,
              }}
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{
                  color: s.danger ? "var(--dl-red)" : s.warn ? "var(--dl-gold)" : s.accent ? "var(--dl-green)" : "var(--dl-text)",
                }}
              >
                {s.value}
              </div>
              <div className="text-sm font-medium" style={{ color: "var(--dl-text)" }}>
                {s.label}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--dl-muted)" }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Total value */}
        <div
          className="p-5 rounded-xl mb-8 flex items-center justify-between"
          style={{
            background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, var(--dl-card) 100%)",
            border: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <div>
            <div className="text-xs font-medium mb-1" style={{ color: "var(--dl-gold)" }}>
              TOTAL DEAL VALUE PROTECTED
            </div>
            <div className="text-3xl font-bold" style={{ color: "var(--dl-text)" }}>
              {formatCurrency(stats.totalValue, "USD")}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs mb-1" style={{ color: "var(--dl-muted)" }}>
              Processed through certified partners
            </div>
            <div className="text-xs" style={{ color: "var(--dl-muted)" }}>
              DealLock does not hold funds directly
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Deals list */}
          <div className="col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold" style={{ color: "var(--dl-text)" }}>
                Your Deals
              </h2>
              <span className="text-xs" style={{ color: "var(--dl-muted)" }}>
                {MOCK_DEALS.length} total
              </span>
            </div>
            <div className="space-y-3">
              {MOCK_DEALS.map((deal) => {
                const cfg = STATUS_CONFIG[deal.status];
                return (
                  <Link
                    key={deal.id}
                    href={`/deals/${deal.id}/evidence`}
                    className="block p-4 rounded-xl transition-colors"
                    style={{
                      background: "var(--dl-card)",
                      border: "1px solid var(--dl-border)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold truncate" style={{ color: "var(--dl-text)" }}>
                            {deal.title}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${cfg.bg} ${cfg.color}`}
                          >
                            {cfg.label}
                          </span>
                        </div>
                        <div className="text-xs mb-2" style={{ color: "var(--dl-muted-light)" }}>
                          {deal.counterparty} · {deal.dealType}
                        </div>
                        <div className="flex items-center gap-4 text-xs" style={{ color: "var(--dl-muted)" }}>
                          <span>Due {deal.deadline}</span>
                          <SafetyDot score={deal.safetyScore} />
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-semibold" style={{ color: "var(--dl-text)" }}>
                          {formatCurrency(deal.amount, deal.currency)}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick actions */}
          <div>
            <h2 className="text-base font-semibold mb-4" style={{ color: "var(--dl-text)" }}>
              Quick Actions
            </h2>
            <div className="space-y-2">
              {[
                { href: "/deals/create", label: "Create New Deal", icon: "+" },
                { href: "/deals/ai-builder", label: "AI Deal Builder", icon: "✦" },
                { href: "/verification", label: "Verification Center", icon: "✓" },
                { href: `/deals/${activeDeal?.id}/safety-score`, label: "Deal Safety Score", icon: "◎" },
                { href: "/disputes", label: "Dispute Center", icon: "⚖" },
                { href: "/admin", label: "Admin & Compliance", icon: "⚙" },
              ].map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                  style={{
                    background: "var(--dl-card)",
                    border: "1px solid var(--dl-border)",
                    color: "var(--dl-text)",
                  }}
                >
                  <span
                    className="w-7 h-7 rounded flex items-center justify-center text-xs flex-shrink-0"
                    style={{ background: "var(--dl-surface)", color: "var(--dl-gold)" }}
                  >
                    {a.icon}
                  </span>
                  <span className="text-sm">{a.label}</span>
                  <span className="ml-auto text-xs" style={{ color: "var(--dl-muted)" }}>
                    →
                  </span>
                </Link>
              ))}
            </div>

            {/* Attention needed */}
            <div className="mt-6">
              <h2 className="text-base font-semibold mb-4" style={{ color: "var(--dl-text)" }}>
                Needs Attention
              </h2>
              <div className="space-y-2">
                <Link
                  href="/deals/deal-002/review"
                  className="block p-3 rounded-lg"
                  style={{
                    background: "rgba(201,168,76,0.06)",
                    border: "1px solid rgba(201,168,76,0.2)",
                  }}
                >
                  <div className="text-xs font-semibold mb-0.5" style={{ color: "var(--dl-gold)" }}>
                    Pending Approval
                  </div>
                  <div className="text-xs" style={{ color: "var(--dl-muted-light)" }}>
                    Real Estate Earnest Money — review proof
                  </div>
                </Link>
                <Link
                  href="/disputes"
                  className="block p-3 rounded-lg"
                  style={{
                    background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.2)",
                  }}
                >
                  <div className="text-xs font-semibold mb-0.5" style={{ color: "var(--dl-red)" }}>
                    Open Dispute
                  </div>
                  <div className="text-xs" style={{ color: "var(--dl-muted-light)" }}>
                    Equipment Supply Deal — under review
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
