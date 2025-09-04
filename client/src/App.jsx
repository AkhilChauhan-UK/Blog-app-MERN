import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import NewPost from './pages/NewPost'
import EditPost from './pages/EditPost'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail mode="id" />} />
          <Route path="/p/:slug" element={<PostDetail mode="slug" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
          <Route path="/me" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <div className="footer">Built with ❤️ for the CRUD +  Auth Blog App</div>
      </div>
    </div>
  )
}
