import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Card } from './components/ui/card';
import { Header } from './components/Header';
import { LimitedOfferBanner, LimitedOfferSection } from './components/LimitedOfferBanner';
import { PainPoints } from './components/PainPoints';
import { VoiceCommandInterface } from './components/VoiceCommandInterface';
import { FrequencyPlayer } from './components/FrequencyPlayer';
import { ResearchSection } from './components/ResearchSection';
import { SalesFunnel } from './components/SalesFunnel';
import { HeroSlideshow } from './components/HeroSlideshow';
import { MasteryTiers } from './components/MasteryTiers';
import { CommunityMarketplace } from './components/CommunityMarketplace';
import { Testimonials } from './components/Testimonials';
import { LogoMocks } from './components/LogoMocks';
import { LogoMocks2 } from './components/LogoMocks2';
import { FinalLogo } from './components/FinalLogo';
import { Dashboard } from './components/Dashboard';
import { LoginWelcome } from './components/LoginWelcome';
import { HabitBuilder } from './components/HabitBuilder';
import { WaitlistLanding } from './components/WaitlistLanding';
import { Analytics } from './components/Analytics';
import { SetupBanner } from './components/SetupBanner';
import './utils/devHelper'; // Show config status in console
import { 
  Brain, 
  Heart, 
  Sparkles, 
  Target, 
  TrendingUp,
  Zap,
  Calendar,
  BarChart3,
  Shield,
  Users
} from 'lucide-react';

const USER_DATA_KEY = 'modernlife_user_data';

interface UserData {
  isReturning: boolean;
  completedOnboarding: boolean;
  lastLogin: string;
  email?: string;
}

