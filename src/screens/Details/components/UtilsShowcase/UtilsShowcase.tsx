import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Sliders, Copy, Camera, RefreshCw } from 'lucide-react-native';
import { AppText, AppButton, AppCard } from '@/components';
import { createUtilsStyles } from './styles';
import type { UtilsShowcaseProps } from './types';

export const UtilsShowcase: React.FC<UtilsShowcaseProps> = ({
  themeColors,
  radiusTokens,
  isGlass = false,
  uuidValue,
  onGenerateUuid,
  onCopyUuid,
  onCheckCamera,
  onCheckUpdate,
}) => {
  const styles = useMemo(() => createUtilsStyles(radiusTokens), [radiusTokens]);

  return (
    <AppCard style={styles.cardContent}>
      {/* Title Header */}
      <View style={styles.titleRow}>
        <View style={styles.iconBox}>
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
      <View
        style={[
          styles.snippetBox,
          isGlass
            ? styles.snippetBoxGlassLight
            : styles.snippetBoxLight,
        ]}
      >
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
          <AppButton
            title="Tạo UUID Mới"
            variant={isGlass ? 'glass' : 'tonal'}
            size="sm"
            onPress={onGenerateUuid}
          />
        </View>
        <View style={styles.gridItem}>
          <AppButton
            title="Sao Chép UUID"
            variant={isGlass ? 'glass' : 'outline'}
            size="sm"
            leftIcon={
              <Copy
                size={14}
                color={isGlass ? themeColors.text : themeColors.primary}
                strokeWidth={2.2}
              />
            }
            onPress={onCopyUuid}
          />
        </View>
      </View>

      {/* Hardware Actions */}
      <AppButton
        title="Kiểm Tra Quyền Camera"
        variant={isGlass ? 'glass' : 'outline'}
        size="md"
        leftIcon={
          <Camera
            size={16}
            color={isGlass ? themeColors.text : themeColors.primary}
            strokeWidth={2.2}
          />
        }
        onPress={onCheckCamera}
      />

      <AppButton
        title="Kiểm Tra Cập Nhật Ứng Dụng"
        variant={isGlass ? 'glass' : 'tonal'}
        size="md"
        leftIcon={
          <RefreshCw
            size={16}
            color={isGlass ? themeColors.text : themeColors.primary}
            strokeWidth={2.2}
          />
        }
        onPress={onCheckUpdate}
      />
    </AppCard>
  );
};
