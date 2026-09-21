import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';
import type { AppButtonVariant, AppButtonSize } from './types';

export const createButtonStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BorderRadius.md,
    },
    // Sizes
    sizeSm: {
      paddingVertical: Spacing.xs + 2,
      paddingHorizontal: Spacing.md,
      minHeight: 36,
    },
    sizeMd: {
      paddingVertical: Spacing.sm + 2,
      paddingHorizontal: Spacing.lg,
      minHeight: 46,
    },
    sizeLg: {
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.xl,
      minHeight: 54,
    },
    // Variants
    primary: {
      backgroundColor: colors.primary,
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: colors.secondary,
      borderWidth: 0,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: colors.primary,
    },
    tonal: {
      backgroundColor: colors.primaryLight,
      borderWidth: 0,
    },
    danger: {
      backgroundColor: colors.error,
      borderWidth: 0,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    glass: {
      backgroundColor: colors.card,
      borderWidth: 1.2,
      borderColor: colors.border,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 10,
      elevation: 2,
    },
    // State
    disabled: {
      opacity: 0.45,
    },
    // Text styles
    textBase: {
      fontWeight: '600',
      textAlign: 'center',
    },
    textSm: {
      fontSize: 13,
      lineHeight: 18,
    },
    textMd: {
      fontSize: 15,
      lineHeight: 20,
    },
    textLg: {
      fontSize: 17,
      lineHeight: 22,
    },
    // Icon containers
    leftIconWrapper: {
      marginRight: Spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightIconWrapper: {
      marginLeft: Spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export const getButtonTextColor = (variant: AppButtonVariant, colors: ThemeColors): string => {
  switch (variant) {
    case 'outline':
      return colors.primary;
    case 'tonal':
      return colors.primary;
    case 'ghost':
      return colors.text;
    case 'glass':
      return colors.text;
    case 'danger':
    case 'primary':
    case 'secondary':
    default:
      return '#FFFFFF';
  }
};

export const getVariantStyle = (
  variant: AppButtonVariant,
  styles: ReturnType<typeof createButtonStyles>
) => {
  switch (variant) {
    case 'secondary':
      return styles.secondary;
    case 'outline':
      return styles.outline;
    case 'tonal':
      return styles.tonal;
    case 'danger':
      return styles.danger;
    case 'ghost':
      return styles.ghost;
    case 'glass':
      return styles.glass;
    case 'primary':
    default:
      return styles.primary;
  }
};

export const getSizeStyle = (
  size: AppButtonSize,
  styles: ReturnType<typeof createButtonStyles>
) => {
  switch (size) {
    case 'sm':
      return styles.sizeSm;
    case 'lg':
      return styles.sizeLg;
    case 'md':
    default:
      return styles.sizeMd;
  }
};

export const getTextSizeStyle = (
  size: AppButtonSize,
  styles: ReturnType<typeof createButtonStyles>
) => {
  switch (size) {
    case 'sm':
      return styles.textSm;
    case 'lg':
      return styles.textLg;
    case 'md':
    default:
      return styles.textMd;
  }
};
