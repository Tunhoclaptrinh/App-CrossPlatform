import { TextProps } from 'react-native';
import { Typography } from '@/constants/theme';

export type TypographyVariant = keyof typeof Typography;

export interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
}
