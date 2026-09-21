import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius, Typography } from '@/constants';
import type { ThemeColors } from '@/constants/colors';

export const createWeatherStyles = (themeColors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
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
      paddingVertical: 6,
      paddingHorizontal: Spacing.sm,
      borderRadius: BorderRadius.pill,
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.25)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.45)',
    },
    locationPinIconWrap: {
      width: 30,
      height: 30,
      borderRadius: BorderRadius.full,
      backgroundColor: isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: Spacing.xs,
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
      fontSize: Typography.body.fontSize,
      fontWeight: '700',
      color: '#FFFFFF',
      textShadowColor: 'rgba(0, 0, 0, 0.35)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 3,
    },
    locationCountryName: {
      fontSize: 11,
      color: 'rgba(255, 255, 255, 0.85)',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    locationSearchBadge: {
      width: 26,
      height: 26,
      borderRadius: BorderRadius.full,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.3)',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: Spacing.xxs,
    },
    topActionsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    actionPillBtn: {
      height: 36,
      paddingHorizontal: Spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BorderRadius.pill,
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.25)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.45)',
    },
    actionPillText: {
      fontSize: Typography.caption.fontSize,
      fontWeight: '700',
      color: '#FFFFFF',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    actionIconBtn: {
      width: 36,
      height: 36,
      borderRadius: BorderRadius.full,
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.25)',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.45)',
    },

    // 2. Hero Không Viền Nổi Tự Do (Cardless Floating Hero)
    floatingHeroContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Spacing.xs,
      marginBottom: Spacing.sm,
    },
    heroBadgeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Spacing.xs,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.pill,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.35)',
      gap: Spacing.xs,
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.25)',
    },
    statusBadgeText: {
      fontSize: Typography.caption.fontSize,
      fontWeight: '700',
      color: '#FFFFFF',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    heroCenterBlock: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: Spacing.xxs,
    },
    heroIconBox: {
      width: 80,
      height: 80,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 2,
    },
    floatingBigTempText: {
      fontSize: 80,
      fontWeight: '800',
      color: '#FFFFFF',
      lineHeight: 88,
      fontVariant: ['tabular-nums'],
      textShadowColor: 'rgba(0, 0, 0, 0.45)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 8,
    },
    floatingConditionText: {
      fontSize: Typography.title.fontSize,
      fontWeight: '600',
      color: '#FFFFFF',
      marginTop: 2,
      textShadowColor: 'rgba(0, 0, 0, 0.4)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 6,
    },
    floatingHighLowRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.sm,
      marginTop: Spacing.xs,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xxs,
      borderRadius: BorderRadius.pill,
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.35)' : 'rgba(255, 255, 255, 0.25)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.45)',
    },
    floatingHighLowText: {
      fontSize: Typography.caption.fontSize,
      fontWeight: '600',
      color: '#FFFFFF',
      fontVariant: ['tabular-nums'],
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    highLowDotDivider: {
      width: 4,
      height: 4,
      borderRadius: 2,
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
      borderRadius: 22,
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.38)' : 'rgba(255, 255, 255, 0.22)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.38)',
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      marginBottom: Spacing.md,
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
      backgroundColor: isDark ? 'rgba(56, 189, 248, 0.22)' : 'rgba(255, 255, 255, 0.32)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(56, 189, 248, 0.45)' : 'rgba(255, 255, 255, 0.6)',
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

    // 7. Lưới 4 Chỉ Số Khí Quyển Kính Mờ 2x2 (Weather Metrics Grid 2x2)
    metricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.xs,
      marginBottom: Spacing.md,
    },
    metricTile: {
      flex: 1,
      minWidth: '47%',
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.22)',
      borderRadius: BorderRadius.xl,
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.38)',
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
  });

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

export const getDailyTempBarFillStyle = (minTemp: number, maxTemp: number) => {
  const range = Math.max(maxTemp - minTemp, 4);
  const widthPercent = Math.min(Math.max((range / 15) * 100, 30), 100);
  return {
    width: `${widthPercent}%` as const,
  };
};

