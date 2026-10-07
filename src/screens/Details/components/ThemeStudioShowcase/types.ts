import type { AccentColor, ThemeColors } from '@/constants/colors';
import type { RadiusPreset, RadiusPresetConfig } from '@/constants/theme';
import type { ThemeStyle } from '@/hooks';

export interface ThemeStudioShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  accentColor: AccentColor;
  setAccentColor: (accent: AccentColor) => void;
  radiusPreset: RadiusPreset;
  setRadiusPreset: (preset: RadiusPreset) => void;
  isDark: boolean;
  toggleTheme: () => void;
  themeStyle: ThemeStyle;
  onToggleThemeStyle: () => void;
  onOpenStudioModal: () => void;
}
