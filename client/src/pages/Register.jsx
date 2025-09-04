import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-hot-toast'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setToken, setUser } = useAuth()
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    if (username.length < 3) return toast.error('Username min 3 chars')
    if (!email.includes('@')) return toast.error('Invalid email')
    if (password.length < 8) return toast.error('Password min 8 chars')
    setLoading(true)
    try {
      const res = await api.post('/api/auth/register', { username, email, password })
      setToken(res.data.token)
      setUser(res.data.user)
      toast.success('Registered successfully')
      nav('/')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid">
      <div className="card" style={{ gridColumn: '1 / -1', maxWidth: 520, margin: '0 auto' }}>
        <h2 style={{ marginTop: 0 }}>Register</h2>
        <form onSubmit={submit}>
          <label className="label">Username</label>
          <input className="input" value={username} onChange={e=>setUsername(e.target.value)} />
          <div className="space" />
          <label className="label">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
          <div className="space" />
          <label className="label">Password</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <div className="space" />
          <button className="btn" disabled={loading} type="submit">{loading ? 'Loading...' : 'Create account'}</button>
        </form>
        <div className="space" />
        <div className="meta">Already have an account? <Link to="/login">Login</Link></div>
      </div>
    </div>
  )
}
