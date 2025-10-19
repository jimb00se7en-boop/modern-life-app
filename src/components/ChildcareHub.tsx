import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar } from './ui/avatar';
import {
  Baby,
  Plus,
  Calendar,
  Clock,
  Users,
  Heart,
  Activity,
  Utensils,
  Moon,
  Smile,
  AlertCircle,
  CheckCircle2,
  Phone,
  MapPin,
} from 'lucide-react';

export function ChildcareHub() {
  const children = [
    {
      id: '1',
      name: 'Emma',
      age: '3 years',
      avatar: 'E',
      color: 'bg-pink-100 text-pink-700',
    },
    {
      id: '2',
      name: 'Liam',
      age: '6 months',
      avatar: 'L',
      color: 'bg-blue-100 text-blue-700',
    },
  ];

  const todaySchedule = [
    {
      id: '1',
      child: 'Emma',
      time: '7:30 AM',
      activity: 'Daycare Drop-off',
      location: 'Little Stars Daycare',
      caregiver: 'Sarah (Mom)',
      completed: true,
    },
    {
      id: '2',
      child: 'Liam',
      time: '9:00 AM',
      activity: 'Feeding',
      notes: 'Formula 4oz',
      caregiver: 'Michael (Dad)',
      completed: true,
    },
    {
      id: '3',
      child: 'Emma',
      time: '12:00 PM',
      activity: 'Lunch at Daycare',
      location: 'Little Stars Daycare',
      completed: false,
    },
    {
      id: '4',
      child: 'Liam',
      time: '1:00 PM',
      activity: 'Nap Time',
      duration: '2 hours',
      completed: false,
    },
    {
      id: '5',
      child: 'Emma',
      time: '3:30 PM',
      activity: 'Daycare Pickup',
      location: 'Little Stars Daycare',
      caregiver: 'Sarah (Mom)',
      urgent: true,
      completed: false,
    },
    {
      id: '6',
      child: 'Liam',
      time: '5:30 PM',
      activity: 'Feeding',
      notes: 'Formula 4oz',
      completed: false,
    },
  ];

  const caregivers = [
    {
      name: 'Sarah (Mom)',
      availability: 'Available',
      contact: '555-0123',
      responsibilities: 12,
    },
    {
      name: 'Michael (Dad)',
      availability: 'Work until 5 PM',
      contact: '555-0124',
      responsibilities: 8,
    },
    {
      name: 'Grandma Carol',
      availability: 'Available Wed-Fri',
      contact: '555-0125',
      responsibilities: 4,
    },
  ];

  const emmaStats = {
    meals: { today: 2, target: 3 },
    activities: { today: 3, target: 4 },
    sleep: { last: '11h 30m', quality: 'Good' },
    mood: 'Happy',
  };

  const liamStats = {
    feedings: { today: 4, target: 6 },
    diapers: { today: 5, target: 8 },
    sleep: { last: '2h 15m', total: '10h 30m' },
    mood: 'Content',
  };

  return (
    <div className="space-y-6 chakra-childcare">
      {/* Header - Sacral Chakra (Orange) */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
              <Baby className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-slate-900">Childcare Hub</h2>
                <span className="text-xs text-orange-600 px-2 py-1 bg-orange-50 rounded-full border border-orange-200">Sacral Chakra 🟠</span>
              </div>
              <p className="text-sm text-slate-600">Nurture creativity, embrace connection</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Caregivers
          </Button>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white border-0">
            <Plus className="w-4 h-4 mr-2" />
            Add Activity
          </Button>
        </div>
      </div>

      {/* Children Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Emma */}
        <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 bg-pink-200 text-pink-800 flex items-center justify-center text-lg">
                E
              </Avatar>
              <div>
                <p className="text-lg text-slate-900">Emma</p>
                <p className="text-sm text-slate-600">3 years old</p>
              </div>
            </div>
            <Badge className="bg-pink-100 text-pink-700 border-0">
              <Smile className="w-3 h-3 mr-1" />
              {emmaStats.mood}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Utensils className="w-4 h-4 text-pink-600" />
                <p className="text-xs text-slate-600">Meals</p>
              </div>
              <p className="text-slate-900">
                {emmaStats.meals.today}/{emmaStats.meals.target}
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-pink-600" />
                <p className="text-xs text-slate-600">Activities</p>
              </div>
              <p className="text-slate-900">
                {emmaStats.activities.today}/{emmaStats.activities.target}
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg col-span-2">
              <div className="flex items-center gap-2 mb-1">
                <Moon className="w-4 h-4 text-pink-600" />
                <p className="text-xs text-slate-600">Last Sleep</p>
              </div>
              <p className="text-slate-900">{emmaStats.sleep.last}</p>
              <Badge variant="outline" className="text-xs mt-1">
                {emmaStats.sleep.quality}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Liam */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 bg-blue-200 text-blue-800 flex items-center justify-center text-lg">
                L
              </Avatar>
              <div>
                <p className="text-lg text-slate-900">Liam</p>
                <p className="text-sm text-slate-600">6 months old</p>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-700 border-0">
              <Smile className="w-3 h-3 mr-1" />
              {liamStats.mood}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Utensils className="w-4 h-4 text-blue-600" />
                <p className="text-xs text-slate-600">Feedings</p>
              </div>
              <p className="text-slate-900">
                {liamStats.feedings.today}/{liamStats.feedings.target}
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-4 h-4 text-blue-600" />
                <p className="text-xs text-slate-600">Diapers</p>
              </div>
              <p className="text-slate-900">
                {liamStats.diapers.today}/{liamStats.diapers.target}
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg col-span-2">
              <div className="flex items-center gap-2 mb-1">
                <Moon className="w-4 h-4 text-blue-600" />
                <p className="text-xs text-slate-600">Sleep Today</p>
              </div>
              <p className="text-slate-900">{liamStats.sleep.total}</p>
              <p className="text-xs text-slate-500 mt-1">
                Last nap: {liamStats.sleep.last}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-slate-900">Today's Schedule</h3>
              <Badge className="bg-slate-100 text-slate-700 border-0">
                <Calendar className="w-3 h-3 mr-1" />
                Monday, Oct 13
              </Badge>
            </div>

            <div className="space-y-3">
              {todaySchedule.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                    item.completed
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Time */}
                  <div className="text-center shrink-0 w-16">
                    <p className="text-sm text-slate-900">{item.time}</p>
                  </div>

                  {/* Child indicator */}
                  <Avatar
                    className={`w-8 h-8 ${
                      item.child === 'Emma'
                        ? 'bg-pink-100 text-pink-700'
                        : 'bg-blue-100 text-blue-700'
                    } flex items-center justify-center text-xs shrink-0`}
                  >
                    {item.child[0]}
                  </Avatar>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p
                            className={`text-slate-900 ${
                              item.completed ? 'line-through text-slate-500' : ''
                            }`}
                          >
                            {item.activity}
                          </p>
                          {item.urgent && (
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                          )}
                        </div>
                        <div className="space-y-1 text-xs text-slate-500">
                          {item.location && (
                            <p className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {item.location}
                            </p>
                          )}
                          {item.caregiver && (
                            <p className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {item.caregiver}
                            </p>
                          )}
                          {item.notes && <p>{item.notes}</p>}
                          {item.duration && <p>Duration: {item.duration}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <button className="shrink-0">
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-teal-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Caregivers & Info */}
        <div className="space-y-4">
          <Card className="p-6 bg-white border-slate-200">
            <h3 className="text-slate-900 mb-4">Caregivers</h3>
            <div className="space-y-3">
              {caregivers.map((caregiver, index) => (
                <div key={index} className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-sm text-slate-900 mb-1">{caregiver.name}</p>
                      <p className="text-xs text-slate-600">{caregiver.availability}</p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Phone className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{caregiver.responsibilities} tasks this week</span>
                  </div>
                </div>
              ))}
            </div>

            <Button size="sm" variant="outline" className="w-full mt-4">
              <Plus className="w-3 h-3 mr-2" />
              Add Caregiver
            </Button>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <p className="text-sm text-slate-900 mb-1">Upcoming Conflict</p>
                <p className="text-xs text-slate-600 mb-2">
                  Emma's pickup overlaps with your 3 PM meeting
                </p>
                <Button size="sm" variant="outline" className="text-xs h-7">
                  Resolve
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="text-sm text-slate-900 mb-1">Development Tracker</p>
                <p className="text-xs text-slate-600">
                  Track milestones, growth, and health records
                </p>
                <Badge className="bg-amber-100 text-amber-700 border-0 mt-2 text-xs">
                  Unlock at Explorer tier
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