export default function App() {
  const [showSalesFunnel, setShowSalesFunnel] = useState(false);
  const [viewMode, setViewMode] = useState<'waitlist' | 'login' | 'landing' | 'app' | 'habitBuilder'>('waitlist');
  const [isNewUser, setIsNewUser] = useState(false);

  // Check if user is returning on mount
  useEffect(() => {
    const storedData = localStorage.getItem(USER_DATA_KEY);
    if (storedData) {
      try {
        const userData: UserData = JSON.parse(storedData);
        // User exists in localStorage - they're returning
        setIsNewUser(false);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        setIsNewUser(true);
      }
    } else {
      // No user data - this is a new user
      setIsNewUser(true);
    }
  }, []);

  const handleLogin = (isSignUp: boolean) => {
    if (isSignUp) {
      // New user signing up - show habit builder
      setIsNewUser(true);
      setViewMode('habitBuilder');
    } else {
      // Existing user signing in - check if they completed onboarding
      const storedData = localStorage.getItem(USER_DATA_KEY);
      if (storedData) {
        try {
          const userData: UserData = JSON.parse(storedData);
          if (userData.completedOnboarding) {
            // Go straight to dashboard
            setViewMode('app');
          } else {
            // Complete onboarding first
            setViewMode('habitBuilder');
          }
        } catch (error) {
          setViewMode('habitBuilder');
        }
      } else {
        setViewMode('habitBuilder');
      }
    }
  };

  const handleHabitBuilderComplete = () => {
    // Save user data to localStorage
    const userData: UserData = {
      isReturning: true,
      completedOnboarding: true,
      lastLogin: new Date().toISOString(),
    };
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    setViewMode('app');
  };

  const scrollToFunnel = () => {
    setShowSalesFunnel(true);
    setTimeout(() => {
      document.getElementById('sales-funnel')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Show Waitlist Landing first
  if (viewMode === 'waitlist') {
    return (
      <>
        <SetupBanner />
        <Analytics />
        <WaitlistLanding />
      </>
    );
  }

  // Show Login screen
  if (viewMode === 'login') {
    return <LoginWelcome onLogin={handleLogin} isNewUser={isNewUser} />;
  }

  // Show 21-Day Habit Builder for new users or incomplete onboarding
  if (viewMode === 'habitBuilder') {
    return <HabitBuilder onComplete={handleHabitBuilderComplete} />;
  }

  // Show Dashboard if in app mode
  if (viewMode === 'app') {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-stone-50">
      {/* Sticky Header */}
      <Header />

      {/* Limited Offer Banner - Sticky */}
      <LimitedOfferBanner />

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.1),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(251,146,60,0.08),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-teal-500 hover:bg-teal-600 border-0 text-white">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Modern Life
                </Badge>
                <h1 className="text-white">
                  Navigate Modern Life with Intelligence
                </h1>
                <p className="text-slate-300 text-lg">
                  The unified platform for meditation, sleep, mental health, nutrition, 
                  childcare, and study management—designed for today's world.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-teal-500 hover:bg-teal-600 text-white border-0"
                  onClick={scrollToFunnel}
                >
                  Start Your Free Trial
                  <Zap className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-slate-600 text-slate-200 hover:bg-slate-800"
                  onClick={() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  See How It Works
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-white">15,000+</div>
                  <p className="text-sm text-slate-400">Active Users</p>
                </div>
                <div className="text-center">
                  <div className="text-white">4.9/5</div>
                  <p className="text-sm text-slate-400">User Rating</p>
                </div>
                <div className="text-center">
                  <div className="text-white">89%</div>
                  <p className="text-sm text-slate-400">Success Rate</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-amber-500/10 rounded-2xl blur-3xl" />
              <HeroSlideshow />
            </div>
          </div>
        </div>
      </header>

      {/* Pain Points Section */}
      <PainPoints />

      {/* Limited Offer Section - Full Width */}
      <LimitedOfferSection />

      {/* Mission Statement - Condensed */}
      <section className="py-12 px-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-white">
            AI Manages Logistics. You Master Life.
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Earn your way to premium features through achievements. 
            Share expertise, earn Mastery Points, reduce costs.
          </p>
        </div>
      </section>

      {/* Features Section - Streamlined */}
      <section id="features" className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-slate-900 mb-3">
              Core Features
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Voice Command Interface */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-50 rounded-lg">
                  <Brain className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-slate-900 text-sm">Voice Commands</h3>
                  <p className="text-xs text-slate-600">Hands-free control</p>
                </div>
              </div>
              <VoiceCommandInterface />
            </div>

            {/* Frequency Player */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                  <h3 className="text-slate-900 text-sm">Frequency Therapy</h3>
                  <p className="text-xs text-slate-600">Focus soundscapes</p>
                </div>
              </div>
              <FrequencyPlayer />
            </div>
          </div>

          {/* Additional Features Grid - Icons Only */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-100">
              <Calendar className="w-6 h-6 text-teal-600 mb-2 mx-auto" />
              <h4 className="text-sm text-slate-900">Smart Scheduling</h4>
            </Card>

            <Card className="p-4 text-center bg-gradient-to-br from-slate-50 to-stone-50 border-slate-200">
              <BarChart3 className="w-6 h-6 text-slate-700 mb-2 mx-auto" />
              <h4 className="text-sm text-slate-900">Analytics</h4>
            </Card>

            <Card className="p-4 text-center bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
              <Users className="w-6 h-6 text-amber-600 mb-2 mx-auto" />
              <h4 className="text-sm text-slate-900">Family Sync</h4>
            </Card>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <div id="research">
        <ResearchSection />
      </div>

      {/* Mastery Tiers Section */}
      <div id="mastery-tiers">
        <MasteryTiers />
      </div>

      {/* Community Marketplace */}
      <div id="marketplace">
        <CommunityMarketplace />
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section with Sales Funnel - Simplified */}
      <section className="py-12 px-4 bg-gradient-to-b from-slate-50 to-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-slate-900 mb-3">
              Start Your Mastery Journey
            </h2>
          </div>

          <div id="sales-funnel" className="mb-8">
            <SalesFunnel />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3">
              <Shield className="w-6 h-6 text-teal-600 mx-auto mb-2" />
              <p className="text-xs text-slate-600">Privacy First</p>
            </div>
            <div className="p-3">
              <Zap className="w-6 h-6 text-teal-600 mx-auto mb-2" />
              <p className="text-xs text-slate-600">2-Min Setup</p>
            </div>
            <div className="p-3">
              <Heart className="w-6 h-6 text-teal-600 mx-auto mb-2" />
              <p className="text-xs text-slate-600">24/7 Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Mocks - For Review */}
      <LogoMocks />
      <LogoMocks2 />
      
      {/* Final Logo Design */}
      <FinalLogo />

      {/* Demo App Layer Toggle */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge className="bg-teal-500 border-0 text-white mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Ready to Explore
          </Badge>
          <h2 className="text-white">Experience the Dashboard</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            See how Modern Life brings together all your wellness needs in one intelligent platform.
          </p>
          <Button
            size="lg"
            className="bg-teal-500 hover:bg-teal-600 text-white border-0"
            onClick={() => setViewMode('app')}
          >
            Launch Dashboard Demo
            <Zap className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-teal-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Research</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-teal-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>© 2025 Modern Life. All rights reserved. Built with evidence-based science.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
