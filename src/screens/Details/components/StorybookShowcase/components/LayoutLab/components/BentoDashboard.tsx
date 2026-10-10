import React from 'react';
import { View } from 'react-native';
import {
  TrendingUp,
  Cpu,
  DollarSign,
  Zap,
  Activity,
  Sparkles,
} from 'lucide-react-native';
import {
  AppText,
  AppCard,
  CupertinoIconTile,
} from '@/components';
import { BENTO_BARS } from '../constants';
import type { BentoDashboardProps } from '../types';

export const BentoDashboard: React.FC<BentoDashboardProps> = React.memo(({
  styles,
}) => {
  return (
    <View style={styles.contentBody}>
      {/* Bento Main Revenue Card */}
      <AppCard variant="glass" style={styles.bentoRevenueCard}>
        <View style={styles.bentoRevenueHeader}>
          <View>
            <AppText style={styles.bentoSmallTag}>TỔNG DOANH THU HỆ THỐNG</AppText>
            <AppText style={styles.bentoMainNumber}>$128,450.00</AppText>
          </View>
          <View style={styles.bentoTrendBadge}>
            <TrendingUp size={14} color="#10B981" strokeWidth={2.4} />
            <AppText style={styles.bentoTrendText}>+24.6%</AppText>
          </View>
        </View>
        <View style={styles.bentoBarChart}>
          {BENTO_BARS.map((bar) => (
            <View key={bar.key} style={styles.bentoBarTrack}>
              <View
                style={[
                  styles.bentoBarFill,
                  bar.style,
                  bar.isHighlight ? styles.bentoBarHighlight : styles.bentoBarNormal,
                ]}
              />
            </View>
          ))}
        </View>
      </AppCard>

      {/* Bento 2-Col Split Cards */}
      <View style={styles.bentoSplitRow}>
        <AppCard variant="glass" style={styles.bentoSplitCard}>
          <View style={styles.bentoIconBox}>
            <Cpu size={18} color="#6366F1" strokeWidth={2.3} />
          </View>
          <AppText style={styles.bentoCardTitle}>GPU Hiệu Năng</AppText>
          <AppText style={styles.bentoBigStat}>120 FPS</AppText>
          <AppText style={styles.bentoCardSubtitle}>Độ trễ mượt 100%</AppText>
        </AppCard>

        <AppCard variant="glass" style={styles.bentoSplitCard}>
          <View style={[styles.bentoIconBox, styles.bentoIconBoxGreen]}>
            <DollarSign size={18} color="#10B981" strokeWidth={2.3} />
          </View>
          <AppText style={styles.bentoCardTitle}>Giao Dịch Khả Dụng</AppText>
          <AppText style={styles.bentoBigStatSuccess}>99.98%</AppText>
          <AppText style={styles.bentoCardSubtitle}>Sẵn sàng thanh toán</AppText>
        </AppCard>
      </View>

      {/* Cupertino Icon Tiles Bento */}
      <AppCard style={styles.bentoTilesCard}>
        <AppText style={styles.bentoTilesTitle}>
          Lối Tắt Ứng Dụng (Cupertino Tiles)
        </AppText>
        <View style={styles.tilesGrid}>
          <CupertinoIconTile
            icon={Cpu}
            gradientColors={['#6366F1', '#4F46E5']}
          />
          <CupertinoIconTile
            icon={Zap}
            gradientColors={['#10B981', '#059669']}
          />
          <CupertinoIconTile
            icon={Activity}
            gradientColors={['#F59E0B', '#D97706']}
          />
          <CupertinoIconTile
            icon={Sparkles}
            gradientColors={['#EC4899', '#DB2777']}
          />
        </View>
      </AppCard>
    </View>
  );
});
