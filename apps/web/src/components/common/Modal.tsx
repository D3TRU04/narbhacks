import React from 'react';

export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 min-w-[300px] relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white">&times;</button>
        {children}
      </div>
    </div>
  );
} 