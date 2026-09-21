import { ViewStyle } from 'react-native';

export type AppLogoSize = 'sm' | 'md' | 'lg' | 'xl' | number;
export type AppLogoOrientation = 'horizontal' | 'vertical';

export interface AppLogoProps {
  size?: AppLogoSize;
  showText?: boolean;
  orientation?: AppLogoOrientation;
  style?: ViewStyle;
}
