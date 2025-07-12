import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'gray';
  className?: string;
};

export function Badge({ children, color = 'primary', className = '' }: Props) {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary text-white',
    secondary: 'bg-gray-200 text-black',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-400 text-black',
    error: 'bg-red-500 text-white',
    gray: 'bg-gray-200 text-gray-800',
  };
  return (
    <View className={`px-3 py-1 rounded-full ${colorMap[color] || colorMap.primary} ${className}`}>
      <Text className="text-xs font-semibold">{children}</Text>
    </View>
  );
} 