// @ts-nocheck
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ClientsPage() {
  const [clients, setClients] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
  const load = async () => {
    const { data } = await supabase.from('clients').select('*')
    if (data) setClients(data)
  }
  useEffect(() => { load() }, [])

  const add = async () => {
    if (!name) return alert('Client Name pettali bro')
    const { error } = await supabase.from('clients').insert([{ name, email }])
    if (error) alert(error.message)
    else { setName(''); setEmail(''); load() }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Clients</h1>
      <div style={{ background: '#eee', padding: '15px', borderRadius: '10px', margin: '15px 0' }}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Client Name *" style={{ width: '100%', padding: '10px', marginBottom: '8px', border: '1px solid #ccc' }} />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{ width: '100%', padding: '10px', marginBottom: '8px', border: '1px solid #ccc' }} />
        <button onClick={add} style={{ width: '100%', padding: '12px', background: 'black', color: 'white', borderRadius: '8px' }}>+ Add Client</button>
      </div>
      {clients.length === 0 ? <p>No clients found</p> : clients.map((c:any)=><div key={c.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '5px 0' }}><b>{c.name}</b><br/>{c.email}</div>)}
    </div>
  )
}
