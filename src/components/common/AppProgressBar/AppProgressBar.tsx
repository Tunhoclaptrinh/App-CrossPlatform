import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { AppProgressBarProps } from './types';
import { styles } from './styles';

const AppProgressBarComponent: React.FC<AppProgressBarProps> = ({
  progress,
  height = 7,
  size,
  color,
  trackColor,
  animated = true,
  showLabel = false,
  labelPosition = 'right',
  labelFormat,
  contrast,
  borderRadius,
  style,
  labelStyle,
}) => {
  const { theme, radiusTokens, isDark, globalContrast, reduceMotion } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const isHighContrast = resolvedContrast === 'high';

  const resolvedHeight =
    size !== undefined
      ? typeof size === 'number'
        ? size
        : size === 'sm'
        ? 4
        : size === 'lg'
        ? 12
        : 8
      : height;

  // Normalize progress to percentage (0 - 100)
  const normalizedValue = Math.min(100, Math.max(0, progress <= 1 && progress > 0 ? progress * 100 : progress));

  const animatedWidth = useRef(new Animated.Value(normalizedValue)).current;

  useEffect(() => {
    if (animated && !reduceMotion) {
      Animated.timing(animatedWidth, {
        toValue: normalizedValue,
        duration: 320,
        useNativeDriver: false,
      }).start();
    } else {
      animatedWidth.setValue(normalizedValue);
    }
  }, [normalizedValue, animated, reduceMotion, animatedWidth]);

  const activeColor = color || theme.primary;
  const inactiveTrackColor =
    trackColor ||
    (isHighContrast
      ? isDark ? 'rgba(255, 255, 255, 0.20)' : 'rgba(0, 0, 0, 0.16)'
      : isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 0, 0, 0.10)');

  const trackBorder = isHighContrast
    ? {
        borderWidth: 1,
        borderColor: isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.24)',
      }
    : {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: isDark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(0, 0, 0, 0.08)',
      };

  const pillRadius = borderRadius !== undefined ? borderRadius : Math.min(radiusTokens.pill, 999);
  const formattedText = labelFormat
    ? labelFormat(normalizedValue)
    : `${Math.round(normalizedValue)}%`;

  const barContent = (
    <View
      style={[
        styles.track,
        {
          height: resolvedHeight,
          borderRadius: pillRadius,
          backgroundColor: inactiveTrackColor,
        },
        trackBorder,
      ]}
    >
      <Animated.View
        style={[
          styles.fill,
          {
            backgroundColor: activeColor,
            borderRadius: pillRadius,
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );

  if (!showLabel) {
    return <View style={[styles.container, style]}>{barContent}</View>;
  }

  if (labelPosition === 'top') {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.labelTopRow}>
          <AppText style={[styles.labelText, { color: theme.textSecondary }]}>
            Tiến độ
          </AppText>
          <AppText
            style={[styles.labelText, { color: theme.text }, labelStyle]}
          >
            {formattedText}
          </AppText>
        </View>
        {barContent}
      </View>
    );
  }

  if (labelPosition === 'bottom') {
    return (
      <View style={[styles.container, style]}>
        {barContent}
        <View style={styles.labelBottomRow}>
          <AppText style={[styles.labelText, { color: theme.textSecondary }]}>
            Tiến độ
          </AppText>
          <AppText
            style={[styles.labelText, { color: theme.text }, labelStyle]}
          >
            {formattedText}
          </AppText>
        </View>
      </View>
    );
  }

  // labelPosition === 'right'
  return (
    <View style={[styles.rowContainer, style]}>
      {barContent}
      <AppText
        style={[
          styles.labelText,
          styles.labelRightText,
          { color: theme.text },
          labelStyle,
        ]}
      >
        {formattedText}
      </AppText>
    </View>
  );
};

export const AppProgressBar = React.memo(AppProgressBarComponent);

