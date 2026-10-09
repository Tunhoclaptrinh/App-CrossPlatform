import { StyleSheet, Platform } from 'react-native';
import { RadiusPresetConfig } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';
import type { ControlContrast } from '../surfaceUtils';
import type { AppActionSheetSize } from './types';

export const ACTION_SHEET_SIZES: Record<
  AppActionSheetSize,
  {
    itemPaddingV: number;
    itemPaddingH: number;
    labelSize: number;
    descSize: number;
    iconBox: number;
    cancelPaddingV: number;
    cancelSize: number;
  }
> = {
  sm: { itemPaddingV: 10, itemPaddingH: 14, labelSize: 14, descSize: 11, iconBox: 24, cancelPaddingV: 12, cancelSize: 14.5 },
  md: { itemPaddingV: 14, itemPaddingH: 18, labelSize: 15.5, descSize: 11.5, iconBox: 28, cancelPaddingV: 15, cancelSize: 16 },
  lg: { itemPaddingV: 18, itemPaddingH: 22, labelSize: 17, descSize: 12.5, iconBox: 32, cancelPaddingV: 18, cancelSize: 17.5 },
};

export const createActionSheetStyles = (
  theme: ThemeColors,
  radius: RadiusPresetConfig,
  isDark: boolean,
  contrast: ControlContrast = 'normal',
  isGlass: boolean = false,
  size: AppActionSheetSize = 'md',
  borderRadiusOverride?: number
) => {
  const isHigh = contrast === 'high';
  const isSubtle = contrast === 'subtle';
  const sizeConfig = ACTION_SHEET_SIZES[size] || ACTION_SHEET_SIZES.md;
  const resolvedRadius = borderRadiusOverride !== undefined ? borderRadiusOverride : radius.card;
  const cancelRadius = borderRadiusOverride !== undefined
    ? borderRadiusOverride
    : (radius.control >= 9999 || radius.pill >= 9999 ? 9999 : resolvedRadius);

  let borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';
  let borderWidth = 1;
  if (isHigh) {
    borderWidth = 1.5;
    borderColor = isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.30)';
  } else if (isSubtle) {
    borderWidth = 0.5;
    borderColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)';
  } else if (isGlass) {
    borderColor = isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.75)';
  }

  const surfaceBg = isGlass
    ? isDark
      ? 'rgba(26, 34, 52, 0.92)'
      : 'rgba(255, 255, 255, 0.94)'
    : isDark
      ? '#1E2433'
      : '#FFFFFF';

  return StyleSheet.create({
    modalRoot: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdropDismissArea: {
      flex: 1,
    },
    backdropLight: {
      backgroundColor: 'rgba(15, 23, 42, 0.55)',
    },
    backdropDark: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    sheetWrapper: {
      paddingHorizontal: 12,
      paddingBottom: Platform.OS === 'ios' ? 34 : 20,
      gap: 8,
      zIndex: 10,
      elevation: 10,
    },
    sheetWrapperKeyboard: {
      paddingBottom: 10,
    },
    contentBlock: {
      borderRadius: resolvedRadius,
      overflow: 'hidden',
      backgroundColor: surfaceBg,
      borderWidth,
      borderColor,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isHigh ? 0.28 : isSubtle ? 0.1 : 0.18,
      shadowRadius: 14,
      elevation: 8,
    },
    headerBox: {
      paddingHorizontal: 16,
      paddingVertical: 14,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
    },
    title: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      textAlign: 'center',
    },
    message: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 3,
      textAlign: 'center',
    },
    searchContainer: {
      paddingHorizontal: 12,
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
    },
    scrollContainer: {
      maxHeight: 380,
    },
    scrollContent: {
      flexGrow: 0,
    },
    emptyStateBox: {
      paddingVertical: 28,
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyStateText: {
      fontSize: 13,
      color: theme.textSecondary,
      textAlign: 'center',
    },
    actionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: sizeConfig.itemPaddingH,
      paddingVertical: sizeConfig.itemPaddingV,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
    },
    actionItemLast: {
      borderBottomWidth: 0,
    },
    actionItemDisabled: {
      opacity: 0.4,
    },
    actionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flex: 1,
    },
    iconContainer: {
      width: sizeConfig.iconBox,
      height: sizeConfig.iconBox,
      borderRadius: radius.smControl || Math.round(sizeConfig.iconBox * 0.25),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
    },
    iconContainerDestructive: {
      backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)',
    },
    actionTextCol: {
      flex: 1,
    },
    actionLabel: {
      fontSize: sizeConfig.labelSize,
      fontWeight: isHigh ? '700' : '600',
      color: theme.text,
    },
    actionLabelDestructive: {
      color: '#EF4444',
      fontWeight: isHigh ? '700' : '600',
    },
    actionDesc: {
      fontSize: sizeConfig.descSize,
      color: isHigh
        ? (isDark ? 'rgba(255, 255, 255, 0.85)' : '#334155')
        : theme.textSecondary,
      marginTop: 2,
    },
    cancelBlock: {
      width: '100%',
      borderRadius: cancelRadius,
      overflow: 'hidden',
      backgroundColor: isDark
        ? 'rgba(30, 41, 59, 0.75)'
        : 'rgba(255, 255, 255, 0.80)',
      borderWidth: 1.2,
      borderColor: isDark
        ? 'rgba(255, 255, 255, 0.20)'
        : 'rgba(255, 255, 255, 0.90)',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isHigh ? 0.28 : isDark ? 0.22 : 0.08,
      shadowRadius: 12,
      elevation: 6,
      marginTop: 2,
    },
    cancelButton: {
      paddingVertical: sizeConfig.cancelPaddingV,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelText: {
      fontSize: sizeConfig.cancelSize,
      fontWeight: '700',
      color: theme.primary,
      letterSpacing: 0.2,
    },
  });
};
