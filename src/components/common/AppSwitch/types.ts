import { ViewStyle, SwitchProps } from 'react-native';

export interface AppSwitchProps extends Omit<SwitchProps, 'value' | 'onValueChange'> {
  value: boolean;
  onValueChange: (val: boolean) => void;
  label?: string;
  sublabel?: string;
  disabled?: boolean;
  style?: ViewStyle;
}
