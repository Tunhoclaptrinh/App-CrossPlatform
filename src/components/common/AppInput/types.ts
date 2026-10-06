import React from 'react';
import { TextInputProps, ViewStyle } from 'react-native';

export type AppInputSize = 'sm' | 'md' | 'lg';

export interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  size?: AppInputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
  disabled?: boolean;
}


