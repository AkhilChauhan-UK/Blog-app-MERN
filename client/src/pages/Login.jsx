import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-hot-toast'

export default function Login() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setToken, setUser } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()
  const from = loc.state?.from || '/'

  const submit = async (e) => {
    e.preventDefault()
    if (!identifier || !password) return toast.error('Fill all fields')
    setLoading(true)
    try {
      const res = await api.post('/api/auth/login', { identifier, password })
      setToken(res.data.token)
      setUser(res.data.user)
      toast.success('Welcome back!')
      nav(from, { replace: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid">
      <div className="card" style={{ gridColumn: '1 / -1', maxWidth: 520, margin: '0 auto' }}>
        <h2 style={{ marginTop: 0 }}>Login</h2>
        <form onSubmit={submit}>
          <label className="label">Email or Username</label>
          <input className="input" value={identifier} onChange={e=>setIdentifier(e.target.value)} />
          <div className="space" />
          <label className="label">Password</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <div className="space" />
          <button className="btn" disabled={loading} type="submit">{loading ? 'Loading...' : 'Login'}</button>
        </form>
        <div className="space" />
        <div className="meta">No account? <Link to="/register">Register</Link></div>
      </div>
    </div>
  )
}
