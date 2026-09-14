"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Audit(){
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function load(){
      const { data } = await supabase.from('audit_logs').select('*').order('created_at',{ascending:false}).limit(100)
      setLogs(data || [])
      setLoading(false)
    }
    load()
  },[])

  if(loading) return <div style={{padding:20,color:'white'}}>Loading audit logs...</div>

  return (
    <div style={{padding:20,color:'white'}}>
      <h1 style={{fontSize:24,fontWeight:'bold'}}>Audit Log</h1>
      <p style={{opacity:0.7}}>Append-only, tamper-evident. No delete allowed.</p>
      <div style={{marginTop:20}}>
        {logs.length===0 ? <p>No logs yet. Add a client to see logs.</p> : null}
        {logs.map((l,i)=>(
          <div key={i} style={{border:'1px solid #333',padding:12,marginBottom:10,borderRadius:8,background:'#111'}}>
            <div><b style={{color:'#0ff'}}>{l.action}</b> - {l.entity_type}</div>
            <div style={{fontSize:12,opacity:0.6}}>{new Date(l.created_at).toLocaleString()} | {l.entity_id}</div>
            <pre style={{fontSize:11,background:'#000',padding:8,borderRadius:4,marginTop:6,overflow:'auto'}}>{JSON.stringify(l.details,null,2)}</pre>
          </div>
        ))}
      </div>
    </div>
  )
}
