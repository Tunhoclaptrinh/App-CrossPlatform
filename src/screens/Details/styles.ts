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
  });