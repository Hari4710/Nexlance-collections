'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [clientId, setClientId] = useState('')
  const [amount, setAmount] = useState('')

  const load = async () => {
    const { data: inv } = await supabase.from('invoices').select('*, clients(client_name)').order('created_at', { ascending: false })
    if (inv) setInvoices(inv)
    const { data: cl } = await supabase.from('clients').select('*').eq('is_archived', false)
    if (cl) setClients(cl)
  }
  useEffect(()=>{load()},[])

  const addInvoice = async () => {
    if(!clientId || !amount) return alert('Client & Amount pettu bro!')
    const { error } = await supabase.from('invoices').insert([{ client_id: clientId, amount: parseFloat(amount), status: 'pending' }])
    if (error) alert(error.message)
    else { setAmount(''); setClientId(''); load() }
  }

  return (
    <div style={{padding:20, fontFamily:'sans-serif', maxWidth:'800px'}}>
      <h1 style={{fontSize:'26px', fontWeight:'bold'}}>Invoices - System of Record</h1>
      <p style={{color:'#555'}}>No deletion. 6-year retention.</p>

      <div style={{border:'1px solid #ddd', padding:15, marginTop:15}}>
        <h3>+ New Invoice</h3>
        <select value={clientId} onChange={e=>setClientId(e.target.value)} style={{width:'100%', padding:10, margin:'5px 0'}}>
          <option value="">Select Client</option>
          {clients.map((c:any)=><option key={c.id} value={c.id}>{c.client_name} - {c.gstin}</option>)}
        </select>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" type="number" style={{width:'100%', padding:10, margin:'5px 0'}}/>
        <button onClick={addInvoice} style={{background:'black', color:'white', padding:'10px 20px', border:'none', cursor:'pointer'}}>Add Invoice</button>
      </div>

      <h3 style={{marginTop:20}}>Invoice List ({invoices.length})</h3>
      {invoices.length === 0 ? <p>No invoices - paina add chey!</p> :
        invoices.map((inv:any)=>(
          <div key={inv.id} style={{border:'1px solid #ddd', padding:10, margin:'6px 0', display:'flex', justifyContent:'space-between'}}>
            <div><b>{inv.clients?.client_name || 'Client'}</b> - ₹{inv.amount}<br/><small>{inv.status} | {new Date(inv.created_at).toLocaleDateString()}</small></div>
            <div style={{fontWeight:'bold'}}>{inv.invoice_number || inv.id.slice(0,8)}</div>
          </div>
        ))
      }
    </div>
  )
}
