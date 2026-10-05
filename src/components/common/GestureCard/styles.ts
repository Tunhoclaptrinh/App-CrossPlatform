import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/theme';

export const createGestureCardStyles = (themeColors: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.card,
      borderRadius: BorderRadius.lg,
      borderWidth: 1,
      borderColor: themeColors.border,
      padding: Spacing.lg,
      marginVertical: Spacing.sm,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.xs,
    },
    iconWrapper: {
      marginRight: Spacing.sm,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: themeColors.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontWeight: '700',
      color: themeColors.text,
    },
    description: {
      marginBottom: Spacing.md,
      lineHeight: 20,
    },
    gestureHints: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: themeColors.surfaceSubtle,
      borderRadius: BorderRadius.md,
      padding: Spacing.xs + 2,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    hintBadge: {
      paddingHorizontal: Spacing.sm,
      paddingVertical: 4,
      fontWeight: '600',
      fontSize: 12,
    },
  });
