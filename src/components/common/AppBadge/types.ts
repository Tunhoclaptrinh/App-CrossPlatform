import React from 'react';
import { ViewStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type AppBadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type AppBadgeShape = 'pill' | 'rounded' | 'sharp';
export type AppBadgeSize = 'sm' | 'md' | 'lg';

export interface AppBadgeProps {
  label: string;
  variant?: AppBadgeVariant;
  shape?: AppBadgeShape;
  size?: AppBadgeSize;
  icon?: React.ReactNode;
  contrast?: ControlContrast;
  borderRadius?: number;
  style?: ViewStyle;
}
