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

const staticStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
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
  },
  categoryBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  categoryText: {
    fontSize: 9.5,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  desc: {
    fontSize: 12,
    lineHeight: 16.5,
  },
  arrowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  arrowBtnDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  arrowBtnLight: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  demoText: {
    fontSize: 11,
    fontWeight: '600',
  },
});

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

  return (
    <AppCard
      padding="none"
      style={staticStyles.card}
      onPress={() => {
        haptics.light();
        onPress();
      }}
    >
      <View
        style={[
          staticStyles.iconBox,
          {
            borderRadius: Math.min(radiusTokens.control, 14),
            backgroundColor: isDark ? `${categoryColor}25` : `${categoryColor}15`,
            borderColor: isDark ? `${categoryColor}40` : `${categoryColor}25`,
          },
        ]}
      >
        <IconComponent size={20} color={categoryColor} strokeWidth={2.2} />
      </View>
      <View style={staticStyles.infoCol}>
        <View style={staticStyles.headerRow}>
          <AppText style={[staticStyles.name, { color: themeColors.text }]}>{item.name}</AppText>
          <View
            style={[
              staticStyles.categoryBadge,
              {
                borderRadius: radiusTokens.pill,
                backgroundColor: isDark ? `${categoryColor}20` : `${categoryColor}12`,
              },
            ]}
          >
            <AppText style={[staticStyles.categoryText, { color: categoryColor }]}>
              {item.category}
            </AppText>
          </View>
        </View>
        <AppText style={[staticStyles.desc, { color: themeColors.textSecondary }]} numberOfLines={2}>
          {item.description}
        </AppText>
      </View>
      <View
        style={[
          staticStyles.arrowBtn,
          isDark ? staticStyles.arrowBtnDark : staticStyles.arrowBtnLight,
          { borderRadius: radiusTokens.pill },
        ]}
      >
        <AppText style={[staticStyles.demoText, { color: themeColors.textSecondary }]}>Demo</AppText>
        <ChevronRight size={13} color={themeColors.textSecondary} strokeWidth={2.5} />
      </View>
    </AppCard>
  );
});

