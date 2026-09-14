const add=async()=>{
  if(!clientId) return alert('Client select chey')
  if(!amount) return alert('Amount pettu')
  const invNo='INV-'+Date.now().toString().slice(-6)
  const n=Number(amount)
  const {error}=await supabase.from('invoices').insert({
    client_id: clientId,
    invoice_no: invNo,
    amount: n,
    total_amount: n,
    subtotal: n,
    gst_amount: 0,
    status: 'pending'
  })
  if(error) alert('ERROR: '+error.message)
  else{ alert('SUCCESS '+invNo); setAmount(''); setClientId(''); load() }
}
