import { StyleSheet, Platform } from 'react-native';
import { RadiusPresetConfig } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';
import type { ControlContrast } from '../surfaceUtils';

export const createActionSheetStyles = (
  theme: ThemeColors,
  radius: RadiusPresetConfig,
  isDark: boolean,
  contrast: ControlContrast = 'normal',
  isGlass: boolean = false
) => {
  const isHigh = contrast === 'high';
  const isSubtle = contrast === 'subtle';

  let borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';
  let borderWidth = 1;
  if (isHigh) {
    borderWidth = 1.5;
    borderColor = isDark ? 'rgba(255, 255, 255, 0.32)' : 'rgba(0, 0, 0, 0.28)';
  } else if (isSubtle) {
    borderWidth = 0.5;
    borderColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)';
  } else if (isGlass) {
    borderColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.65)';
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
    contentBlock: {
      borderRadius: Math.max(12, Math.min(radius.card, 20)),
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
    actionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 18,
      paddingVertical: 14,
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
      width: 28,
      height: 28,
      borderRadius: 7,
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
      fontSize: 15.5,
      fontWeight: '600',
      color: theme.text,
    },
    actionLabelDestructive: {
      color: '#EF4444',
      fontWeight: '600',
    },
    actionDesc: {
      fontSize: 11.5,
      color: theme.textSecondary,
      marginTop: 2,
    },
    cancelBlock: {
      borderRadius: Math.max(12, Math.min(radius.card, 20)),
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
    cancelButton: {
      paddingVertical: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelText: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.primary,
    },
  });
};
