'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/client';
import { Button } from '@/components/ui/button';
import { locales } from '@/i18n/client';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { href: '/', label: t('home') },
    { href: '/timeline', label: t('timeline') },
    { href: '/map', label: t('map') },
    { href: '/gallery', label: t('gallery') },
    { href: '/about', label: t('about') },
  ];

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-goldVN/20 bg-surface/80 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/60 shadow-lg shadow-redVN/5"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto flex h-20 items-center px-4">
        {/* Logo */}
        <motion.div
          className="mr-8 flex"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" className="flex items-center space-x-3">
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🇻🇳
            </motion.span>
            <span className="hidden font-bold text-xl sm:inline-block bg-gradient-to-r from-redVN to-goldVN bg-clip-text text-transparent">
              Việt Nam
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navigation.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={`relative px-3 py-2 rounded-lg transition-all duration-300 hover:bg-goldVN/10 ${
                  pathname === item.href
                    ? 'text-goldVN font-semibold'
                    : 'text-muted-foreground hover:text-goldVN'
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-redVN to-goldVN rounded-full"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Language Switcher */}
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {locales.map((locale) => (
              <motion.div
                key={locale}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={pathname.startsWith(`/${locale}`) ? 'gold' : 'outline'}
                  size="sm"
                  asChild
                  className="font-medium"
                >
                  <Link href={pathname} locale={locale}>
                    {locale.toUpperCase()}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-goldVN hover:bg-goldVN/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute top-20 left-0 right-0 bg-surface/95 backdrop-blur-xl border-b border-goldVN/20 md:hidden shadow-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="container mx-auto flex flex-col space-y-4 p-6">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`block py-3 px-4 rounded-lg transition-all duration-300 hover:bg-goldVN/10 ${
                        pathname === item.href
                          ? 'text-goldVN font-semibold bg-goldVN/10'
                          : 'text-muted-foreground hover:text-goldVN'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
