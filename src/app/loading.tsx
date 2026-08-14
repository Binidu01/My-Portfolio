// src/app/loading.tsx
import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f0ede8] flex items-center justify-center">
      {/* Spinner only */}
      <div className="relative w-12 h-12">
        <div 
          className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: '#111111', borderTopColor: 'transparent' }}
        />
      </div>
    </div>
  );
}