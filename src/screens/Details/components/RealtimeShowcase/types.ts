import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

export interface RealtimeShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass?: boolean;
  socketStatus: string;
  lastSocketMessage: string;
  onConnect: () => void;
  onDisconnect: () => void;
  onSendMessage: () => void;
}
