import { ViewStyle } from 'react-native';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

export type ControlVariant = 'standard' | 'filled' | 'glass' | 'elevated' | 'outline';
export type ControlContrast = 'normal' | 'high' | 'subtle';
export type ControlShadow = boolean | 'none' | 'sm' | 'md' | 'lg';

export interface SurfaceControlProps {
  /**
   * Surface variant design language
   * - standard: Clean surface with theme border
   * - filled: Tinted background, subtle/no border (clean iOS style)
   * - glass: Translucent optical frosted glass surface with specular highlight border
   * - elevated: Solid card background with soft ambient drop shadow
   * - outline: Transparent background with crisp defined border
   * @default 'standard' (or 'glass' when global themeStyle === 'apple-glass')
   */
  variant?: ControlVariant;

  /**
   * Contrast level for border, surface and focus states
   * - normal: Standard balance
   * - high: Thicker/darker border, distinct boundary for low-contrast environments
   * - subtle: Soft hairline border, gentle blend with canvas
   * @default 'normal'
   */
  contrast?: ControlContrast;

  /**
   * Shadow elevation level
   * - none / false: Flat surface without shadow
   * - sm: Micro shadow for subtle separation
   * - md / true: Standard Apple-style soft drop shadow
   * - lg: Floated prominent depth shadow
   * @default 'none' (or 'md' for elevated variant)
   */
  shadow?: ControlShadow;

  /**
   * Custom border radius override in pixels (e.g. 8, 12, 16, 9999)
   */
  borderRadius?: number;

  /**
   * Custom border width override in pixels
   */
  borderWidth?: number;

  /**
   * Custom border color override
   */
  borderColor?: string;

  /**
   * Custom background color override
   */
  backgroundColor?: string;
}

export interface GetControlSurfaceOptions extends SurfaceControlProps {
  colors: ThemeColors;
  isDark?: boolean;
  isGlassMode?: boolean;
  isFocused?: boolean;
  hasError?: boolean;
  radiusTokens?: RadiusPresetConfig;
  globalContrast?: ControlContrast;
  globalShadow?: ControlShadow;
  globalControlVariant?: ControlVariant;
}

/**
 * Computes unified, high-aesthetic surface styles for all form controls
 * (AppInput, AppSelect, AppSearchBar, etc.) ensuring 100% visual parity
 * across Normal (Light/Dark) and Apple Liquid Glass modes.
 */
