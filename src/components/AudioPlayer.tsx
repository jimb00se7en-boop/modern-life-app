import { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { AudioTrack } from '../data/AudioDatabase';
import { useFavorites } from './useFavorites';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Radio,
  Music,
  Waves,
  Heart,
  Share2,
  Repeat,
  Shuffle,
  Clock,
  TrendingUp,
  Timer,
} from 'lucide-react';

interface AudioPlayerProps {
  track: AudioTrack;
  onNext?: () => void;
  onPrevious?: () => void;
  onClose?: () => void;
}

export function AudioPlayer({ track, onNext, onPrevious, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null); // minutes
  const [timerRemaining, setTimerRemaining] = useState<number | null>(null); // seconds
  const visualizerRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  const { isFavorite, toggleFavorite } = useFavorites();

  // Initialize sleep timer when set
  useEffect(() => {
    if (sleepTimer !== null) {
      setTimerRemaining(sleepTimer * 60);
    } else {
      setTimerRemaining(null);
    }
  }, [sleepTimer]);

  // Sleep timer countdown
  useEffect(() => {
    if (timerRemaining !== null && isPlaying && timerRemaining > 0) {
      const interval = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev === null || prev <= 1) {
            setIsPlaying(false);
            setSleepTimer(null);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerRemaining, isPlaying]);

  // Simulate playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= track.duration * 60) {
            if (isRepeat) {
              return 0;
            } else {
              setIsPlaying(false);
              return track.duration * 60;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, track.duration, isRepeat]);

  // Audio visualizer animation
  useEffect(() => {
    const canvas = visualizerRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (isPlaying) {
        // Create frequency-style visualization
        const bars = track.category === 'frequency' ? 32 : 24;
        const barWidth = width / bars;

        for (let i = 0; i < bars; i++) {
          // Create wave pattern based on time and position
          const time = Date.now() / 1000;
          const waveOffset = Math.sin(time * 2 + i * 0.3) * 0.5 + 0.5;
          const barHeight = (Math.random() * 0.3 + waveOffset * 0.7) * height * 0.8;

          // Color gradient based on track category
          let gradient;
          if (track.category === 'frequency') {
            gradient = ctx.createLinearGradient(0, height, 0, 0);
            gradient.addColorStop(0, 'rgba(20, 184, 166, 0.3)');
            gradient.addColorStop(1, 'rgba(20, 184, 166, 0.8)');
          } else if (track.category === 'chant') {
            gradient = ctx.createLinearGradient(0, height, 0, 0);
            gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
            gradient.addColorStop(1, 'rgba(139, 92, 246, 0.8)');
          } else {
            gradient = ctx.createLinearGradient(0, height, 0, 0);
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0.8)');
          }

          ctx.fillStyle = gradient;
          ctx.fillRect(
            i * barWidth + barWidth * 0.1,
            height - barHeight,
            barWidth * 0.8,
            barHeight
          );
        }
      } else {
        // Static bars when paused
        const bars = 32;
        const barWidth = width / bars;
        ctx.fillStyle = 'rgba(148, 163, 184, 0.2)';

        for (let i = 0; i < bars; i++) {
          const barHeight = height * 0.2;
          ctx.fillRect(
            i * barWidth + barWidth * 0.1,
            height - barHeight,
            barWidth * 0.8,
            barHeight
          );
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, track.category]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryIcon = () => {
    switch (track.category) {
      case 'frequency':
        return <Radio className="w-5 h-5" />;
      case 'chant':
        return <Music className="w-5 h-5" />;
      case 'soundscape':
        return <Waves className="w-5 h-5" />;
    }
  };

  const getCategoryColor = () => {
    switch (track.category) {
      case 'frequency':
        return 'from-teal-500 to-cyan-600';
      case 'chant':
        return 'from-purple-500 to-pink-600';
      case 'soundscape':
        return 'from-blue-500 to-indigo-600';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <Card className="bg-white border-slate-200 overflow-hidden">
      {/* Gradient Header */}
      <div className={`bg-gradient-to-r ${getCategoryColor()} p-6 text-white`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
              {getCategoryIcon()}
            </div>
            <div>
              <Badge className="bg-white/20 text-white border-0 mb-2">
                {track.subcategory}
              </Badge>
              <h3 className="text-white">{track.title}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`}
              />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Visualizer */}
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
          <canvas
            ref={visualizerRef}
            width={600}
            height={120}
            className="w-full h-[120px]"
          />
        </div>
      </div>

      {/* Player Controls */}
      <div className="p-6 space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={track.duration * 60}
            step={1}
            onValueChange={(value) => setCurrentTime(value[0])}
            className="cursor-pointer"
          />
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>{formatTime(currentTime)}</span>
            <span>{track.duration}:00</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsRepeat(!isRepeat)}
            className={isRepeat ? 'text-teal-600' : 'text-slate-600'}
          >
            <Repeat className="w-4 h-4" />
          </Button>

          {onPrevious && (
            <Button
              size="sm"
              variant="outline"
              onClick={onPrevious}
              className="border-slate-200"
            >
              <SkipBack className="w-4 h-4" />
            </Button>
          )}

          <Button
            size="lg"
            className="bg-teal-500 hover:bg-teal-600 text-white w-14 h-14 rounded-full"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </Button>

          {onNext && (
            <Button
              size="sm"
              variant="outline"
              onClick={onNext}
              className="border-slate-200"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          )}

          <Button size="sm" variant="ghost" className="text-slate-600">
            <Shuffle className="w-4 h-4" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsMuted(!isMuted)}
            className="text-slate-600"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={100}
            step={1}
            onValueChange={(value) => {
              setVolume(value[0]);
              setIsMuted(false);
            }}
            className="flex-1"
          />
          <span className="text-sm text-slate-600 w-10 text-right">
            {isMuted ? 0 : volume}%
          </span>
        </div>

        {/* Track Info */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <p className="text-sm text-slate-600">{track.description}</p>

          {track.frequency && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-teal-200 text-teal-700">
                <Radio className="w-3 h-3 mr-1" />
                {track.frequency} Hz
              </Badge>
              <span className="text-xs text-slate-500">
                {track.subcategory} Frequency
              </span>
            </div>
          )}

          {/* Benefits */}
          <div>
            <p className="text-xs text-slate-500 mb-2">Benefits:</p>
            <div className="flex flex-wrap gap-1">
              {track.benefits.map((benefit, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs border-slate-200 text-slate-600"
                >
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{track.duration} minutes</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>{track.popularity}% popularity</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
