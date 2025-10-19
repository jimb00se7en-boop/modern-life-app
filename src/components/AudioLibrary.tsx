import { useState, useMemo } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  AudioTrack,
  audioDatabase,
  getTracksByCategory,
  getTracksByRecommendation,
  searchTracks,
  getPopularTracks,
  getFreeTracks,
} from '../data/AudioDatabase';
import {
  Play,
  Pause,
  Search,
  Filter,
  TrendingUp,
  Clock,
  Lock,
  Sparkles,
  Radio,
  Music,
  Waves,
  Award,
  Tag,
  Heart,
} from 'lucide-react';

interface AudioLibraryProps {
  onSelectTrack: (track: AudioTrack) => void;
  selectedTrackId?: string;
  userTier?: 'free' | 'bronze' | 'silver' | 'gold' | 'platinum';
}

export function AudioLibrary({
  onSelectTrack,
  selectedTrackId,
  userTier = 'free',
}: AudioLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRecommendation, setSelectedRecommendation] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'duration' | 'tier'>('popularity');

  // Tier hierarchy for access control
  const tierHierarchy = {
    free: 0,
    bronze: 1,
    silver: 2,
    gold: 3,
    platinum: 4,
  };

  const hasAccess = (track: AudioTrack) => {
    return tierHierarchy[userTier] >= tierHierarchy[track.tier];
  };

  // Filter and sort tracks
  const filteredTracks = useMemo(() => {
    let tracks = audioDatabase;

    // Search
    if (searchQuery) {
      tracks = searchTracks(searchQuery);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      tracks = tracks.filter((track) => track.category === selectedCategory);
    }

    // Recommendation filter
    if (selectedRecommendation !== 'all') {
      tracks = tracks.filter((track) =>
        track.recommendedFor.includes(
          selectedRecommendation as 'meditation' | 'sleep' | 'focus' | 'relaxation' | 'energy'
        )
      );
    }

    // Sort
    tracks = [...tracks].sort((a, b) => {
      if (sortBy === 'popularity') return b.popularity - a.popularity;
      if (sortBy === 'duration') return a.duration - b.duration;
      if (sortBy === 'tier') {
        return tierHierarchy[a.tier] - tierHierarchy[b.tier];
      }
      return 0;
    });

    return tracks;
  }, [searchQuery, selectedCategory, selectedRecommendation, sortBy]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frequency':
        return <Radio className="w-4 h-4" />;
      case 'chant':
        return <Music className="w-4 h-4" />;
      case 'soundscape':
        return <Waves className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'free':
        return 'bg-slate-100 text-slate-700';
      case 'bronze':
        return 'bg-amber-100 text-amber-700';
      case 'silver':
        return 'bg-slate-300 text-slate-800';
      case 'gold':
        return 'bg-yellow-100 text-yellow-700';
      case 'platinum':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const popularTracks = getPopularTracks(6);
  const freeTracks = getFreeTracks().slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-teal-600" />
          <h2 className="text-slate-900">Audio Library</h2>
        </div>
        <p className="text-slate-600">
          AI-generated frequencies, chants, and soundscapes for your wellness journey
        </p>
      </div>

      {/* Search & Filters */}
      <Card className="p-4 bg-white border-slate-200">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by name, benefits, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="frequency">Frequency Networks</SelectItem>
                <SelectItem value="chant">Mystic Chants</SelectItem>
                <SelectItem value="soundscape">Nature Soundscapes</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRecommendation} onValueChange={setSelectedRecommendation}>
              <SelectTrigger>
                <SelectValue placeholder="Recommended For" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Uses</SelectItem>
                <SelectItem value="meditation">Meditation</SelectItem>
                <SelectItem value="sleep">Sleep</SelectItem>
                <SelectItem value="focus">Focus</SelectItem>
                <SelectItem value="relaxation">Relaxation</SelectItem>
                <SelectItem value="energy">Energy</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
                <SelectItem value="tier">Access Level</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Tracks ({filteredTracks.length})</TabsTrigger>
          <TabsTrigger value="popular">
            <TrendingUp className="w-4 h-4 mr-2" />
            Popular
          </TabsTrigger>
          <TabsTrigger value="free">Free Access</TabsTrigger>
        </TabsList>

        {/* All Tracks */}
        <TabsContent value="all" className="space-y-4">
          <ScrollArea className="h-[600px] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTracks.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  isSelected={selectedTrackId === track.id}
                  hasAccess={hasAccess(track)}
                  onSelect={onSelectTrack}
                  getCategoryIcon={getCategoryIcon}
                  getTierColor={getTierColor}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Popular Tracks */}
        <TabsContent value="popular" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularTracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                isSelected={selectedTrackId === track.id}
                hasAccess={hasAccess(track)}
                onSelect={onSelectTrack}
                getCategoryIcon={getCategoryIcon}
                getTierColor={getTierColor}
              />
            ))}
          </div>
        </TabsContent>

        {/* Free Tracks */}
        <TabsContent value="free" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {freeTracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                isSelected={selectedTrackId === track.id}
                hasAccess={hasAccess(track)}
                onSelect={onSelectTrack}
                getCategoryIcon={getCategoryIcon}
                getTierColor={getTierColor}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Track Card Component
interface TrackCardProps {
  track: AudioTrack;
  isSelected: boolean;
  hasAccess: boolean;
  onSelect: (track: AudioTrack) => void;
  getCategoryIcon: (category: string) => JSX.Element;
  getTierColor: (tier: string) => string;
}

function TrackCard({
  track,
  isSelected,
  hasAccess,
  onSelect,
  getCategoryIcon,
  getTierColor,
}: TrackCardProps) {
  return (
    <Card
      className={`p-4 cursor-pointer transition-all ${
        isSelected
          ? 'border-2 border-teal-500 bg-teal-50'
          : hasAccess
          ? 'border-slate-200 hover:border-teal-300 bg-white'
          : 'border-slate-200 bg-slate-50 opacity-75'
      }`}
      onClick={() => hasAccess && onSelect(track)}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                isSelected ? 'bg-teal-500' : 'bg-slate-100'
              }`}
            >
              {isSelected ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <div className={isSelected ? 'text-white' : 'text-slate-600'}>
                  {getCategoryIcon(track.category)}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-slate-900 truncate">{track.title}</h3>
              <p className="text-xs text-slate-600 truncate">{track.subcategory}</p>
            </div>
          </div>

          {!hasAccess && (
            <Lock className="w-4 h-4 text-slate-400 shrink-0" />
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-2">{track.description}</p>

        {/* Frequency Badge (if applicable) */}
        {track.frequency && (
          <Badge variant="outline" className="border-teal-200 text-teal-700">
            <Radio className="w-3 h-3 mr-1" />
            {track.frequency} Hz
          </Badge>
        )}

        {/* Benefits */}
        <div className="flex flex-wrap gap-1">
          {track.benefits.slice(0, 3).map((benefit, index) => (
            <Badge key={index} variant="outline" className="text-xs border-slate-200 text-slate-600">
              {benefit}
            </Badge>
          ))}
          {track.benefits.length > 3 && (
            <Badge variant="outline" className="text-xs border-slate-200 text-slate-600">
              +{track.benefits.length - 3}
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{track.duration}m</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>{track.popularity}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {track.tier === 'free' ? (
              <Badge className="bg-teal-100 text-teal-700 border-0 text-xs">
                Free
              </Badge>
            ) : (
              <Badge className={`${getTierColor(track.tier)} border-0 text-xs`}>
                {track.tier}
                {track.mpCost && ` • ${track.mpCost} MP`}
              </Badge>
            )}
          </div>
        </div>

        {/* Play Button */}
        {hasAccess && (
          <Button
            className={`w-full ${
              isSelected
                ? 'bg-teal-500 hover:bg-teal-600 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(track);
            }}
          >
            {isSelected ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Playing
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Play Track
              </>
            )}
          </Button>
        )}

        {!hasAccess && (
          <Button
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900"
            disabled
          >
            <Lock className="w-4 h-4 mr-2" />
            Unlock with {track.tier} tier
          </Button>
        )}
      </div>
    </Card>
  );
}
