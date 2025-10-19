import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar } from './ui/avatar';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './ui/sheet';
import {
  LayoutDashboard,
  Brain,
  Moon,
  Calendar,
  Apple,
  Baby,
  BookOpen,
  Store,
  Settings,
  Bell,
  Search,
  TrendingUp,
  Clock,
  Target,
  Zap,
  ChevronRight,
  Play,
  CheckCircle2,
  Circle,
  Menu,
  Music,
  Sparkles,
  X,
  PartyPopper,
  FileText,
  Lock,
} from 'lucide-react';
import { MeditationHub } from './MeditationHub';
import { SleepHub } from './SleepHub';
import { ScheduleHub } from './ScheduleHub';
import { NutritionHub } from './NutritionHub';
import { ChildcareHub } from './ChildcareHub';
import { StudyHub } from './StudyHub';
import { MarketplaceHub } from './MarketplaceHub';
import { MasteryCenter } from './MasteryCenter';
import { ProfileSettings } from './ProfileSettings';
import { NotificationsCenter } from './NotificationsCenter';
import { AudioContentHub } from './AudioContentHub';
import { TemplatesHub } from './TemplatesHub';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Check if user just completed onboarding
  useEffect(() => {
    const userData = localStorage.getItem('modernlife_user_data');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        const lastLogin = new Date(parsed.lastLogin);
        const now = new Date();
        const timeSinceLogin = now.getTime() - lastLogin.getTime();
        // Show welcome if logged in within last 5 minutes (just completed onboarding)
        if (timeSinceLogin < 5 * 60 * 1000 && parsed.completedOnboarding) {
          setShowWelcome(true);
          // Auto-hide after 10 seconds
          setTimeout(() => setShowWelcome(false), 10000);
        }
      } catch (error) {
        console.error('Failed to check login time:', error);
      }
    }
  }, []);

  const stats = [
    { label: 'Current Streak', value: '7 days', icon: TrendingUp, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Mastery Points', value: '1,240', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Active Goals', value: '5', icon: Target, color: 'text-slate-600', bg: 'bg-slate-50' },
    { label: 'Time Saved', value: '2.5 hrs', icon: Clock, color: 'text-teal-600', bg: 'bg-teal-50' },
  ];

  const todayTasks = [
    { id: 1, title: 'Morning Meditation', time: '7:00 AM', category: 'Meditation', completed: true, duration: '15 min' },
    { id: 2, title: 'Breakfast Logging', time: '8:00 AM', category: 'Nutrition', completed: true, duration: '5 min' },
    { id: 3, title: 'Study Session: React', time: '10:00 AM', category: 'Study', completed: false, duration: '45 min' },
    { id: 4, title: 'Mindfulness Break', time: '2:00 PM', category: 'Mental Health', completed: false, duration: '10 min' },
    { id: 5, title: 'Sleep Routine Prep', time: '9:00 PM', category: 'Sleep', completed: false, duration: '30 min' },
  ];

  const progressMetrics = [
    { name: 'Meditation Mastery', current: 65, total: 100, tier: 'Explorer', nextTier: 'Architect' },
    { name: 'Sleep Optimization', current: 42, total: 100, tier: 'Foundation', nextTier: 'Explorer' },
    { name: 'Nutrition Tracking', current: 88, total: 100, tier: 'Architect', nextTier: 'Master' },
  ];

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'meditation', label: 'Meditation', icon: Brain },
    { id: 'sleep', label: 'Sleep', icon: Moon },
    { id: 'audio', label: 'Audio Library', icon: Music },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'nutrition', label: 'Nutrition', icon: Apple },
    { id: 'childcare', label: 'Childcare', icon: Baby },
    { id: 'study', label: 'Study', icon: BookOpen },
    { id: 'templates', label: 'Templates', icon: FileText, locked: false }, // Unlocked at Bronze
    { id: 'marketplace', label: 'Marketplace', icon: Store },
    { id: 'mastery', label: 'Mastery Points', icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 120 120" className="w-10 h-10">
                <ellipse cx="77" cy="48" rx="22" ry="16" fill="none" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.6" transform="rotate(-15 77 48)"/>
                <ellipse cx="77" cy="48" rx="16" ry="11" fill="none" stroke="#94a3b8" strokeWidth="1.5" opacity="0.7" transform="rotate(-15 77 48)"/>
                <ellipse cx="77" cy="48" rx="10" ry="7" fill="none" stroke="#64748b" strokeWidth="1.5" opacity="0.8" transform="rotate(-15 77 48)"/>
                <rect x="20" y="50" width="4" height="30" fill="#0f172a" rx="2"/>
                <rect x="28" y="50" width="4" height="30" fill="#0f172a" rx="2"/>
                <path d="M22 55 L26 60 L30 55" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="40" y="50" width="4" height="30" fill="#0f172a" rx="2"/>
                <rect x="40" y="76" width="15" height="4" fill="#0f172a" rx="2"/>
                <path d="M65 45 L70 50 L65 55 M70 50 L75 45 M70 50 L75 55" stroke="#14b8a6" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="85" cy="45" r="2.5" fill="#f59e0b"/>
                <circle cx="88" cy="52" r="1.8" fill="#f59e0b"/>
                <circle cx="82" cy="51" r="1.3" fill="#f59e0b" opacity="0.7"/>
              </svg>
              <div>
                <p className="text-slate-900">Modern Life</p>
                <p className="text-xs text-slate-500">Welcome back, Sarah</p>
              </div>
            </div>

            {/* Search & Actions */}
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search activities..."
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64"
                />
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-5 h-5 text-slate-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
                </Button>
                {showNotifications && (
                  <NotificationsCenter onClose={() => setShowNotifications(false)} />
                )}
              </div>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="w-5 h-5 text-slate-600" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Access all hubs and features of Modern Life
                  </SheetDescription>
                  <div className="p-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 bg-teal-100 text-teal-700 flex items-center justify-center">
                        <span>S</span>
                      </Avatar>
                      <div>
                        <p className="text-sm text-slate-900">Sarah</p>
                        <p className="text-xs text-slate-500">Explorer Tier</p>
                      </div>
                    </div>
                  </div>
                  <nav className="p-4 space-y-1">
                    {sidebarItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                            activeTab === item.id
                              ? 'bg-teal-50 text-teal-700'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          {item.label}
                        </button>
                      );
                    })}
                    <div className="pt-4 border-t border-slate-200">
                      <button
                        onClick={() => {
                          setActiveTab('settings');
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                          activeTab === 'settings'
                            ? 'bg-teal-50 text-teal-700'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <Settings className="w-5 h-5" />
                        Settings
                      </button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
              
              <Avatar className="w-9 h-9 bg-teal-100 text-teal-700 flex items-center justify-center hidden md:flex">
                <span>S</span>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 min-h-screen sticky top-[73px] self-start hidden md:block">
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    activeTab === item.id
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 border-t border-slate-200 mt-4">
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Settings className="w-5 h-5" />
                Settings
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Render active hub or dashboard overview */}
          {activeTab === 'meditation' && <MeditationHub />}
          {activeTab === 'sleep' && <SleepHub />}
          {activeTab === 'audio' && <AudioContentHub userTier="bronze" userMP={1240} />}
          {activeTab === 'schedule' && <ScheduleHub />}
          {activeTab === 'nutrition' && <NutritionHub />}
          {activeTab === 'childcare' && <ChildcareHub />}
          {activeTab === 'study' && <StudyHub />}
          {activeTab === 'templates' && <TemplatesHub userTier="bronze" userMP={1240} />}
          {activeTab === 'marketplace' && <MarketplaceHub />}
          {activeTab === 'mastery' && <MasteryCenter />}
          {activeTab === 'settings' && <ProfileSettings />}
          
          {activeTab === 'overview' && (
            <>
              {/* Welcome Banner for New Users */}
              {showWelcome && (
                <Card className="p-6 bg-gradient-to-r from-teal-500 to-cyan-600 border-0 mb-6 relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-white hover:bg-white/20"
                    onClick={() => setShowWelcome(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                      <PartyPopper className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white mb-2">Welcome to Modern Life! 🎉</h3>
                      <p className="text-white/90 text-sm mb-3">
                        Congratulations on completing your 21-Day Habit Builder! Your personalized wellness journey starts now.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-white/20 border-0 text-white text-xs">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Habits Configured
                        </Badge>
                        <Badge className="bg-white/20 border-0 text-white text-xs">
                          Dashboard Unlocked
                        </Badge>
                        <Badge className="bg-white/20 border-0 text-white text-xs">
                          +50 Mastery Points Earned
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
              
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-slate-900 mb-2">Good Morning, Sarah 👋</h1>
                <p className="text-slate-600">You're on a 7-day streak! Keep the momentum going.</p>
              </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 bg-white border-slate-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-2xl text-slate-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Today's Schedule */}
            <Card className="lg:col-span-2 p-6 bg-white border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-slate-900 mb-1">Today's Schedule</h3>
                  <p className="text-sm text-slate-600">Monday, October 13, 2025</p>
                </div>
                <Button size="sm" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>

              <div className="space-y-3">
                {todayTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                      task.completed
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-white border-slate-200 hover:border-teal-300 hover:shadow-sm'
                    }`}
                  >
                    <button className="shrink-0">
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-teal-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm mb-1 ${task.completed ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.time}
                        </span>
                        <span>•</span>
                        <span>{task.duration}</span>
                        <Badge variant="outline" className="text-xs border-slate-200">
                          {task.category}
                        </Badge>
                      </div>
                    </div>
                    {!task.completed && (
                      <Button size="sm" variant="ghost" className="shrink-0">
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Progress Tracking */}
            <Card className="p-6 bg-white border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-slate-900">Tier Progress</h3>
                <Button size="sm" variant="ghost" className="text-teal-600 hover:text-teal-700">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-6">
                {progressMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm text-slate-900 mb-1">{metric.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge className="text-xs bg-slate-100 text-slate-700 border-0">
                            {metric.tier}
                          </Badge>
                          <span className="text-xs text-slate-500">→ {metric.nextTier}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <Progress value={metric.current} className="h-2" />
                    </div>
                    <p className="text-xs text-slate-600">
                      {metric.current}/{metric.total} points
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-slate-900">Next Reward</p>
                  <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">
                    120 MP to unlock
                  </Badge>
                </div>
                <div className="p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
                  <p className="text-sm text-slate-900 mb-1">AI Schedule Optimizer</p>
                  <p className="text-xs text-slate-600">Automatically balance your daily activities</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Brain className="w-6 h-6 text-teal-600" />
              <span className="text-sm">Start Meditation</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Calendar className="w-6 h-6 text-slate-600" />
              <span className="text-sm">Add Schedule</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Apple className="w-6 h-6 text-amber-600" />
              <span className="text-sm">Log Meal</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <Store className="w-6 h-6 text-teal-600" />
              <span className="text-sm">Browse Templates</span>
            </Button>
          </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
