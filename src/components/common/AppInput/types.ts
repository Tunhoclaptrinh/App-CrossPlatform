import React from 'react';
import { TextInputProps, ViewStyle } from 'react-native';
import type { SurfaceControlProps } from '../surfaceUtils';

export type AppInputSize = 'sm' | 'md' | 'lg';

export interface AppInputProps extends TextInputProps, SurfaceControlProps {
  label?: string;
  error?: string;
  size?: AppInputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
  disabled?: boolean;
}
