"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{background: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif'}}>
      <nav style={{background: '#0f172a', color: 'white', padding: '14px 24px', display: 'flex', justifyContent: 'space-between'}}>
        <b>Nexlance Collections</b>
        <div style={{display: 'flex', gap: '16px'}}>
          <Link href="/clients" style={{color: 'white', textDecoration: 'none'}}>Clients</Link>
          <Link href="/invoices" style={{color: 'white', textDecoration: 'none'}}>Invoices</Link>
          <Link href="/payments" style={{color: 'white', textDecoration: 'none'}}>Payments</Link>
          <Link href="/aging" style={{color: 'white', textDecoration: 'none'}}>Aging</Link>
          <Link href="/audit" style={{color: 'white', textDecoration: 'none'}}>Audit</Link>
          <Link href="/login" style={{color: 'white', textDecoration: 'none'}}>Login</Link>
        </div>
      </nav>
      <div style={{padding: '30px'}}>
        <h1>Nexlance Collections - MVP</h1>
        <p>Auditor View - All routes protected</p>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '20px'}}>
          <Link href="/clients" style={{background: 'white', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: 'black', border: '1px solid #ddd'}}>Clients</Link>
          <Link href="/invoices" style={{background: 'white', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: 'black', border: '1px solid #ddd'}}>Invoices</Link>
          <Link href="/payments" style={{background: 'white', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: 'black', border: '1px solid #ddd'}}>Payments</Link>
          <Link href="/aging" style={{background: 'white', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: 'black', border: '1px solid #ddd'}}>Aging Report</Link>
          <Link href="/audit" style={{background: 'white', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: 'black', border: '1px solid #ddd'}}>Audit Log</Link>
          <Link href="/login" style={{background: 'black', padding: '20px', borderRadius: '12px', textDecoration: 'none', color: 'white'}}>Login MFA</Link>
        </div>
      </div>
    </div>
  );
}
