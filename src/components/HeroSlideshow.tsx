import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Clock } from 'lucide-react';

type Slide = {
  image: string;
  caption: string;
  stat: string;
};

const slides: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBtZWRpdGF0aW9uJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzYwMzA5Njc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    caption: "Morning meditation made simple",
    stat: "5 mins/day"
  },
  {
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb20lMjB3b3JraW5nJTIwc3R1ZHklMjBsYXB0b3B8ZW58MXx8fHwxNzYwMzA5Njc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    caption: "Balance work, study & family time",
    stat: "3x more organized"
  },
  {
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBjaGlsZCUyMHBsYXlpbmclMjBoYXBweXxlbnwxfHx8fDE3NjAzMDk2Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    caption: "Never miss important moments",
    stat: "100% synced"
  },
  {
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHlvZ2ElMjB3ZWxsbmVzcyUyMG1vcm5pbmd8ZW58MXx8fHwxNzYwMzA5Njc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    caption: "Start your day with intention",
    stat: "89% better sleep"
  },
  {
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb20lMjBjb29raW5nJTIwaGVhbHRoeSUyMG1lYWx8ZW58MXx8fHwxNzYwMzA5Njc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    caption: "Meal planning that works",
    stat: "73% healthier"
  }
];

// Average scan time per slide in milliseconds (typical landing page scan time is 3-5 seconds per section)
const SCAN_TIME = 4000;

export function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / (SCAN_TIME / 50)); // Update every 50ms
      });
    }, 50);

    // Slide transition
    const slideTimeout = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, SCAN_TIME);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimeout);
    };
  }, [currentSlide, isAnimating]);

  const handleSlideClick = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  return (
    <div className="relative w-full h-full group">
      {/* Main Slideshow */}
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ImageWithFallback
              src={slide.image}
              alt={slide.caption}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            
            {/* Caption & Stat */}
            <div className="absolute bottom-8 left-8 right-8 space-y-3">
              <Badge className="bg-teal-500/90 backdrop-blur-sm border-0 text-white">
                {slide.stat}
              </Badge>
              <p className="text-white text-xl">
                {slide.caption}
              </p>
            </div>
          </div>
        ))}

        {/* Scan Time Indicator - Top Right */}
        <div className="absolute top-6 right-6 flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-700/50">
          <Clock className="w-3 h-3 text-teal-400" />
          <span className="text-xs text-slate-200">
            {((progress / 100) * (SCAN_TIME / 1000)).toFixed(1)}s
          </span>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/50">
          <div 
            className="h-full bg-gradient-to-r from-teal-500 to-teal-400 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Slide Indicators - Bottom Center */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-3 py-2 rounded-full">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-teal-400 w-6' 
                  : 'bg-slate-500 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows (appear on hover) */}
        <button
          onClick={() => handleSlideClick((currentSlide - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-800/80"
          aria-label="Previous slide"
        >
          ←
        </button>
        <button
          onClick={() => handleSlideClick((currentSlide + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-800/80"
          aria-label="Next slide"
        >
          →
        </button>
      </div>

      {/* Subtle Target Demo Label */}
      <div className="absolute -bottom-3 left-6 flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-lg border border-slate-200">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center text-xs text-white">
            M
          </div>
          <div className="w-6 h-6 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-xs text-white">
            O
          </div>
          <div className="w-6 h-6 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center text-xs text-white">
            M
          </div>
        </div>
        <span className="text-xs text-slate-700">Real Modern Life users</span>
      </div>
    </div>
  );
}
