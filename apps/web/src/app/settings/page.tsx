"use client";
import React, { useState } from "react";
import { Button } from "@/components/common/button";
import { Toggle } from "@/components/common/Toggle";
import { useUser } from "@clerk/nextjs";

export default function SettingsPage() {
  const [alerts, setAlerts] = useState(true);
  const { user, isSignedIn } = useUser();
  return (
    <div className="min-h-screen flex flex-col items-center bg-muted px-4 py-8">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Edit Profile</h3>
          <input className="w-full p-3 rounded border mb-2" placeholder="Username" value={user?.username || ""} readOnly />
          <input className="w-full p-3 rounded border mb-2" placeholder="Email" type="email" value={user?.primaryEmailAddress?.emailAddress || ""} readOnly />
          <input className="w-full p-3 rounded border mb-2" placeholder="Profile Photo URL" type="url" value={user?.imageUrl || ""} readOnly />
          {/* TODO: Add Clerk profile update logic here */}
          <Button className="w-full mb-2" disabled>Save Changes</Button>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Manage Values & Goals</h3>
          <Button className="w-full mb-2" variant="outline">Edit Values</Button>
          <Button className="w-full" variant="outline">Edit Goals</Button>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Notification Preferences</h3>
          <Toggle checked={alerts} onChange={setAlerts} label="Value-based Alerts" />
        </div>
        <Button className="w-full mt-4" variant="destructive">Logout</Button>
      </div>
    </div>
  );
} 