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

const AppCardComponent: React.FC<AppCardProps> = ({
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

  const cardVariantStyle = React.useMemo(
    () =>
      createCardVariantStyle({
        variant: effectiveVariant,
        themeColors,
        isDark,
        contrast: effectiveContrast,
        shadow: effectiveShadow,
        borderWidth,
        borderColor,
        backgroundColor,
      }),
    [
      effectiveVariant,
      themeColors,
      isDark,
      effectiveContrast,
      effectiveShadow,
      borderWidth,
      borderColor,
      backgroundColor,
    ]
  );

  const resolvedPadding = React.useMemo(() => {
    let pad = Spacing[padding];
    if (size === 'sm') pad = Spacing.sm;
    else if (size === 'md') pad = Spacing.md;
    else if (size === 'lg') pad = Spacing.lg;
    if (padding !== 'base') pad = Spacing[padding];
    return pad;
  }, [padding, size]);

  const cardStyle: ViewStyle = React.useMemo(
    () => ({
      borderRadius: cardRadius,
      padding: resolvedPadding,
      ...cardVariantStyle,
    }),
    [cardRadius, resolvedPadding, cardVariantStyle]
  );

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

export const AppCard = React.memo(AppCardComponent);

