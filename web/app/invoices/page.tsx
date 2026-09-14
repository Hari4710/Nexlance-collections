"use client"
import { useState, useEffect } from "react"

export default function Invoices(){
  const [invoices, setInvoices] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [clientName, setClientName] = useState("")
  const [amount, setAmount] = useState("")

  useEffect(()=>{
    const c = localStorage.getItem("nexlance_clients")
    if(c) setClients(JSON.parse(c).filter((x:any)=>!x.archived))
    const inv = localStorage.getItem("nexlance_invoices")
    if(inv) setInvoices(JSON.parse(inv))
  },[])

  const addInvoice = () => {
    if(!clientName || !amount) return alert("Client & Amount pettu bro")
    const newInv = { id: Date.now(), client: clientName, amount: Number(amount), date: new Date().toISOString(), status:"Unpaid" }
    const updated = [...invoices, newInv]
    setInvoices(updated)
    localStorage.setItem("nexlance_invoices", JSON.stringify(updated))
    setAmount("")
    alert("Invoice Added - Append Only ✅")
  }

  return(
    <div style={{padding:20, fontFamily:"sans-serif"}}>
      <h1>Invoices - Append Only</h1>
      <p>Once created, never deleted/edited. Only Payment can close it.</p>
      
      <div style={{border:"1px solid #ccc", padding:15, marginBottom:20}}>
        <h3>+ New Invoice</h3>
        <select value={clientName} onChange={e=>setClientName(e.target.value)} style={{padding:8,width:"100%",marginBottom:10}}>
          <option value="">Select Client</option>
          {clients.map((c:any)=><option key={c.id} value={c.name}>{c.name}</option>)}
        </select><br/>
        <input placeholder="Amount (eg: 50000)" value={amount} onChange={e=>setAmount(e.target.value)} type="number" style={{padding:8,width:"100%",marginBottom:10}}/><br/>
        <button onClick={addInvoice} style={{padding:"10px 20px", background:"black", color:"white"}}>Add Invoice</button>
      </div>

      <h3>Invoice List ({invoices.length})</h3>
      {invoices.map(inv=>(
        <div key={inv.id} style={{border:"1px solid #ddd", padding:10, marginBottom:8}}>
          <b>{inv.client}</b> - Rs.{inv.amount}<br/>
          <small>{new Date(inv.date).toLocaleDateString()} - {inv.status}</small>
        </div>
      ))}
    </div>
  )
}
