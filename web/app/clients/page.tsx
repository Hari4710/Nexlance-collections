"use client"
export default function Clients(){
 return(
  <div style={{padding:20}}>
   <h1>Clients - System of Record</h1>
   <p>No deletion, only Archive. 6-year retention.</p>
   <button>+ New Client</button>
   <div style={{marginTop:20, border:'1px solid gray', padding:10}}>
     Client List will come here (API)
   </div>
  </div>
 )
}
