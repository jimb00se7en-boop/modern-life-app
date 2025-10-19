import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import {
  Brain,
  Moon,
  Apple,
  BookOpen,
  Calendar,
  CheckCircle2,
  Circle,
  Sparkles,
  Target,
  TrendingUp,
  Clock,
  Zap,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Gift,
} from 'lucide-react';

interface HabitBuilderProps {
  onComplete: () => void;
}

export function HabitBuilder({ onComplete }: HabitBuilderProps) {
  const [step, setStep] = useState(1);
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const [habitTimes, setHabitTimes] = useState<Record<string, string>>({});
  const [habitGoals, setHabitGoals] = useState<Record<string, string>>({});

  const totalSteps = 4;

  const habitOptions = [
    {
      id: 'meditation',
      name: 'Daily Meditation',
      icon: Brain,
      description: '10-15 minutes of mindfulness',
      color: 'teal',
      difficulty: 'Easy',
      mp: 10,
    },
    {
      id: 'sleep',
      name: 'Sleep Routine',
      icon: Moon,
      description: 'Consistent bedtime schedule',
      color: 'indigo',
      difficulty: 'Medium',
      mp: 15,
    },
    {
      id: 'nutrition',
      name: 'Meal Logging',
      icon: Apple,
      description: 'Track daily nutrition',
      color: 'green',
      difficulty: 'Easy',
      mp: 10,
    },
    {
      id: 'study',
      name: 'Learning Time',
      icon: BookOpen,
      description: '30 minutes of focused study',
      color: 'purple',
      difficulty: 'Medium',
      mp: 15,
    },
    {
      id: 'planning',
      name: 'Daily Planning',
      icon: Calendar,
      description: 'Review and plan your day',
      color: 'blue',
      difficulty: 'Easy',
      mp: 10,
    },
  ];

  const benefits = [
    { icon: Zap, text: 'Build lasting habits in 21 days' },
    { icon: Trophy, text: 'Earn 300-500 Mastery Points' },
    { icon: Gift, text: 'Unlock exclusive rewards' },
    { icon: TrendingUp, text: 'Track your progress daily' },
  ];

  const progressPercentage = (step / totalSteps) * 100;

  const toggleHabit = (habitId: string) => {
    if (selectedHabits.includes(habitId)) {
      setSelectedHabits(selectedHabits.filter((id) => id !== habitId));
    } else {
      if (selectedHabits.length < 3) {
        setSelectedHabits([...selectedHabits, habitId]);
      }
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    if (step === 1) return true; // Welcome step
    if (step === 2) return selectedHabits.length > 0; // Habit selection
    if (step === 3) {
      // Time setting - only require at least ONE habit to have a time set (more flexible)
      return selectedHabits.some((id) => habitTimes[id]);
    }
    if (step === 4) return true; // Review
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600">
              Step {step} of {totalSteps}
            </p>
            <p className="text-sm text-slate-600">{Math.round(progressPercentage)}% Complete</p>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <Card className="p-8 bg-white border-slate-200 shadow-xl">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div>
                  <Badge className="bg-teal-500 text-white border-0 mb-3">
                    21-Day Habit Builder
                  </Badge>
                  <h1 className="text-slate-900 mb-3">
                    Build Life-Changing Habits
                  </h1>
                  <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                    Science shows it takes 21 days to form a new habit. Let's build yours together
                    and earn rewards along the way!
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 py-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-teal-600" />
                      </div>
                      <p className="text-sm text-slate-700">{benefit.text}</p>
                    </div>
                  );
                })}
              </div>

              <div className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
                <p className="text-sm text-slate-700 mb-2">
                  <strong>What to expect:</strong>
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Choose 1-3 habits to build</li>
                  <li>• Set your preferred times</li>
                  <li>• Get daily reminders and check-ins</li>
                  <li>• Earn Mastery Points for consistency</li>
                  <li>• Unlock rewards at milestones (7, 14, 21 days)</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 2: Select Habits */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-slate-900 mb-2">Choose Your Habits</h2>
                <p className="text-slate-600">
                  Select 1-3 habits to focus on ({selectedHabits.length}/3 selected)
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {habitOptions.map((habit) => {
                  const Icon = habit.icon;
                  const isSelected = selectedHabits.includes(habit.id);
                  const isDisabled =
                    !isSelected && selectedHabits.length >= 3;

                  return (
                    <Card
                      key={habit.id}
                      className={`p-5 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-2 border-teal-500 bg-teal-50'
                          : isDisabled
                          ? 'opacity-50 cursor-not-allowed bg-white'
                          : 'border-slate-200 hover:border-teal-300 bg-white'
                      }`}
                      onClick={() => !isDisabled && toggleHabit(habit.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isSelected
                              ? 'bg-teal-500'
                              : `bg-${habit.color}-100`
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              isSelected
                                ? 'text-white'
                                : `text-${habit.color}-600`
                            }`}
                          />
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-6 h-6 text-teal-600" />
                        )}
                      </div>

                      <h3 className="text-slate-900 mb-1">{habit.name}</h3>
                      <p className="text-sm text-slate-600 mb-3">
                        {habit.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            habit.difficulty === 'Easy'
                              ? 'border-green-200 text-green-700'
                              : 'border-amber-200 text-amber-700'
                          }`}
                        >
                          {habit.difficulty}
                        </Badge>
                        <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">
                          +{habit.mp} MP/day
                        </Badge>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>💡 Tip:</strong> Start with 1-2 habits if you're new to habit building.
                  You can always add more later!
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Set Times & Goals */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-slate-900 mb-2">Set Your Schedule</h2>
                <p className="text-slate-600">
                  Choose the best time for each habit
                </p>
              </div>

              <div className="space-y-4">
                {selectedHabits.map((habitId) => {
                  const habit = habitOptions.find((h) => h.id === habitId);
                  if (!habit) return null;

                  const Icon = habit.icon;

                  return (
                    <Card key={habitId} className="p-5 bg-white border-slate-200">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-${habit.color}-100 rounded-xl flex items-center justify-center shrink-0`}>
                          <Icon className={`w-6 h-6 text-${habit.color}-600`} />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div>
                            <h3 className="text-slate-900 mb-1">{habit.name}</h3>
                            <p className="text-sm text-slate-600">
                              {habit.description}
                            </p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`time-${habitId}`} className="text-sm text-slate-700 mb-2 block">
                                Preferred Time
                              </Label>
                              <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                  id={`time-${habitId}`}
                                  type="time"
                                  value={habitTimes[habitId] || ''}
                                  onChange={(e) =>
                                    setHabitTimes({
                                      ...habitTimes,
                                      [habitId]: e.target.value,
                                    })
                                  }
                                  className="pl-10"
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor={`goal-${habitId}`} className="text-sm text-slate-700 mb-2 block">
                                Daily Goal
                              </Label>
                              <Input
                                id={`goal-${habitId}`}
                                placeholder="e.g., 15 minutes"
                                value={habitGoals[habitId] || ''}
                                onChange={(e) =>
                                  setHabitGoals({
                                    ...habitGoals,
                                    [habitId]: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg border border-teal-200">
                <Sparkles className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-teal-900 mb-1">
                    <strong>AI Scheduling Available</strong>
                  </p>
                  <p className="text-sm text-teal-700">
                    Once you unlock AI features, we'll automatically optimize your schedule based
                    on your energy levels and availability.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Launch */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-slate-900 mb-2">You're All Set!</h2>
                <p className="text-slate-600">
                  Review your 21-day habit plan
                </p>
              </div>

              {/* Summary */}
              <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
                <h3 className="text-slate-900 mb-4">Your Habits</h3>
                <div className="space-y-3">
                  {selectedHabits.map((habitId) => {
                    const habit = habitOptions.find((h) => h.id === habitId);
                    if (!habit) return null;

                    const Icon = habit.icon;

                    return (
                      <div
                        key={habitId}
                        className="flex items-center justify-between p-3 bg-white rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-${habit.color}-100 rounded-lg flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 text-${habit.color}-600`} />
                          </div>
                          <div>
                            <p className="text-sm text-slate-900">{habit.name}</p>
                            <p className="text-xs text-slate-600">
                              {habitTimes[habitId] || 'No time set'} •{' '}
                              {habitGoals[habitId] || habit.description}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-amber-100 text-amber-700 border-0">
                          +{habit.mp} MP
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Milestones */}
              <div>
                <h3 className="text-slate-900 mb-4">Milestone Rewards</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-4 bg-white border-slate-200 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-slate-900 mb-1">Day 7</p>
                    <p className="text-sm text-slate-600 mb-2">First Week</p>
                    <Badge className="bg-amber-100 text-amber-700 border-0">
                      +100 MP
                    </Badge>
                  </Card>
                  <Card className="p-4 bg-white border-slate-200 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-slate-900 mb-1">Day 14</p>
                    <p className="text-sm text-slate-600 mb-2">Halfway There</p>
                    <Badge className="bg-amber-100 text-amber-700 border-0">
                      +200 MP
                    </Badge>
                  </Card>
                  <Card className="p-4 bg-white border-slate-200 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Trophy className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-slate-900 mb-1">Day 21</p>
                    <p className="text-sm text-slate-600 mb-2">Habit Formed!</p>
                    <Badge className="bg-amber-100 text-amber-700 border-0">
                      +500 MP
                    </Badge>
                  </Card>
                </div>
              </div>

              {/* What's Next */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-900 mb-2">
                  <strong>What happens next:</strong>
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>✓ Daily reminders at your chosen times</li>
                  <li>✓ Simple check-ins to track completion</li>
                  <li>✓ Progress tracking in your dashboard</li>
                  <li>✓ Earn Mastery Points for consistency</li>
                  <li>✓ Unlock milestone rewards (7, 14, 21 days)</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
            {step > 1 ? (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            ) : (
              <div />
            )}

            <Button
              className="bg-teal-500 hover:bg-teal-600 text-white border-0"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {step === totalSteps ? (
                <>
                  Launch My Journey
                  <Sparkles className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
