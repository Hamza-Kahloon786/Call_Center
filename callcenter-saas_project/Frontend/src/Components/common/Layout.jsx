// src/components/common/Layout.jsx
// ===========================================
import { Outlet } from 'react-router-dom'
import Header from '../../Components/common/Header'
import Footer from '../../Components/common/Footer'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout