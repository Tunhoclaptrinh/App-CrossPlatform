import { ViewStyle } from 'react-native';

export type SkeletonVariant = 'rectangular' | 'circular' | 'text';

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  variant?: SkeletonVariant;
  style?: ViewStyle;
}

export interface SkeletonCardProps {
  style?: ViewStyle;
}
