// // Contexts/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from 'react'
// import toast from 'react-hot-toast'

// const AuthContext = createContext({})

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   // API base URL - Updated to match your backend
//   const API_BASE_URL = 'http://127.0.0.1:8000'

//   useEffect(() => {
//     checkAuth()
//   }, [])

//   const getStoredToken = () => {
//     // Try multiple storage locations
//     const localToken = localStorage.getItem('access_token')
//     const sessionToken = sessionStorage.getItem('access_token')
    
//     // Check cookies
//     const cookieToken = document.cookie
//       .split('; ')
//       .find(row => row.startsWith('access_token='))
//       ?.split('=')[1]

//     return localToken || sessionToken || cookieToken
//   }

//   const storeToken = (token) => {
//     localStorage.setItem('access_token', token)
//     sessionStorage.setItem('access_token', token)
//     document.cookie = `access_token=${token}; path=/; max-age=86400; SameSite=Strict`
//   }

//   const clearToken = () => {
//     localStorage.removeItem('access_token')
//     sessionStorage.removeItem('access_token')
//     document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
//   }

//   const checkAuth = async () => {
//     try {
//       const token = getStoredToken()
//       console.log('ðŸ” Checking auth, token found:', !!token)
      
//       if (token && token !== 'undefined' && token !== 'null') {
//         // Validate token format (JWT should have 3 parts separated by dots)
//         if (token.split('.').length === 3) {
//           try {
//             const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
//               headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//               }
//             })
            
//             console.log('ðŸ” Auth check response status:', response.status)
            
//             if (response.ok) {
//               const userData = await response.json()
//               setUser(userData)
//               console.log('âœ… Auth check successful:', userData)
//             } else {
//               console.log('âŒ Auth check failed, clearing tokens')
//               clearToken()
//               setUser(null)
//             }
//           } catch (error) {
//             console.error('âŒ Auth check error:', error)
//             clearToken()
//             setUser(null)
//           }
//         } else {
//           console.log('âŒ Invalid token format, clearing')
//           clearToken()
//           setUser(null)
//         }
//       } else {
//         console.log('â„¹ï¸ No valid token found')
//         setUser(null)
//       }
//     } catch (error) {
//       console.error('âŒ Auth check failed:', error)
//       clearToken()
//       setUser(null)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const login = async (credentials) => {
//     try {
//       setLoading(true)
//       console.log('ðŸ” Attempting login with:', credentials.email)
      
//       // Use the correct backend URL
//       const loginUrl = `${API_BASE_URL}/api/v1/auth/login`
//       console.log('ðŸŒ Final URL:', loginUrl)
      
//       const response = await fetch(loginUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify(credentials),
//         mode: 'cors' // Explicitly set CORS mode
//       })
      
//       console.log('ðŸ“¨ Login response status:', response.status)
//       console.log('ðŸ“¨ Login response headers:', Object.fromEntries(response.headers))
      
//       // Get response text first to debug
//       const responseText = await response.text()
//       console.log('ðŸ“¨ Raw response:', responseText)
      
//       if (response.status === 404) {
//         throw new Error('Login endpoint not found. Please check if the backend is running properly.')
//       }
      
//       if (response.ok) {
//         let result
//         try {
//           result = JSON.parse(responseText)
//         } catch (parseError) {
//           console.error('âŒ JSON parse error:', parseError)
//           throw new Error('Server returned invalid JSON response')
//         }
        
//         console.log('ðŸ“¨ Parsed login response:', result)
        
//         // Store token
//         if (result.access_token) {
//           storeToken(result.access_token)
//           console.log('ðŸ’¾ Token stored successfully')
          
//           // Set user data
//           if (result.user) {
//             setUser(result.user)
//             console.log('ðŸ‘¤ User set:', result.user)
//             toast.success('Login successful!')
//             return result.user
//           }
//         }
        
//         throw new Error('Invalid login response format')
//       } else {
//         let errorData
//         try {
//           errorData = JSON.parse(responseText)
//         } catch {
//           errorData = { detail: `Server error: ${response.status}` }
//         }
//         throw new Error(errorData.detail || 'Login failed')
//       }
//     } catch (error) {
//       console.error('âŒ Login failed:', error)
      
