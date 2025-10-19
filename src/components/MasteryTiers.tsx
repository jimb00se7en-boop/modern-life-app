import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  CheckCircle2, 
  Lock, 
  Unlock,
  Trophy,
  Target,
  Zap,
  Star,
  TrendingUp,
  Award,
  Crown
} from 'lucide-react';

type Achievement = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress?: number;
  maxProgress?: number;
};

type Tier = {
  name: string;
  level: number;
  icon: React.ElementType;
  tagline: string;
  priceMonthly: number;
  priceLabel: string;
  achievements: Achievement[];
  unlockRequirement: string;
  features: string[];
  color: string;
  accentColor: string;
  isRecommended?: boolean;
};

const tiers: Tier[] = [
  {
    name: 'Foundation',
    level: 1,
    icon: Target,
    tagline: 'Start your journey',
    priceMonthly: 0,
    priceLabel: 'Free',
    unlockRequirement: 'Available now - Start building your mastery',
    color: 'slate',
    accentColor: 'bg-slate-600',
    achievements: [
      {
        id: 'first-meditation',
        title: 'First Steps',
        description: 'Complete your first meditation session',
        completed: false,
        progress: 0,
        maxProgress: 1
      },
      {
        id: 'week-streak',
        title: '7-Day Consistency',
        description: 'Log activities for 7 consecutive days',
        completed: false,
        progress: 0,
        maxProgress: 7
      },
      {
        id: 'mood-tracking',
        title: 'Self-Awareness',
        description: 'Track your mood 10 times',
        completed: false,
        progress: 0,
        maxProgress: 10
      }
    ],
    features: [
      'Basic meditation timer',
      'Simple mood logging',
      'Weekly progress view',
      'Mobile app access',
      'Community support'
    ]
  },
  {
    name: 'Growth',
    level: 2,
    icon: TrendingUp,
    tagline: 'Deepen your practice',
    priceMonthly: 12,
    priceLabel: '$12/mo after achievements',
    unlockRequirement: 'Complete 2 of 3 Foundation achievements',
    color: 'teal',
    accentColor: 'bg-teal-600',
    isRecommended: true,
    achievements: [
      {
        id: 'meditation-streak',
        title: 'Meditation Mastery',
        description: 'Complete 30 meditation sessions',
        completed: false,
        progress: 0,
        maxProgress: 30
      },
      {
        id: 'schedule-optimization',
        title: 'Time Architect',
        description: 'Use smart scheduling for 2 weeks',
        completed: false,
        progress: 0,
        maxProgress: 14
      },
      {
        id: 'family-coordination',
        title: 'Family Harmony',
        description: 'Sync 5 family schedules successfully',
        completed: false,
        progress: 0,
        maxProgress: 5
      },
      {
        id: 'nutrition-tracking',
        title: 'Nutrition Navigator',
        description: 'Log meals for 21 days',
        completed: false,
        progress: 0,
        maxProgress: 21
      }
    ],
    features: [
      'Everything in Foundation',
      'Voice command control',
      'Binaural frequency therapy',
      'Advanced analytics dashboard',
      'Family schedule sync',
      'Meal planning tools',
      'Priority support'
    ]
  },
  {
    name: 'Mastery',
    level: 3,
    icon: Crown,
    tagline: 'Achieve true balance',
    priceMonthly: 25,
    priceLabel: '$25/mo after achievements',
    unlockRequirement: 'Complete 3 of 4 Growth achievements',
    color: 'amber',
    accentColor: 'bg-amber-600',
    achievements: [
      {
        id: 'complete-routine',
        title: 'Routine Virtuoso',
        description: 'Maintain a complete routine for 60 days',
        completed: false,
        progress: 0,
        maxProgress: 60
      },
      {
        id: 'all-areas',
        title: 'Life Balance Champion',
        description: 'Active in all 6 life areas for 30 days',
        completed: false,
        progress: 0,
        maxProgress: 30
      },
      {
        id: 'mentor',
        title: 'Community Leader',
        description: 'Help 3 other users with their journey',
        completed: false,
        progress: 0,
        maxProgress: 3
      },
      {
        id: 'wellness-score',
        title: 'Peak Performance',
        description: 'Achieve 90%+ wellness score for a month',
        completed: false,
        progress: 0,
        maxProgress: 30
      }
    ],
    features: [
      'Everything in Growth',
      '1-on-1 wellness coaching',
      'Custom AI recommendations',
      'Unlimited voice sessions',
      'Advanced frequency programs',
      'White-glove onboarding',
      'Early access to new features',
      'Lifetime achievement tracking',
      'VIP community access'
    ]
  }
];

