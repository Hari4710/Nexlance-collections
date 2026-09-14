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
    const {data:c}=await supabase.from('clients').select('*').order('client_name')
    if(c) setClients(c)
    const {data:i}=await supabase.from('invoices').select('*, clients(client_name)').order('created_at',{ascending:false})
    if(i) setInvoices(i)
  }
  useEffect(()=>{load()},[])

  const add=async()=>{
    if(!clientId) return alert('Client select chey bro')
    if(!amount) return alert('Amount pettu')
    const invNo='INV-'+Date.now().toString().slice(-6)
    const n=Number(amount)
    const due = new Date(Date.now()+30*24*60*60*1000).toISOString().split('T')[0]

    const {error}=await supabase.from('invoices').insert({
      client_id: clientId,
      invoice_no: invNo,
      amount: n,
      total_amount: n,
      gst_amount: 0,
      status: 'pending',
      due_date: due
    })
    if(error) alert('ERROR: '+error.message)
    else{ alert('SUCCESS '+invNo); setAmount(''); setClientId(''); load() }
  }

  return(
    <div style={{padding:20, maxWidth:600, margin:'0 auto'}}>
      <h2 style={{fontWeight:'bold'}}>Invoices - System of Record</h2>

      <div style={{border:'1px solid #ccc', padding:15, marginTop:15, borderRadius:8}}>
        <h3>+ New Invoice</h3>
        <select value={clientId} onChange={e=>setClientId(e.target.value)} style={{width:'100%',padding:12, marginTop:8}}>
          <option value="">Select Client</option>
          {clients.map((c:any)=><option key={c.id} value={c.id}>{c.client_name}</option>)}
        </select>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="65000" type="number" style={{width:'100%',padding:12,marginTop:10, boxSizing:'border-box'}} />
        <button onClick={add} style={{width:'100%',padding:12,background:'black',color:'white',marginTop:10, border:'none', borderRadius:5}}>Add Invoice</button>
      </div>

      <h3 style={{marginTop:20}}>Invoices ({invoices.length})</h3>
      <div style={{display:'flex', flexDirection:'column', gap:8, marginTop:10}}>
        {invoices.map((x:any)=>
          <div key={x.id} style={{border:'1px solid #eee',padding:12, borderRadius:6, display:'flex', justifyContent:'space-between', background:'#fafafa'}}>
            <span><b style={{color:'#000'}}>{x.clients?.client_name || 'Unknown Client'}</b> <span style={{color:'#666', fontSize:13}}> - {x.invoice_no}</span></span>
            <span style={{fontWeight:'bold'}}>Rs {x.amount}</span>
          </div>
        )}
        {invoices.length===0 && <p style={{color:'#888'}}>No invoices yet</p>}
      </div>
    </div>
  )
}
