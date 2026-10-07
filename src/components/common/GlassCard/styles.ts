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
  const bgColor = isDark
    ? 'rgba(16, 20, 38, 0.62)'
    : 'rgba(255, 255, 255, 0.52)';

  return StyleSheet.create({
    container: {
      borderRadius: cardRadius,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.65)',
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
