import { StyleSheet } from 'react-native';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

export const createAuthStyles = (
  themeColors: ThemeColors,
  radiusTokens: RadiusPresetConfig,
  isDark: boolean,
  isGlass: boolean
) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 40,
      gap: 16,
    },
    headerRightBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: radiusTokens.pill,
      backgroundColor: isDark ? 'rgba(16, 185, 129, 0.14)' : 'rgba(16, 185, 129, 0.10)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(16, 185, 129, 0.35)' : 'rgba(16, 185, 129, 0.25)',
    },
    headerRightText: {
      fontSize: 11.5,
      fontWeight: '700',
      color: '#10B981',
    },
    heroSection: {
      alignItems: 'center',
      paddingTop: 8,
      paddingBottom: 4,
      gap: 8,
    },
    heroBadgeBox: {
      width: 56,
      height: 56,
      borderRadius: 18,
      backgroundColor: isGlass
        ? isDark
          ? 'rgba(99, 102, 241, 0.25)'
          : 'rgba(99, 102, 241, 0.15)'
        : `${themeColors.primary}18`,
      borderWidth: 1.5,
      borderColor: isGlass
        ? isDark
          ? 'rgba(255, 255, 255, 0.25)'
          : 'rgba(99, 102, 241, 0.35)'
        : `${themeColors.primary}30`,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#6366F1',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 6,
    },
    heroTitle: {
      fontSize: 22,
      fontWeight: '800',
      color: themeColors.text,
      letterSpacing: -0.4,
      textAlign: 'center',
    },
    heroSubtitle: {
      fontSize: 13,
      color: themeColors.textSecondary,
      textAlign: 'center',
      maxWidth: 320,
      lineHeight: 18,
    },
    tabPillWrapper: {
      flexDirection: 'row',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
      borderRadius: radiusTokens.pill,
      padding: 4,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(0, 0, 0, 0.06)',
    },
    tabPillBtn: {
      flex: 1,
      paddingVertical: 9,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radiusTokens.pill,
    },
    tabPillBtnActive: {
      backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    tabPillText: {
      fontSize: 13.5,
      fontWeight: '600',
      color: themeColors.textSecondary,
    },
    tabPillTextActive: {
      color: themeColors.primary,
      fontWeight: '700',
    },
    formCard: {
      padding: 20,
      borderRadius: radiusTokens.card * 1.1,
      gap: 14,
      backgroundColor: isGlass
        ? isDark
          ? 'rgba(15, 23, 42, 0.82)'
          : 'rgba(255, 255, 255, 0.88)'
        : undefined,
      borderWidth: isGlass ? 1 : undefined,
      borderColor: isGlass
        ? isDark
          ? 'rgba(255, 255, 255, 0.16)'
          : 'rgba(255, 255, 255, 0.65)'
        : undefined,
    },
    passwordToggleBtn: {
      padding: 8,
    },
    strengthSection: {
      gap: 6,
      marginTop: -4,
    },
    strengthBarRow: {
      flexDirection: 'row',
      gap: 4,
      height: 4,
      width: '100%',
    },
    strengthSegment: {
      flex: 1,
      height: '100%',
      borderRadius: 2,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.10)',
    },
    strengthLabelRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    strengthLabel: {
      fontSize: 11,
      fontWeight: '600',
    },
    strengthTip: {
      fontSize: 10.5,
      color: themeColors.textSecondary,
    },
    rememberRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 2,
    },
    rememberLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    rememberText: {
      fontSize: 12.5,
      color: themeColors.text,
      fontWeight: '500',
    },
    forgotText: {
      fontSize: 12,
      color: themeColors.primary,
      fontWeight: '600',
    },
    checkboxBase: {
      width: 18,
      height: 18,
      borderRadius: 5,
      borderWidth: 1.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxActive: {
      borderColor: themeColors.primary,
      backgroundColor: themeColors.primary,
    },
    checkboxInactive: {
      borderColor: themeColors.textSecondary,
      backgroundColor: 'transparent',
    },
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginVertical: 4,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(0, 0, 0, 0.08)',
    },
    dividerText: {
      fontSize: 11,
      color: themeColors.textSecondary,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    biometricBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      borderRadius: radiusTokens.control,
      borderWidth: 1.5,
      borderColor: '#10B98140',
      backgroundColor: '#10B98112',
    },
    biometricLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      flex: 1,
    },
    biometricTitle: {
      fontSize: 13,
      fontWeight: '700',
      color: themeColors.text,
    },
    biometricSubtitle: {
      fontSize: 11,
      color: themeColors.textSecondary,
    },
    socialRow: {
      flexDirection: 'row',
      gap: 12,
    },
    socialBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 11,
      borderRadius: radiusTokens.control,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.10)',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
    },
    socialBtnText: {
      fontSize: 12.5,
      fontWeight: '600',
      color: themeColors.text,
    },
    switchModeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      paddingVertical: 6,
    },
    switchModePrompt: {
      fontSize: 12.5,
      color: themeColors.textSecondary,
    },
    switchModeAction: {
      fontSize: 12.5,
      fontWeight: '700',
      color: themeColors.primary,
    },
    securityTrustCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: radiusTokens.control,
      backgroundColor: isDark ? 'rgba(16, 185, 129, 0.06)' : 'rgba(16, 185, 129, 0.04)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(16, 185, 129, 0.20)' : 'rgba(16, 185, 129, 0.15)',
    },
    securityTrustLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flex: 1,
    },
    securityTrustText: {
      fontSize: 11.5,
      color: themeColors.textSecondary,
      fontWeight: '500',
    },
    securityTrustActionText: {
      fontSize: 11.5,
      fontWeight: '700',
      color: '#10B981',
    },
    securityTrustRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
  });
};
