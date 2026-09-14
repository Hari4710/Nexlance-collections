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
    <div style={{padding:20, max
