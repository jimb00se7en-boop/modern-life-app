import { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function VoiceCommandInterface() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [commands, setCommands] = useState<string[]>([]);

  // Mock voice commands for demonstration
  const availableCommands = [
    'Start meditation session',
    'Track my sleep',
    'Log my mood',
    'Plan my meals',
    'Schedule childcare',
    'Set study deadline',
  ];

  const handleVoiceCommand = () => {
    if (!isListening) {
      setIsListening(true);
      setTranscript('Listening...');
      
      // Simulate voice recognition
      setTimeout(() => {
        const randomCommand = availableCommands[Math.floor(Math.random() * availableCommands.length)];
        setTranscript(randomCommand);
        setCommands([randomCommand, ...commands.slice(0, 4)]);
        setIsListening(false);
      }, 2000);
    } else {
      setIsListening(false);
      setTranscript('');
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-100">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <Button
            size="lg"
            onClick={handleVoiceCommand}
            className={`rounded-full w-16 h-16 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-teal-600 hover:bg-teal-700'
            }`}
          >
            {isListening ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </Button>
        </div>

        <div className="text-center">
          <p className="text-slate-900 mb-2">
            {transcript || 'Tap to use voice commands'}
          </p>
          <p className="text-sm text-slate-600">
            Try: "{availableCommands[0]}"
          </p>
        </div>

        {commands.length > 0 && (
          <div className="w-full mt-4">
            <p className="text-sm text-slate-700 mb-2">Recent Commands:</p>
            <div className="space-y-2">
              {commands.map((cmd, idx) => (
                <div
                  key={idx}
                  className="bg-white p-2 rounded-lg text-sm text-slate-900 border border-slate-200"
                >
                  {cmd}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-2 w-full">
          {availableCommands.slice(0, 4).map((cmd, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              onClick={() => {
                setTranscript(cmd);
                setCommands([cmd, ...commands.slice(0, 4)]);
              }}
              className="text-xs border-teal-200 hover:bg-teal-50"
            >
              {cmd}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}
