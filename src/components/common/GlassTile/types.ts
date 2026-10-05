import type { StyleProp, ViewStyle } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

export interface GlassTileProps {
  icon: LucideIcon;
  iconColor: string;
  badgeBgColor?: string;
  value: string;
  label: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}
