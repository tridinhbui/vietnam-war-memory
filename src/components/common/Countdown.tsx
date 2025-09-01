'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const t = useTranslations('countdown');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      // Set timezone to America/New_York as specified
      const nowInNY = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));

      // Calculate next September 2nd
      const currentYear = nowInNY.getFullYear();
      const nextNationalDay = new Date(currentYear, 8, 2); // Month is 0-indexed, so 8 = September

      // If September 2nd has passed this year, use next year
      if (nowInNY > nextNationalDay) {
        nextNationalDay.setFullYear(currentYear + 1);
      }

      const difference = nextNationalDay.getTime() - nowInNY.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // If it's September 2nd, show 0
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [mounted]);

  if (!mounted) {
    return (
      <Card className="p-6 text-center">
        <h3 className="text-lg font-semibold mb-4">{t('title')}</h3>
        <div className="text-sm text-muted-foreground">Loading...</div>
      </Card>
    );
  }

  return (
    <Card className="p-8 border-goldVN/30 shadow-[0_16px_60px_rgba(255,208,0,.15)]">
      <h3 className="text-xl font-bold mb-8 text-center text-goldVN">{t('title')}</h3>
      <div className="grid grid-cols-4 gap-6 text-center">
        <div className="flex flex-col items-center group">
          <div className="w-16 h-16 bg-goldVN rounded-xl flex items-center justify-center mb-3 shadow-[0_8px_30px_rgba(255,208,0,.3)] group-hover:shadow-[0_12px_40px_rgba(255,208,0,.5)] transition-all duration-300 transform group-hover:scale-110">
            <span className="text-2xl font-bold text-accent-foreground">{timeLeft.days}</span>
          </div>
          <div className="text-sm text-muted-foreground font-medium">{t('days')}</div>
        </div>
        <div className="flex flex-col items-center group">
          <div className="w-16 h-16 bg-goldVN rounded-xl flex items-center justify-center mb-3 shadow-[0_8px_30px_rgba(255,208,0,.3)] group-hover:shadow-[0_12px_40px_rgba(255,208,0,.5)] transition-all duration-300 transform group-hover:scale-110">
            <span className="text-2xl font-bold text-accent-foreground">{timeLeft.hours}</span>
          </div>
          <div className="text-sm text-muted-foreground font-medium">{t('hours')}</div>
        </div>
        <div className="flex flex-col items-center group">
          <div className="w-16 h-16 bg-goldVN rounded-xl flex items-center justify-center mb-3 shadow-[0_8px_30px_rgba(255,208,0,.3)] group-hover:shadow-[0_12px_40px_rgba(255,208,0,.5)] transition-all duration-300 transform group-hover:scale-110">
            <span className="text-2xl font-bold text-accent-foreground">{timeLeft.minutes}</span>
          </div>
          <div className="text-sm text-muted-foreground font-medium">{t('minutes')}</div>
        </div>
        <div className="flex flex-col items-center group">
          <div className="w-16 h-16 bg-goldVN rounded-xl flex items-center justify-center mb-3 shadow-[0_8px_30px_rgba(255,208,0,.3)] group-hover:shadow-[0_12px_40px_rgba(255,208,0,.5)] transition-all duration-300 transform group-hover:scale-110 animate-pulse">
            <span className="text-2xl font-bold text-accent-foreground">{timeLeft.seconds}</span>
          </div>
          <div className="text-sm text-muted-foreground font-medium">{t('seconds')}</div>
        </div>
      </div>
    </Card>
  );
}
