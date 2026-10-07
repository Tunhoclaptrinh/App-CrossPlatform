import { StyleSheet } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';
import type { GlassTileSize } from './types';

export const GLASS_TILE_SIZES: Record<
  GlassTileSize,
  {
    padding: number;
    iconSize: number;
    badgeSize: number;
    valueSize: number;
    labelSize: number;
  }
> = {
  sm: { padding: 10, iconSize: 15, badgeSize: 26, valueSize: 13, labelSize: 10 },
  md: { padding: 14, iconSize: 18, badgeSize: 32, valueSize: 14.5, labelSize: 11 },
  lg: { padding: 18, iconSize: 22, badgeSize: 38, valueSize: 17, labelSize: 12.5 },
};

export const createGlassTileStyles = (
  isDark: boolean,
  cardRadius: number,
  size: GlassTileSize = 'md',
  contrast: ControlContrast = 'normal',
  borderRadiusOverride?: number
) => {
  const isHigh = contrast === 'high';
  const sizeConfig = GLASS_TILE_SIZES[size] || GLASS_TILE_SIZES.md;
  const resolvedRadius = borderRadiusOverride !== undefined ? borderRadiusOverride : Math.min(cardRadius, 14);

  let borderColor = isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.85)';
  if (isHigh) {
    borderColor = isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.25)';
  }

  return StyleSheet.create({
    tile: {
      flex: 1,
      backgroundColor: isDark ? 'rgba(28, 31, 42, 0.70)' : 'rgba(255, 255, 255, 0.65)',
      borderRadius: resolvedRadius,
      borderWidth: isHigh ? 1.5 : 1.2,
      borderColor,
      padding: sizeConfig.padding,
      gap: 6,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.25 : 0.05,
      shadowRadius: 8,
      elevation: 0,
      position: 'relative',
      overflow: 'hidden',
    },
    blurBackdrop: {
      ...StyleSheet.absoluteFill,
      borderRadius: resolvedRadius,
    },
    androidBackdropDark: {
      ...StyleSheet.absoluteFill,
      borderRadius: resolvedRadius,
      backgroundColor: 'rgba(30, 41, 59, 0.75)',
    },
    androidBackdropLight: {
      ...StyleSheet.absoluteFill,
      borderRadius: resolvedRadius,
      backgroundColor: 'rgba(255, 255, 255, 0.82)',
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
      width: sizeConfig.badgeSize,
      height: sizeConfig.badgeSize,
      borderRadius: sizeConfig.badgeSize / 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    valueText: {
      fontSize: sizeConfig.valueSize,
      fontWeight: '800',
      color: isDark ? '#FFFFFF' : '#0F172A',
      letterSpacing: -0.2,
    },
    labelText: {
      fontSize: sizeConfig.labelSize,
      fontWeight: isHigh ? '600' : '500',
      color: isHigh
        ? (isDark ? '#CBD5E1' : '#334155')
        : (isDark ? '#94A3B8' : '#64748B'),
      lineHeight: Math.round(sizeConfig.labelSize * 1.35),
    },
  });
};
