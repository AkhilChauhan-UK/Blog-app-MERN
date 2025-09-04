const TOKEN_KEY = 'blog_token'
const USER_KEY = 'blog_user'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const saveToken = (t) => localStorage.setItem(TOKEN_KEY, t)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

export const getUser = () => {
  const raw = localStorage.getItem(USER_KEY)
  return raw ? JSON.parse(raw) : null
}
export const saveUser = (u) => localStorage.setItem(USER_KEY, JSON.stringify(u))
export const clearUser = () => localStorage.removeItem(USER_KEY)
