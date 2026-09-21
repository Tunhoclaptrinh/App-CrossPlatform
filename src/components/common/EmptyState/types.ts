import { ViewStyle } from 'react-native';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionText?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}
