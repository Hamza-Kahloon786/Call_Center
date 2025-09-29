// components/forms/LoginForm.jsx
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext' // Changed to contexts
import Input from '../ui/Input'
import Button from '../ui/Button'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const from = location.state?.from?.pathname || '/dashboard'

  const validateForm = (data) => {
    const newErrors = {}

    if (!data.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!data.password) {
      newErrors.password = 'Password is required'
    }

    return {
      errors: newErrors,
      isValid: Object.keys(newErrors).length === 0
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    console.log('Form submitted with:', formData) // Debug log
    
    // Validate form
    const { errors: validationErrors, isValid } = validateForm(formData)
    
    if (!isValid) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    try {
      const result = await login(formData)
      console.log('Login successful:', result) // Debug log
      navigate(from, { replace: true })
    } catch (error) {
      console.error('Login failed:', error)
      // Check if it's a network error
      if (error.code === 'ERR_NETWORK') {
        toast.error('Cannot connect to server. Please check if the backend is running.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        leftIcon={<Mail className="h-5 w-5" />}
        placeholder="Enter your email"
        autoComplete="email"
        required
      />

      <Input
        label="Password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        leftIcon={<Lock className="h-5 w-5" />}
        placeholder="Enter your password"
        autoComplete="current-password"
        showPasswordToggle
        onPasswordToggle={() => setShowPassword(!showPassword)}
        required
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <Link
          to="/forgot-password"
          className="text-sm text-primary-600 hover:text-primary-500"
        >
          Forgot your password?
        </Link>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="large"
        fullWidth
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        {isSubmitting ? 'Signing In...' : 'Sign In'}
      </Button>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign up here
          </Link>
        </span>
      </div>
    </form>
  )
}

export default LoginForm