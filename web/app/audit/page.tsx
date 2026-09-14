"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuditPage() {
  const logs = [
    { time: "2026-05-13 09:30", user: "admin@nexlance.com", action: "Login Success - MFA Verified", ip: "192.168.1.1" },
    { time: "2026-05-13 09:31", user: "admin@nexlance.com", action: "Viewed Clients List", ip: "192.168.1.1" },
    { time: "2026-05-13 09:32", user: "admin@nexlance.com", action: "Viewed Aging Report", ip: "192.168.1.1" },
    { time: "2026-05-13 09:35", user: "admin@nexlance.com", action: "Exported Audit Log", ip: "192.168.1.1" },
  ];

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <nav style={{ background: "black", color: "white", padding: "14px 20px", display: "flex", justifyContent: "space-between" }}>
        <Link href="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>← Back to Dashboard</Link>
        <b>Audit Log - Immutable</b>
      </nav>
      <div style={{ padding: 20 }}>
        <h3>Immutable Audit Trail</h3>
        <p style={{ color: "#64748b", fontSize: 13 }}>All actions are logged and cannot be deleted</p>
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", marginTop: 16, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr 3fr 1fr", background: "#f1f5f9", padding: "12px 16px", fontWeight: "bold", fontSize: 12 }}>
            <span>Timestamp</span><span>User</span><span>Action</span><span>IP</span>
          </div>
          {logs.map((l, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr 3fr 1fr", padding: "12px 16px", borderTop: "1px solid #f1f5f9", fontSize: 13 }}>
              <span>{l.time}</span><span>{l.user}</span><span>{l.action}</span><span>{l.ip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
