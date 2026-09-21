import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export interface GlassCardProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  accentColor?: string;
  onPress?: () => void;
  glowEffect?: boolean;
}
