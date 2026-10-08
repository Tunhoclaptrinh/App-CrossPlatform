import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { useThemeMode } from '@/hooks/useThemeMode';
import { Typography } from '@/constants/theme';
import type { AppTextProps } from './types';
import { styles } from './styles';

const AppTextComponent: React.FC<AppTextProps> = ({
  variant = 'body',
  color,
  style,
  children,
  ...props
}) => {
  const { theme: themeColors, fontScale = 'normal' } = useThemeMode();
  const defaultColor = themeColors.text;

  // Ultra-fast path for standard scale and un-overridden text
  if (fontScale === 'normal') {
    return (
      <Text
        style={[
          styles[variant],
          { color: color || defaultColor },
          style,
        ]}
        {...props}
      >
        {children}
      </Text>
    );
  }

  // Flatten incoming style only when dynamic font scaling is active
  const flattenedStyle = style ? (StyleSheet.flatten(style) as TextStyle | undefined) : undefined;
  const baseVariant = Typography[variant] || Typography.body;
  const baseFontSize = flattenedStyle?.fontSize ?? baseVariant.fontSize ?? 14;

  const scaleMultiplier =
    fontScale === 'small' ? 0.90 : fontScale === 'large' ? 1.15 : 1.0;

  const scaledFontSize =
    scaleMultiplier !== 1.0 ? Math.round(baseFontSize * scaleMultiplier) : baseFontSize;

  let autoLineHeight: number | undefined;
  if (flattenedStyle?.lineHeight) {
    autoLineHeight = Math.round(flattenedStyle.lineHeight * scaleMultiplier);
  } else if (baseVariant.lineHeight) {
    autoLineHeight = Math.round(baseVariant.lineHeight * scaleMultiplier);
  } else {
    autoLineHeight = Math.ceil(scaledFontSize * 1.3);
  }

  return (
    <Text
      style={[
        styles[variant],
        { color: color || defaultColor },
        style,
        scaleMultiplier !== 1.0
          ? { fontSize: scaledFontSize, lineHeight: autoLineHeight }
          : autoLineHeight
          ? { lineHeight: autoLineHeight }
          : null,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const AppText = React.memo(AppTextComponent);


