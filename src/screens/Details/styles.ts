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
  });