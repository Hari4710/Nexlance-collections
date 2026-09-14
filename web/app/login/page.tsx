"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ===== CLEAR NORMAL INFINITY LOGO - NO IMAGE FILE NEEDED - 100% SAME =====
function ClearInfinityLogo() {
  return (
    <div style={{ width: 130, height: 75, background: "black", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 200 110" width="110" height="60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="clearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD600"/>
            <stop offset="25%" stopColor="#2AB6E8"/>
            <stop offset="50%" stopColor="#7A6CFF"/>
            <stop offset="72%" stopColor="#D94FFF"/>
            <stop offset="85%" stopColor="#FF4FAE"/>
            <stop offset="100%" stopColor="#FF9A4A"/>
          </linearGradient>
        </defs>
        {/* Main colourful infinity - yellow to orange */}
        <path d="M 12 58 C 12 28 32 12 58 20 C 78 26 92 38 112 52 C 132 66 152 80 172 68 C 186 58 184 36 164 28" 
          stroke="url(#clearGrad)" strokeWidth="11" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Arrow - dark navy */}
        <path d="M 92 53 L 172 8 L 146 20 L 152 18 L 92 53" fill="#2E2A7A" stroke="#2E2A7A" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M 92 53 L 172 8" stroke="#2E2A7A" strokeWidth="11" strokeLinecap="round"/>
        {/* Bottom dark loops */}
        <path d="M 18 58 C 28 50 44 46 60 51 C 85 60 106 76 130 90 C 150 100 172 101 190 86" 
          stroke="#2E2A7A" strokeWidth="11" fill="none" strokeLinecap="round"/>
        <path d="M 22 78 C 34 88 50 92 68 88 C 80 85 86 76 82 64" 
          stroke="#2E2A7A" strokeWidth="11" fill="none" strokeLinecap="round"/>
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
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f4f8", padding: 16 }}>
      <div style={{ background: "white", padding: 28, borderRadius: 24, width: 360, border: "1px solid #e2e8f0" }}>
        <ClearInfinityLogo />
        <h2 style={{ margin: "16px 0 0", fontWeight: 800, fontSize: 22 }}>Nexlance Collections</h2>
        <p style={{ color: "#64748b", fontSize: 13, margin: "4px 0 20px" }}>MFA Protected Login</p>

        {step === 1 ? (
          <>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Username / Email" style={{ width: "100%", padding: 13, borderRadius: 12, border: "1px solid #cbd5e1", outline: "none" }}/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={{ width: "100%", padding: 13, borderRadius: 12, border: "1px solid #cbd5e1", marginTop: 12, outline: "none" }}/>
            <button onClick={() => { if(email && password) setStep(2) }} style={{ width: "100%", padding: 14, marginTop: 16, background: "black", color: "white", borderRadius: 12, border: "none", fontWeight: 700 }}>Continue</button>
          </>
        ) : (
          <>
            <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="123456" maxLength={6} style={{ width: "100%", padding: 13, borderRadius: 12, border: "1px solid #cbd5e1", textAlign: "center", letterSpacing: 6, outline: "none", fontWeight: 700 }}/>
            <button onClick={() => { if(otp==="123456"){ localStorage.setItem("nexlance_logged","true"); router.push("/") } }} style={{ width: "100%", padding: 14, marginTop: 14, background: "#16a34a", color: "white", borderRadius: 12, border: "none", fontWeight: 700 }}>Verify & Login</button>
            <button onClick={() => setStep(1)} style={{ width: "100%", marginTop: 10, background: "none", border: "none", color: "#666", fontSize: 12 }}>← Back</button>
            <p style={{ fontSize: 11, color: "#16a34a", textAlign: "center", marginTop: 8 }}>Demo OTP: 123456</p>
          </>
        )}
      </div>
    </div>
  );
}
