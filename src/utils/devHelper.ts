// Development helper - shows configuration status in console

export function showConfigStatus() {
  if (!import.meta.env?.DEV) return; // Only in development
  
  console.clear();
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #14b8a6');
  console.log('%c🚀 MODERN LIFE - Development Mode', 'color: #14b8a6; font-size: 18px; font-weight: bold');
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #14b8a6');
  console.log('');
  
  // Check configuration
  const hasSupabase = !!import.meta.env?.VITE_SUPABASE_URL;
  const hasConvertKit = !!import.meta.env?.CONVERTKIT_API_KEY;
  const hasAnalytics = !!import.meta.env?.VITE_GA_MEASUREMENT_ID || !!import.meta.env?.VITE_PLAUSIBLE_DOMAIN;
  
  console.log('%cConfiguration Status:', 'font-weight: bold; font-size: 14px');
  console.log('');
  
  // Supabase
  if (hasSupabase) {
    console.log('%c✅ Supabase:', 'color: #10b981; font-weight: bold', 'Connected');
    console.log('   URL:', import.meta.env.VITE_SUPABASE_URL);
  } else {
    console.log('%c⚠️  Supabase:', 'color: #f59e0b; font-weight: bold', 'Not configured (Demo Mode)');
    console.log('%c   Signups will be simulated only', 'color: #64748b; font-style: italic');
  }
  console.log('');
  
  // ConvertKit
  if (hasConvertKit) {
    console.log('%c✅ ConvertKit:', 'color: #10b981; font-weight: bold', 'Connected');
    console.log('   Form ID:', import.meta.env.CONVERTKIT_FORM_ID);
  } else {
    console.log('%c⚠️  ConvertKit:', 'color: #f59e0b; font-weight: bold', 'Not configured');
    console.log('%c   Emails will not be sent', 'color: #64748b; font-style: italic');
  }
  console.log('');
  
  // Analytics
  if (hasAnalytics) {
    console.log('%c✅ Analytics:', 'color: #10b981; font-weight: bold', 'Connected');
    if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.log('   Google Analytics:', import.meta.env.VITE_GA_MEASUREMENT_ID);
    }
    if (import.meta.env.VITE_PLAUSIBLE_DOMAIN) {
      console.log('   Plausible:', import.meta.env.VITE_PLAUSIBLE_DOMAIN);
    }
  } else {
    console.log('%cℹ️  Analytics:', 'color: #64748b; font-weight: bold', 'Not configured (optional)');
  }
  console.log('');
  
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #14b8a6');
  
  // Show what needs to be done
  if (!hasSupabase || !hasConvertKit) {
    console.log('');
    console.log('%c📝 Quick Setup:', 'color: #f59e0b; font-weight: bold; font-size: 14px');
    console.log('');
    
    if (!hasSupabase) {
      console.log('%c1. Set up Supabase:', 'font-weight: bold');
      console.log('   → Visit: https://supabase.com');
      console.log('   → Create project: "modern-life-production"');
      console.log('   → Copy URL and Anon Key to .env.local');
      console.log('   → Run backend/schema.sql in SQL Editor');
      console.log('');
    }
    
    if (!hasConvertKit) {
      console.log('%c2. Set up ConvertKit:', 'font-weight: bold');
      console.log('   → Visit: https://app.convertkit.com/users/signup');
      console.log('   → Create form: "Modern Life Waitlist"');
      console.log('   → Copy Form ID and API Key to .env.local');
      console.log('');
    }
    
    console.log('%cThen restart the dev server: npm run dev', 'color: #14b8a6; font-style: italic');
    console.log('');
    console.log('%cFor detailed instructions, open:', 'color: #64748b');
    console.log('%c→ QUICK_SETUP.md (30 min)', 'color: #3b82f6');
    console.log('%c→ GETTING_STARTED.md (detailed)', 'color: #3b82f6');
    console.log('');
  } else {
    console.log('');
    console.log('%c✨ All set! Ready to collect waitlist signups!', 'color: #10b981; font-weight: bold; font-size: 14px');
    console.log('');
  }
  
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #14b8a6');
  console.log('');
}

// Show on load
if (import.meta.env?.DEV) {
  showConfigStatus();
}
