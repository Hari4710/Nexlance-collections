'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Page(){
  const [invoices,setInvoices]=useState<any[]>([])
  const [payments,setPayments]=useState<any[]>([])
  const [invoiceId,setInvoiceId]=useState('')
  const [amount,setAmount]=useState('')

  const load=async()=>{
    const {data:inv}=await supabase.from('invoices').select('*, clients(client_name)').order('created_at',{ascending:false})
    if(inv) setInvoices(inv)
    const {data:pay}=await supabase.from('payments').select('*, invoices(*, clients(client_name))').order('created_at',{ascending:false})
    if(pay) setPayments(pay)
  }
  useEffect(()=>{load()},[])

  const add=async()=>{
    if(!invoiceId) return alert('Invoice select chey bro')
    if(!amount) return alert('Amount pettu')
    const selected = invoices.find(i=>i.id===invoiceId)
    const paidSoFar = payments.filter(p=>p.invoice_id===invoiceId).reduce((s,p)=>s+Number(p.amount),0)
    const newTotal = paidSoFar + Number(amount)
    if(selected && newTotal > Number(selected.amount)){
      return alert(`Overpayment Blocked! Total Rs ${selected.amount} - Paid Rs ${paidSoFar} - Balance Rs ${selected.amount - paidSoFar}`)
    }
    const {error}=await supabase.from('payments').insert({
      invoice_id: invoiceId,
      amount: Number(amount),
      payment_date: new Date().toISOString().split('T')[0]
    })
    if(error) alert('ERROR: '+error.message)
    else{ alert('Payment Added Success!'); setAmount(''); setInvoiceId(''); load() }
  }

  return(
    <div style={{padding:20, maxWidth:600, margin:'0 auto', fontFamily:'sans-serif'}}>
      <h2>Payments - Append Only</h2>
      <p style={{color:'#555'}}>Partial payments allowed. Overpayment blocked.</p>
      <div style={{border:'1px solid #ccc', padding:15, marginTop:15, borderRadius:8}}>
        <h3>+ New Payment</h3>
        <select value={invoiceId} onChange={e=>setInvoiceId(e.target.value)} style={{width:'100%',padding:12, marginTop:8}}>
          <option value="">Select Invoice</option>
          {invoices.map((inv:any)=><option key={inv.id} value={inv.id}>{inv.clients?.client_name} - {inv.invoice_no} - Rs {inv.amount}</option>)}
        </select>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Pay Amount" type="number" style={{width:'100%',padding:12,marginTop:10}} />
        <button onClick={add} style={{padding:12,background:'black',color:'white',marginTop:10, border:'none', minWidth:140}}>Add Payment</button>
      </div>
      <h3 style={{marginTop:20}}>Payment History ({payments.length})</h3>
      {payments.length===0 && <p style={{color:'#888'}}>No payments yet.</p>}
      {payments.map((p:any)=><div key={p.id} style={{border:'1px solid #eee',padding:12, marginTop:8, display:'flex', justifyContent:'space-between', background:'#fafafa'}}><span><b>{p.invoices?.clients?.client_name}</b> - {p.invoices?.invoice_no}</span><span><b>Rs {p.amount}</b></span></div>)}
      <h3 style={{marginTop:25}}>Invoice Status</h3>
      {invoices.map((inv:any)=>{const paid=payments.filter(pp=>pp.invoice_id===inv.id).reduce((s,pp)=>s+Number(pp.amount),0); const bal=Number(inv.amount)-paid; return(<div key={inv.id} style={{border:'1px solid #eee',padding:12, marginTop:8, background: bal===0 ? '#e6ffec' : '#fff'}}><div style={{display:'flex', justifyContent:'space-between'}}><b>{inv.clients?.client_name}</b><span style={{color: bal===0 ? 'green' : 'red', fontWeight:'bold'}}>{bal===0 ? 'PAID' : `Balance Rs ${bal}`}</span></div><div style={{fontSize:13, color:'#666', marginTop:4}}>{inv.invoice_no} - Total Rs {inv.amount} - Paid Rs {paid}</div></div>)})}
    </div>
  )
}
