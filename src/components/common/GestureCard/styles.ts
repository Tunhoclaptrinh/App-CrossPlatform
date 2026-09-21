import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius, Shadows } from '@/constants/theme';

export const createGestureCardStyles = (themeColors: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.card,
      borderRadius: BorderRadius.lg,
      borderWidth: 1.5,
      borderColor: themeColors.primary,
      padding: Spacing.md,
      marginVertical: Spacing.sm,
      ...Shadows.md,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.xs,
    },
    iconWrapper: {
      marginRight: Spacing.sm,
    },
    title: {
      fontWeight: '700',
    },
    description: {
      marginBottom: Spacing.sm,
    },
    gestureHints: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: themeColors.surface,
      borderRadius: BorderRadius.md,
      padding: Spacing.xs,
    },
    hintBadge: {
      paddingHorizontal: Spacing.xs,
    },
  });
