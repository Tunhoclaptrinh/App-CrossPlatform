import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import type { ControlSizeKey } from '@/constants/theme';
import type { SurfaceControlProps } from '../surfaceUtils';

export interface AppSelectOption<T = string | number> {
  label: string;
  value: T;
  icon?: ReactNode;
  sublabel?: string;
  disabled?: boolean;
}

export type AppSelectSize = ControlSizeKey;

export interface AppSelectProps<T = string | number> extends SurfaceControlProps {
  options: AppSelectOption<T>[];
  value?: T;
  onSelect: (value: T) => void;
  size?: AppSelectSize;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  leftIcon?: ReactNode;
  containerStyle?: ViewStyle;
  sheetTitle?: string;
}
