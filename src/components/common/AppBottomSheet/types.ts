import React from 'react';
import { ViewStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type BottomSheetSnapPoint = 'auto' | 'half' | 'full' | number;
export type AppBottomSheetSize = 'sm' | 'md' | 'lg';

export interface AppBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  subtitle?: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  snapPoint?: BottomSheetSnapPoint;
  showHandle?: boolean;
  size?: AppBottomSheetSize;
  contrast?: ControlContrast;
  borderRadius?: number;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}
