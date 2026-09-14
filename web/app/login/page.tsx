"use client"
import { useState } from "react"

export default function Login(){
  const [uid, setUid] = useState("")
  const [pwd, setPwd] = useState("")
  const [tfa, setTfa] = useState("")

  const doLogin = () => {
    // Demo credentials - nuvvu marchukovachu
    if(uid === "auditor" && pwd === "admin123" && tfa === "123456"){
      localStorage.setItem("nexlance_auth","true")
      alert("Login Success!")
      window.location.href = "/"
    } else {
      alert("Wrong ID/Pass/2FA. Try: auditor / admin123 / 123456")
    }
  }

  return(
    <div style={{padding:20, fontFamily:"sans-serif"}}>
      <h2>Nexlance Login - Sec 6</h2>
      <p>No Google Login</p>
      <input placeholder="User ID" value={uid} onChange={e=>setUid(e.target.value)} /><br/><br/>
      <input type="password" placeholder="Password" value={pwd} onChange={e=>setPwd(e.target.value)} /><br/><br/>
      <input placeholder="2FA" value={tfa} onChange={e=>setTfa(e.target.value)} /><br/><br/>
      <button onClick={doLogin} style={{padding:"8px 16px"}}>Login</button>
      <p style={{marginTop:20, fontSize:12, color:"gray"}}>Demo: auditor / admin123 / 123456</p>
    </div>
  )
}
