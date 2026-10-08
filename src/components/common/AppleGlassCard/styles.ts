import { StyleSheet } from 'react-native';
import { Spacing } from '@/constants/theme';
import type { ControlContrast } from '../surfaceUtils';
import type { AppleGlassCardSize } from './types';

export const createAppleGlassCardStyles = (
  isDark: boolean,
  cardRadius: number,
  size: AppleGlassCardSize = 'md',
  contrast: ControlContrast = 'normal',
  borderRadiusOverride?: number
) => {
  const isHigh = contrast === 'high';
  const resolvedRadius = borderRadiusOverride !== undefined ? borderRadiusOverride : cardRadius;


  let height = 172;
  let padding: number = Spacing.lg;
  let balanceFontSize = 22;
  if (size === 'sm') {
    height = 144;
    padding = 14;
    balanceFontSize = 18;
  } else if (size === 'lg') {
    height = 200;
    padding = 24;
    balanceFontSize = 26;
  }

  let borderColor = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.88)';
  if (isHigh) {
    borderColor = isDark ? 'rgba(255, 255, 255, 0.50)' : 'rgba(0, 0, 0, 0.25)';
  }

  return StyleSheet.create({
    container: {
      height,
      borderRadius: resolvedRadius,
      padding,
      justifyContent: 'space-between',
      borderWidth: isHigh ? 1.5 : 1,
      borderColor,
      backgroundColor: isDark ? 'rgba(24, 27, 38, 0.68)' : 'rgba(255, 255, 255, 0.64)',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: isDark ? 0.35 : 0.08,
      shadowRadius: 16,
      elevation: 0,
      overflow: 'hidden',
      position: 'relative',
    },
    blurBackdrop: {
      ...StyleSheet.absoluteFill,
      borderRadius: resolvedRadius,
    },
    androidBackdropDark: {
      ...StyleSheet.absoluteFill,
      borderRadius: resolvedRadius,
      backgroundColor: 'rgba(24, 27, 38, 0.88)',
    },
    androidBackdropLight: {
      ...StyleSheet.absoluteFill,
      borderRadius: resolvedRadius,
      backgroundColor: 'rgba(255, 255, 255, 0.82)',
    },
    specularHighlight: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 1.2,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.98)',
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    chipGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    // Authentic EMV Smart Chip with golden contacts
    emvChip: {
      width: 32,
      height: 24,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#D97706',
      backgroundColor: '#FDE68A',
      position: 'relative',
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    emvLineH: {
      position: 'absolute',
      width: '100%',
      height: 1,
      backgroundColor: 'rgba(180, 83, 9, 0.4)',
    },
    emvLineV: {
      position: 'absolute',
      height: '100%',
      width: 1,
      backgroundColor: 'rgba(180, 83, 9, 0.4)',
    },
    emvInnerPad: {
      width: 12,
      height: 10,
      borderRadius: 2,
      borderWidth: 1,
      borderColor: 'rgba(180, 83, 9, 0.5)',
      backgroundColor: '#FEF3C7',
    },
    nfcIcon: {
      transform: [{ rotate: '90deg' }],
    },
    brandGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    brandText: {
      fontSize: 13.5,
      fontWeight: '800',
      color: isDark ? '#FFFFFF' : '#0F172A',
      letterSpacing: -0.2,
    },
    balanceGroup: {
      gap: 2,
    },
    balanceLabel: {
      fontSize: 10,
      fontWeight: '700',
      color: isDark ? '#94A3B8' : '#64748B',
      letterSpacing: 0.6,
      textTransform: 'uppercase',
    },
    balanceVal: {
      fontSize: balanceFontSize,
      lineHeight: balanceFontSize + 6,
      fontWeight: '800',
      color: isDark ? '#FFFFFF' : '#0F172A',
      letterSpacing: -0.5,
    },
    bottomRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    cardInfoGroup: {
      gap: 2,
    },
    cardNumber: {
      fontSize: 12,
      fontFamily: 'monospace',
      fontWeight: '600',
      color: isDark ? 'rgba(255, 255, 255, 0.85)' : '#334155',
      letterSpacing: 1.5,
    },
    cardHolder: {
      fontSize: 9.5,
      fontWeight: '700',
      color: isDark ? '#94A3B8' : '#64748B',
      letterSpacing: 0.6,
      textTransform: 'uppercase',
    },
  });
};
