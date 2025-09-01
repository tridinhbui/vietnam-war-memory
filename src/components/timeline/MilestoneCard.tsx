'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { MapPin, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
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

interface MilestoneCardProps {
  milestone: Milestone;
  index: number;
  className?: string;
}

export default function MilestoneCard({ milestone, index, className }: MilestoneCardProps) {
  const t = useTranslations();
  const { activeMilestoneId, setActiveMilestone } = useTimelineStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Intersection Observer to track when card comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveMilestone(milestone.id);
          }
        });
      },
      {
        threshold: 0.5, // Card is considered "active" when 50% visible
        rootMargin: '-100px 0px -100px 0px'
      }
    );

    const element = document.getElementById(`milestone-${milestone.id}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [milestone.id, setActiveMilestone]);

  const isActive = activeMilestoneId === milestone.id;

  return (
    <motion.div
      id={`milestone-${milestone.id}`}
      className={cn("mb-8", className)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className={cn(
        "glass-effect border-goldVN/20 transition-all duration-500 hover:border-goldVN/40",
        isActive && "border-goldVN/50 shadow-[0_0_30px_rgba(255,208,0,.2)]"
      )}>
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Content Section */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {/* Year Badge */}
                  <motion.div
                    className="w-16 h-16 bg-goldVN rounded-2xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-xl font-bold text-accent-foreground">
                      {milestone.year}
                    </span>
                  </motion.div>

                  {/* Title and Province */}
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {milestone.title}
                    </h2>
                    {milestone.provinceCode && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{milestone.provinceCode}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-1 text-goldVN hover:text-goldVN-600"
                          onClick={() => {
                            // Scroll to map section
                            const mapElement = document.getElementById('vietnam-map');
                            if (mapElement) {
                              mapElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                              });
                            }
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {milestone.summary}
              </p>

              {/* Expand/Collapse */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-goldVN hover:text-goldVN-600 hover:bg-goldVN/10"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-2" />
                      {t('timeline.collapse') || 'Thu gọn'}
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" />
                      {t('timeline.expand') || 'Tìm hiểu thêm'}
                    </>
                  )}
                </Button>

                {milestone.provinceCode && (
                  <Badge variant="outline" className="border-goldVN/50 text-goldVN">
                    {t('timeline.onMap') || 'Xem trên bản đồ'}
                  </Badge>
                )}
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 pt-6 border-t border-goldVN/20"
                >
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {t('timeline.expandedContent') || 'Nội dung chi tiết về sự kiện lịch sử này sẽ được cập nhật trong phiên bản tiếp theo.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Image Section */}
            {milestone.image && (
              <div className="lg:w-96">
                <motion.div
                  className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={milestone.image}
                    alt={`${milestone.title} - ${milestone.year}`}
                    fill
                    className={cn(
                      "object-cover transition-opacity duration-300",
                      imageLoaded ? "opacity-100" : "opacity-0"
                    )}
                    onLoad={() => setImageLoaded(true)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-surface animate-pulse rounded-xl" />
                  )}

                  {/* Overlay with year */}
                  <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-goldVN font-bold">{milestone.year}</span>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

