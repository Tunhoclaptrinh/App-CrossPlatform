import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckCircle2, Zap, ShieldCheck } from 'lucide-react-native';
import { AppText } from '@/components';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';
import type { ModuleTabItem } from './ModuleTabs';

interface ModuleHeaderCardProps {
  currentTab: ModuleTabItem;
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
}

export const ModuleHeaderCard: React.FC<ModuleHeaderCardProps> = ({
  currentTab,
  themeColors,
  radiusTokens,
  isDark,
}) => {
  const styles = useMemo(() => createHeaderCardStyles(radiusTokens), [radiusTokens]);
  const TabIcon = currentTab.icon;

  return (
    <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
      {/* Top Meta Row */}
      <View style={styles.topRow}>
        <View style={[styles.iconBox, { backgroundColor: `${currentTab.color}15`, borderColor: `${currentTab.color}30` }]}>
          <TabIcon size={22} color={currentTab.color} strokeWidth={2.4} />
        </View>
        <View style={styles.readyBadge}>
          <View style={styles.badgePulseDot} />
          <AppText style={styles.readyBadgeText}>PRODUCTION READY</AppText>
        </View>
      </View>

      {/* Title & Desc */}
      <AppText style={[styles.title, { color: themeColors.text }]}>
        {currentTab.fullTitle}
      </AppText>
      <AppText style={[styles.desc, { color: themeColors.textSecondary }]}>
        {currentTab.desc}
      </AppText>

      {/* Tags Row */}
      <View style={styles.tagsRow}>
        <View style={[styles.tagPill, isDark ? styles.tagPillDark : styles.tagPillLight]}>
          <CheckCircle2 size={12} color="#10B981" strokeWidth={2.4} />
          <AppText style={[styles.tagText, { color: themeColors.textSecondary }]}>Native Tested</AppText>
        </View>
        <View style={[styles.tagPill, isDark ? styles.tagPillDark : styles.tagPillLight]}>
          <Zap size={12} color="#F59E0B" strokeWidth={2.4} />
          <AppText style={[styles.tagText, { color: themeColors.textSecondary }]}>Zero Latency</AppText>
        </View>
        <View style={[styles.tagPill, isDark ? styles.tagPillDark : styles.tagPillLight]}>
          <ShieldCheck size={12} color={themeColors.primary} strokeWidth={2.4} />
          <AppText style={[styles.tagText, { color: themeColors.textSecondary }]}>Type Safe (TypeScript)</AppText>
        </View>
      </View>
    </View>
  );
};

const createHeaderCardStyles = (radius: RadiusPresetConfig) =>
  StyleSheet.create({
    card: {
      borderRadius: radius.card,
      padding: 18,
      borderWidth: 1,
      gap: 12,
      marginBottom: 16,
    },
    cardLight: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E2E8F0',
      shadowColor: '#000000',
      shadowOpacity: 0.04,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
    },
    cardDark: {
      backgroundColor: '#111827',
      borderColor: '#1F2937',
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    iconBox: {
      width: 44,
      height: 44,
      borderRadius: Math.min(radius.smControl * 1.8, radius.card),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },
    readyBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: radius.badge,
      backgroundColor: 'rgba(16, 185, 129, 0.12)',
      borderWidth: 1,
      borderColor: 'rgba(16, 185, 129, 0.25)',
    },
    badgePulseDot: {
      width: 7,
      height: 7,
      borderRadius: 3.5,
      backgroundColor: '#10B981',
    },
    readyBadgeText: {
      fontSize: 10.5,
      fontWeight: '700',
      color: '#059669',
      letterSpacing: 0.6,
    },
    title: {
      fontSize: 20,
      fontWeight: '800',
      letterSpacing: -0.4,
      marginTop: -2,
    },
    desc: {
      fontSize: 13.5,
      lineHeight: 20,
      marginTop: -4,
    },
    tagsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    tagPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 9,
      paddingVertical: 5,
      borderRadius: radius.smControl,
      borderWidth: 1,
    },
  tagPillLight: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  tagPillDark: {
    backgroundColor: 'rgba(30, 41, 59, 0.55)',
    borderColor: 'rgba(51, 65, 85, 0.6)',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
