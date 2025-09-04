import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import PostCard from '../components/PostCard'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import Spinner from '../components/Spinner'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [limit] = useState(6)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async (p = page, s = search) => {
    setLoading(true)
    const res = await api.get('/api/posts', { params: { page: p, limit, search: s } })
    setPosts(res.data.data)
    setTotalPages(res.data.totalPages || 1)
    setPage(res.data.page || 1)
    setLoading(false)
  }

  useEffect(() => { load(1, '') }, [])

  if (loading) return <Spinner />

  return (
    <div className="grid">
      <div style={{ gridColumn: '1 / -1' }} className="card">
        <SearchBar initial={search} onSearch={(q)=>{ setSearch(q); load(1, q) }} />
      </div>

      {posts.length === 0 ? (
        <div className="center" style={{ gridColumn: '1 / -1' }}>
          <div>No posts yet. Try creating one!</div>
        </div>
      ) : (
        posts.map(p => (
          <div key={p._id} style={{ gridColumn: 'span 12' }}>
            <PostCard post={p} />
          </div>
        ))
      )}

      <div style={{ gridColumn: '1 / -1' }}>
        <Pagination page={page} totalPages={totalPages} onChange={(p)=>load(p, search)} />
      </div>
    </div>
  )
}
