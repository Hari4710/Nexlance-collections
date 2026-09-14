"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (!email || !password) {
      setError("Username and Password kavali bro!");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleVerify = () => {
    if (otp === "123456") {
      localStorage.setItem("nexlance_logged", "true");
      localStorage.setItem("nexlance_user", email);
      router.push("/");
    } else {
      setError("Wrong OTP! Demo OTP: 123456");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9", padding: 16 }}>
      <div style={{ background: "white", padding: 32, borderRadius: 24, width: 380, border: "1px solid #e2e8f0", boxShadow: "0 12px 32px rgba(0,0,0,0.06)" }}>
        
        {/* ===== SAME NORMAL INFINITY LOGO - NO SVG - 100% SAME ===== */}
        <div style={{ width: 120, height: 70, background: "black", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img 
            src="/logo.png" 
            alt="Nexlance Logo" 
            style={{ width: "88%", height: "88%", objectFit: "contain" }} 
          />
        </div>

        <h2 style={{ margin: "16px 0 0", fontWeight: 800, fontSize: 23, fontFamily: "system-ui", color: "#111" }}>Nexlance Collections</h2>
        <p style={{ color: "#64748b", fontSize: 13, marginTop: 4, marginBottom: 20 }}>MFA Protected Login</p>

        {error && <p style={{ color: "#ef4444", fontSize: 12, marginBottom: 12, background: "#fef2f2", padding: 8, borderRadius: 8, border: "1px solid #fecaca" }}>{error}</p>}

        {step === 1 ? (
          <>
            <input 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Username / Email" 
              style={{ width: "100%", padding: 13, borderRadius: 12, border: "1px solid #d0d7e2", outline: "none", fontSize: 14 }} 
            />
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Password" 
              style={{ width: "100%", padding: 13, borderRadius: 12, border: "1px solid #d0d7e2", marginTop: 12, outline: "none", fontSize: 14 }} 
            />
            <button 
              onClick={handleContinue} 
              style={{ width: "100%", padding: 14, marginTop: 18, background: "black", color: "white", borderRadius: 12, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 14 }}
            >
              Continue
            </button>
          </>
        ) : (
          <>
            <p style={{ fontSize: 12, color: "#475569", marginBottom: 10 }}>OTP sent to {email}</p>
            <input 
              value={otp} 
              onChange={e => setOtp(e.target.value)} 
              placeholder="Enter 123456" 
              maxLength={6}
              style={{ width: "100%", padding: 13, borderRadius: 12, border: "1px solid #d0d7e2", textAlign: "center", letterSpacing: 6, outline: "none", fontSize: 16, fontWeight: 700 }} 
            />
            <button 
              onClick={handleVerify} 
              style={{ width: "100%", padding: 14, marginTop: 14, background: "#16a34a", color: "white", borderRadius: 12, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 14 }}
            >
              Verify & Login
            </button>
            <p style={{ fontSize: 11, color: "#16a34a", textAlign: "center", marginTop: 10, background: "#f0fdf4", padding: 6, borderRadius: 6 }}>Demo OTP: 123456</p>
            <button 
              onClick={() => { setStep(1); setError(""); setOtp(""); }} 
              style={{ width: "100%", marginTop: 10, background: "transparent", border: "none", color: "#64748b", fontSize: 12, cursor: "pointer" }}
            >
              ← Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
