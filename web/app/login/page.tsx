"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleStep1 = () => { if(!email || !pass) return alert("Enter details"); setStep(2); }
  const handleStep2 = () => { if(otp==="123456"){ localStorage.setItem("nexlance_logged","true"); router.push("/"); } else alert("Use 123456"); }

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f1f5f9" }}>
      <div style={{ background:"white", padding:32, borderRadius:24, width:380, border:"1px solid #e2e8f0" }}>
        
        {/* === EXACT INFINITY COLOUR LOGO - BLACK BG === */}
        <div style={{ width:145, height:72, background:"black", borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:22 }}>
          <svg width="115" height="55" viewBox="0 0 100 48" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="infGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#FFCC00"/>
                <stop offset="22%" stopColor="#3BC6E8"/>
                <stop offset="42%" stopColor="#6B8AFF"/>
                <stop offset="62%" stopColor="#B24CFF"/>
                <stop offset="78%" stopColor="#FF4D9A"/>
                <stop offset="100%" stopColor="#FF8A3D"/>
              </linearGradient>
            </defs>
            {/* Coloured infinity line */}
            <path d="M 5 24 Q 5 7 27 7 Q 38 7 49 18 Q 60 29 73 34 Q 87 39 93 29 Q 96 23 91 18 Q 88 15 84 15 Q 84 15 86 18 Q 91 20 92 25 Q 93 32 84 35 Q 75 38 63 32 Q 52 26 42 16 Q 31 5 19 5 Q 3 5 3 20 Q 3 33 16 38" stroke="url(#infGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
            {/* Dark purple bottom loops - exact like your pic */}
            <path d="M 12 27 C 16 23.5 23 23 31 26.5 C 45 33.5 60 46 73 50 C 86 54 97 51 103 40 C 97 47 88 51 78 50.5 C 66 50 52 41 40 32 C 28 23 18 21 12 27 Z" fill="#2D1E6B"/>
            <path d="M 52.5 22 L 82 0 L 68.5 6.5 L 73.5 5 L 50 25 Z" fill="#2D1E6B"/>
          </svg>
        </div>

        <h2 style={{ margin:0, fontSize:22, fontWeight:800 }}>Nexlance Collections</h2>
        <p style={{ color:"#64748b", fontSize:13, marginTop:4, marginBottom:20 }}>MFA Protected Login</p>

        {step===1 ? <>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Username / Email" style={{ width:"100%", padding:12, borderRadius:10, border:"1px solid #cbd5e1" }}/>
          <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" style={{ width:"100%", padding:12, borderRadius:10, border:"1px solid #cbd5e1", marginTop:10 }}/>
          <button onClick={handleStep1} style={{ width:"100%", padding:13, marginTop:16, background:"black", color:"white", borderRadius:10, border:"none", fontWeight:700 }}>Continue</button>
        </>: <>
          <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="123456" style={{ width:"100%", padding:12, borderRadius:10, border:"1px solid #cbd5e1", textAlign:"center", letterSpacing:5, marginTop:10 }}/>
          <button onClick={handleStep2} style={{ width:"100%", padding:13, marginTop:14, background:"#16a34a", color:"white", borderRadius:10, border:"none", fontWeight:700 }}>Verify & Login</button>
          <button onClick={()=>setStep(1)} style={{ width:"100%", marginTop:8, background:"transparent", border:"none", color:"#666", fontSize:12 }}>← Back</button>
        </>}
      </div>
    </div>
  );
}
