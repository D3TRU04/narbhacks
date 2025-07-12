'use client'

import { Bot, Users, Gift, Bell, MapPin, Trophy } from 'lucide-react'

const features = [
  {
    icon: MapPin,
    title: 'Check-In Anywhere',
    description: 'Earn points for visiting gyms, parks, and healthy spots. Avoid temptations and track your progress on the go!',
    color: 'from-[#A259FF] to-[#BFFF3C]'
  },
  {
    icon: Users,
    title: 'Group Motivation',
    description: 'Join or create groups, share goals, and climb the leaderboard together. Support and challenge your friends!',
    color: 'from-[#A259FF] to-[#BFFF3C]'
  },
  {
    icon: Gift,
    title: 'Rewards & Progress',
    description: 'Redeem your points for real rewards and see your healthy streaks grow. Celebrate every win!',
    color: 'from-[#A259FF] to-[#BFFF3C]'
  },
  {
    icon: Bell,
    title: 'Value-Based Alerts',
    description: 'Get notified when you’re near places that match your values—or temptations to avoid. Stay on track!',
    color: 'from-[#A259FF] to-[#BFFF3C]'
  },
  {
    icon: Bot,
    title: 'Smart Assistant',
    description: 'Personalized nudges and encouragement to help you stay motivated and celebrate your wins.',
    color: 'from-[#A259FF] to-[#BFFF3C]'
  },
  {
    icon: Trophy,
    title: 'Fun & Social',
    description: 'Compete with friends, join groups, and climb the leaderboard. Healthy habits are better together!',
    color: 'from-[#A259FF] to-[#BFFF3C]'
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">Everything you need for healthy habits</h2>
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
                <h3 className="text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 