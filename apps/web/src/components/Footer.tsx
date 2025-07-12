'use client'

import { Sparkles, Github, Linkedin, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-[#0D87E1] rounded-lg flex items-center justify-center">
                <MapPin size={16} className="text-white" />
              </div>
              <span className="text-lg font-heading">narby</span>
            </div>
            <p className="text-gray-500 mb-4 max-w-md">
              The future of social health. Earn points for healthy actions, check in at gyms and parks, and grow together with friends and groups.
            </p>
            <div className="flex space-x-4">
              {/* <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Twitter size={20} />
              </a> */}
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-500">
              <li><a href="#features" className="hover:text-black transition-colors">Features</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">About</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <div className="text-gray-500 text-sm">
            © 2025 Narby. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-gray-500 mt-4 md:mt-0">
            {/* <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-black transition-colors">Cookie Policy</a> */}
          </div>
        </div>
      </div>
    </footer>
  )
} 