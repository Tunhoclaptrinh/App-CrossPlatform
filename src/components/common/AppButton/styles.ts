import { StyleSheet } from 'react-native';
import { Spacing, RadiusPresets, RadiusPresetConfig, ControlSize } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';
import type { AppButtonVariant, AppButtonSize } from './types';

export const createButtonStyles = (
  colors: ThemeColors,
  radius: RadiusPresetConfig = RadiusPresets.standard,
  isDark: boolean = false
) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.control,
      overflow: 'hidden',
      position: 'relative',
    },
    // Sizes - Standardized via ControlSize Tokens
    sizeSm: {
      paddingVertical: Spacing.xs + 2,
      paddingHorizontal: ControlSize.sm.paddingHorizontal,
      minHeight: ControlSize.sm.height,
      height: ControlSize.sm.height,
      borderRadius: radius.control,
    },
    sizeMd: {
      paddingVertical: Spacing.sm + 2,
      paddingHorizontal: ControlSize.md.paddingHorizontal,
      minHeight: ControlSize.md.height,
      height: ControlSize.md.height,
      borderRadius: radius.control,
    },
    sizeLg: {
      paddingVertical: Spacing.md,
      paddingHorizontal: ControlSize.lg.paddingHorizontal,
      minHeight: ControlSize.lg.height,
      height: ControlSize.lg.height,
      borderRadius: radius.control,
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
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.09)' : 'rgba(255, 255, 255, 0.78)',
      borderWidth: 1.2,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.90)',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.35 : 0.08,
      shadowRadius: 10,
      elevation: 2,
    },
    specularHighlight: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 1.2,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.40)' : 'rgba(255, 255, 255, 0.98)',
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
      fontSize: ControlSize.sm.fontSize,
      lineHeight: ControlSize.sm.lineHeight,
    },
    textMd: {
      fontSize: ControlSize.md.fontSize,
      lineHeight: ControlSize.md.lineHeight,
    },
    textLg: {
      fontSize: ControlSize.lg.fontSize,
      lineHeight: ControlSize.lg.lineHeight,
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
    iconOnly: {
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    iconOnlyWrapper: {
      marginRight: 0,
      marginLeft: 0,
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
