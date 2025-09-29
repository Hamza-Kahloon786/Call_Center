// / src/pages/dashboard/Settings.jsx
import { useState } from 'react'
import { 
  Bell, 
  Lock, 
  Globe, 
  CreditCard, 
  Shield, 
  Trash2,
  Save,
  Eye,
  EyeOff
} from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../Components/ui/Button'
import Input from '../../Components/ui/Input'
import { useAuth } from '../../hooks/useAuth'

const Settings = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('notifications')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  })

  const [notifications, setNotifications] = useState({
    email_campaigns: true,
    sms_alerts: false,
    call_summaries: true,
    weekly_reports: true,
    security_alerts: true
  })

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Globe }
  ]

  const handlePasswordChange = (e) => {
    setPasswordForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const renderNotifications = () => (
    <Card>
      <Card.Header>
        <Card.Title>Notification Preferences</Card.Title>
        <Card.Description>
          Choose what notifications you'd like to receive
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="space-y-6">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium capitalize">
                  {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </p>
                <p className="text-sm text-gray-500">
                  Get notified about {key.replace('_', ' ')}
                </p>
              </div>
              <input
                type="checkbox"
                checked={value}
                onChange={() => handleNotificationChange(key)}
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
            </div>
          ))}
          
          <div className="pt-4 border-t">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Preferences
            </Button>
          </div>
        </div>
      </Card.Content>
    </Card>
  )

  const renderSecurity = () => (
    <div className="space-y-6">
      {/* Change Password */}
      <Card>
        <Card.Header>
          <Card.Title>Change Password</Card.Title>
          <Card.Description>
            Update your password to keep your account secure
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <form className="space-y-4">
            <Input
              label="Current Password"
              name="current_password"
              type={showCurrentPassword ? 'text' : 'password'}
              value={passwordForm.current_password}
              onChange={handlePasswordChange}
              showPasswordToggle
              onPasswordToggle={() => setShowCurrentPassword(!showCurrentPassword)}
            />
            
            <Input
              label="New Password"
              name="new_password"
              type={showNewPassword ? 'text' : 'password'}
              value={passwordForm.new_password}
              onChange={handlePasswordChange}
              showPasswordToggle
              onPasswordToggle={() => setShowNewPassword(!showNewPassword)}
              helperText="Must be at least 8 characters with uppercase, lowercase, number, and special character"
            />
            
            <Input
              label="Confirm New Password"
              name="confirm_password"
              type="password"
              value={passwordForm.confirm_password}
              onChange={handlePasswordChange}
            />
            
            <Button variant="primary">
              <Lock className="h-4 w-4 mr-2" />
              Update Password
            </Button>
          </form>
        </Card.Content>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <Card.Header>
          <Card.Title>Two-Factor Authentication</Card.Title>
          <Card.Description>
            Add an extra layer of security to your account
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable 2FA</p>
              <p className="text-sm text-gray-500">
                Protect your account with two-factor authentication
              </p>
            </div>
            <Button variant="outline">
              <Shield className="h-4 w-4 mr-2" />
              Enable 2FA
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  )

  const renderBilling = () => (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <Card.Header>
          <Card.Title>Current Plan</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Professional Plan</p>
              <p className="text-sm text-gray-500">$149/month • Next billing: Dec 15, 2024</p>
            </div>
            <Button variant="outline">Upgrade Plan</Button>
          </div>
          
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600">2,500</div>
              <div className="text-sm text-gray-500">Monthly Call Limit</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">1,247</div>
              <div className="text-sm text-gray-500">Calls Used</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">1,253</div>
              <div className="text-sm text-gray-500">Calls Remaining</div>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Payment Method */}
      <Card>
        <Card.Header>
          <Card.Title>Payment Method</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">**** **** **** 4242</p>
                <p className="text-sm text-gray-500">Expires 12/25</p>
              </div>
            </div>
            <Button variant="outline">Update</Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  )

  const renderPreferences = () => (
    <Card>
      <Card.Header>
        <Card.Title>Application Preferences</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="space-y-6">
          <div>
            <label className="form-label">Timezone</label>
            <select className="form-input">
              <option>Pacific Time (PT)</option>
              <option>Eastern Time (ET)</option>
              <option>Central Time (CT)</option>
              <option>Mountain Time (MT)</option>
            </select>
          </div>
          
          <div>
            <label className="form-label">Language</label>
            <select className="form-input">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          
          <div>
            <label className="form-label">Date Format</label>
            <select className="form-input">
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
          
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      </Card.Content>
    </Card>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'notifications':
        return renderNotifications()
      case 'security':
        return renderSecurity()
      case 'billing':
        return renderBilling()
      case 'preferences':
        return renderPreferences()
      default:
        return renderNotifications()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <Card.Header>
          <Card.Title className="text-red-600">Danger Zone</Card.Title>
          <Card.Description>
            Irreversible and destructive actions
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-gray-500">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="danger">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}

export default Settings