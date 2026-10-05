import React from 'react';
import {
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { AppCardProps } from './types';
import { styles, createCardVariantStyle } from './styles';

export const AppCard: React.FC<AppCardProps> = ({
  children,
  variant = 'elevated',
  radius,
  padding = 'base',
  onPress,
  style,
}) => {
  const { theme: themeColors, radiusTokens } = useThemeMode();

  const cardRadius = radius ? BorderRadius[radius] : Math.min(radiusTokens.card, 16);

  const cardStyle: ViewStyle = {
    borderRadius: cardRadius,
    padding: Spacing[padding],
    ...createCardVariantStyle(variant, themeColors),
  };

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={onPress}
        style={[styles.base, cardStyle, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.base, cardStyle, style]}>{children}</View>;
};
