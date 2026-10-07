import type { StyleProp, ViewStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type AppleGlassCardSize = 'sm' | 'md' | 'lg';

export interface AppleGlassCardProps {
  balance?: string;
  balanceLabel?: string;
  cardNumber?: string;
  cardHolder?: string;
  brandName?: string;
  size?: AppleGlassCardSize;
  contrast?: ControlContrast;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}
