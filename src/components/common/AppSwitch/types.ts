import { ViewStyle, SwitchProps } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type AppSwitchSize = 'sm' | 'md' | 'lg';

export interface AppSwitchProps extends Omit<SwitchProps, 'value' | 'onValueChange'> {
  value: boolean;
  onValueChange: (val: boolean) => void;
  label?: string;
  sublabel?: string;
  disabled?: boolean;
  size?: AppSwitchSize;
  contrast?: ControlContrast;
  style?: ViewStyle;
}
