import { ViewStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export interface AppCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  contrast?: ControlContrast;
  style?: ViewStyle;
}

