'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AgingReport(){
  const [invoices,setInvoices]=useState<any[]>([])
  const [payments,setPayments]=useState<any[]>([])

  useEffect(()=>{
    const load=async()=>{
      const {data:inv}=await supabase.from('invoices').select('*, clients(client_name)').order('created_at',{ascending:false})
      const {data:pay}=await supabase.from('payments').select('*')
      if(inv) setInvoices(inv)
      if(pay) setPayments(pay)
    }
    load()
  },[])

  const getDays = (dateStr:string)=>{
    const invDate = new Date(dateStr)
    const today = new Date()
    const diff = Math.floor((today.getTime() - invDate.getTime()) / (1000*60*60*24))
    return diff
  }

  let bucket0_30=0, bucket31_60=0, bucket61_90=0, bucket90plus=0
  const rows = invoices.map(inv=>{
    const paid = payments.filter(p=>p.invoice_id===inv.id).reduce((s,p)=>s+Number(p.amount),0)
    const balance = Number(inv.amount) - paid
    const days = getDays(inv.created_at)
    if(balance>0){
      if(days<=30) bucket0_30+=balance
      else if(days<=60) bucket31_60+=balance
      else if(days<=90) bucket61_90+=balance
      else bucket90plus+=balance
    }
    return {...inv, paid, balance, days}
  }).filter(r=>r.balance>0)

  return(
    <div style={{padding:20, maxWidth:700, margin:'0 auto', fontFamily:'sans-serif'}}>
      <h2 style={{fontWeight:'bold'}}>Aging Report - Auditor View</h2>
      <p style={{color:'#666', fontSize:14}}>Receivables by due days</p>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:16}}>
        <div style={{border:'1px solid #ddd', padding:16, borderRadius:8, background:'#fff'}}>
          <div style={{fontSize:12, color:'#666'}}>0-30 Days</div>
          <div style={{fontSize:22, fontWeight:'bold'}}>Rs {bucket0_30}</div>
        </div>
        <div style={{border:'1px solid #ddd', padding:16, borderRadius:8, background:'#fff'}}>
          <div style={{fontSize:12, color:'#666'}}>31-60 Days</div>
          <div style={{fontSize:22, fontWeight:'bold'}}>Rs {bucket31_60}</div>
        </div>
        <div style={{border:'1px solid #ddd', padding:16, borderRadius:8, background:'#fff'}}>
          <div style={{fontSize:12, color:'#666'}}>61-90 Days</div>
          <div style={{fontSize:22, fontWeight:'bold'}}>Rs {bucket61_90}</div>
        </div>
        <div style={{border:'1px solid #ddd', padding:16, borderRadius:8, background:'#ffe5e5'}}>
          <div style={{fontSize:12, color:'#a00'}}>90+ Days</div>
          <div style={{fontSize:22, fontWeight:'bold', color:'red'}}>Rs {bucket90plus}</div>
        </div>
      </div>

      <h3 style={{marginTop:24}}>Pending Invoices</h3>
      {rows.map((r:any)=>(
        <div key={r.id} style={{border:'1px solid #eee', padding:12, marginTop:8, borderRadius:6, display:'flex', justifyContent:'space-between'}}>
          <span><b>{r.clients?.client_name}</b><br/><small style={{color:'#666'}}>{r.invoice_no} - {r.days} days - Total Rs {r.amount} - Paid Rs {r.paid}</small></span>
          <span style={{fontWeight:'bold', color:'red'}}>Rs {r.balance}</span>
        </div>
      ))}
      {rows.length===0 && <p style={{color:'#888'}}>All clear - No pending dues!</p>}
    </div>
  )
}
