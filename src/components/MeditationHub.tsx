import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AudioPlayer } from './AudioPlayer';
import { getTracksByRecommendation, AudioTrack } from '../data/AudioDatabase';
import {
  Brain,
  Play,
  Pause,
  SkipForward,
  Clock,
  TrendingUp,
  Calendar,
  Award,
  Headphones,
  Wind,
  Sparkles,
  Lock,
  CheckCircle2,
  Music,
  Radio,
} from 'lucide-react';

export function MeditationHub() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<AudioTrack | null>(null);

  // Get meditation-specific audio tracks
  const meditationAudio = getTracksByRecommendation('meditation').slice(0, 6);

  const sessions = [
    { 
      id: '1', 
      title: 'Morning Mindfulness', 
      duration: 15, 
      level: 'Foundation',
      category: 'Mindfulness',
      completed: true,
      description: 'Start your day with clarity and focus'
    },
    { 
      id: '2', 
      title: 'Stress Relief', 
      duration: 10, 
      level: 'Foundation',
      category: 'Stress',
      completed: true,
      description: 'Quick reset for busy moments'
    },
    { 
      id: '3', 
      title: 'Body Scan Meditation', 
      duration: 20, 
      level: 'Explorer',
      category: 'Body Awareness',
      completed: false,
      description: 'Deep relaxation through progressive awareness'
    },
    { 
      id: '4', 
      title: 'Loving Kindness', 
      duration: 15, 
      level: 'Explorer',
      category: 'Compassion',
      completed: false,
      description: 'Cultivate compassion for self and others'
    },
    { 
      id: '5', 
      title: 'Advanced Breathwork', 
      duration: 25, 
      level: 'Architect',
      category: 'Breathwork',
      completed: false,
      locked: true,
      description: 'Master pranayama techniques'
    },
  ];

  const breathingExercises = [
    { name: '4-7-8 Breathing', duration: '5 min', difficulty: 'Easy' },
    { name: 'Box Breathing', duration: '10 min', difficulty: 'Easy' },
    { name: 'Alternate Nostril', duration: '8 min', difficulty: 'Medium' },
    { name: 'Wim Hof Method', duration: '15 min', difficulty: 'Advanced', locked: true },
  ];

  const stats = [
    { label: 'Total Minutes', value: '420', change: '+45 this week' },
    { label: 'Current Streak', value: '7 days', change: 'Personal best!' },
    { label: 'Sessions Completed', value: '28', change: '+4 this week' },
    { label: 'Mastery Progress', value: '65%', change: 'Explorer tier' },
  ];

  return (
    <div className="space-y-6 chakra-meditation">
      {/* Header - Heart Chakra (Green) */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-slate-900">Meditation Hub</h2>
                <span className="text-xs text-green-600 px-2 py-1 bg-green-50 rounded-full border border-green-200">Heart Chakra 💚</span>
              </div>
              <p className="text-sm text-slate-600">Find your center, cultivate compassion</p>
            </div>
          </div>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white border-0">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Session
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 bg-white border-slate-200">
            <p className="text-2xl text-slate-900 mb-1">{stat.value}</p>
            <p className="text-sm text-slate-600 mb-2">{stat.label}</p>
            <p className="text-xs text-green-600">{stat.change}</p>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="sessions" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="sessions">Guided Sessions</TabsTrigger>
          <TabsTrigger value="audio">
            <Music className="w-4 h-4 mr-2" />
            Audio
          </TabsTrigger>
          <TabsTrigger value="breathing">Breathing</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        {/* Guided Sessions */}
        <TabsContent value="sessions" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Session List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-900">Available Sessions</h3>
                <Badge className="bg-slate-100 text-slate-700 border-0">
                  {sessions.filter(s => !s.locked).length} unlocked
                </Badge>
              </div>
              {sessions.map((session) => (
                <Card
                  key={session.id}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedSession === session.id
                      ? 'border-teal-300 bg-teal-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  } ${session.locked ? 'opacity-60' : ''}`}
                  onClick={() => !session.locked && setSelectedSession(session.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-slate-900">{session.title}</p>
                        {session.completed && (
                          <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        )}
                        {session.locked && <Lock className="w-4 h-4 text-slate-400" />}
                      </div>
                      <p className="text-xs text-slate-600 mb-2">{session.description}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {session.duration} min
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {session.category}
                        </Badge>
                        <Badge
                          className={`text-xs ${
                            session.level === 'Foundation'
                              ? 'bg-slate-100 text-slate-700'
                              : session.level === 'Explorer'
                              ? 'bg-teal-100 text-teal-700'
                              : 'bg-amber-100 text-amber-700'
                          } border-0`}
                        >
                          {session.level}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Player */}
            <Card className="p-6 bg-gradient-to-br from-slate-50 to-white border-slate-200 sticky top-6">
              {selectedSession ? (
                <>
                  <div className="mb-6">
                    <Badge className="bg-teal-100 text-teal-700 border-0 mb-3">
                      <Headphones className="w-3 h-3 mr-1" />
                      Now Playing
                    </Badge>
                    <h3 className="text-slate-900 mb-2">
                      {sessions.find((s) => s.id === selectedSession)?.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {sessions.find((s) => s.id === selectedSession)?.description}
                    </p>
                  </div>

                  {/* Waveform Visualization */}
                  <div className="mb-6 h-24 bg-gradient-to-r from-teal-100 via-cyan-100 to-teal-100 rounded-lg flex items-center justify-center gap-1 p-4">
                    {[...Array(40)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-teal-500 rounded-full transition-all duration-300"
                        style={{
                          height: `${20 + Math.random() * 60}%`,
                          opacity: isPlaying ? 0.7 : 0.3,
                        }}
                      />
                    ))}
                  </div>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-slate-600 mb-2">
                      <span>2:34</span>
                      <span>
                        {sessions.find((s) => s.id === selectedSession)?.duration}:00
                      </span>
                    </div>
                    <Progress value={17} className="h-2" />
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-12 h-12 rounded-full"
                    >
                      <SkipForward className="w-5 h-5 rotate-180" />
                    </Button>
                    <Button
                      size="icon"
                      className="w-16 h-16 rounded-full bg-teal-500 hover:bg-teal-600 text-white border-0"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-12 h-12 rounded-full"
                    >
                      <SkipForward className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Session Info */}
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <p className="text-xs text-slate-600 mb-2">Session Benefits</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        Stress Reduction
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Focus Enhancement
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Emotional Balance
                      </Badge>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-600 mb-2">Select a session to begin</p>
                  <p className="text-sm text-slate-500">
                    Choose from guided meditations, breathwork, and more
                  </p>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* Background Audio */}
        <TabsContent value="audio" className="space-y-4">
          {selectedAudio ? (
            <div className="space-y-4">
              <AudioPlayer track={selectedAudio} />
              <Button
                variant="outline"
                onClick={() => setSelectedAudio(null)}
                className="w-full"
              >
                Browse More Meditation Audio
              </Button>
            </div>
          ) : (
            <>
              <Card className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center shrink-0">
                    <Music className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 mb-1">Meditation Audio</h3>
                    <p className="text-sm text-slate-700">
                      AI-generated frequencies, chants, and soundscapes designed to enhance your meditation practice
                    </p>
                  </div>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                {meditationAudio.map((track) => {
                  const Icon = track.category === 'frequency' ? Radio : track.category === 'chant' ? Music : Headphones;
                  return (
                    <Card
                      key={track.id}
                      className="p-4 border-slate-200 hover:border-teal-300 cursor-pointer transition-all bg-white"
                      onClick={() => setSelectedAudio(track)}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-teal-600" />
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
                        <Badge className="bg-teal-100 text-teal-700 border-0 text-xs">
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

        {/* Breathing Exercises */}
        <TabsContent value="breathing" className="space-y-4">
          <Card className="p-6 bg-white border-slate-200">
            <h3 className="text-slate-900 mb-4">Breathing Exercises</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {breathingExercises.map((exercise, index) => (
                <Card
                  key={index}
                  className={`p-4 border-slate-200 ${
                    exercise.locked ? 'opacity-60' : 'hover:border-teal-300 cursor-pointer'
                  } transition-all bg-white`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Wind className="w-4 h-4 text-teal-600" />
                        <p className="text-slate-900">{exercise.name}</p>
                        {exercise.locked && <Lock className="w-4 h-4 text-slate-400" />}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>{exercise.duration}</span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            exercise.difficulty === 'Easy'
                              ? 'border-slate-200'
                              : exercise.difficulty === 'Medium'
                              ? 'border-teal-200'
                              : 'border-amber-200'
                          }`}
                        >
                          {exercise.difficulty}
                        </Badge>
                      </div>
                    </div>
                    {!exercise.locked && (
                      <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white border-0">
                        <Play className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Progress */}
        <TabsContent value="progress" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-slate-900 mb-4">Weekly Activity</h3>
              <div className="space-y-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                  const minutes = [15, 20, 0, 15, 10, 25, 15][index];
                  return (
                    <div key={day}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">{day}</span>
                        <span className="text-sm text-slate-900">{minutes} min</span>
                      </div>
                      <Progress value={(minutes / 30) * 100} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-slate-900 mb-4">Mastery Milestones</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900 mb-1">Foundation Complete</p>
                    <p className="text-xs text-slate-600">
                      Completed 10 beginner sessions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900 mb-1">7-Day Streak</p>
                    <p className="text-xs text-slate-600">Meditated daily for a week</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900 mb-1">100 Sessions</p>
                    <p className="text-xs text-slate-600">72 more sessions to go</p>
                    <Progress value={28} className="h-1 mt-2" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
