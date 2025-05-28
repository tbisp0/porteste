import React, { useEffect, useState } from 'react';

/**
 * LazyScripts Component
 * Loads third-party scripts only when needed to reduce initial bundle size
 */

interface LazyScriptsProps {
  enableAnalytics?: boolean;
  enableGTM?: boolean;
  enableClarity?: boolean;
  delay?: number;
}

const LazyScripts: React.FC<LazyScriptsProps> = ({
  enableAnalytics = true,
  enableGTM = true,
  enableClarity = true,
  delay = 3000 // 3 seconds delay
}) => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    // Only load scripts in production
    if (!import.meta.env.PROD) {
      return;
    }

    // Delay script loading to improve initial page load
    const timer = setTimeout(() => {
      loadScripts();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const loadScripts = async () => {
    try {
      // Load scripts in sequence to avoid blocking
      if (enableAnalytics) {
        await loadGoogleAnalytics();
      }

      if (enableGTM) {
        await loadGoogleTagManager();
      }

      if (enableClarity) {
        await loadMicrosoftClarity();
      }

      setScriptsLoaded(true);
      console.log('Third-party scripts loaded successfully');
    } catch (error) {
      console.warn('Failed to load some third-party scripts:', error);
    }
  };

  const loadGoogleAnalytics = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (window.gtag) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-3QCW5SKK73';
      script.onload = () => {
        // Initialize Google Analytics
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer.push(args);
        }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'G-3QCW5SKK73', {
          page_title: document.title,
          page_location: window.location.href
        });
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const loadGoogleTagManager = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (window.google_tag_manager) {
        resolve();
        return;
      }

      // GTM script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-M2NFRBD9';
      script.onload = () => {
        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js'
        });
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);

      // GTM noscript fallback
      const noscript = document.createElement('noscript');
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-M2NFRBD9';
      iframe.height = '0';
      iframe.width = '0';
      iframe.style.display = 'none';
      iframe.style.visibility = 'hidden';
      noscript.appendChild(iframe);
      document.body.appendChild(noscript);
    });
  };

  const loadMicrosoftClarity = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (window.clarity) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.clarity.ms/tag/rp64ayubme';
      script.onload = () => {
        // Initialize Clarity
        (function(c: any, l: any, a: any, r: any, i: any, t: any, y: any) {
          c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments) };
          t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
          y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", "rp64ayubme");
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  // Don't render anything visible
  return null;
};

// Extend window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    google_tag_manager: any;
    clarity: (...args: any[]) => void;
  }
}

export default LazyScripts;
