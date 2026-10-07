import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface AppRadioProps {
  selected: boolean;
  onSelect: () => void;
  label?: string | React.ReactNode;
  sublabel?: string;
  disabled?: boolean;
  size?: RadioSize;
  contrast?: ControlContrast;
  borderRadius?: number;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  accessibilityLabel?: string;
}

export interface AppRadioOption<T = any> {
  value: T;
  label: string;
  sublabel?: string;
  disabled?: boolean;
}

export interface AppRadioGroupProps<T = any> {
  options: AppRadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
  direction?: 'vertical' | 'horizontal';
  size?: RadioSize;
  contrast?: ControlContrast;
  borderRadius?: number;
  style?: ViewStyle;
  gap?: number;
}
