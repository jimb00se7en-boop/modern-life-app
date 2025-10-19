import { useState } from 'react';
import { Mail, CheckCircle, Sparkles, Gift } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function SalesFunnel() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // In production, this would send to your email service
      console.log('Email submitted:', email);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full">
            <CheckCircle className="w-8 h-8 text-teal-600" />
          </div>
          <h3 className="text-slate-900">Welcome to Modern Life!</h3>
          <p className="text-slate-700">
            Check your inbox for your 21-Day Habit Builder + 500 bonus Mastery Points.
          </p>
          <div className="pt-4">
            <Badge className="bg-teal-600 border-0">
              <Gift className="w-3 h-3 mr-1" />
              Launch Special Activated
            </Badge>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-slate-50 via-teal-50 to-amber-50 border-slate-200 shadow-lg">
      <div className="space-y-4">
        <div className="text-center">
          <Badge className="bg-amber-500 hover:bg-amber-600 border-0 text-white mb-3">
            <Sparkles className="w-3 h-3 mr-1" />
            500 MP + 21-Day Builder
          </Badge>
          <h3 className="text-slate-900 mb-2">
            Start Building Your Mastery Today
          </h3>
          <p className="text-slate-600 text-sm">
            Join 5,000+ users building lasting habits
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Voice commands</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Frequency therapy</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Analytics dashboard</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Coaching session</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white border-slate-200"
                required
              />
            </div>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700 border-0">
              Start Free
            </Button>
          </div>
          <p className="text-xs text-slate-600 text-center">
            No credit card • 48-hour launch special
          </p>
        </form>
      </div>
    </Card>
  );
}
