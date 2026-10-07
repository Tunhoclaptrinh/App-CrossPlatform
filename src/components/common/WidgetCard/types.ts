import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type WidgetCardSize = 'sm' | 'md' | 'lg';

export interface WidgetCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: ReactNode;
  children?: ReactNode;
  size?: WidgetCardSize;
  contrast?: ControlContrast;
  borderRadius?: number;
  style?: ViewStyle;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}
