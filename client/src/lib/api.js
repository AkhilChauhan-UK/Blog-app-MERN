import axios from 'axios'
import { toast } from 'react-hot-toast'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err?.response?.data?.message || err.message || 'Request failed'
    if (!err.config?.silent) toast.error(message)
    return Promise.reject(err)
  }
)
