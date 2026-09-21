import React from 'react';
import { View } from 'react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { AppBadgeProps } from './types';
import { styles, getBadgeColors, getBadgeContainerStyle } from './styles';

export const AppBadge: React.FC<AppBadgeProps> = ({
  label,
  variant = 'primary',
  shape = 'pill',
  size = 'md',
  icon,
  style,
}) => {
  const { theme: themeColors } = useThemeMode();
  const colors = getBadgeColors(variant, themeColors);
  const isSm = size === 'sm';

  return (
    <View
      style={[
        getBadgeContainerStyle(shape, size, colors.bg),
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
