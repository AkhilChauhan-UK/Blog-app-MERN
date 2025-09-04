export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null
  const prev = () => onChange(Math.max(1, page - 1))
  const next = () => onChange(Math.min(totalPages, page + 1))
  return (
    <div className="pagination">
      <button className="btn muted" onClick={prev} disabled={page === 1}>Prev</button>
      <span className="badge">Page {page} / {totalPages}</span>
      <button className="btn muted" onClick={next} disabled={page === totalPages}>Next</button>
    </div>
  )
}
