import React, { useMemo } from 'react';
import { View } from 'react-native';
import { CheckCircle2, Zap, ShieldCheck } from 'lucide-react-native';
import { AppText } from '@/components';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';
import type { ModuleTabItem } from './ModuleTabs';
import { createHeaderCardStyles } from './ModuleHeaderCard.styles';

interface ModuleHeaderCardProps {
  currentTab: ModuleTabItem;
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass?: boolean;
}

export const ModuleHeaderCard: React.FC<ModuleHeaderCardProps> = ({
  currentTab,
  themeColors,
  radiusTokens,
  isDark,
  isGlass = false,
}) => {
  const styles = useMemo(() => createHeaderCardStyles(radiusTokens), [radiusTokens]);
  const TabIcon = currentTab.icon;

  return (
    <View
      style={[
        styles.card,
        isGlass
          ? isDark
            ? styles.cardGlassDark
            : styles.cardGlassLight
          : isDark
          ? styles.cardDark
          : styles.cardLight,
      ]}
    >
      {isGlass && (
        <View style={isDark ? styles.specularHighlightDark : styles.specularHighlight} />
      )}

      {/* Top Meta Row */}
      <View style={styles.topRow}>
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor: `${currentTab.color}18`,
              borderColor: `${currentTab.color}35`,
            },
          ]}
        >
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
        <View
          style={[
            styles.tagPill,
            isGlass
              ? isDark
                ? styles.tagPillGlassDark
                : styles.tagPillGlassLight
              : isDark
              ? styles.tagPillDark
              : styles.tagPillLight,
          ]}
        >
          <CheckCircle2 size={12} color="#10B981" strokeWidth={2.4} />
          <AppText style={[styles.tagText, { color: themeColors.textSecondary }]}>
            Native Tested
          </AppText>
        </View>
        <View
          style={[
            styles.tagPill,
            isGlass
              ? isDark
                ? styles.tagPillGlassDark
                : styles.tagPillGlassLight
              : isDark
              ? styles.tagPillDark
              : styles.tagPillLight,
          ]}
        >
          <Zap size={12} color="#F59E0B" strokeWidth={2.4} />
          <AppText style={[styles.tagText, { color: themeColors.textSecondary }]}>
            Zero Latency
          </AppText>
        </View>
        <View
          style={[
            styles.tagPill,
            isGlass
              ? isDark
                ? styles.tagPillGlassDark
                : styles.tagPillGlassLight
              : isDark
              ? styles.tagPillDark
              : styles.tagPillLight,
          ]}
        >
          <ShieldCheck size={12} color={themeColors.primary} strokeWidth={2.4} />
          <AppText style={[styles.tagText, { color: themeColors.textSecondary }]}>
            Type Safe (TypeScript)
          </AppText>
        </View>
      </View>
    </View>
  );
};
