'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Map, Image, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Highlights() {
  const t = useTranslations('highlights');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const highlights = [
    {
      id: 'timeline',
      title: t('timeline.title'),
      description: t('timeline.description'),
      href: '/timeline',
      icon: Clock,
      color: 'text-redVN',
      bgColor: 'bg-redVN/10',
      borderColor: 'border-redVN/30',
      buttonVariant: 'default' as const,
      delay: 0
    },
    {
      id: 'map',
      title: t('map.title'),
      description: t('map.description'),
      href: '/map',
      icon: Map,
      color: 'text-goldVN',
      bgColor: 'bg-goldVN/10',
      borderColor: 'border-goldVN/30',
      buttonVariant: 'gold' as const,
      delay: 0.1
    },
    {
      id: 'gallery',
      title: t('gallery.title'),
      description: t('gallery.description'),
      href: '/gallery',
      icon: Image,
      color: 'text-goldVN',
      bgColor: 'bg-goldVN/10',
      borderColor: 'border-goldVN/30',
      buttonVariant: 'outline' as const,
      delay: 0.2
    }
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {highlights.map((highlight, index) => {
        const Icon = highlight.icon;
        return (
          <motion.div
            key={highlight.id}
            variants={itemVariants}
            whileHover={{
              y: -8,
              transition: { duration: 0.3 }
            }}
          >
            <Card className={`group transition-all duration-500 hover:shadow-[0_20px_60px_rgba(200,16,46,.15)] ${highlight.borderColor} hover:border-goldVN/50`}>
              <CardHeader className="text-center pb-6">
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${highlight.bgColor} flex items-center justify-center shadow-lg`}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Icon className={`w-10 h-10 ${highlight.color} group-hover:text-goldVN transition-colors duration-300`} />
                </motion.div>
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-goldVN transition-colors duration-300">
                  {highlight.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-8 leading-relaxed text-muted-foreground">
                  {highlight.description}
                </CardDescription>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    asChild
                    variant={highlight.buttonVariant}
                    className="w-full group/btn"
                    size="lg"
                  >
                    <Link href={highlight.href}>
                      {t('common.explore')}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
