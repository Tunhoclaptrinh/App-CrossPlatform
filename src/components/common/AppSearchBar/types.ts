import { ViewStyle } from 'react-native';

export interface AppSearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onDebounceChange?: (text: string) => void;
  debounceDelay?: number;
  placeholder?: string;
  onFilterPress?: () => void;
  onClear?: () => void;
  style?: ViewStyle;
}
