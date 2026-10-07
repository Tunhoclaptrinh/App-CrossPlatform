import { StyleSheet } from 'react-native';
import { AppleGlassTokens } from '@/constants/appleTheme';
import { Spacing } from '@/constants/theme';

export const createGlassCardStyles = (
  isDark: boolean,
  _accentColor?: string,
  radius?: number
) => {
  const shadow = isDark ? AppleGlassTokens.shadows.dark : AppleGlassTokens.shadows.light;
  const cardRadius = Math.min(radius ?? AppleGlassTokens.borderRadius, 16);

  return StyleSheet.create({
    container: {
      borderRadius: cardRadius,
      borderWidth: 0,
      padding: Spacing.lg,
      overflow: 'hidden',
      position: 'relative',
      ...shadow,
    },
    blurBackdrop: {
      ...StyleSheet.absoluteFill,
      borderRadius: cardRadius,
    },
    androidBackdropDark: {
      ...StyleSheet.absoluteFill,
      borderRadius: cardRadius,
      backgroundColor: 'rgba(18, 22, 36, 0.72)',
    },
    androidBackdropLight: {
      ...StyleSheet.absoluteFill,
      borderRadius: cardRadius,
      backgroundColor: 'rgba(255, 255, 255, 0.58)',
    },
    gradientSurface: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: cardRadius,
    },
    content: {
      zIndex: 3,
    },
  });
};
