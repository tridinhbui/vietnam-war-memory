'use client';

import { useEffect } from 'react';

export const dynamic = 'force-dynamic';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Countdown from '@/components/common/Countdown';
import TimelineRail from '@/components/timeline/TimelineRail';
import MilestoneCard from '@/components/timeline/MilestoneCard';
import VNMap from '@/components/map/VNMap';
import CultureGallery from '@/components/gallery/CultureGallery';
import MiniChart from '@/components/common/MiniChart';

// Store
import { useTimelineStore } from '@/store/useTimeline';

// Data
import milestonesVi from '@/data/milestones.vi.json';
import milestonesEn from '@/data/milestones.en.json';
import provincesData from '@/data/provinces.json';
import indicatorsData from '@/data/indicators.json';

export default function HomePage() {
  const t = useTranslations();
  const { setMilestones } = useTimelineStore();

  // Load milestones based on current locale
  useEffect(() => {
    const currentLocale = typeof window !== 'undefined'
      ? window.location.pathname.split('/')[1] || 'vi'
      : 'vi';

    const milestones = currentLocale === 'en' ? milestonesEn : milestonesVi;
    setMilestones(milestones);
  }, [setMilestones]);

  // Prepare chart data
  const chartData = indicatorsData.gdp_growth.map(item => ({
    year: item.year,
    value: item.value,
    label: 'GDP Growth (%)'
  }));

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2a0000] via-[#1a0000] to-[#000000] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-goldVN rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-redVN rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 border border-goldVN rounded-full animate-pulse delay-500"></div>
      </div>

      <Header />

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section id="hero" className="min-h-screen flex items-center justify-center relative">
          {/* Hero Background with Flag Wave Animation */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, #FFD000 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, #C8102E 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 20%, #FFD000 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, #FFD000 0%, transparent 50%)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="container mx-auto px-4 py-20 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.span
                className="inline-block px-6 py-3 bg-redVN/20 text-redVN rounded-full text-sm font-medium mb-6 border border-redVN/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
              >
                🇻🇳 02 tháng 09 - Ngày Quốc khánh Việt Nam
              </motion.span>
            </motion.div>

            <motion.h1
              className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-goldVN via-white to-goldVN mb-8 leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Sử Hào Hùng
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Khám phá hành trình lịch sử và phát triển của dân tộc Việt Nam qua các mốc thời gian quan trọng,
              thể hiện tinh thần đoàn kết và ý chí kiên cường của dân tộc.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                onClick={() => scrollToSection('timeline')}
                className="bg-redVN text-primary-foreground px-10 py-5 rounded-xl hover:bg-redVN-700 transition-all duration-300 font-medium shadow-[0_12px_40px_rgba(200,16,46,.3)] hover:shadow-[0_20px_60px_rgba(200,16,46,.5)] transform hover:-translate-y-2 active:translate-y-0 border border-redVN-700/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Khám phá Lịch sử
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('map')}
                className="bg-goldVN text-accent-foreground px-10 py-5 rounded-xl hover:bg-goldVN-600 transition-all duration-300 font-medium shadow-[0_12px_40px_rgba(255,208,0,.3)] hover:shadow-[0_20px_60px_rgba(255,208,0,.5)] transform hover:-translate-y-2 active:translate-y-0 border border-goldVN-700/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Xem Bản đồ
              </motion.button>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="max-w-lg mx-auto"
            >
              <Countdown />
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-goldVN/50 rounded-full flex justify-center cursor-pointer"
              onClick={() => scrollToSection('timeline')}
            >
              <motion.div
                className="w-1 h-2 bg-goldVN rounded-full mt-2"
                animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* TIMELINE + MAP SECTION */}
        <section id="timeline" className="py-20 bg-surface/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-goldVN to-white mb-4">
                Hành Trình Lịch Sử
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Theo dõi các mốc son trong lịch sử dân tộc Việt Nam từ năm 1945 đến nay
              </p>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              {/* Timeline Rail - Desktop */}
              <div className="hidden xl:block xl:col-span-3">
                <div className="sticky top-24">
                  <TimelineRail
                    milestones={typeof window !== 'undefined'
                      ? (window.location.pathname.split('/')[1] === 'en' ? milestonesEn : milestonesVi)
                      : milestonesVi
                    }
                  />
                </div>
              </div>

              {/* Milestone Cards */}
              <div className="xl:col-span-6 space-y-12">
                {(typeof window !== 'undefined'
                  ? (window.location.pathname.split('/')[1] === 'en' ? milestonesEn : milestonesVi)
                  : milestonesVi
                ).map((milestone: any, index: number) => (
                  <MilestoneCard
                    key={milestone.id}
                    milestone={milestone}
                    index={index}
                  />
                ))}
              </div>

              {/* Map Section */}
              <div id="map" className="xl:col-span-3">
                <div className="sticky top-24">
                  <VNMap provinces={provincesData} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MINI CHART SECTION */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <MiniChart
                data={chartData}
                title="Phát Triển Kinh Tế Việt Nam"
                color="#FFD000"
              />
            </motion.div>
          </div>
        </section>

        {/* CULTURE GALLERY SECTION */}
        <section id="culture" className="py-20">
          <CultureGallery />
        </section>

        {/* SOURCES & CREDITS SECTION */}
        <section className="py-20 bg-surface/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-goldVN to-white mb-4">
                Nguồn Gốc & Tài Liệu
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Thông tin được tổng hợp từ các nguồn chính thống và đáng tin cậy
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Lịch sử Việt Nam',
                  source: 'Bộ Văn hóa, Thể thao và Du lịch',
                  description: 'Tài liệu chính thức về lịch sử dân tộc'
                },
                {
                  title: 'Thống kê Quốc gia',
                  source: 'Tổng cục Thống kê Việt Nam',
                  description: 'Dữ liệu kinh tế và dân số chính thức'
                },
                {
                  title: 'Liên Hợp Quốc',
                  source: 'United Nations Development Programme',
                  description: 'Báo cáo phát triển bền vững'
                }
              ].map((source, index) => (
                <motion.div
                  key={source.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-effect border-goldVN/20 p-6 rounded-2xl hover:border-goldVN/40 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-goldVN mb-2">{source.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 font-medium">{source.source}</p>
                  <p className="text-sm text-muted-foreground">{source.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Credits */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <span>Được tạo với ❤️ cho ngày Quốc khánh Việt Nam</span>
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-redVN"
                >
                  🇻🇳
                </motion.span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                © 2025 Dự án Quốc khánh Việt Nam
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

