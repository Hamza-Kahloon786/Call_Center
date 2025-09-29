// Simplified Profile.jsx - Removed company, website, address, bio, and account info sections
import { useState, useRef, useEffect } from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Save,
  Upload
} from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../Components/ui/Button'
import Input from '../../Components/ui/Input'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const fileInputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  })

  // ✅ ADD useEffect to properly sync user data
  useEffect(() => {
    if (user) {
      console.log('👤 User data loaded:', user)
      
      // Handle different possible user data structures
      const firstName = user.first_name || 
                       (user.full_name && user.full_name.split(' ')[0]) || 
                       (user.name && user.name.split(' ')[0]) || ''
      
      const lastName = user.last_name || 
                      (user.full_name && user.full_name.split(' ').slice(1).join(' ')) || 
                      (user.name && user.name.split(' ').slice(1).join(' ')) || ''

      setProfileData({
        first_name: firstName,
        last_name: lastName,
        email: user.email || '',
        phone: user.phone || ''
      })
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }

    setImageLoading(true)
    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setProfileImage(previewUrl)

      // TODO: Upload to backend
      // const formData = new FormData()
      // formData.append('profile_image', file)
      // const response = await uploadProfileImage(formData)
      
      toast.success('Profile image updated successfully!')
    } catch (error) {
      toast.error('Failed to upload image')
      console.error('Error uploading image:', error)
    } finally {
      setImageLoading(false)
    }
  }

  // ✅ FIXED: Real API integration for saving profile
  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      console.log('💾 Saving profile data:', profileData)

      // Validate required fields
      if (!profileData.first_name.trim()) {
        toast.error('First name is required')
        setLoading(false)
        return
      }
      if (!profileData.last_name.trim()) {
        toast.error('Last name is required')
        setLoading(false)
        return
      }
      if (!profileData.email.trim()) {
        toast.error('Email is required')
        setLoading(false)
        return
      }

      // Prepare data for backend (match your backend schema)
      const updateData = {
        first_name: profileData.first_name.trim(),
        last_name: profileData.last_name.trim(),
        email: profileData.email.trim(),
        phone: profileData.phone.trim() || null,
        // Add full_name for compatibility
        full_name: `${profileData.first_name.trim()} ${profileData.last_name.trim()}`
      }

      console.log('📤 Sending to backend:', updateData)

      // ✅ Use the updateProfile function from AuthContext
      const updatedUser = await updateProfile(updateData)
      
      console.log('✅ Profile updated successfully:', updatedUser)
      toast.success('Profile updated successfully!')

    } catch (error) {
      console.error('❌ Profile update error:', error)
      toast.error(error.message || 'Failed to update profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getInitials = () => {
    if (profileData.first_name || profileData.last_name) {
      return `${profileData.first_name.charAt(0)}${profileData.last_name.charAt(0)}`.toUpperCase()
    }
    const name = user?.full_name || user?.email || 'User'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  // ✅ ADD loading state for initial data
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading profile...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account information and preferences
        </p>
      </div>

      {/* Profile Image Section */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Picture</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {getInitials()}
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={imageLoading}
              className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {imageLoading ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <Camera className="h-4 w-4" />
              )}
            </button>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-900">Change Profile Picture</h4>
            <p className="text-sm text-gray-500 mb-3">
              Upload a new profile picture. JPG, PNG or GIF. Max size 5MB.
            </p>
            <Button
              variant="outline"
              size="small"
              onClick={() => fileInputRef.current?.click()}
              disabled={imageLoading}
              leftIcon={<Upload className="h-4 w-4" />}
            >
              Upload New Image
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
            <p className="text-sm text-gray-500">
              Update your personal details and contact information
            </p>
          </div>
          
          {/* ✅ UPDATED: Save Changes Button with Inline Styling */}
          <button
            onClick={handleSaveProfile}
            disabled={loading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.75rem 1.5rem',
              backgroundColor: loading ? '#9CA3AF' : '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600',
              fontSize: '0.875rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease-in-out',
              minWidth: '140px',
              justifyContent: 'center',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              zIndex: 10,
              position: 'relative'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = '#047857'
                e.target.style.transform = 'translateY(-1px)'
                e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = '#059669'
                e.target.style.transform = 'translateY(0px)'
                e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }
            }}
            onMouseDown={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0px)'
              }
            }}
          >
            {loading ? (
              <>
                <div 
                  style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid transparent',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginRight: '8px'
                  }}
                />
                Saving...
              </>
            ) : (
              <>
                <Save style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                Save Changes
              </>
            )}
          </button>
        </div>

        <div className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name"
              name="first_name"
              value={profileData.first_name}
              onChange={handleInputChange}
              leftIcon={<User className="h-5 w-5" />}
              placeholder="Enter your first name"
              required
            />
            <Input
              label="Last Name"
              name="last_name"
              value={profileData.last_name}
              onChange={handleInputChange}
              leftIcon={<User className="h-5 w-5" />}
              placeholder="Enter your last name"
              required
            />
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleInputChange}
              leftIcon={<Mail className="h-5 w-5" />}
              placeholder="Enter your email"
              required
            />
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={profileData.phone}
              onChange={handleInputChange}
              leftIcon={<Phone className="h-5 w-5" />}
              placeholder="Enter your phone number"
            />
          </div>
        </div>
      </Card>

      {/* ✅ CSS Animation for Loading Spinner */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Profile