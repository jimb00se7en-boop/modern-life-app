import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import {
  User,
  Mail,
  Lock,
  Bell,
  Zap,
  Award,
  Calendar,
  CreditCard,
  Shield,
  Smartphone,
  Globe,
  Moon,
  Volume2,
  CheckCircle2,
  Crown,
  TrendingUp,
  Target,
  Clock,
  LogOut,
  AlertTriangle,
  Trash2,
} from 'lucide-react';

export function ProfileSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    meditation: true,
    sleep: true,
    schedule: true,
    achievements: true,
  });

  const userProfile = {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'S',
    memberSince: 'January 2025',
    currentTier: 'Explorer',
    nextTier: 'Architect',
    tierProgress: 68,
    totalMP: 1240,
    streak: 7,
  };

  const activityHistory = [
    { date: 'Today', activities: 5, mp: 25, time: '2h 15m' },
    { date: 'Yesterday', activities: 6, mp: 30, time: '2h 45m' },
    { date: 'Oct 11', activities: 4, mp: 20, time: '1h 50m' },
    { date: 'Oct 10', activities: 7, mp: 35, time: '3h 10m' },
    { date: 'Oct 9', activities: 5, mp: 25, time: '2h 20m' },
  ];

  const connectedApps = [
    { name: 'Google Calendar', icon: '📅', status: 'Connected', color: 'blue' },
    { name: 'Apple Health', icon: '❤️', status: 'Connected', color: 'red' },
    { name: 'Spotify', icon: '🎵', status: 'Not Connected', color: 'green' },
    { name: 'Fitbit', icon: '⌚', status: 'Not Connected', color: 'teal' },
  ];

  const recentAchievements = [
    { name: '7-Day Streak', icon: '🔥', date: 'Today', mp: 50 },
    { name: 'Meditation Master', icon: '🧘', date: 'Oct 11', mp: 100 },
    { name: 'Early Bird', icon: '🌅', date: 'Oct 10', mp: 25 },
    { name: 'Study Champion', icon: '📚', date: 'Oct 9', mp: 75 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900 mb-2">Profile & Settings</h2>
          <p className="text-sm text-slate-600">Manage your account and preferences</p>
        </div>
      </div>

      {/* Profile Summary Card */}
      <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 text-white flex items-center justify-center text-2xl">
              {userProfile.avatar}
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-slate-900">{userProfile.name}</h3>
                <Badge className="bg-teal-600 text-white border-0">
                  <Crown className="w-3 h-3 mr-1" />
                  {userProfile.currentTier}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 mb-1">{userProfile.email}</p>
              <p className="text-xs text-slate-500">Member since {userProfile.memberSince}</p>
            </div>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-teal-200">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Zap className="w-4 h-4 text-amber-600" />
              <p className="text-2xl text-slate-900">{userProfile.totalMP}</p>
            </div>
            <p className="text-xs text-slate-600">Mastery Points</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="w-4 h-4 text-teal-600" />
              <p className="text-2xl text-slate-900">{userProfile.streak}</p>
            </div>
            <p className="text-xs text-slate-600">Day Streak</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <p className="text-2xl text-slate-900">{userProfile.tierProgress}%</p>
            </div>
            <p className="text-xs text-slate-600">To {userProfile.nextTier}</p>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="data">Data & Privacy</TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-slate-600" />
                <h3 className="text-slate-900">Personal Information</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm text-slate-600">Full Name</Label>
                  <Input
                    id="name"
                    defaultValue={userProfile.name}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm text-slate-600">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={userProfile.email}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm text-slate-600">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="mt-1"
                  />
                </div>
                <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white border-0">
                  Save Changes
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-white border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-slate-600" />
                <h3 className="text-slate-900">Security</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current" className="text-sm text-slate-600">Current Password</Label>
                  <Input
                    id="current"
                    type="password"
                    placeholder="••••••••"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="new" className="text-sm text-slate-600">New Password</Label>
                  <Input
                    id="new"
                    type="password"
                    placeholder="••••••••"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="confirm" className="text-sm text-slate-600">Confirm Password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    placeholder="••••••••"
                    className="mt-1"
                  />
                </div>
                <Button variant="outline" className="w-full">
                  Update Password
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-white border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-slate-600" />
                <h3 className="text-slate-900">Preferences</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-900">Language</p>
                    <p className="text-xs text-slate-500">Select your language</p>
                  </div>
                  <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-900">Time Zone</p>
                    <p className="text-xs text-slate-500">Your local timezone</p>
                  </div>
                  <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm">
                    <option>PST (UTC-8)</option>
                    <option>EST (UTC-5)</option>
                    <option>GMT (UTC+0)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-900">Theme</p>
                    <p className="text-xs text-slate-500">Light or dark mode</p>
                  </div>
                  <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>Auto</option>
                  </select>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-slate-600" />
                <h3 className="text-slate-900">Recent Achievements</h3>
              </div>
              <div className="space-y-3">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <p className="text-sm text-slate-900">{achievement.name}</p>
                        <p className="text-xs text-slate-500">{achievement.date}</p>
                      </div>
                    </div>
                    <Badge className="bg-amber-100 text-amber-700 border-0">
                      +{achievement.mp} MP
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Achievements
              </Button>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-slate-600" />
              <h3 className="text-slate-900">Notification Preferences</h3>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-slate-900 mb-4">Channels</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="text-sm text-slate-900">Email Notifications</p>
                        <p className="text-xs text-slate-500">Receive updates via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, email: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="text-sm text-slate-900">Push Notifications</p>
                        <p className="text-xs text-slate-500">Get notified on your device</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, push: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-900 mb-4">Activity Types</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-900">Meditation Reminders</p>
                      <p className="text-xs text-slate-500">Daily meditation prompts</p>
                    </div>
                    <Switch
                      checked={notifications.meditation}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, meditation: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-900">Sleep Schedule</p>
                      <p className="text-xs text-slate-500">Bedtime and wake-up alerts</p>
                    </div>
                    <Switch
                      checked={notifications.sleep}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, sleep: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-900">Schedule Updates</p>
                      <p className="text-xs text-slate-500">Events and calendar changes</p>
                    </div>
                    <Switch
                      checked={notifications.schedule}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, schedule: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-900">Achievement Unlocks</p>
                      <p className="text-xs text-slate-500">Mastery Points and rewards</p>
                    </div>
                    <Switch
                      checked={notifications.achievements}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, achievements: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Connected Apps */}
        <TabsContent value="connected" className="space-y-6">
          <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-slate-600" />
              <h3 className="text-slate-900">Connected Apps & Services</h3>
            </div>

            <div className="space-y-4">
              {connectedApps.map((app, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{app.icon}</span>
                    <div>
                      <p className="text-sm text-slate-900">{app.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {app.status === 'Connected' ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-teal-600" />
                            <p className="text-xs text-teal-600">{app.status}</p>
                          </>
                        ) : (
                          <p className="text-xs text-slate-500">{app.status}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant={app.status === 'Connected' ? 'outline' : 'default'}
                    size="sm"
                    className={
                      app.status === 'Connected'
                        ? ''
                        : 'bg-teal-500 hover:bg-teal-600 text-white border-0'
                    }
                  >
                    {app.status === 'Connected' ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Activity History */}
        <TabsContent value="activity" className="space-y-6">
          <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-slate-600" />
              <h3 className="text-slate-900">Activity History</h3>
            </div>

            <div className="space-y-3">
              {activityHistory.map((day, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-slate-900">{day.date}</p>
                    <Badge className="bg-amber-100 text-amber-700 border-0">
                      +{day.mp} MP
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Activities</p>
                      <p className="text-slate-900">{day.activities}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Time</p>
                      <p className="text-slate-900">{day.time}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Points</p>
                      <p className="text-slate-900">{day.mp} MP</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              View Full History
            </Button>
          </Card>
        </TabsContent>

        {/* Data & Privacy */}
        <TabsContent value="data" className="space-y-6">
          <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-slate-600" />
              <h3 className="text-slate-900">Data & Privacy</h3>
            </div>

            <div className="space-y-6">
              {/* Export Data */}
              <div>
                <h4 className="text-slate-900 mb-2">Export Your Data</h4>
                <p className="text-sm text-slate-600 mb-4">
                  Download a copy of all your wellness data, activity logs, and achievements.
                </p>
                <Button variant="outline">
                  Download Data Archive
                </Button>
              </div>

              {/* Logout */}
              <div className="pt-6 border-t border-slate-200">
                <h4 className="text-slate-900 mb-2">Sign Out</h4>
                <p className="text-sm text-slate-600 mb-4">
                  Sign out of your account on this device. Your data will be saved.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    // Clear session but keep user data for returning
                    window.location.reload();
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>

              {/* Reset/Delete Data */}
              <div className="pt-6 border-t border-slate-200">
                <h4 className="text-slate-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  Danger Zone
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Reset your onboarding to restart the 21-Day Habit Builder, or permanently delete all data.
                </p>
                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    className="border-amber-300 text-amber-700 hover:bg-amber-50"
                    onClick={() => {
                      if (confirm('Reset onboarding? You\'ll go through the 21-Day Habit Builder again on next login.')) {
                        const userData = localStorage.getItem('modernlife_user_data');
                        if (userData) {
                          const parsed = JSON.parse(userData);
                          parsed.completedOnboarding = false;
                          localStorage.setItem('modernlife_user_data', JSON.stringify(parsed));
                        }
                        alert('Onboarding reset! You\'ll see the 21-Day Habit Builder on next login.');
                      }
                    }}
                  >
                    Reset Onboarding
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                    onClick={() => {
                      if (confirm('Delete ALL data? This will clear your account and cannot be undone.')) {
                        if (confirm('Are you absolutely sure? This action is permanent.')) {
                          localStorage.removeItem('modernlife_user_data');
                          localStorage.removeItem('modernlife_audio_favorites');
                          window.location.reload();
                        }
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete All Data
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
