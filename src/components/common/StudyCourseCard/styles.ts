import { StyleSheet } from 'react-native';
import { BorderRadius, Spacing, Typography } from '@/constants';
import type { ThemeColors } from '@/constants/colors';
export const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
    icon: {
      padding: Spacing.md,
      borderRadius: BorderRadius.md,
      backgroundColor: theme.surfaceSubtle,
    },
    body: { flex: 1, gap: Spacing.xs },
    code: { ...Typography.overline, color: theme.primary },
    title: { ...Typography.subtitle },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: Spacing.sm,
      marginTop: Spacing.md,
    },
    card: { marginBottom: Spacing.md },
  });
