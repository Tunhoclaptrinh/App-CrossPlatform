import { StyleSheet } from 'react-native';
import type { ThemeColors } from '@/constants/colors';
import type { ControlContrast, ControlVariant } from '../surfaceUtils';
import type { AppOtpSize } from './types';

export const OTP_SIZES: Record<
  AppOtpSize,
  {
    width: number;
    height: number;
    fontSize: number;
    borderRadius: number;
    gap: number;
    dotSize: number;
  }
> = {
  sm: { width: 38, height: 46, fontSize: 18, borderRadius: 8, gap: 8, dotSize: 10 },
  md: { width: 48, height: 56, fontSize: 22, borderRadius: 12, gap: 10, dotSize: 12 },
  lg: { width: 56, height: 64, fontSize: 26, borderRadius: 14, gap: 12, dotSize: 14 },
};

export const createOtpStyles = (
  theme: ThemeColors,
  isDark: boolean,
  size: AppOtpSize = 'md',
  variant: ControlVariant = 'standard',
  contrast: ControlContrast = 'normal',
  error: boolean = false
) => {
  const isHigh = contrast === 'high';
  const sizeConfig = OTP_SIZES[size] || OTP_SIZES.md;

  let defaultBg = isDark ? '#1E2433' : '#FFFFFF';
  let defaultBorder = isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.22)';
  let borderWidth = isHigh ? 1.5 : 1;

  if (variant === 'filled') {
    defaultBg = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
    defaultBorder = isHigh
      ? (isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.30)')
      : 'transparent';
    borderWidth = isHigh ? 1.5 : 0;
  } else if (variant === 'glass') {
    defaultBg = isDark ? 'rgba(30, 41, 59, 0.70)' : 'rgba(255, 255, 255, 0.70)';
    defaultBorder = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.85)';
    borderWidth = 1;
  }

  if (isHigh && variant !== 'filled') {
    defaultBorder = isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)';
  }

  if (error) {
    defaultBorder = theme.error;
    borderWidth = 1.5;
  }

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sizeConfig.gap,
      position: 'relative',
    },
    hiddenInput: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0.01,
      zIndex: 2,
    },
    box: {
      width: sizeConfig.width,
      height: sizeConfig.height,
      borderRadius: sizeConfig.borderRadius,
      backgroundColor: defaultBg,
      borderWidth,
      borderColor: defaultBorder,
      justifyContent: 'center',
      alignItems: 'center',
    },
    boxFocused: {
      borderColor: error ? theme.error : theme.primary,
      borderWidth: 2,
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.35,
      shadowRadius: 6,
      elevation: 3,
    },
    boxFilled: {
      borderColor: error ? theme.error : isHigh ? defaultBorder : theme.border,
    },
    boxText: {
      fontSize: sizeConfig.fontSize,
      fontWeight: '700',
      color: theme.text,
      textAlign: 'center',
    },
    secureDot: {
      width: sizeConfig.dotSize,
      height: sizeConfig.dotSize,
      borderRadius: sizeConfig.dotSize / 2,
      backgroundColor: theme.text,
    },
  });
};
