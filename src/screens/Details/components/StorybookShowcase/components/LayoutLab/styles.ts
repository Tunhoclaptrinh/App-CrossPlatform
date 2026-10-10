import { StyleSheet } from 'react-native';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

export const createLayoutLabStyles = (
  themeColors: ThemeColors,
  radiusTokens: RadiusPresetConfig,
  isDark: boolean
) =>
  StyleSheet.create({
    container: {
      gap: 16,
      paddingBottom: 44,
    },
    heroCard: {
      padding: 16,
      gap: 12,
      borderWidth: 1,
      borderColor: 'rgba(99, 102, 241, 0.3)',
      backgroundColor: 'rgba(99, 102, 241, 0.05)',
    },
    heroHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    heroTag: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: radiusTokens.pill,
    },
    heroTagText: {
      fontSize: 11,
      fontWeight: '700',
      color: '#6366F1',
      letterSpacing: 0.5,
    },
    heroLiveBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: radiusTokens.pill,
      borderWidth: 1,
      borderColor: 'rgba(16, 185, 129, 0.3)',
    },
    liveDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#10B981',
    },
    heroLiveText: {
      fontSize: 10,
      fontWeight: '700',
      color: '#10B981',
    },
    heroTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: themeColors.text,
      letterSpacing: -0.2,
    },
    heroDesc: {
      fontSize: 13,
      color: themeColors.textSecondary,
      lineHeight: 18,
    },
    quickSwapRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingTop: 4,
    },
    expandToggleBtn: {
      width: 38,
      height: 38,
      borderRadius: 19,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
    },
    fullScreenBtnWrap: {
      marginTop: 8,
    },

    // Preset Section
    presetSection: {
      gap: 8,
    },
    sectionHeading: {
      fontSize: 13.5,
      fontWeight: '700',
      color: themeColors.text,
      letterSpacing: -0.1,
    },
    presetScrollContent: {
      gap: 8,
      paddingVertical: 2,
    },
    presetChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: radiusTokens.pill,
      borderWidth: 1,
    },
    presetChipActive: {
      backgroundColor: '#6366F1',
      borderColor: '#6366F1',
    },
    presetChipDark: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.12)',
    },
    presetChipLight: {
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
      borderColor: 'rgba(0, 0, 0, 0.08)',
    },
    presetChipText: {
      fontSize: 12.5,
      fontWeight: '600',
    },
    presetBadge: {
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 6,
    },
    presetBadgeActive: {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    presetBadgeDark: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    presetBadgeLight: {
      backgroundColor: 'rgba(0, 0, 0, 0.06)',
    },
    presetBadgeText: {
      fontSize: 10,
      fontWeight: '700',
    },

    // Middle Content Modes
    contentModeSection: {
      gap: 8,
    },
    contentModeRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    modeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 11,
      paddingVertical: 7,
      borderRadius: radiusTokens.control,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    modeButtonActive: {
      backgroundColor: '#6366F1',
      borderColor: '#6366F1',
    },
    modeButtonDark: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    modeButtonLight: {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    modeButtonText: {
      fontSize: 12,
      fontWeight: '600',
    },

    // Phone Chassis Simulator Stage
    stageSection: {
      gap: 8,
    },
    stageTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    phoneChassis: {
      height: 590,
      borderRadius: 34,
      borderWidth: 2,
      overflow: 'hidden',
      position: 'relative',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 8,
    },
    phoneChassisDark: {
      backgroundColor: '#090D16',
      borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    phoneChassisLight: {
      backgroundColor: '#F1F5F9',
      borderColor: 'rgba(0, 0, 0, 0.12)',
    },
    phoneChassisExpanded: {
      height: 740,
    },
    chassisTopPill: {
      position: 'absolute',
      top: 6,
      left: 0,
      right: 0,
      alignItems: 'center',
      zIndex: 999,
      pointerEvents: 'none',
    },
    simulatedDynamicIsland: {
      width: 86,
      height: 18,
      backgroundColor: '#000000',
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 10,
      gap: 6,
    },
    islandCameraLens: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#1E293B',
    },
    islandSensorLens: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: '#0F172A',
    },
    topDockContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
    },
    bottomDockContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
    },
    middleScrollView: {
      flex: 1,
    },
    middleScrollContent: {
      paddingHorizontal: 14,
    },
    simulatedHomeBarContainer: {
      position: 'absolute',
      bottom: 4,
      left: 0,
      right: 0,
      alignItems: 'center',
      zIndex: 101,
      pointerEvents: 'none',
    },
    simulatedHomeBar: {
      width: 100,
      height: 4,
      borderRadius: 2,
    },
    homeBarDark: {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    homeBarLight: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },

    // Middle Content: Common
    contentBody: {
      gap: 12,
    },

    // Content 1: Telemetry
    telemetryStatusCard: {
      padding: 12,
      gap: 6,
    },
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    statusIndicatorBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    onlinePulse: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#10B981',
    },
    statusIndicatorText: {
      fontSize: 12.5,
      fontWeight: '700',
      color: themeColors.text,
    },
    statusSubtitle: {
      fontSize: 11.5,
      color: themeColors.textSecondary,
    },
    sensorGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    sensorCard: {
      width: '48%',
      padding: 12,
      gap: 4,
    },
    sensorCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sensorIconBubble: {
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sensorIconRed: {
      backgroundColor: 'rgba(239, 68, 68, 0.15)',
    },
    sensorIconBlue: {
      backgroundColor: 'rgba(59, 130, 246, 0.15)',
    },
    sensorIconGreen: {
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
    },
    sensorIconPurple: {
      backgroundColor: 'rgba(168, 85, 247, 0.15)',
    },
    sensorCardTag: {
      fontSize: 10,
      color: '#94A3B8',
      fontWeight: '600',
    },
    sensorValueNormal: {
      fontSize: 20,
      fontWeight: '800',
      color: themeColors.text,
      marginTop: 4,
    },
    sensorValueSuccess: {
      fontSize: 20,
      fontWeight: '800',
      color: '#10B981',
      marginTop: 4,
    },
    sensorSubtext: {
      fontSize: 10.5,
      color: themeColors.textSecondary,
    },
    miniProgressWrap: {
      marginTop: 6,
    },
    actuatorsCard: {
      padding: 12,
      gap: 10,
    },
    actuatorTitle: {
      fontSize: 12.5,
      fontWeight: '700',
      color: themeColors.text,
    },
    actuatorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    actuatorCol: {
      flex: 1,
      alignItems: 'center',
      gap: 6,
    },
    actuatorLabelBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    actuatorLabel: {
      fontSize: 11,
      fontWeight: '600',
      color: themeColors.text,
    },
    actuatorDivider: {
      width: 1,
      height: 28,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
    },
    logStreamCard: {
      padding: 12,
      gap: 4,
      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.35)' : 'rgba(0, 0, 0, 0.05)',
    },
    logStreamHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    logStreamTag: {
      fontSize: 10.5,
      fontWeight: '700',
      color: '#6366F1',
      letterSpacing: 0.5,
    },
    logLine: {
      fontFamily: 'monospace',
      fontSize: 10.5,
      color: '#94A3B8',
      lineHeight: 15,
    },

    // Content 2: Article
    articleHeroBanner: {
      padding: 16,
      gap: 10,
    },
    articleMainTitle: {
      fontSize: 17,
      fontWeight: '800',
      color: themeColors.text,
      lineHeight: 22,
      letterSpacing: -0.2,
    },
    authorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    authorAvatar: {
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: '#6366F1',
      alignItems: 'center',
      justifyContent: 'center',
    },
    authorName: {
      fontSize: 11,
      color: themeColors.textSecondary,
    },
    articleBodyCard: {
      padding: 14,
      gap: 10,
    },
    paragraphHeading: {
      fontSize: 13.5,
      fontWeight: '700',
      color: themeColors.text,
    },
    paragraphText: {
      fontSize: 12.5,
      color: themeColors.textSecondary,
      lineHeight: 18,
    },
    quoteBlock: {
      borderLeftWidth: 3,
      borderLeftColor: '#6366F1',
      paddingLeft: 10,
      marginVertical: 4,
    },
    quoteText: {
      fontSize: 12,
      fontStyle: 'italic',
      color: '#6366F1',
      lineHeight: 17,
    },
    faqWrap: {
      gap: 8,
    },
    faqSectionTitle: {
      fontSize: 13,
      fontWeight: '700',
      color: themeColors.text,
    },
    accordionInner: {
      fontSize: 12,
      color: themeColors.textSecondary,
      lineHeight: 17,
      paddingTop: 4,
    },

    // Content 3: Bento
    bentoRevenueCard: {
      padding: 14,
      gap: 12,
    },
    bentoRevenueHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    bentoSmallTag: {
      fontSize: 10.5,
      fontWeight: '700',
      color: '#6366F1',
    },
    bentoMainNumber: {
      fontSize: 24,
      fontWeight: '800',
      color: themeColors.text,
      letterSpacing: -0.5,
    },
    bentoTrendBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: radiusTokens.pill,
    },
    bentoTrendText: {
      fontSize: 11,
      fontWeight: '700',
      color: '#10B981',
    },
    bentoBarChart: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      height: 52,
      gap: 6,
      paddingTop: 8,
    },
    bentoBarTrack: {
      flex: 1,
      height: '100%',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
      borderRadius: 4,
      justifyContent: 'flex-end',
      overflow: 'hidden',
    },
    bentoBarFill: {
      width: '100%',
      borderRadius: 4,
    },
    bentoBarHighlight: {
      backgroundColor: '#6366F1',
    },
    bentoBarNormal: {
      backgroundColor: 'rgba(99, 102, 241, 0.45)',
    },
    bentoSplitRow: {
      flexDirection: 'row',
      gap: 10,
    },
    bentoSplitCard: {
      flex: 1,
      padding: 12,
      gap: 4,
    },
    bentoIconBox: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: 'rgba(99, 102, 241, 0.15)',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
    },
    bentoIconBoxGreen: {
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
    },
    bentoCardTitle: {
      fontSize: 11.5,
      fontWeight: '600',
      color: themeColors.text,
    },
    bentoBigStat: {
      fontSize: 19,
      fontWeight: '800',
      color: '#6366F1',
    },
    bentoBigStatSuccess: {
      fontSize: 19,
      fontWeight: '800',
      color: '#10B981',
    },
    bentoCardSubtitle: {
      fontSize: 10.5,
      color: themeColors.textSecondary,
    },
    bentoTilesCard: {
      padding: 12,
      gap: 10,
    },
    bentoTilesTitle: {
      fontSize: 12.5,
      fontWeight: '700',
      color: themeColors.text,
    },
    tilesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },

    // Content 4: Forms
    formCard: {
      padding: 14,
      gap: 10,
    },
    formHeading: {
      fontSize: 14,
      fontWeight: '700',
      color: themeColors.text,
    },
    formDesc: {
      fontSize: 12,
      color: themeColors.textSecondary,
      lineHeight: 16,
    },
    inputStack: {
      gap: 10,
      marginTop: 4,
    },
    formSwitchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    formSwitchLabelCol: {
      flex: 1,
      gap: 2,
      paddingRight: 10,
    },
    formSwitchTitle: {
      fontSize: 12.5,
      fontWeight: '600',
      color: themeColors.text,
    },
    formSwitchDesc: {
      fontSize: 11,
      color: themeColors.textSecondary,
    },
    formBtnRow: {
      marginTop: 8,
    },

    // Content 5: Feed
    walletHeroCard: {
      padding: 14,
      gap: 6,
      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.05)',
      borderColor: isDark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.15)',
    },
    walletTag: {
      fontSize: 10.5,
      fontWeight: '700',
      color: '#6366F1',
    },
    walletBalance: {
      fontSize: 22,
      fontWeight: '800',
      color: themeColors.text,
      letterSpacing: -0.3,
    },
    walletMetaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 2,
    },
    walletSubtext: {
      fontSize: 11,
      color: themeColors.textSecondary,
    },
    feedCard: {
      padding: 12,
      gap: 8,
    },
    feedTitle: {
      fontSize: 12.5,
      fontWeight: '700',
      color: themeColors.text,
      marginBottom: 4,
    },
    feedItemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 6,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
    },
    feedItemIconBox: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    feedIconBoxGreen: {
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
    },
    feedIconBoxIndigo: {
      backgroundColor: 'rgba(99, 102, 241, 0.12)',
    },
    feedItemTextCol: {
      flex: 1,
      gap: 2,
    },
    feedItemTitle: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.text,
    },
    feedItemSub: {
      fontSize: 10.5,
      color: themeColors.textSecondary,
    },
    feedItemAmount: {
      fontSize: 12.5,
      fontWeight: '700',
    },
    feedAmountGreen: {
      color: '#10B981',
    },
    feedAmountNormal: {
      color: themeColors.text,
    },

    // Controls Deck Card
    controlsDeckCard: {
      padding: 16,
      gap: 14,
    },
    deckHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    deckTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: themeColors.text,
    },
    scrubberBlock: {
      gap: 6,
    },
    switchConfigRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 2,
    },
    switchLabelCol: {
      flex: 1,
      gap: 2,
      paddingRight: 12,
    },
    switchTitle: {
      fontSize: 12.5,
      fontWeight: '600',
      color: themeColors.text,
    },
    switchDesc: {
      fontSize: 11,
      color: themeColors.textSecondary,
      lineHeight: 15,
    },
    manualPaddingGroup: {
      padding: 10,
      borderRadius: radiusTokens.control,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
    },
    spacer12: {
      height: 12,
    },
    dividerWrap: {
      paddingVertical: 4,
    },
    hDivider: {
      height: 1,
      width: '100%',
    },
    hDividerDark: {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    hDividerLight: {
      backgroundColor: 'rgba(0, 0, 0, 0.06)',
    },
    subOptionsTitle: {
      fontSize: 12.5,
      fontWeight: '600',
      color: themeColors.text,
    },
    fabComponentGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    fabOptionChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: radiusTokens.control,
      borderWidth: 1,
    },
    fabOptionChipSelected: {
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      borderColor: '#6366F1',
    },
    fabOptionChipDark: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    fabOptionChipLight: {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      borderColor: 'rgba(0, 0, 0, 0.08)',
    },
    fabOptionText: {
      fontSize: 11.5,
      fontWeight: '600',
    },
    fabOptionTextSelected: {
      color: '#6366F1',
    },
    fabShapeRow: {
      flexDirection: 'row',
      gap: 12,
    },
    fabShapeCol: {
      flex: 1,
      gap: 6,
    },
    fabShapeLabel: {
      fontSize: 11,
      fontWeight: '600',
      color: themeColors.textSecondary,
    },
    shapeToggleButtons: {
      flexDirection: 'row',
      borderRadius: radiusTokens.control,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
      padding: 2,
      gap: 2,
    },
    shapeBtn: {
      flex: 1,
      paddingVertical: 6,
      alignItems: 'center',
      borderRadius: Math.max(0, radiusTokens.control - 2),
    },
    shapeBtnActive: {
      backgroundColor: '#6366F1',
    },
    shapeBtnText: {
      fontSize: 10.5,
      fontWeight: '600',
      color: '#94A3B8',
    },
    shapeBtnTextActive: {
      color: '#FFFFFF',
      fontWeight: '700',
    },

    // Custom Center FAB Visuals
    aiOrbWrapper: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#6366F1',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#6366F1',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.6,
      shadowRadius: 10,
      elevation: 8,
      borderWidth: 2,
      borderColor: '#A5B4FC',
    },
    aiOrbCore: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    qrRadarWrapper: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#10B981',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#6EE7B7',
      shadowColor: '#10B981',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 8,
    },
    voiceWaveWrapper: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#EC4899',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#F9A8D4',
      shadowColor: '#EC4899',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 8,
    },
    pillBadgeWrapper: {
      height: 38,
      paddingHorizontal: 14,
      borderRadius: 19,
      backgroundColor: '#6366F1',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      borderWidth: 1.5,
      borderColor: '#A5B4FC',
      elevation: 6,
    },
    pillBadgeText: {
      fontSize: 11,
      fontWeight: '800',
      color: '#FFFFFF',
      letterSpacing: 0.5,
    },
    squircleRadius: {
      borderRadius: 16,
    },

    // Typography & Color Helpers
    textWhite: {
      color: '#FFFFFF',
    },
    textNormal: {
      color: themeColors.text,
    },
    textSecondary: {
      color: themeColors.textSecondary,
    },
  });
