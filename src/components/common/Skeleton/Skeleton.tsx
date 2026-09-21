import React, { useEffect, useRef } from 'react';
import { Animated, View, ViewStyle, useColorScheme } from 'react-native';
import { Colors } from '@/constants/colors';
import type { SkeletonProps, SkeletonCardProps } from './types';
import { styles, getSkeletonRadius } from './styles';

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius,
  variant = 'rectangular',
  style,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, [opacity]);

  const baseStyle: ViewStyle = {
    width: width as any,
    height: height as any,
    borderRadius: getSkeletonRadius(variant, borderRadius),
    backgroundColor: themeColors.border,
  };

  return <Animated.View style={[baseStyle, { opacity }, style]} />;
};

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ style }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        { backgroundColor: themeColors.card, borderColor: themeColors.border },
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
