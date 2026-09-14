"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function Invoices(){
 const [clients,setClients]=useState<any[]>([])
 const [invoices,setInvoices]=useState<any[]>([])
 const [cName,setCName]=useState("")
 const [amount,setAmount]=useState("")
 const [due,setDue]=useState("")

 useEffect(()=>{
  supabase.from("clients").select("*").then(r=>{ if(r.data) setClients(r.data) })
  loadInv()
 },[])

 const loadInv = async()=>{
  const {data} = await supabase.from("invoices").select("*, clients(name)").order("created_at",{ascending:false})
  if(data) setInvoices(data)
 }

 const addInvoice = async()=>{
  if(!cName ||!amount) return alert("Client & Amount pettu bro")
  const selectedClient = clients.find(c=>c.name===cName)
  if(!selectedClient) return alert("Client select chey bro")

  const amt = Number(amount)
  const gst = amt * 0.18
  const total = amt + gst
  const invNo = "INV-"+Date.now().toString().slice(-6)

  const {error} = await supabase.from("invoices").insert({
    client_id: selectedClient.id,
    invoice_no: invNo,
    amount: amt,
    gst_amount: gst,
    total_amount: total,
    due_date: due || new Date().toISOString().split('T')[0],
    status: 'pending'
  })
  if(error) alert(error.message)
  else { alert("Invoice Added - "+invNo+" ✅ GST 18% = Rs."+gst); setAmount(""); loadInv() }
 }

 return(
  <div style={{padding:20, fontFamily:"sans-serif"}}>
   <h1>Invoices - Append Only + GST 18%</h1>
   <p>Supabase tho connect - Once created, never deleted. Only Payment can close it.</p>

   <div style={{border:"1px solid #ccc", padding:15, marginBottom:20, marginTop:15}}>
     <h3>New Invoice</h3>
     <select value={cName} onChange={e=>setCName(e.target.value)} style={{padding:8,width:"100%",marginBottom:10}}>
       <option value="">Select Client</option>
       {clients.map((c:any)=><option key={c.id} value={c.name}>{c.name}</option>)}
     </select><br/>
     <input placeholder="Amount (eg: 50000)" value={amount} onChange={e=>setAmount(e.target.value)} type="number" style={{padding:8,width:"100%",marginBottom:10, border:"1px solid #ccc"}}/><br/>
     <input type="date" value={due} onChange={e=>setDue(e.target.value)} style={{padding:8,width:"100%",marginBottom:10, border:"1px solid #ccc"}}/><br/>
     <button onClick={addInvoice} style={{padding:"10px 20px", background:"black", color:"white", border:"none", cursor:"pointer"}}>Add Invoice + GST</button>
   </div>

   <h3>Invoice List ({invoices.length})</h3>
   {invoices.map((inv:any)=>(
    <div key={inv.id} style={{border:"1px solid #ddd", padding:10, marginBottom:8}}>
     <b>{inv.invoice_no}</b> - {inv.clients?.name} - Rs.{inv.total_amount} (Base: {inv.amount} + GST: {inv.gst_amount})<br/>
     <small>{new Date(inv.created_at).toLocaleDateString()} - {inv.status} - Due: {inv.due_date}</small>
    </div>
   ))}
  </div>
 )
}
