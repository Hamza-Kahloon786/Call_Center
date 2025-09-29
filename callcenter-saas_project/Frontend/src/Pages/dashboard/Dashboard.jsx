
// pages/dashboard/Dashboard.jsx
import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Menu, X, BarChart3, User, Settings, Shield, Users, LogOut, Bell, Search,
  Phone, TrendingUp, DollarSign, Clock, CheckCircle, XCircle, Activity
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + '/')
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  // Different navigation for admin vs regular users
  const adminNavigation = [
    { name: 'Admin Panel', href: '/dashboard/admin', icon: Shield },
    { name: 'User Management', href: '/dashboard/admin/users', icon: Users },
    { name: 'Account Settings', href: '/dashboard/admin/settings', icon: Settings },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
  ]

  const userNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  // Use different navigation based on user role
  const navigation = isAdmin ? adminNavigation : userNavigation

  // Mock data for regular user dashboard
  const mockStats = {
    callsToday: 47,
    successRate: 89.4,
    revenue: 12450.75,
    totalCalls: 234,
    activeAgents: 8,
    avgCallDuration: '4m 32s',
    conversionRate: 23.7
  }

  const recentCalls = [
    { id: 1, customer: 'John Smith', time: '2:34 PM', duration: '5:23', status: 'completed', type: 'sales' },
    { id: 2, customer: 'Sarah Johnson', time: '2:28 PM', duration: '3:45', status: 'completed', type: 'support' },
    { id: 3, customer: 'Mike Wilson', time: '2:15 PM', duration: '7:12', status: 'completed', type: 'follow-up' },
    { id: 4, customer: 'Lisa Davis', time: '2:08 PM', duration: '2:56', status: 'missed', type: 'sales' }
  ]

  // Check if we're on the main dashboard route (should show overview)
  const showOverview = location.pathname === '/dashboard' || location.pathname === '/dashboard/'

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar backdrop for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">CP</span>
            </div>
            <span className="text-base sm:text-xl font-bold text-gray-900 truncate">CallCenter Pro</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* User Info */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
            </div>
            <div className="ml-3 min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                {user?.full_name || 'User Name'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              {isAdmin && (
                <span className="inline-flex px-2 py-0.5 sm:py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 mt-1">
                  Admin
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link 
                key={item.name} 
                to={item.href} 
                className={`flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.href) 
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`} 
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-3 sm:p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout} 
            className="flex items-center w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-3 sm:px-4 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="lg:hidden text-gray-500 hover:text-gray-700 p-2 -ml-2"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <div className="flex-1 max-w-lg mx-2 sm:mx-4 hidden sm:block">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    className="block w-full pl-9 sm:pl-10 pr-3 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500" 
                    placeholder="Search..." 
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <button className="text-gray-500 hover:text-gray-700 relative p-2">
                  <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="absolute top-1 right-1 h-3 w-3 sm:h-4 sm:w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">3</span>
                </button>

                <div className="relative">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-3 sm:p-4 lg:p-6">
            {showOverview && !isAdmin ? (
              // Regular User Dashboard Overview
              <div className="space-y-4 sm:space-y-6">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-4 sm:p-6 text-white">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">Welcome back, {user?.full_name || 'User'}!</h1>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base opacity-90">Here's what's happening with your call center today.</p>
                </div>

                {/* Key Stats Grid - Responsive */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg mb-2 sm:mb-0 w-fit">
                        <Phone className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600" />
                      </div>
                      <div className="sm:ml-3 lg:ml-4">
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Calls Today</p>
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{mockStats.callsToday}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg mb-2 sm:mb-0 w-fit">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-green-600" />
                      </div>
                      <div className="sm:ml-3 lg:ml-4">
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Success Rate</p>
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{mockStats.successRate}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg mb-2 sm:mb-0 w-fit">
                        <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-purple-600" />
                      </div>
                      <div className="sm:ml-3 lg:ml-4">
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Revenue Today</p>
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">${mockStats.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="p-1.5 sm:p-2 bg-yellow-100 rounded-lg mb-2 sm:mb-0 w-fit">
                        <Users className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-yellow-600" />
                      </div>
                      <div className="sm:ml-3 lg:ml-4">
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Active Agents</p>
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{mockStats.activeAgents}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Calls - Desktop Table */}
                <div className="bg-white rounded-lg shadow-sm border hidden md:block">
                  <div className="p-4 sm:p-6 border-b border-gray-200">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Calls</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Duration
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {recentCalls.map((call) => (
                          <tr key={call.id} className="hover:bg-gray-50">
                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                              {call.customer}
                            </td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                              {call.time}
                            </td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                              {call.duration}
                            </td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 capitalize">
                              {call.type}
                            </td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                call.status === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {call.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Calls - Mobile Cards */}
                <div className="md:hidden space-y-3">
                  <div className="bg-white rounded-lg shadow-sm border p-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Recent Calls</h3>
                    <div className="space-y-3">
                      {recentCalls.map((call) => (
                        <div key={call.id} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{call.customer}</p>
                              <p className="text-xs text-gray-500 mt-0.5 capitalize">{call.type}</p>
                            </div>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ml-2 ${
                              call.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {call.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {call.time}
                            </span>
                            <span>{call.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : showOverview && isAdmin ? (
              // Redirect admin to admin panel
              <div className="text-center py-8 sm:py-12 px-4">
                <Shield className="h-12 w-12 sm:h-16 sm:w-16 text-primary-600 mx-auto mb-3 sm:mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto">Welcome to the admin panel. Manage users, subscriptions, and system performance.</p>
                <Link 
                  to="/dashboard/admin" 
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm sm:text-base"
                >
                  Go to Admin Panel
                </Link>
              </div>
            ) : (
              // Render other pages via Outlet
              <Outlet />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard