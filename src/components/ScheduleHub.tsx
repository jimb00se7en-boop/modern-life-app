import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar } from './ui/calendar';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Sparkles,
  CheckCircle2,
  Circle,
  AlertCircle,
  Users,
  Video,
  MapPin,
  MoreVertical,
} from 'lucide-react';

export function ScheduleHub() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const todayEvents = [
    {
      id: '1',
      title: 'Morning Meditation',
      time: '7:00 AM',
      duration: '15 min',
      category: 'Wellness',
      type: 'personal',
      completed: true,
      color: 'teal',
    },
    {
      id: '2',
      title: 'Team Standup',
      time: '9:30 AM',
      duration: '30 min',
      category: 'Work',
      type: 'meeting',
      attendees: 5,
      location: 'Zoom',
      completed: false,
      color: 'blue',
    },
    {
      id: '3',
      title: 'Study: React Hooks',
      time: '10:30 AM',
      duration: '45 min',
      category: 'Learning',
      type: 'study',
      completed: false,
      color: 'purple',
    },
    {
      id: '4',
      title: 'Lunch Break',
      time: '12:00 PM',
      duration: '60 min',
      category: 'Personal',
      type: 'break',
      completed: false,
      color: 'amber',
    },
    {
      id: '5',
      title: 'Emma - Daycare Pickup',
      time: '3:30 PM',
      duration: '30 min',
      category: 'Childcare',
      type: 'childcare',
      location: 'Little Stars Daycare',
      completed: false,
      urgent: true,
      color: 'pink',
    },
    {
      id: '6',
      title: 'Evening Walk',
      time: '6:00 PM',
      duration: '20 min',
      category: 'Wellness',
      type: 'personal',
      completed: false,
      color: 'teal',
    },
  ];

  const upcomingWeek = [
    { day: 'Mon', events: 8, highlight: false },
    { day: 'Tue', events: 6, highlight: false },
    { day: 'Wed', events: 7, highlight: true },
    { day: 'Thu', events: 5, highlight: false },
    { day: 'Fri', events: 9, highlight: false },
    { day: 'Sat', events: 3, highlight: false },
    { day: 'Sun', events: 2, highlight: false },
  ];

  const suggestions = [
    {
      title: 'Optimize your morning routine',
      description: 'Move meditation to 6:30 AM for better consistency',
      impact: 'High',
    },
    {
      title: 'Add buffer time',
      description: 'Schedule 15 min break between meetings',
      impact: 'Medium',
    },
    {
      title: 'Study session reminder',
      description: 'You have 2 overdue study sessions',
      impact: 'High',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header - Throat Chakra (Blue) */}
      <div className="flex items-center justify-between chakra-schedule">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-slate-900">Schedule Manager</h2>
                <span className="text-xs text-blue-600 px-2 py-1 bg-blue-50 rounded-full border border-blue-200">Throat Chakra 💙</span>
              </div>
              <p className="text-sm text-slate-600">Organize with clarity, communicate truth</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Sparkles className="w-4 h-4 mr-2" />
            Auto-Schedule
          </Button>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white border-0">
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white border-slate-200">
          <p className="text-sm text-slate-600 mb-1">Today's Events</p>
          <p className="text-2xl text-slate-900">{todayEvents.length}</p>
        </Card>
        <Card className="p-4 bg-white border-slate-200">
          <p className="text-sm text-slate-600 mb-1">Completed</p>
          <p className="text-2xl text-slate-900">
            {todayEvents.filter((e) => e.completed).length}
          </p>
        </Card>
        <Card className="p-4 bg-white border-slate-200">
          <p className="text-sm text-slate-600 mb-1">Time Saved</p>
          <p className="text-2xl text-slate-900">2.5h</p>
          <p className="text-xs text-teal-600">This week</p>
        </Card>
        <Card className="p-4 bg-white border-slate-200">
          <p className="text-sm text-slate-600 mb-1">Efficiency</p>
          <p className="text-2xl text-slate-900">87%</p>
          <p className="text-xs text-teal-600">+5% vs last week</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-slate-900">Today's Schedule</h3>
              <Badge className="bg-slate-100 text-slate-700 border-0">
                Monday, Oct 13
              </Badge>
            </div>

            <div className="space-y-3">
              {todayEvents.map((event) => (
                <div
                  key={event.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                    event.completed
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  {/* Time indicator */}
                  <div className="text-center shrink-0 w-20">
                    <p className="text-sm text-slate-900">{event.time}</p>
                    <p className="text-xs text-slate-500">{event.duration}</p>
                  </div>

                  {/* Color bar */}
                  <div
                    className={`w-1 rounded-full self-stretch bg-${event.color}-500`}
                    style={{
                      backgroundColor:
                        event.color === 'teal'
                          ? '#14b8a6'
                          : event.color === 'blue'
                          ? '#3b82f6'
                          : event.color === 'purple'
                          ? '#a855f7'
                          : event.color === 'amber'
                          ? '#f59e0b'
                          : '#ec4899',
                    }}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p
                            className={`text-slate-900 ${
                              event.completed ? 'line-through text-slate-500' : ''
                            }`}
                          >
                            {event.title}
                          </p>
                          {event.urgent && (
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <Badge variant="outline" className="text-xs">
                            {event.category}
                          </Badge>
                          {event.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </span>
                          )}
                          {event.attendees && (
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {event.attendees}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Status */}
                  <button className="shrink-0">
                    {event.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-teal-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Suggestions */}
          <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <h3 className="text-slate-900">AI Optimization Suggestions</h3>
            </div>
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="p-3 bg-white rounded-lg border border-teal-200">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm text-slate-900">{suggestion.title}</p>
                    <Badge
                      className={`text-xs border-0 ${
                        suggestion.impact === 'High'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {suggestion.impact}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{suggestion.description}</p>
                  <Button size="sm" variant="outline" className="text-xs h-7">
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Calendar & Week View */}
        <div className="space-y-4">
          <Card className="p-6 bg-white border-slate-200">
            <h3 className="text-slate-900 mb-4">Calendar</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border-0"
            />
          </Card>

          <Card className="p-6 bg-white border-slate-200">
            <h3 className="text-slate-900 mb-4">Week Overview</h3>
            <div className="space-y-3">
              {upcomingWeek.map((day, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    day.highlight ? 'bg-teal-50 border border-teal-200' : 'bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-sm ${
                          day.highlight ? 'text-teal-900' : 'text-slate-900'
                        }`}
                      >
                        {day.day}
                      </p>
                      <p className="text-xs text-slate-500">{day.events} events</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(day.events)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-6 rounded-full ${
                            day.highlight ? 'bg-teal-400' : 'bg-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <p className="text-sm text-slate-900 mb-1">Conflict Detected</p>
                <p className="text-xs text-slate-600">
                  Emma's pickup time overlaps with your 3 PM meeting
                </p>
                <Button size="sm" variant="outline" className="mt-2 text-xs h-7">
                  Resolve
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
