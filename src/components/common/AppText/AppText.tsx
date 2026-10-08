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
  const { theme: themeColors, fontScale } = useThemeMode();
  const defaultColor = themeColors.text;

  // Flatten incoming style to detect custom fontSize and lineHeight
  const flattenedStyle = StyleSheet.flatten(style) as TextStyle | undefined;
  const baseVariant = Typography[variant] || Typography.body;
  const baseFontSize = flattenedStyle?.fontSize ?? baseVariant.fontSize ?? 14;

  const scaleMultiplier =
    fontScale === 'small' ? 0.90 : fontScale === 'large' ? 1.15 : 1.0;

  const scaledFontSize =
    scaleMultiplier !== 1.0 ? Math.round(baseFontSize * scaleMultiplier) : baseFontSize;

  let autoLineHeight: number | undefined;
  if (flattenedStyle?.lineHeight) {
    autoLineHeight =
      scaleMultiplier !== 1.0
        ? Math.round(flattenedStyle.lineHeight * scaleMultiplier)
        : flattenedStyle.lineHeight;
  } else if (baseVariant.lineHeight) {
    autoLineHeight =
      scaleMultiplier !== 1.0
        ? Math.round(baseVariant.lineHeight * scaleMultiplier)
        : baseVariant.lineHeight;
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


