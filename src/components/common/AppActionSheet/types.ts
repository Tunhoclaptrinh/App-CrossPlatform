import React from 'react';
import { ViewStyle } from 'react-native';

export interface AppActionSheetItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  onPress: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export interface AppActionSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  actions: AppActionSheetItem[];
  showCancel?: boolean;
  cancelLabel?: string;
  style?: ViewStyle;
}
