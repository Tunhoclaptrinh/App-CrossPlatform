import type { ThemeColors } from '@/constants/colors';
import type { ThemeStyle } from '@/hooks';
import type { RadiusPresetConfig } from '@/constants/theme';

export type BackdropTheme = 'aurora' | 'sunset' | 'ocean' | 'minimal';

export interface AppleGlassShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  themeStyle: ThemeStyle;
  onToggleThemeStyle: () => void;
}
