import { ViewStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type PaginationDotsSize = 'sm' | 'md' | 'lg' | number;

export interface PaginationDotsProps {
  count: number;
  activeIndex: number;
  onDotPress?: (index: number) => void;
  size?: PaginationDotsSize;
  activeWidth?: number;
  activeColor?: string;
  inactiveColor?: string;
  contrast?: ControlContrast;
  gap?: number;
  style?: ViewStyle;
}
