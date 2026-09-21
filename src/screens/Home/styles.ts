import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius } from '@/constants/theme';

export const createHomeStyles = (colors: {
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
    headerCard: {
      backgroundColor: colors.card,
      padding: Spacing.xl,
      borderRadius: BorderRadius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: Spacing.lg,
      alignItems: 'center',
    },
    badge: {
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
      textAlign: 'center',
      marginBottom: Spacing.xs,
    },
    subtitle: {
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: Spacing.lg,
    },
    counterButton: {
      minWidth: 190,
    },
    grid: {
      gap: Spacing.md,
      marginBottom: Spacing.xl,
    },
    card: {
      backgroundColor: colors.card,
      padding: Spacing.md,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitle: {
      color: colors.text,
      marginBottom: Spacing.xs,
    },
    cardDesc: {
      color: colors.textSecondary,
    },
  });
