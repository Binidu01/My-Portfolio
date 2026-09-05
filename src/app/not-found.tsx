// src/app/not-found.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f0ede8] flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        {/* 404 Number */}
        <h1 className="text-[150px] md:text-[250px] font-bold leading-none tracking-tight" style={{ color: '#111111' }}>
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-3" style={{ color: '#111111' }}>
          Page not found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Back to Home Button */}
        <Link to="/">
          <button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-black hover:bg-black hover:text-white transition-colors font-medium"
          >
            Go Home
          </button>
        </Link>

        {/* Footer */}
        <div className="mt-12 text-sm text-gray-400">
          <span>© 2026 Binidu Ranasinghe</span>
        </div>
      </div>
    </div>
  );
}