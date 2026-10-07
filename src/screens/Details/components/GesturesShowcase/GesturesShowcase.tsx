import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Smartphone, Zap, RotateCcw } from 'lucide-react-native';
import { AppText, AppButton, AppCard, GestureCard } from '@/components';
import { haptics } from '@/utils';
import { createGesturesStyles } from './styles';
import type { GesturesShowcaseProps } from './types';

export const GesturesShowcase: React.FC<GesturesShowcaseProps> = ({
  themeColors,
  radiusTokens,
  isDark,
  isGlass = false,
  gestureFeedback,
  setGestureFeedback,
  shakeCount,
  resetShakeCount,
  simulateShake,
  language,
}) => {
  const styles = useMemo(() => createGesturesStyles(radiusTokens), [radiusTokens]);
  const btnVariant = isGlass ? 'glass' : 'tonal';

  return (
    <View style={styles.container}>
      {/* Interactive Touch Pad */}
      <GestureCard
        title="Bàn Cảm Ứng Tương Tác"
        description={gestureFeedback}
        onSwipeLeft={() => {
          haptics.light();
          setGestureFeedback('👈 Đã vuốt sang TRÁI (Swipe Left)');
        }}
        onSwipeRight={() => {
          haptics.light();
          setGestureFeedback('👉 Đã vuốt sang PHẢI (Swipe Right)');
        }}
        onDoubleTap={() => {
          haptics.success();
          setGestureFeedback('⚡ Đã chạm đúp (Double Tap)');
        }}
      />

      {/* Shake Motion Studio */}
      <AppCard style={styles.cardContent}>
        <View style={styles.titleRow}>
          <View style={[styles.iconBox, styles.iconBoxAmber]}>
            <Smartphone size={18} color="#F59E0B" strokeWidth={2.4} />
          </View>
          <View style={styles.titleTextCol}>
            <AppText style={[styles.title, { color: themeColors.text }]}>
              Cảm Biến Lắc (Shake Motion)
            </AppText>
            <AppText style={[styles.subtitle, { color: themeColors.textSecondary }]}>
              Nhận diện gia tốc chuyển động thực tế kèm bộ lọc chống kích hoạt nhầm
            </AppText>
          </View>
        </View>

        <View
          style={[
            styles.stepperCard,
            isGlass
              ? isDark
                ? styles.stepperCardGlassDark
                : styles.stepperCardGlassLight
              : isDark
              ? styles.stepperCardDark
              : styles.stepperCardLight,
          ]}
        >
          <View style={styles.stepperTextBlock}>
            <AppText style={[styles.stepperLabel, { color: themeColors.textSecondary }]}>
              {language === 'vi' ? 'Số lần lắc phát hiện' : 'Detected Shakes'}
            </AppText>
            <AppText style={[styles.stepperNumber, { color: themeColors.primary }]}>
              {shakeCount}
            </AppText>
          </View>

          <View style={styles.stepperActions}>
            <AppButton
              variant={btnVariant}
              size="sm"
              leftIcon={<RotateCcw size={15} color={themeColors.textSecondary} />}
              onPress={() => {
                haptics.warning();
                resetShakeCount();
              }}
              accessibilityLabel="Reset shake count"
            />

            <AppButton
              title="Mô Phỏng Lắc"
              variant={btnVariant}
              size="sm"
              onPress={simulateShake}
            />
          </View>
        </View>
      </AppCard>

      {/* Haptics Soundboard */}
      <AppCard style={styles.cardContent}>
        <View style={styles.titleRow}>
          <View style={[styles.iconBox, styles.iconBoxBlue]}>
            <Zap size={18} color="#007AFF" strokeWidth={2.4} />
          </View>
          <View style={styles.titleTextCol}>
            <AppText style={[styles.title, { color: themeColors.text }]}>
              Bộ Phản Hồi Rung Taptic Engine
            </AppText>
            <AppText style={[styles.subtitle, { color: themeColors.textSecondary }]}>
              Mô phỏng chân thực các cường độ phản hồi xúc giác cho từng thao tác UI
            </AppText>
          </View>
        </View>

        <View style={styles.grid3}>
          <View style={styles.gridItem}>
            <AppButton title="Rung Nhẹ" variant={btnVariant} size="sm" onPress={() => haptics.light()} />
          </View>
          <View style={styles.gridItem}>
            <AppButton title="Rung Vừa" variant={btnVariant} size="sm" onPress={() => haptics.medium()} />
          </View>
          <View style={styles.gridItem}>
            <AppButton title="Rung Mạnh" variant={btnVariant} size="sm" onPress={() => haptics.heavy()} />
          </View>
        </View>

        <View style={styles.grid3}>
          <View style={styles.gridItem}>
            <AppButton title="Thành Công" variant={btnVariant} size="sm" onPress={() => haptics.success()} />
          </View>
          <View style={styles.gridItem}>
            <AppButton title="Cảnh Báo" variant={btnVariant} size="sm" onPress={() => haptics.warning()} />
          </View>
          <View style={styles.gridItem}>
            <AppButton title="Lỗi" variant="danger" size="sm" onPress={() => haptics.error()} />
          </View>
        </View>
      </AppCard>
    </View>
  );
};
