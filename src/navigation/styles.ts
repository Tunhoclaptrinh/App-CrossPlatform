import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants';
export const createTabStyles = (isDark: boolean) =>
  StyleSheet.create({
    bar: {
      backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
      borderTopColor: isDark
        ? Colors.dark.borderStrong
        : Colors.light.borderStrong,
    },
    label: {
      ...Typography.overline,
      textTransform: 'none',
      letterSpacing: 0,
      fontWeight: '600',
      paddingBottom: Spacing.xs,
    },
    item: { paddingTop: Spacing.xs },
  });
