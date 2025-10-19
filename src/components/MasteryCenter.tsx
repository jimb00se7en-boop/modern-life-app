import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Trophy,
  Zap,
  Crown,
  Lock,
  CheckCircle2,
  TrendingUp,
  Target,
  Gift,
  Star,
  Award,
  Sparkles,
  ArrowRight,
  Clock,
  Brain,
  Moon,
  Apple,
  Calendar,
  Baby,
  BookOpen,
} from 'lucide-react';

export function MasteryCenter() {
  const currentTier = {
    name: 'Explorer',
    level: 2,
    current: 1240,
    required: 2000,
    progress: 62,
    color: 'teal',
  };

  const tiers = [
    {
      name: 'Foundation',
      level: 1,
      color: 'slate',
      unlocked: true,
      completed: true,
      requiredMP: 0,
      features: [
        'Basic meditation sessions',
        'Sleep tracking',
        'Schedule management',
        'Nutrition logging',
      ],
    },
    {
      name: 'Explorer',
      level: 2,
      color: 'teal',
      unlocked: true,
      completed: false,
      requiredMP: 1000,
      features: [
        'Advanced breathwork',
        'Sleep soundscapes',
        'AI schedule suggestions',
        'Meal planning',
        'Childcare coordination',
        '🎯 Template Creator (Basic) - NEW!',
      ],
    },
    {
      name: 'Architect',
      level: 3,
      color: 'purple',
      unlocked: false,
      completed: false,
      requiredMP: 2000,
      features: [
        'Custom meditation scripts',
        'Sleep optimization AI',
        'Auto-scheduling',
        'Nutrition coaching',
        'Study templates',
        '📝 Template Creator (Advanced) - 15 steps',
        '⏰ Template Scheduling',
      ],
    },
    {
      name: 'Master',
      level: 4,
      color: 'amber',
      unlocked: false,
      completed: false,
      requiredMP: 5000,
      features: [
        'Full AI capabilities',
        '✨ Template Creator (AI-Enhanced) - Unlimited',
        '🤝 Template marketplace selling',
        'Earn MP from template downloads',
        'Priority support',
        'Lifetime features',
        'Beta access',
      ],
    },
  ];

  const achievements = [
    {
      id: 'template-creator',
      name: 'Template Creator',
      description: 'Create your first custom wellness template',
      icon: '📝',
      mp: 100,
      unlocked: true,
      completed: false,
      progress: 0,
      category: 'Templates',
    },
    {
      id: 'community-contributor',
      name: 'Community Contributor',
      description: 'Share 5 templates in the marketplace',
      icon: '🤝',
      mp: 250,
      unlocked: true,
      completed: false,
      progress: 0,
      category: 'Templates',
    },
    {
      id: 'template-master',
      name: 'Template Master',
      description: 'Have 1,000+ downloads on your templates',
      icon: '⭐',
      mp: 500,
      unlocked: false,
      completed: false,
      progress: 0,
      category: 'Templates',
    },
    {
      id: '1',
      name: '7-Day Streak',
      description: 'Complete activities for 7 consecutive days',
      icon: '🔥',
      category: 'Consistency',
      mp: 50,
      unlocked: true,
      date: 'Today',
    },
    {
      id: '2',
      name: 'Early Bird',
      description: 'Complete morning meditation before 7 AM',
      icon: '🌅',
      category: 'Meditation',
      mp: 25,
      unlocked: true,
      date: 'Oct 10',
    },
    {
      id: '3',
      name: 'Meditation Master',
      description: 'Complete 50 meditation sessions',
      icon: '🧘',
      category: 'Meditation',
      mp: 100,
      unlocked: true,
      date: 'Oct 11',
      progress: 100,
    },
    {
      id: '4',
      name: 'Sleep Champion',
      description: 'Achieve 7 nights of quality sleep',
      icon: '😴',
      category: 'Sleep',
      mp: 75,
      unlocked: false,
      progress: 71,
      current: 5,
      total: 7,
    },
    {
      id: '5',
      name: 'Nutrition Tracker',
      description: 'Log meals for 30 days',
      icon: '🍎',
      category: 'Nutrition',
      mp: 100,
      unlocked: false,
      progress: 40,
      current: 12,
      total: 30,
    },
    {
      id: '6',
      name: 'Study Marathon',
      description: 'Study for 10 hours in a week',
      icon: '📚',
      category: 'Study',
      mp: 150,
      unlocked: false,
      progress: 85,
      current: 8.5,
      total: 10,
    },
    {
      id: '7',
      name: 'Community Builder',
      description: 'Share 5 templates in marketplace',
      icon: '🤝',
      category: 'Community',
      mp: 200,
      unlocked: false,
      progress: 0,
      current: 0,
      total: 5,
    },
    {
      id: '8',
      name: 'Zen Master',
      description: 'Meditate for 100 total hours',
      icon: '☯️',
      category: 'Meditation',
      mp: 500,
      unlocked: false,
      progress: 45,
      current: 45,
      total: 100,
    },
  ];

  const availableRewards = [
    {
      name: 'AI Schedule Optimizer',
      description: 'Automatically balance your daily activities',
      mp: 120,
      tier: 'Explorer',
      category: 'Schedule',
      icon: Calendar,
      unlockable: false,
    },
    {
      name: 'Advanced Sleep Analysis',
      description: 'Deep insights into sleep patterns',
      mp: 200,
      tier: 'Explorer',
      category: 'Sleep',
      icon: Moon,
      unlockable: true,
    },
    {
      name: 'Custom Meditation Builder',
      description: 'Create your own guided sessions',
      mp: 760,
      tier: 'Architect',
      category: 'Meditation',
      icon: Brain,
      unlockable: false,
      locked: true,
    },
    {
      name: 'Nutrition AI Coach',
      description: 'Personalized meal recommendations',
      mp: 760,
      tier: 'Architect',
      category: 'Nutrition',
      icon: Apple,
      unlockable: false,
      locked: true,
    },
  ];

  const recentActivity = [
    { action: 'Completed Morning Meditation', mp: 10, time: '2 hours ago' },
    { action: 'Logged Breakfast', mp: 5, time: '3 hours ago' },
    { action: 'Unlocked Achievement: Early Bird', mp: 25, time: '4 hours ago' },
    { action: 'Study Session Completed', mp: 15, time: 'Yesterday' },
    { action: 'Sleep Quality: Excellent', mp: 20, time: 'Yesterday' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-slate-900">Mastery Center</h2>
              <p className="text-sm text-slate-600">Track achievements, unlock rewards</p>
            </div>
          </div>
        </div>
        <Badge className="bg-amber-100 text-amber-700 border-0 text-lg px-4 py-2">
          <Zap className="w-5 h-5 mr-2" />
          {currentTier.current.toLocaleString()} MP
        </Badge>
      </div>

      {/* Current Tier Progress */}
      <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-6 h-6 text-teal-600" />
              <h3 className="text-slate-900">Current Tier: {currentTier.name}</h3>
            </div>
            <p className="text-sm text-slate-600">
              Level {currentTier.level} • {currentTier.required - currentTier.current} MP to next tier
            </p>
          </div>
          <Badge className="bg-teal-600 text-white border-0">
            {currentTier.progress}%
          </Badge>
        </div>

        <Progress value={currentTier.progress} className="h-3 mb-4" />

        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">{currentTier.current} MP</span>
          <span className="text-slate-900">{currentTier.required} MP</span>
        </div>
      </Card>

      <Tabs defaultValue="achievements" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="tiers">Tiers</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Achievements */}
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`p-4 ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-slate-900">{achievement.name}</p>
                        {achievement.unlocked && (
                          <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mb-2">
                        {achievement.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {achievement.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge
                    className={`${
                      achievement.unlocked
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-600'
                    } border-0`}
                  >
                    {achievement.mp} MP
                  </Badge>
                </div>

                {!achievement.unlocked && achievement.progress !== undefined && (
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                      <span>Progress</span>
                      <span>
                        {achievement.current}/{achievement.total}
                      </span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                )}

                {achievement.unlocked && achievement.date && (
                  <p className="text-xs text-slate-500 mt-2">
                    Unlocked {achievement.date}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tier System */}
        <TabsContent value="tiers" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {tiers.map((tier, index) => {
              const Icon =
                tier.color === 'slate'
                  ? Target
                  : tier.color === 'teal'
                  ? Star
                  : tier.color === 'purple'
                  ? Award
                  : Crown;

              return (
                <Card
                  key={index}
                  className={`p-6 relative overflow-hidden ${
                    tier.unlocked
                      ? tier.completed
                        ? 'bg-slate-50 border-slate-300'
                        : 'bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200'
                      : 'bg-white border-slate-200 opacity-70'
                  }`}
                >
                  {!tier.unlocked && (
                    <div className="absolute top-4 right-4">
                      <Lock className="w-5 h-5 text-slate-400" />
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        tier.color === 'slate'
                          ? 'bg-slate-200'
                          : tier.color === 'teal'
                          ? 'bg-gradient-to-br from-teal-500 to-cyan-600'
                          : tier.color === 'purple'
                          ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
                          : 'bg-gradient-to-br from-amber-500 to-orange-600'
                      }`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-slate-900">{tier.name}</h3>
                        {tier.completed && (
                          <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600">
                        Level {tier.level} • {tier.requiredMP.toLocaleString()} MP
                        {tier.unlocked && !tier.completed && ' required'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-xs text-slate-600 mb-2">Features:</p>
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`w-3 h-3 shrink-0 mt-0.5 ${
                            tier.unlocked ? 'text-teal-600' : 'text-slate-300'
                          }`}
                        />
                        <p
                          className={`text-sm ${
                            tier.unlocked ? 'text-slate-700' : 'text-slate-400'
                          }`}
                        >
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>

                  {tier.unlocked && !tier.completed && (
                    <Button
                      size="sm"
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white border-0"
                    >
                      Current Tier
                    </Button>
                  )}
                  {tier.completed && (
                    <Badge className="w-full bg-slate-200 text-slate-700 border-0 justify-center">
                      Completed
                    </Badge>
                  )}
                  {!tier.unlocked && (
                    <Button size="sm" variant="outline" className="w-full" disabled>
                      <Lock className="w-3 h-3 mr-2" />
                      Locked
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Rewards Store */}
        <TabsContent value="rewards" className="space-y-4">
          <Card className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 mb-6">
            <div className="flex items-start gap-3">
              <Gift className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <p className="text-sm text-slate-900 mb-1">Unlock Premium Features</p>
                <p className="text-xs text-slate-600">
                  Spend Mastery Points to unlock advanced features. Earn MP by completing
                  activities and achievements!
                </p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            {availableRewards.map((reward, index) => {
              const Icon = reward.icon;
              return (
                <Card
                  key={index}
                  className={`p-6 ${
                    reward.locked
                      ? 'bg-slate-50 border-slate-200 opacity-60'
                      : reward.unlockable
                      ? 'bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          reward.locked
                            ? 'bg-slate-200'
                            : 'bg-gradient-to-br from-teal-500 to-cyan-600'
                        }`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-slate-900">{reward.name}</p>
                          {reward.locked && <Lock className="w-4 h-4 text-slate-400" />}
                        </div>
                        <p className="text-xs text-slate-600 mb-2">
                          {reward.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {reward.category}
                          </Badge>
                          <Badge
                            className={`text-xs ${
                              reward.tier === 'Explorer'
                                ? 'bg-teal-100 text-teal-700'
                                : 'bg-purple-100 text-purple-700'
                            } border-0`}
                          >
                            {reward.tier}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className="bg-amber-100 text-amber-700 border-0">
                      {reward.mp} MP
                    </Badge>
                    {reward.unlockable ? (
                      <Button
                        size="sm"
                        className="bg-teal-500 hover:bg-teal-600 text-white border-0"
                      >
                        Unlock Now
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    ) : reward.locked ? (
                      <Button size="sm" variant="outline" disabled>
                        <Lock className="w-3 h-3 mr-2" />
                        Tier Locked
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        Need {reward.mp - currentTier.current} MP
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Recent Activity */}
        <TabsContent value="activity" className="space-y-4">
          <Card className="p-6 bg-white border-slate-200">
            <h3 className="text-slate-900 mb-4">Recent MP Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-900">{item.action}</p>
                      <p className="text-xs text-slate-500">{item.time}</p>
                    </div>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 border-0">
                    +{item.mp} MP
                  </Badge>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              View Full History
            </Button>
          </Card>

          {/* MP Summary */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-4 bg-white border-slate-200">
              <p className="text-sm text-slate-600 mb-1">Today</p>
              <p className="text-2xl text-slate-900">40 MP</p>
              <p className="text-xs text-teal-600">+15% vs yesterday</p>
            </Card>
            <Card className="p-4 bg-white border-slate-200">
              <p className="text-sm text-slate-600 mb-1">This Week</p>
              <p className="text-2xl text-slate-900">320 MP</p>
              <p className="text-xs text-teal-600">On track!</p>
            </Card>
            <Card className="p-4 bg-white border-slate-200">
              <p className="text-sm text-slate-600 mb-1">All Time</p>
              <p className="text-2xl text-slate-900">2,450 MP</p>
              <p className="text-xs text-slate-600">1,240 available</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
