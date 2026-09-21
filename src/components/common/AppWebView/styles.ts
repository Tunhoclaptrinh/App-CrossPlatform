import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius, Shadows } from '@/constants/theme';

export const createAppWebViewStyles = (themeColors: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.card,
      borderRadius: BorderRadius.lg,
      borderWidth: 1,
      borderColor: themeColors.border,
      overflow: 'hidden',
      marginVertical: Spacing.sm,
      ...Shadows.sm,
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      backgroundColor: themeColors.surface,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border,
    },
    urlContainer: {
      flex: 1,
      marginHorizontal: Spacing.sm,
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xxs,
      backgroundColor: themeColors.card,
      borderRadius: BorderRadius.sm,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    urlText: {
      fontSize: 12,
    },
    contentArea: {
      padding: Spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontWeight: '600',
      marginBottom: Spacing.xs,
    },
    description: {
      textAlign: 'center',
      marginBottom: Spacing.md,
    },
    actions: {
      flexDirection: 'row',
      gap: Spacing.sm,
    },
  });
