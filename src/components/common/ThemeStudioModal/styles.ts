import { StyleSheet, Dimensions } from 'react-native';
import { Spacing, ControlSize } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

export const createThemeStudioStyles = (
  colors: ThemeColors,
  radius: RadiusPresetConfig
) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.55)',
      justifyContent: 'flex-end',
    },
    sheetContainer: {
      backgroundColor: colors.card,
      // Sheet top corners: capped at 16px (large pill radius would look odd on bottom sheet)
      borderTopLeftRadius: Math.min(radius.card, 16),
      borderTopRightRadius: Math.min(radius.card, 16),
      borderWidth: 1,
      borderColor: colors.border,
      maxHeight: WINDOW_HEIGHT * 0.88,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 10,
    },
    dragHandleArea: {
      alignItems: 'center',
      paddingVertical: 10,
    },
    dragHandle: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.lg,
      paddingBottom: Spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    headerIconBox: {
      // Fixed square icon button: use smControl so it stays near-circle in smooth mode
      width: ControlSize.iconBtnSm,
      height: ControlSize.iconBtnSm,
      borderRadius: Math.min(radius.smControl, ControlSize.iconBtnSm / 2),
      backgroundColor: `${colors.primary}18`,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.text,
      letterSpacing: -0.3,
    },
    headerSubtitle: {
      fontSize: 11.5,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    closeBtn: {
      // Close button: fixed 36×36, stays circular in smooth mode
      width: ControlSize.iconBtnSm,
      height: ControlSize.iconBtnSm,
      borderRadius: Math.min(radius.smControl, ControlSize.iconBtnSm / 2),
      backgroundColor: colors.surfaceSubtle,
      alignItems: 'center',
      justifyContent: 'center',
    },

    scrollContent: {
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.md,
      paddingBottom: Spacing.xl + 20,
      gap: Spacing.lg,
    },

    // Sections
    section: {
      gap: 10,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sectionTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
    },
    sectionTitle: {
      fontSize: 13.5,
      fontWeight: '700',
      color: colors.text,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    sectionBadge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: radius.badge,
      backgroundColor: colors.surfaceSubtle,
      borderWidth: 1,
      borderColor: colors.border,
    },
    sectionBadgeText: {
      fontSize: 11,
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
      // Fixed height via ControlSize.sm for vertical consistency
      height: ControlSize.sm.height,
      paddingHorizontal: ControlSize.sm.paddingHorizontal,
      // Chips use control radius → becomes pill in smooth mode
      borderRadius: radius.control,
      backgroundColor: colors.surfaceSubtle,
      borderWidth: 1.5,
      borderColor: colors.border,
    },
    optionChipActive: {
      backgroundColor: `${colors.primary}15`,
      borderColor: colors.primary,
    },
    optionChipText: {
      fontSize: 12.5,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    optionChipTextActive: {
      color: colors.primary,
      fontWeight: '700',
    },

    // Accent Colors Swatches
    colorGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      justifyContent: 'space-between',
    },
    colorSwatchItem: {
      width: '31%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 8,
      paddingHorizontal: 10,
      // smControl: prevents ugly pill distortion on percentage-width swatch cards
      borderRadius: radius.smControl,
      backgroundColor: colors.surfaceSubtle,
      borderWidth: 1.5,
      borderColor: colors.border,
    },
    colorSwatchItemActive: {
      borderColor: colors.primary,
      backgroundColor: `${colors.primary}12`,
    },
    colorDot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    colorSwatchName: {
      fontSize: 11.5,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
    },
    colorSwatchNameActive: {
      fontWeight: '700',
    },

    // Border Radius Presets
    radiusGrid: {
      flexDirection: 'row',
      gap: 8,
    },
    radiusPresetCard: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 6,
      alignItems: 'center',
      backgroundColor: colors.surfaceSubtle,
      borderWidth: 1.5,
      borderColor: colors.border,
      gap: 6,
    },
    radiusPresetCardSharp: { borderRadius: 8 },
    radiusPresetCardCompact: { borderRadius: 12 },
    radiusPresetCardStandard: { borderRadius: 16 },
    radiusPresetCardSmooth: { borderRadius: 16 },
    radiusPresetCardActive: {
      borderColor: colors.primary,
      backgroundColor: `${colors.primary}12`,
    },
    radiusVisualBox: {
      width: 32,
      height: 32,
      borderWidth: 2,
      borderColor: colors.textSecondary,
      borderStyle: 'dashed',
    },
    radiusVisualBoxSharp: { borderRadius: 4 },
    radiusVisualBoxCompact: { borderRadius: 6 },
    radiusVisualBoxStandard: { borderRadius: 10 },
    radiusVisualBoxSmooth: { borderRadius: 14 },
    radiusVisualBoxActive: {
      borderColor: colors.primary,
      borderStyle: 'solid',
    },
    radiusPresetName: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.text,
      textAlign: 'center',
    },
    radiusPresetNameActive: {
      color: colors.primary,
    },
    radiusPresetPixel: {
      fontSize: 10,
      fontWeight: '600',
      color: colors.textSecondary,
    },

    // Switch row
    switchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surfaceSubtle,
      padding: Spacing.md,
      // Card container: safe max 16px to prevent pill distortion
      borderRadius: Math.min(radius.card, 16),
      borderWidth: 1,
      borderColor: colors.border,
    },
    switchLabelGroup: {
      flex: 1,
      marginRight: Spacing.md,
    },
    switchTitle: {
      fontSize: 13.5,
      fontWeight: '600',
      color: colors.text,
    },
    switchDesc: {
      fontSize: 11.5,
      color: colors.textSecondary,
      marginTop: 2,
    },

    // Live Sandbox
    sandboxCard: {
      backgroundColor: colors.card,
      borderRadius: radius.card,
      borderWidth: 1.5,
      borderColor: colors.border,
      padding: Spacing.md,
      gap: 12,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2,
    },
    sandboxHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    sandboxTitle: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      flexShrink: 1,
    },
    sandboxControls: {
      gap: 10,
    },
    sandboxTagRow: {
      flexDirection: 'row',
      gap: 6,
    },
    sandboxTag: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: radius.badge,
      backgroundColor: `${colors.primary}18`,
      borderWidth: 1,
      borderColor: `${colors.primary}40`,
      flexShrink: 0,
    },
    sandboxTagText: {
      fontSize: 10.5,
      fontWeight: '700',
      color: colors.primary,
    },

    // Footer
    footerRow: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 4,
    },
    footerBtn: {
      flex: 1,
    },
  });
