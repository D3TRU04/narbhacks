"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/common/button";
import { Spinner } from "@/components/common/Spinner";
import { Sparkles, ArrowRight, MapPin } from "lucide-react";
import { SignIn, SignUp } from "@clerk/nextjs";
import { Header } from "@/components/Header";
import { useSearchParams } from "next/navigation";

const tabs = ["Login", "Sign Up", "Forgot Password"];

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode");
  const defaultTab = mode === "signup" ? "Sign Up" : mode === "login" ? "Login" : "Login";
  const [activeTab, setActiveTab] = React.useState(defaultTab);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Keep activeTab in sync with the mode query param
  React.useEffect(() => {
    if (mode === "signup" && activeTab !== "Sign Up") setActiveTab("Sign Up");
    if (mode === "login" && activeTab !== "Login") setActiveTab("Login");
  }, [mode]);

  // Handler for successful sign in or sign up
  const handleAuthSuccess = () => {
    setError(null);
    setLoading(true);
    // Always redirect to dashboard
    router.push("/dashboard");
  };

  // Handler for Clerk errors
  const handleAuthError = (err: any) => {
    setLoading(false);
    // Clerk error messages are often in err.errors[0].message
    if (err?.errors && err.errors.length > 0) {
      setError(err.errors[0].message);
    } else if (typeof err === "string") {
      setError(err);
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#A259FF] to-[#BFFF3C] px-4 py-14 sm:py-20">
      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:40px_40px] z-0"></div>
      <Header
        googleMapsKey=""
        setGoogleMapsKey={() => {}}
        openaiKey=""
        setOpenaiKey={() => {}}
      />
      <div className="relative z-10 w-full flex flex-col items-center mt-20 mb-12">
        {error && (
          <div className="mb-4 w-full max-w-md bg-red-100 text-red-700 rounded-lg px-4 py-3 text-center text-sm font-medium">
            {error}
          </div>
        )}
        <div className="mb-4 w-full max-w-md">
          <div className={activeTab === "Login" ? "block" : "hidden"}>
            <SignIn
              key="sign-in"
              appearance={{
                elements: {
                  formButtonPrimary: "bg-[#0D87E1] hover:bg-[#0B6FC2] text-white font-heading text-lg rounded-lg py-3 transition-colors w-full",
                  card: "shadow-none bg-transparent p-0",
                  headerTitle: "font-heading text-3xl text-[#2D1A47] mb-2",
                  headerSubtitle: "text-base text-gray-500 mb-6",
                  socialButtonsBlockButton: "bg-[#A259FF] text-white hover:bg-[#7F5CFF] font-heading rounded-lg py-3 mb-2",
                  dividerText: "text-gray-400",
                  formFieldInput: "rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#A259FF] text-base py-3",
                  formFieldLabel: "font-medium text-gray-700 mb-1",
                  footerAction: "text-sm text-gray-500 mt-6",
                  identityPreview: "rounded-lg border border-gray-200",
                },
              }}
              signUpUrl="/auth?mode=signup"
              redirectUrl="/dashboard"
            />
          </div>
          <div className={activeTab === "Sign Up" ? "block" : "hidden"}>
            <SignUp
              key="sign-up"
              appearance={{
                elements: {
                  formButtonPrimary: "bg-[#0D87E1] hover:bg-[#0B6FC2] text-white font-heading text-lg rounded-lg py-3 transition-colors w-full",
                  card: "shadow-none bg-transparent p-0",
                  headerTitle: "font-heading text-3xl text-[#2D1A47] mb-2",
                  headerSubtitle: "text-base text-gray-500 mb-6",
                  socialButtonsBlockButton: "bg-[#A259FF] text-white hover:bg-[#7F5CFF] font-heading rounded-lg py-3 mb-2",
                  dividerText: "text-gray-400",
                  formFieldInput: "rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#A259FF] text-base py-3",
                  formFieldLabel: "font-medium text-gray-700 mb-1",
                  footerAction: "text-sm text-gray-500 mt-6",
                  identityPreview: "rounded-lg border border-gray-200",
                },
              }}
              signInUrl="/auth?mode=login"
              redirectUrl="/dashboard"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 