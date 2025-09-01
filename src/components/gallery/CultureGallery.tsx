'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CultureItem {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  category: string;
}

interface CultureGalleryProps {
  className?: string;
}

export default function CultureGallery({ className }: CultureGalleryProps) {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Sample culture items - in real app, these would come from a data file
  const cultureItems: CultureItem[] = [
    {
      id: '1',
      title: 'Áo Dài',
      titleEn: 'Ao Dai',
      description: 'Trang phục truyền thống Việt Nam',
      descriptionEn: 'Traditional Vietnamese dress',
      image: '/images/culture/ao-dai.jpg',
      category: 'fashion'
    },
    {
      id: '2',
      title: 'Cồng Chiêng',
      titleEn: 'Gongs',
      description: 'Âm nhạc dân tộc Tây Nguyên',
      descriptionEn: 'Central Highlands ethnic music',
      image: '/images/culture/cong-chieng.jpg',
      category: 'music'
    },
    {
      id: '3',
      title: 'Chợ Nổi',
      titleEn: 'Floating Market',
      description: 'Thương cả trên sông nước miền Tây',
      descriptionEn: 'Trading on Mekong Delta rivers',
      image: '/images/culture/cho-noi.jpg',
      category: 'trade'
    },
    {
      id: '4',
      title: 'Ruộng Bậc Thang',
      titleEn: 'Terraced Fields',
      description: 'Nông nghiệp truyền thống Sapa',
      descriptionEn: 'Traditional agriculture in Sapa',
      image: '/images/culture/ruong-bac-thang.jpg',
      category: 'agriculture'
    },
    {
      id: '5',
      title: 'Nón Lá',
      titleEn: 'Conical Hat',
      description: 'Biểu tượng văn hóa Việt Nam',
      descriptionEn: 'Vietnamese cultural symbol',
      image: '/images/culture/non-la.jpg',
      category: 'craft'
    },
    {
      id: '6',
      title: 'Đờn Ca Tài Tử',
      titleEn: 'Cai Luong',
      description: 'Hát cải lương Nam Bộ',
      descriptionEn: 'Southern Vietnamese opera',
      image: '/images/culture/don-ca-tai-tu.jpg',
      category: 'theater'
    },
    {
      id: '7',
      title: 'Lễ Hội',
      titleEn: 'Festivals',
      description: 'Lễ hội truyền thống Việt Nam',
      descriptionEn: 'Traditional Vietnamese festivals',
      image: '/images/culture/le-hoi.jpg',
      category: 'festival'
    },
    {
      id: '8',
      title: 'Đồ Sơn',
      titleEn: 'Ceramics',
      description: 'Gốm sứ Bát Tràng',
      descriptionEn: 'Bat Trang ceramics',
      image: '/images/culture/go-son.jpg',
      category: 'craft'
    }
  ];

  return (
    <motion.div
      ref={containerRef}
      className={cn("py-16", className)}
      style={{ x }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-goldVN to-white mb-4">
            {t('gallery.title') || 'Văn Hóa Việt Nam'}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('gallery.description') || 'Khám phá những nét đẹp văn hóa truyền thống và hiện đại của dân tộc Việt Nam'}
          </p>
        </motion.div>

        {/* Horizontal scroll container */}
        <div className="relative overflow-hidden rounded-2xl">
          <motion.div
            className="flex gap-6 pb-6"
            initial={{ x: 0 }}
            animate={{
              x: [0, -100 * cultureItems.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {/* Duplicate items for seamless loop */}
            {[...cultureItems, ...cultureItems].map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                className="flex-shrink-0 w-64 md:w-72 lg:w-80"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                  {/* Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm opacity-90 mb-3">{item.description}</p>
                    <span className="inline-block px-3 py-1 bg-goldVN/20 backdrop-blur-sm rounded-full text-xs font-medium border border-goldVN/30">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-goldVN/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-goldVN text-sm font-bold">+</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-3 justify-center"
        >
          {['all', 'fashion', 'music', 'trade', 'agriculture', 'craft', 'theater', 'festival'].map((category) => (
            <motion.button
              key={category}
              className="px-4 py-2 bg-surface/50 hover:bg-goldVN/10 border border-goldVN/20 hover:border-goldVN/50 rounded-full text-sm transition-all duration-300 hover:text-goldVN"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t(`gallery.categories.${category}`) || category}
            </motion.button>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t('gallery.scrollHint') || 'Tự động cuộn • Di chuột để dừng'}</span>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex gap-1"
            >
              <div className="w-1 h-1 bg-goldVN rounded-full" />
              <div className="w-1 h-1 bg-goldVN rounded-full" />
              <div className="w-1 h-1 bg-goldVN rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

