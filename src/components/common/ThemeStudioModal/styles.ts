import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Spacing, ControlSize } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

export const createThemeStudioStyles = (
  colors: ThemeColors,
  radius: RadiusPresetConfig,
  isDark: boolean = false
) => {
  const subtleBorder = isDark ? '#2B3448' : '#E2E8F0';
  const inactiveCardBg = isDark ? '#19202E' : '#FFFFFF';
  const inactiveChipBg = isDark ? '#141A26' : '#F8FAFC';
  const textSubtle = isDark ? '#94A3B8' : '#64748B';

  return StyleSheet.create({
    backdrop: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdropLight: {
      backgroundColor: 'rgba(15, 23, 42, 0.45)',
    },
    backdropDark: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    sheetContainer: {
      backgroundColor: isDark ? '#121722' : '#FFFFFF',
      borderTopLeftRadius: Math.min(radius.card, 18),
      borderTopRightRadius: Math.min(radius.card, 18),
      borderWidth: 1,
      borderColor: subtleBorder,
      height: Math.round(WINDOW_HEIGHT * 0.85),
      maxHeight: Math.round(WINDOW_HEIGHT * 0.90),
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: isDark ? 0.35 : 0.12,
      shadowRadius: 20,
      elevation: 16,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    dragHandleArea: {
      alignItems: 'center',
      paddingVertical: 8,
      backgroundColor: isDark ? '#121722' : '#FFFFFF',
    },
    dragHandle: {
      width: 36,
      height: 4,
      borderRadius: 2,
      backgroundColor: isDark ? '#475569' : '#CBD5E1',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm + 1,
      borderBottomWidth: 1,
      borderBottomColor: subtleBorder,
      backgroundColor: isDark ? '#161D2A' : '#FAFAFC',
    },
    headerTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      flex: 1,
    },
    headerTextCol: {
      flex: 1,
    },
    headerIconBox: {
      width: ControlSize.iconBtnSm,
      height: ControlSize.iconBtnSm,
      borderRadius: Math.min(radius.smControl, ControlSize.iconBtnSm / 2),
      backgroundColor: `${colors.primary}15`,
      borderWidth: 1,
      borderColor: `${colors.primary}35`,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      letterSpacing: -0.2,
    },
    headerSubtitle: {
      fontSize: 11.5,
      color: textSubtle,
      fontWeight: '500',
      marginTop: 1,
    },
    closeBtn: {
      width: ControlSize.iconBtnSm,
      height: ControlSize.iconBtnSm,
      borderRadius: Math.min(radius.smControl, ControlSize.iconBtnSm / 2),
      backgroundColor: isDark ? '#202838' : '#F1F5F9',
      borderWidth: 1,
      borderColor: subtleBorder,
      alignItems: 'center',
      justifyContent: 'center',
    },

    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.md,
      paddingBottom: Spacing.lg,
      gap: 16,
    },

    // Sections
    section: {
      gap: 9,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    sectionTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      flex: 1,
      flexShrink: 1,
    },
    sectionTitle: {
      fontSize: 12.5,
      fontWeight: '700',
      color: colors.text,
      textTransform: 'uppercase',
      letterSpacing: 0.4,
      flexShrink: 1,
    },
    sectionBadge: {
      flexShrink: 0,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: radius.badge,
      backgroundColor: `${colors.primary}12`,
      borderWidth: 1,
      borderColor: `${colors.primary}30`,
    },
    sectionBadgeText: {
      fontSize: 10.5,
      fontWeight: '600',
      color: colors.primary,
    },

    // Mode & Surface Chips
    gridRow: {
      flexDirection: 'row',
      gap: 8,
    },
    optionChip: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      height: ControlSize.sm.height,
      paddingHorizontal: ControlSize.sm.paddingHorizontal,
      borderRadius: radius.control,
      backgroundColor: inactiveChipBg,
      borderWidth: 1,
      borderColor: subtleBorder,
    },
    optionChipActive: {
      backgroundColor: `${colors.primary}14`,
      borderColor: colors.primary,
      borderWidth: 1.5,
    },
    optionChipText: {
      fontSize: 12.5,
      fontWeight: '500',
      color: textSubtle,
    },
    optionChipTextActive: {
      color: colors.primary,
      fontWeight: '700',
    },

    // Accent Colors Swatches
    colorGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      justifyContent: 'space-between',
    },
    colorSwatchItem: {
      width: '31.5%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderRadius: radius.pill,
      backgroundColor: inactiveCardBg,
      borderWidth: 1,
      borderColor: subtleBorder,
    },
    colorSwatchItemActive: {
      borderColor: colors.primary,
      borderWidth: 1.5,
      backgroundColor: `${colors.primary}12`,
    },
    colorDot: {
      width: 18,
      height: 18,
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    colorSwatchName: {
      fontSize: 11.5,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
    },
    colorSwatchNameActive: {
      color: colors.primary,
      fontWeight: '700',
    },

    // Border Radius Presets
    radiusGrid: {
      flexDirection: 'row',
      gap: 8,
    },
    radiusPresetCard: {
      flex: 1,
      paddingVertical: 9,
      paddingHorizontal: 4,
      alignItems: 'center',
      backgroundColor: inactiveCardBg,
      borderWidth: 1,
      borderColor: subtleBorder,
      gap: 5,
    },
    radiusPresetCardSharp: { borderRadius: 8 },
    radiusPresetCardCompact: { borderRadius: 12 },
    radiusPresetCardStandard: { borderRadius: 16 },
    radiusPresetCardSmooth: { borderRadius: 16 },
    radiusPresetCardActive: {
      borderColor: colors.primary,
      borderWidth: 1.5,
      backgroundColor: `${colors.primary}12`,
    },
    radiusVisualBox: {
      width: 30,
      height: 30,
      borderWidth: 1.5,
      borderColor: textSubtle,
      borderStyle: 'dashed',
    },
    radiusVisualBoxSharp: { borderRadius: 4 },
    radiusVisualBoxCompact: { borderRadius: 6 },
    radiusVisualBoxStandard: { borderRadius: 10 },
    radiusVisualBoxSmooth: { borderRadius: 14 },
    radiusVisualBoxActive: {
      borderColor: colors.primary,
      borderStyle: 'solid',
      backgroundColor: `${colors.primary}10`,
    },
    radiusPresetName: {
      fontSize: 11.5,
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center',
    },
    radiusPresetNameActive: {
      color: colors.primary,
      fontWeight: '700',
    },
    radiusPresetPixel: {
      fontSize: 9.5,
      fontWeight: '500',
      color: textSubtle,
    },

    // Switch row
    switchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: inactiveChipBg,
      padding: Spacing.md,
      borderRadius: Math.min(radius.card, 16),
      borderWidth: 1,
      borderColor: subtleBorder,
    },
    switchLabelGroup: {
      flex: 1,
      marginRight: Spacing.md,
    },
    switchTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.text,
    },
    switchDesc: {
      fontSize: 11,
      color: textSubtle,
      fontWeight: '400',
      marginTop: 2,
    },


    // Pinned Bottom Footer
    footerContainer: {
      flexDirection: 'row',
      gap: 10,
      paddingHorizontal: Spacing.lg,
      paddingTop: 10,
      paddingBottom: Platform.OS === 'ios' ? 22 : 12,
      borderTopWidth: 1,
      borderTopColor: subtleBorder,
      backgroundColor: isDark ? '#161D2A' : '#FAFAFC',
    },
    footerBtn: {
      flex: 1,
    },
  });
};
