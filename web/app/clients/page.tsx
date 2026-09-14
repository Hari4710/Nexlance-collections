'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchClients = async () => {
    const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
    if (data) setClients(data)
  }

  useEffect(() => { fetchClients() }, [])

  const addClient = async () => {
    if (!name) return alert('Name pettali bro!')
    setLoading(true)
    const { error } = await supabase.from('clients').insert([{ name, email }])
    if (error) alert(error.message)
    else {
      setName(''); setEmail('')
      fetchClients()
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Clients</h1>
      
      {/* ADD FORM - IKKADA ADD CHEYACHU */}
      <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '10px', margin: '20px 0' }}>
        <h3>Add New Client</h3>
        <input 
          placeholder="Client Name *" 
          value={name} 
          onChange={e=>setName(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input 
          placeholder="Email" 
          value={email} 
          onChange={e=>setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={addClient} 
          disabled={loading}
          style={{ width: '100%', padding: '12px', background: 'black', color: 'white', borderRadius: '8px', marginTop: '10px', cursor: 'pointer' }}
        >
          {loading ? 'Adding...' : '+ Add Client'}
        </button>
      </div>

      {/* LIST */}
      {clients.length === 0 ? <p>No clients found</p> : clients.map(c=>(
        <div key={c.id} style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px', margin: '8px 0' }}>
          <b>{c.name}</b> <br/> <small>{c.email}</small>
        </div>
      ))}
    </div>
  )
}
