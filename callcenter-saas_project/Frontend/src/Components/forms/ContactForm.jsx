// src/components/forms/ContactForm.jsx - Actually improved message section
import { useState } from 'react'
import { User, Mail, MessageSquare } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { validateForm, contactSchema } from '../../utils/validation'
import toast from 'react-hot-toast'

const ContactForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Track character count for message
    if (name === 'message') {
      setCharCount(value.length)
    }
    
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
    
    // Validate form
    const { errors: validationErrors, isValid } = validateForm(formData, contactSchema)
    
    if (!isValid) {
      setErrors(validationErrors)
      return
    }

    try {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      setCharCount(0)
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error('Contact form submission failed:', error)
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        leftIcon={<User className="h-5 w-5" />}
        placeholder="John Doe"
        required
      />

      <Input
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        leftIcon={<Mail className="h-5 w-5" />}
        placeholder="john@company.com"
        required
      />

      <Input
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        error={errors.subject}
        leftIcon={<MessageSquare className="h-5 w-5" />}
        placeholder="How can we help you?"
        required
      />

      {/* IMPROVED MESSAGE SECTION */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message
          <span className="text-red-500 ml-1">*</span>
        </label>
        
        {/* Helpful guidelines */}
        <div className="mb-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-md">
          <p className="text-sm text-blue-800">
            <strong>Please be specific and include:</strong> What you're looking for, your current situation, timeline, and any specific questions. The more details you provide, the better we can help you.
          </p>
        </div>
        
        <div className="relative">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={8}
            maxLength={1500}
            className={`block w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm resize-none transition-colors ${
              errors.message 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
            placeholder="Please describe your inquiry in detail. For example:

• What specific services or features are you interested in?
• What's your current situation or challenge?
• What are your main goals?
• Any specific requirements or timeline?
• Preferred contact method?

The more information you provide, the more accurately we can respond to your needs."
            required
          />
          
          {/* Character counter */}
          <div 
            className="absolute bottom-3 right-3 text-xs px-2 py-1 rounded"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: charCount > 1400 ? '#dc2626' : '#6b7280',
              fontWeight: charCount > 1400 ? '600' : '400'
            }}
          >
            {charCount}/1500
          </div>
        </div>
        
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
        
        <p className="mt-2 text-sm text-gray-500">
          Minimum 10 characters. Be as detailed as possible for the best response.
        </p>
      </div>

      {/* IMPROVED SUBMIT BUTTON */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px 24px',
            backgroundColor: loading ? '#9CA3AF' : '#2563EB',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            minHeight: '56px',
            outline: 'none',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transform: loading ? 'none' : 'translateY(0px)'
          }}
          onMouseOver={(e) => {
            if (!loading) {
              e.target.style.backgroundColor = '#1D4ED8'
              e.target.style.transform = 'translateY(-1px)'
              e.target.style.boxShadow = '0 6px 8px -1px rgba(0, 0, 0, 0.15)'
            }
          }}
          onMouseOut={(e) => {
            if (!loading) {
              e.target.style.backgroundColor = '#2563EB'
              e.target.style.transform = 'translateY(0px)'
              e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }
          }}
        >
          {loading ? (
            <>
              <div 
                style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '12px'
                }}
              />
              Sending Message...
            </>
          ) : (
            <>
              <Mail style={{ width: '20px', height: '20px', marginRight: '12px' }} />
              Send Message
            </>
          )}
        </button>
      </div>

      {/* Response time notice */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          We typically respond within <strong>24 hours</strong> during business days
        </p>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  )
}

export default ContactForm