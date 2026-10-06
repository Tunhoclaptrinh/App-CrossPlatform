import { ViewStyle } from 'react-native';

export type MeshVariant = 'aurora' | 'sunset' | 'ocean' | 'minimal';

export interface AppleMeshBackgroundProps {
  variant?: MeshVariant;
  style?: ViewStyle;
  children?: React.ReactNode;
}
