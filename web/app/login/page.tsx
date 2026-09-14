"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  const doLogin = () => {
    if (email && pass) {
      localStorage.setItem("nexlance_logged", "true");
      router.push("/");
    } else {
      alert("Email & Password enter chey");
    }
  };

  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc'}}>
      <div style={{background: 'white', padding: 30, borderRadius: 16, border: '1px solid #ddd', width: 360}}>
        <h2 style={{margin: 0}}>Login - Nexlance</h2>
        <p style={{color: '#666', fontSize: 13}}>MFA Protected</p>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width: '100%', padding: 10, marginTop: 15, borderRadius: 8, border: '1px solid #ccc'}} />
        <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" style={{width: '100%', padding: 10, marginTop: 10, borderRadius: 8, border: '1px solid #ccc'}} />
        <button onClick={doLogin} style={{width: '100%', padding: 12, marginTop: 15, background: 'black', color: 'white', borderRadius: 8, border: 'none'}}>Login</button>
      </div>
    </div>
  );
}
