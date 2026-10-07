import { ViewStyle } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import type { ControlContrast } from '../surfaceUtils';

export type CupertinoIconTileSize = 'sm' | 'md' | 'lg' | number;

export interface CupertinoIconTileProps {
  icon: LucideIcon;
  size?: CupertinoIconTileSize;
  iconSize?: number;
  borderRadius?: number;
  contrast?: ControlContrast;
  gradientColors?: [string, string];
  baseColor?: string;
  style?: ViewStyle;
}
