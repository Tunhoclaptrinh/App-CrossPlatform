import { StyleSheet } from 'react-native';
import type { ThemeColors } from '@/constants/colors';
import type { AccordionVariant, AppAccordionSize } from './types';
import type { ControlContrast } from '../surfaceUtils';

export const ACCORDION_SIZES: Record<
  AppAccordionSize,
  {
    headerPaddingVertical: number;
    headerPaddingHorizontal: number;
    titleSize: number;
    subtitleSize: number;
    iconBoxSize: number;
    chevronSize: number;
    contentPadding: number;
  }
> = {
  sm: { headerPaddingVertical: 10, headerPaddingHorizontal: 12, titleSize: 13.5, subtitleSize: 11, iconBoxSize: 24, chevronSize: 14, contentPadding: 12 },
  md: { headerPaddingVertical: 14, headerPaddingHorizontal: 16, titleSize: 15, subtitleSize: 12, iconBoxSize: 28, chevronSize: 18, contentPadding: 16 },
  lg: { headerPaddingVertical: 18, headerPaddingHorizontal: 20, titleSize: 16.5, subtitleSize: 13.5, iconBoxSize: 32, chevronSize: 22, contentPadding: 20 },
};

export const createAccordionStyles = (
  theme: ThemeColors,
  isDark: boolean,
  cardRadius: number,
  variant: AccordionVariant = 'card',
  contrast: ControlContrast = 'normal',
  size: AppAccordionSize = 'md',
  borderRadiusOverride?: number
) => {
  const isHigh = contrast === 'high';
  const sizeConfig = ACCORDION_SIZES[size] || ACCORDION_SIZES.md;

  let backgroundColor = isDark ? '#1E2433' : '#FFFFFF';
  let borderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)';
  let borderWidth = isHigh ? 1.5 : 1;

  if (variant === 'clean') {
    backgroundColor = 'transparent';
    borderWidth = 0;
  } else if (variant === 'glass') {
    backgroundColor = isDark ? 'rgba(26, 34, 52, 0.75)' : 'rgba(255, 255, 255, 0.82)';
    borderColor = isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.85)';
  } else if (isHigh) {
    borderColor = isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.32)';
  }

  const resolvedRadius = borderRadiusOverride !== undefined ? borderRadiusOverride : Math.min(cardRadius, 16);

  return StyleSheet.create({
    container: {
      borderRadius: resolvedRadius,
      backgroundColor,
      borderWidth,
      borderColor,
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: sizeConfig.headerPaddingHorizontal,
      paddingVertical: sizeConfig.headerPaddingVertical,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flex: 1,
    },
    iconBox: {
      width: sizeConfig.iconBoxSize,
      height: sizeConfig.iconBoxSize,
      borderRadius: Math.round(sizeConfig.iconBoxSize * 0.25),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: `${theme.primary}15`,
    },
    titleCol: {
      flex: 1,
    },
    title: {
      fontSize: sizeConfig.titleSize,
      fontWeight: isHigh ? '700' : '600',
      color: theme.text,
      letterSpacing: -0.2,
    },
    subtitle: {
      fontSize: sizeConfig.subtitleSize,
      color: isHigh
        ? (isDark ? 'rgba(255, 255, 255, 0.85)' : '#334155')
        : theme.textSecondary,
      marginTop: 2,
    },
    contentWrapper: {
      paddingHorizontal: sizeConfig.contentPadding,
      paddingBottom: sizeConfig.contentPadding,
      paddingTop: 4,
    },
  });
};
