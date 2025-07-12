"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/common/button";
import { Badge } from "@/components/common/Badge";
import { Toggle } from "@/components/common/Toggle";

const mockLocation = {
  name: "Planet Fitness",
  type: "Gym",
  impact: "+20",
  impactType: "positive",
  alternatives: ["Anytime Fitness", "Local Park", "Yoga Studio"],
};

export default function LocationDetailsPage() {
  const { id } = useParams();
  const [favorite, setFavorite] = useState(false);
  const [avoid, setAvoid] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center bg-muted px-4 py-8">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">{mockLocation.name}</h2>
        <Badge color="primary" className="mb-2">{mockLocation.type}</Badge>
        <div className="mb-4">
          <span className="font-semibold">Impact on Points: </span>
          <Badge color={mockLocation.impactType === "positive" ? "success" : "error"}>{mockLocation.impact}</Badge>
        </div>
        <div className="flex gap-4 mb-4">
          <Toggle checked={favorite} onChange={setFavorite} label="Favorite" />
          <Toggle checked={avoid} onChange={setAvoid} label="Avoid" />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Suggested Alternatives Nearby</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200">
            {mockLocation.alternatives.map((alt) => (
              <li key={alt}>{alt}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 