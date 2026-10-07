import { ViewStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type AppCheckboxSize = 'sm' | 'md' | 'lg';

export interface AppCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: AppCheckboxSize;
  contrast?: ControlContrast;
  borderRadius?: number;
  style?: ViewStyle;
}

