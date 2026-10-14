import { StyleSheet, Platform } from 'react-native';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

export const createSecuritySettingsStyles = (
  themeColors: ThemeColors,
  isDark: boolean,
  radiusTokens: RadiusPresetConfig
) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 40,
      gap: 16,
    },
    sectionCard: {
      padding: 16,
      borderRadius: radiusTokens.card,
      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.45)' : '#FFFFFF',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
      gap: 12,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sectionTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flex: 1,
    },
    sectionTitle: {
      fontSize: 14.5,
      fontWeight: '700',
      color: themeColors.text,
    },
    sectionDesc: {
      fontSize: 12,
      color: themeColors.textSecondary,
      lineHeight: 17,
    },
    optionGrid: {
      gap: 8,
      marginTop: 4,
    },
    optionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      borderRadius: radiusTokens.control,
      borderWidth: 1.5,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(0, 0, 0, 0.08)',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
    },
    optionCardActive: {
      borderColor: themeColors.primary,
      backgroundColor: `${themeColors.primary}12`,
    },
    optionLeft: {
      flex: 1,
      gap: 2,
    },
    optionName: {
      fontSize: 13.5,
      fontWeight: '600',
      color: themeColors.text,
    },
    optionNameActive: {
      color: themeColors.primary,
      fontWeight: '700',
    },
    optionDescText: {
      fontSize: 11,
      color: themeColors.textSecondary,
    },
    switchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
    },
    switchRowLast: {
      borderBottomWidth: 0,
    },
    switchInfo: {
      flex: 1,
      paddingRight: 14,
      gap: 2,
    },
    switchLabel: {
      fontSize: 13,
      fontWeight: '600',
      color: themeColors.text,
    },
    switchDesc: {
      fontSize: 11,
      color: themeColors.textSecondary,
    },
    pepperRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.04)',
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: radiusTokens.control,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
    },
    pepperText: {
      flex: 1,
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
      fontSize: 11.5,
      color: isDark ? '#38BDF8' : '#0284C7',
    },
    // App Icon Customizer Styles
    iconPreviewBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      padding: 14,
      borderRadius: radiusTokens.card,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
    },
    appIconMockupLarge: {
      width: 58,
      height: 58,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 5,
    },
    iconBannerInfo: {
      flex: 1,
      gap: 4,
    },
    iconBannerTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    iconBannerTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: themeColors.text,
    },
    iconBannerDesc: {
      fontSize: 11.5,
      color: themeColors.textSecondary,
    },
    iconGrid: {
      gap: 8,
      marginTop: 6,
    },
    iconItemCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      borderRadius: radiusTokens.control,
      borderWidth: 1.5,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
    },
    iconItemCardActive: {
      borderColor: themeColors.primary,
      backgroundColor: `${themeColors.primary}12`,
    },
    iconItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flex: 1,
    },
    miniIconMockup: {
      width: 38,
      height: 38,
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconItemTexts: {
      flex: 1,
      gap: 2,
    },
    iconItemName: {
      fontSize: 13,
      fontWeight: '600',
      color: themeColors.text,
    },
    iconItemDesc: {
      fontSize: 11,
      color: themeColors.textSecondary,
    },
    techToggleBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      paddingVertical: 8,
    },
    techToggleText: {
      fontSize: 12.5,
      fontWeight: '600',
      color: themeColors.primary,
    },
    techSection: {
      padding: 14,
      borderRadius: radiusTokens.card,
      backgroundColor: isDark ? '#05070D' : '#F1F5F9',
      borderWidth: 1,
      borderColor: isDark ? '#1E293B' : '#CBD5E1',
      gap: 10,
    },
    techHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    techTitle: {
      fontSize: 13,
      fontWeight: '700',
      color: themeColors.text,
    },
    techDesc: {
      fontSize: 12,
      color: themeColors.textSecondary,
      lineHeight: 17,
    },
    techDescSpacing: {
      fontSize: 12,
      color: themeColors.textSecondary,
      lineHeight: 17,
      marginTop: 4,
    },
    boldText: {
      fontWeight: '700',
      color: themeColors.text,
    },
    boldTextInline: {
      fontWeight: '700',
    },
    codeInline: {
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
      color: '#10B981',
    },
    codeSnippet: {
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
      fontSize: 11,
      lineHeight: 16,
      color: isDark ? '#38BDF8' : '#0369A1',
      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.8)',
      padding: 10,
      borderRadius: 6,
    },
    // Crypto Inspector Styles
    terminalCard: {
      padding: 14,
      borderRadius: radiusTokens.control,
      backgroundColor: isDark ? '#05070D' : '#F1F5F9',
      borderWidth: 1,
      borderColor: isDark ? '#1E293B' : '#CBD5E1',
      gap: 8,
    },
    terminalTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    terminalTitleRowSpacing: {
      marginTop: 8,
    },
    fieldRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingVertical: 3,
      gap: 8,
    },
    fieldKey: {
      fontSize: 11.5,
      fontWeight: '600',
      color: themeColors.textSecondary,
      width: 90,
    },
    fieldValueBox: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
    },
    fieldValueText: {
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
      fontSize: 11,
      color: themeColors.text,
      flex: 1,
    },
    copyBtn: {
      padding: 4,
    },
    codeBlock: {
      padding: 10,
      borderRadius: 6,
      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.8)',
    },
    codeText: {
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
      fontSize: 11,
      lineHeight: 16,
      color: isDark ? '#38BDF8' : '#0369A1',
    },
    wirePayloadWrapper: {
      marginTop: 4,
      gap: 6,
    },
    wirePayloadHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    wirePayloadTitle: {
      fontSize: 11,
      fontWeight: '700',
      color: themeColors.textSecondary,
    },
    wirePayloadCopyBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    wirePayloadCopyText: {
      fontSize: 11,
      color: themeColors.primary,
      fontWeight: '600',
    },
    footerRow: {
      flexDirection: 'row',
      gap: 12,
      paddingTop: 8,
    },
    btnFlex: {
      flex: 1,
    },
  });
};
