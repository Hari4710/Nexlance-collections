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
    } else alert("Wrong OTP - 123456");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9", padding: 16 }}>
      <div style={{ background: "white", padding: 32, borderRadius: 24, width: 400, border: "1px solid #e2e8f0" }}>
        
        {/* ===== EXACT INFINITY LOGO - SAME COLOUR - NO IMAGE NEEDED ===== */}
        <div style={{ width: 140, height: 70, background: "black", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <svg width="110" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="exactGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#FFCC00" />
                <stop offset="18%" stopColor="#3BC2E0" />
                <stop offset="32%" stopColor="#5A7CFF" />
                <stop offset="52%" stopColor="#A855F7" />
                <stop offset="70%" stopColor="#EC4899" />
                <stop offset="88%" stopColor="#FF8A3D" />
              </linearGradient>
            </defs>
            {/* Main colorful infinity + arrow */}
            <path d="M 6 27.5 C 6 16 18 6.5 30 9.5 C 38 11.5 46 18 52 25 C 58 32 68 42 80 42 C 92 42 96 32 94 25.5 C 93 21 88 17 82 16.5 C 82 16.5 84 18.5 86 19.5 C 90 21 92 24 92 28 C 92 34 87 38.5 80 38.5 C 70 38.5 60 30 54 24 C 48 18 36 8 24 6.5 C 12 5 3 14 3 25.5 C 3 36 13 45.5 26 44" stroke="url(#exactGrad)" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Dark purple under loops - exact as 2nd pic */}
            <path d="M 12 28.5 C 16 25 24 24 32 27.5 C 44 34 58 46 70 51.5 C 82 57 96 56 104 44 C 98 50 88 54 78 53 C 66 52 52 42 42 34 C 32 26 22 22 12 28.5 Z" fill="#2D1F6F" />
            <path d="M 52 24 L 82 0 L 68 7 L 75 4.5 L 51 27.5 Z" fill="#2D1F6F" />
          </svg>
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
