import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Hand } from 'lucide-react-native';
import { AppText } from '@/components/common/AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useSwipeGesture, useDoubleTap } from '@/hooks/useGestures';
import type { GestureCardProps } from './types';
import { createGestureCardStyles } from './styles';

export const GestureCard: React.FC<GestureCardProps> = ({
  title,
  description,
  onSwipeLeft,
  onSwipeRight,
  onDoubleTap,
}) => {
  const { theme: themeColors } = useThemeMode();
  const styles = createGestureCardStyles(themeColors);

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
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      <View style={styles.container} {...swipeHandlers}>
        <View style={styles.headerRow}>
          <View style={styles.iconWrapper}>
            <Hand size={20} color={themeColors.primary} />
          </View>
          <AppText variant="subtitle" style={styles.title}>
            {title}
          </AppText>
        </View>

        <AppText variant="body" color={themeColors.textSecondary} style={styles.description}>
          {description}
        </AppText>

        <View style={styles.gestureHints}>
          <AppText variant="caption" color={themeColors.primary} style={styles.hintBadge}>
            👈 Vuốt Trái
          </AppText>
          <AppText variant="caption" color={themeColors.primary} style={styles.hintBadge}>
            ⚡ Chạm Đúp
          </AppText>
          <AppText variant="caption" color={themeColors.primary} style={styles.hintBadge}>
            Vuốt Phải 👉
          </AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
