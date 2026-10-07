import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';
import type { ServerEncryptedPayload } from '@/utils';

export interface CryptoShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass?: boolean;
  cryptoInput: string;
  setCryptoInput: (text: string) => void;
  cipherResult: ServerEncryptedPayload | null;
  decryptedResult: string | null;
  onEncrypt: () => void;
  onDecrypt: () => void;
  onBiometricAuth: () => void;
}
