import { ViewStyle } from 'react-native';
import type { ControlSizeKey } from '@/constants/theme';
import type { SurfaceControlProps } from '../surfaceUtils';

export interface AppSearchBarProps extends SurfaceControlProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onDebounceChange?: (text: string) => void;
  debounceDelay?: number;
  placeholder?: string;
  size?: ControlSizeKey;
  onFilterPress?: () => void;
  onClear?: () => void;
  style?: ViewStyle;
}
