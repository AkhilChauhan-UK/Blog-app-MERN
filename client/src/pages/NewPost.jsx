import { useState } from 'react'
import { api } from '../lib/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    if (title.length < 5) return toast.error('Title min 5 chars')
    if (content.length < 50) return toast.error('Content min 50 chars')
    if (imageURL && !/^https?:\/\//.test(imageURL)) return toast.error('imageURL must be URL')
    setLoading(true)
    try {
      const res = await api.post('/api/posts', { title, imageURL: imageURL || undefined, content })
      toast.success('Post created')
      nav(`/post/${res.data._id}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid">
      <div className="card" style={{ gridColumn: '1 / -1', maxWidth: 720, margin: '0 auto' }}>
        <h2 style={{ marginTop: 0 }}>Create Post</h2>
        <form onSubmit={submit}>
          <label className="label">Title</label>
          <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
          <div className="space" />
          <label className="label">Image URL (optional)</label>
          <input className="input" value={imageURL} onChange={e=>setImageURL(e.target.value)} />
          <div className="space" />
          <label className="label">Content</label>
          <textarea className="textarea" value={content} onChange={e=>setContent(e.target.value)} />
          <div className="space" />
          <button className="btn" disabled={loading} type="submit">{loading ? 'Saving...' : 'Publish'}</button>
        </form>
      </div>
    </div>
  )
}
