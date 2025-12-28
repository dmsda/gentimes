'use client';

import { useEffect, useState } from 'react';

/**
 * ReadingProgress Component
 * 
 * A lightweight reading progress indicator that shows scroll position.
 * Uses CSS transforms for GPU-accelerated animation (no layout shifts).
 * 
 * Design Decision: Fixed to top of viewport, thin bar that doesn't 
 * distract from content but provides clear progress feedback.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollProgress, 100));
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div 
      className="fixed left-0 right-0 top-0 z-50 h-1 bg-neutral-800"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-transform duration-75 ease-out"
        style={{ 
          transform: `scaleX(${progress / 100})`,
          transformOrigin: 'left'
        }}
      />
    </div>
  );
}
