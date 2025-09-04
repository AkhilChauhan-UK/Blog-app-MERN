import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import Spinner from '../components/Spinner'
import { toast } from 'react-hot-toast'

export default function PostDetail({ mode = 'id' }) {
  const params = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const url = mode === 'slug' ? `/api/posts/slug/${params.slug}` : `/api/posts/${params.id}`
        const res = await api.get(url)
        setPost(res.data)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [mode, params.id, params.slug])

  const canEdit = user && post && post.username === user.username

  const onDelete = async () => {
    if (!confirm('Delete this post?')) return
    await api.delete(`/api/posts/${post._id}`)
    toast.success('Post deleted')
    navigate('/')
  }

  if (loading) return <Spinner />
  if (!post) return <div className="center">Post not found.</div>

  const created = new Date(post.createdAt).toLocaleString()

  return (
    <div className="grid">
      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <h1 style={{ marginTop: 0 }}>{post.title}</h1>
        <div className="meta">by {post.username} • {created}</div>
        <div className="space" />
        <img src={post.imageURL || 'https://picsum.photos/seed/placeholder/900/400'} alt="" style={{ width: '100%', borderRadius: 12, border: '1px solid #1f2937' }} />
        <div className="space" />
        <p style={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{post.content}</p>

        <hr className="sep" />
        <div className="row">
          <Link to="/" className="btn muted">Back</Link>
          {canEdit && (
            <>
              <Link to={`/edit/${post._id}`} className="btn">Edit</Link>
              <button onClick={onDelete} className="btn danger">Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
