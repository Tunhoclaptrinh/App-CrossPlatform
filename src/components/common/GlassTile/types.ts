import type { StyleProp, ViewStyle } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import type { ControlContrast } from '../surfaceUtils';

export type GlassTileSize = 'sm' | 'md' | 'lg';

export interface GlassTileProps {
  icon: LucideIcon;
  iconColor: string;
  badgeBgColor?: string;
  value: string;
  label: string;
  size?: GlassTileSize;
  contrast?: ControlContrast;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}
