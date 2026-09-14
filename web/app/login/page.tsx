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
    if (!email.trim() || !password.trim()) {
      setError("Username & Password kavali!");
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
      setError("Wrong OTP! Use 123456");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9", padding: 16 }}>
      <div style={{ background: "white", padding: 32, borderRadius: 24, width: 380, border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
        
        {/* FULL COLOUR INFINITY LOGO */}
        <div style={{ width: 135, height: 80, background: "black", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img 
            src="/logo.png" 
            alt="Nexlance Full Colour Logo" 
            style={{ width: "92%", height: "92%", objectFit: "contain" }} 
          />
        </div>

        <h2 style={{ margin: "16px 0 0", fontWeight: 800, fontSize: 22 }}>Nexlance Collections</h2>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>MFA Protected Login</p>

        {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#ef4444", padding: "8px 12px", borderRadius: 8, fontSize: 12, marginBottom: 12 }}>{error}</div>}

        {step === 1 ? (
          <>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Username / Email" style={{ width: "100%", padding: 13, borderRadius: 12, border: "1px solid #d0d7e2", outline: "none" }}/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={{ width: "100%", padding: 13, borderRadius: 12, border: "1px solid #d0d7e2", marginTop: 12, outline: "none" }}/>
            <button onClick={handleContinue} style={{ width: "100%", padding: 14, marginTop: 18, background: "black", color: "white", borderRadius: 12, border: "none", fontWeight: 700, cursor: "pointer" }}>Continue</button>
          </>
        ) : (
          <>
            <p style={{ fontSize: 12, color: "#475569", marginBottom: 8 }}>OTP sent to <b>{email}</b></p>
            <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="123456" maxLength={6} style={{ width: "100%", padding: 13, borderRadius: 12, border: "1px solid #d0d7e2", textAlign: "center", letterSpacing: 6, fontWeight: 700, outline: "none" }}/>
            <button onClick={handleVerify} style={{ width: "100%", padding: 14, marginTop: 14, background: "#16a34a", color: "white", borderRadius: 12, border: "none", fontWeight: 700, cursor: "pointer" }}>Verify & Login</button>
            <div style={{ background: "#f0fdf4", textAlign: "center", fontSize: 11, color: "#16a34a", padding: 6, borderRadius: 6, marginTop: 10 }}>Demo OTP: 123456</div>
            <button onClick={() => { setStep(1); setOtp(""); setError(""); }} style={{ width: "100%", marginTop: 10, background: "none", border: "none", color: "#64748b", fontSize: 12, cursor: "pointer" }}>← Back</button>
          </>
        )}
      </div>
    </div>
  );
}
