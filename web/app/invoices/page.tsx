'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [clientId, setClientId] = useState('')
  const [amount, setAmount] = useState('')

  const load = async () => {
    const { data: inv } = await supabase.from('invoices').select('*, clients(client_name)').order('created_at', {ascending:false})
    if (inv) setInvoices(inv)
    const { data: cl } = await supabase.from('clients').select('*').eq('is_archived', false)
    if (cl) setClients(cl)
  }
  useEffect(()=>{load()},[])

  const addInvoice = async () => {
    if(!clientId ||!amount) return alert('Client & Amount pettu')
    const invNo = `INV-${Date.now().toString().slice(-5)}`
    const { error } = await supabase.from('invoices').insert([{
      client_id: clientId,
      invoice_no: invNo,
      invoice_number: invNo,
      amount: parseFloat(amount),
      total_amount: parseFloat(amount),
      subtotal: parseFloat(amount),
      status: 'pending'
    }])
    if (error) alert(error.message)
    else { setAmount(''); setClientId(''); load() }
  }

  return (
    <div style={{padding:20}}>
      <h1>Invoices - System of Record</h1>
      <p>No deletion. 6-year retention.</p>
      <div style={{border:'1px solid #ddd', padding:15, marginTop:10}}>
        <h3>+ New Invoice</h3>
        <select value={clientId} onChange={e=>setClientId(e.target.value)} style={{width:'100%', padding:10, margin:'5px 0'}}>
          <option value="">Select Client</option>
          {clients.map((c:any)=><option key={c.id} value={c.id}>{c.client_name}</option>)}
        </select>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" type="number" style={{width:'100%', padding:10}}/>
        <button onClick={addInvoice} style={{background:'black', color:'white', padding:10, marginTop:10}}>Add Invoice</button>
      </div>
      <h3>Invoices ({invoices.length})</h3>
      {invoices.map((i:any)=><div key={i.id} style={{border:'1px solid #ddd', padding:10, margin:5}}>{i.clients?.client_name} - {i.invoice_no} - ₹{i.amount || i.total_amount}</div>)}
    </div>
  )
}
