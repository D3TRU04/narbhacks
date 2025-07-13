'use client'

import Image from 'next/image'

export function EditorDemo() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading mb-4">See Vitalize in Action</h2>
          <p className="text-xl text-gray-500">Log your daily places, chat with your AI Health Coach, and revisit your health memories—all in a beautiful, modern dashboard.</p>
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
                    vitalize.app/dashboard
                  </div>
                </div>
              </div>
              {/* Miniature Code-based Dashboard Mockup */}
              <div className="bg-gradient-to-br from-[#A259FF] to-[#BFFF3C] aspect-video relative flex items-center justify-center p-4">
                <div className="w-full max-w-3xl h-64 md:h-80 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-lg flex flex-col md:flex-row overflow-hidden border border-gray-100">
                  {/* Left: Places */}
                  <div className="md:w-1/2 w-full p-4 bg-white/60 backdrop-blur-lg flex flex-col gap-4 min-h-[200px]">
                    <div className="text-base text-[#0D87E1] mb-1">Places You Went Today</div>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between bg-white rounded-lg px-3 py-2 shadow border border-gray-100">
                        <div>
                          <div className="text-[#0D87E1] text-sm">Blue Bottle Coffee</div>
                          <div className="text-gray-500 text-xs">300 Webster St, Oakland</div>
                        </div>
                        <span className="text-gray-300 text-xs">8:30am</span>
                      </li>
                      <li className="flex items-center justify-between bg-white rounded-lg px-3 py-2 shadow border border-gray-100">
                        <div>
                          <div className="text-[#0D87E1] text-sm">Planet Fitness</div>
                          <div className="text-gray-500 text-xs">123 Main St</div>
                        </div>
                        <span className="text-gray-300 text-xs">10:00am</span>
                      </li>
                      <li className="flex items-center justify-between bg-white rounded-lg px-3 py-2 shadow border border-gray-100">
                        <div>
                          <div className="text-[#0D87E1] text-sm">Sweetgreen</div>
                          <div className="text-gray-500 text-xs">456 Market St</div>
                        </div>
                        <span className="text-gray-300 text-xs">12:15pm</span>
                      </li>
                    </ul>
                  </div>
                  {/* Divider */}
                  <div className="hidden md:block w-px bg-gray-100" />
                  {/* Right: AI Health Coach */}
                  <div className="md:w-1/2 w-full p-4 bg-white/60 backdrop-blur-lg flex flex-col gap-4 justify-between h-full">
                    <div className="text-base text-[#A259FF] mb-1">AI Health Coach</div>
                    <div className="flex flex-col gap-3 overflow-y-auto max-h-full h-full rounded-lg bg-white/80 p-4 shadow-inner border border-gray-100 mt-0">
                      <div className="flex justify-end">
                        <div className="rounded-xl px-3 py-2 max-w-xs shadow bg-[#0D87E1]/90 text-white font-normal text-xs">My goal is to eat healthier and move more.</div>
                      </div>
                      <div className="flex justify-start">
                        <div className="rounded-xl px-3 py-2 max-w-xs shadow bg-[#E6F0FA] text-[#2D1A47] font-normal text-xs">Great goal! Visiting Sweetgreen is a healthy choice. Keep up the activity at Planet Fitness!</div>
                      </div>
                      <div className="flex justify-end">
                        <div className="rounded-xl px-3 py-2 max-w-xs shadow bg-[#0D87E1]/90 text-white font-normal text-xs">How did I do today?</div>
                      </div>
                      <div className="flex justify-start">
                        <div className="rounded-xl px-3 py-2 max-w-xs shadow bg-[#E6F0FA] text-[#2D1A47] font-normal text-xs">You made great choices! Try to add a walk after lunch for even more benefits.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Feature highlights */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#0D87E1] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="text-lg font-heading font-semibold mb-2">Daily Place Check-Ins</h3>
              <p className="text-gray-600">Log the places you visit each day and build awareness of your routine.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#0D87E1] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V6a4 4 0 00-8 0v4m12 0a4 4 0 01-8 0m8 0v4a4 4 0 01-8 0v-4" /></svg>
              </div>
              <h3 className="text-lg font-heading font-semibold mb-2">AI Health Coach</h3>
              <p className="text-gray-600">Chat with your AI coach for instant, personalized feedback and encouragement.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#0D87E1] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-lg font-heading font-semibold mb-2">Health Memories</h3>
              <p className="text-gray-600">Revisit any day’s places and AI chat. Track your progress and see your healthy streaks grow.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 