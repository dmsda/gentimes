'use client';

import { useEffect } from 'react';

/**
 * Service Worker Registration Component
 * 
 * Include this in your root layout to register the service worker
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration.scope);
        })
        .catch((error) => {
          console.error('SW registration failed:', error);
        });
    }
  }, []);

  return null;
}

/**
 * Install Prompt Component
 * 
 * Shows install button for PWA
 */
export function InstallPrompt() {
  useEffect(() => {
    let deferredPrompt: any = null;

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      // Show install button (can be customized)
      console.log('PWA install available');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  return null;
}