//       // More specific error messages
//       if (error.message.includes('404')) {
//         toast.error('Backend server endpoint not found. Please check if the backend is running.')
//       } else if (error.message.includes('CORS')) {
//         toast.error('Connection blocked. Please check CORS settings.')
//       } else if (error.message.includes('NetworkError') || error.name === 'TypeError') {
//         toast.error('Cannot connect to server. Please check if the backend is running.')
//       } else {
//         toast.error(error.message || 'Login failed. Please try again.')
//       }
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   const register = async (userData) => {
//     try {
//       setLoading(true)
//       console.log('ðŸ“ Attempting registration:', userData.email)
      
//       const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify(userData)
//       })
      
//       const responseText = await response.text()
//       console.log('ðŸ“¨ Registration response:', responseText)
      
//       if (response.ok) {
//         const result = JSON.parse(responseText)
//         toast.success('Registration successful! Please check your email for verification.')
//         return result
//       } else {
//         const errorData = JSON.parse(responseText)
//         throw new Error(errorData.detail || 'Registration failed')
//       }
//     } catch (error) {
//       console.error('âŒ Registration failed:', error)
//       toast.error(error.message || 'Registration failed. Please try again.')
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   const logout = async () => {
//     try {
//       const token = getStoredToken()
//       if (token) {
//         await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         })
//       }
//     } catch (error) {
//       console.error('âŒ Logout API call failed:', error)
//     } finally {
//       clearToken()
//       setUser(null)
//       toast.success('Logged out successfully')
//     }
//   }

//   const updateProfile = async (profileData) => {
//     try {
//       const token = getStoredToken()
//       const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(profileData)
//       })
      
//       if (response.ok) {
//         const updatedUser = await response.json()
//         setUser(updatedUser)
//         toast.success('Profile updated successfully!')
//         return updatedUser
//       } else {
//         throw new Error('Failed to update profile')
//       }
//     } catch (error) {
//       console.error('âŒ Profile update failed:', error)
//       toast.error('Failed to update profile. Please try again.')
//       throw error
//     }
//   }

//   const value = {
//     user,
//     loading,
//     isAuthenticated: !!user,
//     isAdmin: user?.is_admin === true,
//     login,
//     register,
//     logout,
//     updateProfile,
//     checkAuth,
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// Contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // API base URL - Updated to match your backend
  const API_BASE_URL = 'http://127.0.0.1:8000'

  useEffect(() => {
    checkAuth()
  }, [])

  const getStoredToken = () => {
    // Try multiple storage locations
    const localToken = localStorage.getItem('access_token')
    const sessionToken = sessionStorage.getItem('access_token')
    
    // Check cookies
    const cookieToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('access_token='))
      ?.split('=')[1]

    return localToken || sessionToken || cookieToken
  }

  const storeToken = (token) => {
    localStorage.setItem('access_token', token)
    sessionStorage.setItem('access_token', token)
    document.cookie = `access_token=${token}; path=/; max-age=86400; SameSite=Strict`
  }

  const clearToken = () => {
    localStorage.removeItem('access_token')
    sessionStorage.removeItem('access_token')
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
  }

  const checkAuth = async () => {
    try {
      const token = getStoredToken()
      console.log('🔍 Checking auth, token found:', !!token)
      
      if (token && token !== 'undefined' && token !== 'null') {
        // Validate token format (JWT should have 3 parts separated by dots)
        if (token.split('.').length === 3) {
          try {
            const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            })
            
            console.log('🔍 Auth check response status:', response.status)
            
            if (response.ok) {
              const userData = await response.json()
              setUser(userData)
              console.log('✅ Auth check successful:', userData)
            } else {
              console.log('❌ Auth check failed, clearing tokens')
              clearToken()
              setUser(null)
            }
          } catch (error) {
            console.error('❌ Auth check error:', error)
            clearToken()
            setUser(null)
          }
        } else {
          console.log('❌ Invalid token format, clearing')
          clearToken()
          setUser(null)
        }
      } else {
        console.log('ℹ️ No valid token found')
        setUser(null)
      }
    } catch (error) {
      console.error('❌ Auth check failed:', error)
      clearToken()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      setLoading(true)
      console.log('🔐 Attempting login with:', credentials.email)
      
      // Use the correct backend URL
      const loginUrl = `${API_BASE_URL}/api/v1/auth/login`
      console.log('🌐 Final URL:', loginUrl)
      
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(credentials),
        mode: 'cors' // Explicitly set CORS mode
      })
      
      console.log('📨 Login response status:', response.status)
      console.log('📨 Login response headers:', Object.fromEntries(response.headers))
      
      // Get response text first to debug
      const responseText = await response.text()
      console.log('📨 Raw response:', responseText)
      
      if (response.status === 404) {
        throw new Error('Login endpoint not found. Please check if the backend is running properly.')
      }
      
      if (response.ok) {
        let result
        try {
          result = JSON.parse(responseText)
        } catch (parseError) {
          console.error('❌ JSON parse error:', parseError)
          throw new Error('Server returned invalid JSON response')
        }
        
        console.log('📨 Parsed login response:', result)
        
        // Store token
        if (result.access_token) {
          storeToken(result.access_token)
          console.log('💾 Token stored successfully')
          
          // Set user data
          if (result.user) {
            setUser(result.user)
            console.log('👤 User set:', result.user)
            toast.success('Login successful!')
            return result.user
          }
        }
        
        throw new Error('Invalid login response format')
      } else {
        let errorData
        try {
          errorData = JSON.parse(responseText)
        } catch {
          errorData = { detail: `Server error: ${response.status}` }
        }
        throw new Error(errorData.detail || 'Login failed')
      }
    } catch (error) {
      console.error('❌ Login failed:', error)
      
      // More specific error messages
      if (error.message.includes('404')) {
        toast.error('Backend server endpoint not found. Please check if the backend is running.')
      } else if (error.message.includes('CORS')) {
        toast.error('Connection blocked. Please check CORS settings.')
      } else if (error.message.includes('NetworkError') || error.name === 'TypeError') {
        toast.error('Cannot connect to server. Please check if the backend is running.')
      } else {
        toast.error(error.message || 'Login failed. Please try again.')
      }
      throw error
    } finally {
      setLoading(false)
    }
  }

  // ✅ UPDATED: Register function now handles auto-login
  const register = async (userData) => {
    try {
      setLoading(true)
      console.log('🔐 Attempting registration:', userData.email)
      
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      
      const responseText = await response.text()
      console.log('📨 Registration response status:', response.status)
      console.log('📨 Registration response text:', responseText)
      
      if (response.ok) {
        const result = JSON.parse(responseText)
        console.log('📨 Parsed registration result:', result)
        
        // ✅ NEW: Check if we got a token (auto-login response)
        if (result.access_token) {
          console.log('✅ Found access_token, proceeding with auto-login')
          
          // Store token and set user (auto-login)
          storeToken(result.access_token)
          console.log('💾 Registration token stored successfully')
          
          if (result.user) {
            setUser(result.user)
            console.log('👤 Registration user set:', result.user)
            toast.success('Registration successful! Welcome to CallCenter Pro!')
            console.log('🚀 Returning autoLogin: true')
            return { ...result, autoLogin: true }
          } else {
            console.log('❌ No user data in response')
          }
        } else {
          console.log('❌ No access_token in response - old format detected')
          // Old response format without auto-login
          toast.success('Registration successful! Please check your email for verification.')
          console.log('🚀 Returning autoLogin: false')
          return { ...result, autoLogin: false }
        }
        
        return result
      } else {
        const errorData = JSON.parse(responseText)
        throw new Error(errorData.detail || 'Registration failed')
      }
    } catch (error) {
      console.error('❌ Registration failed:', error)
      
      // More specific error messages
      if (error.message.includes('404')) {
        toast.error('Backend server endpoint not found. Please check if the backend is running.')
      } else if (error.message.includes('CORS')) {
        toast.error('Connection blocked. Please check CORS settings.')
      } else if (error.message.includes('NetworkError') || error.name === 'TypeError') {
        toast.error('Cannot connect to server. Please check if the backend is running.')
      } else {
        toast.error(error.message || 'Registration failed. Please try again.')
      }
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      const token = getStoredToken()
      if (token) {
        await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
      }
    } catch (error) {
      console.error('❌ Logout API call failed:', error)
    } finally {
      clearToken()
      setUser(null)
      toast.success('Logged out successfully')
    }
  }

  const updateProfile = async (profileData) => {
    try {
      const token = getStoredToken()
      const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      })
      
      if (response.ok) {
        const updatedUser = await response.json()
        setUser(updatedUser)
        toast.success('Profile updated successfully!')
        return updatedUser
      } else {
        throw new Error('Failed to update profile')
      }
    } catch (error) {
      console.error('❌ Profile update failed:', error)
      toast.error('Failed to update profile. Please try again.')
      throw error
    }
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.is_admin === true,
    login,
    register,
    logout,
    updateProfile,
    checkAuth,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}