"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/common/button";
import { Toggle } from "@/components/common/Toggle";

const values = ["Health", "Growth", "Community", "Fun", "Discipline", "Balance"];
const goals = ["Lose Weight", "Gain Muscle", "Eat Healthier", "Sleep Better", "Reduce Stress"];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted px-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-md">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="welcome" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <h2 className="text-2xl font-bold mb-4">Welcome to Narby!</h2>
              <p className="mb-6">Your journey to healthier habits starts here. Let&apos;s set up your experience.</p>
              <Button className="w-full" onClick={() => setStep(1)}>Get Started</Button>
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key="values" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <h3 className="text-xl font-semibold mb-2">Select your personal values</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {values.map(val => (
                  <Button
                    key={val}
                    variant={selectedValues.includes(val) ? "default" : "outline"}
                    onClick={() => setSelectedValues(v => v.includes(val) ? v.filter(x => x !== val) : [...v, val])}
                  >
                    {val}
                  </Button>
                ))}
              </div>
              <Button className="w-full" onClick={() => setStep(2)} disabled={selectedValues.length === 0}>Next</Button>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="goals" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <h3 className="text-xl font-semibold mb-2">Select your health goals</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {goals.map(goal => (
                  <Button
                    key={goal}
                    variant={selectedGoals.includes(goal) ? "default" : "outline"}
                    onClick={() => setSelectedGoals(g => g.includes(goal) ? g.filter(x => x !== goal) : [...g, goal])}
                  >
                    {goal}
                  </Button>
                ))}
              </div>
              <Button className="w-full" onClick={() => setStep(3)} disabled={selectedGoals.length === 0}>Next</Button>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="group" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <h3 className="text-xl font-semibold mb-2">Create or Join a Group</h3>
              <input className="w-full p-3 rounded border mb-2" placeholder="Group Name" value={groupName} onChange={e => setGroupName(e.target.value)} />
              <textarea className="w-full p-3 rounded border mb-2" placeholder="Description" value={groupDesc} onChange={e => setGroupDesc(e.target.value)} />
              <Button className="w-full mb-2">Create Group</Button>
              <Button className="w-full" variant="outline">Join with Invite Link</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 