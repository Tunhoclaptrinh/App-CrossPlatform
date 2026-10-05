import { StyleSheet } from 'react-native';
import { Spacing, RadiusPresets, RadiusPresetConfig, ControlSize } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';

export const createHomeStyles = (
  colors: ThemeColors,
  radius: RadiusPresetConfig = RadiusPresets.standard,
  isDark: boolean = false
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.md,
      paddingBottom: Spacing.xxl + 24,
    },

    // 1. Top Navigation Bar (Header)
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.md + 4,
      paddingVertical: Spacing.xs,
    },
    brandGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      flexShrink: 1,
    },
    brandLogoBox: {
      width: 38,
      height: 38,
      borderRadius: Math.min(radius.smControl, 19),
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 3,
    },
    brandTextGroup: {
      justifyContent: 'center',
    },
    brandTitleText: {
      fontSize: 16.5,
      lineHeight: 22,
      fontWeight: '800',
      color: colors.text,
      letterSpacing: -0.3,
    },
    brandSubtitleBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 1,
    },
    brandLiveDot: {
      width: 5,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: '#10B981',
    },
    brandSubtitleText: {
      fontSize: 10,
      fontWeight: '700',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    topControlCapsule: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surfaceSubtle,
      borderRadius: radius.control,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 3,
      paddingVertical: 2,
      height: 36,
    },
    capsuleBtn: {
      width: 30,
      height: 30,
      borderRadius: Math.min(radius.smControl, 15),
      alignItems: 'center',
      justifyContent: 'center',
    },
    capsuleBtnActive: {
      backgroundColor: colors.primaryLight,
    },
    capsuleDivider: {
      width: 1,
      height: 14,
      backgroundColor: colors.border,
      marginHorizontal: 1,
    },
    flagEmojiText: {
      fontSize: 15,
    },
    actionCircleBtn: {
      // Standardized icon button: 36×36, clamp smControl → circle-safe in smooth mode
      width: ControlSize.iconBtnSm,
      height: ControlSize.iconBtnSm,
      borderRadius: Math.min(radius.smControl, ControlSize.iconBtnSm / 2),
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    actionCircleBtnActive: {
      backgroundColor: colors.primaryLight,
      borderColor: colors.primary,
    },

    // 2. Metric / Global State Card (Refined Apple Stepper)
    metricCard: {
      backgroundColor: colors.card,
      borderRadius: radius.card,
      borderWidth: 1,
      borderColor: colors.border,
      padding: Spacing.md + 4,
      marginBottom: Spacing.lg,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.04,
      shadowRadius: 10,
      elevation: 2,
    },
    metricCardGlass: {
      backgroundColor: isDark ? 'rgba(30, 34, 48, 0.65)' : 'rgba(255, 255, 255, 0.60)',
      borderRadius: Math.min(radius.card, 16),
      borderWidth: 1.2,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.75)',
      padding: Spacing.md + 4,
      marginBottom: Spacing.lg,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: isDark ? 0.35 : 0.08,
      shadowRadius: 16,
      elevation: 0,
      position: 'relative',
      overflow: 'hidden',
    },
    metricHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.sm,
    },
    metricLabelGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    metricPulseDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#10B981',
    },
    metricEyebrow: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.textSecondary,
      letterSpacing: 0.6,
      textTransform: 'uppercase',
    },
    metricSyncBadge: {
      backgroundColor: colors.surfaceSubtle,
      paddingHorizontal: 8,
      // Fixed height badge for visual parity with other badges
      height: 24,
      justifyContent: 'center',
      borderRadius: radius.badge,
      borderWidth: 1,
      borderColor: colors.border,
    },
    metricSyncBadgeText: {
      fontSize: 10,
      fontWeight: '700',
      color: '#10B981',
      letterSpacing: 0.5,
    },
    metricBodyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    metricValueBlock: {
      gap: 2,
    },
    metricValueSubtitle: {
      fontSize: 11.5,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    metricBigValue: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: '800',
      color: colors.primary,
      fontVariant: ['tabular-nums'],
      letterSpacing: -0.5,
      paddingVertical: 2,
    },
    stepperBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surfaceSubtle,
      // Stepper container: card-level radius capped at 16px
      borderRadius: Math.min(radius.card, 16),
      borderWidth: 1,
      borderColor: colors.border,
      padding: 3,
      gap: 4,
    },
    stepperBtn: {
      width: 36,
      height: 36,
      borderRadius: radius.smControl,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 2,
      elevation: 1,
    },
    stepperBtnPrimary: {
      backgroundColor: colors.primary,
    },

    // 3. Category Filter Tabs
    filterScroll: {
      flexGrow: 0,
      height: 44,
      marginBottom: Spacing.md,
      marginHorizontal: -Spacing.lg,
    },
    filterScrollContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: Spacing.lg,
    },
    filterPill: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 14,
      height: 36,
      borderRadius: radius.control,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 6,
    },
    filterPillActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 3,
    },
    filterPillText: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    filterPillTextActive: {
      color: '#FFFFFF',
    },

    // 4. Search Bar
    searchContainer: {
      marginBottom: Spacing.md,
    },

    // 5. Section Header
    sectionHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.sm + 2,
      marginTop: Spacing.xs,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      letterSpacing: -0.2,
    },
    moduleCountBadge: {
      backgroundColor: colors.surfaceSubtle,
      paddingHorizontal: 8,
      // Fixed height badge — matches metricSyncBadge
      height: 24,
      justifyContent: 'center',
      borderRadius: radius.badge,
      borderWidth: 1,
      borderColor: colors.border,
    },
    moduleCountText: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.textSecondary,
    },

    // 6. Modules List
    grid: {
      gap: Spacing.sm + 2,
      marginBottom: Spacing.lg,
    },
    itemCard: {
      backgroundColor: colors.card,
      borderRadius: radius.card,
      borderWidth: 1,
      borderColor: colors.border,
      padding: Spacing.md + 2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.03,
      shadowRadius: 6,
      elevation: 1,
    },
    itemCardGlass: {
      backgroundColor: isDark ? 'rgba(30, 34, 48, 0.65)' : 'rgba(255, 255, 255, 0.60)',
      borderRadius: Math.min(radius.card, 16),
      borderWidth: 1.2,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.75)',
      padding: Spacing.md + 2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: isDark ? 0.35 : 0.06,
      shadowRadius: 14,
      elevation: 0,
      position: 'relative',
      overflow: 'hidden',
    },
    itemGlassHighlight: {
      position: 'absolute',
      top: 0,
      left: 12,
      right: 12,
      height: 1.2,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(255, 255, 255, 0.95)',
      borderRadius: 1,
    },
    itemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
      flex: 1,
      paddingRight: Spacing.sm,
    },
    iconWrapper: {
      width: ControlSize.iconBtnMd,
      height: ControlSize.iconBtnMd,
      // 44×44 icon: clamp smControl to radius/2 to stay circle-safe in smooth mode
      borderRadius: Math.min(radius.smControl, ControlSize.iconBtnMd / 2),
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemTexts: {
      flex: 1,
      gap: 3,
    },
    itemTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      flexWrap: 'wrap',
    },
    itemTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text,
      letterSpacing: -0.2,
    },
    itemTagBadge: {
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: radius.badge,
      backgroundColor: colors.surfaceSubtle,
      borderWidth: 1,
      borderColor: colors.border,
    },
    itemTagBadgeGlass: {
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.50)',
      borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.70)',
    },
    itemTagText: {
      fontSize: 10,
      fontWeight: '700',
      color: colors.textSecondary,
      textTransform: 'uppercase',
    },
    itemDesc: {
      fontSize: 12.5,
      lineHeight: 18,
      color: colors.textSecondary,
    },
    chevronWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: Spacing.xs,
    },
  });

export const getIconWrapperStyle = (hexColor: string) => ({
  backgroundColor: `${hexColor}18`, // 10% opacity tint
});