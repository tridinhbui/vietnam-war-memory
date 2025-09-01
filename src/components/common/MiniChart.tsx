'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart3 } from 'lucide-react';

interface ChartData {
  year: number;
  value: number;
  label: string;
}

interface MiniChartProps {
  data: ChartData[];
  title?: string;
  color?: string;
  className?: string;
}

export default function MiniChart({
  data,
  title,
  color = "#FFD000",
  className
}: MiniChartProps) {
  const t = useTranslations();

  const defaultTitle = t('chart.title') || 'Phát Triển Kinh Tế Việt Nam';

  // Calculate trend
  const firstValue = data[0]?.value || 0;
  const lastValue = data[data.length - 1]?.value || 0;
  const trend = ((lastValue - firstValue) / firstValue) * 100;
  const isPositive = trend > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <Card className="glass-effect border-goldVN/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-goldVN flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              {title || defaultTitle}
            </CardTitle>
            <motion.div
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                isPositive
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <TrendingUp className={`w-4 h-4 ${!isPositive && 'rotate-180'}`} />
              {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
            </motion.div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,208,0,0.1)"
                  strokeOpacity={0.3}
                />
                <XAxis
                  dataKey="year"
                  stroke="#F8F6F2"
                  fontSize={11}
                  tick={{ fill: '#F8F6F2', opacity: 0.7 }}
                  axisLine={{ stroke: 'rgba(255,208,0,0.2)' }}
                />
                <YAxis
                  stroke="#F8F6F2"
                  fontSize={11}
                  tick={{ fill: '#F8F6F2', opacity: 0.7 }}
                  axisLine={{ stroke: 'rgba(255,208,0,0.2)' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1C0505',
                    border: '1px solid rgba(255,208,0,0.2)',
                    borderRadius: '8px',
                    color: '#F8F6F2',
                    fontSize: '12px'
                  }}
                  labelStyle={{ color: '#FFD000' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  strokeWidth={3}
                  dot={{
                    fill: color,
                    strokeWidth: 2,
                    r: 4,
                    stroke: '#1C0505'
                  }}
                  activeDot={{
                    r: 6,
                    stroke: color,
                    strokeWidth: 2,
                    fill: '#1C0505'
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              {t('chart.description') || 'Dữ liệu từ Tổng cục Thống kê Việt Nam'}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

