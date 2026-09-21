import React from 'react';
import { StyleSheet, View, ViewStyle, useColorScheme } from 'react-native';
import { AppText } from './AppText';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/theme';

export interface AppBadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  shape?: 'pill' | 'rounded' | 'sharp';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  style?: ViewStyle;
}

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

  const getColorConfig = () => {
    switch (variant) {
      case 'success':
        return {
          bg: themeColors.successLight,
          text: themeColors.successText,
        };
      case 'warning':
        return {
          bg: themeColors.warningLight,
          text: themeColors.warningText,
        };
      case 'error':
        return {
          bg: themeColors.errorLight,
          text: themeColors.errorText,
        };
      case 'info':
        return {
          bg: themeColors.infoLight,
          text: themeColors.infoText,
        };
      case 'neutral':
        return {
          bg: themeColors.surfaceSubtle,
          text: themeColors.textSecondary,
        };
      case 'primary':
      default:
        return {
          bg: themeColors.primaryLight,
          text: themeColors.primary,
        };
    }
  };

  const getRadius = () => {
    switch (shape) {
      case 'sharp':
        return BorderRadius.none;
      case 'rounded':
        return BorderRadius.sm;
      case 'pill':
      default:
        return BorderRadius.full;
    }
  };

  const colors = getColorConfig();
  const isSm = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          borderRadius: getRadius(),
          paddingVertical: isSm ? Spacing.xxs : Spacing.xs,
          paddingHorizontal: isSm ? Spacing.sm : Spacing.md,
        },
        style,
      ]}
    >
      {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}
      <AppText
        variant={isSm ? 'caption' : 'subtitle2'}
        style={styles.label}
        color={colors.text}
      >
        {label}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  iconWrapper: {
    marginRight: Spacing.xs,
  },
  label: {
    fontWeight: '600',
  },
});