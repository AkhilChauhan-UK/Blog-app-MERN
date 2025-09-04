export default function Spinner({ label = 'Loading...' }) {
  return <div className="center"><div className="badge">{label}</div></div>
}
