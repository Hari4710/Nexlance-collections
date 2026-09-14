"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const logged = localStorage.getItem("nexlance_logged");
    if (logged === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("nexlance_logged");
    setIsLoggedIn(false);
    router.push("/login");
  };

  // Login kakapothe Login page ki pampistadi
  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontFamily: 'sans-serif' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center', width: '400px' }}>
          <h1 style={{ margin: 0 }}>Nexlance Collections</h1>
          <p style={{ color: '#64748b', marginTop: '8px' }}>Audit-Ready System</p>
          <p style={{ color: '#ef4444', marginTop: '20px', fontSize: '14px' }}>Please login to access dashboard</p>
          <Link href="/login" style={{ display: 'block', background: '#0f172a', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', marginTop: '20px', fontWeight: '600' }}>
            Go to Login (MFA)
          </Link>
        </div>
      </div>
    );
  }

  // Login ayyaka kanipinche Dashboard - Paina Options tho
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      {/* TOP NAVBAR - Login ayyaka kanipistundi */}
      <nav style={{ background: '#0f172a', color: 'white', padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <h2 style={{ margin: 0, fontSize: '18px', letterSpacing: '0.5px' }}>Nexlance Collections</h2>
        <div style={{ display: 'flex', gap: '22px
