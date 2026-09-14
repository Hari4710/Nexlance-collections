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
      <div style={{ background: "white", padding: 32, borderRadius: 20, width: 380, border: "1px solid #e2e8f0" }}>
        
        {/* ===== EXACT LOGO - CLEAR & BIG ===== */}
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 18 }}>
          <img src="/logo.png" alt="Nexlance Logo" style={{ width: 120, height: 70, objectFit: "contain", borderRadius: 12, background: "black", padding: "8px 12px" }} />
        </div>

        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Nexlance Collections</h2>
        <p style={{ color: "#64748b", fontSize: 13, marginTop: 4, marginBottom: 20 }}>MFA Protected Login</p>

        {step === 1 ? (
          <>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Username / Email" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #cbd5e1" }} />
            <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #cbd5e1", marginTop: 10 }} />
            <button onClick={handleStep1} style={{ width: "100%", padding: 13, marginTop: 16, background: "black", color: "white", borderRadius: 10, border: "none", fontWeight: 700 }}>Continue</button>
          </>
        ) : (
          <>
            <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="123456" style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #cbd5e1", textAlign: "center", letterSpacing: 5, marginTop: 10 }} />
            <button onClick={handleStep2} style={{ width: "100%", padding: 13, marginTop: 14, background: "#16a34a", color: "white", borderRadius: 10, border: "none", fontWeight: 700 }}>Verify & Login</button>
            <p style={{ fontSize: 11, color: "#16a34a", textAlign: "center", marginTop: 10 }}>Demo OTP: 123456</p>
            <button onClick={()=>setStep(1)} style={{ width: "100%", marginTop: 8, background: "transparent", border: "none", color: "#666", fontSize: 12 }}>← Back</button>
          </>
        )}
      </div>
    </div>
  );
}
