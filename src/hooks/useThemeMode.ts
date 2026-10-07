import { useMemo } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import {
  Colors,
  ThemeColors,
  AccentColor,
  AccentPalettes,
} from '@/constants/colors';
import {
  RadiusPreset,
  RadiusPresets,
  RadiusPresetConfig,
  BorderRadius,
} from '@/constants/theme';
import { useAppStore, ThemeMode, ThemeStyle } from './useAppStore';

export interface ThemeState {
  theme: ThemeColors;
  mode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;

  // Dynamic Theme Accents & Styling
  accentColor: AccentColor;
  setAccentColor: (accent: AccentColor) => void;
  radiusPreset: RadiusPreset;
  setRadiusPreset: (preset: RadiusPreset) => void;
  radiusTokens: RadiusPresetConfig;
  borderRadius: typeof BorderRadius;

  // Surfaces & Feedback
  themeStyle: ThemeStyle;
  setThemeStyle: (style: ThemeStyle) => void;
  toggleThemeStyle: () => void;
  isGlassTheme: boolean;
  globalContrast: import('@/components/common/surfaceUtils').ControlContrast;
  setGlobalContrast: (contrast: import('@/components/common/surfaceUtils').ControlContrast) => void;
  globalShadow: import('@/components/common/surfaceUtils').ControlShadow;
  setGlobalShadow: (shadow: import('@/components/common/surfaceUtils').ControlShadow) => void;
  globalControlVariant: import('@/components/common/surfaceUtils').ControlVariant;
  setGlobalControlVariant: (variant: import('@/components/common/surfaceUtils').ControlVariant) => void;
  hapticsEnabled: boolean;
  setHapticsEnabled: (enabled: boolean) => void;
  resetThemeSettings: () => void;
}

/**
 * Hook quản lý và ghi nhớ chế độ Sáng / Tối, màu chủ đạo (Accent Color),
 * cấp độ bo góc (Border Radius Presets) và phong cách bề mặt (Apple Glass / Flat).
 */
export function useThemeMode(): ThemeState {
  const deviceScheme = useDeviceColorScheme();
  const {
    themeMode,
    setThemeMode,
    toggleTheme,
    accentColor,
    setAccentColor,
    radiusPreset,
    setRadiusPreset,
    themeStyle,
    setThemeStyle,
    toggleThemeStyle,
    globalContrast,
    setGlobalContrast,
    globalShadow,
    setGlobalShadow,
    globalControlVariant,
    setGlobalControlVariant,
    hapticsEnabled,
    setHapticsEnabled,
    resetThemeSettings,
  } = useAppStore();

  const isDark = themeMode === 'system' ? deviceScheme === 'dark' : themeMode === 'dark';

  const theme = useMemo<ThemeColors>(() => {
    const baseColors = isDark ? Colors.dark : Colors.light;
    const activeAccent = AccentPalettes[accentColor] || AccentPalettes.blue;
    const accentMode = isDark ? activeAccent.dark : activeAccent.light;

    const colors: ThemeColors = {
      ...baseColors,
      primary: accentMode.primary,
      primaryLight: accentMode.primaryLight,
      primaryDark: accentMode.primaryDark,
    };

    if (themeStyle === 'apple-glass') {
      return {
        ...colors,
        background: 'transparent',
        card: isDark ? 'rgba(24, 27, 38, 0.72)' : 'rgba(255, 255, 255, 0.72)',
        surface: isDark ? 'rgba(30, 35, 48, 0.65)' : 'rgba(255, 255, 255, 0.65)',
        surfaceSubtle: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.45)',
        border: isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.82)',
        borderLight: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.90)',
        borderStrong: isDark ? 'rgba(255, 255, 255, 0.28)' : 'rgba(226, 232, 240, 0.90)',
      };
    }

    return colors;
  }, [isDark, accentColor, themeStyle]);

  const radiusTokens = RadiusPresets[radiusPreset] || RadiusPresets.standard;

  return {
    theme,
    mode: themeMode,
    isDark,
    setThemeMode,
    toggleTheme,
    accentColor,
    setAccentColor,
    radiusPreset,
    setRadiusPreset,
    radiusTokens,
    borderRadius: BorderRadius,
    themeStyle,
    setThemeStyle,
    toggleThemeStyle,
    isGlassTheme: themeStyle === 'apple-glass',
    globalContrast,
    setGlobalContrast,
    globalShadow,
    setGlobalShadow,
    globalControlVariant,
    setGlobalControlVariant,
    hapticsEnabled,
    setHapticsEnabled,
    resetThemeSettings,
  };
}