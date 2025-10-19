import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import {
  Bell,
  CheckCircle2,
  Clock,
  Zap,
  Calendar,
  AlertCircle,
  TrendingUp,
  Gift,
  Users,
  X,
} from 'lucide-react';

interface NotificationsCenterProps {
  onClose: () => void;
}

export function NotificationsCenter({ onClose }: NotificationsCenterProps) {
  const notifications = [
    {
      id: '1',
      type: 'achievement',
      icon: Zap,
      title: 'Achievement Unlocked!',
      message: 'You earned "7-Day Streak" - Keep it up!',
      time: '5 minutes ago',
      unread: true,
      color: 'amber',
    },
    {
      id: '2',
      type: 'reminder',
      icon: Clock,
      title: 'Meditation Reminder',
      message: 'Your afternoon mindfulness session is in 15 minutes',
      time: '15 minutes ago',
      unread: true,
      color: 'teal',
    },
    {
      id: '3',
      type: 'schedule',
      icon: AlertCircle,
      title: 'Schedule Conflict',
      message: 'Emma\'s pickup time overlaps with your 3 PM meeting',
      time: '1 hour ago',
      unread: true,
      color: 'red',
    },
    {
      id: '4',
      type: 'marketplace',
      icon: Gift,
      title: 'New Template Available',
      message: 'Check out "Advanced Sleep Optimization" by Dr. Lisa Park',
      time: '2 hours ago',
      unread: false,
      color: 'purple',
    },
    {
      id: '5',
      type: 'milestone',
      icon: TrendingUp,
      title: 'Progress Update',
      message: 'You\'re 80% to Explorer tier! Just 160 more MP',
      time: '3 hours ago',
      unread: false,
      color: 'teal',
    },
    {
      id: '6',
      type: 'community',
      icon: Users,
      title: 'Template Downloaded',
      message: 'Someone downloaded your "Weekly Meal Prep Guide" (+10 MP)',
      time: '5 hours ago',
      unread: false,
      color: 'blue',
    },
    {
      id: '7',
      type: 'achievement',
      icon: CheckCircle2,
      title: 'Goal Completed',
      message: 'You completed your daily nutrition goal!',
      time: 'Yesterday',
      unread: false,
      color: 'green',
    },
    {
      id: '8',
      type: 'reminder',
      icon: Calendar,
      title: 'Sleep Routine',
      message: 'Start your wind-down routine at 9:30 PM',
      time: 'Yesterday',
      unread: false,
      color: 'indigo',
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getIconColor = (color: string) => {
    const colors: Record<string, string> = {
      amber: 'bg-amber-100 text-amber-600',
      teal: 'bg-teal-100 text-teal-600',
      red: 'bg-red-100 text-red-600',
      purple: 'bg-purple-100 text-purple-600',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      indigo: 'bg-indigo-100 text-indigo-600',
    };
    return colors[color] || 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-slate-700" />
            <h3 className="text-slate-900">Notifications</h3>
            {unreadCount > 0 && (
              <Badge className="bg-teal-500 text-white border-0">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="text-xs h-7">
            Mark all read
          </Button>
          <Button size="sm" variant="outline" className="text-xs h-7">
            Settings
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <ScrollArea className="h-[500px]">
        <div className="p-2">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`p-3 rounded-lg mb-2 cursor-pointer transition-all hover:bg-slate-50 ${
                  notification.unread ? 'bg-teal-50/50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getIconColor(
                      notification.color
                    )}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm text-slate-900">
                        {notification.title}
                      </p>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-teal-500 rounded-full shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mb-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-slate-400">{notification.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-slate-200 bg-slate-50">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-teal-600 hover:text-teal-700 hover:bg-teal-50"
        >
          View All Notifications
        </Button>
      </div>
    </div>
  );
}
