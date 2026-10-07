import { ViewStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type OfflineBannerSize = 'sm' | 'md' | 'lg';

export interface OfflineBannerProps {
  message?: string;
  onRetry?: () => void;
  size?: OfflineBannerSize;
  contrast?: ControlContrast;
  borderRadius?: number;
  style?: ViewStyle;
}
