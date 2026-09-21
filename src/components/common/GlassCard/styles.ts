import { StyleSheet } from 'react-native';
import { AppleColors, AppleGlassTokens } from '@/constants/appleTheme';
import { Spacing } from '@/constants/theme';

export const createGlassCardStyles = (isDark: boolean, accentColor?: string) => {
  const bg = isDark ? AppleColors.glassDark : AppleColors.glassLight;
  const borderColor = isDark ? AppleColors.glassBorderDark : AppleColors.glassBorderLight;
  const shadow = isDark ? AppleGlassTokens.shadows.dark : AppleGlassTokens.shadows.light;

  return StyleSheet.create({
    container: {
      backgroundColor: bg,
      borderRadius: AppleGlassTokens.borderRadius,
      borderWidth: AppleGlassTokens.borderWidth,
      borderColor: borderColor,
      padding: Spacing.lg,
      marginVertical: Spacing.sm,
      overflow: 'hidden',
      ...shadow,
    },
    accentGlow: {
      position: 'absolute',
      top: -30,
      right: -30,
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: accentColor || (isDark ? AppleColors.glassAccentDark : AppleColors.glassAccentLight),
      opacity: 0.8,
    },
    content: {
      zIndex: 1,
    },
  });
};
