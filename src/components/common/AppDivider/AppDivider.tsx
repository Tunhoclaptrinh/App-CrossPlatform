import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { AppDividerProps } from './types';
import { styles, getDividerColor } from './styles';

export const AppDivider: React.FC<AppDividerProps> = ({
  orientation = 'horizontal',
  inset = 0,
  insetEnd = 0,
  label,
  labelStyle,
  dashed = false,
  size,
  thickness,
  color,
  contrast,
  style,
}) => {
  const { theme, isDark, globalContrast } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const dividerColor = getDividerColor(theme, isDark, resolvedContrast, color);

  let resolvedThickness = StyleSheet.hairlineWidth;
  if (size === 'sm') resolvedThickness = 0.5;
  else if (size === 'md') resolvedThickness = 1.0;
  else if (size === 'lg') resolvedThickness = 2.0;
  else if (typeof size === 'number') resolvedThickness = size;
  else if (thickness !== undefined) resolvedThickness = thickness;

  const verticalLineStyle = {
    width: resolvedThickness,
    marginTop: inset,
    marginBottom: insetEnd,
    backgroundColor: dashed ? 'transparent' : dividerColor,
    borderLeftWidth: dashed ? resolvedThickness : 0,
    borderLeftColor: dashed ? dividerColor : 'transparent',
    borderStyle: dashed ? ('dashed' as const) : ('solid' as const),
  };

  const horizontalMargins = { marginLeft: inset, marginRight: insetEnd };

  const horizontalLineStyle = {
    height: resolvedThickness,
    backgroundColor: dashed ? 'transparent' : dividerColor,
    borderBottomWidth: dashed ? resolvedThickness : 0,
    borderBottomColor: dashed ? dividerColor : 'transparent',
    borderStyle: dashed ? ('dashed' as const) : ('solid' as const),
  };

  if (orientation === 'vertical') {
    return (
      <View
        style={[
          styles.verticalContainer,
          verticalLineStyle,
          style,
        ]}
      />
    );
  }

  // Horizontal with optional Label
  if (label) {
    return (
      <View
        style={[
          styles.horizontalContainer,
          horizontalMargins,
          style,
        ]}
      >
        <View
          style={[
            styles.line,
            horizontalLineStyle,
          ]}
        />
        <View style={styles.labelBox}>
          {typeof label === 'string' ? (
            <AppText
              style={[
                styles.labelText,
                { color: theme.textSecondary },
                labelStyle,
              ]}
            >
              {label}
            </AppText>
          ) : (
            label
          )}
        </View>
        <View
          style={[
            styles.line,
            horizontalLineStyle,
          ]}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.fullWidthLine,
        horizontalMargins,
        horizontalLineStyle,
        style,
      ]}
    />
  );
};
