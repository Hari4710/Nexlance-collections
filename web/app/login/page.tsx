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
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f1f5f9" }}>
      <div style={{ background:"white", padding:32, borderRadius:24, width:380, border:"1px solid #e2e8f0" }}>
        
        {/* EXACT SAME LOGO - NO BREAK - SAME COLOURS */}
        <div style={{ width:140, height:70, background:"white", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, border:"1px solid #f1f5f9" }}>
          <svg viewBox="0 0 120 60" width="120" height="60">
            <defs>
              <linearGradient id="g" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#FFCC00"/><stop offset="20%" stopColor="#2EB7E8"/><stop offset="40%" stopColor="#7A7AFF"/><stop offset="60%" stopColor="#C44FFF"/><stop offset="75%" stopColor="#FF4DB5"/><stop offset="100%" stopColor="#FF8C3C"/>
              </linearGradient>
            </defs>
            <path d="M 4 32 C 4 18 15 6 29 7.5 C 36 8.5 43 14 50 21 C 57 28 67 37 78 38.5 C 89 40 96 31 94 23.5 C 93 20 90 17 86 16" stroke="url(#g)" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d="M 86 16 C 86 16 89 18 91 20 C 94 23 95 27 92 31 C 89 36 81 39 73 37 C 64 34.5 55 27 47 19 C 39 11 27 4 17 7" stroke="url(#g)" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d="M 17 7 C 7 11 3 21 5 30 C 7 38 15 46 26 47.5 C 36 49 47 44 51 36" stroke="#2B1E6E" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d="M 11 26 C 15 23 22 23 30 26 C 43 32.5 56 44 70 49 C 84 54 97 52 105 41 C 99 47 90 50 81 49.5 C 68 48.5 54 39 43 30" stroke="#2B1E6E" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d="M 63 28 L 97 3 L 84 8 L 89 6.5 L 61 31 Z" fill="#2B1E6E"/>
          </svg>
        </div>

        <h2 style={{ margin:0, fontWeight:800, fontSize:22 }}>Nexlance Collections</h2>
        <p style={{ color:"#64748b", fontSize:13, marginBottom:20 }}>MFA Protected Login</p>

        {step===1 ? <>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Username" style={{ width:"100%", padding:12, borderRadius:10, border:"1px solid #cbd5e1" }}/>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={{ width:"100%", padding:12, borderRadius:10, border:"1px solid #cbd5e1", marginTop:10 }}/>
          <button onClick={()=>{ if(email&&pass) setStep(2); }} style={{ width:"100%", padding:13, marginTop:16, background:"black", color:"white", borderRadius:10, border:"none", fontWeight:700 }}>Continue</button>
        </>: <>
          <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="123456" style={{ width:"100%", padding:12, borderRadius:10, border:"1px solid #cbd5e1", textAlign:"center", letterSpacing:5 }}/>
          <button onClick={()=>{ if(otp==="123456"){ localStorage.setItem("nexlance_logged","true"); router.push("/"); } }} style={{ width:"100%", padding:13, marginTop:14, background:"#16a34a", color:"white", borderRadius:10, border:"none", fontWeight:700 }}>Verify & Login</button>
          <button onClick={()=>setStep(1)} style={{ width:"100%", marginTop:8, background:"none", border:"none", color:"#666" }}>← Back</button>
        </>}
      </div>
    </div>
  );
}
