import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { BorderRadius, Spacing } from '@/constants/theme';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
import type { AppCardProps } from './types';
import {
  styles,
  createCardVariantStyle,
  createCardLayoutStyle,
} from './styles';
import { resolveSurfaceColors } from '../surfaceUtils';

const AppCardComponent: React.FC<AppCardProps> = ({
  children,
  variant = 'elevated',
  surface = 'theme',
  gap = 'none',
  testID,
  accessibilityLabel,
  accessibilityHint,
  disabled = false,
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
  const isGlassTheme = surface === 'theme' && themeStyle === 'apple-glass';
  const surfaceColors = React.useMemo(
    () => resolveSurfaceColors(themeColors, isDark, surface),
    [themeColors, isDark, surface],
  );

  // In Apple Glass mode, all cards automatically adopt the Liquid Glass specular highlight
  const effectiveVariant =
    surface === 'solid' && variant === 'glass'
      ? 'outlined'
      : isGlassTheme
      ? 'glass'
      : variant;
  const isGlassCard = effectiveVariant === 'glass';
  const effectiveContrast = contrast ?? globalContrast ?? 'normal';
  const effectiveShadow =
    shadow ?? (globalShadow !== 'none' ? globalShadow : undefined);

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
        themeColors: surfaceColors,
        isDark,
        contrast: effectiveContrast,
        shadow: effectiveShadow,
        borderWidth,
        borderColor,
        backgroundColor,
      }),
    [
      effectiveVariant,
      surfaceColors,
      isDark,
      effectiveContrast,
      effectiveShadow,
      borderWidth,
      borderColor,
      backgroundColor,
    ],
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
    () =>
      createCardLayoutStyle(
        cardRadius,
        resolvedPadding,
        Spacing[gap],
        cardVariantStyle,
      ),
    [cardRadius, resolvedPadding, gap, cardVariantStyle],
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
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        testID={testID}
        style={[styles.base, cardStyle, style]}
      >
        {highlightElement}
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      style={[styles.base, cardStyle, style]}
    >
      {highlightElement}
      {children}
    </View>
  );
};

export const AppCard = React.memo(AppCardComponent);
