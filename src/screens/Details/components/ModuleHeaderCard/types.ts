import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';
import type { ModuleTabItem } from '../ModuleTabs';

export interface ModuleHeaderCardProps {
  currentTab: ModuleTabItem;
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass?: boolean;
}
