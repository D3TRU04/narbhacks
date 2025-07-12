import React from 'react';
import { ActivityIndicator, View } from 'react-native';

type Props = { className?: string; size?: 'small' | 'large'; color?: string };

export function Spinner({ className = '', size = 'large', color = '#0D87E1' }: Props) {
  return (
    <View className={`items-center justify-center ${className}`}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
} 