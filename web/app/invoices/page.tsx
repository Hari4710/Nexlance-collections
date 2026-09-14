'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Page(){
  const [clients,setClients]=useState<any[]>([])
  const [invoices,setInvoices]=useState<any[]>([])
  const [clientId,setClientId]=useState('')
  const [amount,setAmount]=useState('')

  const load=async()=>{
    const {data:c}=await supabase.from('clients').select('*')
    if(c) setClients(c)
    const {data:i}=await supabase.from('invoices').select('*, clients(client_name)').order('created_at',{ascending:false})
    if(i) setInvoices(i)
  }
  useEffect(()=>{load()},[])

  const add=async()=>{
    if(!clientId) return alert('Client select chey')
    if(!amount) return alert('Amount pettu')
    const invNo='INV-'+Date.now().toString().slice(-6)
    const n=Number(amount)
    const today = new Date().toISOString().split('T')[0]
    const due = new Date(Date.now()+30*24*60*60*1000).toISOString().split('T')[0] // 30 days tarvata

    const {error}=await supabase.from('invoices').insert({
      client_id: clientId,
      invoice_no: invNo,
      amount: n,
      total_amount: n,
      gst_amount: 0,
      status: 'pending',
      invoice_date: today,
      due_date: due
    })
    if(error) alert('ERROR: '+error.message)
    else{ alert('SUCCESS '+invNo); setAmount(''); setClientId(''); load() }
  }

  return(
    <div style={{padding:20}}>
      <h2>Invoices - System of Record</h2>
      <div style={{border:'1px solid #ccc', padding:15, marginTop:10}}>
        <h3>+ New Invoice</h3>
        <select value={clientId} onChange={e=>setClientId(e.target.value)} style={{width:'100%',padding:12}}>
          <option value="">Select Client</option>
          {clients.map((c:any)=><option key={c.id} value={c.id}>{c.client_name}</option>)}
        </select>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="65000" type="number" style={{width:'100%',padding:12,marginTop:10}} />
        <button onClick={add} style={{width:'100%',padding:12,background:'black',color:'white',marginTop:10}}>Add Invoice</button>
      </div>
      <h3>Invoices ({invoices.length})</h3>
      {invoices.map((x:any)=><div key={x.id} style={{border:'1px solid #eee',padding:10,marginTop:5}}>{x.invoice_no} - Rs {x.amount}</div>)}
    </div>
  )
}
