'use client';

import { useEffect } from 'react';

export default function GlobalListeners() {
  useEffect(() => {
    // The browser-specific logic goes here
    const handler = (event:any) => {
      console.error('Globally Unhandled Promise Rejection:', event.reason);
      // Optional: event.preventDefault(); to suppress default browser console error
    };

    window.addEventListener('unhandledrejection', handler);

    // Clean up the listener when the component is removed (unmounts)
    return () => {
      window.removeEventListener('unhandledrejection', handler);
    };
  }, []);

  return null; // This component doesn't render anything visible
}