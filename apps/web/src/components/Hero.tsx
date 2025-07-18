'use client'

import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

export function Hero({ isSignedIn = false }: { isSignedIn?: boolean }) {
  return (
    <section className="relative pt-48 pb-24 bg-gradient-to-br from-[#A259FF] to-[#BFFF3C]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="max-w-7xl mx-auto relative text-center z-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-black/5 border border-black/10 text-black/80 text-sm">
            <Sparkles size={16} className="mr-2" />
            AI Health Coach & Daily Memories
          </span>
        </div>
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl mb-6 text-black leading-tight">
            {isSignedIn ? (
              <>
                Welcome Back to Vitalize!<br />
                Track Your Health Journey
              </>
            ) : (
              <>
                Your Health Journey<br />
                Powered by AI
              </>
            )}
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-black/60 mb-8 max-w-3xl mx-auto">
          Vitalize helps you build healthy habits with an AI Health Coach, daily check-ins for places you visit, and a private memory log. Get instant, personalized feedback and track your progress over time—all in a beautiful, modern dashboard.
        </p>
        {!isSignedIn && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/auth" className="px-8 py-4 bg-[#0D87E1] text-white rounded-lg hover:bg-[#0B6FC2] transition-colors flex items-center space-x-2">
              <span>Get Started Free</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
} 