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
    if (!email || !pass) {
      alert("Please enter username and password");
      return;
    }
    setStep(2);
  };

  const handleStep2 = () => {
    if (otp === "123456") {
      localStorage.setItem("nexlance_logged", "true");
      router.push("/");
    } else {
      alert("Invalid 2FA code. Use: 123456");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
      <div style={{ background: "white", padding: 32, borderRadius: 16, width: 360, border: "1px solid #e2e8f0" }}>
        <h2 style={{ margin: 0 }}>Nexlance Collections</h2>
        <p style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>MFA Protected Login</p>

        {step === 1 ? (
          <>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Username / Email" style={{ width: "100%", padding: 11, marginTop: 18, borderRadius: 8, border: "1px solid #ccc" }} />
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" style={{ width: "100%", padding: 11, marginTop: 10, borderRadius: 8, border: "1px solid #ccc" }} />
            <button onClick={handleStep1} style={{ width: "100%", padding: 12, marginTop: 14, background: "black", color: "white", borderRadius: 8, border: "none", fontWeight: 600 }}>Continue</button>
          </>
        ) : (
          <>
            <p style={{ fontSize: 13, marginTop: 18 }}>Enter 2FA Code</p>
            <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" style={{ width: "100%", padding: 11, marginTop: 8, borderRadius: 8, border: "1px solid #ccc", textAlign: "center", letterSpacing: 4 }} />
            <button onClick={handleStep2} style={{ width: "100%", padding: 12, marginTop: 14, background: "#16a34a", color: "white", borderRadius: 8, border: "none", fontWeight: 600 }}>Verify & Login</button>
            <p style={{ fontSize: 11, color: "#16a34a", textAlign: "center", marginTop: 10 }}>Demo OTP: 123456</p>
            <button onClick={() => setStep(1)} style={{ width: "100%", padding: 8, marginTop: 6, background: "white", border: "none", color: "#666", fontSize: 12 }}>Back</button>
          </>
        )}
      </div>
    </div>
  );
}
