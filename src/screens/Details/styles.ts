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
    // Apple Liquid Glass Styles
    glassPreviewContainer: {
      marginVertical: Spacing.sm,
      gap: Spacing.md,
    },
    glassCardInner: {
      gap: Spacing.sm,
    },
    glassFeatureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
      marginVertical: Spacing.xxs,
    },
    glassFeatureText: {
      color: colors.text,
      fontWeight: '500',
    },
    themeStyleStatusRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: Spacing.xs,
      paddingTop: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    // Realtime WebSocket Styles
    realtimeCard: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      gap: Spacing.md,
    },
    realtimeStatusHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    realtimeButtonsRow: {
      flexDirection: 'row',
      gap: Spacing.sm,
    },
    realtimeEventBox: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      gap: Spacing.xs,
    },
    statusDotConnected: {
      backgroundColor: '#10B981',
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xxs,
      borderRadius: BorderRadius.full,
    },
    statusDotDisconnected: {
      backgroundColor: '#EF4444',
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xxs,
      borderRadius: BorderRadius.full,
    },
    statusDotConnecting: {
      backgroundColor: '#F59E0B',
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xxs,
      borderRadius: BorderRadius.full,
    },
    statusBadgeText: {
      color: '#FFFFFF',
      fontWeight: '600',
    },
    // Shake Detection Styles
    shakeContainer: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      gap: Spacing.md,
      marginTop: Spacing.md,
    },
    shakeStatsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: Spacing.xs,
    },
    shakeCountBadge: {
      backgroundColor: colors.primaryLight,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.full,
    },
    shakeCountText: {
      color: colors.primary,
      fontWeight: '700',
    },
    shakeActionsRow: {
      flexDirection: 'row',
      gap: Spacing.sm,
    },
    // Server-Compatible Crypto Styles
    serverCryptoBox: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      gap: Spacing.md,
    },
  });