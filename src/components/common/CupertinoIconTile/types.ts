import { ViewStyle } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

export interface CupertinoIconTileProps {
  icon: LucideIcon;
  size?: number;
  iconSize?: number;
  gradientColors?: [string, string];
  baseColor?: string;
  style?: ViewStyle;
}
