'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([])
  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('invoices').select('*').limit(20)
      if (data) setInvoices(data)
    }
    load()
  }, [])
  return (
    <div style={{padding: '20px'}}>
      <h1 style={{fontSize: '24px', fontWeight: 'bold'}}>Invoices</h1>
      <div style={{marginTop: '20px'}}>
        {invoices.length === 0 ? <p>No invoices</p> : invoices.map((inv:any) => (
          <div key={inv.id} style={{border: '1px solid #ccc', padding: '10px', marginBottom: '10px'}}>
            {inv.id} - {inv.amount}
          </div>
        ))}
      </div>
    </div>
  )
}
