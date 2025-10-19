import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AudioLibrary } from './AudioLibrary';
import { AudioPlayer } from './AudioPlayer';
import {
  AudioTrack,
  getTracksByCategory,
  getPopularTracks,
  getFreeTracks,
} from '../data/AudioDatabase';
import {
  Sparkles,
  Radio,
  Music,
  Waves,
  TrendingUp,
  Gift,
  Info,
  Zap,
  Brain,
  Moon,
  Target,
} from 'lucide-react';

interface AudioContentHubProps {
  userTier?: 'free' | 'bronze' | 'silver' | 'gold' | 'platinum';
  userMP?: number;
}

export function AudioContentHub({
  userTier = 'free',
  userMP = 0,
}: AudioContentHubProps) {
  const [selectedTrack, setSelectedTrack] = useState<AudioTrack | null>(null);
  const [showLibrary, setShowLibrary] = useState(true);

  const frequencyTracks = getTracksByCategory('frequency');
  const chantTracks = getTracksByCategory('chant');
  const soundscapeTracks = getTracksByCategory('soundscape');
  const popularTracks = getPopularTracks(3);
  const freeTracks = getFreeTracks();

  const handleSelectTrack = (track: AudioTrack) => {
    setSelectedTrack(track);
    setShowLibrary(false);
  };

  const stats = [
    {
      icon: Radio,
      label: 'Frequency Networks',
      value: frequencyTracks.length,
      color: 'teal',
    },
    {
      icon: Music,
      label: 'Mystic Chants',
      value: chantTracks.length,
      color: 'purple',
    },
    {
      icon: Waves,
      label: 'Nature Soundscapes',
      value: soundscapeTracks.length,
      color: 'blue',
    },
  ];

  const features = [
    {
      icon: Brain,
      title: 'Frequency Networks',
      description: 'Binaural beats, Solfeggio frequencies, and Isochronic tones',
      color: 'teal',
    },
    {
      icon: Music,
      title: 'Mystic Chants',
      description: 'Mantras, throat singing, and sacred sound healing',
      color: 'purple',
    },
    {
      icon: Waves,
      title: 'Nature Soundscapes',
      description: 'Rain, ocean, forest, and fire ambiences',
      color: 'blue',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-slate-900">AI Audio Content</h1>
          </div>
          <p className="text-slate-600">
            Scientifically-designed audio for meditation, sleep, and wellness
          </p>
        </div>

        <div className="text-right">
          <Badge className="bg-amber-100 text-amber-700 border-0 mb-2">
            {userMP} MP Available
          </Badge>
          <p className="text-sm text-slate-600">
            Current Tier: <span className="font-medium capitalize">{userTier}</span>
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className={`p-4 bg-gradient-to-br from-${stat.color}-50 to-white border-${stat.color}-200`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-slate-900">{stat.value} Tracks</p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Info Banner */}
      <Card className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-slate-900 mb-1">AI-Generated Audio Content</h3>
            <p className="text-sm text-slate-700 mb-3">
              All audio tracks are procedurally generated using advanced AI algorithms tuned
              to specific frequencies and patterns proven to enhance meditation, sleep, and
              focus. Unlock premium content by advancing through mastery tiers or using MP.
            </p>
            <div className="flex items-center gap-2">
              <Badge className="bg-white text-teal-700 border-0">
                {freeTracks.length} Free Tracks
              </Badge>
              <Badge className="bg-white text-teal-700 border-0">
                {popularTracks[0]?.popularity}% Satisfaction Rate
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="p-5 bg-white border-slate-200 hover:border-teal-300 transition-colors">
              <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-6 h-6 text-${feature.color}-600`} />
              </div>
              <h3 className="text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </Card>
          );
        })}
      </div>

      {/* Popular Tracks Preview */}
      <Card className="p-6 bg-white border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            <h3 className="text-slate-900">Most Popular This Week</h3>
          </div>
          <Button
            variant="ghost"
            onClick={() => setShowLibrary(true)}
            className="text-teal-600 hover:text-teal-700"
          >
            View All →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {popularTracks.map((track) => {
            const Icon = track.category === 'frequency' ? Radio : track.category === 'chant' ? Music : Waves;
            return (
              <Card
                key={track.id}
                className="p-4 border-slate-200 hover:border-teal-300 cursor-pointer transition-all"
                onClick={() => handleSelectTrack(track)}
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
                  <Badge variant="outline" className="text-xs border-slate-200 text-slate-600">
                    {track.duration}m
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-slate-600">
                    <TrendingUp className="w-3 h-3" />
                    {track.popularity}%
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>

      {/* Main Content Area */}
      <Tabs value={showLibrary ? 'library' : 'player'} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="library" onClick={() => setShowLibrary(true)}>
            Browse Library
          </TabsTrigger>
          <TabsTrigger
            value="player"
            onClick={() => setShowLibrary(false)}
            disabled={!selectedTrack}
          >
            Now Playing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="mt-6">
          <AudioLibrary
            onSelectTrack={handleSelectTrack}
            selectedTrackId={selectedTrack?.id}
            userTier={userTier}
          />
        </TabsContent>

        <TabsContent value="player" className="mt-6">
          {selectedTrack ? (
            <div className="space-y-4">
              <AudioPlayer track={selectedTrack} />
              <Button
                variant="outline"
                onClick={() => setShowLibrary(true)}
                className="w-full"
              >
                Back to Library
              </Button>
            </div>
          ) : (
            <Card className="p-12 text-center bg-slate-50 border-slate-200">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-slate-900 mb-2">No Track Selected</h3>
              <p className="text-slate-600 mb-4">
                Browse the library and select a track to start listening
              </p>
              <Button onClick={() => setShowLibrary(true)} className="bg-teal-500 hover:bg-teal-600 text-white">
                Browse Library
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Unlock More Banner */}
      <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shrink-0">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-slate-900 mb-2">Unlock Premium Audio Content</h3>
            <p className="text-sm text-slate-700 mb-4">
              Complete challenges to earn Mastery Points and advance through tiers. Each tier
              unlocks exclusive frequency networks, sacred chants, and immersive soundscapes.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-amber-100 text-amber-700 border-0">
                Bronze: {frequencyTracks.filter((t) => t.tier === 'bronze').length} tracks
              </Badge>
              <Badge className="bg-slate-200 text-slate-700 border-0">
                Silver: {frequencyTracks.filter((t) => t.tier === 'silver').length} tracks
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-700 border-0">
                Gold: {frequencyTracks.filter((t) => t.tier === 'gold').length} tracks
              </Badge>
              <Badge className="bg-purple-100 text-purple-700 border-0">
                Platinum: {frequencyTracks.filter((t) => t.tier === 'platinum').length} tracks
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
