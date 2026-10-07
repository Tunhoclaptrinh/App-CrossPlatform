import { StyleSheet } from 'react-native';
import type { ThemeColors } from '@/constants/colors';
import type { RadioSize } from './types';
import type { ControlContrast } from '../surfaceUtils';

export const RADIO_SIZES: Record<RadioSize, { outer: number; inner: number }> = {
  sm: { outer: 18, inner: 8 },
  md: { outer: 22, inner: 10 },
  lg: { outer: 26, inner: 12 },
};

export const createRadioStyles = (
  theme: ThemeColors,
  isDark: boolean,
  size: RadioSize = 'md',
  selected: boolean,
  disabled: boolean = false,
  contrast: ControlContrast = 'normal'
) => {
  const { outer, inner } = RADIO_SIZES[size];
  const isHigh = contrast === 'high';
  const isSubtle = contrast === 'subtle';

  let borderColor = selected
    ? theme.primary
    : isHigh
      ? isDark ? 'rgba(255, 255, 255, 0.70)' : 'rgba(0, 0, 0, 0.65)'
      : isSubtle
        ? isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.18)'
        : isDark ? 'rgba(255, 255, 255, 0.40)' : 'rgba(0, 0, 0, 0.32)';

  let backgroundColor = selected
    ? isDark ? 'rgba(255, 255, 255, 0.08)' : '#FFFFFF'
    : isDark ? 'rgba(255, 255, 255, 0.06)' : '#FFFFFF';

  let borderWidth = isHigh ? 2 : 1.5;

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      opacity: disabled ? 0.45 : 1,
    },
    outerCircle: {
      width: outer,
      height: outer,
      borderRadius: outer / 2,
      borderWidth,
      borderColor,
      backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerDot: {
      width: inner,
      height: inner,
      borderRadius: inner / 2,
      backgroundColor: theme.primary,
    },
    textCol: {
      marginLeft: 10,
      flex: 1,
    },
    label: {
      fontSize: size === 'sm' ? 13.5 : size === 'lg' ? 16 : 14.5,
      fontWeight: '500',
      color: theme.text,
    },
    sublabel: {
      fontSize: 11.5,
      color: theme.textSecondary,
      marginTop: 2,
    },
  });
};
