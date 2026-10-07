import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Database, Server, Share2, Plus, Minus, RotateCcw } from 'lucide-react-native';
import { AppText, AppButton, AppInput, AppCard } from '@/components';
import { haptics } from '@/utils';
import { createStorageStyles } from './styles';
import type { StorageShowcaseProps } from './types';

export const StorageShowcase: React.FC<StorageShowcaseProps> = ({
  themeColors,
  radiusTokens,
  isDark,
  isGlass = false,
  counter,
  onIncrement,
  onDecrement,
  onReset,
  storageInput,
  setStorageInput,
  savedStorageVal,
  onSaveStorage,
  fileContent,
  setFileContent,
  onSaveFile,
  onShareFile,
  language,
}) => {
  const styles = useMemo(() => createStorageStyles(radiusTokens), [radiusTokens]);
  const btnVariant = isGlass ? 'glass' : 'tonal';

  return (
    <View style={styles.container}>
      {/* 1. Zustand Store */}
      <AppCard style={styles.cardContent}>
        <View style={styles.titleRow}>
          <View style={styles.iconBox}>
            <Database size={18} color="#0284C7" strokeWidth={2.4} />
          </View>
          <View style={styles.titleTextCol}>
            <AppText style={[styles.title, { color: themeColors.text }]}>
              Zustand Reactive Store
            </AppText>
            <AppText style={[styles.subtitle, { color: themeColors.textSecondary }]}>
              Biến toàn cục phản ứng tức thì không cần props drilling
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
              {language === 'vi' ? 'Giá trị hiện tại' : 'Current Value'}
            </AppText>
            <AppText style={[styles.stepperNumber, { color: themeColors.primary }]}>
              {counter}
            </AppText>
          </View>

          <View style={styles.stepperControls}>
            <AppButton
              size="sm"
              variant={btnVariant}
              leftIcon={<Minus size={16} color={themeColors.text} strokeWidth={2.2} />}
              onPress={() => {
                haptics.light();
                onDecrement();
              }}
              accessibilityLabel="Decrement counter"
            />

            <AppButton
              size="sm"
              variant={btnVariant}
              leftIcon={<RotateCcw size={14} color={themeColors.textSecondary} strokeWidth={2.2} />}
              onPress={() => {
                haptics.warning();
                onReset();
              }}
              accessibilityLabel="Reset counter"
            />

            <AppButton
              size="sm"
              variant="primary"
              leftIcon={<Plus size={16} color="#FFFFFF" strokeWidth={2.2} />}
              onPress={() => {
                haptics.success();
                onIncrement();
              }}
              accessibilityLabel="Increment counter"
            />
          </View>
        </View>
      </AppCard>

      {/* 2. AsyncStorage */}
      <AppCard style={styles.cardContent}>
        <View style={styles.titleRow}>
          <View style={styles.iconBox}>
            <Server size={18} color="#0284C7" strokeWidth={2.4} />
          </View>
          <View style={styles.titleTextCol}>
            <AppText style={[styles.title, { color: themeColors.text }]}>
              AsyncStorage Key-Value
            </AppText>
            <AppText style={[styles.subtitle, { color: themeColors.textSecondary }]}>
              Lưu trữ bộ nhớ bền vững trên thiết bị di động
            </AppText>
          </View>
        </View>

        <AppInput
          label="Nhập dữ liệu lưu vào máy:"
          value={storageInput}
          onChangeText={setStorageInput}
          placeholder="Ví dụ: user_auth_token_xyz"
        />

        <AppButton
          title="Lưu Xuống Bộ Nhớ Bền Vững"
          variant={isGlass ? 'glass' : 'primary'}
          size="sm"
          onPress={onSaveStorage}
        />

        {savedStorageVal && (
          <View
            style={[
              styles.snippetBox,
              isGlass
                ? isDark
                  ? styles.snippetBoxGlassDark
                  : styles.snippetBoxGlassLight
                : isDark
                ? styles.snippetBoxDark
                : styles.snippetBoxLight,
            ]}
          >
            <AppText style={[styles.snippetLabel, { color: themeColors.textSecondary }]}>
              DỮ LIỆU ĐANG LƯU TRONG MÁY:
            </AppText>
            <AppText style={[styles.snippetText, { color: themeColors.primary }]}>
              {savedStorageVal}
            </AppText>
          </View>
        )}
      </AppCard>

      {/* 3. File I/O */}
      <AppCard style={styles.cardContent}>
        <View style={styles.titleRow}>
          <View style={styles.iconBox}>
            <Share2 size={18} color="#0284C7" strokeWidth={2.4} />
          </View>
          <View style={styles.titleTextCol}>
            <AppText style={[styles.title, { color: themeColors.text }]}>
              Lưu Trữ & Xuất File (File I/O)
            </AppText>
            <AppText style={[styles.subtitle, { color: themeColors.textSecondary }]}>
              Tạo và chia sẻ file ra hệ điều hành
            </AppText>
          </View>
        </View>

        <AppInput
          label="Tập tin (demo_note.txt):"
          value={fileContent}
          onChangeText={setFileContent}
          placeholder="Nội dung tập tin..."
        />

        <View style={styles.grid2}>
          <View style={styles.gridItem}>
            <AppButton title="Lưu File" variant={btnVariant} size="sm" onPress={onSaveFile} />
          </View>
          <View style={styles.gridItem}>
            <AppButton
              title="Chia Sẻ / Xuất"
              variant={isGlass ? 'glass' : 'outline'}
              size="sm"
              onPress={onShareFile}
            />
          </View>
        </View>
      </AppCard>
    </View>
  );
};
