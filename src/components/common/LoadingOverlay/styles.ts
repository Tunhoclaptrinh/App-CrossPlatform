import { StyleSheet, ViewStyle, Platform } from 'react-native';
import { Spacing } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';
import type { ControlContrast } from '../surfaceUtils';
import type { LoadingVariant } from './types';

export const styles = StyleSheet.create({
  fullscreenRoot: {
    ...StyleSheet.absoluteFill,
    zIndex: 9999,
  },
  inlineRoot: {
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  contentWrapper: {
    ...StyleSheet.absoluteFill,
    paddingHorizontal: Spacing.lg,
  },
  posCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  posTop: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 44,
  },
  posBottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 48,
  },
  boxBase: {
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxCard: {
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 24,
    width: '88%',
    minWidth: 260,
    maxWidth: 320,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.10,
        shadowRadius: 18,
      },
    }),
  },
  boxGlass: {
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 24,
    width: '88%',
    minWidth: 260,
    maxWidth: 320,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.10,
        shadowRadius: 18,
      },
    }),
  },
  boxPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
    minWidth: 220,
    maxWidth: 340,
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
    }),
  },
  boxMinimal: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  // Seamless Concentric Indicator Housing (Clean, unified surface)
  indicatorHousing: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  indicatorHousingPill: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerCenterDot: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  // Typography
  messageCol: {
    alignItems: 'center',
    width: '100%',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  messageText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: -0.2,
  },
  subMessageText: {
    textAlign: 'center',
    fontSize: 12.5,
    lineHeight: 18,
    marginTop: 5,
  },
  // Progress Architecture (Apple Progress Bar)
  progressSection: {
    width: '100%',
    marginTop: 18,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressStatusLabel: {
    fontSize: 11.5,
    fontWeight: '500',
  },
  progressBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 999,
  },
  progressBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  progressBarTrack: {
    width: '100%',
    height: 6,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBarTrackDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  progressBarTrackLight: {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 999,
  },
  pillProgressBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  // Pulse Animation
  pulseContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  pulseRing: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
  },
  pulseCore: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  // Dots Animation
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export const getVariantContainerStyle = (
  variant: LoadingVariant,
  themeColors: ThemeColors,
  radiusTokens: RadiusPresetConfig,
  isDark: boolean,
  isGlassTheme: boolean = false,
  resolvedRadiusOverride?: number,
  contrast: ControlContrast = 'normal'
): ViewStyle => {
  const effectiveVariant = isGlassTheme && variant === 'card' ? 'glass' : variant;
  const cardRadius = resolvedRadiusOverride !== undefined ? resolvedRadiusOverride : radiusTokens.card;
  const pillRadius = resolvedRadiusOverride !== undefined ? resolvedRadiusOverride : radiusTokens.pill;
  const isHighContrast = contrast === 'high';

  switch (effectiveVariant) {
    case 'glass':
      return {
        borderRadius: cardRadius,
        backgroundColor: Platform.select({
          android: isDark ? '#171B26' : '#FFFFFF',
          default: isDark ? 'rgba(22, 27, 40, 0.88)' : 'rgba(255, 255, 255, 0.90)',
        }),
        borderColor: isHighContrast
          ? (isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.20)')
          : (isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 0, 0, 0.08)'),
        borderWidth: isHighContrast ? 1.5 : 1,
      };
    case 'pill':
      return {
        borderRadius: pillRadius,
        backgroundColor: isDark ? '#161B26' : '#FFFFFF',
        borderColor: isHighContrast
          ? (isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.20)')
          : (isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'),
        borderWidth: isHighContrast ? 1.5 : 1,
      };
    case 'minimal':
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
      };
    case 'card':
    default:
      return {
        borderRadius: cardRadius,
        backgroundColor: themeColors.card,
        borderColor: isHighContrast
          ? (isDark ? '#64748B' : '#94A3B8')
          : (isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'),
        borderWidth: isHighContrast ? 1.5 : 1,
      };
  }
};
