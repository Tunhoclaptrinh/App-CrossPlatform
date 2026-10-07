import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

export interface UtilsShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass?: boolean;
  uuidValue: string;
  onGenerateUuid: () => void;
  onCopyUuid: () => void;
  onCheckCamera: () => void;
  onCheckUpdate: () => void;
}
