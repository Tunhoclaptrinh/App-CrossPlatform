import type { ViewStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  contrast?: ControlContrast;
  style?: ViewStyle;
}
