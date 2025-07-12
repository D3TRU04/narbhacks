"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/common/button";
import { Badge } from "@/components/common/Badge";
import { MapPin, Users, Gift, ArrowRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/common/avatar";

const mockStats = {
  dailyPoints: 120,
  weeklyPoints: 540,
  streak: 7,
  nextReward: 200,
  currentPoints: 120,
};

const leaderboard = [
  { name: "Alice", points: 120, avatar: "/images/profile.png" },
  { name: "Bob", points: 90, avatar: "/images/profile.png" },
  { name: "Charlie", points: 60, avatar: "/images/profile.png" },
];

const recentActivity = [
  { type: "checkin", location: "Planet Fitness", points: 20, time: "2h ago" },
  { type: "reward", reward: "Free Smoothie", points: -100, time: "1d ago" },
  { type: "group", action: "Joined group Wellness Warriors", time: "3d ago" },
];

export default function DashboardPage() {
  return (
    <section className="relative min-h-screen flex flex-col items-center px-4 pb-8">
      {/* Hero/Stats */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-2xl mx-auto rounded-2xl shadow-xl bg-white/90 backdrop-blur-lg p-8 mt-8 mb-8">
        <div className="flex items-center mb-6 gap-3">
          <div className="w-10 h-10 bg-[#0D87E1] rounded-lg flex items-center justify-center">
            <MapPin size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-heading font-bold tracking-tight">Your Dashboard</h1>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-[#A259FF]/20 to-[#BFFF3C]/20 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-[#A259FF]">+{mockStats.dailyPoints}</span>
            <span className="text-xs text-gray-500">Points Today</span>
          </div>
          <div className="bg-gradient-to-br from-[#A259FF]/20 to-[#BFFF3C]/20 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-[#BFFF3C]">{mockStats.streak}🔥</span>
            <span className="text-xs text-gray-500">Day Streak</span>
          </div>
          <div className="bg-gradient-to-br from-[#A259FF]/20 to-[#BFFF3C]/20 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-[#0D87E1]">{mockStats.weeklyPoints}</span>
            <span className="text-xs text-gray-500">Points This Week</span>
          </div>
          <div className="bg-gradient-to-br from-[#A259FF]/20 to-[#BFFF3C]/20 rounded-xl p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-[#0D87E1]">{mockStats.currentPoints}</span>
            <span className="text-xs text-gray-500">Total Points</span>
          </div>
        </div>
        {/* Progress to next reward */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-gray-700">Progress to Next Reward</span>
            <span className="text-xs text-gray-500">{mockStats.currentPoints} / {mockStats.nextReward} pts</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div className="bg-[#0D87E1] h-3 rounded-full" style={{ width: `${(mockStats.currentPoints / mockStats.nextReward) * 100}%` }} layout transition={{ duration: 0.6 }} />
          </div>
        </div>
        {/* Quick Actions */}
        <div className="flex gap-2 mb-6">
          <Button className="flex-1 flex items-center gap-2 justify-center" variant="default">
            <MapPin size={18} /> Check In
          </Button>
          <Button className="flex-1 flex items-center gap-2 justify-center" variant="outline">
            <Gift size={18} /> Rewards
          </Button>
        </div>
        {/* Group Leaderboard Preview */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700">Group Leaderboard</span>
            <Button size="sm" variant="link" className="text-[#0D87E1] p-0 h-auto">View Group <ArrowRight size={16} /></Button>
          </div>
          <ul className="space-y-2">
            {leaderboard.map((m, i) => (
              <li key={m.name} className="flex items-center gap-3">
                <span className="text-lg font-bold w-6 text-right">{i + 1}</span>
                <Avatar className="h-8 w-8"><AvatarImage src={m.avatar} alt={m.name} /><AvatarFallback>{m.name[0]}</AvatarFallback></Avatar>
                <span className="flex-1">{m.name}</span>
                <span className="font-bold text-[#0D87E1]">{m.points} pts</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Recent Activity */}
        <div>
          <span className="font-semibold text-gray-700 mb-2 block">Recent Activity</span>
          <ul className="space-y-2">
            {recentActivity.map((a, i) => (
              <li key={i} className="flex items-center gap-3 text-sm bg-gray-50 rounded-lg px-3 py-2">
                {a.type === "checkin" && <MapPin size={16} className="text-[#0D87E1]" />}
                {a.type === "reward" && <Gift size={16} className="text-[#0D87E1]" />}
                {a.type === "group" && <Users size={16} className="text-[#0D87E1]" />}
                <span className="flex-1">
                  {a.type === "checkin" && <>Checked in at <b>{a.location}</b> (+{a.points} pts)</>}
                  {a.type === "reward" && <>Redeemed <b>{a.reward}</b> ({a.points} pts)</>}
                  {a.type === "group" && <>{a.action}</>}
                </span>
                <span className="text-gray-400">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
} 