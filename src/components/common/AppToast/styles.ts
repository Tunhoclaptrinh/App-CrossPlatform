import { StyleSheet, Platform } from 'react-native';
import type { ToastType, AppToastSize } from './types';
import type { ControlContrast } from '../surfaceUtils';

export const TOAST_COLORS: Record<ToastType, { bgDark: string; bgLight: string; icon: string; border: string; borderHigh: string }> = {
  success: {
    bgDark: 'rgba(6, 78, 59, 0.94)',
    bgLight: 'rgba(236, 253, 245, 0.98)',
    icon: '#10B981',
    border: 'rgba(16, 185, 129, 0.35)',
    borderHigh: 'rgba(16, 185, 129, 0.75)',
  },
  error: {
    bgDark: 'rgba(127, 29, 29, 0.94)',
    bgLight: 'rgba(254, 242, 242, 0.98)',
    icon: '#EF4444',
    border: 'rgba(239, 68, 68, 0.35)',
    borderHigh: 'rgba(239, 68, 68, 0.75)',
  },
  warning: {
    bgDark: 'rgba(120, 53, 15, 0.94)',
    bgLight: 'rgba(255, 251, 235, 0.98)',
    icon: '#F59E0B',
    border: 'rgba(245, 158, 11, 0.35)',
    borderHigh: 'rgba(245, 158, 11, 0.75)',
  },
  info: {
    bgDark: 'rgba(30, 41, 59, 0.94)',
    bgLight: 'rgba(241, 245, 249, 0.98)',
    icon: '#3B82F6',
    border: 'rgba(59, 130, 246, 0.35)',
    borderHigh: 'rgba(59, 130, 246, 0.75)',
  },
};

export const TOAST_SIZES: Record<
  AppToastSize,
  {
    paddingHorizontal: number;
    paddingVertical: number;
    titleSize: number;
    messageSize: number;
    iconSize: number;
    borderRadius: number;
    gap: number;
  }
> = {
  sm: { paddingHorizontal: 12, paddingVertical: 8, titleSize: 12.5, messageSize: 11.5, iconSize: 16, borderRadius: 18, gap: 8 },
  md: { paddingHorizontal: 16, paddingVertical: 12, titleSize: 13.5, messageSize: 12.5, iconSize: 20, borderRadius: 24, gap: 12 },
  lg: { paddingHorizontal: 20, paddingVertical: 15, titleSize: 15, messageSize: 13.5, iconSize: 24, borderRadius: 28, gap: 14 },
};

export const createToastStyles = (
  isDark: boolean,
  type: ToastType = 'info',
  position: 'top' | 'bottom' = 'top',
  size: AppToastSize = 'md',
  contrast: ControlContrast = 'normal',
  borderRadiusOverride?: number
) => {
  const conf = TOAST_COLORS[type];
  const isHigh = contrast === 'high';
  const sizeConfig = TOAST_SIZES[size] || TOAST_SIZES.md;
  const resolvedRadius = borderRadiusOverride !== undefined ? borderRadiusOverride : sizeConfig.borderRadius;

  return StyleSheet.create({
    wrapper: {
      position: 'absolute',
      left: 16,
      right: 16,
      zIndex: 9999,
      elevation: 9999,
      alignItems: 'center',
      ...(position === 'top'
        ? { top: Platform.OS === 'ios' ? 56 : 24 }
        : { bottom: Platform.OS === 'ios' ? 44 : 28 }),
    },
    pillContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: sizeConfig.paddingHorizontal,
      paddingVertical: sizeConfig.paddingVertical,
      borderRadius: resolvedRadius,
      backgroundColor: isDark ? conf.bgDark : conf.bgLight,
      borderWidth: isHigh ? 1.5 : 1,
      borderColor: isHigh ? conf.borderHigh : conf.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: isHigh ? 0.35 : 0.22,
      shadowRadius: 12,
      elevation: 8,
      maxWidth: 440,
      width: '100%',
      gap: sizeConfig.gap,
    },
    iconWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    textCol: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: sizeConfig.titleSize,
      fontWeight: '700',
      color: isDark ? '#FFFFFF' : '#0F172A',
      letterSpacing: -0.2,
    },
    message: {
      fontSize: sizeConfig.messageSize,
      fontWeight: isHigh ? '600' : '500',
      color: isDark
        ? (isHigh ? '#FFFFFF' : 'rgba(255, 255, 255, 0.90)')
        : (isHigh ? '#0F172A' : '#334155'),
      marginTop: 1,
    },
  });
};
