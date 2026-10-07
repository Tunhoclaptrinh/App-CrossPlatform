import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

export interface PaperShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass?: boolean;
  rememberLogin: boolean;
  setRememberLogin: (val: boolean) => void;
  pushNotification: boolean;
  setPushNotification: (val: boolean) => void;
  onShowToast: () => void;
  onOpenDialog: () => void;
}
