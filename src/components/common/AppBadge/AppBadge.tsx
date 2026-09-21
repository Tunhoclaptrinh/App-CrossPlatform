import React from 'react';
import { View, useColorScheme } from 'react-native';
import { AppText } from '../AppText';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/theme';
import type { AppBadgeProps } from './types';
import { styles, getBadgeColors, getBadgeRadius } from './styles';

export const AppBadge: React.FC<AppBadgeProps> = ({
  label,
  variant = 'primary',
  shape = 'pill',
  size = 'md',
  icon,
  style,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

  const colors = getBadgeColors(variant, themeColors);
  const isSm = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          borderRadius: getBadgeRadius(shape),
          paddingVertical: isSm ? Spacing.xxs : Spacing.xs,
          paddingHorizontal: isSm ? Spacing.sm : Spacing.md,
        },
        style,
      ]}
    >
      {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}
      <AppText
        variant={isSm ? 'caption' : 'subtitle'}
        style={styles.label}
        color={colors.text}
      >
        {label}
      </AppText>
    </View>
  );
};
