# Full-Stack Blog (CRUD + Auth)

This repo contains a complete **Express + MongoDB + JWT** backend (`server/`) and a **React + Vite** frontend (`client/`) implementing the assignment:

- Auth (register/login, password hashing, JWT, owner-only edit/delete)
- Posts CRUD
- Pagination + search (title/username)
- Client + server validations, error shapes
- UI polish with toasts, loading/empty states

---

## 1) Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (local or Atlas)

---

## 2) Quick Start

### Backend
```bash
cd server
cp .env.example .env           # edit MONGO_URI, JWT_SECRET if needed
npm install
npm run dev                    # http://localhost:5000
```

Health check: `GET http://localhost:5000/api/health` → `{ ok: true }`

### Frontend
```bash
cd client
cp .env.example .env           # set VITE_API_URL (defaults to http://localhost:5000)
npm install
npm run dev                    # http://localhost:5173
```

Open http://localhost:5173

---

## 3) API Summary

### Auth
- `POST /api/auth/register` → `{ username, email, password }`  
  **200/201**: `{ token, user }`
- `POST /api/auth/login` → `{ identifier, password }` (`identifier` is email or username)  
  **200**: `{ token, user }`

### Posts
- `GET    /api/posts?search=&page=&limit=`
- `GET    /api/posts/:id`
- `GET    /api/posts/slug/:slug`
- `POST   /api/posts` (auth)
- `PUT    /api/posts/:id` (auth + owner)
- `DELETE /api/posts/:id` (auth + owner)

**Error shape**
```json
{ "message": "text", "details": [ { "field": "content", "msg": "content min 50 chars" } ] }
```

---

## 4) Project Structure

```
repo-root/
├─ server/                # Express API
│  ├─ .env.example
│  ├─ package.json
│  └─ src/
│     ├─ app.js
│     ├─ server.js
│     ├─ config/db.js
│     ├─ controllers/
│     ├─ middleware/
│     ├─ models/
│     ├─ routes/
│     └─ utils/
└─ client/                # React (Vite) app
   ├─ .env.example
   ├─ package.json
   └─ src/ (pages, components, context, lib)
```

---

## 5) Deployment (Overview)
- **Server (Render/Render + Atlas)**: set env vars (`MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`); start command `node src/server.js`.
- **Client (Vercel/Netlify)**: set `VITE_API_URL` → your deployed API base URL; build command `npm run build`; output `dist`.

---

## 6) Troubleshooting
- `MongoNetworkError`: verify `MONGO_URI` and DB is reachable.
- CORS issues: confirm `CLIENT_URL` matches your frontend origin.
- 401/403 on write: ensure `Authorization: Bearer <token>` header is present and you are the owner.

Happy hacking! 🛠️
