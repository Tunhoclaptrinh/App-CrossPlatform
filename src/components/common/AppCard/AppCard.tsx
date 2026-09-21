import React from 'react';
import {
  TouchableOpacity,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/theme';
import type { AppCardProps } from './types';
import { styles, createCardVariantStyle } from './styles';

export const AppCard: React.FC<AppCardProps> = ({
  children,
  variant = 'elevated',
  radius = 'lg',
  padding = 'base',
  onPress,
  style,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

  const cardStyle: ViewStyle = {
    borderRadius: BorderRadius[radius],
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
