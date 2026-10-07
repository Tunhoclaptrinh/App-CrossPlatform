import { ViewStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type EmptyStateSize = 'sm' | 'md' | 'lg';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionText?: string;
  onActionPress?: () => void;
  size?: EmptyStateSize;
  contrast?: ControlContrast;
  borderRadius?: number;
  style?: ViewStyle;
}
