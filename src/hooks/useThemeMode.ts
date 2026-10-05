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
    hapticsEnabled,
    setHapticsEnabled,
    resetThemeSettings,
  } = useAppStore();

  const isDark = themeMode === 'system' ? deviceScheme === 'dark' : themeMode === 'dark';

  const theme = useMemo<ThemeColors>(() => {
    const baseColors = isDark ? Colors.dark : Colors.light;
    const activeAccent = AccentPalettes[accentColor] || AccentPalettes.blue;
    const accentMode = isDark ? activeAccent.dark : activeAccent.light;

    return {
      ...baseColors,
      primary: accentMode.primary,
      primaryLight: accentMode.primaryLight,
      primaryDark: accentMode.primaryDark,
    };
  }, [isDark, accentColor]);

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
    hapticsEnabled,
    setHapticsEnabled,
    resetThemeSettings,
  };
}