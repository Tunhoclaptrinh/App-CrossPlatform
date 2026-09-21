import { TouchableOpacityProps } from 'react-native';

export type AppButtonVariant = 'primary' | 'secondary' | 'outline';

export interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: AppButtonVariant;
  loading?: boolean;
}
