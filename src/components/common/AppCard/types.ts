import React from 'react';
import { ViewStyle } from 'react-native';
import { BorderRadius, Spacing } from '@/constants/theme';

export type AppCardVariant = 'elevated' | 'outlined' | 'flat';

export interface AppCardProps {
  children: React.ReactNode;
  variant?: AppCardVariant;
  radius?: keyof typeof BorderRadius;
  padding?: keyof typeof Spacing;
  onPress?: () => void;
  style?: ViewStyle;
}
