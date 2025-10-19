import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type FrequencyType = {
  name: string;
  frequency: number;
  description: string;
  benefit: string;
};

const frequencies: FrequencyType[] = [
  { name: 'Delta (0.5-4 Hz)', frequency: 2, description: 'Deep Sleep', benefit: 'Enhanced sleep quality' },
  { name: 'Theta (4-8 Hz)', frequency: 6, description: 'Meditation', benefit: 'Deep relaxation & creativity' },
  { name: 'Alpha (8-14 Hz)', frequency: 10, description: 'Calm Focus', benefit: 'Reduced anxiety & clarity' },
  { name: 'Beta (14-30 Hz)', frequency: 20, description: 'Active Focus', benefit: 'Alertness & concentration' },
  { name: 'Gamma (30-100 Hz)', frequency: 40, description: 'Peak Performance', benefit: 'Higher consciousness' },
];

export function FrequencyPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([0.3]);
  const [selectedFrequency, setSelectedFrequency] = useState(frequencies[1]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const startAudio = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = audioContext;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(selectedFrequency.frequency, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(volume[0], audioContext.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
  };

  const stopAudio = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startAudio();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVolume[0], audioContextRef.current!.currentTime);
    }
  };

  const handleFrequencyChange = (value: string) => {
    const freq = frequencies.find(f => f.name === value);
    if (freq) {
      setSelectedFrequency(freq);
      if (isPlaying) {
        stopAudio();
        setIsPlaying(false);
      }
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-slate-50 to-stone-50 border-slate-200">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-slate-900 mb-2">Binaural Frequency Modulation</h3>
          <p className="text-sm text-slate-600">
            AI-generated frequencies for enhanced self-awareness
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-700 mb-2 block">
              Select Frequency
            </label>
            <Select value={selectedFrequency.name} onValueChange={handleFrequencyChange}>
              <SelectTrigger className="bg-white border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {frequencies.map((freq) => (
                  <SelectItem key={freq.name} value={freq.name}>
                    {freq.name} - {freq.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-900 mb-1">
              {selectedFrequency.description}
            </p>
            <p className="text-xs text-slate-600">
              Benefit: {selectedFrequency.benefit}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              size="lg"
              onClick={togglePlay}
              className={`rounded-full w-14 h-14 ${
                isPlaying 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-slate-700 hover:bg-slate-800'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </Button>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-slate-600" />
                <Slider
                  value={volume}
                  onValueChange={handleVolumeChange}
                  max={1}
                  step={0.01}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-slate-600 text-right">
                Volume: {Math.round(volume[0] * 100)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-100 p-3 rounded-lg">
          <p className="text-xs text-slate-700">
            ⚠️ Use headphones for optimal binaural effect. Start with low volume.
          </p>
        </div>
      </div>
    </Card>
  );
}
