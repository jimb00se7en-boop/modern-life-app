import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Clock, Zap, Trophy, Target } from 'lucide-react';

export function LimitedOfferBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 47,
    minutes: 23,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToSignup = () => {
    document.getElementById('sales-funnel')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="sticky top-16 z-40 px-4 py-3 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Offer Details */}
          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
            <Badge className="bg-amber-500 hover:bg-amber-600 border-0 text-white shrink-0">
              <Zap className="w-3 h-3 mr-1" />
              Limited Launch Offer
            </Badge>
            <p className="text-white text-sm">
              <span className="hidden sm:inline">Join now: </span>
              <strong>500 Bonus MP</strong> + 21-Day Habit Builder
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <Clock className="w-4 h-4 text-white" />
              <div className="flex items-center gap-1 text-white">
                <span className="text-sm tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-xs">:</span>
                <span className="text-sm tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-xs">:</span>
                <span className="text-sm tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
            
            <Button 
              size="sm" 
              className="bg-white text-teal-600 hover:bg-slate-50 border-0 shrink-0"
              onClick={scrollToSignup}
            >
              Claim Offer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LimitedOfferSection() {
  const scrollToSignup = () => {
    document.getElementById('sales-funnel')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-teal-500 to-cyan-500">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <div className="text-center mb-8">
            <Badge className="bg-amber-500 hover:bg-amber-600 border-0 text-white mb-4">
              <Zap className="w-3 h-3 mr-1" />
              Launch Special - 500 Spots Left
            </Badge>
            <h2 className="text-white mb-3">
              Build Your Mastery Muscle Memory
            </h2>
            <p className="text-slate-100 max-w-2xl mx-auto">
              Join now and get our 21-Day Habit Builder Program + 500 bonus Mastery Points
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-amber-300" />
                <h4 className="text-white text-sm">21-Day System</h4>
              </div>
              <p className="text-xs text-slate-200">
                Guided daily challenges to build lasting habits through repetition
              </p>
            </div>

            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-amber-300" />
                <h4 className="text-white text-sm">500 Bonus MP</h4>
              </div>
              <p className="text-xs text-slate-200">
                Start with $5 worth of Mastery Points to unlock premium templates
              </p>
            </div>

            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-amber-300" />
                <h4 className="text-white text-sm">Early Access</h4>
              </div>
              <p className="text-xs text-slate-200">
                Priority access to new features and voice command beta
              </p>
            </div>
          </div>

          {/* Muscle Memory Explainer */}
          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-6">
            <h4 className="text-white mb-3 text-center">Why 21 Days?</h4>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-amber-300 text-lg mb-1">Days 1-7</div>
                <p className="text-xs text-slate-200">Form Initial Routine</p>
              </div>
              <div>
                <div className="text-amber-300 text-lg mb-1">Days 8-14</div>
                <p className="text-xs text-slate-200">Build Consistency</p>
              </div>
              <div>
                <div className="text-amber-300 text-lg mb-1">Days 15-21</div>
                <p className="text-xs text-slate-200">Create Muscle Memory</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-white text-teal-600 hover:bg-slate-50 border-0"
              onClick={scrollToSignup}
            >
              Start Your 21-Day Journey
              <Zap className="w-4 h-4 ml-2" />
            </Button>
            <p className="text-xs text-slate-200 mt-3">
              Offer ends in 48 hours • No credit card required
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
