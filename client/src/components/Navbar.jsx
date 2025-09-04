import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const onLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="navbar">
      <div className="container navbar-inner">
        <div className="row">
          <Link to="/" className="brand">📝 Blog</Link>
          <span className="badge">CRUD + Auth</span>
        </div>
        <div className="row">
          {user ? (
            <>
              <Link to="/new" className="btn">New Post</Link>
              <Link to="/me" className="btn ghost">My Posts</Link>
              <button className="btn muted" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn ghost">Login</Link>
              <Link to="/register" className="btn">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
