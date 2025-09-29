// Pages/dashboard/Overview.jsx
import { useAuth } from '../../contexts/AuthContext'
import { 
  Phone, TrendingUp, DollarSign, Clock, CheckCircle, XCircle, Activity,
  Users, BarChart3, Calendar, MessageSquare
} from 'lucide-react'

const Overview = () => {
  const { user } = useAuth()

  // Mock data for dashboard overview
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

  const upcomingTasks = [
    { id: 1, task: 'Follow up with John Smith', time: '3:00 PM', priority: 'high' },
    { id: 2, task: 'Team meeting', time: '4:30 PM', priority: 'medium' },
    { id: 3, task: 'Review call reports', time: '5:00 PM', priority: 'low' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome back, {user?.full_name || 'User'}!</h1>
        <p className="mt-2 opacity-90">Here's what's happening with your call center today.</p>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Calls Today</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.callsToday}</p>
              <p className="text-xs text-green-600 mt-1">+12% from yesterday</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.successRate}%</p>
              <p className="text-xs text-green-600 mt-1">+2.1% improvement</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenue Today</p>
              <p className="text-2xl font-bold text-gray-900">${mockStats.revenue.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">+8.3% from yesterday</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Agents</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.activeAgents}</p>
              <p className="text-xs text-gray-500 mt-1">of 12 total agents</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Calls</p>
              <p className="text-xl font-bold text-gray-900">{mockStats.totalCalls}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Call Duration</p>
              <p className="text-xl font-bold text-gray-900">{mockStats.avgCallDuration}</p>
            </div>
            <Clock className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-xl font-bold text-gray-900">{mockStats.conversionRate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Calls */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Calls</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentCalls.map((call) => (
                  <tr key={call.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{call.customer}</div>
                        <div className="text-sm text-gray-500 capitalize">{call.type}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{call.time}</div>
                      <div className="text-sm text-gray-500">{call.duration}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
          <div className="p-4 border-t border-gray-200">
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View all calls →
            </button>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h3>
          </div>
          <div className="p-6 space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  task.priority === 'high' ? 'bg-red-500' :
                  task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{task.task}</p>
                  <p className="text-xs text-gray-500">{task.time}</p>
                </div>
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200">
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View all tasks →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Phone className="h-6 w-6 text-blue-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Start New Call</p>
              <p className="text-sm text-gray-500">Begin a new outbound call</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <MessageSquare className="h-6 w-6 text-green-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Send Message</p>
              <p className="text-sm text-gray-500">Send SMS or email</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 className="h-6 w-6 text-purple-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">View Reports</p>
              <p className="text-sm text-gray-500">Generate detailed reports</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Overview