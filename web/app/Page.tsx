"use client"
import Link from "next/link"
export default function Dashboard(){
 return(
  <div style={{padding:20}}>
   <h1>Nexlance Collections - MVP</h1>
   <p>Auditor View - All routes protected</p>
   <ul style={{lineHeight:"30px"}}>
    <li><Link href="/clients">Clients</Link></li>
    <li><Link href="/invoices">Invoices (Append Only)</Link></li>
    <li><Link href="/payments">Payments (No Delete)</Link></li>
    <li><Link href="/aging">Aging Report</Link></li>
    <li><Link href="/audit">Audit Log</Link></li>
    <li><Link href="/login">Login (MFA)</Link></li>
   </ul>
  </div>
 )
}
