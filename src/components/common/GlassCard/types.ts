import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

import type { ControlContrast } from '../surfaceUtils';

export interface GlassCardProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  accentColor?: string;
  contrast?: ControlContrast;
  onPress?: () => void;
  glowEffect?: boolean;
}
