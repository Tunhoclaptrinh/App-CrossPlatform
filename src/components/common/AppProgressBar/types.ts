import { ViewStyle, TextStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type AppProgressBarSize = 'sm' | 'md' | 'lg' | number;

export interface AppProgressBarProps {
  /** Progress value from 0 to 100 (or 0.0 to 1.0) */
  progress: number;
  height?: number;
  size?: AppProgressBarSize;
  color?: string;
  trackColor?: string;
  animated?: boolean;
  showLabel?: boolean;
  labelPosition?: 'top' | 'right' | 'bottom';
  labelFormat?: (progress: number) => string;
  contrast?: ControlContrast;
  borderRadius?: number;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}
