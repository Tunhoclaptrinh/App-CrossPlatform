import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { AppTextProps } from './types';
import { styles } from './styles';

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color,
  style,
  children,
  ...props
}) => {
  const { theme: themeColors } = useThemeMode();
  const defaultColor = themeColors.text;

  // Flatten incoming style to detect custom fontSize without adequate lineHeight
  const flattenedStyle = StyleSheet.flatten(style) as TextStyle | undefined;
  let autoLineHeight: number | undefined;

  if (
    flattenedStyle?.fontSize &&
    (!flattenedStyle.lineHeight || flattenedStyle.lineHeight < flattenedStyle.fontSize * 1.2)
  ) {
    autoLineHeight = Math.ceil(flattenedStyle.fontSize * 1.3);
  }

  return (
    <Text
      style={[
        styles[variant],
        { color: color || defaultColor },
        style,
        autoLineHeight ? { lineHeight: autoLineHeight } : null,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
