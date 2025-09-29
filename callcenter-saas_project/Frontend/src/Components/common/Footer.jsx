// src/components/common/Footer.jsx
// ===========================================
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CP</span>
              </div>
              <span className="text-xl font-bold">CallCenter Pro</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Transform your business with AI-powered call center solutions. 
              Automate calls, integrate with CRMs, and boost your sales with 
              advanced analytics and intelligent voice agents.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/callcenterpro" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/callcenterpro" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com/callcenterpro" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/demo" className="text-gray-300 hover:text-white transition-colors">Book Demo</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <a href="mailto:support@callcenterpro.com" className="text-gray-300 hover:text-white transition-colors">support@callcenterpro.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <a href="tel:+1-555-123-4567" className="text-gray-300 hover:text-white transition-colors">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <span className="text-gray-300">123 Business Ave, Suite 100<br />City, State 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {currentYear} CallCenter Pro. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer