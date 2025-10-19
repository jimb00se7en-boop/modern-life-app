import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Sparkles, Mail, Lock, ArrowRight, UserPlus } from 'lucide-react';

interface LoginWelcomeProps {
  onLogin: (isSignUp: boolean) => void;
  isNewUser: boolean;
}

export function LoginWelcome({ onLogin, isNewUser }: LoginWelcomeProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const dailyInspirations = [
    {
      quote: "Progress, not perfection. Every small step forward counts.",
      author: "Modern Life Philosophy"
    },
    {
      quote: "Your future self is watching. Make them proud today.",
      author: "Daily Wisdom"
    },
    {
      quote: "Balance is not something you find, it's something you create.",
      author: "Modern Life"
    },
    {
      quote: "The best time to start was yesterday. The second best time is now.",
      author: "Ancient Proverb"
    },
    {
      quote: "Small daily improvements lead to stunning long-term results.",
      author: "Modern Life Community"
    }
  ];

  // Select inspiration based on day of week
  const today = new Date().getDay();
  const todayInspiration = dailyInspirations[today % dailyInspirations.length];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(isSignUpMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(251,146,60,0.1),transparent_50%)]" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative max-w-5xl w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding & Inspiration */}
          <div className="text-center lg:text-left space-y-8">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <svg viewBox="0 0 120 120" className="w-32 h-32">
                  {/* Three Elliptic Rings */}
                  <ellipse cx="77" cy="48" rx="22" ry="16" fill="none" stroke="#64748b" strokeWidth="1.5" opacity="0.6" transform="rotate(-15 77 48)"/>
                  <ellipse cx="77" cy="48" rx="16" ry="11" fill="none" stroke="#94a3b8" strokeWidth="1.5" opacity="0.7" transform="rotate(-15 77 48)"/>
                  <ellipse cx="77" cy="48" rx="10" ry="7" fill="none" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.8" transform="rotate(-15 77 48)"/>
                  
                  {/* ML Letterforms */}
                  <rect x="20" y="50" width="4" height="30" fill="#ffffff" rx="2"/>
                  <rect x="28" y="50" width="4" height="30" fill="#ffffff" rx="2"/>
                  <path d="M22 55 L26 60 L30 55" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  
                  <rect x="40" y="50" width="4" height="30" fill="#ffffff" rx="2"/>
                  <rect x="40" y="76" width="15" height="4" fill="#ffffff" rx="2"/>
                  
                  {/* Spark/X Element */}
                  <path d="M65 45 L70 50 L65 55 M70 50 L75 45 M70 50 L75 55" stroke="#14b8a6" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  
                  {/* Dots */}
                  <circle cx="85" cy="45" r="2.5" fill="#f59e0b"/>
                  <circle cx="88" cy="52" r="1.8" fill="#f59e0b"/>
                  <circle cx="82" cy="51" r="1.3" fill="#f59e0b" opacity="0.7"/>
                </svg>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-amber-500/20 rounded-full blur-2xl -z-10" />
              </div>
            </div>

            <div className="space-y-4">
              <Badge className="bg-teal-500/20 border border-teal-500/30 text-teal-300">
                <Sparkles className="w-3 h-3 mr-1" />
                Modern Life
              </Badge>
              
              <h1 className="text-white">
                {isSignUpMode ? 'Start Your Journey' : 'Welcome Back'}
              </h1>
              
              <p className="text-slate-300 text-lg">
                {isSignUpMode 
                  ? 'Join thousands mastering modern life with AI-powered wellness tools.'
                  : 'Navigate modern life with intelligence. Your wellness journey continues here.'}
              </p>
            </div>

            {/* Daily Inspiration */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-teal-400 mb-1">Today's Inspiration</p>
                  <p className="text-white italic mb-2">"{todayInspiration.quote}"</p>
                  <p className="text-xs text-slate-400">— {todayInspiration.author}</p>
                </div>
              </div>
            </Card>

            {/* Stats Preview */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl text-white mb-1">15K+</p>
                <p className="text-xs text-slate-400">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-white mb-1">4.9/5</p>
                <p className="text-xs text-slate-400">User Rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-white mb-1">89%</p>
                <p className="text-xs text-slate-400">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <Card className="p-8 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-white mb-2">
                  {isSignUpMode ? 'Create Account' : 'Sign In'}
                </h2>
                <p className="text-slate-300 text-sm">
                  {isSignUpMode 
                    ? 'Begin your 21-day transformation' 
                    : 'Continue your wellness journey'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="sarah@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input type="checkbox" className="rounded border-white/20 bg-white/10" />
                    <span>Remember me</span>
                  </label>
                  <button type="button" className="text-teal-400 hover:text-teal-300 transition-colors">
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-0 h-12"
                >
                  {isSignUpMode ? (
                    <>
                      Create Account & Start 21-Day Journey
                      <UserPlus className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-transparent text-slate-400">Or continue with</span>
                </div>
              </div>

              {/* Quick Demo Access */}
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                  onClick={() => onLogin(isSignUpMode)}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {isSignUpMode ? 'Sign Up' : 'Sign In'} with Google
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
                  onClick={() => onLogin(true)}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Quick Demo (Try Without Sign Up)
                </Button>
              </div>

              <p className="text-center text-sm text-slate-400">
                {isSignUpMode ? (
                  <>
                    Already have an account?{' '}
                    <button 
                      onClick={() => setIsSignUpMode(false)}
                      className="text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      Sign in
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{' '}
                    <button 
                      onClick={() => setIsSignUpMode(true)}
                      className="text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      Sign up for free
                    </button>
                  </>
                )}
              </p>
            </div>
          </Card>
        </div>

        {/* Bottom Feature Highlights */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xs text-slate-300">Achievement-Based Unlocks</p>
          </div>
          <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-xs text-slate-300">AI-Powered Scheduling</p>
          </div>
          <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-xs text-slate-300">Community Marketplace</p>
          </div>
          <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-xs text-slate-300">6 Wellness Hubs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
