"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      style={{
        background: "var(--dl-surface)",
        borderBottom: "1px solid var(--dl-border)",
      }}
      className="fixed top-0 left-0 right-0 z-50 h-16"
    >
      <div className="flex items-center justify-between h-full px-6">
        <Link href="/" className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
            style={{ background: "var(--dl-gold)", color: "#080c1a" }}
          >
            DL
          </div>
          <span
            className="text-lg font-semibold tracking-tight"
            style={{ color: "var(--dl-text)" }}
          >
            DealLock
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {[
            { href: "/dashboard", label: "Dashboard" },
            { href: "/pricing", label: "Pricing" },
            { href: "/disputes", label: "Disputes" },
            { href: "/verification", label: "Verify" },
            { href: "/admin", label: "Admin" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded text-sm font-medium transition-colors"
              style={{
                color: pathname.startsWith(item.href)
                  ? "var(--dl-gold)"
                  : "var(--dl-muted-light)",
                background: pathname.startsWith(item.href)
                  ? "var(--dl-card)"
                  : "transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/deals/create"
            className="px-4 py-1.5 rounded text-sm font-semibold transition-opacity hover:opacity-90"
            style={{
              background: "var(--dl-gold)",
              color: "#080c1a",
            }}
          >
            + New Deal
          </Link>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
            style={{
              background: "var(--dl-card)",
              border: "1px solid var(--dl-border)",
              color: "var(--dl-gold)",
            }}
          >
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
