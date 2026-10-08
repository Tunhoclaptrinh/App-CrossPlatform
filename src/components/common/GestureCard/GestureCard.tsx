import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Hand } from 'lucide-react-native';
import { AppCard } from '@/components/common/AppCard';
import { AppText } from '@/components/common/AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
import { useSwipeGesture, useDoubleTap } from '@/hooks/useGestures';
import type { GestureCardProps } from './types';
import { createGestureCardStyles } from './styles';

export const GestureCard: React.FC<GestureCardProps> = React.memo(({
  title,
  description,
  size = 'md',
  contrast,
  borderRadius,
  onSwipeLeft,
  onSwipeRight,
  onDoubleTap,
}) => {
  const { theme: themeColors, radiusTokens, isDark, globalContrast } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const { themeStyle } = useAppStore();
  const isGlass = themeStyle === 'apple-glass';
  const styles = createGestureCardStyles(themeColors, radiusTokens, isDark);

  const swipeHandlers = useSwipeGesture({
    onSwipeLeft,
    onSwipeRight,
  });

  const handleDoubleTap = useDoubleTap(() => {
    if (onDoubleTap) {
      onDoubleTap();
    }
  });

  return (
    <AppCard
      size={size}
      contrast={resolvedContrast}
      borderRadius={borderRadius}
      style={styles.cardContent}
    >
      <View style={styles.titleRow}>
        <View style={styles.iconBox}>
          <Hand size={18} color="#007AFF" strokeWidth={2.4} />
        </View>
        <View style={styles.titleTextCol}>
          <AppText style={[styles.title, { color: themeColors.text }]}>{title}</AppText>
          <AppText style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Nhận diện cử chỉ vuốt 4 hướng và chạm đúp cực nhạy
          </AppText>
        </View>
      </View>

      <TouchableWithoutFeedback onPress={handleDoubleTap}>
        <View
          style={[
            styles.touchPad,
            isGlass
              ? isDark
                ? styles.touchPadGlassDark
                : styles.touchPadGlassLight
              : isDark
                ? styles.touchPadDark
                : styles.touchPadLight,
          ]}
          {...swipeHandlers}
        >
          <AppText style={[styles.feedbackText, { color: themeColors.primary }]}>
            {description}
          </AppText>

          <View style={styles.gestureHints}>
            <View
              style={[
                styles.hintBadge,
                isGlass
                  ? isDark
                    ? styles.hintBadgeGlassDark
                    : styles.hintBadgeGlassLight
                  : isDark
                    ? styles.hintBadgeDark
                    : styles.hintBadgeLight,
              ]}
            >
              <AppText style={[styles.hintText, { color: themeColors.textSecondary }]}>
                👈 Vuốt Trái
              </AppText>
            </View>

            <View
              style={[
                styles.hintBadge,
                isGlass
                  ? isDark
                    ? styles.hintBadgeGlassDark
                    : styles.hintBadgeGlassLight
                  : isDark
                    ? styles.hintBadgeDark
                    : styles.hintBadgeLight,
              ]}
            >
              <AppText style={[styles.hintText, { color: themeColors.textSecondary }]}>
                ⚡ Chạm Đúp
              </AppText>
            </View>

            <View
              style={[
                styles.hintBadge,
                isGlass
                  ? isDark
                    ? styles.hintBadgeGlassDark
                    : styles.hintBadgeGlassLight
                  : isDark
                    ? styles.hintBadgeDark
                    : styles.hintBadgeLight,
              ]}
            >
              <AppText style={[styles.hintText, { color: themeColors.textSecondary }]}>
                Vuốt Phải 👉
              </AppText>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </AppCard>
  );
});
