'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  useEffect(() => {
    async function fetchClients() {
      const { data } = await supabase.from('clients').select('*').limit(20)
      if (data) setClients(data)
    }
    fetchClients()
  }, [])
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Clients</h1>
      <div className="mt-4">
        {clients.length === 0 ? <p>No clients found</p> : clients.map((c: any) => (
          <div key={c.id} className="border p-2 mb-2 rounded">{c.name || c.email || c.id}</div>
        ))}
      </div>
    </div>
  )
}
