import Link from "next/link";
import { notFound } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MOCK_DEALS } from "@/lib/mock-data";

const SCORE_FACTORS = [
  { label: "Identity Verified", weight: 20, desc: "Both parties have completed KYC verification." },
  { label: "Terms Accepted", weight: 15, desc: "All deal terms reviewed and signed by both parties." },
  { label: "Funds Protected", weight: 20, desc: "Funds secured through certified escrow partner." },
  { label: "Evidence Quality", weight: 15, desc: "Submitted proof is verified and tamper-evident." },
  { label: "Deal History", weight: 15, desc: "Both parties have a clean deal completion record." },
  { label: "Communication Log", weight: 10, desc: "Documented communication trail in evidence timeline." },
  { label: "Deadline Compliance", weight: 5, desc: "Deal is on track relative to agreed deadline." },
];

function getScoreColor(score: number) {
  if (score >= 80) return "var(--dl-green)";
  if (score >= 60) return "var(--dl-gold)";
  return "var(--dl-red)";
}

function getScoreLabel(score: number) {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Moderate";
  return "At Risk";
}

export default async function SafetyScorePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deal = MOCK_DEALS.find((d) => d.id === id);
  if (!deal) notFound();

  const score = deal.safetyScore;
  const scoreColor = getScoreColor(score);
  const scoreLabel = getScoreLabel(score);

  const earnedFactors = Math.floor((score / 100) * SCORE_FACTORS.length);

  const recommendations = [
    score < 80 && !deal.funded && "Protect funds through a certified escrow partner to raise your score.",
    score < 80 && !deal.proofSubmitted && "Submit verifiable proof of delivery to strengthen the evidence record.",
    score < 60 && "Complete identity verification to unlock full deal protection.",
  ].filter(Boolean) as string[];

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link href={`/deals/${id}/evidence`} className="text-sm mb-4 inline-block" style={{ color: "var(--dl-muted-light)" }}>
            ← Evidence Timeline
          </Link>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--dl-text)" }}>
            Deal Safety Score
          </h1>
          <p className="text-sm" style={{ color: "var(--dl-muted-light)" }}>
            A composite score measuring how well-protected this deal is across all dimensions.
          </p>
        </div>

        {/* Score display */}
        <div
          className="p-8 rounded-xl mb-6 flex flex-col items-center text-center"
          style={{
            background: "var(--dl-card)",
            border: `1px solid ${scoreColor}33`,
          }}
        >
          <div
            className="text-7xl font-bold mb-2 tabular-nums"
            style={{ color: scoreColor }}
          >
            {score}
          </div>
          <div className="text-sm font-medium mb-1" style={{ color: scoreColor }}>
            {scoreLabel} Protection
          </div>
          <div className="text-xs" style={{ color: "var(--dl-muted)" }}>
            out of 100
          </div>

          {/* Score bar */}
          <div className="w-full max-w-xs h-2 rounded-full mt-6 overflow-hidden" style={{ background: "var(--dl-surface)" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${score}%`, background: scoreColor }}
            />
          </div>
        </div>

        {/* Deal context */}
        <div
          className="p-4 rounded-xl mb-6 flex justify-between items-center"
          style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)" }}
        >
          <div>
            <div className="text-sm font-semibold" style={{ color: "var(--dl-text)" }}>{deal.title}</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--dl-muted-light)" }}>{deal.counterparty}</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold" style={{ color: "var(--dl-text)" }}>
              {new Intl.NumberFormat("en-US", { style: "currency", currency: deal.currency }).format(deal.amount)}
            </div>
            <div className="text-xs" style={{ color: "var(--dl-muted)" }}>at stake</div>
          </div>
        </div>

        {/* Score factors */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--dl-text)" }}>Score Breakdown</h2>
          <div className="space-y-2">
            {SCORE_FACTORS.map((factor, i) => {
              const achieved = i < earnedFactors;
              return (
                <div
                  key={factor.label}
                  className="p-4 rounded-xl flex items-center gap-4"
                  style={{
                    background: "var(--dl-card)",
                    border: `1px solid ${achieved ? "rgba(34,197,94,0.2)" : "var(--dl-border)"}`,
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: achieved ? "rgba(34,197,94,0.1)" : "var(--dl-surface)",
                      color: achieved ? "var(--dl-green)" : "var(--dl-muted)",
                      border: `1px solid ${achieved ? "rgba(34,197,94,0.3)" : "var(--dl-border)"}`,
                    }}
                  >
                    {achieved ? "✓" : "○"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-medium" style={{ color: achieved ? "var(--dl-text)" : "var(--dl-muted-light)" }}>
                        {factor.label}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: achieved ? "var(--dl-green)" : "var(--dl-muted)" }}>
                        +{factor.weight}
                      </span>
                    </div>
                    <div className="text-xs" style={{ color: "var(--dl-muted)" }}>{factor.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div
            className="p-4 rounded-xl mb-6"
            style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.2)" }}
          >
            <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--dl-gold)" }}>
              Recommendations to improve your score
            </h2>
            <ul className="space-y-2">
              {recommendations.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--dl-muted-light)" }}>
                  <span style={{ color: "var(--dl-gold)" }}>→</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-3">
          <Link
            href={`/deals/${id}/evidence`}
            className="flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-semibold"
            style={{ background: "var(--dl-card)", color: "var(--dl-text)", border: "1px solid var(--dl-border)" }}
          >
            ← Timeline
          </Link>
          <Link
            href="/verification"
            className="flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--dl-gold)", color: "#080c1a" }}
          >
            Boost Score →
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
