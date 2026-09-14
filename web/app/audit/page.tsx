'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AuditPage() {
  const [logs, setLogs] = useState<any[]>([])
  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('audit_logs').select('*').limit(20)
      if (data) setLogs(data)
    }
    load()
  }, [])
  return (
    <div style={{padding: '20px'}}>
      <h1 style={{fontSize: '24px', fontWeight: 'bold'}}>Audit Logs</h1>
      <pre style={{marginTop: '20px', background: '#f5f5f5', padding: '10px'}}>{JSON.stringify(logs, null, 2)}</pre>
    </div>
  )
}
