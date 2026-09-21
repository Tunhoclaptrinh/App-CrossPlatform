import React from 'react';
import { ViewStyle } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

export interface ScreenWrapperProps extends SafeAreaViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
  contentContainerStyle?: ViewStyle;
  disableKeyboardDismiss?: boolean;
  backgroundColor?: string;
}
