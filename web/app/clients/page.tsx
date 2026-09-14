// @ts-nocheck
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const loadClients = async () => {
    const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
    if (data) setClients(data)
  }

  useEffect(() => {
    loadClients()
  }, [])

  const addClient = async () => {
    if (!name) return alert('Client Name pettali bro!')
    const { error } = await supabase.from('clients').insert([{ name, email }])
    if (error) {
      alert(error.message)
    } else {
      setName('')
      setEmail('')
      loadClients()
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Clients</h1>
      
      <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '10px', marginTop: '15px' }}>
        <input 
          value={name} 
          onChange={e=>setName(e.target.value)} 
          placeholder="Client Name *" 
          style={{ width: '100%', padding: '12px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} 
        />
        <input 
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
          placeholder="Email (optional)" 
          style={{ width: '100%', padding: '12px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} 
        />
        <button 
          onClick={addClient} 
          style={{ width: '100%', padding: '12px', background: 'black', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 'bold' }}
        >
          + Add Client
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {clients.length === 0 ? (
          <p>No clients yet - paina add chey bro!</p>
        ) : (
          clients.map((c:any) => (
            <div key={c.id} style={{ border: '1px solid #ddd', padding: '12px', margin: '8px 0', borderRadius: '8px' }}>
              <b>{c.name}</b><br/><span style={{ color: '#666' }}>{c.email}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
