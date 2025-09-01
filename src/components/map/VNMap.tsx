'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTimelineStore } from '@/store/useTimeline';
import { cn } from '@/lib/utils';

interface Province {
  id: string;
  name: string;
  name_en: string;
  region: string;
  centroid: number[];
  population: number;
  area: number;
  fact: string;
  fact_en: string;
}

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

interface VNMapProps {
  provinces: Province[];
  className?: string;
}

export default function VNMap({ provinces, className }: VNMapProps) {
  const t = useTranslations();
  const { activeMilestoneId, milestones } = useTimelineStore();
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [focusedProvince, setFocusedProvince] = useState<string | null>(null);

  // Find active milestone
  const activeMilestone = milestones.find(m => m.id === activeMilestoneId);

  // Find highlighted province (either from active milestone or hovered)
  const getHighlightedProvince = () => {
    if (activeMilestone?.provinceCode) {
      return provinces.find(p => p.id === activeMilestone.provinceCode);
    }
    if (hoveredProvince) {
      return provinces.find(p => p.id === hoveredProvince);
    }
    if (focusedProvince) {
      return provinces.find(p => p.id === focusedProvince);
    }
    return null;
  };

  const highlightedProvince = getHighlightedProvince();

  // Simplified Vietnam map coordinates (normalized 0-100)
  const vietnamOutline = "M20,15 L25,12 L35,10 L45,8 L55,12 L65,18 L75,25 L80,35 L78,45 L70,55 L60,62 L50,68 L40,72 L30,75 L25,80 L22,85 L20,90 L18,85 L22,75 L28,65 L35,55 L42,45 L48,35 L52,25 Z";

  return (
    <motion.div
      id="vietnam-map"
      className={cn("relative", className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-surface/50 rounded-2xl p-6 border border-goldVN/20">
        <h3 className="text-xl font-bold text-goldVN mb-6 text-center">
          {t('map.title') || 'Bản đồ Việt Nam'}
        </h3>

        <div className="relative">
          <TooltipProvider>
            <svg
              viewBox="0 0 100 100"
              className="w-full h-64 md:h-80 lg:h-96 border border-goldVN/20 rounded-lg bg-surface/30"
              role="img"
              aria-label={t('map.description') || 'Bản đồ tương tác Việt Nam'}
            >
              {/* Vietnam outline */}
              <motion.path
                d={vietnamOutline}
                fill="url(#vietnam-gradient)"
                stroke="#FFD000"
                strokeWidth="0.5"
                className="transition-all duration-300"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Province markers */}
              {provinces.map((province, index) => {
                const [x, y] = province.centroid;
                const isHighlighted = highlightedProvince?.id === province.id;
                const isActiveMilestoneProvince = activeMilestone?.provinceCode === province.id;

                return (
                  <motion.circle
                    key={province.id}
                    cx={x}
                    cy={y}
                    r={isHighlighted ? "3" : "2"}
                    fill={isActiveMilestoneProvince ? "#FFD000" : "#C8102E"}
                    stroke="#FFD000"
                    strokeWidth={isHighlighted ? "2" : "1"}
                    className="cursor-pointer transition-all duration-300"
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.8 }}
                    onMouseEnter={() => setHoveredProvince(province.id)}
                    onMouseLeave={() => setHoveredProvince(null)}
                    onFocus={() => setFocusedProvince(province.id)}
                    onBlur={() => setFocusedProvince(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${province.name} - ${province.name_en}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  />
                );
              })}

              {/* Active milestone marker (if coordinates provided) */}
              {activeMilestone?.lat && activeMilestone?.lng && (
                <motion.circle
                  cx={activeMilestone.lng * 0.8 + 20} // Simple coordinate mapping
                  cy={activeMilestone.lat * 0.6 + 10}
                  r="4"
                  fill="#FFD000"
                  stroke="#C8102E"
                  strokeWidth="3"
                  className="animate-pulse"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <animate
                    attributeName="r"
                    values="4;6;4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </motion.circle>
              )}

              {/* Gradient definition */}
              <defs>
                <linearGradient id="vietnam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C8102E" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#FFD000" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#C8102E" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>

            {/* Province tooltips */}
            <AnimatePresence>
              {highlightedProvince && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-4 right-4 bg-surface/95 backdrop-blur-xl border border-goldVN/30 rounded-xl p-4 shadow-xl max-w-xs z-10"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-goldVN rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-goldVN mb-1">
                        {highlightedProvince.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {highlightedProvince.name_en}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {highlightedProvince.fact}
                      </p>
                      <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                        <span>{highlightedProvince.population.toLocaleString()} dân</span>
                        <span>{highlightedProvince.area} km²</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </TooltipProvider>
        </div>

        {/* Map legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-redVN rounded-full"></div>
            <span className="text-muted-foreground">
              {t('map.legend.provinces') || 'Tỉnh thành'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-goldVN rounded-full"></div>
            <span className="text-muted-foreground">
              {t('map.legend.active') || 'Điểm nổi bật'}
            </span>
          </div>
          {activeMilestone && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-goldVN rounded-full animate-pulse"></div>
              <span className="text-goldVN font-medium">
                {activeMilestone.title}
              </span>
            </div>
          )}
        </div>

        {/* Mobile hint */}
        <div className="mt-4 text-center md:hidden">
          <p className="text-xs text-muted-foreground">
            {t('map.mobileHint') || 'Chạm vào các điểm để xem thông tin'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

