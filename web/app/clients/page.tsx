'use client'
// @ts-nocheck
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [name, setName] = useState('')
  const [gstin, setGstin] = useState('')

  const load = async () => {
    const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
    if (data) setClients(data)
  }
  useEffect(() => { load() }, [])

  const add = async () => {
    if (!name) return alert('Client Name pettu bro!')
    const { error } = await supabase.from('clients').insert([{ client_name: name, gstin, is_archived: false }])
    if (error) alert(error.message)
    else { setName(''); setGstin(''); load() }
  }

  const toggleArchive = async (id: string, archive: boolean) => {
    await supabase.from('clients').update({ is_archived: archive }).eq('id', id)
    load()
  }

  const active = clients.filter(c => !c.is_archived)
  const archived = clients.filter(c => c.is_archived)

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '26px', fontWeight: 'bold' }}>Clients - System of Record</h1>
      <p style={{ color: '#555' }}>No deletion, only Archive. 6-year retention.</p>

      <div style={{ border: '1px solid #ddd', padding: '15px', marginTop: '15px' }}>
        <h3>+ New Client</h3>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Client Name" style={{ width: '100%', padding: '10px', margin: '8px 0', border: '1px solid #ccc' }} />
        <input value={gstin} onChange={e=>setGstin(e.target.value)} placeholder="GSTIN" style={{ width: '100%', padding: '10px', margin: '8px 0', border: '1px solid #ccc' }} />
        <button onClick={add} style={{ background: 'black', color: 'white', padding: '8px 20px', border: 'none' }}>Add Client</button>
      </div>

      <h3 style={{ marginTop: '20px' }}>Active Client List ({active.length})</h3>
      {active.map((c:any) => (
        <div key={c.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '6px 0', display: 'flex', justifyContent: 'space-between' }}>
          <div><b>{c.client_name}</b> - {c.gstin}</div>
          <button onClick={()=>toggleArchive(c.id, true)}>Archive</button>
        </div>
      ))}

      <h3 style={{ marginTop: '20px', color: '#888' }}>Archived Clients ({archived.length}) - 6 Year Retention</h3>
      {archived.map((c:any) => (
        <div key={c.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '6px 0', background: '#f9f9f9', display: 'flex', justifyContent: 'space-between' }}>
          <div><b>{c.client_name}</b> - {c.gstin}</div>
          <button onClick={()=>toggleArchive(c.id, false)}>Restore</button>
        </div>
      ))}
    </div>
  )
}
