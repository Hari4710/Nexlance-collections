"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Clients(){
  const [clients, setClients] = useState<any[]>([])
  const [name, setName] = useState("")
  const [gstin, setGstin] = useState("")

  async function load(){
    const {data} = await supabase.from('clients').select('*').order('created_at',{ascending:false})
    setClients(data||[])
  }
  useEffect(()=>{load()},[])

  const addClient = async ()=>{
    if(!name) return alert("Name pettu bro")
    const {data, error} = await supabase.from('clients').insert({name, gstin}).select().single()
    if(error) return alert(error.message)

    await supabase.from('audit_logs').insert({
      action: 'CLIENT_CREATED',
      entity_type: 'client',
      entity_id: data.id,
      details: {name, gstin}
    })

    setName(""); setGstin("")
    load()
    alert('Client Added ✅ + Audit Logged')
  }

  const archiveClient = async (id:any)=>{
    await supabase.from('clients').update({archived:true}).eq('id',id)
    await supabase.from('audit_logs').insert({action:'CLIENT_ARCHIVED',entity_type:'client',entity_id:id,details:{}})
    load()
  }
  const restoreClient = async (id:any)=>{
    await supabase.from('clients').update({archived:false}).eq('id',id)
    await supabase.from('audit_logs').insert({action:'CLIENT_RESTORED',entity_type:'client',entity_id:id,details:{}})
    load()
  }

  return(
    <div style={{padding:20, fontFamily:"sans-serif", color:'white'}}>
      <h1>Clients - System of Record</h1>
      <p>No deletion, only Archive. 6-year retention.</p>
      
      <div style={{border:'1px solid #ccc', padding:15, marginBottom:20, background:'#111', borderRadius:8}}>
        <h3>New Client</h3>
        <input placeholder="Client Name" value={name} onChange={e=>setName(e.target.value)} style={{padding:8,width:'100%',marginBottom:8,color:'black'}}/>
        <input placeholder="GSTIN" value={gstin} onChange={e=>setGstin(e.target.value)} style={{padding:8,width:'100%',marginBottom:8,color:'black'}}/>
        <button onClick={addClient} style={{padding:'10px 20px', background:'#0ff', color:'black', fontWeight:'bold', borderRadius:6}}>Add Client</button>
      </div>

      <h3>Active Client List ({clients.filter((c:any)=>!c.archived).length})</h3>
      {clients.filter((c:any)=>!c.archived).map((c:any)=>(
        <div key={c.id} style={{border:'1px solid #ddd', padding:10, marginBottom:8, display:'flex', justifyContent:'space-between', background:'#111', borderRadius:6}}>
          <div><b>{c.name}</b> - {c.gstin}<br/><small>{new Date(c.created_at).toLocaleDateString()}</small></div>
          <button onClick={()=>archiveClient(c.id)} style={{background:'#333',color:'white',padding:'5px 10px',borderRadius:4}}>Archive</button>
        </div>
      ))}

      <h3 style={{marginTop:30, color:"gray"}}>Archived Clients ({clients.filter((c:any)=>c.archived).length}) - 6 Year Retention</h3>
      {clients.filter((c:any)=>c.archived).map((c:any)=>(
        <div key={c.id} style={{border:'1px solid #ddd', padding:10, marginBottom:8, background:'#1a1a1a', display:'flex', justifyContent:'space-between', borderRadius:6}}>
          <div><b>{c.name}</b> - {c.gstin}<br/><small>Archived</small></div>
          <button onClick={()=>restoreClient(c.id)} style={{background:'green', color:'white', padding:'5px 10px', borderRadius:4}}>Restore</button>
        </div>
      ))}
    </div>
  )
}
