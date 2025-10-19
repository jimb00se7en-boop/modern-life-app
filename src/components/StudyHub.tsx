import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AudioPlayer } from './AudioPlayer';
import { getTracksByRecommendation, AudioTrack } from '../data/AudioDatabase';
import {
  BookOpen,
  Plus,
  Play,
  Pause,
  Clock,
  Target,
  TrendingUp,
  CheckCircle2,
  Circle,
  Sparkles,
  Brain,
  FileText,
  Video,
  Headphones,
  Music,
  Radio,
} from 'lucide-react';

export function StudyHub() {
  const [activeSession, setActiveSession] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [selectedAudio, setSelectedAudio] = useState<AudioTrack | null>(null);

  // Get focus-specific audio tracks
  const focusAudio = getTracksByRecommendation('focus').slice(0, 6);

  const subjects = [
    {
      id: '1',
      name: 'React Development',
      progress: 68,
      hoursThisWeek: 4.5,
      nextLesson: 'Advanced Hooks',
      color: 'blue',
    },
    {
      id: '2',
      name: 'UX Design Principles',
      progress: 45,
      hoursThisWeek: 3.0,
      nextLesson: 'User Research Methods',
      color: 'purple',
    },
    {
      id: '3',
      name: 'Spanish Language',
      progress: 82,
      hoursThisWeek: 2.5,
      nextLesson: 'Conversation Practice',
      color: 'amber',
    },
  ];

  const todaySessions = [
    {
      id: '1',
      subject: 'React Development',
      topic: 'useState and useEffect',
      time: '10:00 AM',
      duration: '45 min',
      type: 'Video',
      completed: true,
      color: 'blue',
    },
    {
      id: '2',
      subject: 'React Development',
      topic: 'Custom Hooks Practice',
      time: '2:00 PM',
      duration: '30 min',
      type: 'Practice',
      completed: false,
      color: 'blue',
    },
    {
      id: '3',
      subject: 'Spanish Language',
      topic: 'Vocabulary Review',
      time: '4:30 PM',
      duration: '20 min',
      type: 'Flashcards',
      completed: false,
      color: 'amber',
    },
  ];

  const materials = [
    {
      name: 'React Documentation',
      type: 'Reference',
      subject: 'React Development',
      lastAccessed: '2 hours ago',
    },
    {
      name: 'UX Principles Course',
      type: 'Video',
      subject: 'UX Design',
      lastAccessed: 'Yesterday',
    },
    {
      name: 'Spanish Flashcards',
      type: 'Study Cards',
      subject: 'Spanish',
      lastAccessed: '3 days ago',
    },
  ];

  const weeklyGoals = [
    { goal: 'Complete 5 React modules', current: 3, target: 5 },
    { goal: 'Study 10 hours total', current: 7.5, target: 10 },
    { goal: 'Spanish practice daily', current: 5, target: 7 },
  ];

  return (
    <div className="space-y-6 chakra-study">
      {/* Header - Solar Plexus Chakra (Yellow) */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-slate-900">Study Hub</h2>
                <span className="text-xs text-yellow-600 px-2 py-1 bg-yellow-50 rounded-full border border-yellow-200">Solar Plexus ☀️</span>
              </div>
              <p className="text-sm text-slate-600">Harness your willpower, achieve mastery</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Target className="w-4 h-4 mr-2" />
            Set Goal
          </Button>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white border-0">
            <Plus className="w-4 h-4 mr-2" />
            Add Subject
          </Button>
        </div>
      </div>

      {/* Active Session Timer */}
      {activeSession && (
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Current Session</p>
                <p className="text-2xl text-slate-900">25:30</p>
                <p className="text-sm text-slate-600">React Development</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg">
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
              <Button variant="outline" size="lg">
                End Session
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white border-slate-200">
          <p className="text-sm text-slate-600 mb-1">This Week</p>
          <p className="text-2xl text-slate-900">10.0h</p>
          <p className="text-xs text-teal-600">+2.5h from last week</p>
        </Card>
        <Card className="p-4 bg-white border-slate-200">
          <p className="text-sm text-slate-600 mb-1">Active Subjects</p>
          <p className="text-2xl text-slate-900">{subjects.length}</p>
        </Card>
        <Card className="p-4 bg-white border-slate-200">
          <p className="text-sm text-slate-600 mb-1">Study Streak</p>
          <p className="text-2xl text-slate-900">12 days</p>
          <p className="text-xs text-teal-600">Personal best!</p>
        </Card>
        <Card className="p-4 bg-white border-slate-200">
          <p className="text-sm text-slate-600 mb-1">Mastery Points</p>
          <p className="text-2xl text-slate-900">340</p>
          <p className="text-xs text-amber-600">This month</p>
        </Card>
      </div>

      <Tabs defaultValue="subjects" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="audio">
            <Music className="w-4 h-4 mr-2" />
            Focus Audio
          </TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        {/* Subjects */}
        <TabsContent value="subjects" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Card
                key={subject.id}
                className="p-6 bg-white border-slate-200 hover:border-purple-300 transition-all cursor-pointer"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-900">{subject.name}</h3>
                    <Badge
                      className={`${
                        subject.color === 'blue'
                          ? 'bg-blue-100 text-blue-700'
                          : subject.color === 'purple'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-amber-100 text-amber-700'
                      } border-0`}
                    >
                      {subject.progress}%
                    </Badge>
                  </div>
                  <Progress value={subject.progress} className="h-2 mb-3" />
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>{subject.hoursThisWeek}h this week</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-600 mb-2">Next Lesson</p>
                  <p className="text-sm text-slate-900 mb-3">{subject.nextLesson}</p>
                  <Button
                    size="sm"
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white border-0"
                  >
                    <Play className="w-3 h-3 mr-2" />
                    Start Learning
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Materials */}
          <Card className="p-6 bg-white border-slate-200">
            <h3 className="text-slate-900 mb-4">Study Materials</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {materials.map((material, index) => (
                <Card
                  key={index}
                  className="p-4 bg-slate-50 border-slate-200 hover:border-purple-300 cursor-pointer transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                      {material.type === 'Video' && (
                        <Video className="w-5 h-5 text-purple-600" />
                      )}
                      {material.type === 'Reference' && (
                        <FileText className="w-5 h-5 text-blue-600" />
                      )}
                      {material.type === 'Study Cards' && (
                        <Brain className="w-5 h-5 text-amber-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 mb-1">{material.name}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Badge variant="outline" className="text-xs">
                          {material.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        {material.lastAccessed}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Focus Audio */}
        <TabsContent value="audio" className="space-y-4">
          {selectedAudio ? (
            <div className="space-y-4">
              <AudioPlayer track={selectedAudio} />
              <Button
                variant="outline"
                onClick={() => setSelectedAudio(null)}
                className="w-full"
              >
                Browse More Focus Audio
              </Button>
            </div>
          ) : (
            <>
              <Card className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center shrink-0">
                    <Radio className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 mb-1">Focus Audio Library</h3>
                    <p className="text-sm text-slate-700">
                      Beta and gamma wave frequencies, isochronic tones, and concentration-enhancing audio for deep study sessions
                    </p>
                  </div>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                {focusAudio.map((track) => {
                  const Icon = track.category === 'frequency' ? Radio : track.category === 'chant' ? Music : Headphones;
                  return (
                    <Card
                      key={track.id}
                      className="p-4 border-slate-200 hover:border-purple-300 cursor-pointer transition-all bg-white"
                      onClick={() => setSelectedAudio(track)}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-slate-900 truncate">{track.title}</h4>
                          <p className="text-xs text-slate-600">{track.subcategory}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {track.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {track.benefits.slice(0, 2).map((benefit, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                        <Badge className="bg-purple-100 text-purple-700 border-0 text-xs">
                          {track.duration}m
                        </Badge>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <Button variant="outline" className="w-full">
                Browse Full Audio Library
                <Music className="w-4 h-4 ml-2" />
              </Button>
            </>
          )}
        </TabsContent>

        {/* Schedule */}
        <TabsContent value="schedule" className="space-y-4">
          <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-slate-900">Today's Study Sessions</h3>
              <Badge className="bg-slate-100 text-slate-700 border-0">
                Monday, Oct 13
              </Badge>
            </div>

            <div className="space-y-3">
              {todaySessions.map((session) => (
                <div
                  key={session.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                    session.completed
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-white border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <div className="text-center shrink-0 w-20">
                    <p className="text-sm text-slate-900">{session.time}</p>
                    <p className="text-xs text-slate-500">{session.duration}</p>
                  </div>

                  <div
                    className="w-1 rounded-full self-stretch"
                    style={{
                      backgroundColor:
                        session.color === 'blue'
                          ? '#3b82f6'
                          : session.color === 'purple'
                          ? '#a855f7'
                          : '#f59e0b',
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="text-xs mb-2">
                      {session.subject}
                    </Badge>
                    <p
                      className={`text-slate-900 mb-1 ${
                        session.completed ? 'line-through text-slate-500' : ''
                      }`}
                    >
                      {session.topic}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      {session.type === 'Video' && <Video className="w-3 h-3" />}
                      {session.type === 'Practice' && <Brain className="w-3 h-3" />}
                      {session.type === 'Flashcards' && <FileText className="w-3 h-3" />}
                      <span>{session.type}</span>
                    </div>
                  </div>

                  {!session.completed && (
                    <Button
                      size="sm"
                      className="bg-teal-500 hover:bg-teal-600 text-white border-0"
                    >
                      <Play className="w-3 h-3" />
                    </Button>
                  )}

                  <button className="shrink-0">
                    {session.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-teal-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <h3 className="text-slate-900">AI Study Optimizer</h3>
            </div>
            <p className="text-sm text-slate-700 mb-3">
              Based on your learning patterns and goals:
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Schedule React practice before 11 AM (peak focus time)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Add 15-min review sessions for better retention</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Spanish flashcards work best in 20-min intervals</span>
              </li>
            </ul>
          </Card>
        </TabsContent>

        {/* Progress */}
        <TabsContent value="progress" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-slate-900 mb-4">Weekly Goals</h3>
              <div className="space-y-4">
                {weeklyGoals.map((goal, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-900">{goal.goal}</p>
                      <p className="text-sm text-slate-600">
                        {goal.current}/{goal.target}
                      </p>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-slate-900 mb-4">Study Time (7 Days)</h3>
              <div className="space-y-3">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                  const hours = [1.5, 2.0, 1.2, 1.8, 2.5, 0.8, 0.2][index];
                  return (
                    <div key={day}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">{day}</span>
                        <span className="text-sm text-slate-900">{hours}h</span>
                      </div>
                      <Progress value={(hours / 3) * 100} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 bg-white border-slate-200 md:col-span-2">
              <h3 className="text-slate-900 mb-4">Mastery Achievements</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-teal-600" />
                    <p className="text-sm text-slate-900">12-Day Streak</p>
                  </div>
                  <p className="text-xs text-slate-600">Studied every day for 12 days</p>
                  <Badge className="bg-amber-100 text-amber-700 border-0 mt-2 text-xs">
                    +50 MP
                  </Badge>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600" />
                    <p className="text-sm text-slate-900">React Master</p>
                  </div>
                  <p className="text-xs text-slate-600">Completed 15 React modules</p>
                  <Badge className="bg-amber-100 text-amber-700 border-0 mt-2 text-xs">
                    +100 MP
                  </Badge>
                </div>
                <div className="p-4 bg-slate-100 rounded-lg border border-slate-300 opacity-60">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-slate-400" />
                    <p className="text-sm text-slate-900">Spanish Fluent</p>
                  </div>
                  <p className="text-xs text-slate-600">Complete 50 Spanish lessons</p>
                  <Progress value={82} className="h-1 mt-2" />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
