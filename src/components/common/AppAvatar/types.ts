import { ImageSourcePropType, ViewStyle, ImageStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AppAvatarProps {
  source?: ImageSourcePropType | string;
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  badgeCount?: number;
  badgeText?: string;
  rounded?: boolean;
  contrast?: ControlContrast;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  onPress?: () => void;
  accessibilityLabel?: string;
}

export interface AppAvatarGroupItem {
  id?: string | number;
  source?: ImageSourcePropType | string;
  name?: string;
}

export interface AppAvatarGroupProps {
  items: AppAvatarGroupItem[];
  max?: number;
  size?: AvatarSize;
  spacing?: number;
  contrast?: ControlContrast;
  style?: ViewStyle;
  onMorePress?: () => void;
}
