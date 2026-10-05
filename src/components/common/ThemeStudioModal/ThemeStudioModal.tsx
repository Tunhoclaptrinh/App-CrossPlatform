import React from 'react';
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  X,
  Sun,
  Moon,
  Smartphone,
  Sparkles,
  Layers,
  Palette,
  Check,
  RotateCcw,
  Sliders,
  Zap,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { AppText } from '@/components/common/AppText';
import { AppButton } from '@/components/common/AppButton';
import { AppSwitch } from '@/components/common/AppSwitch';
import { useThemeMode } from '@/hooks/useThemeMode';
import { AccentPalettes, AccentColor } from '@/constants/colors';
import { RadiusPresets, RadiusPreset } from '@/constants/theme';
import { haptics } from '@/utils/haptics';
import type { ThemeStudioModalProps } from './types';
import { createThemeStudioStyles } from './styles';

export const ThemeStudioModal: React.FC<ThemeStudioModalProps> = ({
  visible,
  onClose,
}) => {
  const { t } = useTranslation();
  const {
    theme,
    mode,
    setThemeMode,
    accentColor,
    setAccentColor,
    radiusPreset,
    setRadiusPreset,
    radiusTokens,
    themeStyle,
    setThemeStyle,
    hapticsEnabled,
    setHapticsEnabled,
    resetThemeSettings,
  } = useThemeMode();

  const styles = createThemeStudioStyles(theme, radiusTokens);

  const accentList = Object.values(AccentPalettes);
  const radiusList = Object.values(RadiusPresets);

  const handleSelectAccent = (id: AccentColor) => {
    haptics.light();
    setAccentColor(id);
  };

  const handleSelectRadius = (id: RadiusPreset) => {
    haptics.light();
    setRadiusPreset(id);
  };

  const handleSelectMode = (newMode: 'light' | 'dark' | 'system') => {
    haptics.light();
    setThemeMode(newMode);
  };

  const handleSelectSurface = (style: 'apple-glass' | 'default') => {
    haptics.light();
    setThemeStyle(style);
  };

  const handleToggleHaptics = (val: boolean) => {
    setHapticsEnabled(val);
    if (val) haptics.success();
  };

  const handleReset = () => {
    haptics.warning();
    resetThemeSettings();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetContainer}>
              {/* Drag Handle */}
              <View style={styles.dragHandleArea}>
                <View style={styles.dragHandle} />
              </View>

              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerTitleRow}>
                  <View style={styles.headerIconBox}>
                    <Palette size={20} color={theme.primary} />
                  </View>
                  <View>
                    <AppText style={styles.headerTitle}>
                      {t('themeStudio.title', 'Studio Tinh Chỉnh Giao Diện')}
                    </AppText>
                    <AppText style={styles.headerSubtitle}>
                      {t('themeStudio.subtitle', 'Thời gian thực • Lưu tự động • Đạt chuẩn 16px max')}
                    </AppText>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={onClose}
                  activeOpacity={0.7}
                  accessibilityLabel="Close Studio"
                >
                  <X size={18} color={theme.textSecondary} />
                </TouchableOpacity>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {/* 1. Appearance Mode */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                      <Sun size={15} color={theme.primary} />
                      <AppText style={styles.sectionTitle}>
                        {t('themeStudio.modeTitle', '1. Chế Độ Hiển Thị')}
                      </AppText>
                    </View>
                    <View style={styles.sectionBadge}>
                      <AppText style={styles.sectionBadgeText}>
                        {mode.toUpperCase()}
                      </AppText>
                    </View>
                  </View>

                  <View style={styles.gridRow}>
                    <TouchableOpacity
                      style={[
                        styles.optionChip,
                        mode === 'light' && styles.optionChipActive,
                      ]}
                      onPress={() => handleSelectMode('light')}
                      activeOpacity={0.7}
                    >
                      <Sun
                        size={15}
                        color={mode === 'light' ? theme.primary : theme.textSecondary}
                      />
                      <AppText
                        style={[
                          styles.optionChipText,
                          mode === 'light' && styles.optionChipTextActive,
                        ]}
                      >
                        Sáng
                      </AppText>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.optionChip,
                        mode === 'dark' && styles.optionChipActive,
                      ]}
                      onPress={() => handleSelectMode('dark')}
                      activeOpacity={0.7}
                    >
                      <Moon
                        size={15}
                        color={mode === 'dark' ? theme.primary : theme.textSecondary}
                      />
                      <AppText
                        style={[
                          styles.optionChipText,
                          mode === 'dark' && styles.optionChipTextActive,
                        ]}
                      >
                        Tối
                      </AppText>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.optionChip,
                        mode === 'system' && styles.optionChipActive,
                      ]}
                      onPress={() => handleSelectMode('system')}
                      activeOpacity={0.7}
                    >
                      <Smartphone
                        size={15}
                        color={mode === 'system' ? theme.primary : theme.textSecondary}
                      />
                      <AppText
                        style={[
                          styles.optionChipText,
                          mode === 'system' && styles.optionChipTextActive,
                        ]}
                      >
                        Hệ Thống
                      </AppText>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* 2. Surface & Visual Style */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                      <Sparkles size={15} color={theme.primary} />
                      <AppText style={styles.sectionTitle}>
                        {t('themeStudio.surfaceTitle', '2. Phong Cách Bề Mặt')}
                      </AppText>
                    </View>
                    <View style={styles.sectionBadge}>
                      <AppText style={styles.sectionBadgeText}>
                        {themeStyle === 'apple-glass' ? 'Apple Glass' : 'Flat UI'}
                      </AppText>
                    </View>
                  </View>

                  <View style={styles.gridRow}>
                    <TouchableOpacity
                      style={[
                        styles.optionChip,
                        themeStyle === 'apple-glass' && styles.optionChipActive,
                      ]}
                      onPress={() => handleSelectSurface('apple-glass')}
                      activeOpacity={0.7}
                    >
                      <Sparkles
                        size={15}
                        color={
                          themeStyle === 'apple-glass'
                            ? theme.primary
                            : theme.textSecondary
                        }
                      />
                      <AppText
                        style={[
                          styles.optionChipText,
                          themeStyle === 'apple-glass' && styles.optionChipTextActive,
                        ]}
                      >
                        Apple Glass (iOS 18)
                      </AppText>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.optionChip,
                        themeStyle === 'default' && styles.optionChipActive,
                      ]}
                      onPress={() => handleSelectSurface('default')}
                      activeOpacity={0.7}
                    >
                      <Layers
                        size={15}
                        color={
                          themeStyle === 'default'
                            ? theme.primary
                            : theme.textSecondary
                        }
                      />
                      <AppText
                        style={[
                          styles.optionChipText,
                          themeStyle === 'default' && styles.optionChipTextActive,
                        ]}
                      >
                        Flat UI (Tối Giản)
                      </AppText>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* 3. Accent Palette Selection */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                      <Palette size={15} color={theme.primary} />
                      <AppText style={styles.sectionTitle}>
                        {t('themeStudio.accentTitle', '3. Màu Sắc Chủ Đạo')}
                      </AppText>
                    </View>
                    <View style={styles.sectionBadge}>
                      <AppText style={styles.sectionBadgeText}>
                        {AccentPalettes[accentColor]?.nameVi}
                      </AppText>
                    </View>
                  </View>

                  <View style={styles.colorGrid}>
                    {accentList.map((acc) => {
                      const isSelected = accentColor === acc.id;
                      return (
                        <TouchableOpacity
                          key={acc.id}
                          style={[
                            styles.colorSwatchItem,
                            isSelected && styles.colorSwatchItemActive,
                          ]}
                          onPress={() => handleSelectAccent(acc.id)}
                          activeOpacity={0.7}
                        >
                          <View
                            style={[
                              styles.colorDot,
                              { backgroundColor: acc.hex },
                            ]}
                          >
                            {isSelected && <Check size={12} color="#FFFFFF" />}
                          </View>
                          <AppText
                            numberOfLines={1}
                            style={[
                              styles.colorSwatchName,
                              isSelected && styles.colorSwatchNameActive,
                              isSelected && { color: theme.primary },
                            ]}
                          >
                            {acc.nameVi.split(' ')[1] || acc.nameVi}
                          </AppText>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* 4. Border Radius Hierarchy */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                      <Sliders size={15} color={theme.primary} />
                      <AppText style={styles.sectionTitle}>
                        {t('themeStudio.radiusTitle', '4. Mức Độ Bo Góc')}
                      </AppText>
                    </View>
                    <View style={styles.sectionBadge}>
                      <AppText style={styles.sectionBadgeText}>
                        Max {radiusTokens.card}px
                      </AppText>
                    </View>
                  </View>

                  <View style={styles.radiusGrid}>
                    {radiusList.map((preset) => {
                      const isSelected = radiusPreset === preset.id;
                      const isPill = preset.control >= 999;
                      return (
                        <TouchableOpacity
                          key={preset.id}
                          style={[
                            styles.radiusPresetCard,
                            preset.id === 'sharp' && styles.radiusPresetCardSharp,
                            preset.id === 'compact' && styles.radiusPresetCardCompact,
                            preset.id === 'standard' && styles.radiusPresetCardStandard,
                            preset.id === 'smooth' && styles.radiusPresetCardSmooth,
                            isSelected && styles.radiusPresetCardActive,
                          ]}
                          onPress={() => handleSelectRadius(preset.id)}
                          activeOpacity={0.7}
                        >
                          <View
                            style={[
                              styles.radiusVisualBox,
                              preset.id === 'sharp' && styles.radiusVisualBoxSharp,
                              preset.id === 'compact' && styles.radiusVisualBoxCompact,
                              preset.id === 'standard' && styles.radiusVisualBoxStandard,
                              preset.id === 'smooth' && styles.radiusVisualBoxSmooth,
                              isSelected && styles.radiusVisualBoxActive,
                            ]}
                          />
                          <AppText
                            style={[
                              styles.radiusPresetName,
                              isSelected && styles.radiusPresetNameActive,
                            ]}
                          >
                            {preset.name}
                          </AppText>
                          <AppText style={styles.radiusPresetPixel}>
                            {isPill ? '16px / Pill' : `${preset.card}px / ${preset.control}px`}
                          </AppText>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* 5. Tactile Feedback Haptics */}
                <View style={styles.switchRow}>
                  <View style={styles.switchLabelGroup}>
                    <AppText style={styles.switchTitle}>
                      Phản Hồi Rung Xúc Giác (Haptics)
                    </AppText>
                    <AppText style={styles.switchDesc}>
                      Rung nhẹ tạo chiều sâu xúc giác khi chạm nút và cử chỉ
                    </AppText>
                  </View>
                  <AppSwitch
                    value={hapticsEnabled}
                    onValueChange={handleToggleHaptics}
                  />
                </View>

                {/* 6. Live Interactive Sandbox Preview */}
                <View style={styles.sandboxCard}>
                  <View style={styles.sandboxHeader}>
                    <AppText style={styles.sandboxTitle} numberOfLines={1}>
                      Xem Trước Trực Quan
                    </AppText>
                    <View style={styles.sandboxTag}>
                      <AppText style={styles.sandboxTagText}>
                        {radiusTokens.name} • {AccentPalettes[accentColor]?.nameVi}
                      </AppText>
                    </View>
                  </View>

                  <View style={styles.sandboxControls}>
                    <AppButton
                      title="Nút Thử Nghiệm Live (Primary)"
                      variant="primary"
                      size="md"
                      leftIcon={<Zap size={16} color="#FFFFFF" />}
                      onPress={() => haptics.success()}
                    />
                    <AppButton
                      title="Nút Thứ Cấp Live (Tonal)"
                      variant="tonal"
                      size="sm"
                      onPress={() => haptics.light()}
                    />
                  </View>
                </View>

                {/* Footer Actions */}
                <View style={styles.footerRow}>
                  <View style={styles.footerBtn}>
                    <AppButton
                      title="Mặc Định"
                      variant="outline"
                      size="md"
                      leftIcon={<RotateCcw size={16} color={theme.primary} />}
                      onPress={handleReset}
                    />
                  </View>
                  <View style={styles.footerBtn}>
                    <AppButton
                      title="Hoàn Tất"
                      variant="primary"
                      size="md"
                      leftIcon={<Check size={16} color="#FFFFFF" />}
                      onPress={onClose}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