export const getControlSurfaceStyle = ({
  variant,
  contrast,
  shadow,
  borderRadius,
  borderWidth: customBorderWidth,
  borderColor: customBorderColor,
  backgroundColor: customBackgroundColor,
  isFocused = false,
  hasError = false,
  isGlassMode = false,
  isDark = false,
  colors,
  radiusTokens,
  globalContrast,
  globalShadow,
  globalControlVariant,
}: GetControlSurfaceOptions): ViewStyle => {
  // 1. Resolve Effective Variant
  const effectiveVariant: ControlVariant =
    variant ?? globalControlVariant ?? (isGlassMode ? 'glass' : 'standard');

  // 1b. Resolve Effective Contrast
  const effectiveContrast: ControlContrast =
    contrast ?? globalContrast ?? 'normal';

  // 2. Resolve Border Radius
  const resolvedRadius =
    borderRadius !== undefined
      ? borderRadius
      : radiusTokens
      ? radiusTokens.control >= 999
        ? 9999
        : radiusTokens.control
      : 12;

  // 3. Resolve Background Color
  let resolvedBg: string;
  switch (effectiveVariant) {
    case 'outline':
      resolvedBg = 'transparent';
      break;

    case 'filled':
      if (isGlassMode) {
        if (effectiveContrast === 'high') {
          resolvedBg = isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.92)';
        } else if (effectiveContrast === 'subtle') {
          resolvedBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.60)';
        } else {
          resolvedBg = isDark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(255, 255, 255, 0.80)';
        }
      } else {
        if (effectiveContrast === 'high') {
          resolvedBg = isDark ? '#0F172A' : '#E2E8F0';
        } else if (effectiveContrast === 'subtle') {
          resolvedBg = isDark ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC';
        } else {
          resolvedBg = isDark ? '#1E293B' : '#F1F5F9';
        }
      }
      break;

    case 'glass':
      if (effectiveContrast === 'high') {
        resolvedBg = isDark ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)';
      } else if (effectiveContrast === 'subtle') {
        resolvedBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.50)';
      } else {
        resolvedBg = isDark ? 'rgba(255, 255, 255, 0.09)' : 'rgba(255, 255, 255, 0.68)';
      }
      break;

    case 'elevated':
      if (isGlassMode) {
        resolvedBg = isDark ? 'rgba(30, 41, 59, 0.80)' : 'rgba(255, 255, 255, 0.85)';
      } else {
        if (effectiveContrast === 'high') {
          resolvedBg = isDark ? '#141A28' : '#FFFFFF';
        } else if (effectiveContrast === 'subtle') {
          resolvedBg = isDark ? '#1E2536' : '#FAFAFA';
        } else {
          resolvedBg = colors.surface;
        }
      }
      break;

    case 'standard':
    default:
      if (isGlassMode) {
        if (effectiveContrast === 'high') {
          resolvedBg = isDark ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.88)';
        } else if (effectiveContrast === 'subtle') {
          resolvedBg = isDark ? 'rgba(30, 41, 59, 0.50)' : 'rgba(255, 255, 255, 0.55)';
        } else {
          resolvedBg = isDark ? 'rgba(30, 41, 59, 0.70)' : 'rgba(255, 255, 255, 0.75)';
        }
      } else {
        if (effectiveContrast === 'high') {
          resolvedBg = isDark ? '#141A28' : '#FFFFFF';
        } else if (effectiveContrast === 'subtle') {
          resolvedBg = isDark ? '#1F293D' : '#F8FAFC';
        } else {
          resolvedBg = colors.surface;
        }
      }
      break;
  }

  // 4. Resolve Border Width
  let resolvedBorderWidth: number;
  if (hasError || isFocused) {
    resolvedBorderWidth = effectiveContrast === 'high' ? 2 : 1.5;
  } else {
    switch (effectiveVariant) {
      case 'outline':
        resolvedBorderWidth = effectiveContrast === 'high' ? 2 : effectiveContrast === 'subtle' ? 1 : 1.5;
        break;
      case 'filled':
        resolvedBorderWidth = effectiveContrast === 'high' ? 1 : effectiveContrast === 'subtle' ? 0 : 0.8;
        break;
      case 'glass':
        resolvedBorderWidth = effectiveContrast === 'high' ? 1.5 : effectiveContrast === 'subtle' ? 0.8 : 1;
        break;
      case 'elevated':
        resolvedBorderWidth = effectiveContrast === 'high' ? 1.5 : effectiveContrast === 'subtle' ? 0.5 : 1;
        break;
      case 'standard':
      default:
        resolvedBorderWidth = effectiveContrast === 'high' ? 1.5 : effectiveContrast === 'subtle' ? 0.8 : 1;
        break;
    }
  }

  // 5. Resolve Border Color
  let resolvedBorderColor: string;
  if (hasError) {
    resolvedBorderColor = colors.error;
  } else if (isFocused) {
    resolvedBorderColor = colors.primary;
  } else {
    switch (effectiveVariant) {
      case 'glass':
        if (effectiveContrast === 'high') {
          resolvedBorderColor = isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.98)';
        } else if (effectiveContrast === 'subtle') {
          resolvedBorderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.45)';
        } else {
          resolvedBorderColor = isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.85)';
        }
        break;

      case 'outline':
        if (effectiveContrast === 'high') {
          resolvedBorderColor = isDark ? '#94A3B8' : '#334155';
        } else if (effectiveContrast === 'subtle') {
          resolvedBorderColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';
        } else {
          resolvedBorderColor = isDark ? 'rgba(255, 255, 255, 0.30)' : 'rgba(0, 0, 0, 0.22)';
        }
        break;

      case 'filled':
        if (effectiveContrast === 'high') {
          resolvedBorderColor = isDark ? '#475569' : '#CBD5E1';
        } else if (effectiveContrast === 'subtle') {
          resolvedBorderColor = 'transparent';
        } else {
          resolvedBorderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
        }
        break;

      case 'elevated':
        if (effectiveContrast === 'high') {
          resolvedBorderColor = isDark ? '#475569' : '#CBD5E1';
        } else if (effectiveContrast === 'subtle') {
          resolvedBorderColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)';
        } else {
          resolvedBorderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)';
        }
        break;

      case 'standard':
      default:
        if (isGlassMode) {
          if (effectiveContrast === 'high') {
            resolvedBorderColor = isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.98)';
          } else if (effectiveContrast === 'subtle') {
            resolvedBorderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.45)';
          } else {
            resolvedBorderColor = isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.85)';
          }
        } else {
          if (effectiveContrast === 'high') {
            resolvedBorderColor = isDark ? '#64748B' : '#94A3B8';
          } else if (effectiveContrast === 'subtle') {
            resolvedBorderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
          } else {
            resolvedBorderColor = colors.border;
          }
        }
        break;
    }
  }

  // 6. Resolve Shadows
  const effectiveShadow: ControlShadow =
    shadow !== undefined
      ? shadow
      : effectiveVariant === 'elevated'
      ? effectiveContrast === 'high'
        ? 'lg'
        : effectiveContrast === 'subtle'
        ? 'sm'
        : 'md'
      : (globalShadow ?? 'none');

  let shadowStyle: ViewStyle = {};
  if (effectiveShadow === 'sm') {
    shadowStyle = {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDark ? 0.30 : 0.06,
      shadowRadius: 3,
      elevation: 1,
    };
  } else if (effectiveShadow === 'md' || effectiveShadow === true) {
    shadowStyle = {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.40 : 0.08,
      shadowRadius: 5,
      elevation: 2,
    };
  } else if (effectiveShadow === 'lg') {
    shadowStyle = {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.50 : 0.12,
      shadowRadius: 8,
      elevation: 4,
    };
  }

  // 7. Apply Manual Overrides
  return {
    backgroundColor: customBackgroundColor ?? resolvedBg,
    borderColor: (!hasError && !isFocused && customBorderColor) ? customBorderColor : resolvedBorderColor,
    borderWidth: customBorderWidth ?? resolvedBorderWidth,
    borderRadius: resolvedRadius,
    ...shadowStyle,
  };
};
