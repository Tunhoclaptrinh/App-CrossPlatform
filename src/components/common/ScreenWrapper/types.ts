import React from 'react';
import { ViewStyle, StyleProp, Insets } from 'react-native';
import type { ScrollViewInstance } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

import type { IndicatorMode, IndicatorInsets } from '../AppScrollView/types';

export type ScreenScrollViewRef = ScrollViewInstance;

export interface ScreenWrapperProps extends SafeAreaViewProps {
  children: React.ReactNode;
  /** Fixed slots outside the scrollable body. Header owns its top safe area. */
  header?: React.ReactNode;
  footer?: React.ReactNode;
  scrollable?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  disableKeyboardDismiss?: boolean;
  backgroundColor?: string;
  disableMeshBackground?: boolean;
  showsScrollIndicator?: boolean;
  nestedScrollEnabled?: boolean;
  scrollRef?: React.Ref<ScrollViewInstance>;
  indicatorMode?: IndicatorMode;
  indicatorThickness?: number;
  indicatorLength?: number;
  minIndicatorLength?: number;
  maxIndicatorLength?: number;
  indicatorColor?: string;
  indicatorInsets?: IndicatorInsets;
  idleOpacity?: number;
  activeOpacity?: number;
  showTrack?: boolean;
  draggableIndicator?: boolean;
  dragHitSlop?: Insets | number;
  enableGrabFeedback?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

