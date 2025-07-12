"use client";
import React from "react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/button";

const mockGroup = {
  name: "Wellness Warriors",
  description: "A group focused on healthy living and mutual support.",
  members: [
    { name: "Alice", points: 120 },
    { name: "Bob", points: 90 },
    { name: "Charlie", points: 60 },
  ],
  values: ["Health", "Community"],
  goals: ["Lose Weight", "Eat Healthier"],
  inviteLink: "https://narby.app/invite/abc123",
};

export default function GroupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-muted px-4 py-8">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">{mockGroup.name}</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">{mockGroup.description}</p>
        <div className="mb-4">
          <span className="font-semibold">Shared Values: </span>
          {mockGroup.values.map((val) => <Badge key={val} className="mr-2">{val}</Badge>)}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Group Goals: </span>
          {mockGroup.goals.map((goal) => <Badge key={goal} color="secondary" className="mr-2">{goal}</Badge>)}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Leaderboard</h3>
          <ol className="list-decimal pl-6">
            {mockGroup.members.map((m, i) => (
              <li key={m.name} className="flex justify-between"><span>{m.name}</span><span className="font-bold">{m.points} pts</span></li>
            ))}
          </ol>
        </div>
        <div className="mb-2">
          <Button className="w-full mb-2">Invite Members (Share Link)</Button>
          <Button className="w-full" variant="outline">Show QR Code</Button>
        </div>
        <div className="text-xs text-gray-400 mt-2">Invite link: {mockGroup.inviteLink}</div>
      </div>
    </div>
  );
} 