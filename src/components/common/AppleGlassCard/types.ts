import type { StyleProp, ViewStyle } from 'react-native';

export interface AppleGlassCardProps {
  balance?: string;
  balanceLabel?: string;
  cardNumber?: string;
  cardHolder?: string;
  brandName?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}
