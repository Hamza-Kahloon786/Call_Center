// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext' // Import AuthProvider
import { useAuth } from './hooks/useAuth'
import LoadingSpinner from './Components/common/LoadingSpinner'
import ProtectedRoute from './Components/common/ProtectedRoute'
import Layout from './Components/common/Layout'

// Website Pages
import Home from './Pages/website/Home'
import Pricing from './Pages/website/Pricing'
import Features from './Pages/website/Features'
import Contact from './Pages/website/Contact'
import DemoBooking from './Components/forms/DemoBookingForm'

// Auth Pages
import Login from './Pages/auth/Login'
import Signup from './Pages/auth/Signup'
import ForgotPassword from './Pages/auth/ForgotPassword'
import ResetPassword from './Pages/auth/ResetPassword'

// Dashboard Pages
import Dashboard from './Pages/dashboard/Dashboard'
import Overview from './Pages/dashboard/Overview'
import Profile from './Pages/dashboard/Profile'
import Settings from './Pages/dashboard/Settings'

// Admin Pages
import AdminPanel from './Pages/dashboard/admin/AdminPanel'
import UserManagement from './Pages/dashboard/admin/UserManagement'
import AccountSettings from './Pages/dashboard/admin/AccountSettings'

// Create a separate component for routes that need auth context
const AppRoutes = () => {
  const { loading, isAdmin } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="large" text="Loading..." />
      </div>
    )
  }

  return (
    <div className="App">
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="features" element={<Features />} />
          <Route path="contact" element={<Contact />} />
          <Route path="demo" element={<DemoBooking />} />
        </Route>

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Dashboard Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Regular user routes */}
          <Route path="overview" element={<Overview />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          
          {/* Admin Routes - Protected with admin check */}
          <Route 
            path="admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="admin/users" 
            element={
              <ProtectedRoute requiredRole="admin">
                <UserManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="admin/settings" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AccountSettings />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* Catch-all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

// Main App component with AuthProvider wrapper
function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App