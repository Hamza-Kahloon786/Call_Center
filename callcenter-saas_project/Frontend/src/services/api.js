// services/api.js
import axios from 'axios'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import config from './config'

const api = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { response } = error

    if (response?.status === 401) {
      // Token expired or invalid
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
      window.location.href = '/login'
      toast.error('Session expired. Please login again.')
    } else if (response?.status === 403) {
      toast.error('Access denied. You don\'t have permission for this action.')
    } else if (response?.status === 404) {
      toast.error('Resource not found.')
    } else if (response?.status >= 500) {
      toast.error('Server error. Please try again later.')
    } else if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED') {
      toast.error('Network error. Please check your connection.')
    } else if (response?.data?.detail) {
      toast.error(response.data.detail)
    }

    return Promise.reject(error)
  }
)

export default api