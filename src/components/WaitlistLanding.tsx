import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Check, Sparkles, Trophy, Gift, Users, Loader2, AlertCircle } from 'lucide-react';
import { CountdownTimer, ChakraCountdown } from './CountdownTimer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { supabase } from '../utils/supabaseClient';

export function WaitlistLanding() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [waitlistCount, setWaitlistCount] = useState(547);
  const [userPosition, setUserPosition] = useState<number | null>(null);
  const [referralCode, setReferralCode] = useState<string>('');

  // Set launch date (14 days from now - update this to your actual launch date)
  const launchDate = new Date('2025-11-02T00:00:00'); // Update this date!

  // Get referral code from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setReferralCode(ref.toUpperCase());
    }
  }, []);

  // Fetch current waitlist count
  useEffect(() => {
    fetchWaitlistCount();
  }, []);

  const fetchWaitlistCount = async () => {
    try {
      // Check if Supabase is configured
      if (!import.meta.env?.VITE_SUPABASE_URL) {
        console.log('📊 Demo mode: Using mock waitlist count');
        return;
      }

      const { count, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      if (!error && count !== null) {
        setWaitlistCount(count);
      }
    } catch (err) {
      console.error('Error fetching waitlist count:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Check if we're in demo mode
      if (!import.meta.env?.VITE_SUPABASE_URL) {
        // Demo mode - simulate success
        console.log('📧 Demo mode: Email would be saved:', email);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        
        setIsSubmitted(true);
        setUserPosition(waitlistCount + 1);
        setReferralCode('DEMO' + Math.random().toString(36).substring(2, 8).toUpperCase());
        setWaitlistCount(prev => prev + 1);
        
        return;
      }

      // Production mode - call the API endpoint
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          referralCode: referralCode || null,
          source: 'landing_page',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }

      // Success!
      setIsSubmitted(true);
      setUserPosition(data.data.position);
      setReferralCode(data.data.referralCode);
      setWaitlistCount(prev => prev + 1);

      // Optional: Track with analytics
      if (typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible('Waitlist Signup', {
          props: { position: data.data.position }
        });
      }

    } catch (err: any) {
      console.error('Waitlist signup error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-amber-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8 max-w-4xl mx-auto"
        >
          {/* Logo/Title */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-7xl mb-4 bg-gradient-to-r from-teal-600 via-purple-600 to-amber-600 bg-clip-text text-transparent">
              Modern Life
            </h1>
            <p className="text-xl sm:text-3xl text-slate-700">
              Something Beautiful is Coming
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-2xl sm:text-4xl text-slate-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Transform Your Life in 21 Days
          </motion.p>

          {/* Countdown - Switch between variants */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="my-12"
          >
            {/* Standard countdown */}
            <div className="hidden sm:block">
              <CountdownTimer targetDate={launchDate} />
            </div>
            
            {/* Chakra countdown for mobile */}
            <div className="block sm:hidden">
              <ChakraCountdown targetDate={launchDate} />
            </div>
          </motion.div>

          {/* Email Signup Form */}
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="max-w-md mx-auto"
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="flex-1 h-12 text-base"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 h-12"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Join Waitlist
                    </>
                  )}
                </Button>
              </form>
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-800">{error}</p>
                </motion.div>
              )}
              
              <p className="text-sm text-slate-500 mt-3">
                ✨ First 100 get Lifetime Platinum tier (worth $2,400+ value)
              </p>
              
              {referralCode && (
                <p className="text-sm text-teal-600 mt-2">
                  🎁 You were referred! You'll both get bonus points.
                </p>
              )}
              
              {!import.meta.env?.VITE_SUPABASE_URL && (
                <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
                  📝 Demo Mode: Signups are simulated. Configure Supabase to save real data.
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 shadow-xl max-w-md mx-auto border-2 border-teal-500"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mx-auto mb-4">
                <Check className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl mb-2">You're On The List! 🎉</h3>
              <p className="text-slate-600 mb-4">
                Check your email for confirmation and exclusive updates.
              </p>
              <div className="bg-teal-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-slate-600 mb-2">You're position:</p>
                <p className="text-3xl text-teal-600 mb-3">
                  #{userPosition || waitlistCount}
                </p>
                <div className="border-t border-teal-200 pt-3">
                  <p className="text-sm text-slate-600 mb-2">Your referral code:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-white px-3 py-2 rounded border border-teal-200 text-lg text-center tracking-wider">
                      {referralCode}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}?ref=${referralCode}`
                        );
                      }}
                    >
                      Copy Link
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Share this code to move up the list!
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center gap-2 text-slate-600"
          >
            <Users className="w-5 h-5" />
            <span className="text-lg">
              {waitlistCount}+ already waiting
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Early Bird Bonuses */}
      <div className="bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl text-center mb-4">
              First 100 Signups Get
            </h2>
            <p className="text-center text-slate-600 mb-12">
              Join the waitlist to secure your spot
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Trophy,
                  title: 'Lifetime Platinum',
                  value: '$2,400+',
                  description: 'Unlock all premium features forever',
                  color: 'from-purple-500 to-purple-600',
                },
                {
                  icon: Sparkles,
                  title: 'Founder Badge',
                  value: 'Limited',
                  description: 'Exclusive badge only for founders',
                  color: 'from-amber-500 to-amber-600',
                },
                {
                  icon: Gift,
                  title: '10,000 Mastery Points',
                  value: '$100',
                  description: 'Head start in the marketplace',
                  color: 'from-teal-500 to-teal-600',
                },
              ].map((bonus, index) => (
                <motion.div
                  key={bonus.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-teal-300 transition-colors"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${bonus.color} flex items-center justify-center mb-4`}
                  >
                    <bonus.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl mb-1">{bonus.title}</h3>
                  <div className="text-2xl text-teal-600 mb-2">
                    {bonus.value}
                  </div>
                  <p className="text-sm text-slate-600">{bonus.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-lg text-slate-700">
                <span className="text-2xl text-teal-600">
                  Total Value: $2,500+
                </span>
              </p>
              <p className="text-slate-600">Your Cost: $0</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* What's Coming */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl text-center mb-12">
            What's Inside
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: '💚', title: 'Meditation Hub', chakra: 'Heart' },
              { emoji: '🔮', title: 'Sleep Hub', chakra: 'Third Eye' },
              { emoji: '🔴', title: 'Nutrition Hub', chakra: 'Root' },
              { emoji: '☀️', title: 'Study Hub', chakra: 'Solar Plexus' },
              { emoji: '🟠', title: 'Childcare Hub', chakra: 'Sacral' },
              { emoji: '💙', title: 'Schedule Hub', chakra: 'Throat' },
            ].map((hub, index) => (
              <motion.div
                key={hub.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{hub.emoji}</div>
                <h3 className="text-lg mb-1">{hub.title}</h3>
                <p className="text-sm text-slate-600">{hub.chakra} Chakra</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center space-y-4">
            <p className="text-xl text-slate-700">Plus:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Achievement System',
                'Audio Library',
                'Template Marketplace',
                '21-Day Onboarding',
                'Frequency Healing',
                'AI Features',
              ].map((feature) => (
                <span
                  key={feature}
                  className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* The Journey Teaser */}
      <div className="bg-gradient-to-br from-purple-100 via-teal-100 to-amber-100 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl mb-8">
              Your 21-Day Journey
            </h2>

            <div className="space-y-4 text-left">
              {[
                { days: '1-3', chakra: 'Root 🔴', focus: 'Foundation & Grounding' },
                { days: '4-6', chakra: 'Sacral 🟠', focus: 'Creativity & Flow' },
                { days: '7-9', chakra: 'Solar ☀️', focus: 'Confidence & Power' },
                { days: '10-12', chakra: 'Heart 💚', focus: 'Love & Compassion' },
                { days: '13-15', chakra: 'Throat 💙', focus: 'Expression & Truth' },
                { days: '16-18', chakra: 'Third Eye 🔮', focus: 'Intuition & Insight' },
                { days: '19-21', chakra: 'Crown 👑', focus: 'Connection & Transcendence' },
              ].map((phase, index) => (
                <motion.div
                  key={phase.days}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4"
                >
                  <div className="text-2xl w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                    {phase.days}
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Days {phase.days}</div>
                    <div className="text-lg">{phase.chakra}</div>
                    <div className="text-sm text-slate-600">{phase.focus}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-8 sm:p-12 text-white shadow-2xl"
        >
          <h2 className="text-3xl sm:text-4xl mb-4">Ready to Transform?</h2>
          <p className="text-xl mb-8 text-teal-50">
            Join {waitlistCount}+ people on the waitlist
          </p>

          {!isSubmitted && (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 text-base bg-white text-slate-900"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-white text-teal-600 hover:bg-teal-50 h-12"
              >
                Join Now
              </Button>
            </form>
          )}

          <div className="mt-6 space-y-2 text-sm text-teal-50">
            <p>✓ No credit card required</p>
            <p>✓ First 100 get lifetime premium</p>
            <p>✓ Launch in {Math.ceil((launchDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days</p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 mb-4">Modern Life © 2025</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              About
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
