"use client"
import { useEffect, useState } from "react"

export default function AgingPage(){
  const [invoices, setInvoices] = useState<any[]>([])
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("nexlance_invoices") || "[]")
    setInvoices(data)
  },[])
  const getDays = (dateStr:string)=>{
    const diff = (Date.now() - new Date(dateStr).getTime()) / (1000*60*60*24)
    return Math.floor(diff)
  }
  const buckets = {"0-30":0,"31-60":0,"61-90":0,"90+":0}
  invoices.forEach(inv=>{
    const d = getDays(inv.date || inv.createdAt)
    if(d<=30) buckets["0-30"]+=Number(inv.amount)
    else if(d<=60) buckets["31-60"]+=Number(inv.amount)
    else if(d<=90) buckets["61-90"]+=Number(inv.amount)
    else buckets["90+"]+=Number(inv.amount)
  })
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Aging Report - Auditor View</h1>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {Object.entries(buckets).map(([k,v])=>(
          <div key={k} className="border p-3 rounded"><b>{k} Days</b><div>Rs.{v}</div></div>
        ))}
      </div>
      <div className="mt-6">
        {invoices.map((inv,i)=>(
          <div key={i} className="border-b py-2 flex justify-between">
            <span>{inv.clientName || inv.clientId}</span>
            <span>{getDays(inv.date || inv.createdAt)} days - Rs.{inv.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
