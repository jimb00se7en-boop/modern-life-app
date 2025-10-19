import { useState } from 'react';
import { AlertCircle, X, CheckCircle, Database, Mail, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { config, isConfigured } from '../config';

export function SetupBanner() {
  const [isVisible, setIsVisible] = useState(true);
  
  // Check if we're in production (Vercel) or development
  const isProduction = import.meta.env?.PROD || false;
  
  // Check configuration status - using config file for Figma Make compatibility
  const hasSupabase = isConfigured.supabase || !!import.meta.env?.VITE_SUPABASE_URL;
  const hasConvertKit = isConfigured.convertkit || !!import.meta.env?.CONVERTKIT_API_KEY;
  const hasAnalytics = isConfigured.analytics || !!import.meta.env?.VITE_GA_MEASUREMENT_ID || !!import.meta.env?.VITE_PLAUSIBLE_DOMAIN;
  
  // If in production and everything is configured, don't show banner
  if (isProduction && hasSupabase) {
    return null;
  }
  
  // If user dismissed the banner, don't show it
  if (!isVisible) {
    return null;
  }
  
  // If Supabase is configured in development, show success banner
  if (hasSupabase) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-medium">✅ Modern Life is configured and ready!</p>
                <p className="text-sm text-teal-50">All services connected. Ready to collect waitlist signups.</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-white hover:bg-teal-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Show setup instructions
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="space-y-3">
              <div>
                <p className="font-medium text-lg">⚙️ Setup Required - Running in Demo Mode</p>
                <p className="text-sm text-amber-50">Configure your environment to start collecting real waitlist signups.</p>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-3">
                {/* Supabase Status */}
                <div className={`p-3 rounded-lg ${hasSupabase ? 'bg-green-500/20' : 'bg-white/10'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Database className="w-4 h-4" />
                    <span className="text-sm font-medium">Supabase</span>
                  </div>
                  <p className="text-xs text-amber-50">
                    {hasSupabase ? '✅ Connected' : '⚠️ Not configured'}
                  </p>
                </div>
                
                {/* ConvertKit Status */}
                <div className={`p-3 rounded-lg ${hasConvertKit ? 'bg-green-500/20' : 'bg-white/10'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm font-medium">Email (ConvertKit)</span>
                  </div>
                  <p className="text-xs text-amber-50">
                    {hasConvertKit ? '✅ Connected' : '⚠️ Not configured'}
                  </p>
                </div>
                
                {/* Analytics Status */}
                <div className={`p-3 rounded-lg ${hasAnalytics ? 'bg-green-500/20' : 'bg-white/10'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-4 h-4" />
                    <span className="text-sm font-medium">Analytics</span>
                  </div>
                  <p className="text-xs text-amber-50">
                    {hasAnalytics ? '✅ Connected' : '⚠️ Optional'}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 text-sm">
                <a 
                  href="/QUICK_SETUP.md" 
                  target="_blank"
                  className="px-3 py-1.5 bg-white text-orange-600 rounded-md hover:bg-orange-50 transition-colors inline-flex items-center gap-1"
                >
                  📖 Quick Setup Guide (30 min)
                </a>
                <a 
                  href="/GETTING_STARTED.md" 
                  target="_blank"
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                >
                  Detailed Guide
                </a>
                <button
                  onClick={() => {
                    console.log('='.repeat(60));
                    console.log('MODERN LIFE SETUP INSTRUCTIONS');
                    console.log('='.repeat(60));
                    console.log('\n1. Create .env.local from .env.example');
                    console.log('2. Sign up for Supabase: https://supabase.com');
                    console.log('3. Sign up for ConvertKit: https://convertkit.com');
                    console.log('4. Add credentials to .env.local');
                    console.log('5. Restart dev server: npm run dev');
                    console.log('\nSee QUICK_SETUP.md for detailed instructions');
                    console.log('='.repeat(60));
                  }}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                >
                  💻 Show in Console
                </button>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-white hover:bg-orange-600 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
