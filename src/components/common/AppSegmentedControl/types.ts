import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { ControlSizeKey } from '@/constants/theme';

import type { ControlContrast, ControlShadow } from '../surfaceUtils';

export interface SegmentOption<T = string | number> {
  label: string;
  value: T;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export type SegmentedVariant = 'standard' | 'glass' | 'pill' | 'tonal' | 'outline';
export type SegmentedSize = ControlSizeKey;

export interface AppSegmentedControlProps<T = string | number> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: SegmentedSize;
  variant?: SegmentedVariant;
  contrast?: ControlContrast;
  shadow?: ControlShadow;
  haptic?: boolean;
  fullWidth?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  activeThumbColor?: string;
  trackColor?: string;
  borderColor?: string;
  activeBorderColor?: string;
  borderRadius?: number;
  itemHeight?: number;
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  activeItemStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  activeLabelStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  badgeStyle?: StyleProp<ViewStyle>;
  activeBadgeStyle?: StyleProp<ViewStyle>;
  badgeTextStyle?: StyleProp<TextStyle>;
  activeBadgeTextStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}
