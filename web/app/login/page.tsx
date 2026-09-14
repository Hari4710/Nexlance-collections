"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleStep1 = () => {
    if (!email || !pass) { alert("Enter details"); return; }
    setStep(2);
  };
  const handleStep2 = () => {
    if (otp === "123456") {
      localStorage.setItem("nexlance_logged", "true");
      router.push("/");
    } else alert("Use OTP 123456");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9", padding: 16 }}>
      <div style={{ background: "white", padding: "32px 28px", borderRadius: 24, width: 400, border: "1px solid #e2e8f0" }}>
        
        {/* ===== CLEAR LOGO - NO BLACK BOX - BIG & SHARP ===== */}
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 20 }}>
          <svg width="110" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFCC00" />
                <stop offset="20%" stopColor="#2EB5E5" />
                <stop offset="40%" stopColor="#7B61FF" />
                <stop offset="60%" stopColor="#E95DDC" />
                <stop offset="85%" stopColor="#FF8A4C" />
                <stop offset="100%" stopColor="#FF8A4C" />
              </linearGradient>
            </defs>
            {/* Top colorful arrow loop */}
            <path d="M 5 32 Q 5 12 28 12 Q 42 12 58 28 Q 75 45 92 45 Q 108 45 108 32 Q 108 18 92 15 Q 88 14 86 22 Q 88 20 95 20 Q 102 20 102 30 Q 102 40 88 40 Q 74 40 55 22 Q 38 5 20 5 Q 2 5 2 25 Q 2 42 22 48 Q 10 44 5 32 Z" 
              fill="url(#logoGrad)" />
            {/* Bottom dark blue shadow loop */}
            <path d="M 18 33 Q 28 28 40 35 Q 55 45 75 58 Q 95 70 115 50 Q 108 58 92 62 Q 70 68 50 55 Q 30 42 18 33 Z M 35 15 Q 55 20 70 35 Q 55 20 35 15 Z" 
              fill="#2D1B6B" opacity="0.95" />
          </svg>
        </div>

        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, textAlign: "left" }}>Nexlance Collections</h2>
        <p style={{ color: "#64748b", fontSize: 14, marginTop: 4, marginBottom: 24, textAlign: "left" }}>MFA Protected Login</p>

        {step === 1 ? (
          <>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Username / Email" style={{ width: "100%", padding: 14, borderRadius: 12, border: "1px solid #cbd5e1", fontSize: 14 }} />
            <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" style={{ width: "100%", padding: 14, borderRadius: 12, border: "1px solid #cbd5e1", marginTop: 12, fontSize: 14 }} />
            <button onClick={handleStep1} style={{ width: "100%", padding: 14, marginTop: 18, background: "black", color: "white", borderRadius: 12, border: "none", fontWeight: 700, fontSize: 15 }}>Continue</button>
          </>
        ) : (
          <>
            <p style={{ fontSize: 13 }}>Enter 2FA code</p>
            <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="123456" style={{ width: "100%", padding: 14, borderRadius: 12, border: "1px solid #cbd5e1", textAlign: "center", letterSpacing: 6, marginTop: 8 }} />
            <button onClick={handleStep2} style={{ width: "100%", padding: 14, marginTop: 16, background: "#16a34a", color: "white", borderRadius: 12, border: "none", fontWeight: 700 }}>Verify & Login</button>
            <p style={{ fontSize: 11, color: "#16a34a", textAlign: "center", marginTop: 10 }}>Demo OTP: 123456</p>
            <button onClick={()=>setStep(1)} style={{ width: "100%", marginTop: 8, background: "transparent", border: "none", color: "#64748b", fontSize: 13 }}>← Back</button>
          </>
        )}
      </div>
    </div>
  );
}
