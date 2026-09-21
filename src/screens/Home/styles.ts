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
      paddingBottom: Spacing.xxl,
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
    headerTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
    },
    headerControls: {
      flexDirection: 'row',
      gap: Spacing.sm,
      alignItems: 'center',
    },
    langChip: {
      marginBottom: 12,
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
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
      marginBottom: Spacing.md,
    },
    sectionTitle: {
      color: colors.text,
      marginBottom: Spacing.md,
      marginTop: Spacing.sm,
    },
    grid: {
      gap: Spacing.md,
      marginBottom: Spacing.lg,
    },
    itemCard: {
      backgroundColor: colors.card,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: colors.border,
      padding: Spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
      flex: 1,
    },
    iconWrapper: {
      width: 44,
      height: 44,
      borderRadius: BorderRadius.sm,
      backgroundColor: colors.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemTexts: {
      flex: 1,
    },
    itemTitle: {
      color: colors.text,
      marginBottom: 2,
    },
    itemDesc: {
      color: colors.textSecondary,
    },
    searchContainer: {
      marginBottom: Spacing.md,
    },
    storeBox: {
      backgroundColor: colors.card,
      padding: Spacing.md,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: Spacing.lg,
      alignItems: 'center',
      gap: Spacing.sm,
    },
  });