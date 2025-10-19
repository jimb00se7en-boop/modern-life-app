import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
}

export function CountdownTimer({ targetDate, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (onComplete) onComplete();
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      className="flex flex-col items-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        key={value}
        className="relative"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg p-4 sm:p-6 shadow-lg min-w-[80px] sm:min-w-[100px]">
          <div className="text-3xl sm:text-5xl text-white tabular-nums">
            {String(value).padStart(2, '0')}
          </div>
        </div>
        {/* Flip card effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg pointer-events-none" />
      </motion.div>
      <div className="mt-2 text-slate-600 text-sm sm:text-base uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );

  return (
    <div className="flex gap-2 sm:gap-4 justify-center items-center">
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className="text-2xl sm:text-4xl text-teal-500 -mt-8">:</div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className="text-2xl sm:text-4xl text-teal-500 -mt-8">:</div>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <div className="text-2xl sm:text-4xl text-teal-500 -mt-8">:</div>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}

// Chakra Countdown Variant (shows chakra progression)
export function ChakraCountdown({ targetDate }: { targetDate: Date }) {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateDays = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDaysLeft(Math.max(0, days));
    };

    calculateDays();
    const timer = setInterval(calculateDays, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(timer);
  }, [targetDate]);

  const chakras = [
    { name: 'Crown', color: '#a855f7', emoji: '👑', days: 21 },
    { name: 'Third Eye', color: '#8b5cf6', emoji: '🔮', days: 18 },
    { name: 'Throat', color: '#3b82f6', emoji: '💙', days: 15 },
    { name: 'Heart', color: '#10b981', emoji: '💚', days: 12 },
    { name: 'Solar', color: '#eab308', emoji: '☀️', days: 9 },
    { name: 'Sacral', color: '#f97316', emoji: '🟠', days: 6 },
    { name: 'Root', color: '#ef4444', emoji: '🔴', days: 3 },
  ];

  const activeChakra = chakras.find(c => daysLeft >= c.days) || chakras[chakras.length - 1];

  return (
    <div className="relative">
      {/* Chakra glow background */}
      <div
        className="absolute inset-0 blur-3xl opacity-30 -z-10"
        style={{
          background: `radial-gradient(circle, ${activeChakra.color}, transparent)`,
        }}
      />

      <div className="text-center space-y-6">
        {/* Main countdown */}
        <div className="text-6xl sm:text-8xl" style={{ color: activeChakra.color }}>
          {daysLeft}
        </div>
        <div className="text-xl sm:text-2xl text-slate-600">
          Days Until Launch
        </div>

        {/* Chakra visualization */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-8">
          {chakras.reverse().map((chakra) => (
            <motion.div
              key={chakra.name}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all duration-300 ${
                daysLeft >= chakra.days
                  ? 'opacity-100 scale-110'
                  : 'opacity-30 scale-90'
              }`}
              style={{
                backgroundColor: chakra.color,
                boxShadow:
                  daysLeft >= chakra.days
                    ? `0 0 20px ${chakra.color}80`
                    : 'none',
              }}
              whileHover={{ scale: 1.2 }}
              title={`${chakra.name} Chakra - Days ${chakra.days}+`}
            >
              {chakra.emoji}
            </motion.div>
          ))}
        </div>

        <div className="text-sm text-slate-500 mt-4">
          Currently unlocking: {activeChakra.name} Chakra {activeChakra.emoji}
        </div>
      </div>
    </div>
  );
}
