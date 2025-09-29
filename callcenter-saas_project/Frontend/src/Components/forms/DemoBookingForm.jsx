// frontend/src/components/forms/DemoBookingForm.jsx
import { useState } from 'react'
import { Calendar, Phone, Mail, Building, Clock } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useApi } from '../../hooks/useApi'
import toast from 'react-hot-toast'

const DemoBookingForm = ({ onSuccess }) => {
  const { post } = useApi()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    preferred_date: '',
    preferred_time: '',
    company_name: '',
    industry_type: '',
    script_intro: '',
    preferred_voice: '',
    special_instructions: ''
  })

  const industryOptions = [
    { value: 'roofing', label: 'Roofing' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'landscaping', label: 'Landscaping' },
    { value: 'solar', label: 'Solar' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'other', label: 'Other' }
  ]

  const voiceOptions = [
    { value: 'professional_male', label: 'Professional Male' },
    { value: 'professional_female', label: 'Professional Female' },
    { value: 'friendly_male', label: 'Friendly Male' },
    { value: 'friendly_female', label: 'Friendly Female' },
    { value: 'energetic_male', label: 'Energetic Male' },
    { value: 'energetic_female', label: 'Energetic Female' }
  ]

  const timeSlots = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '17:00', label: '5:00 PM' }
  ]

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const requiredFields = ['full_name', 'phone_number', 'email', 'preferred_date', 'preferred_time', 'company_name', 'industry_type']
    const validationErrors = {}
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        validationErrors[field] = 'This field is required'
      }
    })

    if (formData.phone_number && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone_number)) {
      validationErrors.phone_number = 'Please enter a valid phone number'
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Please enter a valid email address'
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error('Please fill in all required fields correctly.')
      return
    }

    try {
      setLoading(true)
      
      const demoData = {
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        company: formData.company_name.trim(),
        phone: formData.phone_number.trim(),
        preferred_date: formData.preferred_date,
        preferred_time: formData.preferred_time,
        message: [
          `Industry: ${industryOptions.find(opt => opt.value === formData.industry_type)?.label || formData.industry_type}`,
          formData.script_intro.trim() ? `Script: ${formData.script_intro.trim()}` : '',
          formData.preferred_voice ? `Voice: ${voiceOptions.find(opt => opt.value === formData.preferred_voice)?.label || formData.preferred_voice}` : '',
          formData.special_instructions.trim() ? `Instructions: ${formData.special_instructions.trim()}` : ''
        ].filter(Boolean).join('\n')
      }

      await post('/demo/book', demoData)
      
      toast.success('Demo request submitted successfully! We will review and contact you soon.')
      
      setFormData({
        full_name: '', phone_number: '', email: '', preferred_date: '', preferred_time: '',
        company_name: '', industry_type: '', script_intro: '', preferred_voice: '', special_instructions: ''
      })
      
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error('Demo booking failed:', error)
      
      let errorMessage = 'Failed to submit demo request. Please try again.'
      
      if (error.response?.status === 422) {
        const errorData = error.response.data
        if (errorData?.detail) {
          if (Array.isArray(errorData.detail)) {
            errorMessage = errorData.detail.map(err => `${err.loc?.join(' ')}: ${err.msg}`).join(', ')
          } else if (typeof errorData.detail === 'string') {
            errorMessage = errorData.detail
          }
        } else {
          errorMessage = 'Please check all required fields and try again.'
        }
      }
      
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
          Book Your Live Demo
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          See our AI voice agent in action! We'll call you at your preferred time with a 
          customized demo script for your business.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
        {/* Contact Information */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <Input 
                label="Full Name" 
                type="text" 
                name="full_name" 
                value={formData.full_name} 
                onChange={handleChange} 
                error={errors.full_name} 
                placeholder="John Smith" 
                required 
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Input 
                  label="Phone Number" 
                  type="tel" 
                  name="phone_number" 
                  value={formData.phone_number} 
                  onChange={handleChange} 
                  error={errors.phone_number} 
                  leftIcon={<Phone className="h-4 w-4 sm:h-5 sm:w-5" />} 
                  placeholder="+1 (555) 123-4567" 
                  required 
                />
                
                <Input 
                  label="Email Address" 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  error={errors.email} 
                  leftIcon={<Mail className="h-4 w-4 sm:h-5 sm:w-5" />} 
                  placeholder="john@company.com" 
                  required 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Input 
                  label="Preferred Date for Call" 
                  type="date" 
                  name="preferred_date" 
                  value={formData.preferred_date} 
                  onChange={handleChange} 
                  error={errors.preferred_date} 
                  leftIcon={<Calendar className="h-4 w-4 sm:h-5 sm:w-5" />} 
                  min={minDate} 
                  required 
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Time for Call <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <select 
                      name="preferred_time" 
                      value={formData.preferred_time} 
                      onChange={handleChange} 
                      className="block w-full pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" 
                      required
                    >
                      <option value="">Select time</option>
                      {timeSlots.map(slot => (
                        <option key={slot.value} value={slot.value}>{slot.label}</option>
                      ))}
                    </select>
                  </div>
                  {errors.preferred_time && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.preferred_time}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Business Context */}
          <div className="pt-4 sm:pt-6 border-t border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Business Context</h3>
            <div className="space-y-4 sm:space-y-6">
              <Input 
                label="Company Name" 
                type="text" 
                name="company_name" 
                value={formData.company_name} 
                onChange={handleChange} 
                error={errors.company_name} 
                leftIcon={<Building className="h-4 w-4 sm:h-5 sm:w-5" />} 
                placeholder="ABC Roofing Co." 
                required 
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry Type <span className="text-red-500">*</span>
                </label>
                <select 
                  name="industry_type" 
                  value={formData.industry_type} 
                  onChange={handleChange} 
                  className="block w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" 
                  required
                >
                  <option value="">Select your industry</option>
                  {industryOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.industry_type && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.industry_type}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Script Introduction (Optional)
                </label>
                <textarea 
                  name="script_intro" 
                  value={formData.script_intro} 
                  onChange={handleChange} 
                  rows={3} 
                  className="block w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" 
                  placeholder={`Example: Hi, this is Sarah from ABC Roofing. We help with ${industryOptions.find(opt => opt.value === formData.industry_type)?.label || 'your business needs'}...`}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Leave blank to use auto-generated intro based on company name and industry
                </p>
                {errors.script_intro && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.script_intro}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Voice
                </label>
                <select 
                  name="preferred_voice" 
                  value={formData.preferred_voice} 
                  onChange={handleChange} 
                  className="block w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select voice type</option>
                  {voiceOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.preferred_voice && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.preferred_voice}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Instructions (Optional)
                </label>
                <textarea 
                  name="special_instructions" 
                  value={formData.special_instructions} 
                  onChange={handleChange} 
                  rows={4} 
                  className="block w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" 
                  placeholder="Example: Focus on appointment booking, mention 10% discount, ask about current roofing issues, etc."
                />
                <p className="mt-1 text-xs text-gray-500">
                  Optional notes like: "Focus on appointment booking", "Mention 10% discount", etc.
                </p>
                {errors.special_instructions && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.special_instructions}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 pb-2 sm:pb-4">
          <Button 
            type="submit" 
            variant="primary" 
            size="large" 
            fullWidth 
            loading={loading}
            className="text-sm sm:text-base"
          >
            {loading ? 'Submitting Request...' : 'Book Demo'}
          </Button>
        </div>

        <div className="text-center text-xs sm:text-sm text-gray-500 pb-4 sm:pb-6">
          We'll send you a calendar invite with the demo meeting details.
        </div>
      </form>
    </div>
  )
}

export default DemoBookingForm