import { useState } from 'react'

export default function SearchBar({ initial = '', onSearch }) {
  const [q, setQ] = useState(initial)
  const submit = (e) => { e.preventDefault(); onSearch(q.trim()) }
  return (
    <form onSubmit={submit} className="row" style={{ gap: '0.5rem' }}>
      <input className="input" placeholder="Search by title or username..." value={q} onChange={e=>setQ(e.target.value)} />
      <button className="btn" type="submit">Search</button>
    </form>
  )
}
