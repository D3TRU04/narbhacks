'use client'

import { Bot, Users, Gift, Bell, MapPin, Trophy } from 'lucide-react'

const features = [
  {
    icon: MapPin,
    title: 'Daily Place Check-Ins',
    description: 'Easily log the places you visit each day—restaurants, gyms, parks, and more. Build awareness of your daily routine.',
    color: 'from-[#A259FF] to-[#BFFF3C]'
  },
  {
    icon: Bot,
    title: 'AI Health Coach',
    description: 'Get instant, personalized feedback and encouragement from an AI coach based on your health goals and places you visit.',
    color: 'from-[#A259FF] to-[#BFFF3C]'
  },
  {
    icon: Gift,
    title: 'Private Health Memories',
    description: 'Your daily places and AI conversations are saved as private memories. Revisit any day, track your progress, and see your healthy streaks grow.',
    color: 'from-[#A259FF] to-[#BFFF3C]'
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading mb-4">Everything you need for healthy habits</h2>
          <p className="text-xl text-gray-500">Powerful social and location-based tools that work the way you live</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="w-12 h-12 bg-[#0D87E1] rounded-xl flex items-center justify-center mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-heading mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 