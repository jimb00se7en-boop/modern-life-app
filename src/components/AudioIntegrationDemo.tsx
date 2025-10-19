import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AudioLibrary } from './AudioLibrary';
import { AudioPlayer } from './AudioPlayer';
import {
  AudioTrack,
  getTracksByRecommendation,
} from '../data/AudioDatabase';
import {
  Brain,
  Moon,
  Music,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

/**
 * This component demonstrates how to integrate the Audio Database
 * into the existing Meditation and Sleep Hubs
 */
export function AudioIntegrationDemo() {
  const [selectedTrack, setSelectedTrack] = useState<AudioTrack | null>(null);
  const [currentHub, setCurrentHub] = useState<'meditation' | 'sleep'>('meditation');

  // Get recommended tracks based on the current hub
  const recommendedTracks = getTracksByRecommendation(currentHub).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Integration Example Header */}
      <Card className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-slate-900 mb-2">Audio System Integration</h2>
            <p className="text-sm text-slate-700 mb-4">
              This demonstrates how to integrate the Audio Database into your existing
              Meditation and Sleep hubs. The audio content automatically filters based on
              the hub context.
            </p>
            <div className="flex items-center gap-2">
              <Badge className="bg-teal-500 text-white border-0">
                ✓ Context-aware filtering
              </Badge>
              <Badge className="bg-teal-500 text-white border-0">
                ✓ Tier-based access control
              </Badge>
              <Badge className="bg-teal-500 text-white border-0">
                ✓ Seamless playback
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Hub Selector */}
      <div className="grid grid-cols-2 gap-4">
        <Card
          className={`p-5 cursor-pointer transition-all ${
            currentHub === 'meditation'
              ? 'border-2 border-teal-500 bg-teal-50'
              : 'border-slate-200 hover:border-teal-300 bg-white'
          }`}
          onClick={() => setCurrentHub('meditation')}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                currentHub === 'meditation' ? 'bg-teal-500' : 'bg-teal-100'
              }`}
            >
              <Brain
                className={`w-5 h-5 ${
                  currentHub === 'meditation' ? 'text-white' : 'text-teal-600'
                }`}
              />
            </div>
            <h3 className="text-slate-900">Meditation Hub</h3>
          </div>
          <p className="text-sm text-slate-600">
            {getTracksByRecommendation('meditation').length} recommended tracks
          </p>
        </Card>

        <Card
          className={`p-5 cursor-pointer transition-all ${
            currentHub === 'sleep'
              ? 'border-2 border-indigo-500 bg-indigo-50'
              : 'border-slate-200 hover:border-indigo-300 bg-white'
          }`}
          onClick={() => setCurrentHub('sleep')}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                currentHub === 'sleep' ? 'bg-indigo-500' : 'bg-indigo-100'
              }`}
            >
              <Moon
                className={`w-5 h-5 ${
                  currentHub === 'sleep' ? 'text-white' : 'text-indigo-600'
                }`}
              />
            </div>
            <h3 className="text-slate-900">Sleep Hub</h3>
          </div>
          <p className="text-sm text-slate-600">
            {getTracksByRecommendation('sleep').length} recommended tracks
          </p>
        </Card>
      </div>

      {/* Recommended Audio for Current Hub */}
      <Card className="p-6 bg-white border-slate-200">
        <h3 className="text-slate-900 mb-4">
          Recommended Audio for {currentHub === 'meditation' ? 'Meditation' : 'Sleep'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {recommendedTracks.map((track) => (
            <Card
              key={track.id}
              className="p-4 border-slate-200 hover:border-teal-300 cursor-pointer transition-all"
              onClick={() => setSelectedTrack(track)}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
                  <Music className="w-4 h-4 text-teal-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm text-slate-900 truncate">{track.title}</h4>
                  <p className="text-xs text-slate-600">{track.subcategory}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {track.duration}m
              </Badge>
            </Card>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            /* Would open full library filtered by hub */
          }}
        >
          Browse All {currentHub === 'meditation' ? 'Meditation' : 'Sleep'} Audio
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Card>

      {/* Audio Player or Library */}
      {selectedTrack ? (
        <div className="space-y-4">
          <AudioPlayer track={selectedTrack} />
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setSelectedTrack(null)}
          >
            Browse More Tracks
          </Button>
        </div>
      ) : (
        <AudioLibrary
          onSelectTrack={setSelectedTrack}
          selectedTrackId={selectedTrack?.id}
          userTier="bronze"
        />
      )}

      {/* Integration Code Example */}
      <Card className="p-6 bg-slate-900 border-slate-700">
        <h3 className="text-white mb-4">Integration Example Code</h3>
        <pre className="text-sm text-green-400 overflow-x-auto">
          {`// In MeditationHub.tsx or SleepHub.tsx

import { AudioLibrary } from './AudioLibrary';
import { AudioPlayer } from './AudioPlayer';
import { getTracksByRecommendation } from '../data/AudioDatabase';

function MeditationHub() {
  const [selectedAudio, setSelectedAudio] = useState(null);
  
  // Get meditation-specific tracks
  const meditationTracks = getTracksByRecommendation('meditation');
  
  return (
    <div>
      {/* Your existing hub content */}
      
      {/* Add audio section */}
      <section>
        <h3>Guided Audio</h3>
        <AudioLibrary 
          onSelectTrack={setSelectedAudio}
          selectedTrackId={selectedAudio?.id}
          userTier={userTier}
        />
      </section>
      
      {/* Audio player */}
      {selectedAudio && (
        <AudioPlayer track={selectedAudio} />
      )}
    </div>
  );
}`}
        </pre>
      </Card>
    </div>
  );
}
