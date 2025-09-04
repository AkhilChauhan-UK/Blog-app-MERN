import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export default function EditPost() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const nav = useNavigate()

  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/api/posts/${id}`)
      const p = res.data
      setTitle(p.title || '')
      setImageURL(p.imageURL || '')
      setContent(p.content || '')
      setLoading(false)
    }
    load()
  }, [id])

  const submit = async (e) => {
    e.preventDefault()
    if (title.length < 5) return toast.error('Title min 5 chars')
    if (content.length < 50) return toast.error('Content min 50 chars')
    if (imageURL && !/^https?:\/\//.test(imageURL)) return toast.error('imageURL must be URL')
    setSaving(true)
    try {
      await api.put(`/api/posts/${id}`, { title, imageURL: imageURL || undefined, content })
      toast.success('Post updated')
      nav(`/post/${id}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="center">Loading...</div>

  return (
    <div className="grid">
      <div className="card" style={{ gridColumn: '1 / -1', maxWidth: 720, margin: '0 auto' }}>
        <h2 style={{ marginTop: 0 }}>Edit Post</h2>
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
          <button className="btn" disabled={saving} type="submit">{saving ? 'Saving...' : 'Save changes'}</button>
        </form>
      </div>
    </div>
  )
}
