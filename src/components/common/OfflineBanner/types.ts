import { ViewStyle } from 'react-native';

export interface OfflineBannerProps {
  message?: string;
  onRetry?: () => void;
  style?: ViewStyle;
}
