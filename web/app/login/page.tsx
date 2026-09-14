"use client"
import { useState } from "react"
export default function Login(){
  const [uid, setUid] = useState("")
  const [pwd, setPwd] = useState("")
  const [tfa, setTfa] = useState("")
  const doLogin = () => {
    const u = uid.trim().toLowerCase()
    const p = pwd.trim().toLowerCase()
    const t = tfa.trim()
    // Debug - em type chesamo chupistundi
    if(u.includes("auditor") && p.includes("admin123") && t.includes("123456")){
      alert("Login Success! Sec 6 Done ✅")
      localStorage.setItem("nexlance_auth","true")
      window.location.href = "/"
    } else {
      alert(`FAIL - You typed:\nID=[${u}] len=${u.length}\nPass=[${p}] len=${p.length}\n2FA=[${t}]\n\nCorrect is auditor / admin123 / 123456`)
    }
  }
  return(
    <div style={{padding:30, fontFamily:"sans-serif"}}>
      <h2>Nexlance Login - Sec 6</h2>
      <p>No Google Login</p>
      <input placeholder="User ID" value={uid} onChange={e=>setUid(e.target.value)} style={{width:"100%",padding:10,marginBottom:10}} />
      <input placeholder="Password" value={pwd} onChange={e=>setPwd(e.target.value)} style={{width:"100%",padding:10,marginBottom:10}} />
      <input placeholder="2FA" value={tfa} onChange={e=>setTfa(e.target.value)} style={{width:"100%",padding:10,marginBottom:10}} />
      <button onClick={doLogin} style={{padding:"12px 20px",background:"black",color:"white"}}>Login</button>
    </div>
  )
}
