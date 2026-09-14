'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Page() {
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    const loadLogs = async () => {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)
      
      if (data) {
        setLogs(data)
      }
    }
    loadLogs()
  }, [])

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Audit Logs</h2>
      <p style={{ color: '#666', fontSize: 14 }}>Append Only - Cannot be deleted or edited</p>

      <div style={{ marginTop: 20, border: '1px solid #ddd', borderRadius: 8 }}>
        <div style={{ background: 'black', color: 'white', padding: '12px 15px', fontWeight: 'bold', fontSize: 14 }}>
          Total Logs: {logs.length}
        </div>

        {logs.length === 0 && (
          <div style={{ padding: 20, textAlign: 'center', color: '#888' }}>
            No logs found. Table is empty.
          </div>
        )}

        {logs.map((log: any) => (
          <div key={log.id} style={{ padding: 12, borderBottom: '1px solid #eee', fontSize: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 'bold' }}>{log.action || log.table_name || 'ACTION'}</span>
              <span style={{ color: '#666', fontSize: 12 }}>{new Date(log.created_at).toLocaleString()}</span>
            </div>
            <div style={{ marginTop: 5, color: '#333', fontSize: 12, wordBreak: 'break-all' }}>
              {log.details ? JSON.stringify(log.details) : log.record_id ? `Record: ${log.record_id}` : JSON.stringify(log).slice(0, 150)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
