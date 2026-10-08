import { StyleSheet } from 'react-native';
import { Spacing } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

export const createDetailsStyles = (
  _colors: ThemeColors,
  _radius: RadiusPresetConfig,
  _isDark: boolean
) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.sm,
      paddingBottom: Spacing.xl + 8,
    },
    footerRow: {
      marginTop: Spacing.sm,
      marginBottom: Spacing.lg,
      alignItems: 'center',
    },
    floatingHeader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
    },
    customBulkHeaderRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.md,
    },
    customBulkHeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    customBulkBadge: {
      backgroundColor: _colors.primary,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 12,
    },
    customBulkBadgeText: {
      color: '#FFFFFF',
      fontSize: 11.5,
      fontWeight: '700',
    },
    customBulkTitle: {
      fontSize: 14.5,
      fontWeight: '600',
      letterSpacing: -0.2,
    },
    customBulkRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    customBulkActionBtn: {
      backgroundColor: _colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 14,
    },
    customBulkShareText: {
      color: '#FFFFFF',
      fontSize: 12.5,
      fontWeight: '600',
    },
    customBulkCancelBtn: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 14,
      backgroundColor: _isDark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(0, 0, 0, 0.06)',
    },
    customBulkCancelText: {
      fontSize: 12.5,
      fontWeight: '600',
    },
  });