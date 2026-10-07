import { StyleSheet } from 'react-native';
import type { ThemeColors } from '@/constants/colors';
import { ControlSize, type RadiusPresetConfig } from '@/constants/theme';
import type { SegmentedSize } from './types';

export const createSegmentedStyles = (
  colors: ThemeColors,
  radius: RadiusPresetConfig,
  _isDark: boolean,
  customRadius?: number
) => {
  const isPill = (customRadius !== undefined ? customRadius : radius.control) >= 999;
  const trackRadius = customRadius !== undefined
    ? (isPill ? radius.pill : customRadius)
    : (isPill ? radius.pill : radius.control);
  const itemRadius = isPill
    ? radius.pill
    : Math.max(trackRadius - 3, 2);

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 3,
      borderRadius: trackRadius,
      borderWidth: 1,
    },
    containerDisabled: {
      opacity: 0.45,
    },
    trackStandardLight: {
      backgroundColor: '#F1F5F9',
      borderColor: '#E2E8F0',
    },
    trackStandardDark: {
      backgroundColor: '#1E293B',
      borderColor: '#334155',
    },
    trackGlassLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.45)',
      borderColor: 'rgba(255, 255, 255, 0.65)',
    },
    trackGlassDark: {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    trackPillLight: {
      backgroundColor: 'rgba(238, 242, 246, 0.92)',
      borderColor: 'rgba(203, 213, 225, 0.85)',
    },
    trackPillDark: {
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      borderColor: 'rgba(51, 65, 85, 0.75)',
    },
    trackTonalLight: {
      backgroundColor: `${colors.primary}12`,
      borderColor: `${colors.primary}25`,
    },
    trackTonalDark: {
      backgroundColor: `${colors.primary}20`,
      borderColor: `${colors.primary}35`,
    },
    trackOutlineLight: {
      backgroundColor: 'transparent',
      borderColor: '#CBD5E1',
    },
    trackOutlineDark: {
      backgroundColor: 'transparent',
      borderColor: '#475569',
    },
    fullWidth: {
      width: '100%',
    },

    // Sizes - 100% Size Parity with Design System ControlSize Tokens
    sizeSm: {
      height: ControlSize.sm.height, // 36px
    },
    sizeMd: {
      height: ControlSize.md.height, // 44px (Apple iOS standard touch target)
    },
    sizeLg: {
      height: ControlSize.lg.height, // 52px
    },

    // Item
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      borderRadius: itemRadius,
      gap: 5,
      paddingHorizontal: 8,
    },
    itemFullWidth: {
      flex: 1,
    },
    itemAuto: {
      paddingHorizontal: 14,
    },
    itemActiveLight: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1.5 },
      shadowOpacity: 0.12,
      shadowRadius: 2.5,
      elevation: 2,
    },
    itemActiveDark: {
      backgroundColor: '#334155',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1.5 },
      shadowOpacity: 0.3,
      shadowRadius: 2.5,
      elevation: 2,
    },
    itemActiveGlassLight: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1.5 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    itemActiveGlassDark: {
      backgroundColor: 'rgba(255, 255, 255, 0.16)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.25)',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1.5 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 1,
    },
    itemActivePillLight: {
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: 'rgba(0, 122, 255, 0.25)',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
      elevation: 2,
    },
    itemActivePillDark: {
      backgroundColor: 'rgba(30, 41, 59, 0.95)',
      borderWidth: 1,
      borderColor: 'rgba(0, 122, 255, 0.35)',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.35,
      shadowRadius: 5,
      elevation: 2,
    },
    itemActiveTonalLight: {
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: `${colors.primary}30`,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 1.5 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 1.5,
    },
    itemActiveTonalDark: {
      backgroundColor: `${colors.primary}35`,
      borderWidth: 1,
      borderColor: `${colors.primary}55`,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1.5 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 1.5,
    },
    itemActiveOutlineLight: {
      backgroundColor: '#F8FAFC',
      borderWidth: 1,
      borderColor: colors.primary,
    },
    itemActiveOutlineDark: {
      backgroundColor: '#1E293B',
      borderWidth: 1,
      borderColor: colors.primary,
    },
    itemDisabled: {
      opacity: 0.35,
    },

    // Labels
    labelText: {
      fontWeight: '600',
      color: colors.textSecondary,
    },
    labelActiveText: {
      fontWeight: '700',
      color: colors.primary,
    },
    textSm: {
      fontSize: 11,
    },
    textMd: {
      fontSize: 12.5,
    },
    textLg: {
      fontSize: 14,
    },

    // Badges
    badge: {
      paddingHorizontal: 5,
      paddingVertical: 1.5,
      borderRadius: 10,
      backgroundColor: 'rgba(99, 102, 241, 0.12)',
    },
    badgeActive: {
      backgroundColor: `${colors.primary}20`,
    },
    badgeText: {
      fontSize: 9.5,
      fontWeight: '700',
      color: colors.textSecondary,
    },
    badgeTextActive: {
      color: colors.primary,
    },
  });
};

export const getSizeStyles = (size: SegmentedSize, styles: ReturnType<typeof createSegmentedStyles>) => {
  switch (size) {
    case 'sm':
      return { container: styles.sizeSm, text: styles.textSm };
    case 'lg':
      return { container: styles.sizeLg, text: styles.textLg };
    default:
      return { container: styles.sizeMd, text: styles.textMd };
  }
};
