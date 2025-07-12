'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, MapPin } from 'lucide-react'
import { UserNav } from './common/UserNav'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'pt-4' : 'pt-0'}`}>
      <div
        className={`
          mx-auto
          bg-white/80 backdrop-blur-xl 
          transition-all duration-300
          ${isScrolled 
              ? 'max-w-7xl rounded-full border border-gray-200 shadow-md' 
              : 'max-w-full rounded-none border-b border-gray-200'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#0D87E1] rounded-lg flex items-center justify-center">
                <MapPin size={16} className="text-white" />
              </div>
              <span className="text-lg font-heading lowercase">narby</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {/* Add nav links here if needed */}
            </div>
            <div className="flex items-center space-x-4">
              {/* UserNav with mock data for now */}
              <UserNav image="/images/profile.png" name="Alex Doe" email="alex@narby.app" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
