import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/theme';
import type { AppBadgeVariant, AppBadgeShape } from './types';

export const getBadgeColors = (variant: AppBadgeVariant = 'primary', themeColors: typeof Colors.light) => {
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

export const getBadgeRadius = (shape: AppBadgeShape = 'pill') => {
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

export const styles = StyleSheet.create({
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
