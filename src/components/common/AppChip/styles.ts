import { StyleSheet } from 'react-native';
import type { ThemeColors } from '@/constants/colors';
import type { ChipSize, ChipVariant } from './types';
import type { ControlContrast } from '../surfaceUtils';

export const CHIP_HEIGHTS: Record<ChipSize, number> = {
  sm: 28,
  md: 34,
  lg: 40,
};

export const CHIP_FONT_SIZES: Record<ChipSize, number> = {
  sm: 12,
  md: 13.5,
  lg: 15,
};

export const createChipStyles = (
  theme: ThemeColors,
  isDark: boolean,
  size: ChipSize = 'md',
  variant: ChipVariant = 'filled',
  selected: boolean = false,
  contrast: ControlContrast = 'normal'
) => {
  const isHigh = contrast === 'high';
  const height = CHIP_HEIGHTS[size];
  const fontSize = CHIP_FONT_SIZES[size];

  let backgroundColor = isDark
    ? isHigh ? '#2A3447' : '#1E2433'
    : isHigh ? '#E2E8F0' : '#EDF2F7';
  let borderColor = isDark
    ? isHigh ? 'rgba(255, 255, 255, 0.35)' : 'rgba(255, 255, 255, 0.18)'
    : isHigh ? 'rgba(0, 0, 0, 0.30)' : 'rgba(0, 0, 0, 0.14)';
  let textColor = theme.text;
  let borderWidth = isHigh ? 1.5 : 1;

  if (selected) {
    backgroundColor = isDark ? `${theme.primary}25` : `${theme.primary}18`;
    borderColor = theme.primary;
    textColor = theme.primary;
    borderWidth = isHigh ? 2 : 1.5;
  } else if (variant === 'outline') {
    backgroundColor = isDark ? 'rgba(255, 255, 255, 0.04)' : '#FFFFFF';
    borderColor = isHigh
      ? isDark ? 'rgba(255, 255, 255, 0.50)' : 'rgba(0, 0, 0, 0.40)'
      : isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.20)';
  } else if (variant === 'glass') {
    backgroundColor = isDark ? 'rgba(30, 41, 59, 0.65)' : 'rgba(255, 255, 255, 0.75)';
    borderColor = isDark ? 'rgba(255, 255, 255, 0.24)' : 'rgba(255, 255, 255, 0.90)';
  }

  return StyleSheet.create({
    container: {
      height,
      paddingHorizontal: size === 'sm' ? 10 : 14,
      borderRadius: height / 2,
      borderWidth,
      borderColor,
      backgroundColor,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    label: {
      fontSize,
      fontWeight: selected ? '700' : '500',
      color: textColor,
    },
    removeBtn: {
      marginLeft: 2,
      padding: 2,
      borderRadius: 10,
    },
    disabled: {
      opacity: 0.45,
    },
  });
};
