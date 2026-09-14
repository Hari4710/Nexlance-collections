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
    if (!email || !pass) { alert("Enter username & password"); return; }
    setStep(2);
  };
  const handleStep2 = () => {
    if (otp === "123456") {
      localStorage.setItem("nexlance_logged", "true");
      router.push("/");
    } else alert("Wrong OTP - Use 123456");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9" }}>
      <div style={{ background: "white", padding: 32, borderRadius: 20, width: 380, border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        
        {/* ===== LOGO - 2ND PIC LAAGA ===== */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
          <div style={{ width: 80, height: 50, background: "black", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", padding: 8 }}>
            <svg viewBox="0 0 100 50" style={{ width: "100%" }}>
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFC700" />
                  <stop offset="25%" stopColor="#2E90FA" />
                  <stop offset="50%" stopColor="#A855F7" />
                  <stop offset="75%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#FF8A3D" />
                </linearGradient>
              </defs>
              <path d="M 10 25 C 0 10, 25 2, 35 15 L 75 5 L 62 16 C 72 12, 88 18, 88 26 C 88 40, 60 48, 48 32 C 36 16, 8 8, 2 22 C 2 36, 28 44, 35 30 C 28 35, 12 34, 10 25 Z" fill="url(#grad)" />
            </svg>
          </div>
          <div style={{ width: 40, height: 3, background: "linear-gradient(90deg, #FFC700, #2E90FA, #EC4899, #FF8A3D)", borderRadius: 10, marginTop: 10 }}></div>
        </div>

        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Nexlance Collections</h2>
        <p style={{ color: "#64748b", fontSize: 13, marginTop: 4, marginBottom: 20 }}>MFA Protected Login</p>

        {step === 1 ? (
          <>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Username / Email" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #cbd5e1", outline: "none" }} />
            <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #cbd5e1", marginTop: 10, outline: "none" }} />
            <button onClick={handleStep1} style={{ width: "100%", padding: 12, marginTop: 16, background: "black", color: "white", borderRadius: 10, border: "none", fontWeight: 700 }}>Continue</button>
          </>
        ) : (
          <>
            <p style={{ fontSize: 13, color: "#334155" }}>Enter 2FA code sent to {email}</p>
            <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="123456" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #cbd5e1", textAlign: "center", letterSpacing: 5, marginTop: 8, outline: "none" }} />
            <button onClick={handleStep2} style={{ width: "100%", padding: 12, marginTop: 16, background: "#16a34a", color: "white", borderRadius: 10, border: "none", fontWeight: 700 }}>Verify & Login</button>
            <p style={{ fontSize: 11, color: "#16a34a", textAlign: "center", marginTop: 10 }}>Demo OTP: 123456</p>
            <button onClick={()=>setStep(1)} style={{ width: "100%", marginTop: 8, background: "transparent", border: "none", color: "#64748b", fontSize: 12 }}>← Back</button>
          </>
        )}
      </div>
    </div>
  );
}
