import { StyleSheet } from 'react-native';
import { AppleColors, AppleGlassTokens } from '@/constants/appleTheme';
import { Spacing } from '@/constants/theme';

export const createGlassCardStyles = (
  isDark: boolean,
  accentColor?: string,
  radius?: number
) => {
  const bg = isDark ? AppleColors.glassDark : AppleColors.glassLight;
  const borderColor = isDark ? AppleColors.glassBorderDark : AppleColors.glassBorderLight;
  const shadow = isDark ? AppleGlassTokens.shadows.dark : AppleGlassTokens.shadows.light;
  const cardRadius = Math.min(radius ?? AppleGlassTokens.borderRadius, 16);

  return StyleSheet.create({
    container: {
      backgroundColor: bg,
      borderRadius: cardRadius,
      borderWidth: AppleGlassTokens.borderWidth,
      borderColor: borderColor,
      padding: Spacing.lg,
      marginVertical: Spacing.sm,
      overflow: 'hidden',
      ...shadow,
    },
    accentGlow: {
      position: 'absolute',
      top: -40,
      right: -40,
      width: 130,
      height: 130,
      borderRadius: 65,
      backgroundColor: accentColor || (isDark ? AppleColors.glassAccentDark : AppleColors.glassAccentLight),
      opacity: isDark ? 0.25 : 0.08,
      pointerEvents: 'none',
    },
    content: {
      zIndex: 1,
    },
  });
};
