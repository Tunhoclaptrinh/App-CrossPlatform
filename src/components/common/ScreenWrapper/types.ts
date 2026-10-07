import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

export interface ScreenWrapperProps extends SafeAreaViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  disableKeyboardDismiss?: boolean;
  backgroundColor?: string;
  disableMeshBackground?: boolean;
  showsScrollIndicator?: boolean;
  nestedScrollEnabled?: boolean;
}

