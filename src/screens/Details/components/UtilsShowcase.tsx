import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Sliders, Copy, Camera, RefreshCw } from 'lucide-react-native';
import { AppText, AppButton } from '@/components';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

interface UtilsShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  uuidValue: string;
  onGenerateUuid: () => void;
  onCopyUuid: () => void;
  onCheckCamera: () => void;
  onCheckUpdate: () => void;
}

export const UtilsShowcase: React.FC<UtilsShowcaseProps> = ({
  themeColors,
  radiusTokens,
  isDark,
  uuidValue,
  onGenerateUuid,
  onCopyUuid,
  onCheckCamera,
  onCheckUpdate,
}) => {
  const styles = useMemo(() => createUtilsStyles(radiusTokens), [radiusTokens]);
  return (
    <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
      {/* Title Header */}
      <View style={styles.titleRow}>
        <View style={[styles.iconBox, { backgroundColor: 'rgba(236, 72, 153, 0.15)' }]}>
          <Sliders size={18} color="#EC4899" strokeWidth={2.4} />
        </View>
        <View style={styles.titleTextCol}>
          <AppText style={[styles.title, { color: themeColors.text }]}>
            Bộ Tiện Ích & Phần Cứng Thiết Bị
          </AppText>
          <AppText style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Xử lý quyền hệ điều hành, đa ngôn ngữ, UUID và cập nhật tự động
          </AppText>
        </View>
      </View>

      {/* UUID Snippet */}
      <View style={[styles.snippetBox, isDark ? styles.snippetBoxDark : styles.snippetBoxLight]}>
        <AppText style={[styles.snippetLabel, { color: themeColors.textSecondary }]}>
          UUID V4 NGẪU NHIÊN:
        </AppText>
        <AppText style={[styles.snippetText, { color: themeColors.primary }]}>
          {uuidValue}
        </AppText>
      </View>

      {/* UUID Actions */}
      <View style={styles.grid2}>
        <View style={styles.gridItem}>
          <AppButton title="Tạo UUID Mới" variant="tonal" size="sm" onPress={onGenerateUuid} />
        </View>
        <View style={styles.gridItem}>
          <AppButton
            title="Sao Chép UUID"
            variant="outline"
            size="sm"
            leftIcon={<Copy size={14} color={themeColors.primary} strokeWidth={2.2} />}
            onPress={onCopyUuid}
          />
        </View>
      </View>

      {/* Hardware Actions */}
      <AppButton
        title="Kiểm Tra Quyền Camera"
        variant="outline"
        size="md"
        leftIcon={<Camera size={16} color={themeColors.primary} strokeWidth={2.2} />}
        onPress={onCheckCamera}
      />

      <AppButton
        title="Kiểm Tra Cập Nhật Ứng Dụng"
        variant="tonal"
        size="md"
        leftIcon={<RefreshCw size={16} color={themeColors.primary} strokeWidth={2.2} />}
        onPress={onCheckUpdate}
      />
    </View>
  );
};

const createUtilsStyles = (radius: RadiusPresetConfig) =>
  StyleSheet.create({
    card: {
      borderRadius: radius.card,
      padding: 16,
      borderWidth: 1,
      gap: 14,
      marginBottom: 20,
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
