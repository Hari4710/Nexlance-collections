"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ========== 1ST + 2ND KALIPI - FULL LOGO (Rendu kalipi) ==========
function InfinityLogo() {
  return (
    <div style={{ width: 160, height: 85, background: "black", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 120 65" width="130" height="65" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="infinityFullGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FFCC00" />
            <stop offset="20%" stopColor="#2EB7E8" />
            <stop offset="40%" stopColor="#6B8AFF" />
            <stop offset="62%" stopColor="#C24CFF" />
            <stop offset="78%" stopColor="#FF4DB8" />
            <stop offset="100%" stopColor="#FF8A3D" />
          </linearGradient>
        </defs>
        {/* Colourful infinity - break lekunda */}
        <path d="M 6 36 C 6 19 18 8 31 10.5 C 41 12 50 19 60 27 C 70 35 83 43 93 43 C 101 43 104 35 102 28.5 C 101.5 26 99 23.5 96 22.5" stroke="url(#infinityFullGrad)" strokeWidth="5.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Arrow */}
        <path d="M 60 27.5 L 93 3 L 81 9 L 85 8 L 60 27.5 Z" fill="#2B1E6E" />
        <path d="M 60 27.5 L 93 3" stroke="#2B1E6E" strokeWidth="5.5" strokeLinecap="round"/>
        {/* Dark bottom */}
        <path d="M 9 36 C 13 32 21 31 30 34.5 C 44 41 58 51 72 56 C 86 61 98 60 105 49" stroke="#2B1E6E" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
        <path d="M 11 48 C 17 54 26 57.5 36 56 C 46 54.5 52 47 49 39.5" stroke="#2B1E6E" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

// ========== FULL LOGIN PAGE ==========
export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9", padding: 16 }}>
      <div style={{ background: "white", padding: 32, borderRadius: 24, width: 400, border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        
        <InfinityLogo />

        <h2 style={{ margin: "16px 0 0", fontWeight: 800, fontSize: 22 }}>Nexlance Collections</h2>
        <p style={{ color: "#64748b", fontSize: 13, marginTop: 4, marginBottom: 22 }}>MFA Protected Login</p>

        {step === 1 ? (
          <>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Username / Email" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #cbd5e1", outline: "none" }}/>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #cbd5e1", marginTop: 10, outline: "none" }}/>
            <button onClick={() => { if (email && pass) setStep(2); else alert("Enter details") }} style={{ width: "100%", padding: 13, marginTop: 16, background: "black", color: "white", borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer" }}>Continue</button>
          </>
        ) : (
          <>
            <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="123456" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #cbd5e1", textAlign: "center", letterSpacing: 5, outline: "none" }}/>
            <button onClick={() => { if (otp === "123456") { localStorage.setItem("nexlance_logged", "true"); router.push("/") } else alert("Wrong OTP - Use 123456") }} style={{ width: "100%", padding: 13, marginTop: 14, background: "#16a34a", color: "white", borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer" }}>Verify & Login</button>
            <p style={{ fontSize: 11, color: "#16a34a", textAlign: "center", marginTop: 10 }}>Demo OTP: 123456</p>
            <button onClick={() => setStep(1)} style={{ width: "100%", marginTop: 8, background: "transparent", border: "none", color: "#666", fontSize: 12, cursor: "pointer" }}>← Back</button>
          </>
        )}
      </div>
    </div>
  );
}
