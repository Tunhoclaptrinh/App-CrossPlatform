import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type AccordionVariant = 'card' | 'glass' | 'clean';
export type AppAccordionSize = 'sm' | 'md' | 'lg';

export interface AppAccordionProps {
  title: string | React.ReactNode;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  variant?: AccordionVariant;
  size?: AppAccordionSize;
  contrast?: ControlContrast;
  borderRadius?: number;
  style?: ViewStyle;
  headerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  titleStyle?: TextStyle;
  disabled?: boolean;
}
