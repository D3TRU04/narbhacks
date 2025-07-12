import React from 'react';

export function Badge({ children, color = 'primary', className = '' }: { children: React.ReactNode; color?: string; className?: string }) {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-black',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-400 text-black',
    error: 'bg-red-500 text-white',
    gray: 'bg-gray-200 text-gray-800',
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colorMap[color] || colorMap.primary} ${className}`}>
      {children}
    </span>
  );
} 