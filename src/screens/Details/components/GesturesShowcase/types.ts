import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

export interface GesturesShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass?: boolean;
  gestureFeedback: string;
  setGestureFeedback: (val: string) => void;
  shakeCount: number;
  resetShakeCount: () => void;
  simulateShake: () => void;
  language: string;
}