export function MasteryTiers() {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  const getUnlockStatus = (tier: Tier) => {
    if (tier.level === 1) return { unlocked: true, label: 'Active' };
    // In real app, this would check actual user achievements
    return { unlocked: false, label: 'Locked' };
  };

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Trophy className="w-6 h-6 text-teal-600" />
            <Badge className="bg-teal-600 border-0 text-white">
              Achievement-Based Progression
            </Badge>
          </div>
          <h2 className="text-slate-900 mb-4">
            Modern Life Mastery Tiers
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Unlock premium features by achieving real-world goals. 
            Your progress unlocks access—mastery is earned, not just purchased.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-16 p-8 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-100">
          <h3 className="text-slate-900 mb-6 text-center">How Achievement Unlocking Works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full">
                <Target className="w-6 h-6 text-teal-600" />
              </div>
              <h4 className="text-slate-900">Complete Goals</h4>
              <p className="text-sm text-slate-600">
                Accomplish real-life achievements in meditation, scheduling, nutrition, and family coordination
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full">
                <Unlock className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="text-slate-900">Unlock Tiers</h4>
              <p className="text-sm text-slate-600">
                Meet achievement requirements to unlock the next tier at a reduced rate
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-slate-900">Master Your Life</h4>
              <p className="text-sm text-slate-600">
                Gain access to premium features as you prove your commitment to growth
              </p>
            </div>
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier) => {
            const TierIcon = tier.icon;
            const unlockStatus = getUnlockStatus(tier);
            const completedAchievements = tier.achievements.filter(a => a.completed).length;
            const totalAchievements = tier.achievements.length;
            const achievementProgress = (completedAchievements / totalAchievements) * 100;

            return (
              <Card 
                key={tier.name}
                className={`relative overflow-hidden transition-all duration-300 ${
                  tier.isRecommended 
                    ? 'border-2 border-teal-500 shadow-xl scale-105' 
                    : 'border-slate-200 hover:shadow-lg'
                } ${
                  selectedTier === tier.level ? 'ring-2 ring-teal-500' : ''
                }`}
              >
                {/* Recommended Badge */}
                {tier.isRecommended && (
                  <div className="absolute top-0 right-0 bg-teal-500 text-white px-4 py-1 text-xs rounded-bl-lg">
                    <Star className="w-3 h-3 inline mr-1" />
                    Most Popular
                  </div>
                )}

                {/* Tier Header */}
                <div className={`p-6 bg-gradient-to-br ${
                  tier.color === 'teal' ? 'from-teal-50 to-cyan-50' :
                  tier.color === 'amber' ? 'from-amber-50 to-orange-50' :
                  'from-slate-50 to-stone-50'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 ${
                      tier.color === 'teal' ? 'bg-teal-100' :
                      tier.color === 'amber' ? 'bg-amber-100' :
                      'bg-slate-100'
                    } rounded-lg`}>
                      <TierIcon className={`w-6 h-6 ${
                        tier.color === 'teal' ? 'text-teal-600' :
                        tier.color === 'amber' ? 'text-amber-600' :
                        'text-slate-600'
                      }`} />
                    </div>
                    <Badge variant={unlockStatus.unlocked ? 'default' : 'secondary'}>
                      {unlockStatus.unlocked ? (
                        <><Unlock className="w-3 h-3 mr-1" /> {unlockStatus.label}</>
                      ) : (
                        <><Lock className="w-3 h-3 mr-1" /> {unlockStatus.label}</>
                      )}
                    </Badge>
                  </div>
                  
                  <h3 className="text-slate-900 mb-2">{tier.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">{tier.tagline}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className={`${
                        tier.color === 'teal' ? 'text-teal-600' :
                        tier.color === 'amber' ? 'text-amber-600' :
                        'text-slate-600'
                      }`}>
                        {tier.priceLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {tier.unlockRequirement}
                    </p>
                  </div>
                </div>

                {/* Achievements Section */}
                <div className="p-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm text-slate-900">Achievements to Unlock</h4>
                    <span className="text-xs text-slate-600">
                      {completedAchievements}/{totalAchievements}
                    </span>
                  </div>
                  
                  <Progress value={achievementProgress} className="mb-4 h-2" />
                  
                  <div className="space-y-3">
                    {tier.achievements.map((achievement) => (
                      <div 
                        key={achievement.id}
                        className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
                      >
                        <div className="shrink-0 mt-0.5">
                          {achievement.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-900">
                            {achievement.title}
                          </p>
                          <p className="text-xs text-slate-600">
                            {achievement.description}
                          </p>
                          {achievement.maxProgress && achievement.progress !== undefined && (
                            <div className="mt-2">
                              <Progress 
                                value={(achievement.progress / achievement.maxProgress) * 100} 
                                className="h-1"
                              />
                              <p className="text-xs text-slate-500 mt-1">
                                {achievement.progress}/{achievement.maxProgress}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="p-6 bg-slate-50 border-t border-slate-100">
                  <h4 className="text-sm text-slate-900 mb-3">Features Included</h4>
                  <ul className="space-y-2">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                          tier.color === 'teal' ? 'text-teal-600' :
                          tier.color === 'amber' ? 'text-amber-600' :
                          'text-slate-600'
                        }`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-6">
                  <Button
                    className={`w-full ${
                      tier.color === 'teal' ? 'bg-teal-600 hover:bg-teal-700' :
                      tier.color === 'amber' ? 'bg-amber-600 hover:bg-amber-700' :
                      'bg-slate-600 hover:bg-slate-700'
                    } border-0 text-white`}
                    onClick={() => setSelectedTier(tier.level)}
                    disabled={!unlockStatus.unlocked && tier.level > 1}
                  >
                    {tier.level === 1 ? 'Start Free' : 
                     unlockStatus.unlocked ? `Upgrade to ${tier.name}` : 
                     'Complete Achievements to Unlock'}
                    {tier.level > 1 && <Zap className="w-4 h-4 ml-2" />}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white">
          <Award className="w-12 h-12 text-teal-400 mx-auto mb-4" />
          <h3 className="text-white mb-3">
            Your Journey, Your Pace
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Start free, prove your commitment through achievements, and unlock premium features 
            as you master each aspect of modern life. No pressure, just progress.
          </p>
          <Button 
            size="lg" 
            className="bg-teal-500 hover:bg-teal-600 border-0 text-white"
          >
            Begin Your Mastery Journey
            <Trophy className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
