// 5. src/hooks/useApi.js
// ===========================================
import { useState, useCallback } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'

export const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (config) => {
    try {
      setLoading(true)
      setError(null)
      const response = await api(config)
      return response.data
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const get = useCallback((url, config = {}) => {
    return request({ ...config, method: 'GET', url })
  }, [request])

  const post = useCallback((url, data, config = {}) => {
    return request({ ...config, method: 'POST', url, data })
  }, [request])

  const put = useCallback((url, data, config = {}) => {
    return request({ ...config, method: 'PUT', url, data })
  }, [request])

  const patch = useCallback((url, data, config = {}) => {
    return request({ ...config, method: 'PATCH', url, data })
  }, [request])

  const del = useCallback((url, config = {}) => {
    return request({ ...config, method: 'DELETE', url })
  }, [request])

  return {
    loading,
    error,
    request,
    get,
    post,
    put,
    patch,
    delete: del,
  }
}

export const useApiForm = () => {
  const { request } = useApi()
  const [loading, setLoading] = useState(false)

  const submitForm = useCallback(async (apiCall, successMessage = 'Success!') => {
    try {
      setLoading(true)
      const result = await apiCall()
      toast.success(successMessage)
      return result
    } catch (error) {
      toast.error(error.detail || error.message || 'An error occurred')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    submitForm,
  }
}

export default useApi