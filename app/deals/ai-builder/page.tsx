"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";

const TEMPLATES = [
  {
    id: "service",
    label: "Service Contract",
    desc: "Fixed-scope or ongoing service delivery with milestones and acceptance criteria.",
  },
  {
    id: "supply",
    label: "Supply Agreement",
    desc: "Purchase of goods with delivery conditions, quality standards, and inspection rights.",
  },
  {
    id: "partnership",
    label: "Partnership / JV",
    desc: "Revenue sharing, IP ownership, and mutual obligations for joint ventures.",
  },
  {
    id: "consulting",
    label: "Consulting Retainer",
    desc: "Monthly retainer with deliverable scope, availability terms, and exit clauses.",
  },
];

const GENERATED_TERMS: Record<string, string[]> = {
  service: [
    "Scope of work is defined as described in Exhibit A, attached hereto.",
    "Deliverables shall be submitted within agreed milestone dates; delays exceeding 7 days trigger a written notice requirement.",
    "Payment is released upon written approval of each milestone delivery by the Receiving Party.",
    "All intellectual property created under this agreement is transferred upon final payment.",
    "Either party may terminate with 14 days written notice; work completed to date is compensable.",
    "Confidential information shared under this deal is subject to a 2-year NDA provision.",
  ],
  supply: [
    "Goods delivered must conform to the specifications outlined in the Purchase Order.",
    "Buyer has 5 business days from delivery to inspect and reject non-conforming goods.",
    "Title and risk of loss transfer to Buyer upon delivery to agreed location.",
    "Seller warrants goods are free from defects for 12 months from delivery date.",
    "Partial shipments are permitted only with prior written consent from Buyer.",
    "Force majeure events extend delivery timelines by the duration of the event.",
  ],
  partnership: [
    "Net revenue is shared in the proportion agreed: Party A 60%, Party B 40%, unless modified.",
    "Each party contributes resources as described in Schedule 1; contributions are tracked monthly.",
    "IP created jointly is co-owned; neither party may license to third parties without consent.",
    "Partnership may be dissolved by either party with 30 days notice; assets split per Schedule 2.",
    "Each party is responsible for its own tax obligations arising from revenue share.",
    "Decisions requiring capital above $10,000 require unanimous written approval.",
  ],
  consulting: [
    "Consultant provides a minimum of 8 hours per month of strategic advisory services.",
    "Services are scoped to areas specified in the engagement brief; additional scope requires written amendment.",
    "Monthly retainer is invoiced on the 1st of each month; payment due within 7 days.",
    "Client may cancel with 30 days notice; outstanding retainer fees are non-refundable.",
    "Consultant may not engage directly competing clients without prior written disclosure.",
    "All advice is provided in good faith; Consultant is not liable for business outcomes.",
  ],
};

export default function AIBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [terms, setTerms] = useState<string[]>([]);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editVal, setEditVal] = useState("");

  const handleGenerate = () => {
    if (!selectedTemplate) return;
    setGenerating(true);
    setTimeout(() => {
      setTerms(GENERATED_TERMS[selectedTemplate] || GENERATED_TERMS.service);
      setGenerating(false);
      setGenerated(true);
    }, 1800);
  };

  const saveEdit = (i: number) => {
    setTerms((t) => t.map((term, idx) => (idx === i ? editVal : term)));
    setEditingIdx(null);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link href="/deals/create" className="text-sm mb-4 inline-block" style={{ color: "var(--dl-muted-light)" }}>
            ← Create Deal
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{ background: "rgba(201,168,76,0.12)", color: "var(--dl-gold)" }}
            >
              ✦
            </div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--dl-text)" }}>
              AI Deal Builder
            </h1>
          </div>
          <p className="text-sm" style={{ color: "var(--dl-muted-light)" }}>
            Select a template and let DealLock draft your deal terms. Review and edit before finalizing.
          </p>
        </div>

        {/* Templates */}
        <div className="mb-6">
          <label className="block text-xs font-semibold mb-3" style={{ color: "var(--dl-muted-light)" }}>
            SELECT DEAL TEMPLATE
          </label>
          <div className="grid grid-cols-2 gap-3">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className="p-4 rounded-xl text-left transition-all"
                style={{
                  background: selectedTemplate === t.id ? "rgba(201,168,76,0.08)" : "var(--dl-card)",
                  border: `1px solid ${selectedTemplate === t.id ? "var(--dl-gold)" : "var(--dl-border)"}`,
                }}
              >
                <div className="text-sm font-semibold mb-1" style={{ color: selectedTemplate === t.id ? "var(--dl-gold)" : "var(--dl-text)" }}>
                  {t.label}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: "var(--dl-muted-light)" }}>
                  {t.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom prompt */}
        <div className="mb-6">
          <label className="block text-xs font-semibold mb-2" style={{ color: "var(--dl-muted-light)" }}>
            CUSTOM INSTRUCTIONS (OPTIONAL)
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            placeholder="Add any specific conditions, jurisdiction, or special clauses..."
            className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
            style={{
              background: "var(--dl-card)",
              border: "1px solid var(--dl-border)",
              color: "var(--dl-text)",
            }}
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!selectedTemplate || generating}
          size="lg"
          className="w-full mb-8"
        >
          {generating ? "Generating terms…" : "✦ Generate Deal Terms"}
        </Button>

        {/* Generated terms */}
        {generated && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold" style={{ color: "var(--dl-text)" }}>
                Generated Terms
              </h2>
              <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(34,197,94,0.1)", color: "var(--dl-green)", border: "1px solid rgba(34,197,94,0.2)" }}>
                AI Generated
              </span>
            </div>
            <div className="space-y-2 mb-6">
              {terms.map((term, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl"
                  style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)" }}
                >
                  {editingIdx === i ? (
                    <div>
                      <textarea
                        value={editVal}
                        onChange={(e) => setEditVal(e.target.value)}
                        rows={3}
                        className="w-full px-2 py-1.5 rounded text-sm outline-none resize-none mb-2"
                        style={{
                          background: "var(--dl-surface)",
                          border: "1px solid var(--dl-border-light)",
                          color: "var(--dl-text)",
                        }}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => saveEdit(i)}>Save</Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingIdx(null)}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-mono mt-0.5 flex-shrink-0" style={{ color: "var(--dl-gold)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--dl-text)" }}>
                          {term}
                        </p>
                      </div>
                      <button
                        onClick={() => { setEditingIdx(i); setEditVal(term); }}
                        className="text-xs flex-shrink-0 mt-0.5"
                        style={{ color: "var(--dl-muted)" }}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div
              className="p-3 rounded-lg mb-6 text-xs"
              style={{
                background: "rgba(201,168,76,0.04)",
                border: "1px solid rgba(201,168,76,0.15)",
                color: "var(--dl-muted-light)",
              }}
            >
              ⚠ AI-generated terms are a starting point. Review carefully and consult legal counsel for binding agreements.
            </div>

            <div className="flex gap-3">
              <Link
                href="/deals/deal-001/terms"
                className="flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: "var(--dl-gold)", color: "#080c1a" }}
              >
                Accept & Proceed to Terms Review →
              </Link>
              <Button variant="secondary" onClick={() => { setGenerated(false); setTerms([]); }}>
                Regenerate
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
