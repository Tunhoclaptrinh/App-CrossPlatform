import { StyleSheet } from 'react-native';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

export const createLayoutLabScreenStyles = (
  themeColors: ThemeColors,
  radiusTokens: RadiusPresetConfig,
  isDark: boolean,
  customCardRadius?: number
) => {
  const cardRadius = customCardRadius !== undefined ? customCardRadius : radiusTokens.card;
  return StyleSheet.create({
    screenRoot: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    topDockFixedWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
    },
    bottomDockFixedWrapper: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
    },
    scrollContainer: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 16,
      gap: 14,
    },

    // Apple iOS Segmented Control Bar at top of controls
    segmentedBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 3.5,
      borderRadius: 14,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
      gap: 3,
    },
    segmentedTabBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4.5,
      paddingVertical: 7.5,
      paddingHorizontal: 4,
      borderRadius: 11,
      minHeight: 33,
    },
    segmentedTabBtnActive: {
      backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1.5 },
      shadowOpacity: isDark ? 0.35 : 0.12,
      shadowRadius: 4,
      elevation: 2.5,
    },
    segmentedTabText: {
      fontSize: 11.5,
      lineHeight: 14,
      fontWeight: '600',
      color: themeColors.textSecondary,
      textAlign: 'center',
      includeFontPadding: false,
      flexShrink: 1,
    },
    segmentedTabTextActive: {
      color: themeColors.primary,
      fontWeight: '700',
    },

    // Legacy fallback styles for compatibility
    studioCategoryRow: {
      flexDirection: 'row',
      gap: 6,
      paddingVertical: 2,
    },
    studioTabBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      paddingVertical: 9,
      borderRadius: radiusTokens.control,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
    },
    studioTabBtnActive: {
      borderColor: themeColors.primary,
      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.24)' : 'rgba(99, 102, 241, 0.12)',
    },
    studioTabText: {
      fontSize: 11.5,
      fontWeight: '600',
      color: themeColors.textSecondary,
    },
    studioTabTextActive: {
      color: themeColors.primary,
      fontWeight: '700',
    },

    // Clean Tuning Card
    controlCard: {
      padding: 16,
      borderRadius: cardRadius,
      gap: 14,
    },
    cardHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    cardTitle: {
      flex: 1,
      fontSize: 14,
      fontWeight: '700',
      color: themeColors.text,
      letterSpacing: -0.2,
      marginRight: 8,
    },

    // Horizontal Option Chips
    chipsRow: {
      flexDirection: 'row',
      gap: 8,
      flexWrap: 'wrap',
    },
    chipBtn: {
      flex: 1,
      minWidth: '45%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      paddingVertical: 9,
      paddingHorizontal: 6,
      borderRadius: radiusTokens.control,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
    },
    chipBtnActive: {
      borderColor: themeColors.primary,
      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.22)' : 'rgba(99, 102, 241, 0.1)',
    },
    chipText: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.textSecondary,
    },
    chipTextActive: {
      color: themeColors.primary,
      fontWeight: '700',
    },

    // Color Swatches Grid
    colorSwatchesRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    colorSwatchBtn: {
      flex: 1,
      minWidth: '30%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: radiusTokens.control,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
    },
    colorSwatchBtnActive: {
      borderColor: themeColors.primary,
      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.22)' : 'rgba(99, 102, 241, 0.1)',
    },
    colorDot: {
      width: 14,
      height: 14,
      borderRadius: 7,
    },
    colorSwatchText: {
      fontSize: 11.5,
      fontWeight: '600',
      color: themeColors.textSecondary,
    },
    colorSwatchTextActive: {
      color: themeColors.primary,
      fontWeight: '700',
    },

    // Compact Palette Row for detailed color pickers
    sectionDivider: {
      height: 1,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)',
      marginVertical: 4,
    },
    colorPaletteRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 7,
    },
    colorDotItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingVertical: 6,
      paddingHorizontal: 9,
      borderRadius: radiusTokens.control,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
    },
    colorDotItemActive: {
      borderColor: themeColors.primary,
      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.22)' : 'rgba(99, 102, 241, 0.1)',
    },
    colorDotPreview: {
      width: 14,
      height: 14,
      borderRadius: 7,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    colorDotLabel: {
      fontSize: 11,
      fontWeight: '600',
      color: themeColors.textSecondary,
    },
    colorDotLabelActive: {
      color: themeColors.primary,
      fontWeight: '700',
    },

    // Switch row for Glass Mode
    toggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 2,
    },
    toggleInfo: {
      flex: 1,
      gap: 2,
      marginRight: 12,
    },
    toggleTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: themeColors.text,
    },
    toggleDesc: {
      fontSize: 11,
      color: themeColors.textSecondary,
    },
    menuModeDesc: {
      fontSize: 11,
      color: themeColors.textSecondary,
      marginTop: 8,
    },

    // Mesh Wallpaper Selector
    meshSelectorBox: {
      gap: 8,
      marginTop: 4,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
    },
    meshSelectorTitle: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.textSecondary,
    },
    subSectionTitle: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.textSecondary,
      marginTop: 6,
    },
    toggleRowSpaced: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 2,
      marginTop: 8,
    },

    // Sample Content Cards to observe glass & radius live
    sampleCard: {
      padding: 16,
      borderRadius: cardRadius,
      gap: 12,
    },
    sampleHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sampleTitle: {
      fontSize: 13.5,
      fontWeight: '700',
      color: themeColors.text,
    },
    sampleDesc: {
      fontSize: 12,
      color: themeColors.textSecondary,
      lineHeight: 18,
    },
    sampleItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
    },
    sampleItemLabel: {
      fontSize: 12,
      color: themeColors.textSecondary,
    },
    sampleItemValue: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.text,
    },

    // AI Orb Fab (Storybook style)
    aiOrbFab: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#6366F1',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#6366F1',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 8,
      elevation: 6,
    },
    qrRadarFab: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#0EA5E9',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#0EA5E9',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 8,
      elevation: 6,
    },
    voiceFab: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#10B981',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#10B981',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 8,
      elevation: 6,
    },
    plusFab: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: themeColors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: themeColors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 8,
      elevation: 6,
    },
    squircleRadius: {
      borderRadius: 14,
    },

    // Studio Status Banner & Executive Hero Banner
    studioHeroBanner: {
      padding: 16,
      borderRadius: cardRadius,
      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.65)' : 'rgba(255, 255, 255, 0.85)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
      gap: 10,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.06,
      shadowRadius: 8,
      elevation: 2,
    },
    heroBannerTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    heroBadgeRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginRight: 8,
    },
    heroCategoryText: {
      flexShrink: 1,
      fontSize: 11,
      fontWeight: '800',
      color: themeColors.primary,
      letterSpacing: 0.6,
      textTransform: 'uppercase',
    },
    heroLivePill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 12,
      backgroundColor: isDark ? 'rgba(34, 197, 94, 0.16)' : 'rgba(34, 197, 94, 0.12)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.25)',
    },
    heroLiveDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#22C55E',
    },
    heroLiveText: {
      fontSize: 10.5,
      fontWeight: '700',
      color: '#16A34A',
    },
    heroMainTitle: {
      fontSize: 16,
      fontWeight: '800',
      color: themeColors.text,
      letterSpacing: -0.3,
    },
    heroSubtitle: {
      fontSize: 12.5,
      lineHeight: 18,
      color: themeColors.textSecondary,
    },
    heroStatsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
    },
    heroStatItem: {
      width: '48.5%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 10,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
    },
    heroStatLabel: {
      fontSize: 11,
      fontWeight: '500',
      color: themeColors.textSecondary,
    },
    heroStatValue: {
      fontSize: 11,
      fontWeight: '700',
      color: themeColors.text,
    },
    heroStatsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
    },
    heroStatText: {
      fontSize: 10.5,
      fontWeight: '600',
      color: themeColors.textSecondary,
    },
    studioBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: radiusTokens.control,
      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.12)' : 'rgba(99, 102, 241, 0.08)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.2)',
    },
    studioBannerText: {
      flex: 1,
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.text,
      lineHeight: 17,
    },

    // 2-Column Radio Grid for Multi-option Controls
    radioGrid2Col: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 4,
    },
    radioCardItem: {
      width: '48.5%',
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
      justifyContent: 'center',
    },
    radioCardItemActive: {
      borderColor: themeColors.primary,
      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.18)' : 'rgba(99, 102, 241, 0.08)',
    },
    radioInnerFill: {
      width: '100%',
    },

    // Presets Grid
    presetCard: {
      padding: 14,
      borderRadius: cardRadius,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.09)' : 'rgba(0, 0, 0, 0.06)',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
      gap: 8,
    },
    presetCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    presetTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    presetTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: themeColors.text,
    },
    presetDesc: {
      fontSize: 11.5,
      color: themeColors.textSecondary,
      lineHeight: 16,
    },
    presetApplyBtn: {
      alignSelf: 'flex-start',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: radiusTokens.control,
      backgroundColor: themeColors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginTop: 2,
    },
    presetApplyText: {
      fontSize: 11.5,
      fontWeight: '700',
      color: '#FFFFFF',
    },

    // Interactive Tokens Demo
    tokensDemoGrid: {
      gap: 12,
      marginTop: 4,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
    },
    tokenDemoRow: {
      flexDirection: 'row',
      gap: 8,
      flexWrap: 'wrap',
    },
    demoBtn: {
      flex: 1,
      minWidth: '45%',
      paddingVertical: 9,
      paddingHorizontal: 12,
      borderRadius: radiusTokens.control,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },
    demoBtnFilled: {
      backgroundColor: themeColors.primary,
      borderColor: themeColors.primary,
    },
    demoBtnTinted: {
      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.22)' : 'rgba(99, 102, 241, 0.1)',
      borderColor: isDark ? 'rgba(99, 102, 241, 0.35)' : 'rgba(99, 102, 241, 0.25)',
    },
    demoBtnOutline: {
      backgroundColor: 'transparent',
      borderColor: themeColors.primary,
    },
    demoBtnGlass: {
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.65)',
      borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)',
    },
    demoBtnTextFilled: {
      fontSize: 12,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    demoBtnTextTinted: {
      fontSize: 12,
      fontWeight: '700',
      color: themeColors.primary,
    },
    demoBtnTextOutline: {
      fontSize: 12,
      fontWeight: '700',
      color: themeColors.primary,
    },
    demoBtnTextGlass: {
      fontSize: 12,
      fontWeight: '700',
      color: themeColors.text,
    },
  });
};
