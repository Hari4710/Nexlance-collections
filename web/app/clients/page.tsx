"use client"
import { useState, useEffect } from "react"

export default function Clients(){
  const [clients, setClients] = useState<any[]>([])
  const [name, setName] = useState("")
  const [gstin, setGstin] = useState("")

  useEffect(()=>{
    const saved = localStorage.getItem("nexlance_clients")
    if(saved) setClients(JSON.parse(saved))
  },[])

  const save = (data:any[]) => {
    setClients(data)
    localStorage.setItem("nexlance_clients", JSON.stringify(data))
  }

  const addClient = () => {
    if(!name) return alert("Name pettu")
    const newClient = { id: Date.now(), name, gstin, archived:false, createdAt: new Date().toISOString() }
    save([...clients, newClient])
    setName(""); setGstin("")
    alert("Client Added ✅")
  }

  const archiveClient = (id:any) => save(clients.map(c=> c.id===id ? {...c, archived:true} : c))
  const restoreClient = (id:any) => save(clients.map(c=> c.id===id ? {...c, archived:false} : c))

  return(
    <div style={{padding:20, fontFamily:"sans-serif"}}>
      <h1>Clients - System of Record</h1>
      <p>No deletion, only Archive. 6-year retention.</p>
      
      <div style={{border:"1px solid #ccc", padding:15, marginBottom:20}}>
        <h3>+ New Client</h3>
        <input placeholder="Client Name" value={name} onChange={e=>setName(e.target.value)} style={{padding:8,width:"100%",marginBottom:10}}/><br/>
        <input placeholder="GSTIN" value={gstin} onChange={e=>setGstin(e.target.value)} style={{padding:8,width:"100%",marginBottom:10}}/><br/>
        <button onClick={addClient} style={{padding:"10px 20px", background:"black", color:"white"}}>Add Client</button>
      </div>

      <h3>Active Client List ({clients.filter(c=>!c.archived).length})</h3>
      {clients.filter(c=>!c.archived).map(c=>(
        <div key={c.id} style={{border:"1px solid #ddd", padding:10, marginBottom:8, display:"flex", justifyContent:"space-between"}}>
          <div><b>{c.name}</b> - {c.gstin}<br/><small>{new Date(c.createdAt).toLocaleDateString()}</small></div>
          <button onClick={()=>archiveClient(c.id)}>Archive</button>
        </div>
      ))}

      <h3 style={{marginTop:30, color:"gray"}}>Archived Clients ({clients.filter(c=>c.archived).length}) - 6 Year Retention</h3>
      {clients.filter(c=>c.archived).map(c=>(
        <div key={c.id} style={{border:"1px solid #ddd", padding:10, marginBottom:8, background:"#f9f9f9", display:"flex", justifyContent:"space-between"}}>
          <div><b>{c.name}</b> - {c.gstin}<br/><small>Archived</small></div>
          <button onClick={()=>restoreClient(c.id)} style={{background:"green", color:"white", padding:"5px 10px"}}>Restore</button>
        </div>
      ))}
    </div>
  )
}
