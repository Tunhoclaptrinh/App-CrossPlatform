import React from 'react';
import {
  TouchableOpacity,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing } from '@/constants/theme';

export interface AppCardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'flat';
  radius?: keyof typeof BorderRadius;
  padding?: keyof typeof Spacing;
  onPress?: () => void;
  style?: ViewStyle;
}

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

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: themeColors.card,
          borderWidth: 1,
          borderColor: themeColors.border,
        };
      case 'flat':
        return {
          backgroundColor: themeColors.surfaceSubtle,
        };
      case 'elevated':
      default:
        return {
          backgroundColor: themeColors.card,
          borderWidth: 1,
          borderColor: themeColors.borderLight,
          ...Shadows.sm,
        };
    }
  };

  const cardStyle: ViewStyle = {
    borderRadius: BorderRadius[radius],
    padding: Spacing[padding],
    ...getVariantStyle(),
  };

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={onPress}
        style={[cardStyle, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[cardStyle, style]}>{children}</View>;
};