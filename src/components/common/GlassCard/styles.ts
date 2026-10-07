import { StyleSheet } from 'react-native';
import { AppleGlassTokens } from '@/constants/appleTheme';
import { Spacing } from '@/constants/theme';

import type { ControlContrast } from '../surfaceUtils';

export const createGlassCardStyles = (
  isDark: boolean,
  _accentColor?: string,
  radius?: number,
  contrast: ControlContrast = 'normal'
) => {
  const shadow = isDark ? AppleGlassTokens.shadows.dark : AppleGlassTokens.shadows.light;
  const cardRadius = Math.min(radius ?? AppleGlassTokens.borderRadius, 16);
  const bgColor = isDark
    ? 'rgba(16, 20, 38, 0.62)'
    : 'rgba(255, 255, 255, 0.52)';

  const borderWidth = contrast === 'high' ? 1.5 : contrast === 'subtle' ? 0.8 : 1;
  const borderColor =
    contrast === 'high'
      ? isDark ? 'rgba(255, 255, 255, 0.40)' : 'rgba(255, 255, 255, 0.95)'
      : contrast === 'subtle'
      ? isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.45)'
      : isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.75)';

  return StyleSheet.create({
    container: {
      borderRadius: cardRadius,
      borderWidth,
      borderColor,
      backgroundColor: bgColor,
      padding: Spacing.lg,
      overflow: 'hidden',
      position: 'relative',
      ...shadow,
    },
    content: {
      zIndex: 1,
    },
  });
};
