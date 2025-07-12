import React, { useState, useContext, createContext } from 'react';
import { View, Text, TextInput, Switch } from 'react-native';
import { MotiView } from 'moti';
import { Button } from '../components/Button';
import { Toggle } from '../components/Toggle';

// Dark mode context
const DarkModeContext = createContext({ dark: false, setDark: (v: boolean) => {} });

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  React.useEffect(() => {
    // NativeWind dark mode
    if (dark) {
      document?.documentElement?.classList?.add('dark');
    } else {
      document?.documentElement?.classList?.remove('dark');
    }
  }, [dark]);
  return <DarkModeContext.Provider value={{ dark, setDark }}>{children}</DarkModeContext.Provider>;
}

export default function SettingsScreen() {
  const [alerts, setAlerts] = useState(true);
  const { dark, setDark } = useDarkMode?.() || { dark: false, setDark: () => {} };
  return (
    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 items-center bg-muted px-4 py-8">
      <View className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
        <Text className="text-2xl font-bold mb-4">Settings</Text>
        <View className="mb-4">
          <Text className="font-semibold mb-2">Edit Profile</Text>
          <TextInput className="w-full p-3 rounded border mb-2" placeholder="Username" />
          <TextInput className="w-full p-3 rounded border mb-2" placeholder="Email" keyboardType="email-address" />
          <TextInput className="w-full p-3 rounded border mb-2" placeholder="Profile Photo URL" />
          <Button className="w-full mb-2">Save Changes</Button>
        </View>
        <View className="mb-4">
          <Text className="font-semibold mb-2">Manage Values & Goals</Text>
          <Button className="w-full mb-2" variant="outline">Edit Values</Button>
          <Button className="w-full" variant="outline">Edit Goals</Button>
        </View>
        <View className="mb-4">
          <Text className="font-semibold mb-2">Notification Preferences</Text>
          <Toggle checked={alerts} onChange={setAlerts} label="Value-based Alerts" />
        </View>
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="font-semibold">Dark Mode</Text>
          <Switch value={dark} onValueChange={setDark} />
        </View>
        <Button className="w-full mt-4" variant="danger">Logout</Button>
      </View>
    </MotiView>
  );
} 