import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import type { ControlContrast, ControlShadow } from '../surfaceUtils';

export type ChipSize = 'sm' | 'md' | 'lg';
export type ChipVariant = 'filled' | 'outline' | 'glass';

export interface AppChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
  icon?: React.ReactNode;
  size?: ChipSize;
  variant?: ChipVariant;
  disabled?: boolean;
  contrast?: ControlContrast;
  shadow?: ControlShadow;
  borderRadius?: number;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  accessibilityLabel?: string;
}
