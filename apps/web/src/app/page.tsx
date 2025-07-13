'use client'

import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Faq } from '@/components/Faq';
import { EditorDemo } from '@/components/EditorDemo';
import { Cta } from '@/components/Cta';
import { useUser } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn } = useUser();
  return (
    <>
      <Header
        googleMapsKey=""
        setGoogleMapsKey={() => {}}
        openaiKey=""
        setOpenaiKey={() => {}}
      />
      <Hero isSignedIn={isSignedIn} />
      <Features />
      <EditorDemo />
      <Faq />
      <Cta />
      <Footer />
    </>
  )
}
