import type { ViewStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type ConfirmDialogSize = 'sm' | 'md' | 'lg';

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
  size?: ConfirmDialogSize;
  borderRadius?: number;
  icon?: React.ReactNode;
  contrast?: ControlContrast;
  style?: ViewStyle;
}
