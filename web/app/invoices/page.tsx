import { supabase } from '../../lib/supabase'

export default function Page() {
  const [clients, setClients] = useState<any[]>([])
  const [invoices, setInvoices] = useState<any[]>([])
  const [clientId, setClientId] = useState('')
  const [amount, setAmount] = useState('')

  const load = async () => {
    const { data: cl } = await supabase.from('clients').select('*')
    if(cl) setClients(cl)
    const { data: inv } = await supabase.from('invoices').select('*, clients(client_name)').order('created_at', {ascending:false})
    if(inv) setInvoices(inv)
  }

  useEffect(()=>{ load() }, [])

  const add = async () => {
    if(!clientId) return alert('Client select chey bro!')
    
    // Correct column name = invoice_no
    const invNo = `INV-${Date.now().toString().slice(-6)}`
    
    const { error } = await supabase.from('invoices').insert([{
      client_id: clientId,
      invoice_no: invNo,
      total_amount: amount ? parseFloat(amount) : 0
    }])

    if(error) {
      alert('ERROR Vachindi: ' + error.message)
    } else {
      alert('SUCCESS bro! ' + invNo + ' save ayyindi!')
      setAmount(''); setClientId(''); load()
    }
  }

  return (
    <div style={{padding:20, fontFamily:'sans-serif'}}>
      <h2>Invoices - System of Record</h2>
      <div style={{border:'1px solid #ccc', padding:15, marginTop:10}}>
        <h3>+ New Invoice</h3>
        <select value={clientId} onChange={e=>setClientId(e.target.value)} style={{width:'100%', padding:10}}>
          <option value="">Select Client</option>
          {clients.map((c:any)=><option key={c.id} value={c.id}>{c.client_name}</option>)}
        </select>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount Ex: 65000" type="number" style={{width:'100%', padding:10, marginTop:10}} />
        <button onClick={add} style={{width:'100%', padding:12, background:'black', color:'white', marginTop:10}}>Add Invoice</button>
      </div>
      <h3 style={{marginTop:20}}>Invoices ({invoices.length})</h3>
      {invoices.map((i:any)=><div key={i.id} style={{border:'1px solid #eee', padding:10, marginTop:5}}>{i.invoice_no} - {i.clients?.client_name} - ₹{i.total_amount}</div>)}
    </div>
  )
}
