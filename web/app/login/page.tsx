"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage(){
  const [step,setStep]=useState(1);
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [otp,setOtp]=useState("");
  const router=useRouter();

  return(
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f1f5f9" }}>
      <div style={{ background:"white", padding:32, borderRadius:24, width:380, border:"1px solid #e2e8f0" }}>
        {/* EXACT INFINITY - NO BREAK - SAME COLOUR */}
        <div style={{ width:140, height:80, background:"white", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18 }}>
          <svg viewBox="0 0 120 70" width="130" height="75">
            <defs>
              <linearGradient id="gc" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFCC00"/><stop offset="25%" stopColor="#2EB7E8"/><stop offset="50%" stopColor="#7B5CFF"/><stop offset="70%" stopColor="#E8489C"/><stop offset="100%" stopColor="#FF8A3D"/>
              </linearGradient>
            </defs>
            {/* Upper colourful continuous line - NO BREAK */}
            <path d="M 5 38 C 5 20 18 8 32 10 C 42 11 52 18 62 26 C 72 34 84 43 94 44 C 102 45 106 37 104 30 C 103 27 100 24 96 23" stroke="url(#gc)" strokeWidth="6" fill="none" strokeLinecap="round"/>
            {/* Arrow - continuous from loop */}
            <path d="M 61 27 L 94 2 L 81 9 L 86 7 L 61 27" fill="#2B1E6E" stroke="#2B1E6E" strokeWidth="1"/>
            <path d="M 61 27 L 94 2" stroke="url(#gc)" strokeWidth="6" strokeLinecap="round"/>
            {/* Lower dark loops */}
            <path d="M 9 38 C 14 33 22 32 32 36 C 46 42 60 53 74 58 C 88 63 100 62 107 51" stroke="#2B1E6E" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <path d="M 12 50 C 18 56 28 60 38 58 C 48 56 54 48 51 40" stroke="#2B1E6E" strokeWidth="6" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        <h2 style={{ margin:0, fontWeight:800, fontSize:22 }}>Nexlance Collections</h2>
        <p style={{ color:"#64748b", fontSize:13, marginBottom:20 }}>MFA Protected Login</p>

        {step===1 ? <>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Username" style={{ width:"100%", padding:12, borderRadius:10, border:"1px solid #cbd5e1" }}/>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" style={{ width:"100%", padding:12, borderRadius:10, border:"1px solid #cbd5e1", marginTop:10 }}/>
          <button onClick={()=>setStep(2)} style={{ width:"100%", padding:13, marginTop:16, background:"black", color:"white", borderRadius:10, border:"none", fontWeight:700 }}>Continue</button>
        </>: <>
          <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="123456" style={{ width:"100%", padding:12, borderRadius:10, border:"1px solid #cbd5e1", textAlign:"center", letterSpacing:5 }}/>
          <button onClick={()=>{ if(otp==="123456"){ localStorage.setItem("nexlance_logged","true"); router.push("/"); } }} style={{ width:"100%", padding:13, marginTop:14, background:"#16a34a", color:"white", borderRadius:10, border:"none", fontWeight:700 }}>Verify & Login</button>
          <button onClick={()=>setStep(1)} style={{ width:"100%", marginTop:8, background:"none", border:"none", color:"#666" }}>← Back</button>
        </>}
      </div>
    </div>
  );
}
