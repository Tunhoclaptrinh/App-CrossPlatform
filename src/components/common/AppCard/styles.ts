import { StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';
import { Shadows } from '@/constants/theme';
import type { AppCardVariant } from './types';

export const createCardVariantStyle = (
  variant: AppCardVariant,
  themeColors: typeof Colors.light
): ViewStyle => {
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

export const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});
