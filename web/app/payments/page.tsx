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
    // Invoices + Client Name
    const {data:inv} = await supabase.from('invoices').select('*, clients(client_name)').order('created_at',{ascending:false})
    if(inv) setInvoices(inv)
    // Payments + Invoice + Client Name
    const {data:pay} = await supabase.from('payments').select('*, invoices(*, clients(client_name))').order('created_at',{ascending:false})
    if(pay) setPayments(pay)
  }

  useEffect(()=>{load()},[])

  const add=async()=>{
    if(!invoiceId) return alert('Step 1: Invoice Select Chey')
    if(!amount) return alert('Step 2: Amount Pettu')
    
    // Overpayment Check
    const selected = invoices.find(i=>i.id===invoiceId)
    const paidSoFar = payments.filter(p=>p.invoice_id===invoiceId).reduce((s,p)=>s+Number(p.amount),0)
    if(selected && (paidSoFar + Number(amount) > Number(selected.amount))){
      return alert(`Overpayment Blocked! Balance Only Rs ${selected.amount - paidSoFar}`)
    }

    const {error} = await supabase.from('payments').insert({
      invoice_id: invoiceId,
      amount: Number(amount),
      payment_date: new Date().toISOString().split('T')[0]
    })
    if(error){ alert('ERROR: '+error.message) }
    else{ alert('SUCCESS - Payment Added!'); setAmount(''); setInvoiceId(''); load() }
  }

  return(
    <div style={{padding:20, maxWidth:650, margin:'0 auto', fontFamily:'sans-serif'}}>
      <h2 style={{fontWeight:'bold'}}>Payments - Append Only</h2>
      <p style={{color:'#666', fontSize:14}}>Partial payments allowed. Overpayment blocked.</p>

      {/* ADD PAYMENT BOX */}
      <div style={{border:'2px solid #000', padding:15, marginTop:15, borderRadius:10, background:'#fff'}}>
        <h3 style={{margin:0}}>+ New Payment - Step 1 & 2</h3>
        <label style={{fontSize:12, marginTop:10, display:'block'}}>STEP 1: Invoice Select Chey</label>
        <select value={invoiceId} onChange={e=>setInvoiceId(e.target.value)} style={{width:'100%',padding:12, marginTop:5, fontSize:14}}>
          <option value="">-- Select Invoice --</option>
          {invoices.map((inv:any)=><option key={inv.id} value={inv.id}>{inv.clients?.client_name} - {inv.invoice_no} - Rs {inv.amount}</option>)}
        </select>
        
        <label style={{fontSize:12, marginTop:12, display:'block'}}>STEP 2: Pay Amount Pettu</label>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Ex: 10000" type="number" style={{width:'100%',padding:12,marginTop:5, fontSize:14, boxSizing:'border-box'}} />
        
        <label style={{fontSize:12, marginTop:12, display:'block'}}>STEP 3: Button Kottu</label>
        <button onClick={add} style={{width:'100%',padding:14,background:'black',color:'white',marginTop:5, border:'none', borderRadius:6, fontSize:16, fontWeight:'bold'}}>Add Payment</button>
      </div>

      {/* PAYMENT HISTORY - STEP 4 */}
      <div style={{marginTop:25, border:'1px solid #eee', padding:10, borderRadius:8}}>
        <h3 style={{margin:0}}>Payment History ({payments.length}) - STEP 4 Ikkada Kanipistadi</h3>
        {payments.length===0 && <p style={{color:'#888', fontSize:14}}>No payments yet. Paina Add Payment cheste ikkada list vastadi.</p>}
        {payments.map((p:any)=>
          <div key={p.id} style={{border:'1px solid #ddd',padding:12, marginTop:8, borderRadius:6, display:'flex', justifyContent:'space-between', background:'#f0fff0'}}>
            <span><b>{p.invoices?.clients?.client_name}</b><br/><small style={{color:'#666'}}>{p.invoices?.invoice_no} - {p.payment_date}</small></span>
            <span style={{fontWeight:'bold', color:'green'}}>Rs {p.amount}</span>
          </div>
        )}
      </div>

      {/* INVOICE STATUS */}
      <div style={{marginTop:25}}>
        <h3>Invoice Status</h3>
        {invoices.map((inv:any)=>{
          const paid=payments.filter(pp=>pp.invoice_id===inv.id).reduce((s,pp)=>s+Number(pp.amount),0)
          const bal=Number(inv.amount)-paid
          return(
            <div key={inv.id} style={{border:'1px solid #eee',padding:12, marginTop:8, borderRadius:6, background: bal===0 ? '#e6ffec' : '#fff'}}>
              <div style={{display:'flex', justifyContent:'space-between'}}><b>{inv.clients?.client_name}</b><span style={{color: bal===0 ? 'green' : 'red', fontWeight:'bold'}}>{bal===0 ? 'PAID ✅' : `Balance Rs ${bal}`}</span></div>
              <div style={{fontSize:13, color:'#666', marginTop:4}}>{inv.invoice_no} - Total Rs {inv.amount} - Paid Rs {paid}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
