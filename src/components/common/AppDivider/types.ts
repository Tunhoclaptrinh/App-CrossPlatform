import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type DividerOrientation = 'horizontal' | 'vertical';
export type AppDividerSize = 'sm' | 'md' | 'lg' | number;

export interface AppDividerProps {
  orientation?: DividerOrientation;
  inset?: number;
  insetEnd?: number;
  label?: string | React.ReactNode;
  labelStyle?: TextStyle;
  dashed?: boolean;
  size?: AppDividerSize;
  thickness?: number;
  color?: string;
  contrast?: ControlContrast;
  style?: ViewStyle;
}
