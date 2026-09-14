"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleFirst = () => {
    if (!email || !pass) return alert("Username & Password pettu");
    // Demo login - emaina pettina ok
    setStep(2);
  };

  const handleSecond = () => {
    if (otp === "123456") {
      localStorage.setItem("nexlance_logged", "true");
      router.push("/");
    } else {
      alert("Wrong 2FA! Demo OTP: 123456");
    }
  };

  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5', fontFamily: 'sans-serif'}}>
      <div style={{background: 'white', padding: 32, borderRadius: 16, width: 360, border: '1px solid #ddd', boxShadow: '0 4px 20px rgba(0,0,0,0.05)'}}>
        <h2 style={{margin: 0}}>Nexlance Login</h2>
        <p style={{color: '#666', fontSize: 13, marginTop: 4}}>MFA Protected System</p>

        {step === 1 ? (
          <>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Username / Email" style={{width: '100%', padding: 11, marginTop: 18, borderRadius: 8, border: '1px solid #ccc'}} />
            <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" style={{width: '100%', padding: 11, marginTop: 10, borderRadius: 8, border: '1px solid #ccc'}} />
            <button onClick={handleFirst} style={{width: '100%', padding: 12, marginTop: 14, background: 'black', color: 'white', borderRadius: 8, border: 'none', fontWeight: '600'}}>Next - Verify 2FA</button>
            <p style={{fontSize: 11, color: '#999', marginTop: 10}}>Demo: any username/pass work</p>
          </>
        ) : (
          <>
            <p style={{fontSize: 13, marginTop: 18, color: '#333'}}>2FA Code sent to {email}</p>
            <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="Enter 2FA Code" style={{width: '100%', padding: 11, marginTop: 10, borderRadius: 8, border: '1px solid #ccc', letterSpacing: 4, textAlign: 'center'}} />
            <button onClick={handleSecond} style={{width: '100%', padding: 12, marginTop: 14, background: '#16a34a', color: 'white', borderRadius: 8, border: 'none', fontWeight: '600'}}>Verify & Login</button>
            <p style={{fontSize: 11, color: '#16a34a', marginTop: 10, textAlign: 'center'}}>Demo OTP: 123456</p>
            <button onClick={()=>setStep(1)} style={{width: '100%', padding: 8, marginTop: 8, background: 'white', color: '#666', border: 'none', fontSize: 12}}>Back</button>
          </>
        )}
      </div>
    </div>
  );
}
