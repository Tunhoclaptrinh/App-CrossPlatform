import { ReactNode } from 'react';
import { TouchableOpacityProps, TextStyle, StyleProp } from 'react-native';
import type { ControlContrast, ControlShadow } from '../surfaceUtils';

export type AppButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'tonal'
  | 'danger'
  | 'success'
  | 'ghost'
  | 'glass';

export type AppButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  textStyle?: StyleProp<TextStyle>;
  haptic?: boolean;
  fullWidth?: boolean;
  contrast?: ControlContrast;
  shadow?: ControlShadow;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
}
