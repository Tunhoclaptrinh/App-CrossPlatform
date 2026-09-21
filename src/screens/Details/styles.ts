import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';

export const createDetailsStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: Spacing.lg,
      paddingBottom: Spacing.xxl + 24,
    },
    // Main Overview Card
    card: {
      backgroundColor: colors.card,
      padding: Spacing.xl,
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
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
      backgroundColor: colors.primaryLight,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs - 1,
      borderRadius: BorderRadius.full,
      marginBottom: Spacing.md,
      alignSelf: 'flex-start',
    },
    badgeText: {
      color: colors.primary,
      fontWeight: '700',
      fontSize: 11,
      letterSpacing: 0.5,
    },
    title: {
      color: colors.text,
      marginBottom: Spacing.xs,
    },
    description: {
      color: colors.textSecondary,
      lineHeight: 22,
      marginBottom: Spacing.lg,
    },
    infoList: {
      backgroundColor: colors.surfaceSubtle,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      gap: Spacing.sm + 2,
      marginBottom: Spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    infoText: {
      color: colors.text,
      fontWeight: '500',
      fontSize: 13,
      flex: 1,
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.sm,
      marginBottom: Spacing.lg,
    },
    // Form controls box
    formControlsBox: {
      backgroundColor: colors.surfaceSubtle,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      gap: Spacing.md,
      marginBottom: Spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    // Sections
    skeletonSection: {
      marginTop: Spacing.xl,
    },
    sectionHeading: {
      color: colors.text,
      marginBottom: Spacing.sm + 2,
    },
    // Buttons grids & rows
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
      marginBottom: Spacing.md,
    },
    demoBox: {
      backgroundColor: colors.surfaceSubtle,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: Spacing.lg,
    },
    savedKeyText: {
      marginVertical: Spacing.xs,
      fontWeight: '600',
    },
    actions: {
      gap: Spacing.sm + 4,
      marginTop: Spacing.sm,
    },
    // Crypto & Security Box
    cryptoBox: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: BorderRadius.xl,
      padding: Spacing.lg,
      gap: Spacing.sm,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 1,
    },
    cryptoActionRow: {
      flexDirection: 'row',
      gap: Spacing.sm,
      marginVertical: Spacing.xs,
    },
    codeSnippet: {
      backgroundColor: colors.surfaceSubtle,
      padding: Spacing.md,
      borderRadius: BorderRadius.md,
      marginVertical: Spacing.xs,
      borderWidth: 1,
      borderColor: colors.border,
    },
    codeSnippetText: {
      fontFamily: 'monospace',
      fontSize: 12,
      lineHeight: 18,
    },
    // Widget Box
    widgetContent: {
      paddingVertical: Spacing.xs,
      gap: Spacing.md,
    },
    widgetStatusRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.surfaceSubtle,
      padding: Spacing.md,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    // Apple Glass Card Inner
    glassCardInner: {
      gap: Spacing.md,
    },
    glassFeatureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    glassFeatureText: {
      color: colors.text,
      fontWeight: '500',
    },
    themeStyleStatusRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    // Realtime WebSocket Styles
    realtimeCard: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: BorderRadius.xl,
      padding: Spacing.lg,
      gap: Spacing.md,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 1,
    },
    realtimeStatusHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    realtimeButtonsRow: {
      flexDirection: 'row',
      gap: Spacing.sm,
      marginTop: Spacing.xs,
    },
    realtimeEventBox: {
      backgroundColor: colors.surfaceSubtle,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      gap: Spacing.xs,
    },
    statusDotConnected: {
      backgroundColor: '#10B981',
      paddingHorizontal: Spacing.sm + 2,
      paddingVertical: 3,
      borderRadius: BorderRadius.full,
    },
    statusDotDisconnected: {
      backgroundColor: '#EF4444',
      paddingHorizontal: Spacing.sm + 2,
      paddingVertical: 3,
      borderRadius: BorderRadius.full,
    },
    statusDotConnecting: {
      backgroundColor: '#F59E0B',
      paddingHorizontal: Spacing.sm + 2,
      paddingVertical: 3,
      borderRadius: BorderRadius.full,
    },
    statusBadgeText: {
      color: '#FFFFFF',
      fontWeight: '700',
      fontSize: 11,
    },
    // Shake Detection Styles
    shakeContainer: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: BorderRadius.xl,
      padding: Spacing.lg,
      gap: Spacing.md,
      marginTop: Spacing.md,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 1,
    },
    shakeStatsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    shakeCountBadge: {
      backgroundColor: colors.primaryLight,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs - 1,
      borderRadius: BorderRadius.full,
    },
    shakeCountText: {
      color: colors.primary,
      fontWeight: '800',
      fontSize: 16,
    },
    shakeActionsRow: {
      flexDirection: 'row',
      gap: Spacing.sm,
      marginTop: Spacing.xs,
    },
    // Server-Compatible Crypto Styles
    serverCryptoBox: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: BorderRadius.xl,
      padding: Spacing.lg,
      gap: Spacing.md,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 1,
    },
  });