// website/Home.jsx - Improved hero section with better UI
import { Link } from 'react-router-dom'
import { 
  Phone, 
  Bot, 
  BarChart3, 
  Zap, 
  Shield, 
  Users, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp
} from 'lucide-react'
import Button from '../../Components/ui/Button'
import Card from '../../components/ui/Card'
import config from '../../services/config'

const Home = () => {
  const features = [
    {
      icon: <Bot className="h-8 w-8 text-blue-600" />,
      title: "AI Voice Agents",
      description: "Advanced AI-powered voice agents that sound natural and handle complex conversations with your customers."
    },
    {
      icon: <Phone className="h-8 w-8 text-blue-600" />,
      title: "Automated Calling",
      description: "Scale your outreach with automated calling campaigns that deliver consistent results 24/7."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: "Advanced Analytics",
      description: "Get deep insights into call performance, conversion rates, and customer behavior with detailed analytics."
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "CRM Integration",
      description: "Seamlessly integrate with popular CRMs like Salesforce and Jobber to streamline your workflow."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption to keep your customer data safe and compliant."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Team Collaboration",
      description: "Built-in tools for team management, call assignment, and performance tracking across your organization."
    }
  ]

  const stats = [
    { number: "10M+", label: "Calls Processed" },
    { number: "95%", label: "Customer Satisfaction" },
    { number: "300%", label: "ROI Increase" },
    { number: "24/7", label: "Availability" }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      role: "CEO",
      content: "CallCenter Pro transformed our sales process. We've seen a 250% increase in qualified leads and our team can focus on closing deals instead of making cold calls."
    },
    {
      name: "Michael Chen",
      company: "Growth Marketing Co.",
      role: "VP of Sales",
      content: "The AI voice agents are incredibly natural. Our customers often don't realize they're talking to AI, and the conversion rates are better than our human callers."
    },
    {
      name: "Emily Rodriguez",
      company: "Service Pro LLC",
      role: "Operations Manager",
      content: "The CRM integration with Jobber saved us hours of manual work. Everything syncs automatically and our team stays organized."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden min-h-screen flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-800 text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered Call Center Revolution
              </div>
              
              {/* Main Heading - Improved */}
              <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 leading-tight">
                <span className="block text-gray-900 mb-2">Transform Your</span>
                <span className="block text-gray-900 mb-2">Business with</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  AI Call Centers
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
                Automate your outreach, boost conversions by <span className="font-bold text-blue-600">300%</span>, 
                and scale your sales with intelligent voice agents that sound completely natural.
              </p>
              
              {/* Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                <div className="flex items-center justify-center lg:justify-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700 font-medium">24/7 Availability</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700 font-medium">CRM Integration</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700 font-medium">No Setup Fees</span>
                </div>
              </div>
              
              {/* CTA Button - Removed Watch Demo */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/demo" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px 32px',
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)',
                    border: 'none',
                    minWidth: '200px',
                    position: 'relative'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#1D4ED8'
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 15px 35px rgba(37, 99, 235, 0.4)'
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#2563EB'
                    e.target.style.transform = 'translateY(0px)'
                    e.target.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.3)'
                  }}
                >
                  <Target className="mr-3 h-5 w-5" />
                  Book Free Demo
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4">Trusted by 500+ growing businesses</p>
                <div className="flex items-center justify-center lg:justify-start space-x-8 opacity-60">
                  <span className="text-gray-400 font-semibold">TechCorp</span>
                  <span className="text-gray-400 font-semibold">GrowthCo</span>
                  <span className="text-gray-400 font-semibold">ScaleUp</span>
                  <span className="text-gray-400 font-semibold">ProService</span>
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Visual */}
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">AI Call Agent</h3>
                      <p className="text-sm text-gray-500">Live Demo Available</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
                    <span className="text-green-600 font-semibold text-sm">Online</span>
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">300%</div>
                    <div className="text-xs text-blue-700">Conversion Boost</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">24/7</div>
                    <div className="text-xs text-purple-700">Always Available</div>
                  </div>
                </div>
                
                {/* Call Simulation */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">AI Agent Sarah</span>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-sm text-gray-700 mb-2">
                    "Hi! I'm calling from ABC Roofing. We're offering free roof inspections in your area this week..."
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                    Natural conversation in progress
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Scale Your Business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines AI voice technology, automation, 
              and analytics to supercharge your sales and customer engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in minutes with our simple setup process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Setup Your Campaign</h3>
              <p className="text-gray-600">
                Upload your contact list and customize your AI voice agent with your brand voice and messaging.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Makes the Calls</h3>
              <p className="text-gray-600">
                Our AI agents make calls 24/7, handling objections, qualifying leads, and booking appointments automatically.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Results</h3>
              <p className="text-gray-600">
                Track performance, analyze conversations, and watch your pipeline fill with qualified leads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Growing Businesses
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers are saying about their results
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative">
                <div className="text-blue-400 text-6xl font-serif absolute top-4 left-4">"</div>
                <div className="pt-8">
                  <p className="text-gray-600 mb-6 italic">
                    {testimonial.content}
                  </p>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home