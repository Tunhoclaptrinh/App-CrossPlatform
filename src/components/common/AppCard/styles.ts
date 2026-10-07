import { StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';
import { Shadows } from '@/constants/theme';
import type { ControlContrast, ControlShadow } from '../surfaceUtils';
import type { AppCardVariant } from './types';

export interface CardVariantOptions {
  variant: AppCardVariant;
  themeColors: typeof Colors.light;
  isDark?: boolean;
  contrast?: ControlContrast;
  shadow?: ControlShadow;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
}

export const createCardVariantStyle = (
  optionsOrVariant: AppCardVariant | CardVariantOptions,
  themeColors?: typeof Colors.light,
  isDark: boolean = false
): ViewStyle => {
  let variant: AppCardVariant;
  let colors: typeof Colors.light;
  let dark: boolean;
  let contrast: ControlContrast = 'normal';
  let shadow: ControlShadow | undefined;
  let customBorderWidth: number | undefined;
  let customBorderColor: string | undefined;
  let customBackgroundColor: string | undefined;

  if (typeof optionsOrVariant === 'object') {
    variant = optionsOrVariant.variant;
    colors = optionsOrVariant.themeColors;
    dark = !!optionsOrVariant.isDark;
    contrast = optionsOrVariant.contrast ?? 'normal';
    shadow = optionsOrVariant.shadow;
    customBorderWidth = optionsOrVariant.borderWidth;
    customBorderColor = optionsOrVariant.borderColor;
    customBackgroundColor = optionsOrVariant.backgroundColor;
  } else {
    variant = optionsOrVariant;
    colors = themeColors!;
    dark = isDark;
  }

  let baseStyle: ViewStyle;

  switch (variant) {
    case 'glass': {
      const defaultBorderColor =
        contrast === 'high'
          ? dark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.98)'
          : contrast === 'subtle'
          ? dark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.45)'
          : dark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.88)';

      const defaultBorderWidth =
        contrast === 'high' ? 1.5 : contrast === 'subtle' ? 0.8 : 1;

      baseStyle = {
        backgroundColor: dark ? 'rgba(24, 27, 38, 0.70)' : 'rgba(255, 255, 255, 0.72)',
        borderWidth: customBorderWidth ?? defaultBorderWidth,
        borderColor: customBorderColor ?? defaultBorderColor,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: dark ? 0.35 : 0.08,
        shadowRadius: 16,
        elevation: 0,
      };
      break;
    }

    case 'outlined': {
      const defaultBorderColor =
        contrast === 'high'
          ? dark ? '#64748B' : '#94A3B8'
          : contrast === 'subtle'
          ? dark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
          : colors.border;

      const defaultBorderWidth =
        contrast === 'high' ? 1.5 : contrast === 'subtle' ? 0.8 : 1;

      baseStyle = {
        backgroundColor: colors.card,
        borderWidth: customBorderWidth ?? defaultBorderWidth,
        borderColor: customBorderColor ?? defaultBorderColor,
      };
      break;
    }

    case 'flat': {
      baseStyle = {
        backgroundColor: colors.surfaceSubtle,
        borderWidth: contrast === 'high' ? 1 : 0,
        borderColor: contrast === 'high' ? (dark ? '#334155' : '#E2E8F0') : 'transparent',
      };
      break;
    }

    case 'elevated':
    default: {
      const defaultBorderColor =
        contrast === 'high'
          ? dark ? '#475569' : '#CBD5E1'
          : contrast === 'subtle'
          ? dark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)'
          : colors.borderLight;

      const defaultBorderWidth =
        contrast === 'high' ? 1.5 : 1;

      baseStyle = {
        backgroundColor: colors.card,
        borderWidth: customBorderWidth ?? defaultBorderWidth,
        borderColor: customBorderColor ?? defaultBorderColor,
        ...Shadows.sm,
      };
      break;
    }
  }

  // Handle explicit shadow overrides
  let shadowStyle: ViewStyle = {};
  if (shadow === 'none' || shadow === false) {
    shadowStyle = { ...Shadows.none };
  } else if (shadow === 'sm') {
    shadowStyle = {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: dark ? 0.30 : 0.06,
      shadowRadius: 3,
      elevation: 1,
    };
  } else if (shadow === 'md' || shadow === true) {
    shadowStyle = {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: dark ? 0.40 : 0.08,
      shadowRadius: 6,
      elevation: 3,
    };
  } else if (shadow === 'lg') {
    shadowStyle = {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: dark ? 0.50 : 0.14,
      shadowRadius: 12,
      elevation: 6,
    };
  }

  return {
    ...baseStyle,
    ...(shadow !== undefined ? shadowStyle : {}),
    ...(customBackgroundColor ? { backgroundColor: customBackgroundColor } : {}),
    ...(customBorderColor ? { borderColor: customBorderColor } : {}),
    ...(customBorderWidth !== undefined ? { borderWidth: customBorderWidth } : {}),
  };
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
