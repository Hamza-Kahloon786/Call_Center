// website/pricing.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 29,
      period: '/month',
      description: 'Perfect for individuals and small teams getting started',
      features: [
        'Up to 5 team members',
        '10 GB storage',
        'Basic analytics',
        'Email support',
        'Standard integrations',
        'Mobile app access'
      ],
      buttonText: 'Start Free Trial',
      popular: false,
      color: 'bg-white border-gray-200'
    },
    {
      name: 'Professional',
      price: 79,
      period: '/month',
      description: 'Best for growing teams and businesses',
      features: [
        'Up to 25 team members',
        '100 GB storage',
        'Advanced analytics',
        'Priority support',
        'All integrations',
        'Mobile + desktop apps',
        'Custom workflows',
        'API access'
      ],
      buttonText: 'Start Free Trial',
      popular: true,
      color: 'bg-blue-50 border-blue-500 ring-2 ring-blue-500'
    },
    {
      name: 'Enterprise',
      price: 199,
      period: '/month',
      description: 'For large organizations with advanced needs',
      features: [
        'Unlimited team members',
        'Unlimited storage',
        'Advanced analytics + reporting',
        '24/7 dedicated support',
        'All integrations + custom',
        'Full platform access',
        'Advanced security',
        'Custom onboarding',
        'SLA guarantee'
      ],
      buttonText: 'Contact Sales',
      popular: false,
      color: 'bg-white border-gray-200'
    }
  ]

  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
    },
    {
      question: 'Can I change my plan at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, we offer a 14-day free trial for all paid plans. No credit card required.'
    },
    {
      question: 'What happens if I exceed my plan limits?',
      answer: 'We\'ll notify you when you\'re approaching limits and help you upgrade to continue seamlessly.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. All plans include a 14-day free trial.
            No hidden fees, no setup costs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-8 relative ${plan.color} shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {plan.description}
                </p>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 text-lg">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center">
                {plan.name === 'Enterprise' ? (
                  <Link
                    to="/contact"
                    className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 inline-block"
                  >
                    {plan.buttonText}
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 inline-block ${
                      plan.popular
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {plan.buttonText}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Compare All Features
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">
                    Features
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">
                    Starter
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">
                    Professional
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-4 text-gray-900">Team Members</td>
                  <td className="py-4 px-4 text-center text-gray-600">Up to 5</td>
                  <td className="py-4 px-4 text-center text-gray-600">Up to 25</td>
                  <td className="py-4 px-4 text-center text-gray-600">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-900">Storage</td>
                  <td className="py-4 px-4 text-center text-gray-600">10 GB</td>
                  <td className="py-4 px-4 text-center text-gray-600">100 GB</td>
                  <td className="py-4 px-4 text-center text-gray-600">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-900">Analytics</td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-green-500">✓</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-green-500">✓ Advanced</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-green-500">✓ Advanced + Reporting</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-900">API Access</td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-gray-400">✗</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-green-500">✓</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-green-500">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-900">24/7 Support</td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-gray-400">✗</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-gray-400">✗</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-green-500">✓</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using our platform to streamline their workflow.
          </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="inline-block bg-blue-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
            >
              Start Free Trial
            </Link>
            <Link
              to="/contact"
              className="inline-block border border-gray-300 text-gray-700 py-3 px-8 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing