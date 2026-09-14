import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('clients').select('*').limit(20)
      if (data) setClients(data)
    }
    load()
  }, [])

  return (
    <div style={{padding: '20px'}}>
      <h1 style={{fontSize: '24px', fontWeight: 'bold'}}>Clients</h1>
      <div style={{marginTop: '20px'}}>
        {clients.length === 0 ? <p>No clients found</p> : clients.map((c:any) => (
          <div key={c.id} style={{border: '1px solid #ccc', padding: '10px', marginBottom: '10px'}}>
            {c.name || c.email || c.id}
          </div>
        ))}
      </div>
    </div>
  )
}
