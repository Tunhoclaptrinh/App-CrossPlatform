import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants';
export const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    screen: {
      backgroundColor: isDark
        ? Colors.dark.background
        : Colors.light.background,
    },
    header: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.base,
      paddingBottom: Spacing.lg,
      gap: Spacing.xs,
    },
    top: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: Spacing.md,
    },
    titles: { flex: 1, gap: Spacing.xs },
    title: { ...Typography.h1 },
    back: { alignSelf: 'flex-start', marginBottom: Spacing.sm },
    body: { flex: 1 },
    content: {
      paddingHorizontal: Spacing.xl,
      paddingBottom: Spacing.xxl,
      gap: Spacing.base,
    },
    headerSubtitle: { ...Typography.body2 },
  });
