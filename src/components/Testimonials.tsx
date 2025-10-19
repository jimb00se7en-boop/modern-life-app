import { Card } from './ui/card';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Mom of 3, Remote Worker',
    tier: 'Mastery',
    image: 'SM',
    rating: 5,
    quote: "Finally found balance. The achievement system kept me motivated, and now I'm earning points by sharing my routines. My $25/mo tier effectively costs $10 after redeeming points!",
    achievement: 'Earned 1,500 MP in first month'
  },
  {
    name: 'Jessica L.',
    role: 'Graduate Student & Parent',
    tier: 'Growth',
    image: 'JL',
    rating: 5,
    quote: "Voice commands changed everything. I can log meals while cooking and set study sessions while holding my daughter. The community templates saved me hours of planning.",
    achievement: 'Downloaded 12 templates'
  },
  {
    name: 'Michael K.',
    role: 'Single Dad, Teacher',
    tier: 'Foundation',
    image: 'MK',
    rating: 5,
    quote: "Started free, unlocked Growth tier by actually using the app consistently. The meditation streaks and frequency therapy help me stay calm during hectic mornings.",
    achievement: 'Unlocked Growth in 3 weeks'
  },
  {
    name: 'Emily R.',
    role: 'Wellness Coach & Mom',
    tier: 'Mastery',
    image: 'ER',
    rating: 5,
    quote: "I share my professional templates and earn 300-500 MP weekly. It's amazing to monetize my expertise while helping other moms. True community-driven wellness.",
    achievement: 'Top template creator'
  },
  {
    name: 'Alex T.',
    role: 'PhD Candidate & Caregiver',
    tier: 'Growth',
    image: 'AT',
    rating: 5,
    quote: "The study deadline tracking with binaural frequencies keeps me focused. Childcare coordination features mean my partner and I are always synced. Life-changing.",
    achievement: 'Completed 60-day routine'
  },
  {
    name: 'Dr. Lisa P.',
    role: 'Psychologist & Author',
    tier: 'Mastery',
    image: 'LP',
    rating: 5,
    quote: "From a clinical perspective, the achievement-based model is brilliant. It reinforces positive behavior through gamification without the typical predatory monetization. Highly recommend.",
    achievement: 'Published 8 templates'
  }
];

export function Testimonials() {
  return (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-100 text-amber-800 border-0">
            Real Stories
          </Badge>
          <h2 className="text-slate-900 mb-4">
            Loved by Modern Life Masters
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            See how real people are mastering their daily routines and earning recognition for their contributions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <Card 
              key={idx}
              className="p-6 border-slate-200 hover:shadow-lg transition-shadow"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-teal-200 mb-4" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 text-amber-400 fill-amber-400" 
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Achievement Badge */}
              <div className="mb-4 pb-4 border-b border-slate-100">
                <Badge variant="secondary" className="text-xs">
                  ✨ {testimonial.achievement}
                </Badge>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 bg-teal-100 text-teal-700 flex items-center justify-center">
                  {testimonial.image}
                </Avatar>
                <div>
                  <p className="text-sm text-slate-900">{testimonial.name}</p>
                  <p className="text-xs text-slate-600">{testimonial.role}</p>
                  <Badge 
                    variant="outline" 
                    className="text-xs mt-1 border-teal-200 text-teal-700"
                  >
                    {testimonial.tier} Tier
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-slate-50 rounded-2xl">
          <div className="text-center">
            <div className="text-teal-600 mb-1">15,000+</div>
            <p className="text-sm text-slate-600">Active Users</p>
          </div>
          <div className="text-center">
            <div className="text-teal-600 mb-1">4.9/5</div>
            <p className="text-sm text-slate-600">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-teal-600 mb-1">3,200+</div>
            <p className="text-sm text-slate-600">Templates Shared</p>
          </div>
          <div className="text-center">
            <div className="text-teal-600 mb-1">89%</div>
            <p className="text-sm text-slate-600">Unlock Growth Tier</p>
          </div>
        </div>
      </div>
    </div>
  );
}
