import { StyleSheet } from 'react-native';
import { AppleGlassTokens } from '@/constants/appleTheme';
import { Spacing } from '@/constants/theme';

export const createGlassCardStyles = (
  isDark: boolean,
  _accentColor?: string,
  radius?: number
) => {
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.85)';
  const shadow = isDark ? AppleGlassTokens.shadows.dark : AppleGlassTokens.shadows.light;
  const cardRadius = Math.min(radius ?? AppleGlassTokens.borderRadius, 16);

  return StyleSheet.create({
    container: {
      borderRadius: cardRadius,
      borderWidth: AppleGlassTokens.borderWidth,
      borderColor: borderColor,
      padding: Spacing.lg,
      marginVertical: Spacing.sm,
      overflow: 'hidden',
      position: 'relative',
      ...shadow,
    },
    gradientSurface: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: cardRadius,
    },
    specularHighlight: {
      position: 'absolute',
      top: 0,
      left: 14,
      right: 14,
      height: 1.2,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.28)' : 'rgba(255, 255, 255, 0.95)',
      borderRadius: 1,
      zIndex: 2,
    },
    content: {
      zIndex: 3,
    },
  });
};
