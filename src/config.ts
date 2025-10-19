// Modern Life - Configuration
// This file contains all environment configuration for the application

export const config = {
  // Supabase Configuration
  supabase: {
    url: 'https://mudhnhikrqwaipvrlfle.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11ZGhuaGlrcnF3YWlwdnJsZmxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3OTQ5NTYsImV4cCI6MjA3NjM3MDk1Nn0.13SDj5a76bkjiasp90jPcwNXDY_6aNNaS5B8skH_1BE',
  },

  // ConvertKit Configuration (Optional - for email marketing)
  convertkit: {
    apiKey: '',
    formId: '',
  },

  // Analytics Configuration (Optional)
  analytics: {
    googleAnalyticsId: '',
    plausibleDomain: '',
  },

  // Environment
  environment: 'production',
};

// Helper to check if services are configured
export const isConfigured = {
  supabase: !!config.supabase.url && !!config.supabase.anonKey,
  convertkit: !!config.convertkit.apiKey && !!config.convertkit.formId,
  analytics: !!config.analytics.googleAnalyticsId || !!config.analytics.plausibleDomain,
};
