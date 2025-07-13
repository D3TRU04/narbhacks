'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'What is Vitalize?',
    answer: 'Vitalize is a modern health app that helps you build better habits with an AI Health Coach, daily place check-ins, and a private memory log.'
  },
  {
    question: 'How does the AI Health Coach work?',
    answer: 'The AI Health Coach gives you instant, personalized feedback and encouragement based on your health goals and the places you visit each day.'
  },
  {
    question: 'What are daily place check-ins?',
    answer: 'You can log any place you visit—restaurants, gyms, parks, and more. This helps you build awareness of your daily routine and choices.'
  },
  {
    question: 'What are health memories?',
    answer: 'Every day, your places and AI chat are saved as a private memory. You can revisit any day, see your progress, and track your healthy streaks.'
  },
  {
    question: 'Is my data private?',
    answer: 'Yes! Your check-ins, chat, and memories are private and only visible to you. Vitalize never sells your data.'
  },
  {
    question: 'Is Vitalize free?',
    answer: 'Yes! Vitalize is free to use. All core features are available to everyone.'
  }
]

export function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-500">Everything you need to know about Vitalize</p>
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