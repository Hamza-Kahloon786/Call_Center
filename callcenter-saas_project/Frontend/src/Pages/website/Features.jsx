// website/Features.jsx
import { Link } from 'react-router-dom'
import { 
  Bot, 
  Phone, 
  BarChart3, 
  Zap, 
  Shield, 
  Users,
  Mic,
  MessageSquare,
  Calendar,
  FileText,
  Settings,
  Globe,
  ArrowRight
} from 'lucide-react'
import Button from '../../Components/ui/Button'
import Card from '../../components/ui/Card'

const Features = () => {
  const mainFeatures = [
    {
      icon: <Bot className="h-12 w-12 text-primary-600" />,
      title: "Natural AI Voice Agents",
      description: "Our AI agents sound completely natural and can handle complex conversations, objections, and follow-up questions just like your best sales reps.",
      features: [
        "Human-like speech patterns",
        "Emotional intelligence",
        "Multi-language support",
        "Custom voice training"
      ]
    },
    {
      icon: <Phone className="h-12 w-12 text-primary-600" />,
      title: "Automated Call Campaigns",
      description: "Set up and launch call campaigns in minutes. Our system handles dialing, call routing, and follow-ups automatically 24/7.",
      features: [
        "Intelligent dialing",
        "Call scheduling",
        "Automatic retries",
        "Time zone awareness"
      ]
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-primary-600" />,
      title: "Advanced Analytics",
      description: "Get deep insights into call performance, conversion rates, and customer behavior with real-time analytics and detailed reports.",
      features: [
        "Real-time dashboards",
        "Conversion tracking",
        "Call outcome analysis",
        "Performance metrics"
      ]
    },
    {
      icon: <Zap className="h-12 w-12 text-primary-600" />,
      title: "CRM Integration",
      description: "Seamlessly connect with popular CRMs like Salesforce, HubSpot, and Jobber. All call data and leads sync automatically.",
      features: [
        "Two-way sync",
        "Lead qualification",
        "Contact enrichment",
        "Pipeline management"
      ]
    },
    {
      icon: <Shield className="h-12 w-12 text-primary-600" />,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption, compliance monitoring, and secure data handling for complete peace of mind.",
      features: [
        "SOC 2 compliance",
        "GDPR compliant",
        "End-to-end encryption",
        "Regular security audits"
      ]
    },
    {
      icon: <Users className="h-12 w-12 text-primary-600" />,
      title: "Team Management",
      description: "Powerful tools for managing teams, assigning territories, tracking performance, and collaborating effectively across your organization.",
      features: [
        "Role-based permissions",
        "Team dashboards",
        "Performance tracking",
        "Collaboration tools"
      ]
    }
  ]

  const additionalFeatures = [
    {
      icon: <Mic className="h-8 w-8 text-primary-600" />,
      title: "Call Recording & Transcription",
      description: "Automatically record and transcribe all calls for quality assurance and training purposes."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary-600" />,
      title: "Smart Conversation Flow",
      description: "AI adapts conversation flow based on customer responses and handles complex objections naturally."
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary-600" />,
      title: "Appointment Scheduling",
      description: "Automatically book appointments and send calendar invites based on customer availability."
    },
    {
      icon: <FileText className="h-8 w-8 text-primary-600" />,
      title: "Custom Scripts & Templates",
      description: "Create and customize call scripts, email templates, and follow-up sequences for your brand."
    },
    {
      icon: <Settings className="h-8 w-8 text-primary-600" />,
      title: "Workflow Automation",
      description: "Build custom workflows and automations to streamline your entire sales and marketing process."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary-600" />,
      title: "Multi-Channel Outreach",
      description: "Combine voice calls with SMS and email campaigns for maximum reach and engagement."
    }
  ]

  const useCases = [
    {
      title: "Lead Generation",
      description: "Generate qualified leads 24/7 with AI agents that never get tired, never have bad days, and consistently deliver your message."
    },
    {
      title: "Appointment Setting",
      description: "Book more appointments with prospects by having AI agents handle the initial outreach and qualification process."
    },
    {
      title: "Customer Follow-up",
      description: "Automatically follow up with existing customers for renewals, upsells, or satisfaction surveys."
    },
    {
      title: "Event Promotion",
      description: "Promote webinars, events, or product launches with personalized calls that drive attendance."
    },
    {
      title: "Market Research",
      description: "Conduct surveys and gather market intelligence through natural conversations with your target audience."
    },
    {
      title: "Customer Support",
      description: "Provide 24/7 customer support with AI agents that can handle common inquiries and escalate when needed."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Powerful Features for{' '}
            <span className="text-gradient">Modern Businesses</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Everything you need to transform your sales process with AI-powered automation, 
            advanced analytics, and seamless integrations.
          </p>
          <Button
            as={Link}
            to="/demo"
            size="large"
            className="text-lg px-8 py-4"
          >
            See Features in Action
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Core Features That Drive Results
            </h2>
            <p className="text-xl text-gray-600">
              Built for scale, designed for success
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {mainFeatures.map((feature, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0 mr-6">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced Capabilities
            </h2>
            <p className="text-xl text-gray-600">
              Additional features to supercharge your operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
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

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perfect for Every Use Case
            </h2>
            <p className="text-xl text-gray-600">
              See how businesses across industries are using our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {useCase.title}
                </h3>
                <p className="text-gray-600">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Seamless Integrations
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Connect with your existing tools and workflows
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {/* Integration logos would go here - for now using placeholder text */}
            <div className="text-center">
              <div className="bg-gray-200 h-16 w-24 mx-auto rounded mb-2 flex items-center justify-center">
                <span className="text-sm font-medium">Salesforce</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-16 w-24 mx-auto rounded mb-2 flex items-center justify-center">
                <span className="text-sm font-medium">HubSpot</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-16 w-24 mx-auto rounded mb-2 flex items-center justify-center">
                <span className="text-sm font-medium">Jobber</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-16 w-24 mx-auto rounded mb-2 flex items-center justify-center">
                <span className="text-sm font-medium">Zapier</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-16 w-24 mx-auto rounded mb-2 flex items-center justify-center">
                <span className="text-sm font-medium">Slack</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-16 w-24 mx-auto rounded mb-2 flex items-center justify-center">
                <span className="text-sm font-medium">Google</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            See how our features can transform your business. Book a personalized demo today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as={Link}
              to="/demo"
              variant="secondary"
              size="large"
              className="text-lg px-8 py-4"
            >
              Book Free Demo
            </Button>
            <Button
              as={Link}
              to="/signup"
              variant="outline"
              size="large"
              className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-primary-600"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Features