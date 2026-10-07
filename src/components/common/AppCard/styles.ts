import { StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';
import { Shadows } from '@/constants/theme';
import type { AppCardVariant } from './types';

export const createCardVariantStyle = (
  variant: AppCardVariant,
  themeColors: typeof Colors.light,
  isDark: boolean = false
): ViewStyle => {
  switch (variant) {
    case 'glass':
      return {
        backgroundColor: isDark ? 'rgba(24, 27, 38, 0.70)' : 'rgba(255, 255, 255, 0.72)',
        borderWidth: 1,
        borderColor: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.88)',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: isDark ? 0.35 : 0.08,
        shadowRadius: 16,
        elevation: 0,
      };
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
    position: 'relative',
    overflow: 'hidden',
  },
  specularHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1.2,
  },
  specularHighlightLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  specularHighlightDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.38)',
  },
});
