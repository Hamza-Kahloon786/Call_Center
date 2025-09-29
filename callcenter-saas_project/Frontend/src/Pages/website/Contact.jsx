// src/pages/website/Contact.jsx - Removed sales/map sections & improved message area
import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react'
import { useApi } from '../../hooks/useApi'
import Input from '../../Components/ui/Input'
import Button from '../../Components/ui/Button'
import Card from '../../components/ui/Card'
import { validateForm, contactSchema } from '../../utils/validation'
import config from '../../services/config'
import toast from 'react-hot-toast'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const { post } = useApi()
  const [loading, setLoading] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const contactInfo = [
    {
      icon: <Mail className="h-8 w-8 text-blue-600" />,
      title: "Email Us",
      content: config.CONTACT.EMAIL,
      action: `mailto:${config.CONTACT.EMAIL}`
    },
    {
      icon: <Phone className="h-8 w-8 text-blue-600" />,
      title: "Call Us",
      content: config.CONTACT.PHONE,
      action: `tel:${config.CONTACT.PHONE}`
    },
    {
      icon: <MapPin className="h-8 w-8 text-blue-600" />,
      title: "Visit Us",
      content: config.CONTACT.ADDRESS,
      action: null
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Business Hours",
      content: "Mon-Fri: 9:00 AM - 6:00 PM PST",
      action: null
    }
  ]

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
      // For demo purposes, we'll simulate an API call
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
    } catch (error) {
      console.error('Contact form submission failed:', error)
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our AI call center platform? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card padding="large">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="John Doe"
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="john@company.com"
                  required
                />

                <Input
                  label="Subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  placeholder="How can we help you?"
                  required
                />

                {/* IMPROVED MESSAGE SECTION */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  
                  {/* Message Guidelines */}
                  <div className="mb-3 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                    <div className="flex items-start">
                      <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-2">Please be specific and include:</p>
                        <ul className="list-disc list-inside space-y-1 text-blue-700">
                          <li>What services or features you're interested in</li>
                          <li>Your current business situation or challenges</li>
                          <li>Specific questions or requirements</li>
                          <li>Timeline and budget considerations (if applicable)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={8}
                      maxLength={2000}
                      className={`block w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm resize-none transition-colors ${
                        errors.message 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="Please describe your inquiry in detail. For example:

• What AI call center features are you most interested in?
• What's your current call volume and setup?
• What are your main business goals or challenges?
• Do you have any integration requirements?
• What's your preferred timeline for implementation?

The more details you provide, the better we can tailor our response to your specific needs."
                      required
                    />
                    
                    {/* Character Counter */}
                    <div 
                      className="absolute bottom-3 right-3 text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        color: charCount > 1800 ? '#dc2626' : '#6b7280',
                        fontWeight: charCount > 1800 ? '600' : '400',
                        border: '1px solid #e5e7eb'
                      }}
                    >
                      {charCount}/2000
                    </div>
                  </div>
                  
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                  
                  <p className="mt-2 text-sm text-gray-500">
                    Minimum 10 characters. The more details you provide, the better we can help you.
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
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
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

                {/* Response Time Notice */}
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-600">
                    We typically respond within <strong>24 hours</strong> during business days
                  </p>
                </div>
              </form>
            </Card>
          </div>

          {/* Contact Information & FAQ */}
          <div className="space-y-8">
            <Card padding="large">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      {info.action ? (
                        <a
                          href={info.action}
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-600">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* FAQ Section */}
            <Card padding="large">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Common Questions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How quickly can I get started?
                  </h3>
                  <p className="text-gray-600">
                    You can be up and running in less than 24 hours. Our team will help you 
                    set up your first campaign and train your AI agent.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Do you offer technical support?
                  </h3>
                  <p className="text-gray-600">
                    Yes! We provide comprehensive support including setup assistance, 
                    training, and ongoing technical support for all our customers.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Can I integrate with my existing CRM?
                  </h3>
                  <p className="text-gray-600">
                    We integrate with all major CRM platforms including Salesforce, HubSpot, 
                    and Jobber. Custom integrations are also available for enterprise customers.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    What kind of businesses do you work with?
                  </h3>
                  <p className="text-gray-600">
                    We work with businesses of all sizes, from small startups to large enterprises, 
                    across various industries including healthcare, real estate, e-commerce, and professional services.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Contact