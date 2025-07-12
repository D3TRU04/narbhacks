import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'outline' | 'secondary' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

export function Button({ children, onPress, variant = 'primary', loading, disabled, className = '' }: Props) {
  const base = 'px-4 py-3 rounded-xl items-center justify-center';
  const variants: Record<string, string> = {
    primary: 'bg-primary text-white',
    outline: 'border border-primary bg-white text-primary',
    secondary: 'bg-gray-200 text-black',
    danger: 'bg-red-500 text-white',
  };
  return (
    <TouchableOpacity
      className={`${base} ${variants[variant]} ${disabled ? 'opacity-50' : ''} ${className}`}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? <ActivityIndicator color={variant === 'outline' ? '#0D87E1' : '#fff'} /> : <Text className="font-semibold text-base">{children}</Text>}
    </TouchableOpacity>
  );
} 