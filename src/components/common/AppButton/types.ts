import { ReactNode } from 'react';
import { TouchableOpacityProps, TextStyle } from 'react-native';

export type AppButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'tonal'
  | 'danger'
  | 'ghost'
  | 'glass';

export type AppButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  textStyle?: TextStyle;
  haptic?: boolean;
}
