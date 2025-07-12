'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'What is Narby?',
    answer: 'Narby is a social health app that motivates you to make better choices, earn points for healthy actions, and grow together with friends and groups.'
  },
  {
    question: 'How do I earn points?',
    answer: 'Check in at gyms, parks, or healthy locations. Avoid fast food or temptations to keep your streak!'
  },
  {
    question: 'Can I join with friends?',
    answer: 'Absolutely! Create or join groups, share goals, and climb the leaderboard together.'
  },
  {
    question: 'What can I redeem points for?',
    answer: 'Points can be redeemed for real rewards, discounts, or group perks (coming soon).'
  },
  {
    question: 'Is Narby free?',
    answer: 'Yes! Narby is free to use. Premium features and rewards are coming soon.'
  },
  {
    question: 'Is my location data secure?',
    answer: 'Your check-ins and location data are private and never sold. You control what you share with your groups.'
  }
]

export function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-500">Everything you need to know about Narby</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <span>{faq.question}</span>
                {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openFaq === index && (
                <div className="px-6 pt-2 pb-4">
                  <p className="text-gray-500 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 