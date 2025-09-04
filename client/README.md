# Blog Client (React + Vite)

## Setup
1) Copy `.env.example` to `.env` and set `VITE_API_URL` (default `http://localhost:5000`).
2) Install deps and run:
```bash
npm install
npm run dev
```
App runs at `http://localhost:5173`.

## Pages
- `/` — Feed (pagination + search title/username)
- `/p/:slug` and `/post/:id` — Post detail
- `/login`, `/register` — Auth pages
- `/new` — Create post (auth)
- `/edit/:id` — Edit post (auth + owner, enforced by backend)
- `/me` — My posts

## Notes
- Auth state (token + user) is stored in localStorage.
- Axios interceptors attach the Bearer token.
- Client-side validations mirror server (title 5–120, content >= 50, imageURL URL)
- Toasts via react-hot-toast
- Minimal CSS in `src/styles.css` (dark UI)
