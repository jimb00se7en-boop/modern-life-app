import { useEffect } from 'react';
import { config } from '../config';

// Analytics tracking for Modern Life
export function Analytics() {
  useEffect(() => {
    // Google Analytics 4
    const gaId = import.meta.env?.VITE_GA_MEASUREMENT_ID || config.analytics.googleAnalyticsId;
    if (gaId) {
      // Load GA4 script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script1);

      // Initialize GA4
      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
      document.head.appendChild(script2);
    }

    // Plausible Analytics
    const plausibleDomain = import.meta.env?.VITE_PLAUSIBLE_DOMAIN || config.analytics.plausibleDomain;
    if (plausibleDomain) {
      const script = document.createElement('script');
      script.defer = true;
      script.dataset.domain = plausibleDomain;
      script.src = 'https://plausible.io/js/script.js';
      document.head.appendChild(script);
    }
  }, []);

  return null;
}

// Helper function to track custom events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }

  // Plausible
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(eventName, { props: properties });
  }

  // Console log in development
  if (import.meta.env?.DEV) {
    console.log('📊 Event tracked:', eventName, properties);
  }
};

// Pre-defined tracking functions
export const analytics = {
  pageView: (page: string) => {
    trackEvent('pageview', { page });
  },

  signup: (position: number) => {
    trackEvent('Waitlist Signup', { position });
  },

  referralClick: (code: string) => {
    trackEvent('Referral Link Click', { code });
  },

  ctaClick: (location: string) => {
    trackEvent('CTA Click', { location });
  },

  videoPlay: (videoId: string) => {
    trackEvent('Video Play', { videoId });
  },

  downloadTemplate: (templateId: string) => {
    trackEvent('Template Download', { templateId });
  },
};
