import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import PostCard from '../components/PostCard'
import Spinner from '../components/Spinner'

export default function Profile() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/api/posts', { params: { search: user.username, page: 1, limit: 20 } })
      setPosts((res.data?.data || []).filter(p => p.username === user.username))
      setLoading(false)
    }
    load()
  }, [user.username])

  if (loading) return <Spinner />

  return (
    <div className="grid">
      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <h2 style={{ marginTop: 0 }}>My Posts</h2>
        <div className="meta">Logged in as <b>{user.username}</b> ({user.email})</div>
      </div>

      {posts.length === 0 ? (
        <div className="center" style={{ gridColumn: '1 / -1' }}>
          <div>No posts yet.</div>
        </div>
      ) : (
        posts.map(p => (
          <div key={p._id} style={{ gridColumn: 'span 12' }}>
            <PostCard post={p} />
          </div>
        ))
      )}
    </div>
  )
}
