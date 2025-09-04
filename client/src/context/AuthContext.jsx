import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getToken, saveToken, clearToken, getUser, saveUser, clearUser } from '../lib/auth'
import { api } from '../lib/api'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken())
  const [user, setUser] = useState(getUser())

  useEffect(() => {
    if (token) saveToken(token); else clearToken()
  }, [token])

  useEffect(() => {
    if (user) saveUser(user); else clearUser()
  }, [user])

  // attach token to axios
  useEffect(() => {
    const id = api.interceptors.request.use(config => {
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
    })
    return () => api.interceptors.request.eject(id)
  }, [token])

  const logout = () => { setToken(null); setUser(null) }

  const value = useMemo(() => ({ token, setToken, user, setUser, logout }), [token, user])
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
