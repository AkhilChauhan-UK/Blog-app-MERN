import { Link } from 'react-router-dom'

export default function PostCard({ post }) {
  const created = new Date(post.createdAt).toLocaleString()
  return (
    <div className="card post-card">
      <img className="post-thumb" src={post.imageURL || 'https://picsum.photos/seed/blank/300/200'} alt="" />
      <div style={{ flex: 1 }}>
        <Link to={`/p/${post.slug}`}><h3 style={{ margin: 0 }}>{post.title}</h3></Link>
        <div className="meta">by {post.username} • {created}</div>
        <div style={{ marginTop: '.5rem' }}>
          <Link to={`/post/${post._id}`} className="badge">open by ID</Link>
        </div>
      </div>
    </div>
  )
}
