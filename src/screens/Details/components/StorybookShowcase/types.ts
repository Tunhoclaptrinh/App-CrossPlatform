import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

export interface StorybookShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass?: boolean;
}

export type StoryCategory = 'parity' | 'buttons' | 'inputs' | 'selects' | 'badges' | 'surfaces';
