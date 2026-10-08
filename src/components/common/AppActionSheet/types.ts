import React from 'react';
import { ViewStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export interface AppActionSheetItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  onPress: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export type AppActionSheetSize = 'sm' | 'md' | 'lg';

export interface AppActionSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  actions: AppActionSheetItem[];
  showCancel?: boolean;
  cancelLabel?: string;
  size?: AppActionSheetSize;
  contrast?: ControlContrast;
  borderRadius?: number;
  style?: ViewStyle;
  searchable?: boolean;
  searchPlaceholder?: string;
  maxHeight?: number | string;
}

