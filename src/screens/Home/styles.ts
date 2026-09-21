import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';

export const createHomeStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: Spacing.lg,
      paddingBottom: Spacing.xxl + 16,
    },
    // Header Hero Card
    headerCard: {
      backgroundColor: colors.card,
      padding: Spacing.lg,
      borderRadius: BorderRadius.xl,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: Spacing.lg,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
    },
    headerTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.md,
      width: '100%',
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
      backgroundColor: colors.primaryLight,
      paddingHorizontal: Spacing.sm + 4,
      paddingVertical: Spacing.xs - 1,
      borderRadius: BorderRadius.full,
    },
    badgeText: {
      color: colors.primary,
      fontWeight: '700',
      fontSize: 11,
      letterSpacing: 0.5,
    },
    langPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: colors.surfaceSubtle,
      paddingHorizontal: Spacing.sm + 4,
      paddingVertical: Spacing.xs - 1,
      borderRadius: BorderRadius.full,
      borderWidth: 1,
      borderColor: colors.border,
    },
    langPillText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.text,
    },
    // Floating segmented control for theme style & mode
    headerSegmentsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surfaceSubtle,
      padding: 4,
      borderRadius: BorderRadius.pill,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: Spacing.lg,
      gap: 4,
    },
    segmentBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 7,
      paddingHorizontal: 8,
      borderRadius: BorderRadius.pill,
      gap: 6,
    },
    segmentBtnActive: {
      backgroundColor: colors.card,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    segmentText: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.textSecondary,
    },
    segmentTextActive: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.primary,
    },
    themeToggleBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 7,
      paddingHorizontal: 12,
      borderRadius: BorderRadius.pill,
      gap: 5,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    themeToggleText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.text,
    },
    // Typography
    title: {
      color: colors.text,
      textAlign: 'center',
      marginBottom: Spacing.xs,
    },
    subtitle: {
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
      paddingHorizontal: Spacing.sm,
    },
    // Double-Bezel Counter Card (Machined luxury look)
    counterOuterShell: {
      backgroundColor: colors.surfaceSubtle,
      borderRadius: BorderRadius.xl,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 6,
      marginBottom: Spacing.lg,
    },
    counterInnerCore: {
      backgroundColor: colors.card,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md + 2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    counterInfo: {
      flex: 1,
    },
    counterEyebrow: {
      fontSize: 11,
      fontWeight: '600',
      letterSpacing: 0.4,
      color: colors.textSecondary,
      marginBottom: 2,
      textTransform: 'uppercase',
    },
    counterValueRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: 6,
    },
    counterValue: {
      fontSize: 28,
      fontWeight: '800',
      color: colors.primary,
      fontVariant: ['tabular-nums'],
    },
    counterValueSub: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    counterBtn: {
      paddingHorizontal: Spacing.md + 4,
    },
    // Search
    searchContainer: {
      marginBottom: Spacing.md,
    },
    // Section Title
    sectionHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.md,
      marginTop: Spacing.xs,
    },
    sectionTitle: {
      color: colors.text,
    },
    moduleCountBadge: {
      backgroundColor: colors.surfaceSubtle,
      paddingHorizontal: Spacing.sm,
      paddingVertical: 2,
      borderRadius: BorderRadius.pill,
      borderWidth: 1,
      borderColor: colors.border,
    },
    moduleCountText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    // Module Grid / List
    grid: {
      gap: Spacing.sm + 2,
      marginBottom: Spacing.lg,
    },
    itemCard: {
      backgroundColor: colors.card,
      borderRadius: BorderRadius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      padding: Spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 1,
    },
    itemCardGlass: {
      backgroundColor: colors.card,
      borderRadius: BorderRadius.xl,
      borderWidth: 1.2,
      borderColor: colors.border,
      padding: Spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 3,
    },
    itemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
      flex: 1,
    },
    iconWrapper: {
      width: 46,
      height: 46,
      borderRadius: BorderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemTexts: {
      flex: 1,
    },
    itemTitle: {
      color: colors.text,
      fontWeight: '600',
      marginBottom: 3,
    },
    itemDesc: {
      color: colors.textSecondary,
      fontSize: 12,
      lineHeight: 16,
    },
    chevronWrapper: {
      width: 28,
      height: 28,
      borderRadius: BorderRadius.full,
      backgroundColor: colors.surfaceSubtle,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: Spacing.xs,
    },
  });

export const getIconWrapperStyle = (color: string) => ({
  backgroundColor: color + '18',
});