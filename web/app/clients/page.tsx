'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await supabase.from('clients').select('*')
      if (data) setClients(data)
    }
    fetchClients()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Clients</h1>
      {clients.length === 0 ? <p>No clients found - add in Supabase Table Editor</p> : clients.map(c=>(
        <div key={c.id} style={{ border: '1px solid #ddd', padding: '12px', margin: '8px 0', borderRadius: '8px' }}>
          <b>{c.name}</b><br/><small>{c.email}</small>
        </div>
      ))}
    </div>
  )
}
