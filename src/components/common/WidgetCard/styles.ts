import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius, Shadows } from '@/constants/theme';

export const createWidgetCardStyles = (themeColors: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.card,
      borderRadius: BorderRadius.lg,
      borderWidth: 1,
      borderColor: themeColors.border,
      padding: Spacing.md,
      marginVertical: Spacing.sm,
      ...Shadows.sm,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.sm,
    },
    titleGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    iconWrapper: {
      marginRight: Spacing.sm,
    },
    titleText: {
      fontWeight: '700',
    },
    badgeWrapper: {
      marginLeft: Spacing.xs,
    },
    contentArea: {
      marginTop: Spacing.xs,
    },
    subtitleText: {
      marginTop: Spacing.xxs,
    },
  });
