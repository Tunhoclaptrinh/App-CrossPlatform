import React from 'react';
import {
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
import type { AppCardProps } from './types';
import { styles, createCardVariantStyle } from './styles';

export const AppCard: React.FC<AppCardProps> = ({
  children,
  variant = 'elevated',
  size,
  radius,
  padding = 'base',
  contrast,
  shadow,
  borderWidth,
  borderColor,
  backgroundColor,
  borderRadius,
  onPress,
  style,
}) => {
  const {
    theme: themeColors,
    radiusTokens,
    isDark,
    globalContrast,
    globalShadow,
  } = useThemeMode();
  const { themeStyle } = useAppStore();
  const isGlassTheme = themeStyle === 'apple-glass';

  // In Apple Glass mode, all cards automatically adopt the Liquid Glass specular highlight
  const isGlassCard = isGlassTheme || variant === 'glass';
  const effectiveVariant = isGlassTheme ? 'glass' : variant;
  const effectiveContrast = contrast ?? globalContrast ?? 'normal';
  const effectiveShadow = shadow ?? (globalShadow !== 'none' ? globalShadow : undefined);

  const cardRadius =
    borderRadius !== undefined
      ? borderRadius
      : radius
      ? BorderRadius[radius]
      : radiusTokens.card;

  const cardVariantStyle = createCardVariantStyle({
    variant: effectiveVariant,
    themeColors,
    isDark,
    contrast: effectiveContrast,
    shadow: effectiveShadow,
    borderWidth,
    borderColor,
    backgroundColor,
  });

  let resolvedPadding = Spacing[padding];
  if (size === 'sm') resolvedPadding = Spacing.sm;
  else if (size === 'md') resolvedPadding = Spacing.md;
  else if (size === 'lg') resolvedPadding = Spacing.lg;
  if (padding !== 'base') resolvedPadding = Spacing[padding];

  const cardStyle: ViewStyle = {
    borderRadius: cardRadius,
    padding: resolvedPadding,
    ...cardVariantStyle,
  };

  const highlightElement = isGlassCard ? (
    <View
      style={[
        styles.specularHighlight,
        isDark ? styles.specularHighlightDark : styles.specularHighlightLight,
      ]}
    />
  ) : null;

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={onPress}
        style={[styles.base, cardStyle, style]}
      >
        {highlightElement}
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.base, cardStyle, style]}>
      {highlightElement}
      {children}
    </View>
  );
};
