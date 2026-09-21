import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius } from '@/constants/theme';

export const createDetailsStyles = (colors: {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  primaryLight: string;
}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: Spacing.lg,
    },
    card: {
      backgroundColor: colors.card,
      padding: Spacing.xl,
      borderRadius: BorderRadius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: Spacing.lg,
    },
    badge: {
      alignSelf: 'flex-start',
      backgroundColor: colors.primaryLight,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.full,
      marginBottom: Spacing.md,
    },
    badgeText: {
      color: colors.primary,
      fontWeight: '600',
    },
    title: {
      color: colors.text,
      marginBottom: Spacing.sm,
    },
    description: {
      color: colors.textSecondary,
      lineHeight: 22,
      marginBottom: Spacing.lg,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
      marginBottom: Spacing.md,
    },
    infoText: {
      color: colors.text,
      fontWeight: '500',
    },
    chipRow: {
      flexDirection: 'row',
      gap: Spacing.sm,
      marginVertical: Spacing.md,
    },
    demoBox: {
      marginVertical: Spacing.md,
    },
    formControlsBox: {
      marginVertical: Spacing.md,
      gap: Spacing.sm,
    },
    hapticRow: {
      flexDirection: 'row',
      gap: Spacing.sm,
      marginTop: Spacing.xs,
      marginBottom: Spacing.md,
    },
    hapticBtn: {
      flex: 1,
    },
    fileBtnRow: {
      flexDirection: 'row',
      gap: Spacing.sm,
      marginTop: Spacing.xs,
    },
    savedKeyText: {
      marginBottom: Spacing.sm,
    },
    actions: {
      gap: Spacing.md,
      marginTop: Spacing.md,
    },
    skeletonSection: {
      marginTop: Spacing.lg,
    },
    sectionHeading: {
      color: colors.text,
      marginBottom: Spacing.sm,
    },
    cryptoBox: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      marginVertical: Spacing.sm,
    },
    cryptoActionRow: {
      flexDirection: 'row',
      gap: Spacing.sm,
      marginVertical: Spacing.xs,
    },
    codeSnippet: {
      backgroundColor: colors.background,
      padding: Spacing.sm,
      borderRadius: BorderRadius.sm,
      marginVertical: Spacing.xs,
      borderWidth: 1,
      borderColor: colors.border,
    },
    gestureResult: {
      textAlign: 'center',
      marginTop: Spacing.xs,
      fontWeight: '600',
    },
    widgetContent: {
      paddingVertical: Spacing.xs,
    },
    widgetStatusRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: Spacing.xs,
    },
  });