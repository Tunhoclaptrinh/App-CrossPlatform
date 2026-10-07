import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import type { AppRatingProps } from './types';
import { styles } from './styles';

export const AppRating: React.FC<AppRatingProps> = ({
  value,
  max = 5,
  onChange,
  size = 'md',
  color = '#F59E0B',
  emptyColor,
  contrast,
  readOnly = false,
  showScore = false,
  style,
  scoreStyle,
}) => {
  const { theme, isDark, globalContrast } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const isHigh = resolvedContrast === 'high';

  const pixelSize =
    typeof size === 'number'
      ? size
      : size === 'sm'
      ? 16
      : size === 'lg'
      ? 28
      : 22;

  const isInteractive = !readOnly && !!onChange;
  const unfillColor =
    emptyColor ||
    (isHigh
      ? isDark ? 'rgba(255, 255, 255, 0.40)' : 'rgba(0, 0, 0, 0.30)'
      : isDark ? 'rgba(255, 255, 255, 0.24)' : 'rgba(0, 0, 0, 0.18)');

  const handlePress = (index: number) => {
    if (isInteractive && onChange) {
      haptics.light();
      onChange(index + 1);
    }
  };

  const starBoxStyle = React.useMemo(
    () => ({ width: pixelSize, height: pixelSize }),
    [pixelSize]
  );

  const scoreTextStyle = React.useMemo(
    () => [styles.scoreText, { color: theme.text }, scoreStyle],
    [theme.text, scoreStyle]
  );

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const isFull = value >= starValue;
        const isHalf = !isFull && value >= starValue - 0.5;

        const starElement = (
          <View style={[styles.starContainer, starBoxStyle]}>
            {/* Empty base star */}
            <Star
              size={pixelSize}
              color={unfillColor}
              fill={unfillColor}
              strokeWidth={isHigh ? 1.5 : 1}
            />

            {/* Full filled star */}
            {isFull && (
              <View style={styles.fullStarOverlay}>
                <Star
                  size={pixelSize}
                  color={color}
                  fill={color}
                  strokeWidth={1}
                />
              </View>
            )}

            {/* Half star */}
            {isHalf && (
              <View style={styles.halfStarOverlay}>
                <Star
                  size={pixelSize}
                  color={color}
                  fill={color}
                  strokeWidth={1}
                />
              </View>
            )}
          </View>
        );

        if (isInteractive) {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => handlePress(index)}
              accessibilityLabel={`Đánh giá ${starValue} sao`}
            >
              {starElement}
            </TouchableOpacity>
          );
        }

        return <View key={index}>{starElement}</View>;
      })}

      {showScore && (
        <AppText style={scoreTextStyle}>
          {value.toFixed(1)} / {max}
        </AppText>
      )}
    </View>
  );
};
