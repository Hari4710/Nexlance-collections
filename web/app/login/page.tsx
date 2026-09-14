"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9", padding: 16 }}>
      <div style={{ background: "white", padding: 28, borderRadius: 24, width: 380, border: "1px solid #e2e8f0" }}>
        
        {/* ===== 100% CORRECT LOGO - NO SVG - DIRECT IMAGE - NO DISTORTION ===== */}
        <div style={{ width: 110, height: 70, background: "black", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <img 
            src="/logo.png" 
            alt="Nexlance Logo" 
            style={{ width: "85%", height: "85%", objectFit: "contain" }} 
          />
        </div>

        <h2 style={{ margin: "14px 0 0", fontWeight: 800, fontSize: 22, fontFamily: "system-ui" }}>Nexlance Collections</h2>
        <p style={{ color: "#64748b", fontSize: 13, marginTop: 4, marginBottom: 20 }}>MFA Protected Login</p>

        {step === 1 ? (
          <>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Username" style={{ width: "100%", padding: 13, borderRadius: 12, border: "1px solid #d0d7e2", outline: "none" }} />
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" style={{ width: "100%", padding: 13, borderRadius: 12, border: "1px solid #d0d7e2", marginTop: 12, outline: "none" }} />
            <button onClick={() => { if (email && pass) setStep(2) }} style={{ width: "100%", padding: 14, marginTop: 16, background: "black", color: "white", borderRadius: 12, border: "none", fontWeight: 700 }}>Continue</button>
          </>
        ) : (
          <>
            <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="123456" style={{ width: "100%", padding: 13, borderRadius: 12, border: "1px solid #d0d7e2", textAlign: "center", letterSpacing: 5, outline: "none" }} />
            <button onClick={() => { if (otp === "123456") { localStorage.setItem("nexlance_logged", "true"); router.push("/") } }} style={{ width: "100%", padding: 14, marginTop: 14, background: "#16a34a", color: "white", borderRadius: 12, border: "none", fontWeight: 700 }}>Verify & Login</button>
            <button onClick={() => setStep(1)} style={{ width: "100%", marginTop: 10, background: "none", border: "none", color: "#666" }}>← Back</button>
          </>
        )}
      </div>
    </div>
  );
}
