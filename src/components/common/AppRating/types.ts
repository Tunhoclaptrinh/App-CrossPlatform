import { ViewStyle, TextStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type AppRatingSize = 'sm' | 'md' | 'lg' | number;

export interface AppRatingProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  size?: AppRatingSize;
  color?: string;
  emptyColor?: string;
  contrast?: ControlContrast;
  readOnly?: boolean;
  showScore?: boolean;
  precision?: 1 | 0.5;
  style?: ViewStyle;
  scoreStyle?: TextStyle;
}
