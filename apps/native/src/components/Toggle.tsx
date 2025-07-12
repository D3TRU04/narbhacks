import React from 'react';
import { Pressable, View, Text } from 'react-native';

type Props = {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  className?: string;
};

export function Toggle({ checked, onChange, label, className = '' }: Props) {
  return (
    <Pressable
      className={`flex-row items-center gap-2 ${className}`}
      onPress={() => onChange(!checked)}
      accessibilityRole="switch"
      accessibilityState={{ checked }}
    >
      <View className={`w-11 h-6 rounded-full ${checked ? 'bg-primary' : 'bg-gray-200'} transition-colors justify-center`}>
        <View className={`w-4 h-4 bg-white rounded-full shadow-md absolute top-1 ${checked ? 'left-6 -translate-x-full' : 'left-1'} transition-transform`} />
      </View>
      {label && <View><Text className="text-sm">{label}</Text></View>}
    </Pressable>
  );
} 