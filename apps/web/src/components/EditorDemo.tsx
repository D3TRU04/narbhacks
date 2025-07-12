'use client'

import Image from 'next/image'

export function EditorDemo() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">See Narby in Action</h2>
          <p className="text-xl text-gray-500">Check in at healthy locations, track your points, and see your group’s progress—all in a beautiful, mobile-friendly dashboard.</p>
        </div>
        <div className="relative">
          {/* Narby Demo Image */}
          <div className="relative mx-auto max-w-4xl">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              {/* Browser-like header */}
              <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2 border-b border-gray-200">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-lg px-4 py-1 text-sm text-gray-600 text-center">
                    narby.app/dashboard
                  </div>
                </div>
              </div>
              {/* Dashboard Mockup */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 aspect-video relative flex items-center justify-center">
                <Image src="/images/monitor.png" alt="Narby Dashboard Mockup" width={800} height={480} className="rounded-xl shadow-xl border border-primary/10 object-contain" />
              </div>
            </div>
          </div>
          {/* Feature highlights */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#0D87E1] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Location Check-Ins</h3>
              <p className="text-gray-600">Earn points for visiting gyms, parks, and healthy spots</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#0D87E1] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V6a4 4 0 00-8 0v4m12 0a4 4 0 01-8 0m8 0v4a4 4 0 01-8 0v-4" /></svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Group Motivation</h3>
              <p className="text-gray-600">Join groups, share goals, and climb the leaderboard together</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#0D87E1] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Rewards & Progress</h3>
              <p className="text-gray-600">Redeem points for real rewards and see your healthy streaks grow</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 