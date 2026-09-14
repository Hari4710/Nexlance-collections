"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [ok, setOk] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("nexlance_logged") === "true") setOk(true);
    setLoaded(true);
  }, []);

  if (!loaded) return <div style={{padding: 30}}>Loading...</div>;

  if (!ok) {
    router.push("/login");
    return <div style={{padding: 30}}>Redirecting to Login...</div>;
  }

  return (
    <div style={{background: '#f8fafc', minHeight: '100vh'}}>
      <nav style={{background: 'black', color: 'white', padding: '14px 20px', display: 'flex', justifyContent: 'space-between'}}>
        <b>Nexlance Collections</b>
        <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
          <Link href="/clients" style={{color: 'white', textDecoration: 'none'}}>Clients</Link>
          <Link href="/invoices" style={{color: 'white', textDecoration: 'none'}}>Invoices</Link>
          <Link href="/payments" style={{color: 'white', textDecoration: 'none'}}>Payments</Link>
          <Link href="/aging" style={{color: 'white', textDecoration: 'none'}}>Aging</Link>
          <Link href="/audit" style={{color: 'white', textDecoration: 'none'}}>Audit</Link>
          <button onClick={()=>{localStorage.removeItem("nexlance_logged"); router.push("/login");}} style={{background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: 6}}>Logout</button>
        </div>
      </nav>
      <div style={{padding: 30}}>
        <h2>Dashboard</h2>
        <p>Login ayyav - Ippudu anni options paina kanipistunnay</p>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 20}}>
          <Link href="/clients" style={{background: 'white', padding: 20, borderRadius: 12, border: '1px solid #ddd', textDecoration: 'none', color: 'black'}}>Clients</Link>
          <Link href="/invoices" style={{background: 'white', padding: 20, borderRadius: 12, border: '1px solid #ddd', textDecoration: 'none', color: 'black'}}>Invoices</Link>
          <Link href="/payments" style={{background: 'white', padding: 20, borderRadius: 12, border: '1px solid #ddd', textDecoration: 'none', color: 'black'}}>Payments</Link>
          <Link href="/aging" style={{background: 'white', padding: 20, borderRadius: 12, border: '1px solid #ddd', textDecoration: 'none', color: 'black'}}>Aging Report</Link>
          <Link href="/audit" style={{background: 'white', padding: 20, borderRadius: 12, border: '1px solid #ddd', textDecoration: 'none', color: 'black'}}>Audit Log</Link>
        </div>
      </div>
    </div>
  );
}
