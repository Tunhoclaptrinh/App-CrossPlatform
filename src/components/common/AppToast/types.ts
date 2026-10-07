import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom';
export type AppToastSize = 'sm' | 'md' | 'lg';

export interface ToastOptions {
  id?: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  icon?: React.ReactNode;
  size?: AppToastSize;
  contrast?: ControlContrast;
  borderRadius?: number;
  onPress?: () => void;
  onClose?: () => void;
}

export interface AppToastProps extends ToastOptions {
  visible: boolean;
  onDismiss: () => void;
  size?: AppToastSize;
  contrast?: ControlContrast;
  borderRadius?: number;
  style?: ViewStyle;
  messageStyle?: TextStyle;
}

export interface ToastContextType {
  show: (options: ToastOptions | string) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  hide: () => void;
}
