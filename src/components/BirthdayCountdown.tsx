import { useState, useEffect } from 'react';

function getNextBirthday(): Date {
  const now = new Date();
  // If today is past June 18, count to next year's June 18
  const year =
    now.getMonth() > 5 || (now.getMonth() === 5 && now.getDate() > 18)
      ? now.getFullYear() + 1
      : now.getFullYear();
  return new Date(year, 5, 18, 0, 0, 0);
}

function isBirthdayToday(): boolean {
  const now = new Date();
  return now.getMonth() === 5 && now.getDate() === 18;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const calc = () => {
      const today = isBirthdayToday();
      setIsToday(today);

      if (today) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const next = getNextBirthday();
      const diff = next.getTime() - Date.now();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isToday) {
    return (
      <div className="text-center">
        <p
          className="text-2xl font-black"
          style={{
            background: 'linear-gradient(135deg, #ff69b4, #da70d6, #ff1493)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: 'Georgia, serif',
          }}
        >
          🎂 TODAY IS THE DAY! 🎂
        </p>
        <p className="text-pink-300 text-sm mt-1">Happy Birthday, Pravena! June 18 🌸</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-pink-400 text-xs font-medium tracking-widest uppercase mb-2">
        Next Birthday · June 18
      </p>
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Mins', value: timeLeft.minutes },
          { label: 'Secs', value: timeLeft.seconds },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl text-white"
              style={{
                background: 'rgba(255,105,180,0.15)',
                border: '1px solid rgba(255,105,180,0.4)',
                boxShadow: '0 0 15px rgba(255,105,180,0.2)',
                fontFamily: 'monospace',
              }}
            >
              {String(item.value).padStart(2, '0')}
            </div>
            <p className="text-pink-400 text-xs mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
