import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Database, Server, Share2, Plus, Minus, RotateCcw } from 'lucide-react-native';
import { AppText, AppButton, AppInput } from '@/components';
import { haptics } from '@/utils';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

interface StorageShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  counter: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  storageInput: string;
  setStorageInput: (text: string) => void;
  savedStorageVal: string | null;
  onSaveStorage: () => void;
  fileContent: string;
  setFileContent: (text: string) => void;
  onSaveFile: () => void;
  onShareFile: () => void;
  language: string;
}

export const StorageShowcase: React.FC<StorageShowcaseProps> = ({
  themeColors,
  radiusTokens,
  isDark,
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
  return (
    <View style={styles.container}>
      {/* 1. Zustand Store */}
      <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
        <View style={styles.titleRow}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(2, 132, 199, 0.15)' }]}>
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

        <View style={[styles.stepperCard, isDark ? styles.stepperCardDark : styles.stepperCardLight]}>
          <View style={styles.stepperTextBlock}>
            <AppText style={[styles.stepperLabel, { color: themeColors.textSecondary }]}>
              {language === 'vi' ? 'Giá trị hiện tại' : 'Current Value'}
            </AppText>
            <AppText style={[styles.stepperNumber, { color: themeColors.primary }]}>
              {counter}
            </AppText>
          </View>

          <View style={styles.stepperControls}>
            <TouchableOpacity
              style={[styles.stepperBtn, isDark ? styles.stepperBtnDark : styles.stepperBtnLight]}
              onPress={() => {
                haptics.light();
                onDecrement();
              }}
            >
              <Minus size={16} color={themeColors.text} strokeWidth={2.2} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.stepperBtn, isDark ? styles.stepperBtnDark : styles.stepperBtnLight]}
              onPress={() => {
                haptics.warning();
                onReset();
              }}
            >
              <RotateCcw size={14} color={themeColors.textSecondary} strokeWidth={2.2} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.stepperBtn, { backgroundColor: themeColors.primary }]}
              onPress={() => {
                haptics.success();
                onIncrement();
              }}
            >
              <Plus size={16} color="#FFFFFF" strokeWidth={2.4} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 2. AsyncStorage */}
      <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
        <View style={styles.titleRow}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(2, 132, 199, 0.15)' }]}>
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

        <AppButton title="Lưu Xuống Bộ Nhớ Bền Vững" variant="primary" size="sm" onPress={onSaveStorage} />

        {savedStorageVal && (
          <View style={[styles.snippetBox, isDark ? styles.snippetBoxDark : styles.snippetBoxLight]}>
            <AppText style={[styles.snippetLabel, { color: themeColors.textSecondary }]}>
              DỮ LIỆU ĐANG LƯU TRONG MÁY:
            </AppText>
            <AppText style={[styles.snippetText, { color: themeColors.primary }]}>
              {savedStorageVal}
            </AppText>
          </View>
        )}
      </View>

      {/* 3. File I/O */}
      <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
        <View style={styles.titleRow}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(2, 132, 199, 0.15)' }]}>
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
            <AppButton title="Lưu File" variant="tonal" size="sm" onPress={onSaveFile} />
          </View>
          <View style={styles.gridItem}>
            <AppButton title="Chia Sẻ / Xuất" variant="outline" size="sm" onPress={onShareFile} />
          </View>
        </View>
      </View>
    </View>
  );
};

const createStorageStyles = (radius: RadiusPresetConfig) =>
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
    stepperControls: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    stepperBtn: {
      width: 36,
      height: 36,
      borderRadius: radius.smControl,
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepperBtnLight: {
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#CBD5E1',
    },
    stepperBtnDark: {
      backgroundColor: '#334155',
      borderWidth: 1,
      borderColor: '#475569',
    },
    snippetBox: {
      borderRadius: radius.smControl,
      padding: 10,
      borderWidth: 1,
      gap: 4,
    },
  snippetBoxLight: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  snippetBoxDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  snippetLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  snippetText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
  grid2: {
    flexDirection: 'row',
    gap: 8,
  },
  gridItem: {
    flex: 1,
  },
});
