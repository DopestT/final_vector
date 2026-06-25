"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import { MOCK_DEALS } from "@/lib/mock-data";

const PROOF_TYPES = [
  { id: "delivery", label: "Delivery Confirmation", desc: "Proof of goods/services delivered" },
  { id: "completion", label: "Work Completion", desc: "Signed off by authorized party" },
  { id: "milestone", label: "Milestone Report", desc: "Progress update with evidence" },
  { id: "invoice", label: "Invoice / Receipt", desc: "Financial proof of transaction" },
  { id: "other", label: "Other Documentation", desc: "Supporting documents" },
];

const MOCK_FILES = [
  { name: "delivery_confirmation.pdf", size: "342 KB", type: "PDF" },
  { name: "project_screenshots.zip", size: "1.8 MB", type: "ZIP" },
];

export default function SubmitProofPage() {
  const params = useParams();
  const deal = MOCK_DEALS.find((d) => d.id === params.id) || MOCK_DEALS[0];
  const [proofType, setProofType] = useState("completion");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState(MOCK_FILES);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <DashboardLayout>
        <div className="max-w-xl mx-auto px-6 py-20 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-6"
            style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}
          >
            📎
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{ color: "var(--dl-text)" }}>
            Proof Submitted
          </h1>
          <p className="mb-2" style={{ color: "var(--dl-muted-light)" }}>
            Your proof has been submitted and timestamped on the deal record.
          </p>
          <p className="text-sm mb-8" style={{ color: "var(--dl-muted)" }}>
            {deal.counterparty} has been notified and must now review and approve.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href={`/deals/${deal.id}/evidence`}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--dl-gold)", color: "#080c1a" }}
            >
              View Timeline →
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
          <Link href={`/deals/${deal.id}/evidence`} className="text-sm mb-4 inline-block" style={{ color: "var(--dl-muted-light)" }}>
            ← Evidence Timeline
          </Link>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--dl-text)" }}>
            Submit Proof
          </h1>
          <p className="text-sm" style={{ color: "var(--dl-muted-light)" }}>
            Proof is timestamped and permanently added to the deal evidence record.
          </p>
        </div>

        {/* Deal ref */}
        <div
          className="p-3 rounded-lg mb-6 flex items-center justify-between"
          style={{ background: "var(--dl-card)", border: "1px solid var(--dl-border)" }}
        >
          <div>
            <div className="text-xs font-medium" style={{ color: "var(--dl-muted-light)" }}>Deal</div>
            <div className="text-sm" style={{ color: "var(--dl-text)" }}>{deal.title}</div>
          </div>
          <div className="text-right">
            <div className="text-xs" style={{ color: "var(--dl-muted)" }}>Counterparty</div>
            <div className="text-sm" style={{ color: "var(--dl-text)" }}>{deal.counterparty}</div>
          </div>
        </div>

        {/* Proof type */}
        <div className="mb-6">
          <label className="block text-xs font-semibold mb-3" style={{ color: "var(--dl-muted-light)" }}>
            PROOF TYPE *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PROOF_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setProofType(t.id)}
                className="p-3 rounded-lg text-left transition-all"
                style={{
                  background: proofType === t.id ? "rgba(201,168,76,0.08)" : "var(--dl-card)",
                  border: `1px solid ${proofType === t.id ? "var(--dl-gold)" : "var(--dl-border)"}`,
                }}
              >
                <div className="text-sm font-medium mb-0.5" style={{ color: proofType === t.id ? "var(--dl-gold)" : "var(--dl-text)" }}>
                  {t.label}
                </div>
                <div className="text-xs" style={{ color: "var(--dl-muted)" }}>{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* File upload (mock) */}
        <div className="mb-6">
          <label className="block text-xs font-semibold mb-3" style={{ color: "var(--dl-muted-light)" }}>
            ATTACHED FILES
          </label>
          <div
            className="border-2 border-dashed rounded-xl p-8 text-center mb-3 cursor-pointer"
            style={{ borderColor: "var(--dl-border)", background: "var(--dl-card)" }}
            onClick={() => setFiles((f) => [...f, { name: "new_document.pdf", size: "128 KB", type: "PDF" }])}
          >
            <div className="text-3xl mb-2">📎</div>
            <div className="text-sm font-medium mb-1" style={{ color: "var(--dl-text)" }}>
              Drop files here or click to upload
            </div>
            <div className="text-xs" style={{ color: "var(--dl-muted)" }}>
              PDF, PNG, JPG, ZIP — max 50MB per file
            </div>
          </div>
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ background: "var(--dl-surface)", border: "1px solid var(--dl-border)" }}
                >
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: "rgba(59,130,246,0.1)", color: "#60a5fa" }}
                  >
                    {f.type}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate" style={{ color: "var(--dl-text)" }}>{f.name}</div>
                    <div className="text-xs" style={{ color: "var(--dl-muted)" }}>{f.size}</div>
                  </div>
                  <button
                    onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-xs"
                    style={{ color: "var(--dl-muted)" }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-xs font-semibold mb-2" style={{ color: "var(--dl-muted-light)" }}>
            DESCRIPTION
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Describe what has been delivered and how it meets the agreed terms..."
            className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
            style={{
              background: "var(--dl-card)",
              border: "1px solid var(--dl-border)",
              color: "var(--dl-text)",
            }}
          />
        </div>

        <div
          className="p-3 rounded-lg mb-6 text-xs"
          style={{
            background: "var(--dl-surface)",
            border: "1px solid var(--dl-border)",
            color: "var(--dl-muted-light)",
          }}
        >
          ⏱ Proof will be timestamped and cryptographically hashed when submitted. It cannot be deleted from the deal record.
        </div>

        <div className="flex gap-3">
          <Link
            href={`/deals/${deal.id}/evidence`}
            className="px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ background: "var(--dl-card)", color: "var(--dl-text)", border: "1px solid var(--dl-border)" }}
          >
            Cancel
          </Link>
          <Button className="flex-1" onClick={() => setSubmitted(true)} disabled={files.length === 0}>
            Submit Proof to Record
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
