import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { AppCard, AppText } from '@/components';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';
import type { ComponentMeta } from '../types';
import { haptics } from '@/utils';

interface ComponentCardItemProps {
  item: ComponentMeta;
  onPress: () => void;
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
}

export const ComponentCardItem: React.FC<ComponentCardItemProps> = React.memo(({
  item,
  onPress,
  themeColors,
  radiusTokens,
  isDark,
}) => {
  const IconComponent = item.icon;

  const categoryColor =
    item.category === 'molecules'
      ? '#007AFF'
      : item.category === 'organisms'
      ? '#8B5CF6'
      : '#10B981';

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        card: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 13,
          gap: 12,
        },
        iconBox: {
          width: 40,
          height: 40,
          borderRadius: Math.min(radiusTokens.control, 14),
          backgroundColor: isDark
            ? `${categoryColor}25`
            : `${categoryColor}15`,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: isDark ? `${categoryColor}40` : `${categoryColor}25`,
        },
        infoCol: {
          flex: 1,
          gap: 3,
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        },
        name: {
          fontSize: 14.5,
          fontWeight: '700',
          color: themeColors.text,
        },
        categoryBadge: {
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: radiusTokens.pill,
          backgroundColor: isDark ? `${categoryColor}20` : `${categoryColor}12`,
        },
        categoryText: {
          fontSize: 9.5,
          fontWeight: '700',
          color: categoryColor,
          textTransform: 'uppercase',
          letterSpacing: 0.4,
        },
        desc: {
          fontSize: 12,
          color: themeColors.textSecondary,
          lineHeight: 16.5,
        },
        arrowBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          paddingHorizontal: 8,
          paddingVertical: 5,
          borderRadius: radiusTokens.pill,
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
        },
        demoText: {
          fontSize: 11,
          fontWeight: '600',
          color: themeColors.textSecondary,
        },
      }),
    [themeColors, radiusTokens, isDark, categoryColor]
  );

  return (
    <AppCard
      padding="none"
      style={styles.card}
      onPress={() => {
        haptics.light();
        onPress();
      }}
    >
      <View style={styles.iconBox}>
        <IconComponent size={20} color={categoryColor} strokeWidth={2.2} />
      </View>
      <View style={styles.infoCol}>
        <View style={styles.headerRow}>
          <AppText style={styles.name}>{item.name}</AppText>
          <View style={styles.categoryBadge}>
            <AppText style={styles.categoryText}>{item.category}</AppText>
          </View>
        </View>
        <AppText style={styles.desc} numberOfLines={2}>
          {item.description}
        </AppText>
      </View>
      <View style={styles.arrowBtn}>
        <AppText style={styles.demoText}>Demo</AppText>
        <ChevronRight size={13} color={themeColors.textSecondary} strokeWidth={2.5} />
      </View>
    </AppCard>
  );
});

