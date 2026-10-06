import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Smartphone, Zap, RotateCcw } from 'lucide-react-native';
import { AppText, AppButton, GestureCard } from '@/components';
import { haptics } from '@/utils';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

interface GesturesShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  gestureFeedback: string;
  setGestureFeedback: (val: string) => void;
  shakeCount: number;
  resetShakeCount: () => void;
  simulateShake: () => void;
  language: string;
}

export const GesturesShowcase: React.FC<GesturesShowcaseProps> = ({
  themeColors,
  radiusTokens,
  isDark,
  gestureFeedback,
  setGestureFeedback,
  shakeCount,
  resetShakeCount,
  simulateShake,
  language,
}) => {
  const styles = useMemo(() => createGesturesStyles(radiusTokens), [radiusTokens]);
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
      <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
        <View style={styles.titleRow}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
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

        <View style={[styles.stepperCard, isDark ? styles.stepperCardDark : styles.stepperCardLight]}>
          <View style={styles.stepperTextBlock}>
            <AppText style={[styles.stepperLabel, { color: themeColors.textSecondary }]}>
              {language === 'vi' ? 'Số lần lắc phát hiện' : 'Detected Shakes'}
            </AppText>
            <AppText style={[styles.stepperNumber, { color: themeColors.primary }]}>
              {shakeCount}
            </AppText>
          </View>

          <View style={styles.stepperActions}>
            <TouchableOpacity
              style={[styles.resetBtn, isDark ? styles.resetBtnDark : styles.resetBtnLight]}
              activeOpacity={0.7}
              onPress={() => {
                haptics.warning();
                resetShakeCount();
              }}
            >
              <RotateCcw size={15} color={themeColors.textSecondary} />
            </TouchableOpacity>

            <AppButton title="Mô Phỏng Lắc" variant="tonal" size="sm" onPress={simulateShake} />
          </View>
        </View>
      </View>

      {/* Haptics Soundboard */}
      <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
        <View style={styles.titleRow}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(0, 122, 255, 0.15)' }]}>
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
            <AppButton title="Rung Nhẹ" variant="tonal" size="sm" onPress={() => haptics.light()} />
          </View>
          <View style={styles.gridItem}>
            <AppButton title="Rung Vừa" variant="tonal" size="sm" onPress={() => haptics.medium()} />
          </View>
          <View style={styles.gridItem}>
            <AppButton title="Rung Mạnh" variant="tonal" size="sm" onPress={() => haptics.heavy()} />
          </View>
        </View>

        <View style={styles.grid3}>
          <View style={styles.gridItem}>
            <AppButton title="Thành Công" variant="tonal" size="sm" onPress={() => haptics.success()} />
          </View>
          <View style={styles.gridItem}>
            <AppButton title="Cảnh Báo" variant="tonal" size="sm" onPress={() => haptics.warning()} />
          </View>
          <View style={styles.gridItem}>
            <AppButton title="Lỗi" variant="danger" size="sm" onPress={() => haptics.error()} />
          </View>
        </View>
      </View>
    </View>
  );
};

const createGesturesStyles = (radius: RadiusPresetConfig) =>
  StyleSheet.create({
    container: {
      gap: 16,
      marginBottom: 20,
    },
    card: {
      borderRadius: radius.card,
      padding: 16,
      borderWidth: 1,
      gap: 14,
    },
    cardLight: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E2E8F0',
    },
    cardDark: {
      backgroundColor: '#111827',
      borderColor: '#1F2937',
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    iconBox: {
      width: 38,
      height: 38,
      borderRadius: Math.min(radius.smControl * 1.8, radius.card),
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleTextCol: {
      flex: 1,
      gap: 2,
    },
    title: {
      fontSize: 16,
      fontWeight: '800',
      letterSpacing: -0.2,
    },
    subtitle: {
      fontSize: 12,
      lineHeight: 16,
    },
    stepperCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: radius.control,
      padding: 14,
      borderWidth: 1,
    },
    stepperCardLight: {
      backgroundColor: '#F8FAFC',
      borderColor: '#E2E8F0',
    },
    stepperCardDark: {
      backgroundColor: '#1E293B',
      borderColor: '#334155',
    },
    stepperTextBlock: {
      gap: 2,
    },
    stepperLabel: {
      fontSize: 11.5,
      fontWeight: '600',
    },
    stepperNumber: {
      fontSize: 26,
      lineHeight: 32,
      fontWeight: '800',
      fontVariant: ['tabular-nums'],
    },
    stepperActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    resetBtn: {
      width: 34,
      height: 34,
      borderRadius: radius.smControl,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },
  resetBtnLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CBD5E1',
  },
  resetBtnDark: {
    backgroundColor: '#334155',
    borderColor: '#475569',
  },
  grid3: {
    flexDirection: 'row',
    gap: 8,
  },
  gridItem: {
    flex: 1,
  },
});
