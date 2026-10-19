import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius, Typography } from '@/constants';
import type { ThemeColors } from '@/constants/colors';
export const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    card: { marginBottom: Spacing.md },
    row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
    time: {
      borderLeftWidth: Spacing.xs,
      borderColor: theme.primary,
      paddingLeft: Spacing.md,
      gap: Spacing.xs,
      borderRadius: BorderRadius.xs,
    },
    start: { ...Typography.subtitle, color: theme.primary },
    body: { flex: 1, gap: Spacing.xs },
    meta: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: Spacing.sm,
      marginTop: Spacing.sm,
    },
  });
