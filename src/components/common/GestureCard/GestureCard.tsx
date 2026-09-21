import React from 'react';
import { View, useColorScheme, TouchableWithoutFeedback } from 'react-native';
import { Hand } from 'lucide-react-native';
import { AppText } from '@/components/common/AppText';
import { Colors } from '@/constants/colors';
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
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;
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
