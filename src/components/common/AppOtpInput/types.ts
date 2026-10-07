import { ViewStyle, TextStyle } from 'react-native';
import type { ControlContrast, ControlVariant } from '../surfaceUtils';

export type AppOtpSize = 'sm' | 'md' | 'lg';

export interface AppOtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  secureTextEntry?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  size?: AppOtpSize;
  borderRadius?: number;
  variant?: ControlVariant;
  contrast?: ControlContrast;
  style?: ViewStyle;
  boxStyle?: ViewStyle;
  boxTextStyle?: TextStyle;
  error?: boolean;
}
