import { StyleSheet, Platform } from 'react-native';
import { Spacing, BorderRadius, Typography, Shadows } from '@/constants';
import { AppleColors, AppleGlassTokens } from '@/constants/appleTheme';
import type { ThemeColors } from '@/constants/colors';



export const createWeatherStyles = (themeColors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#0A0E1A' : '#F0F4F9',
    },
    scrollContent: {
      paddingHorizontal: Spacing.md,
      paddingBottom: Spacing.huge,
    },

    // 1. Thanh điều khiển trên cùng (Top Bar)
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Spacing.sm,
      marginBottom: Spacing.xs,
    },
    locationHeaderBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginRight: Spacing.sm,
    },
    locationPinIconWrap: {
      width: 36,
      height: 36,
      borderRadius: BorderRadius.full,
      backgroundColor: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.12)',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: Spacing.sm,
    },
    locationTextCol: {
      flex: 1,
    },
    locationCityRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationCityName: {
      fontSize: Typography.title.fontSize,
      fontWeight: '700',
      color: themeColors.text,
      marginRight: Spacing.xxs,
    },
    locationCountryName: {
      fontSize: Typography.caption.fontSize,
      color: themeColors.textSecondary,
    },
    topActionsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
    },
    actionPillBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.pill,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
    },
    actionPillText: {
      fontSize: Typography.caption.fontSize,
      fontWeight: '600',
      color: themeColors.text,
    },
    actionIconBtn: {
      width: 36,
      height: 36,
      borderRadius: BorderRadius.full,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
    },

    // 2. Băng chọn nhanh thành phố (City Quick Selector)
    quickCityScroll: {
      marginHorizontal: -Spacing.md,
      paddingHorizontal: Spacing.md,
      marginBottom: Spacing.md,
    },
    quickCityContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
      paddingVertical: Spacing.xxs,
    },
    cityPill: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.pill,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : '#FFFFFF',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
      ...Shadows.sm,
    },
    cityPillActive: {
      backgroundColor: isDark ? AppleColors.systemBlue : themeColors.primary,
      borderColor: isDark ? AppleColors.systemBlue : themeColors.primary,
    },

    cityPillText: {
      fontSize: Typography.caption.fontSize,
      fontWeight: '600',
      color: themeColors.textSecondary,
    },
    cityPillTextActive: {
      color: '#FFFFFF',
      fontWeight: '700',
    },

    // 3. Thẻ Thời Tiết Hiện Tại (Current Weather Hero Card)
    heroCard: {
      borderRadius: AppleGlassTokens.borderRadius,
      backgroundColor: isDark ? 'rgba(17, 24, 39, 0.85)' : '#FFFFFF',
      borderWidth: 1.2,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)',
      padding: Spacing.lg,
      marginBottom: Spacing.md,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: isDark ? 0.4 : 0.1,
          shadowRadius: 12,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    heroBadgeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.md,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xxs,
      borderRadius: BorderRadius.pill,
      gap: Spacing.xs,
    },
    statusBadgeText: {
      fontSize: Typography.caption.fontSize,
      fontWeight: '700',
    },
    updatedAtText: {
      fontSize: 11,
      color: themeColors.textSecondary,
    },
    heroMainRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Spacing.sm,
    },
    heroTempCol: {
      flex: 1,
    },
    bigTempText: {
      fontSize: 68,
      fontWeight: '800',
      color: themeColors.text,
      lineHeight: 74,
      fontVariant: ['tabular-nums'],
    },
    conditionLabelText: {
      fontSize: Typography.title.fontSize,
      fontWeight: '600',
      color: themeColors.text,
      marginTop: Spacing.xxs,
    },
    highLowText: {
      fontSize: Typography.body.fontSize,
      fontWeight: '500',
      color: themeColors.textSecondary,
      marginTop: Spacing.xxs,
    },
    heroIconCol: {
      width: 90,
      height: 90,
      alignItems: 'center',
      justifyContent: 'center',
    },
    feelsLikeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
      marginBottom: Spacing.md,
    },
    feelsLikeText: {
      fontSize: Typography.caption.fontSize,
      color: themeColors.textSecondary,
      fontWeight: '500',
    },

    // Lưới 4 chỉ số phụ
    metricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.sm,
    },
    metricItem: {
      flex: 1,
      minWidth: '45%',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
      borderRadius: BorderRadius.lg,
      padding: Spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
    },
    metricIconBox: {
      width: 32,
      height: 32,
      borderRadius: BorderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: Spacing.sm,
    },
    metricTextCol: {
      flex: 1,
    },
    metricLabel: {
      fontSize: 11,
      color: themeColors.textSecondary,
      fontWeight: '500',
    },
    metricValue: {
      fontSize: Typography.subtitle.fontSize,
      fontWeight: '700',
      color: themeColors.text,
      marginTop: 1,
    },

    // 4. Khối Dự Báo Theo Giờ (Hourly Forecast Card)
    sectionCard: {
      borderRadius: AppleGlassTokens.borderRadius,
      backgroundColor: isDark ? 'rgba(17, 24, 39, 0.85)' : '#FFFFFF',
      borderWidth: 1.2,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)',
      padding: Spacing.md,
      marginBottom: Spacing.md,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isDark ? 0.3 : 0.08,
          shadowRadius: 8,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    sectionHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.md,
      gap: Spacing.xs,
    },
    sectionTitle: {
      fontSize: Typography.subtitle.fontSize,
      fontWeight: '700',
      color: themeColors.text,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    hourlyScroll: {
      marginHorizontal: -Spacing.md,
      paddingHorizontal: Spacing.md,
    },
    hourlyScrollContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
      paddingVertical: Spacing.xxs,
    },
    hourlyItem: {
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.sm,
      borderRadius: BorderRadius.lg,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
      width: 68,
      height: 124,
    },
    hourlyTimeText: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.textSecondary,
    },
    hourlyIconBox: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: Spacing.xxs,
    },
    hourlyRainText: {
      fontSize: 10,
      fontWeight: '700',
      color: '#38BDF8',
      height: 14,
    },
    hourlyTempText: {
      fontSize: Typography.subtitle.fontSize,
      fontWeight: '700',
      color: themeColors.text,
      fontVariant: ['tabular-nums'],
    },

    // 5. Khối Dự Báo 7 Ngày Tới (Daily Forecast Card)
    dailyList: {
      gap: Spacing.sm,
    },
    dailyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Spacing.xs,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
    },
    dailyDayCol: {
      width: 96,
    },
    dailyDayName: {
      fontSize: Typography.body.fontSize,
      fontWeight: '600',
      color: themeColors.text,
    },
    dailyIconCol: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
      width: 70,
    },
    dailyRainBadgeText: {
      fontSize: 11,
      fontWeight: '700',
      color: '#38BDF8',
    },
    dailyTempRangeCol: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: Spacing.xs,
    },
    dailyMinTempText: {
      fontSize: Typography.body.fontSize,
      fontWeight: '500',
      color: themeColors.textSecondary,
      width: 32,
      textAlign: 'right',
      fontVariant: ['tabular-nums'],
    },
    dailyTempBarTrack: {
      width: 70,
      height: 6,
      borderRadius: BorderRadius.pill,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
      overflow: 'hidden',
    },
    dailyTempBarFill: {
      height: '100%',
      borderRadius: BorderRadius.pill,
      backgroundColor: '#F59E0B',
    },
    dailyMaxTempText: {
      fontSize: Typography.body.fontSize,
      fontWeight: '700',
      color: themeColors.text,
      width: 32,
      textAlign: 'right',
      fontVariant: ['tabular-nums'],
    },

    // 6. Modal Tìm Kiếm Thành Phố (City Search Modal)
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: themeColors.card,
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

    // 7. Loading & Error States
    stateContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: Spacing.xl,
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
      color: themeColors.textSecondary,
      marginTop: Spacing.xs,
      textAlign: 'center',
      marginBottom: Spacing.lg,
    },
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
  // normalize width percentage based on typical 15-40 deg range
  const range = Math.max(maxTemp - minTemp, 4);
  const widthPercent = Math.min(Math.max((range / 15) * 100, 30), 100);
  return {
    width: `${widthPercent}%` as const,
  };
};

