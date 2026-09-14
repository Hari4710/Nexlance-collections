'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const fetchClients = async () => {
    const { data } = await supabase.from('clients').select('*')
    if (data) setClients(data)
  }
  useEffect(() => { fetchClients() }, [])
  const addClient = async () => {
    if (!name.trim()) return alert('Name pettali bro!')
    const { error } = await supabase.from('clients').insert([{ name, email }])
    if (error) alert(error.message)
    else { setName(''); setEmail(''); fetchClients() }
  }
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Clients</h1>
      <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '10px', margin: '20px 0' }}>
        <input placeholder="Client Name *" value={name} onChange={e=>setName(e.target.value)} style={{ width: '100%', padding: '10px', margin: '5px 0' }} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{ width: '100%', padding: '10px', margin: '5px 0' }} />
        <button onClick={addClient} style={{ width: '100%', padding: '12px', background: 'black', color: 'white', borderRadius: '8px', marginTop: '10px' }}>+ Add Client</button>
      </div>
      {clients.map(c=><div key={c.id} style={{ border: '1px solid #ddd', padding: '12px', margin: '8px 0' }}><b>{c.name}</b><br/><small>{c.email}</small></div>)}
    </div>
  )
}
