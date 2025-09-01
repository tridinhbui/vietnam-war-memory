'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/client';
import { Heart, Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-goldVN/20 bg-surface/50 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-red-600">🇻🇳 Việt Nam</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('about')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Liên kết nhanh</h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="/timeline"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Dòng thời gian
              </Link>
              <Link
                href="/map"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Bản đồ Việt Nam
              </Link>
              <Link
                href="/gallery"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Thư viện ảnh
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Giới thiệu
              </Link>
            </div>
          </div>

          {/* Social & Credits */}
          <div className="space-y-4">
            <h3 className="font-semibold">Kết nối</h3>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="External link"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground flex items-center">
              {t('credits')}
              <Heart className="h-4 w-4 mx-1 text-red-500" />
            </p>
            <p className="text-sm text-muted-foreground mt-2 md:mt-0">
              © 2025 Vietnam National Day Project
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
