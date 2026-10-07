import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type AppListItemSize = 'sm' | 'md' | 'lg';
export type AppListItemVariant = 'standard' | 'card' | 'glass';

export interface AppListItemProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  value?: string;
  badge?: string | React.ReactNode;
  badgeColor?: string;
  iconBox?: boolean;
  iconBg?: string;
  iconColor?: string;
  variant?: AppListItemVariant;
  showChevron?: boolean;
  onPress?: () => void;
  destructive?: boolean;
  disabled?: boolean;
  showDivider?: boolean;
  dividerInset?: number;
  size?: AppListItemSize;
  contrast?: ControlContrast;
  borderRadius?: number;
  numberOfLinesTitle?: number;
  numberOfLinesSubtitle?: number;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  valueStyle?: TextStyle;
  accessibilityLabel?: string;
}

export interface AppListGroupProps {
  title?: string;
  footer?: string;
  children: React.ReactNode;
  variant?: 'card' | 'glass' | 'clean';
  size?: AppListItemSize;
  contrast?: ControlContrast;
  borderRadius?: number;
  style?: ViewStyle;
}
