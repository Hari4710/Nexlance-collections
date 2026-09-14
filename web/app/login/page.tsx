"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9", padding: 16 }}>
      <div style={{ background: "white", padding: 32, borderRadius: 24, width: 380, border: "1px solid #e2e8f0" }}>
        
        {/* SAME LOGO - CLEAR - NORMAL INFINITY */}
        <div style={{ width: 130, height: 75, background: "black", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/logo.png" alt="logo" style={{ width: "90%", height: "90%", objectFit: "contain" }} />
        </div>

        <h2 style={{ margin: "16px 0 0", fontWeight: 800, fontSize: 22 }}>Nexlance Collections</h2>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>MFA Protected Login</p>

        {step === 1 ? (
          <>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Username / Email" style={{ width: "100%", padding: 13, borderRadius: 12, border: "1px solid #d0d7e2" }}/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={{ width: "100%", padding: 13, borderRadius: 12, border: "1px solid #d0d7e2", marginTop: 12 }}/>
            <button onClick={() => { if(email && password) setStep(2) }} style={{ width: "100%", padding: 14, marginTop: 16, background: "black", color: "white", borderRadius: 12, border: "none", fontWeight: 700 }}>Continue</button>
          </>
        ) : (
          <>
            <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="123456" style={{ width: "100%", padding: 13, borderRadius: 12, border: "1px solid #d0d7e2", textAlign: "center", letterSpacing: 6, fontWeight: 700 }}/>
            <button onClick={() => { if(otp==="123456"){ localStorage.setItem("nexlance_logged","true"); router.push("/") } }} style={{ width: "100%", padding: 14, marginTop: 14, background: "#16a34a", color: "white", borderRadius: 12, border: "none", fontWeight: 700 }}>Verify & Login</button>
            <p style={{ fontSize: 11, color: "#16a34a", textAlign: "center", marginTop: 8 }}>Demo OTP: 123456</p>
            <button onClick={() => setStep(1)} style={{ width: "100%", marginTop: 8, background: "none", border: "none", color: "#666", fontSize: 12 }}>← Back</button>
          </>
        )}
      </div>
    </div>
  );
}
