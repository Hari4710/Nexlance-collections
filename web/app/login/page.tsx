"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleStep1 = () => { if(!email||!pass) return alert("Enter details"); setStep(2); }
  const handleStep2 = () => { if(otp==="123456"){ localStorage.setItem("nexlance_logged","true"); router.push("/"); } else alert("Use 123456"); }

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f1f5f9" }}>
      <div style={{ background:"white", padding:32, borderRadius:24, width:380, border:"1px solid #e2e8f0" }}>
        
        {/* === FINAL UNBROKEN INFINITY COLOUR LOGO === */}
        <div style={{ width:150, height:75, background:"black", borderRadius:18, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:22, overflow:"hidden" }}>
          <img src="/logo.png" alt="Logo" style={{ width:"90%", height:"90%", objectFit:"contain" }} />
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
