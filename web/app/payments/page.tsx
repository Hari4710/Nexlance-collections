"use client"
import { useState, useEffect } from "react"

export default function Payments(){
  const [invoices, setInvoices] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [selectedInv, setSelectedInv] = useState("")
  const [payAmount, setPayAmount] = useState("")

  useEffect(()=>{
    const inv = localStorage.getItem("nexlance_invoices")
    if(inv) setInvoices(JSON.parse(inv))
    const pay = localStorage.getItem("nexlance_payments")
    if(pay) setPayments(JSON.parse(pay))
  },[])

  const addPayment = () => {
    if(!selectedInv || !payAmount) return alert("Invoice & Amount select chey bro")
    const invObj = invoices.find(i=>i.id==selectedInv)
    if(!invObj) return
    
    const paidSoFar = payments.filter(p=>p.invoiceId==selectedInv).reduce((s,p)=>s+p.amount,0)
    const remaining = invObj.amount - paidSoFar
    
    if(Number(payAmount) > remaining) return alert(`Overpayment! Remaining only Rs.${remaining}`)

    const newPay = { id: Date.now(), invoiceId: Number(selectedInv), client: invObj.client, amount: Number(payAmount), date: new Date().toISOString() }
    const updatedPays = [...payments, newPay]
    setPayments(updatedPays)
    localStorage.setItem("nexlance_payments", JSON.stringify(updatedPays))

    // Update Invoice Status
    const newTotalPaid = paidSoFar + Number(payAmount)
    let newStatus = "Unpaid"
    if(newTotalPaid >= invObj.amount) newStatus = "Paid"
    else if(newTotalPaid > 0) newStatus = "Partial"

    const updatedInvs = invoices.map(i=> i.id==selectedInv ? {...i, status: newStatus} : i)
    setInvoices(updatedInvs)
    localStorage.setItem("nexlance_invoices", JSON.stringify(updatedInvs))
    
    setPayAmount("")
    alert(`Payment Added! Invoice is now ${newStatus} ✅`)
  }

  const getRemaining = (inv:any) => {
    const paid = payments.filter(p=>p.invoiceId==inv.id).reduce((s,p)=>s+p.amount,0)
    return inv.amount - paid
  }

  return(
    <div style={{padding:20, fontFamily:"sans-serif"}}>
      <h1>Payments - Append Only</h1>
      <p>Partial payments allowed. Overpayment blocked.</p>

      <div style={{border:"1px solid #ccc", padding:15, marginBottom:20}}>
        <h3>+ New Payment</h3>
        <select value={selectedInv} onChange={e=>setSelectedInv(e.target.value)} style={{padding:8,width:"100%",marginBottom:10}}>
          <option value="">Select Invoice</option>
          {invoices.filter(i=>i.status!=="Paid").map(inv=>(
            <option key={inv.id} value={inv.id}>{inv.client} - Rs.{inv.amount} - Remaining: Rs.{getRemaining(inv)} ({inv.status})</option>
          ))}
        </select><br/>
        <input placeholder="Pay Amount" value={payAmount} onChange={e=>setPayAmount(e.target.value)} type="number" style={{padding:8,width:"100%",marginBottom:10}}/><br/>
        <button onClick={addPayment} style={{padding:"10px 20px", background:"black", color:"white"}}>Add Payment</button>
      </div>

      <h3>Payment History ({payments.length})</h3>
      {payments.map(p=>(
        <div key={p.id} style={{border:"1px solid #ddd", padding:10, marginBottom:8}}>
          <b>{p.client}</b> - Paid Rs.{p.amount} <br/>
          <small>For Invoice #{p.invoiceId} on {new Date(p.date).toLocaleDateString()}</small>
        </div>
      ))}
      {payments.length===0 && <p>No payments yet.</p>}

      <h3 style={{marginTop:30}}>Invoice Status</h3>
      {invoices.map(inv=>(
        <div key={inv.id} style={{border:"1px solid #eee", padding:8, marginBottom:5}}>
          {inv.client} - Rs.{inv.amount} - <b>{inv.status}</b> - Remaining: Rs.{getRemaining(inv)}
        </div>
      ))}
    </div>
  )
}
