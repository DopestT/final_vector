import Link from "next/link";

const features = [
  {
    icon: "📋",
    title: "Secured Terms",
    desc: "Both parties review, negotiate, and digitally accept binding deal terms before anything moves.",
  },
  {
    icon: "🔐",
    title: "Protected Funding",
    desc: "Funds are processed and protected through third-party escrow and payment partners — never held by DealLock.",
  },
  {
    icon: "📎",
    title: "Proof & Evidence",
    desc: "Every milestone, file, and message is timestamped and verified on the deal record.",
  },
  {
    icon: "⚖️",
    title: "Dispute Resolution",
    desc: "Structured dispute process with full audit trail — resolution backed by documented evidence.",
  },
];

const steps = [
  { n: "01", title: "Define the Deal", desc: "Set terms, amount, deadline, and counterparty." },
  { n: "02", title: "Both Parties Sign", desc: "Mutual review and digital acceptance of all terms." },
  { n: "03", title: "Funds Protected", desc: "Payment secured through our verified third-party partners." },
  { n: "04", title: "Deliver & Prove", desc: "Submit timestamped proof of delivery or completion." },
  { n: "05", title: "Approve & Release", desc: "Counterparty approves — funds released. Deal closed." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--dl-bg)" }}>
      {/* Nav */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8"
        style={{ background: "rgba(8,12,26,0.95)", borderBottom: "1px solid var(--dl-border)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
            style={{ background: "var(--dl-gold)", color: "#080c1a" }}
          >
            DL
          </div>
          <span className="text-lg font-semibold" style={{ color: "var(--dl-text)" }}>
            DealLock
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm font-medium"
            style={{ color: "var(--dl-muted-light)" }}
          >
            Sign In
          </Link>
          <Link
            href="/deals/create"
            className="px-4 py-1.5 rounded text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--dl-gold)", color: "#080c1a" }}
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-24 px-8 text-center max-w-4xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
          style={{
            background: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.25)",
            color: "var(--dl-gold)",
          }}
        >
          ● Premium Deal Protection Platform
        </div>
        <h1
          className="text-5xl font-bold leading-tight mb-6 tracking-tight"
          style={{ color: "var(--dl-text)" }}
        >
          Private deals.
          <br />
          <span style={{ color: "var(--dl-gold)" }}>Protected.</span>
        </h1>
        <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: "var(--dl-muted-light)" }}>
          Turn handshake deals into secure, funded, proof-backed agreements.
          Every term, signature, payment, and piece of evidence — locked to the
          record.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/deals/create"
            className="px-8 py-3.5 rounded-lg text-base font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--dl-gold)", color: "#080c1a" }}
          >
            Start a Deal
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-3.5 rounded-lg text-base font-semibold"
            style={{
              background: "var(--dl-card)",
              color: "var(--dl-text)",
              border: "1px solid var(--dl-border)",
            }}
          >
            View Dashboard
          </Link>
        </div>
        <p className="mt-5 text-xs" style={{ color: "var(--dl-muted)" }}>
          Funds processed and protected through certified third-party escrow and payment partners.
        </p>
      </section>

      {/* Stats bar */}
      <section
        className="py-8 px-8"
        style={{ borderTop: "1px solid var(--dl-border)", borderBottom: "1px solid var(--dl-border)", background: "var(--dl-surface)" }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { value: "$2.4B+", label: "Deal value protected" },
            { value: "14,200+", label: "Deals secured" },
            { value: "99.1%", label: "Dispute resolution rate" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold mb-1" style={{ color: "var(--dl-gold)" }}>
                {s.value}
              </div>
              <div className="text-sm" style={{ color: "var(--dl-muted-light)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3" style={{ color: "var(--dl-text)" }}>
          Every stage of your deal, secured
        </h2>
        <p className="text-center mb-12" style={{ color: "var(--dl-muted-light)" }}>
          DealLock secures the whole deal — not just the payment.
        </p>
        <div className="grid grid-cols-2 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-xl"
              style={{
                background: "var(--dl-card)",
                border: "1px solid var(--dl-border)",
              }}
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="text-base font-semibold mb-2" style={{ color: "var(--dl-text)" }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--dl-muted-light)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        className="py-20 px-8"
        style={{ background: "var(--dl-surface)", borderTop: "1px solid var(--dl-border)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: "var(--dl-text)" }}>
            How DealLock works
          </h2>
          <p className="text-center mb-12" style={{ color: "var(--dl-muted-light)" }}>
            Five steps from agreement to completion.
          </p>
          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.n}
                className="flex items-start gap-5 p-5 rounded-xl"
                style={{
                  background: "var(--dl-card)",
                  border: "1px solid var(--dl-border)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: "rgba(201,168,76,0.12)", color: "var(--dl-gold)" }}
                >
                  {step.n}
                </div>
                <div>
                  <div className="font-semibold mb-1" style={{ color: "var(--dl-text)" }}>
                    {step.title}
                  </div>
                  <div className="text-sm" style={{ color: "var(--dl-muted-light)" }}>
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--dl-text)" }}>
          Ready to lock your next deal?
        </h2>
        <p className="mb-8" style={{ color: "var(--dl-muted-light)" }}>
          Start with our AI Deal Builder — generate structured terms in minutes.
        </p>
        <Link
          href="/deals/create"
          className="inline-block px-10 py-4 rounded-lg text-base font-semibold transition-opacity hover:opacity-90"
          style={{ background: "var(--dl-gold)", color: "#080c1a" }}
        >
          Create Your First Deal
        </Link>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-8 text-center text-xs"
        style={{
          borderTop: "1px solid var(--dl-border)",
          color: "var(--dl-muted)",
        }}
      >
        <p>© 2026 DealLock Inc. Funds processed and protected through third-party escrow and payment partners.</p>
        <p className="mt-1">DealLock does not hold, custody, or manage funds directly.</p>
      </footer>
    </div>
  );
}
