import { StyleSheet } from 'react-native';
import { Spacing } from '@/constants';
import type { ThemeColors } from '@/constants';

export const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    content: {
      padding: Spacing.lg,
      paddingBottom: Spacing.xxl,
      gap: Spacing.xl,
    },
    footer: {
      padding: Spacing.base,
      gap: Spacing.sm,
      backgroundColor: theme.card,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.border,
    },
  });
