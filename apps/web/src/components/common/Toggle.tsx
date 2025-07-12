import React from 'react';

export function Toggle({ checked, onChange, label, className = '' }: { checked: boolean; onChange: (v: boolean) => void; label?: string; className?: string }) {
  return (
    <label className={`flex items-center cursor-pointer gap-2 ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary transition-colors"></div>
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform peer-checked:translate-x-5"></div>
      </div>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
} 