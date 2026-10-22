import React from 'react';
import { StyleProp, ViewStyle, TouchableOpacityProps } from 'react-native';
import { BorderRadius, Spacing } from '@/constants/theme';
import type {
  ControlContrast,
  ControlShadow,
  SurfaceMode,
} from '../surfaceUtils';

export type AppCardVariant = 'elevated' | 'outlined' | 'flat' | 'glass';
export type AppCardSize = 'sm' | 'md' | 'lg';

export interface AppCardProps
  extends Pick<
    TouchableOpacityProps,
    'testID' | 'accessibilityLabel' | 'accessibilityHint' | 'disabled'
  > {
  children: React.ReactNode;
  variant?: AppCardVariant;
  size?: AppCardSize;
  surface?: SurfaceMode;
  gap?: keyof typeof Spacing;
  radius?: keyof typeof BorderRadius;
  padding?: keyof typeof Spacing;
  contrast?: ControlContrast;
  shadow?: ControlShadow;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
