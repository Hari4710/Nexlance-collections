"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ===== FINAL LOGO - NO /logo.png NEEDED - SAME AS YOUR PIC - CLEAR =====
function InfinityLogo() {
  return (
    <div style={{ width: 140, height: 82, background: "black", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 200 110" width="120" height="66" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="fullGrad" x1="0%" y1="20%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#FFCC00"/>
            <stop offset="22%" stopColor="#3EBFEA"/>
            <stop offset="45%" stopColor="#7B7CFF"/>
            <stop offset="68%" stopColor="#D85DFF"/>
            <stop offset="86%" stopColor="#FF5CA8"/>
            <stop offset="100%" stopColor="#FFA65C"/>
          </linearGradient>
        </defs>
        {/* Top colourful loop - yellow to orange */}
        <path d="M 10 60 C 10 30 30 13 56 19 C 74 23 89 33 109 47 C 129 61 149 76 169 68 C 183 61 183 40 163 33" 
          stroke="url(#fullGrad)" strokeWidth="10.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Dark arrow */}
        <path d="M 91 55 L 166 8 L 142 18 L 91 60 Z" fill="#2D2F7A"/>
        {/* Bottom dark loops */}
        <path d="M 27 55 C 38 51 52 51 66 55 C 88 62 109 75 131 87 C 151 97 171 99 187 88" 
          stroke="#2D2F7A" strokeWidth="10.5" fill="none" strokeLinecap="round"/>
        <path d="M 20 80 C 34 90 54 93 72 86 C 80 82 84 76 80 68" 
          stroke="#2D2F7A" strokeWidth="10.5" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#eef2f7", padding: 16 }}>
      <div style={{ background: "white", padding: 32, borderRadius: 28, width: 380, border: "1px solid #e2e8f0", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
        <InfinityLogo />
        <h1 style={{ margin: "18px 0 0", fontWeight: 800, fontSize: 24, color: "#111" }}>Nexlance Collections</h1>
        <p style={{ color: "#7a8599", fontSize: 13, margin: "4px 0 22px" }}>MFA Protected Login</p>

        {step === 1 ? (
          <>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Username / Email" style={{ width: "100%", padding: 14, borderRadius: 14, border: "1.5px solid #d8dee8", outline: "none", fontSize: 14 }}/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={{ width: "100%", padding: 14, borderRadius: 14, border: "1.5px solid #d8dee8", marginTop: 12, outline: "none", fontSize: 14 }}/>
            <button onClick={() => { if(email && password) setStep(2) }} style={{ width: "100%", padding: 15, marginTop: 18, background: "black", color: "white", borderRadius: 14, border: "none", fontWeight: 700, fontSize: 15 }}>Continue</button>
          </>
        ) : (
          <>
            <p style={{ fontSize: 12, color: "#555", marginBottom: 8 }}>OTP sent to <b>{email}</b></p>
            <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="123456" maxLength={6} style={{ width: "100%", padding: 14, borderRadius: 14, border: "1.5px solid #d8dee8", textAlign: "center", letterSpacing: 6, fontWeight: 700, outline: "none" }}/>
            <button onClick={() => { if(otp==="123456"){ localStorage.setItem("nexlance_logged","true"); router.push("/") } }} style={{ width: "100%", padding: 15, marginTop: 14, background: "#16a34a", color: "white", borderRadius: 14, border: "none", fontWeight: 700 }}>Verify & Login</button>
            <p style={{ fontSize: 11, color: "#16a34a", textAlign: "center", marginTop: 10, background: "#f0fdf4", padding: 6, borderRadius: 8 }}>Demo OTP: 123456</p>
            <button onClick={() => setStep(1)} style={{ width: "100%", marginTop: 10, background: "none", border: "none", color: "#777", fontSize: 13 }}>← Back</button>
          </>
        )}
      </div>
    </div>
  );
}
