import React from 'react';
import { ViewStyle } from 'react-native';

export type AppBadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type AppBadgeShape = 'pill' | 'rounded' | 'sharp';
export type AppBadgeSize = 'sm' | 'md';

export interface AppBadgeProps {
  label: string;
  variant?: AppBadgeVariant;
  shape?: AppBadgeShape;
  size?: AppBadgeSize;
  icon?: React.ReactNode;
  style?: ViewStyle;
}
