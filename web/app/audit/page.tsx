'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AuditPage() {
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('audit_logs').select('*').limit(20)
      if (data) setData(data)
    }
    fetchData()
  }, [])
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Audit Logs</h1>
      <pre className="mt-4 bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
