"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/common/button";
import { Spinner } from "@/components/common/Spinner";
import { ArrowRight, MapPin } from "lucide-react";

const tabs = ["Login", "Sign Up", "Forgot Password"];

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [loginFields, setLoginFields] = useState({ email: "", password: "" });
  const [signupFields, setSignupFields] = useState({ email: "", password: "", username: "", photo: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const router = useRouter();

  // Helper to check if all fields are filled
  const canProceed = () => {
    if (activeTab === "Login") {
      return loginFields.email && loginFields.password;
    } else if (activeTab === "Sign Up") {
      return signupFields.email && signupFields.password && signupFields.username;
    } else if (activeTab === "Forgot Password") {
      return forgotEmail;
    }
    return false;
  };

  // Handle submit: fake loading, then route to dashboard
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-[#A259FF] to-[#BFFF3C]">
      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:40px_40px] z-0"></div>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-xl bg-white/90 backdrop-blur-lg p-8 mt-12 mb-8">
        <div className="flex items-center justify-center mb-8">
          <div className="w-10 h-10 bg-[#0D87E1] rounded-lg flex items-center justify-center mr-3">
            <MapPin size={20} className="text-white" />
          </div>
          <span className="text-2xl font-heading tracking-tight lowercase">narby</span>
        </div>
        <div className="flex justify-center mb-8 gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className="flex-1 text-base font-medium py-3"
            >
              {tab}
            </Button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {activeTab === "Login" && (
            <motion.form
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              <input
                className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#A259FF] text-base"
                placeholder="Email"
                type="email"
                required
                value={loginFields.email}
                onChange={e => setLoginFields(f => ({ ...f, email: e.target.value }))}
              />
              <input
                className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#A259FF] text-base"
                placeholder="Password"
                type="password"
                required
                value={loginFields.password}
                onChange={e => setLoginFields(f => ({ ...f, password: e.target.value }))}
              />
              <Button
                type="submit"
                className="w-full text-lg py-4 flex items-center justify-center gap-2"
                disabled={!canProceed() || loading}
              >
                {loading ? <Spinner /> : (<><span>Login</span><ArrowRight size={20} /></>)}
              </Button>
            </motion.form>
          )}
          {activeTab === "Sign Up" && (
            <motion.form
              key="signup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              <input
                className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#A259FF] text-base"
                placeholder="Email"
                type="email"
                required
                value={signupFields.email}
                onChange={e => setSignupFields(f => ({ ...f, email: e.target.value }))}
              />
              <input
                className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#A259FF] text-base"
                placeholder="Password"
                type="password"
                required
                value={signupFields.password}
                onChange={e => setSignupFields(f => ({ ...f, password: e.target.value }))}
              />
              <input
                className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#A259FF] text-base"
                placeholder="Username"
                type="text"
                required
                value={signupFields.username}
                onChange={e => setSignupFields(f => ({ ...f, username: e.target.value }))}
              />
              <input
                className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#A259FF] text-base"
                placeholder="Profile Photo URL (optional)"
                type="url"
                value={signupFields.photo}
                onChange={e => setSignupFields(f => ({ ...f, photo: e.target.value }))}
              />
              <Button
                type="submit"
                className="w-full text-lg py-4 flex items-center justify-center gap-2"
                disabled={!canProceed() || loading}
              >
                {loading ? <Spinner /> : (<><span>Sign Up</span><ArrowRight size={20} /></>)}
              </Button>
            </motion.form>
          )}
          {activeTab === "Forgot Password" && (
            <motion.form
              key="forgot"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              <input
                className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#A259FF] text-base"
                placeholder="Email"
                type="email"
                required
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
              />
              <Button
                type="submit"
                className="w-full text-lg py-4 flex items-center justify-center gap-2"
                disabled={!canProceed() || loading}
              >
                {loading ? <Spinner /> : (<><span>Send Reset Link</span><ArrowRight size={20} /></>)}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
} 