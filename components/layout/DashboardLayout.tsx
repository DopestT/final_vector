import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ background: "var(--dl-bg)" }}>
      <Navbar />
      <main className="pt-16 min-h-screen">{children}</main>
    </div>
  );
}
