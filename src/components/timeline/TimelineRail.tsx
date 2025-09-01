'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useTimelineStore } from '@/store/useTimeline';
import { cn } from '@/lib/utils';

interface Milestone {
  id: string;
  year: number;
  title: string;
  summary: string;
  provinceCode?: string;
  image?: string;
  lat?: number;
  lng?: number;
}

interface TimelineRailProps {
  milestones: Milestone[];
  className?: string;
}

export default function TimelineRail({ milestones, className }: TimelineRailProps) {
  const t = useTranslations();
  const { activeMilestoneId, setActiveMilestone } = useTimelineStore();

  const handleYearClick = (milestoneId: string) => {
    setActiveMilestone(milestoneId);
    // Smooth scroll to the milestone card
    const element = document.getElementById(`milestone-${milestoneId}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <div className={cn("relative hidden md:flex flex-col items-center py-8", className)}>
      {/* Main timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-goldVN via-goldVN-600 to-goldVN opacity-60 transform -translate-x-1/2" />

      {/* Timeline ticks and years */}
      <div className="relative w-full max-w-xs">
        {milestones.map((milestone, index) => {
          const isActive = activeMilestoneId === milestone.id;
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={milestone.id}
              className={cn(
                "relative flex items-center cursor-pointer group transition-all duration-300",
                isEven ? "justify-start" : "justify-end",
                "mb-16 last:mb-0"
              )}
              onClick={() => handleYearClick(milestone.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Timeline dot */}
              <motion.div
                className={cn(
                  "absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300",
                  isActive
                    ? "bg-goldVN border-goldVN shadow-[0_0_20px_rgba(255,208,0,.8)] scale-125"
                    : "bg-surface border-goldVN-600 group-hover:border-goldVN group-hover:bg-goldVN-600"
                )}
                animate={isActive ? {
                  boxShadow: [
                    "0 0 20px rgba(255,208,0,0.8)",
                    "0 0 30px rgba(255,208,0,1)",
                    "0 0 20px rgba(255,208,0,0.8)"
                  ]
                } : {}}
                transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
              />

              {/* Year badge */}
              <motion.div
                className={cn(
                  "px-4 py-2 rounded-xl font-bold transition-all duration-300",
                  isEven ? "mr-8" : "ml-8",
                  isActive
                    ? "bg-goldVN text-accent-foreground shadow-[0_4px_20px_rgba(255,208,0,.4)]"
                    : "bg-surface/80 text-muted-foreground group-hover:bg-goldVN/20 group-hover:text-goldVN border border-goldVN/30"
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {milestone.year}
              </motion.div>

              {/* Connector line */}
              <motion.div
                className={cn(
                  "absolute w-8 h-0.5 bg-goldVN-600 transition-all duration-300",
                  isEven ? "left-1/2 ml-2" : "right-1/2 mr-2",
                  isActive ? "bg-goldVN" : "group-hover:bg-goldVN"
                )}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="text-xs text-muted-foreground mb-2">
          {t('timeline.scrollHint') || 'Cuộn để khám phá'}
        </div>
        <motion.div
          className="w-6 h-10 border-2 border-goldVN/50 rounded-full flex justify-center"
          animate={{
            borderColor: ["rgba(255,208,0,0.3)", "rgba(255,208,0,0.6)", "rgba(255,208,0,0.3)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-goldVN rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

