import React, { useEffect, useRef } from 'react';
import { Animated, View, ViewStyle } from 'react-native';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { SkeletonProps, SkeletonCardProps } from './types';
import { styles, getSkeletonRadius, getSkeletonCardThemedStyle } from './styles';

const SkeletonComponent: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius,
  variant = 'rectangular',
  contrast,
  style,
}) => {
  const { theme: themeColors, isDark, globalContrast, reduceMotion } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const isHigh = resolvedContrast === 'high';

  const opacity = useRef(new Animated.Value(isHigh ? 0.45 : 0.3)).current;

  useEffect(() => {
    if (reduceMotion) {
      opacity.setValue(isHigh ? 0.6 : 0.4);
      return;
    }

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: isHigh ? 0.85 : 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: isHigh ? 0.45 : 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, [opacity, isHigh, reduceMotion]);

  const bgColor = isHigh
    ? isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.16)'
    : themeColors.border;

  const baseStyle: ViewStyle = {
    width: width as any,
    height: height as any,
    borderRadius: getSkeletonRadius(variant, borderRadius),
    backgroundColor: bgColor,
  };

  return <Animated.View style={[baseStyle, { opacity }, style]} />;
};

export const Skeleton = React.memo(SkeletonComponent);

const SkeletonCardComponent: React.FC<SkeletonCardProps> = ({ style }) => {
  const { theme: themeColors } = useThemeMode();

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        getSkeletonCardThemedStyle(themeColors),
        style,
      ]}
    >
      <View style={styles.cardHeader}>
        <Skeleton variant="circular" width={44} height={44} />
        <View style={styles.cardHeaderTexts}>
          <Skeleton variant="text" width="60%" height={16} style={styles.mbSm} />
          <Skeleton variant="text" width="40%" height={12} />
        </View>
      </View>
      <Skeleton variant="rectangular" width="100%" height={80} style={styles.mbSm} />
      <Skeleton variant="text" width="90%" height={14} style={styles.mbSm} />
      <Skeleton variant="text" width="70%" height={14} />
    </Animated.View>
  );
};

export const SkeletonCard = React.memo(SkeletonCardComponent);

