import { StyleSheet } from 'react-native';
import { Spacing } from '@/constants/theme';

export const createGlassTileStyles = (isDark: boolean, cardRadius: number) =>
  StyleSheet.create({
    tile: {
      flex: 1,
      backgroundColor: isDark ? 'rgba(28, 31, 42, 0.65)' : 'rgba(255, 255, 255, 0.60)',
      borderRadius: Math.min(cardRadius, 14),
      borderWidth: 1.2,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.80)',
      padding: Spacing.md,
      gap: 6,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.25 : 0.05,
      shadowRadius: 8,
      elevation: 0,
      position: 'relative',
      overflow: 'hidden',
    },
    specularHairline: {
      position: 'absolute',
      top: 0,
      left: 8,
      right: 8,
      height: 1,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(255, 255, 255, 0.95)',
      borderRadius: 1,
    },
    iconBadge: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    valueText: {
      fontSize: 14.5,
      fontWeight: '800',
      color: isDark ? '#FFFFFF' : '#0F172A',
      letterSpacing: -0.2,
    },
    labelText: {
      fontSize: 11,
      color: isDark ? '#94A3B8' : '#64748B',
      fontWeight: '500',
      lineHeight: 15,
    },
  });
