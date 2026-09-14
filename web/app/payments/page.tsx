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

  const addPayment=async()=>{
    if(!invoiceId) return alert('Please select invoice')
    if(!amount) return alert('Please enter amount')
    const selected = invoices.find(i=>i.id===invoiceId)
    const paidSoFar = payments.filter(p=>p.invoice_id===invoiceId).reduce((s,p)=>s+Number(p.amount),0)
    if(selected && (paidSoFar + Number(amount) > Number(selected.amount))){
      return alert(`Overpayment! Remaining balance is Rs ${selected.amount - paidSoFar}`)
    }
    const {error}=await supabase.from('payments').insert({ invoice_id: invoiceId, amount: Number(amount), payment_date: new Date().toISOString().split('T')[0] })
    if(error) alert(error.message)
    else { alert('Payment added'); setAmount(''); setInvoiceId(''); load() }
  }

  return(
    <div style={{padding:20, maxWidth:650, margin:'0 auto', fontFamily:'sans-serif'}}>
      <h2>Payments - Append Only</h2>
      <p style={{color:'#666', fontSize:14}}>Partial payments allowed. Overpayment blocked.</p>

      <div style={{border:'1px solid #ccc', padding:16, borderRadius:8, marginTop:16}}>
        <h3 style={{margin:0}}>Add New Payment</h3>
        <select value={invoiceId} onChange={e=>setInvoiceId(e.target.value)} style={{width:'100%', padding:12, marginTop:12}}>
          <option value="">Select Invoice</option>
          {invoices.map((inv:any)=>{
            const paid=payments.filter(p=>p.invoice_id===inv.id).reduce((s,p)=>s+Number(p.amount),0)
            const bal=Number(inv.amount)-paid
            return <option key={inv.id} value={inv.id}>{inv.clients?.client_name} - {inv.invoice_no} - Balance Rs {bal}</option>
          })}
        </select>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Enter amount" type="number" style={{width:'100%', padding:12, marginTop:10}} />
        <button onClick={addPayment} style={{width:'100%', padding:13, background:'black', color:'white', marginTop:10, border:'none', borderRadius:6}}>Add Payment</button>
      </div>

      <h3 style={{marginTop:24}}>Payment History ({payments.length})</h3>
      {payments.map((p:any)=>(
        <div key={p.id} style={{padding:12, marginTop:8, background:'#e8ffe8', borderRadius:6, display:'flex', justifyContent:'space-between'}}>
          <span><b>{p.invoices?.clients?.client_name}</b><br/><small>{p.invoices?.invoice_no} - {p.payment_date}</small></span>
          <b style={{color:'green'}}>Rs {p.amount}</b>
        </div>
      ))}

      <h3 style={{marginTop:24}}>Invoice Status</h3>
      {invoices.map((inv:any)=>{
        const paid=payments.filter(p=>p.invoice_id===inv.id).reduce((s,p)=>s+Number(p.amount),0)
        const bal=Number(inv.amount)-paid
        return(
          <div key={inv.id} style={{border:'1px solid #eee', padding:12, marginTop:8, borderRadius:6}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <span><b>{inv.clients?.client_name}</b><br/><small>{inv.invoice_no} - Total Rs {inv.amount} - Paid Rs {paid}</small></span>
              <span style={{fontWeight:'bold', color: bal===0 ? 'green' : 'red'}}>{bal===0 ? 'PAID' : `Balance Rs ${bal}`}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
