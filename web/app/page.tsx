"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const logged = localStorage.getItem("nexlance_logged");
    if (logged === "true") setIsLoggedIn(true);
    setLoading(false);
  }, []);

  if (loading) return <div style={{ padding: 30 }}>Loading...</div>;

  if (!isLoggedIn) {
    router.push("/login");
    return <div style={{ padding: 30 }}>Redirecting to login...</div>;
  }

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <nav style={{ background: "#0f172a", color: "white", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <b>Nexlance Collections</b>
        <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 14 }}>
          <Link href="/clients" style={{ color: "white", textDecoration: "none" }}>Clients</Link>
          <Link href="/invoices" style={{ color: "white", textDecoration: "none" }}>Invoices</Link>
          <Link href="/payments" style={{ color: "white", textDecoration: "none" }}>Payments</Link>
          <Link href="/aging" style={{ color: "white", textDecoration: "none" }}>Aging</Link>
          <Link href="/audit" style={{ color: "white", textDecoration: "none" }}>Audit</Link>
          <button onClick={() => { localStorage.removeItem("nexlance_logged"); router.push("/login"); }} style={{ background: "#ef4444", color: "white", border: "none", padding: "6px 12px", borderRadius: 6 }}>Logout</button>
        </div>
      </nav>

      <div style={{ padding: 32, maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        <p style={{ color: "#64748b", marginTop: 6 }}>Secure access - All actions are audit logged</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 24 }}>
          <Link href="/clients" style={{ background: "white", padding: 20, borderRadius: 12, border: "1px solid #e2e8f0", textDecoration: "none", color: "black" }}>Clients</Link>
          <Link href="/invoices" style={{ background: "white", padding: 20, borderRadius: 12, border: "1px solid #e2e8f0", textDecoration: "none", color: "black" }}>Invoices</Link>
          <Link href="/payments" style={{ background: "white", padding: 20, borderRadius: 12, border: "1px solid #e2e8f0", textDecoration: "none", color: "black" }}>Payments</Link>
          <Link href="/aging" style={{ background: "white", padding: 20, borderRadius: 12, border: "1px solid #e2e8f0", textDecoration: "none", color: "black" }}>Aging Report</Link>
          <Link href="/audit" style={{ background: "white", padding: 20, borderRadius: 12, border: "1px solid #e2e8f0", textDecoration: "none", color: "black" }}>Audit Log</Link>
        </div>
      </div>
    </div>
  );
}
