import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

export interface StorageShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass?: boolean;
  counter: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  storageInput: string;
  setStorageInput: (text: string) => void;
  savedStorageVal: string | null;
  onSaveStorage: () => void;
  fileContent: string;
  setFileContent: (text: string) => void;
  onSaveFile: () => void;
  onShareFile: () => void;
  language: string;
}
