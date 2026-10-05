import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius, Typography } from '@/constants';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

export const createWeatherStyles = (
  themeColors: ThemeColors,
  isDark: boolean,
  radiusTokens?: RadiusPresetConfig,
) => {
  const cardRadius = radiusTokens?.card ?? 18;
  const smControlRadius = radiusTokens?.smControl ?? 12;
  const controlRadius = radiusTokens?.control ?? BorderRadius.pill;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    scrollContent: {
      paddingHorizontal: Spacing.md,
      paddingBottom: Spacing.huge,
      paddingTop: Spacing.xs,
    },

    // 1. Thanh điều khiển trên cùng mờ kính (Translucent Glass Top Bar)
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Spacing.xs,
      marginBottom: Spacing.xs,
    },
    locationHeaderBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginRight: Spacing.xs,
      paddingVertical: 5,
      paddingHorizontal: Spacing.sm,
      borderRadius: controlRadius,
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.28)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.45)',
      height: 38,
    },
    locationPinIconWrap: {
      width: 26,
      height: 26,
      borderRadius: BorderRadius.full,
      backgroundColor: isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.15)',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 6,
    },
    locationTextCol: {
      flex: 1,
    },
    locationCityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    locationCityName: {
      fontSize: 13,
      fontWeight: '700',
      color: '#FFFFFF',
      textShadowColor: 'rgba(0, 0, 0, 0.35)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 3,
      lineHeight: 16,
    },
    locationCountryName: {
      fontSize: 10,
      color: 'rgba(255, 255, 255, 0.85)',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
      lineHeight: 12,
    },
    locationSearchBadge: {
      width: 24,
      height: 24,
      borderRadius: BorderRadius.full,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.3)',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: Spacing.xxs,
    },
    topControlCapsule: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.28)',
      borderRadius: controlRadius,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.45)',
      paddingHorizontal: 2,
      paddingVertical: 2,
      height: 38,
    },
    capsuleBtn: {
      width: 32,
      height: 32,
      borderRadius: Math.min(smControlRadius, 16),
      alignItems: 'center',
      justifyContent: 'center',
    },
    capsuleBtnActive: {
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)',
    },
    capsuleDivider: {
      width: 1,
      height: 14,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
      marginHorizontal: 1,
    },
    capsulePillText: {
      fontSize: 11,
      fontWeight: '700',
      color: '#FFFFFF',
      fontVariant: ['tabular-nums'],
    },

    // 2. Hero Không Viền Nổi Tự Do (Cardless Floating Hero)
    floatingHeroContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 2,
      marginBottom: Spacing.xs,
    },
    heroBadgeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 2,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.sm + 2,
      paddingVertical: 3,
      borderRadius: BorderRadius.pill,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.35)',
      gap: Spacing.xs,
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.25)',
    },
    statusBadgeText: {
      fontSize: 11,
      fontWeight: '700',
      color: '#FFFFFF',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    heroCenterBlock: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 0,
    },
    heroIconBox: {
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 0,
    },
    floatingBigTempText: {
      fontSize: 66,
      fontWeight: '700',
      color: '#FFFFFF',
      lineHeight: 72,
      fontVariant: ['tabular-nums'],
      textShadowColor: 'rgba(0, 0, 0, 0.4)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 6,
    },
    floatingConditionText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
      marginTop: 1,
      textShadowColor: 'rgba(0, 0, 0, 0.4)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 4,
    },
    floatingHighLowRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginTop: 4,
    },
    floatingHighLowText: {
      fontSize: Typography.caption.fontSize,
      fontWeight: '600',
      color: '#FFFFFF',
      fontVariant: ['tabular-nums'],
      textShadowColor: 'rgba(0, 0, 0, 0.4)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 3,
    },
    highLowDotDivider: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    floatingFeelsLikeCol: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    floatingFeelsLikeText: {
      fontSize: Typography.caption.fontSize,
      color: '#FFFFFF',
      fontWeight: '600',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },

    // 4. Khối Kính Mờ Trong Suốt Chung (Translucent Frosted Glass Card)
    sectionCard: {
      borderRadius: cardRadius,
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.38)' : 'rgba(255, 255, 255, 0.22)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.38)',
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      marginBottom: Spacing.md,
      overflow: 'hidden',
      position: 'relative',
    },
    sectionGlassHighlight: {
      position: 'absolute',
      top: 0,
      left: 16,
      right: 16,
      height: 1,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.45)',
      borderRadius: 1,
    },
    sectionHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.xs,
      gap: Spacing.xs,
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: '700',
      color: 'rgba(255, 255, 255, 0.85)',
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },

    // 5. Khối Dự Báo Theo Giờ (Hourly Forecast)
    hourlyScroll: {
      marginHorizontal: -Spacing.md,
      paddingHorizontal: Spacing.md,
    },
    hourlyScrollContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingVertical: 2,
    },
    hourlyItem: {
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Spacing.xs,
      paddingHorizontal: 2,
      borderRadius: BorderRadius.lg,
      width: 58,
      height: 104,
    },
    hourlyItemActive: {
      backgroundColor: isDark ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.28)',
      borderRadius: BorderRadius.lg,
    },
    hourlyTimeText: {
      fontSize: 11,
      fontWeight: '600',
      color: 'rgba(255, 255, 255, 0.9)',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    hourlyIconBox: {
      width: 28,
      height: 28,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 2,
    },
    hourlyRainText: {
      fontSize: 10,
      fontWeight: '700',
      color: '#38BDF8',
      height: 14,
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    hourlyTempText: {
      fontSize: 15,
      fontWeight: '700',
      color: '#FFFFFF',
      fontVariant: ['tabular-nums'],
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },

    // 6. Khối Dự Báo 7 Ngày Tới (Daily Forecast)
    dailyList: {
      gap: 2,
    },
    dailyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Spacing.xs,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    },
    dailyDayCol: {
      width: 88,
    },
    dailyDayName: {
      fontSize: 13,
      fontWeight: '600',
      color: '#FFFFFF',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    dailyIconCol: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
      width: 68,
    },
    dailyRainBadgeText: {
      fontSize: 11,
      fontWeight: '700',
      color: '#38BDF8',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    dailyTempRangeCol: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: Spacing.xs,
    },
    dailyMinTempText: {
      fontSize: 13,
      fontWeight: '500',
      color: 'rgba(255, 255, 255, 0.7)',
      width: 32,
      textAlign: 'right',
      fontVariant: ['tabular-nums'],
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    dailyTempBarTrack: {
      width: 68,
      height: 5,
      borderRadius: BorderRadius.pill,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      overflow: 'hidden',
    },
    dailyTempBarFill: {
      height: '100%',
      borderRadius: BorderRadius.pill,
      backgroundColor: '#F59E0B',
    },
    dailyMaxTempText: {
      fontSize: 13,
      fontWeight: '700',
      color: '#FFFFFF',
      width: 32,
      textAlign: 'right',
      fontVariant: ['tabular-nums'],
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },

    // 7. Thống Nhất Chi Tiết Khí Quyển (Unified Atmospheric Metrics Card)
    unifiedMetricsGrid: {
      marginTop: 2,
    },
    unifiedMetricRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: Spacing.xs,
    },
    unifiedMetricCell: {
      flex: 1,
      paddingHorizontal: Spacing.xs,
    },
    unifiedMetricColDivider: {
      width: 1,
      height: 48,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.25)',
      marginHorizontal: Spacing.xs,
    },
    unifiedMetricRowDivider: {
      height: 1,
      width: '100%',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.25)',
    },
    uvRowWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
    },

    // Legacy Bento Grid (nếu cần tương thích ngược)
    metricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      rowGap: Spacing.xs,
      marginBottom: Spacing.md,
    },
    metricTile: {
      width: '48.5%',
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.22)',
      borderRadius: cardRadius,
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs + 2,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.38)',
      overflow: 'hidden',
      position: 'relative',
    },
    metricGlassHighlight: {
      position: 'absolute',
      top: 0,
      left: 12,
      right: 12,
      height: 1,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.5)',
      borderRadius: 1,
    },
    metricTileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginBottom: 2,
    },
    metricIconBox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    metricLabel: {
      fontSize: 11,
      lineHeight: 14,
      color: 'rgba(255, 255, 255, 0.85)',
      fontWeight: '600',
      flex: 1,
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    metricValue: {
      fontSize: 17,
      fontWeight: '700',
      color: '#FFFFFF',
      fontVariant: ['tabular-nums'],
      textShadowColor: 'rgba(0, 0, 0, 0.35)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 3,
    },
    metricSubtitle: {
      fontSize: 10,
      color: 'rgba(255, 255, 255, 0.75)',
      marginTop: 2,
      fontWeight: '500',
    },
    metricBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 6,
      paddingVertical: 1,
      borderRadius: BorderRadius.pill,
      marginTop: 4,
    },
    metricBadgeText: {
      fontSize: 9,
      fontWeight: '700',
    },

    // 8. Modal Tìm Kiếm Thành Phố (City Search Modal)
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: isDark ? '#111827' : '#FFFFFF',
      borderTopLeftRadius: BorderRadius.xxl,
      borderTopRightRadius: BorderRadius.xxl,
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.md,
      paddingBottom: Spacing.xxl,
      maxHeight: '85%',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
    },
    modalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.md,
    },
    modalTitle: {
      fontSize: Typography.title.fontSize,
      fontWeight: '700',
      color: themeColors.text,
    },
    modalCloseBtn: {
      padding: Spacing.xs,
    },
    searchBarWrap: {
      marginBottom: Spacing.md,
    },
    popularSection: {
      marginBottom: Spacing.md,
    },
    popularSectionTitle: {
      fontSize: Typography.caption.fontSize,
      fontWeight: '700',
      color: themeColors.textSecondary,
      textTransform: 'uppercase',
      marginBottom: Spacing.xs,
    },
    popularChipsWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.xs,
    },
    gpsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.pill,
      backgroundColor: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(14, 165, 233, 0.12)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(14, 165, 233, 0.3)',
      marginBottom: Spacing.sm,
      alignSelf: 'flex-start',
    },
    gpsButtonText: {
      fontSize: 12,
      fontWeight: '700',
      color: isDark ? '#38BDF8' : '#0284C7',
    },
    popularChip: {
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.pill,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
    },
    popularChipText: {
      fontSize: Typography.caption.fontSize,
      fontWeight: '600',
      color: themeColors.text,
    },
    resultsList: {
      maxHeight: 280,
    },
    resultItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
    },
    resultPinIcon: {
      marginRight: Spacing.sm,
    },
    resultTextCol: {
      flex: 1,
    },
    resultCityName: {
      fontSize: Typography.body.fontSize,
      fontWeight: '600',
      color: themeColors.text,
    },
    resultCountryName: {
      fontSize: Typography.caption.fontSize,
      color: themeColors.textSecondary,
      marginTop: 2,
    },
    emptyResultBox: {
      paddingVertical: Spacing.xl,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyResultText: {
      fontSize: Typography.body.fontSize,
      color: themeColors.textSecondary,
      textAlign: 'center',
    },

    // 9. Loading & Error States
    stateContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: Spacing.xl,
      minHeight: 300,
    },
    stateTitle: {
      fontSize: Typography.title.fontSize,
      fontWeight: '700',
      color: themeColors.text,
      marginTop: Spacing.md,
      textAlign: 'center',
    },
    stateSubtitle: {
      fontSize: Typography.body.fontSize,
      color: isDark ? 'rgba(255, 255, 255, 0.7)' : themeColors.textSecondary,
      marginTop: Spacing.xs,
      textAlign: 'center',
      marginBottom: Spacing.lg,
    },
    animatedContainer: {
      width: '100%',
    },

    // 10. Modal Chi Tiết Thời Tiết (Weather Detail Modal)
    detailModalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      justifyContent: 'flex-end',
    },
    detailModalContent: {
      backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
      borderTopLeftRadius: BorderRadius.xxl,
      borderTopRightRadius: BorderRadius.xxl,
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.md,
      paddingBottom: Spacing.xl,
      maxHeight: '90%',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
    },
    detailModalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.sm,
    },
    detailModalTitleRow: {
      flex: 1,
    },
    detailModalTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: themeColors.text,
    },
    detailModalSubtitle: {
      fontSize: 12,
      color: themeColors.textSecondary,
      marginTop: 2,
    },
    detailHeroCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.md,
      borderRadius: BorderRadius.xl,
      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(241, 245, 249, 0.9)',
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
    },
    detailHeroIconWrap: {
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: Spacing.md,
    },
    detailHeroInfo: {
      flex: 1,
    },
    detailHeroTemp: {
      fontSize: 32,
      fontWeight: '800',
      color: themeColors.text,
      lineHeight: 36,
    },
    detailHeroCondition: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.primary,
      marginTop: 2,
    },
    detailHeroSub: {
      fontSize: 11,
      color: themeColors.textSecondary,
      marginTop: 2,
    },
    detailMetricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.xs,
      marginBottom: Spacing.md,
    },
    detailMetricItem: {
      width: '48%',
      padding: Spacing.sm,
      borderRadius: BorderRadius.lg,
      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(248, 250, 252, 0.9)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
    },
    detailMetricItemHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 4,
    },
    detailMetricItemLabel: {
      fontSize: 11,
      color: themeColors.textSecondary,
      fontWeight: '500',
    },
    detailMetricItemVal: {
      fontSize: 16,
      fontWeight: '700',
      color: themeColors.text,
    },
    detailMetricItemSub: {
      fontSize: 10,
      color: themeColors.textSecondary,
      marginTop: 2,
    },
    detailAdviceCard: {
      padding: Spacing.md,
      borderRadius: BorderRadius.xl,
      borderWidth: 1,
      marginBottom: Spacing.md,
    },
    detailAdviceTitle: {
      fontSize: 13,
      fontWeight: '700',
      marginBottom: 4,
    },
    detailAdviceBody: {
      fontSize: 12,
      lineHeight: 18,
    },
    detailCloseButton: {
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.pill,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themeColors.primary,
      marginTop: Spacing.xs,
    },
    detailCloseButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '700',
    },
  });
}
export const getFadeAnimStyle = (opacity: any) => ({
  opacity,
});

export const getStatusBadgeStyle = (accentColor: string) => ({
  backgroundColor: `${accentColor}1A`, // 10% opacity
});

export const getStatusBadgeTextStyle = (accentColor: string) => ({
  color: accentColor,
});

export const getMetricIconBoxStyle = (color: string) => ({
  backgroundColor: `${color}1A`,
});

export const getDetailAdviceStyle = (color: string, isDark: boolean) => ({
  backgroundColor: isDark ? `${color}18` : `${color}10`,
  borderColor: `${color}40`,
});

export const getDetailAdviceTextStyle = (color: string) => ({
  color,
});

export const getDailyTempBarFillStyle = (minTemp: number, maxTemp: number) => {
  const range = Math.max(maxTemp - minTemp, 4);
  const widthPercent = Math.min(Math.max((range / 15) * 100, 30), 100);
  return {
    width: `${widthPercent}%` as const,
  };
};

