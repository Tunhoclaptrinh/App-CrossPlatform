import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import type { PaginationDotsProps } from './types';
import { styles } from './styles';

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  count,
  activeIndex,
  onDotPress,
  size = 'md',
  activeWidth,
  activeColor,
  inactiveColor,
  contrast,
  gap,
  style,
}) => {
  const { theme, isDark, globalContrast } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const isHigh = resolvedContrast === 'high';

  let dotHeight = 8;
  let dotActiveWidth = activeWidth !== undefined ? activeWidth : 24;
  let resolvedGap = gap !== undefined ? gap : 7;

  if (size === 'sm') {
    dotHeight = 5;
    dotActiveWidth = activeWidth !== undefined ? activeWidth : 16;
    resolvedGap = gap !== undefined ? gap : 5;
  } else if (size === 'md') {
    dotHeight = 8;
    dotActiveWidth = activeWidth !== undefined ? activeWidth : 24;
    resolvedGap = gap !== undefined ? gap : 7;
  } else if (size === 'lg') {
    dotHeight = 11;
    dotActiveWidth = activeWidth !== undefined ? activeWidth : 32;
    resolvedGap = gap !== undefined ? gap : 9;
  } else if (typeof size === 'number') {
    dotHeight = size;
    dotActiveWidth = activeWidth !== undefined ? activeWidth : size * 3;
    resolvedGap = gap !== undefined ? gap : 6;
  }

  const effectiveActiveColor = activeColor || theme.primary;
  const effectiveInactiveColor =
    inactiveColor ||
    (isHigh
      ? isDark ? 'rgba(255, 255, 255, 0.55)' : 'rgba(0, 0, 0, 0.42)'
      : isDark ? 'rgba(255, 255, 255, 0.32)' : 'rgba(0, 0, 0, 0.28)');

  const handlePress = (index: number) => {
    if (onDotPress && index !== activeIndex) {
      haptics.light();
      onDotPress(index);
    }
  };

  const containerStyle = React.useMemo(
    () => [styles.container, { gap: resolvedGap }, style],
    [resolvedGap, style]
  );

  const getDotStyle = (isActive: boolean) => {
    const width = isActive ? dotActiveWidth : dotHeight;
    const color = isActive ? effectiveActiveColor : effectiveInactiveColor;
    return {
      width,
      height: dotHeight,
      borderRadius: dotHeight / 2,
      backgroundColor: color,
      borderWidth: isHigh && !isActive ? 1 : 0,
      borderColor: isHigh ? (isDark ? 'rgba(255, 255, 255, 0.40)' : 'rgba(0, 0, 0, 0.30)') : 'transparent',
    };
  };

  return (
    <View style={containerStyle}>
      {Array.from({ length: count }).map((_, index) => {
        const isActive = index === activeIndex;
        const dotDynamicStyle = getDotStyle(isActive);

        const dotView = (
          <View style={[styles.dot, dotDynamicStyle]} />
        );

        if (onDotPress) {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => handlePress(index)}
              hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
              accessibilityLabel={`Trang ${index + 1}`}
            >
              {dotView}
            </TouchableOpacity>
          );
        }

        return <View key={index}>{dotView}</View>;
      })}
    </View>
  );
};
