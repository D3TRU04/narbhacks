'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Sparkles, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { UserNav } from './common/UserNav'
import { useUser } from "@clerk/nextjs";

function useOpenAIKeyValidation(key: string) {
  const [valid, setValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!key) { setValid(null); return; }
    if (!key.startsWith('sk-') || key.length < 40) { setValid(false); return; }
    setLoading(true);
    fetch('https://api.openai.com/v1/models', {
      headers: { Authorization: `Bearer ${key}` }
    })
      .then(res => setValid(res.status === 200))
      .catch(() => setValid(false))
      .finally(() => setLoading(false));
  }, [key]);
  return { valid, loading };
}

function useGoogleMapsKeyValidation(key: string) {
  const [valid, setValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  useEffect(() => {
    if (!key) { setValid(null); return; }
    if (key.length < 35) { setValid(false); return; }
    setLoading(true);
    // Remove previous script
    if (scriptRef.current) {
      document.body.removeChild(scriptRef.current);
      scriptRef.current = null;
    }
    // Add new script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
    script.async = true;
    script.onerror = () => { setValid(false); setLoading(false); };
    script.onload = () => {
      setTimeout(() => {
        if ((window as any).google && (window as any).google.maps) {
          setValid(true);
        } else {
          setValid(false);
        }
        setLoading(false);
      }, 500);
    };
    document.body.appendChild(script);
    scriptRef.current = script;
    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, [key]);
  return { valid, loading };
}

export function Header({
  googleMapsKey,
  setGoogleMapsKey,
  openaiKey,
  setOpenaiKey,
}: {
  googleMapsKey: string;
  setGoogleMapsKey: (v: string) => void;
  openaiKey: string;
  setOpenaiKey: (v: string) => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openaiStatus = useOpenAIKeyValidation(openaiKey);
  const mapsStatus = useGoogleMapsKeyValidation(googleMapsKey);
  const bothValid = openaiStatus.valid && mapsStatus.valid;

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
              <Link href="/" className="text-lg font-heading hover:underline focus:underline transition-colors">Vitalize</Link>
                </div>
            <div className="hidden md:flex items-center space-x-8">
              {/* Add nav links here if needed */}
                    </div>
            <div className="flex items-center gap-2 md:gap-4">
              {isSignedIn && (
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
                  <div className="flex flex-row items-center w-64 md:w-96 gap-2">
                    <label className="text-xs text-gray-700 whitespace-nowrap">Google Maps API Key</label>
                    <input
                      type="text"
                      value={googleMapsKey}
                      onChange={e => setGoogleMapsKey(e.target.value)}
                      placeholder="Google Maps API Key"
                      className={`rounded-lg border ${mapsStatus.valid === false ? 'border-red-400' : 'border-gray-200'} px-2 py-1 text-xs md:text-sm focus:ring-2 focus:ring-[#A259FF] bg-white/70 backdrop-blur-md placeholder:text-gray-400 w-full transition-all`}
                      style={{ minWidth: 0 }}
                    />
                    {mapsStatus.loading ? <Loader2 className="w-4 h-4 animate-spin text-gray-400" /> : mapsStatus.valid === true ? <CheckCircle className="w-4 h-4 text-green-500" /> : mapsStatus.valid === false ? <AlertCircle className="w-4 h-4 text-red-500" /> : null}
                  </div>
                  <div className="flex flex-row items-center w-64 md:w-96 gap-2">
                    <label className="text-xs text-gray-700 whitespace-nowrap">OpenAI API Key</label>
                    <input
                      type="text"
                      value={openaiKey}
                      onChange={e => setOpenaiKey(e.target.value)}
                      placeholder="OpenAI API Key"
                      className={`rounded-lg border ${openaiStatus.valid === false ? 'border-red-400' : 'border-gray-200'} px-2 py-1 text-xs md:text-sm focus:ring-2 focus:ring-[#A259FF] bg-white/70 backdrop-blur-md placeholder:text-gray-400 w-full transition-all`}
                      style={{ minWidth: 0 }}
                    />
                    {openaiStatus.loading ? <Loader2 className="w-4 h-4 animate-spin text-gray-400" /> : openaiStatus.valid === true ? <CheckCircle className="w-4 h-4 text-green-500" /> : openaiStatus.valid === false ? <AlertCircle className="w-4 h-4 text-red-500" /> : null}
                  </div>
                </div>
              )}
              {!isSignedIn && (
                <Link href="/auth" className="px-6 py-2 bg-[#0D87E1] text-white rounded-lg hover:bg-[#0B6FC2] transition-colors font-heading">
                      Get Started
                    </Link>
              )}
              {/* UserNav with real user data */}
              {isSignedIn && user && (
                <div className="ml-4 md:ml-6">
                  <UserNav
                    image={user.imageUrl || "/images/profile.png"}
                    name={user.fullName || user.username || user.primaryEmailAddress?.emailAddress || "User"}
                    email={user.primaryEmailAddress?.emailAddress || ""}
                  />
                </div>
              )}
            </div>
          </div>
              </div>
            </div>
    </nav>
  )
}
