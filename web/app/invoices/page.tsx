"use client"
import { useState, useEffect } from "react"

exportimport { supabase } from "../../lib/supabase"
 
default function Invoices(){
 const [clients,setClients]=useState<any[]>([])
 const [invoices,setInvoices]=useState<any[]>([])
 const [cName,setCName]=useState("")
 const [amount,setAmount]=useState("")
 const [due,setDue]=useState("")
 useEffect(()=>{
  supabase.from("clients").select("*").then(r=>{ if(r.data) setClients(r.data) })
  supabase.from("invoices").select("*, clients(name)").order("created_at",{ascending:false}).then(r=>{ if(r.data) setInvoices(r.data) })
 },[])
 const addInvoice = async()=>{
  if(!cName ||!amount) return alert("Client & Amount pettu")
  const cl = clients.find(c=>c.name===cName)
  if(!cl) return alert("Client ledu")
  const amt = Number(amount)
  const gst = amt*0.18
  const total = amt+gst
  const invNo = "INV-"+Date.now().toString().slice(-6)
  const {error}=await supabase.from("invoices").insert({client_id:cl.id, invoice_no:invNo, amount:amt, gst_amount:gst, total_amount:total, due_date: due || new Date().toISOString().split('T')[0], status:'pending'})
  if(error) alert(error.message)
  else { alert("Done "+invNo); setAmount(""); window.location.reload() }
 }
 return(
  <div style={{padding:20}}>
   <h1>Invoices - GST 18% - Supabase</h1>
   <div style={{border:"1px solid #ccc", padding:15, marginTop:10}}>
     <select value={cName} onChange={e=>setCName(e.target.value)} style={{padding:8,width:"100%",marginBottom:10}}>
       <option value="">Select Client</option>
       {clients.map((c:any)=><option key={c.id} value={c.name}>{c.name}</option>)}
     </select>
     <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} type="number" style={{padding:8,width:"100%",marginBottom:10}}/>
     <input type="date" value={due} onChange={e=>setDue(e.target.value)} style={{padding:8,width:"100%",marginBottom:10}}/>
     <button onClick={addInvoice} style={{padding:"10px 20px", background:"black", color:"white"}}>Add Invoice</button>
   </div>
   <h3>List ({invoices.length})</h3>
   {invoices.map((inv:any)=><div key={inv.id} style={{border:"1px solid #ddd", padding:10, marginBottom:5}}><b>{inv.invoice_no}</b> - {inv.clients?.name} - Rs.{inv.total_amount} <br/><small>GST: {inv.gst_amount} | {inv.status}</small></div>)}
  </div>
 )
}
