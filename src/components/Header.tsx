import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Menu, X, Sparkles } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 120 120" className="w-8 h-8">
              {/* Three Elliptic Rings */}
              <ellipse cx="77" cy="48" rx="22" ry="16" fill="none" stroke={isScrolled ? "#cbd5e1" : "#64748b"} strokeWidth="1.5" opacity="0.6" transform="rotate(-15 77 48)"/>
              <ellipse cx="77" cy="48" rx="16" ry="11" fill="none" stroke={isScrolled ? "#94a3b8" : "#94a3b8"} strokeWidth="1.5" opacity="0.7" transform="rotate(-15 77 48)"/>
              <ellipse cx="77" cy="48" rx="10" ry="7" fill="none" stroke={isScrolled ? "#64748b" : "#cbd5e1"} strokeWidth="1.5" opacity="0.8" transform="rotate(-15 77 48)"/>
              
              {/* ML Letterforms */}
              <rect x="20" y="50" width="4" height="30" fill={isScrolled ? "#0f172a" : "#ffffff"} rx="2"/>
              <rect x="28" y="50" width="4" height="30" fill={isScrolled ? "#0f172a" : "#ffffff"} rx="2"/>
              <path d="M22 55 L26 60 L30 55" stroke={isScrolled ? "#0f172a" : "#ffffff"} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              
              <rect x="40" y="50" width="4" height="30" fill={isScrolled ? "#0f172a" : "#ffffff"} rx="2"/>
              <rect x="40" y="76" width="15" height="4" fill={isScrolled ? "#0f172a" : "#ffffff"} rx="2"/>
              
              {/* Spark/X Element */}
              <path d="M65 45 L70 50 L65 55 M70 50 L75 45 M70 50 L75 55" stroke="#14b8a6" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              
              {/* Dots */}
              <circle cx="85" cy="45" r="2.5" fill="#f59e0b"/>
              <circle cx="88" cy="52" r="1.8" fill="#f59e0b"/>
              <circle cx="82" cy="51" r="1.3" fill="#f59e0b" opacity="0.7"/>
            </svg>
            <span className={`transition-colors ${
              isScrolled ? 'text-slate-900' : 'text-white'
            }`}>
              Modern Life
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('features')}
              className={`text-sm transition-colors ${
                isScrolled 
                  ? 'text-slate-600 hover:text-slate-900' 
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('mastery-tiers')}
              className={`text-sm transition-colors ${
                isScrolled 
                  ? 'text-slate-600 hover:text-slate-900' 
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              Mastery Tiers
            </button>
            <button
              onClick={() => scrollToSection('marketplace')}
              className={`text-sm transition-colors ${
                isScrolled 
                  ? 'text-slate-600 hover:text-slate-900' 
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              Marketplace
            </button>
            <button
              onClick={() => scrollToSection('research')}
              className={`text-sm transition-colors ${
                isScrolled 
                  ? 'text-slate-600 hover:text-slate-900' 
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              Research
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className={`${
                isScrolled 
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' 
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-teal-500 hover:bg-teal-600 text-white border-0"
              onClick={() => scrollToSection('sales-funnel')}
            >
              Start Free
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled 
                ? 'text-slate-900 hover:bg-slate-100' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 bg-white">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('features')}
                className="text-left text-sm text-slate-600 hover:text-slate-900 px-4 py-2 hover:bg-slate-50 rounded-lg"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('mastery-tiers')}
                className="text-left text-sm text-slate-600 hover:text-slate-900 px-4 py-2 hover:bg-slate-50 rounded-lg"
              >
                Mastery Tiers
              </button>
              <button
                onClick={() => scrollToSection('marketplace')}
                className="text-left text-sm text-slate-600 hover:text-slate-900 px-4 py-2 hover:bg-slate-50 rounded-lg"
              >
                Marketplace
              </button>
              <button
                onClick={() => scrollToSection('research')}
                className="text-left text-sm text-slate-600 hover:text-slate-900 px-4 py-2 hover:bg-slate-50 rounded-lg"
              >
                Research
              </button>
              <div className="flex flex-col gap-2 px-4 pt-4 border-t border-slate-200">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="bg-teal-500 hover:bg-teal-600 text-white border-0"
                  onClick={() => scrollToSection('sales-funnel')}
                >
                  Start Free
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
