import { StyleSheet } from 'react-native';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

export const createGestureCardStyles = (
  _themeColors: ThemeColors,
  radius: RadiusPresetConfig,
  _isDark: boolean = false
) => {
  const cardRadius = Math.min(radius.card, 16);
  const padRadius = Math.max(4, cardRadius - 4);
  const hintRadius = Math.max(4, Math.min(radius.smControl, 8));
  const iconRadius = Math.max(4, Math.min(radius.smControl * 1.5, 12));

  return StyleSheet.create({
    cardContent: {
      gap: 14,
    },
    card: {
      borderRadius: cardRadius,
      padding: 16,
      borderWidth: 1,
      gap: 14,
      position: 'relative',
      overflow: 'hidden',
    },
    cardLight: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E2E8F0',
    },
    cardDark: {
      backgroundColor: '#111827',
      borderColor: '#1F2937',
    },
    cardGlassLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.72)',
      borderColor: 'rgba(255, 255, 255, 0.88)',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 0,
    },
    cardGlassDark: {
      backgroundColor: 'rgba(24, 27, 38, 0.70)',
      borderColor: 'rgba(255, 255, 255, 0.22)',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 0,
    },
    specularHighlight: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 1.2,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    },
    specularHighlightDark: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 1.2,
      backgroundColor: 'rgba(255, 255, 255, 0.38)',
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    iconBox: {
      width: 38,
      height: 38,
      borderRadius: iconRadius,
      backgroundColor: 'rgba(0, 122, 255, 0.15)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleTextCol: {
      flex: 1,
      gap: 2,
    },
    title: {
      fontSize: 16,
      fontWeight: '800',
      letterSpacing: -0.2,
    },
    subtitle: {
      fontSize: 12,
      lineHeight: 16,
    },
    touchPad: {
      borderRadius: padRadius,
      padding: 14,
      borderWidth: 1,
      gap: 12,
      alignItems: 'center',
    },
    touchPadLight: {
      backgroundColor: '#F8FAFC',
      borderColor: '#E2E8F0',
    },
    touchPadDark: {
      backgroundColor: '#1E293B',
      borderColor: '#334155',
    },
    touchPadGlassLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.65)',
      borderColor: 'rgba(255, 255, 255, 0.85)',
    },
    touchPadGlassDark: {
      backgroundColor: 'rgba(30, 41, 59, 0.55)',
      borderColor: 'rgba(255, 255, 255, 0.16)',
    },
    feedbackText: {
      fontSize: 13,
      fontWeight: '700',
      textAlign: 'center',
    },
    gestureHints: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 8,
      width: '100%',
    },
    hintBadge: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 7,
      paddingHorizontal: 4,
      borderRadius: hintRadius,
      borderWidth: 1,
    },
    hintBadgeLight: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E2E8F0',
    },
    hintBadgeDark: {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    hintBadgeGlassLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderColor: 'rgba(255, 255, 255, 0.9)',
    },
    hintBadgeGlassDark: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderColor: 'rgba(255, 255, 255, 0.12)',
    },
    hintText: {
      fontSize: 11.5,
      fontWeight: '600',
    },
  });
};
