import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { AudioPlayer } from './AudioPlayer';
import { getTracksByRecommendation, AudioTrack } from '../data/AudioDatabase';
import {
  Moon,
  Sun,
  TrendingUp,
  Clock,
  BedDouble,
  Bell,
  Volume2,
  Sparkles,
  Calendar,
  Play,
  CheckCircle2,
  Music,
  Waves,
} from 'lucide-react';

export function SleepHub() {
  const [sleepMode, setSleepMode] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AudioTrack | null>(null);

  // Get sleep-specific audio tracks
  const sleepAudio = getTracksByRecommendation('sleep').slice(0, 6);

  const sleepData = {
    lastNight: {
      duration: '7h 23m',
      quality: 82,
      deepSleep: '2h 15m',
      remSleep: '1h 45m',
      awake: '12m',
      bedtime: '10:45 PM',
      wakeup: '6:08 AM',
    },
    weeklyAverage: {
      duration: '7h 12m',
      quality: 78,
      consistency: 85,
    },
  };

  const routines = [
    {
      id: '1',
      name: 'Wind Down',
      time: '9:30 PM',
      duration: '45 min',
      steps: ['Dim lights', 'Read 20 min', 'Meditation', 'Phone away'],
      active: true,
    },
    {
      id: '2',
      name: 'Morning Energy',
      time: '6:15 AM',
      duration: '30 min',
      steps: ['Natural light', 'Stretch routine', 'Cold shower', 'Breakfast'],
      active: true,
    },
  ];

  const soundscapes = [
    { name: 'Rain on Tent', duration: '8 hours', category: 'Nature' },
    { name: 'Ocean Waves', duration: '8 hours', category: 'Nature' },
    { name: 'White Noise', duration: '8 hours', category: 'Ambient' },
    { name: 'Forest Night', duration: '8 hours', category: 'Nature' },
    { name: 'Brown Noise', duration: '8 hours', category: 'Ambient' },
    { name: 'Theta Waves', duration: '8 hours', category: 'Binaural', locked: true },
  ];

  const tips = [
    'Your optimal bedtime window is 10:30-11:00 PM',
    'Avoid screens 30 minutes before bed',
    'Room temperature ideal at 65-68°F',
  ];

  return (
    <div className="space-y-6 chakra-sleep">
      {/* Header - Third Eye Chakra (Violet/Indigo) */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Moon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-slate-900">Sleep Optimization</h2>
                <span className="text-xs text-violet-600 px-2 py-1 bg-violet-50 rounded-full border border-violet-200">Third Eye 🔮</span>
              </div>
              <p className="text-sm text-slate-600">Access your dreams, inner wisdom</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">Sleep Mode</span>
            <Switch checked={sleepMode} onCheckedChange={setSleepMode} />
          </div>
        </div>
      </div>

      {/* Last Night Summary */}
      <Card className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Badge className="bg-indigo-100 text-indigo-700 border-0 mb-2">
              Last Night
            </Badge>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl text-slate-900">{sleepData.lastNight.duration}</p>
              <p className="text-sm text-slate-600">total sleep</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl text-slate-900">{sleepData.lastNight.quality}</span>
              <span className="text-sm text-slate-600">/ 100</span>
            </div>
            <p className="text-xs text-slate-600">Sleep Quality</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-indigo-200">
          <div>
            <p className="text-xs text-slate-600 mb-1">Deep Sleep</p>
            <p className="text-slate-900">{sleepData.lastNight.deepSleep}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 mb-1">REM Sleep</p>
            <p className="text-slate-900">{sleepData.lastNight.remSleep}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 mb-1">Bedtime</p>
            <p className="text-slate-900">{sleepData.lastNight.bedtime}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 mb-1">Wake Up</p>
            <p className="text-slate-900">{sleepData.lastNight.wakeup}</p>
          </div>
        </div>
      </Card>

      {/* Weekly Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600">Avg Duration</p>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl text-slate-900 mb-1">{sleepData.weeklyAverage.duration}</p>
          <p className="text-xs text-teal-600">+15 min from last week</p>
        </Card>
        <Card className="p-4 bg-white border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600">Avg Quality</p>
            <TrendingUp className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl text-slate-900 mb-1">{sleepData.weeklyAverage.quality}%</p>
          <p className="text-xs text-teal-600">+5% improvement</p>
        </Card>
        <Card className="p-4 bg-white border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600">Consistency</p>
            <Calendar className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl text-slate-900 mb-1">{sleepData.weeklyAverage.consistency}%</p>
          <p className="text-xs text-teal-600">Excellent routine</p>
        </Card>
      </div>

      <Tabs defaultValue="routines" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="routines">Routines</TabsTrigger>
          <TabsTrigger value="audio">
            <Music className="w-4 h-4 mr-2" />
            Sleep Audio
          </TabsTrigger>
          <TabsTrigger value="soundscapes">Soundscapes</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* Sleep Routines */}
        <TabsContent value="routines" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {routines.map((routine) => (
              <Card key={routine.id} className="p-6 bg-white border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {routine.id === '1' ? (
                        <Moon className="w-4 h-4 text-indigo-600" />
                      ) : (
                        <Sun className="w-4 h-4 text-amber-600" />
                      )}
                      <h3 className="text-slate-900">{routine.name}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {routine.time}
                      </span>
                      <span>•</span>
                      <span>{routine.duration}</span>
                    </div>
                  </div>
                  <Switch checked={routine.active} />
                </div>

                <div className="space-y-2">
                  {routine.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shrink-0">
                        <span className="text-xs text-slate-600">{index + 1}</span>
                      </div>
                      <span className="text-sm text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full mt-4"
                >
                  Edit Routine
                </Button>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-teal-600" />
              </div>
              <div className="flex-1">
                <p className="text-slate-900 mb-1">AI Sleep Coaching</p>
                <p className="text-sm text-slate-600 mb-3">
                  Unlock personalized sleep optimization recommendations based on your data
                </p>
                <Badge className="bg-amber-100 text-amber-700 border-0">
                  Unlock at Architect tier
                </Badge>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Sleep Audio */}
        <TabsContent value="audio" className="space-y-4">
          {selectedAudio ? (
            <div className="space-y-4">
              <AudioPlayer track={selectedAudio} />
              <Button
                variant="outline"
                onClick={() => setSelectedAudio(null)}
                className="w-full"
              >
                Browse More Sleep Audio
              </Button>
            </div>
          ) : (
            <>
              <Card className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center shrink-0">
                    <Waves className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 mb-1">Sleep Audio Library</h3>
                    <p className="text-sm text-slate-700">
                      Delta wave frequencies, calming soundscapes, and sleep-inducing audio to help you drift off naturally
                    </p>
                  </div>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                {sleepAudio.map((track) => {
                  const Icon = track.category === 'frequency' ? Waves : track.category === 'chant' ? Music : Volume2;
                  return (
                    <Card
                      key={track.id}
                      className="p-4 border-slate-200 hover:border-indigo-300 cursor-pointer transition-all bg-white"
                      onClick={() => setSelectedAudio(track)}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-indigo-600" />
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
                        <Badge className="bg-indigo-100 text-indigo-700 border-0 text-xs">
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

        {/* Soundscapes */}
        <TabsContent value="soundscapes" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {soundscapes.map((sound, index) => (
              <Card
                key={index}
                className={`p-4 ${
                  sound.locked
                    ? 'opacity-60 bg-white'
                    : 'hover:border-indigo-300 cursor-pointer bg-white'
                } border-slate-200 transition-all`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-slate-900 mb-1">{sound.name}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Volume2 className="w-3 h-3" />
                      <span>{sound.duration}</span>
                      <Badge variant="outline" className="text-xs">
                        {sound.category}
                      </Badge>
                    </div>
                  </div>
                  {!sound.locked && (
                    <Button size="sm" variant="ghost" className="shrink-0">
                      <Play className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                <div className="h-12 bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-100 rounded flex items-end gap-0.5 p-2">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-indigo-400 rounded-sm"
                      style={{ height: `${20 + Math.random() * 80}%` }}
                    />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Insights */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-slate-900 mb-4">Sleep Stages (Last Night)</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Deep Sleep</span>
                    <span className="text-sm text-slate-900">31%</span>
                  </div>
                  <Progress value={31} className="h-2 bg-indigo-100" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">REM Sleep</span>
                    <span className="text-sm text-slate-900">24%</span>
                  </div>
                  <Progress value={24} className="h-2 bg-purple-100" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Light Sleep</span>
                    <span className="text-sm text-slate-900">42%</span>
                  </div>
                  <Progress value={42} className="h-2 bg-slate-100" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Awake</span>
                    <span className="text-sm text-slate-900">3%</span>
                  </div>
                  <Progress value={3} className="h-2 bg-amber-100" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-slate-900 mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700">{tip}</p>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white border-0">
                <Bell className="w-4 h-4 mr-2" />
                Set Bedtime Reminder
              </Button>
            </Card>
          </div>

          <Card className="p-6 bg-white border-slate-200">
            <h3 className="text-slate-900 mb-4">7-Day Trend</h3>
            <div className="space-y-3">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const quality = [72, 78, 75, 82, 80, 85, 82][index];
                return (
                  <div key={day}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">{day}</span>
                      <span className="text-sm text-slate-900">{quality}% quality</span>
                    </div>
                    <Progress value={quality} className="h-2" />
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
