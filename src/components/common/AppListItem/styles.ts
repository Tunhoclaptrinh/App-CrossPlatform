import { StyleSheet, Platform } from 'react-native';
import type { ThemeColors } from '@/constants/colors';
import type { ControlContrast } from '../surfaceUtils';
import type { AppListItemSize, AppListItemVariant } from './types';

export const LIST_ITEM_SIZES: Record<
  AppListItemSize,
  {
    minHeight: number;
    paddingHorizontal: number;
    paddingVertical: number;
    titleSize: number;
    subtitleSize: number;
    leadingMargin: number;
    iconTileSize: number;
    iconTileRadius: number;
  }
> = {
  sm: { minHeight: 44, paddingHorizontal: 14, paddingVertical: 8, titleSize: 13.5, subtitleSize: 11.5, leadingMargin: 10, iconTileSize: 32, iconTileRadius: 10 },
  md: { minHeight: 56, paddingHorizontal: 16, paddingVertical: 12, titleSize: 15, subtitleSize: 12.5, leadingMargin: 12, iconTileSize: 40, iconTileRadius: 12 },
  lg: { minHeight: 68, paddingHorizontal: 18, paddingVertical: 14, titleSize: 16.5, subtitleSize: 13.5, leadingMargin: 14, iconTileSize: 48, iconTileRadius: 14 },
};

export const createListItemStyles = (
  theme: ThemeColors,
  isDark: boolean,
  disabled: boolean = false,
  contrast: ControlContrast = 'normal',
  size: AppListItemSize = 'md',
  variant: AppListItemVariant = 'standard',
  cardRadius: number = 16,
  borderRadiusOverride?: number
) => {
  const isHigh = contrast === 'high';
  const sizeConfig = LIST_ITEM_SIZES[size] || LIST_ITEM_SIZES.md;
  const isCard = variant === 'card';
  const isGlass = variant === 'glass';

  const resolvedRadius =
    borderRadiusOverride !== undefined
      ? borderRadiusOverride
      : Math.max(6, cardRadius - 2);

  let containerBg = 'transparent';
  let containerBorderWidth = 0;
  let containerBorderColor = 'transparent';

  if (isCard) {
    containerBg = isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF';
    containerBorderWidth = isHigh ? 1.5 : 1;
    containerBorderColor = isHigh
      ? isDark
        ? 'rgba(255, 255, 255, 0.35)'
        : 'rgba(0, 0, 0, 0.28)'
      : isDark
      ? 'rgba(255, 255, 255, 0.10)'
      : 'rgba(0, 0, 0, 0.06)';
  } else if (isGlass) {
    containerBg = isDark ? 'rgba(26, 34, 52, 0.75)' : 'rgba(255, 255, 255, 0.82)';
    containerBorderWidth = 1;
    containerBorderColor = isDark
      ? 'rgba(255, 255, 255, 0.22)'
      : 'rgba(255, 255, 255, 0.85)';
  }

  return StyleSheet.create({
    container: {
      minHeight: sizeConfig.minHeight,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: sizeConfig.paddingHorizontal,
      paddingVertical: sizeConfig.paddingVertical,
      borderRadius: (isCard || isGlass) ? resolvedRadius : undefined,
      backgroundColor: containerBg,
      borderWidth: containerBorderWidth,
      borderColor: containerBorderColor,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: (isCard || isGlass) ? 1 : 0 },
      shadowOpacity: (isCard || isGlass) ? (isDark ? 0.2 : 0.04) : 0,
      shadowRadius: (isCard || isGlass) ? 2 : 0,
      elevation: 0,
      opacity: disabled ? 0.45 : 1,
    },
    leadingBox: {
      marginRight: sizeConfig.leadingMargin,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconTile: {
      width: sizeConfig.iconTileSize,
      height: sizeConfig.iconTileSize,
      borderRadius: sizeConfig.iconTileRadius,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },
    contentCol: {
      flex: 1,
      justifyContent: 'center',
      gap: 2,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      flexWrap: 'wrap',
    },
    title: {
      fontSize: sizeConfig.titleSize,
      fontWeight: isHigh ? '700' : '600',
      color: theme.text,
      letterSpacing: -0.2,
    },
    titleDestructive: {
      color: '#EF4444',
    },
    badge: {
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 999,
    },
    badgeText: {
      fontSize: 9.5,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
    subtitle: {
      fontSize: sizeConfig.subtitleSize,
      color: isHigh
        ? (isDark ? 'rgba(255, 255, 255, 0.85)' : '#334155')
        : theme.textSecondary,
      lineHeight: sizeConfig.subtitleSize * 1.35,
    },
    trailingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
      gap: 6,
    },
    valueText: {
      fontSize: sizeConfig.subtitleSize + 1,
      color: isHigh ? theme.text : theme.textSecondary,
      fontWeight: isHigh ? '600' : '400',
    },
    divider: {
      height: isHigh ? 1 : StyleSheet.hairlineWidth,
      backgroundColor: isHigh
        ? isDark ? 'rgba(255, 255, 255, 0.30)' : 'rgba(0, 0, 0, 0.25)'
        : isDark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(0, 0, 0, 0.08)',
    },
  });
};

export const createListGroupStyles = (
  theme: ThemeColors,
  isDark: boolean,
  cardRadius: number,
  variant: 'card' | 'glass' | 'clean' = 'card',
  contrast: ControlContrast = 'normal',
  borderRadiusOverride?: number
) => {
  const isHigh = contrast === 'high';
  const isGlass = variant === 'glass';

  let backgroundColor = theme.card || (isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF');
  let borderColor = isDark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(0, 0, 0, 0.06)';
  let borderWidth = isHigh ? 1.5 : 1;

  if (variant === 'clean') {
    backgroundColor = 'transparent';
    borderWidth = 0;
  } else if (isGlass) {
    backgroundColor = isDark ? 'rgba(24, 27, 38, 0.70)' : 'rgba(255, 255, 255, 0.72)';
    borderColor = isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.88)';
  } else if (isHigh) {
    borderColor = isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.28)';
  }

  const resolvedRadius =
    borderRadiusOverride !== undefined ? borderRadiusOverride : cardRadius;

  return StyleSheet.create({
    groupWrapper: {
      marginBottom: 16,
      width: '100%',
    },
    groupHeaderTitle: {
      fontSize: 12,
      fontWeight: '700',
      color: isHigh ? theme.text : theme.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      marginBottom: 8,
      paddingHorizontal: 16,
    },
    groupContainer: {
      borderRadius: resolvedRadius,
      backgroundColor,
      borderWidth,
      borderColor,
      overflow: 'hidden',
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: variant === 'clean' ? 0 : isDark ? 0.2 : 0.04,
          shadowRadius: 2,
        },
        android: {
          elevation: 0,
        },
      }),
    },
    groupFooterText: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 6,
      paddingHorizontal: 16,
    },
  });
};
