import { ViewStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type SkeletonVariant = 'rectangular' | 'circular' | 'text';

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  variant?: SkeletonVariant;
  contrast?: ControlContrast;
  style?: ViewStyle;
}

export interface SkeletonCardProps {
  style?: ViewStyle;
}
