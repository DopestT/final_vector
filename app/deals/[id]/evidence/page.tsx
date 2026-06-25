import Link from "next/link";
import { notFound } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MOCK_DEALS, MOCK_EVIDENCE, STATUS_CONFIG } from "@/lib/mock-data";

const TYPE_ICON: Record<string, string> = {
  system: "◎",
  signature: "✍",
  payment: "🔐",
  message: "💬",
  file: "📎",
};

const TYPE_COLOR: Record<string, string> = {
  system: "var(--dl-muted)",
  signature: "var(--dl-green)",
  payment: "var(--dl-gold)",
  message: "var(--dl-blue)",
  file: "var(--dl-muted-light)",
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function EvidencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deal = MOCK_DEALS.find((d) => d.id === id);
  if (!deal) notFound();

  const cfg = STATUS_CONFIG[deal.status];
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: deal.currency }).format(n);

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm mb-4 inline-block" style={{ color: "var(--dl-muted-light)" }}>
            ← Dashboard
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--dl-text)" }}>
                {deal.title}
              </h1>
              <div className="flex items-center gap-3 text-sm" style={{ color: "var(--dl-muted-light)" }}>
                <span>{deal.counterparty}</span>
                <span>·</span>
                <span>{deal.dealType}</span>
                <span>·</span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${cfg.bg} ${cfg.color}`}
                >
                  {cfg.label}
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-xl font-bold" style={{ color: "var(--dl-gold)" }}>
                {fmt(deal.amount)}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--dl-muted)" }}>
                Due {deal.deadline}
              </div>
            </div>
          </div>
        </div>

        {/* Progress steps */}
        <div
          className="p-4 rounded-xl mb-8"
          style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)" }}
        >
          <div className="flex items-center justify-between">
            {[
              { label: "Terms", done: deal.termsAccepted, href: `/deals/${id}/terms` },
              { label: "Funded", done: deal.funded, href: `/deals/${id}/fund` },
              { label: "In Progress", done: deal.status === "active" || deal.status === "pending_approval", href: "#" },
              { label: "Proof", done: deal.proofSubmitted, href: `/deals/${id}/submit-proof` },
              { label: "Review", done: deal.status === "approved" || deal.status === "completed", href: `/deals/${id}/review` },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center">
                <Link href={step.href} className="flex flex-col items-center gap-1">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                    style={{
                      background: step.done ? "var(--dl-green)" : "var(--dl-surface)",
                      border: `1px solid ${step.done ? "var(--dl-green)" : "var(--dl-border)"}`,
                      color: step.done ? "#fff" : "var(--dl-muted)",
                    }}
                  >
                    {step.done ? "✓" : i + 1}
                  </div>
                  <span className="text-xs" style={{ color: step.done ? "var(--dl-green)" : "var(--dl-muted)" }}>
                    {step.label}
                  </span>
                </Link>
                {i < 4 && (
                  <div
                    className="w-10 h-px mx-1"
                    style={{ background: step.done ? "var(--dl-green)" : "var(--dl-border)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mb-8">
          {!deal.proofSubmitted && (
            <Link
              href={`/deals/${id}/submit-proof`}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--dl-gold)", color: "#080c1a" }}
            >
              Submit Proof
            </Link>
          )}
          {deal.status === "pending_approval" && (
            <Link
              href={`/deals/${id}/review`}
              className="px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ background: "rgba(34,197,94,0.1)", color: "var(--dl-green)", border: "1px solid rgba(34,197,94,0.2)" }}
            >
              Review & Approve
            </Link>
          )}
          {deal.status === "disputed" && (
            <Link
              href="/disputes"
              className="px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ background: "rgba(239,68,68,0.1)", color: "var(--dl-red)", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              View Dispute
            </Link>
          )}
          <Link
            href={`/deals/${id}/safety-score`}
            className="px-4 py-2 rounded-lg text-sm font-semibold ml-auto"
            style={{ background: "var(--dl-card)", color: "var(--dl-text)", border: "1px solid var(--dl-border)" }}
          >
            Safety Score: {deal.safetyScore}
          </Link>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-base font-semibold mb-5" style={{ color: "var(--dl-text)" }}>
            Evidence Timeline
          </h2>
          <div className="relative">
            <div
              className="absolute left-4 top-0 bottom-0 w-px"
              style={{ background: "var(--dl-border)" }}
            />
            <div className="space-y-4">
              {MOCK_EVIDENCE.map((item) => (
                <div key={item.id} className="flex gap-4 pl-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 relative z-10"
                    style={{
                      background: "var(--dl-card)",
                      border: `1px solid ${TYPE_COLOR[item.type]}`,
                      color: TYPE_COLOR[item.type],
                    }}
                  >
                    {TYPE_ICON[item.type]}
                  </div>
                  <div
                    className="flex-1 p-4 rounded-xl mb-0"
                    style={{
                      background: "var(--dl-card)",
                      border: "1px solid var(--dl-border)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold" style={{ color: "var(--dl-text)" }}>
                          {item.title}
                        </span>
                        {item.verified && (
                          <span
                            className="text-xs px-1.5 py-0.5 rounded"
                            style={{ background: "rgba(34,197,94,0.1)", color: "var(--dl-green)" }}
                          >
                            Verified
                          </span>
                        )}
                      </div>
                      <span className="text-xs flex-shrink-0" style={{ color: "var(--dl-muted)" }}>
                        {formatTime(item.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: "var(--dl-muted-light)" }}>
                      {item.description}
                    </p>
                    <div className="text-xs mt-1" style={{ color: "var(--dl-muted)" }}>
                      {item.author}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
