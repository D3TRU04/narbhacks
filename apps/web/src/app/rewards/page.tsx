"use client";
import React from "react";
import { Button } from "@/components/common/button";
import { Badge } from "@/components/common/Badge";

const mockRewards = {
  points: 120,
  nextReward: 200,
  rewards: [
    { name: "Free Smoothie", cost: 100 },
    { name: "Gym Pass", cost: 200 },
  ],
};

export default function RewardsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-muted px-4 py-8">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">Rewards</h2>
        <div className="mb-4">
          <span className="font-semibold">Points Earned: </span>
          <Badge color="success">{mockRewards.points}</Badge>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Progress to Next Reward:</span>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div className="bg-primary h-3 rounded-full" style={{ width: `${(mockRewards.points / mockRewards.nextReward) * 100}%` }} />
          </div>
          <span className="text-xs text-gray-500">{mockRewards.points} / {mockRewards.nextReward} pts</span>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Redeem Rewards</h3>
          <div className="flex flex-col gap-2">
            {mockRewards.rewards.map((r) => (
              <Button key={r.name} className="w-full" disabled={mockRewards.points < r.cost}>
                {r.name} ({r.cost} pts)
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 