import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
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
  Contrast,
  SunMedium,
  Box,
  PanelTop,
  Languages,
  Type,
  Ruler,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { AppText } from '@/components/common/AppText';
import { AppButton } from '@/components/common/AppButton';
import { AppSwitch } from '@/components/common/AppSwitch';
import { AppSegmentedControl } from '@/components/common/AppSegmentedControl';
import { AppScrollView } from '@/components/common/AppScrollView';
import type { ControlContrast, ControlShadow, ControlVariant } from '@/components/common/surfaceUtils';
import { useThemeMode } from '@/hooks/useThemeMode';
import {
  useAppStore,
  type HeaderVariant,
  type Language,
  type FontScale,
} from '@/hooks/useAppStore';
import { AccentPalettes, AccentColor } from '@/constants/colors';
import { RadiusPresets, RadiusPreset, type ControlSizeKey } from '@/constants/theme';
import { haptics } from '@/utils/haptics';
import type { ThemeStudioModalProps } from './types';
import { createThemeStudioStyles } from './styles';

const ACCENT_VN_NAMES: Record<AccentColor, string> = {
  blue: 'Hoàng Gia',
  emerald: 'Lục Bảo',
  violet: 'Điện Biên',
  amber: 'Hổ Phách',
  rose: 'Hồng Ngọc',
  cyan: 'Lam Bắc Âu',
};

const ACCENT_EN_NAMES: Record<AccentColor, string> = {
  blue: 'Royal Blue',
  emerald: 'Emerald',
  violet: 'Violet',
  amber: 'Amber',
  rose: 'Ruby Rose',
  cyan: 'Nordic Cyan',
};

export const ThemeStudioModal: React.FC<ThemeStudioModalProps> = React.memo(({
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
    globalContrast,
    setGlobalContrast,
    globalShadow,
    setGlobalShadow,
    globalControlVariant,
    setGlobalControlVariant,
    globalControlSize,
    setGlobalControlSize,
    fontScale,
    setFontScale,
    reduceMotion,
    setReduceMotion,
    hapticsEnabled,
    setHapticsEnabled,
    resetThemeSettings,
    isDark,
  } = useThemeMode();

  const {
    headerVariant,
    setHeaderVariant,
    language,
    setLanguage,
  } = useAppStore();

  const styles = createThemeStudioStyles(theme, radiusTokens, isDark);
  const isVi = language === 'vi';

  const controlSizeOptions = [
    { label: isVi ? 'Nhỏ (36px)' : 'Small (36px)', value: 'sm' as ControlSizeKey },
    { label: isVi ? 'Chuẩn (44px)' : 'Medium (44px)', value: 'md' as ControlSizeKey },
    { label: isVi ? 'Lớn (52px)' : 'Large (52px)', value: 'lg' as ControlSizeKey },
  ];

  const fontScaleOptions = [
    { label: isVi ? 'Nhỏ (90%)' : 'Small (90%)', value: 'small' as FontScale },
    { label: isVi ? 'Chuẩn (100%)' : 'Normal (100%)', value: 'standard' as FontScale },
    { label: isVi ? 'Lớn (115%)' : 'Large (115%)', value: 'large' as FontScale },
  ];

  const headerVariantOptions = [
    { label: 'Standard', value: 'standard' as HeaderVariant },
    { label: isVi ? '🏝️ Đảo Nổi' : '🏝️ Island', value: 'floating-pill' as HeaderVariant },
    { label: isVi ? '💊 Viên Thuốc' : '💊 Capsule', value: 'frosted-capsule' as HeaderVariant },
  ];

  const contrastOptions = [
    { label: isVi ? 'Dịu Nhẹ' : 'Subtle', value: 'subtle' as ControlContrast },
    { label: isVi ? 'Chuẩn' : 'Normal', value: 'normal' as ControlContrast },
    { label: isVi ? 'Đậm Nét' : 'High', value: 'high' as ControlContrast },
  ];

  const shadowOptions = [
    { label: isVi ? 'Tắt (Flat)' : 'None (Flat)', value: 'none' as ControlShadow },
    { label: isVi ? 'Nhẹ (Sm)' : 'Light (Sm)', value: 'sm' as ControlShadow },
    { label: isVi ? 'Vừa (Md)' : 'Medium (Md)', value: 'md' as ControlShadow },
    { label: isVi ? 'Nổi (Lg)' : 'Large (Lg)', value: 'lg' as ControlShadow },
  ];

  const surfaceVariantOptions = [
    { label: 'Standard', value: 'standard' as ControlVariant },
    { label: 'Filled', value: 'filled' as ControlVariant },
    { label: 'Glass', value: 'glass' as ControlVariant },
    { label: 'Elevated', value: 'elevated' as ControlVariant },
    { label: 'Outline', value: 'outline' as ControlVariant },
  ];

  const languageOptions = [
    { label: '🇻🇳 Tiếng Việt', value: 'vi' as Language },
    { label: '🇬🇧 English', value: 'en' as Language },
  ];

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

  const handleToggleReduceMotion = (val: boolean) => {
    setReduceMotion(val);
    if (hapticsEnabled) haptics.light();
  };

  const handleReset = () => {
    haptics.warning();
    resetThemeSettings();
  };

  const activeAccentName = isVi
    ? (AccentPalettes[accentColor]?.nameVi || 'Hoàng Gia')
    : (AccentPalettes[accentColor]?.name || 'Royal Blue');

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      hardwareAccelerated
      animationType={reduceMotion ? 'none' : 'slide'}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Đóng"
        >
          <View
            style={[
              StyleSheet.absoluteFill,
              isDark ? styles.backdropDark : styles.backdropLight,
            ]}
          >
            {Platform.OS === 'ios' && (
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType={isDark ? 'dark' : 'light'}
                blurAmount={25}
                reducedTransparencyFallbackColor={isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.4)'}
              />
            )}
          </View>
        </Pressable>
        <View style={styles.sheetContainer}>
              {/* Drag Handle */}
              <View style={styles.dragHandleArea}>
                <View style={styles.dragHandle} />
              </View>

              {/* Pinned Sticky Header */}
              <View style={styles.header}>
                <View style={styles.headerTitleRow}>
                  <View style={styles.headerIconBox}>
                    <Palette size={20} color={theme.primary} />
                  </View>
                  <View style={styles.headerTextCol}>
                    <AppText style={styles.headerTitle} numberOfLines={1}>
                      {t('themeStudio.title', 'Studio Tinh Chỉnh Giao Diện')}
                    </AppText>
                    <AppText style={styles.headerSubtitle} numberOfLines={1}>
                      {t('themeStudio.subtitle', 'Thời gian thực • Lưu tự động • Thiết kế đồng bộ')}
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

              {/* Scrollable Body with Sleek Custom Indicator */}
              <AppScrollView
                style={styles.scrollView}
                indicatorVisible={true}
                indicatorThickness={3.5}
                indicatorInsets={{ top: 8, bottom: 8, right: 3 }}
                nestedScrollEnabled={true}
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
                        {mode === 'light' ? t('common.light', 'Sáng') : mode === 'dark' ? t('common.dark', 'Tối') : (isVi ? 'Hệ Thống' : 'System')}
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
                        {t('common.light', 'Sáng')}
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
                        {t('common.dark', 'Tối')}
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
                        {isVi ? 'Hệ Thống' : 'System'}
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
                        Flat UI ({isVi ? 'Tối Giản' : 'Minimal'})
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
                        {activeAccentName}
                      </AppText>
                    </View>
                  </View>

                  <View style={styles.colorGrid}>
                    {accentList.map((acc) => {
                      const isSelected = accentColor === acc.id;
                      const shortLabel = isVi
                        ? (ACCENT_VN_NAMES[acc.id] || acc.nameVi)
                        : (ACCENT_EN_NAMES[acc.id] || acc.name);

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
                            {isSelected && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                          </View>
                          <AppText
                            numberOfLines={1}
                            style={[
                              styles.colorSwatchName,
                              isSelected && styles.colorSwatchNameActive,
                              isSelected && { color: theme.primary },
                            ]}
                          >
                            {shortLabel}
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
                        {radiusTokens.name} • {radiusTokens.card}px
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
                            {isPill ? `${preset.card}px / Pill` : `${preset.card}px / ${preset.control}px`}
                          </AppText>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* 5. Default Control Size */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                      <Ruler size={15} color={theme.primary} />
                      <AppText style={styles.sectionTitle}>
                        {t('themeStudio.sizeTitle', '5. Kích Thước Điều Khiển Mặc Định')}
                      </AppText>
                    </View>
                    <View style={styles.sectionBadge}>
                      <AppText style={styles.sectionBadgeText}>
                        {globalControlSize === 'sm' ? (isVi ? 'Nhỏ (36px)' : 'Small') : globalControlSize === 'lg' ? (isVi ? 'Lớn (52px)' : 'Large') : (isVi ? 'Chuẩn (44px)' : 'Medium')}
                      </AppText>
                    </View>
                  </View>
                  <AppSegmentedControl<ControlSizeKey>
                    size="sm"
                    options={controlSizeOptions}
                    value={globalControlSize}
                    onChange={(val) => {
                      haptics.light();
                      setGlobalControlSize(val);
                    }}
                  />
                </View>

                {/* 6. System Font Scale */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                      <Type size={15} color={theme.primary} />
                      <AppText style={styles.sectionTitle}>
                        {t('themeStudio.fontScaleTitle', '6. Cỡ Chữ Toàn Hệ Thống')}
                      </AppText>
                    </View>
                    <View style={styles.sectionBadge}>
                      <AppText style={styles.sectionBadgeText}>
                        {fontScale === 'small' ? (isVi ? 'Nhỏ (90%)' : 'Small') : fontScale === 'large' ? (isVi ? 'Lớn (115%)' : 'Large') : (isVi ? 'Chuẩn (100%)' : 'Standard')}
                      </AppText>
                    </View>
                  </View>
                  <AppSegmentedControl<FontScale>
                    size="sm"
                    options={fontScaleOptions}
                    value={fontScale}
                    onChange={(val) => {
                      haptics.light();
                      setFontScale(val);
                    }}
                  />
                </View>

                {/* 7. Navigation Header Variant */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                      <PanelTop size={15} color={theme.primary} />
                      <AppText style={styles.sectionTitle}>
                        {t('themeStudio.headerTitle', '7. Thanh Tiêu Đề Điều Hướng')}
                      </AppText>
                    </View>
                    <View style={styles.sectionBadge}>
                      <AppText style={styles.sectionBadgeText}>
                        {headerVariant === 'standard' ? 'Standard' : headerVariant === 'floating-pill' ? (isVi ? 'Đảo Nổi' : 'Island') : 'Capsule'}
                      </AppText>
                    </View>
                  </View>
                  <AppSegmentedControl<HeaderVariant>
                    size="sm"
                    options={headerVariantOptions}
                    value={headerVariant}
                    onChange={(val) => {
                      haptics.light();
                      setHeaderVariant(val);
                    }}
                  />
                </View>

                {/* 8. Default Form Surface Variant */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                      <Box size={15} color={theme.primary} />
                      <AppText style={styles.sectionTitle}>
                        {t('themeStudio.variantTitle', '8. Kiểu Bề Mặt Mặc Định (Form Base)')}
                      </AppText>
                    </View>
                    <View style={styles.sectionBadge}>
                      <AppText style={styles.sectionBadgeText}>
                        {globalControlVariant.toUpperCase()}
                      </AppText>
                    </View>
                  </View>
                  <AppSegmentedControl<ControlVariant>
                    size="sm"
                    options={surfaceVariantOptions}
                    value={globalControlVariant}
                    onChange={(val) => {
                      haptics.light();
                      setGlobalControlVariant(val);
                    }}
                  />
                </View>

                {/* 9. System Contrast Level */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                      <Contrast size={15} color={theme.primary} />
                      <AppText style={styles.sectionTitle}>
                        {t('themeStudio.contrastTitle', '9. Mức Độ Tương Phản Viền')}
                      </AppText>
                    </View>
                    <View style={styles.sectionBadge}>
                      <AppText style={styles.sectionBadgeText}>
                        {globalContrast === 'high' ? (isVi ? 'Đậm Nét' : 'High') : globalContrast === 'subtle' ? (isVi ? 'Dịu Nhẹ' : 'Subtle') : (isVi ? 'Chuẩn' : 'Normal')}
                      </AppText>
                    </View>
                  </View>
                  <AppSegmentedControl<ControlContrast>
                    size="sm"
                    options={contrastOptions}
                    value={globalContrast}
                    onChange={(val) => {
                      haptics.light();
                      setGlobalContrast(val);
                    }}
                  />
                </View>

                {/* 10. Global Surface Shadow */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                      <SunMedium size={15} color={theme.primary} />
                      <AppText style={styles.sectionTitle}>
                        {t('themeStudio.shadowTitle', '10. Bóng Đổ Khối Nổi')}
                      </AppText>
                    </View>
                    <View style={styles.sectionBadge}>
                      <AppText style={styles.sectionBadgeText}>
                        {globalShadow === 'none' ? (isVi ? 'Tắt' : 'None') : globalShadow === 'sm' ? (isVi ? 'Nhẹ' : 'Light') : globalShadow === 'md' ? (isVi ? 'Vừa' : 'Medium') : (isVi ? 'Nổi' : 'Large')}
                      </AppText>
                    </View>
                  </View>
                  <AppSegmentedControl<any>
                    size="sm"
                    options={shadowOptions}
                    value={globalShadow}
                    onChange={(val) => {
                      haptics.light();
                      setGlobalShadow(val);
                    }}
                  />
                </View>

                {/* 11. Language Selection with Flags */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                      <Languages size={15} color={theme.primary} />
                      <AppText style={styles.sectionTitle}>
                        {t('themeStudio.languageTitle', '11. Ngôn Ngữ Hệ Thống (Language)')}
                      </AppText>
                    </View>
                    <View style={styles.sectionBadge}>
                      <AppText style={styles.sectionBadgeText}>
                        {isVi ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}
                      </AppText>
                    </View>
                  </View>
                  <AppSegmentedControl<Language>
                    size="sm"
                    options={languageOptions}
                    value={language}
                    onChange={(val) => {
                      haptics.light();
                      setLanguage(val);
                    }}
                  />
                </View>

                {/* 12. Tactile Feedback Haptics */}
                <View style={styles.switchRow}>
                  <View style={styles.switchLabelGroup}>
                    <AppText style={styles.switchTitle}>
                      {t('themeStudio.hapticsTitle', 'Phản Hồi Rung Xúc Giác (Haptics)')}
                    </AppText>
                    <AppText style={styles.switchDesc}>
                      {t('themeStudio.hapticsDesc', 'Rung nhẹ tạo chiều sâu xúc giác khi chạm nút và cử chỉ')}
                    </AppText>
                  </View>
                  <AppSwitch
                    value={hapticsEnabled}
                    onValueChange={handleToggleHaptics}
                  />
                </View>

                {/* 13. Reduce Motion Accessibility Switch */}
                <View style={styles.switchRow}>
                  <View style={styles.switchLabelGroup}>
                    <AppText style={styles.switchTitle}>
                      {t('themeStudio.reduceMotionTitle', 'Giảm Chuyển Động (Reduce Motion)')}
                    </AppText>
                    <AppText style={styles.switchDesc}>
                      {t('themeStudio.reduceMotionDesc', 'Tối ưu hóa tốc độ, tắt các hiệu ứng chuyển động phức tạp')}
                    </AppText>
                  </View>
                  <AppSwitch
                    value={reduceMotion}
                    onValueChange={handleToggleReduceMotion}
                  />
                </View>
              </AppScrollView>

              {/* Pinned Bottom Footer Actions */}
              <View style={styles.footerContainer}>
                <View style={styles.footerBtn}>
                  <AppButton
                    title={t('themeStudio.defaultBtn', 'Mặc Định')}
                    variant="outline"
                    size="md"
                    leftIcon={<RotateCcw size={16} color={theme.primary} />}
                    onPress={handleReset}
                  />
                </View>
                <View style={styles.footerBtn}>
                  <AppButton
                    title={t('themeStudio.doneBtn', 'Hoàn Tất')}
                    variant="primary"
                    size="md"
                    leftIcon={<Check size={16} color="#FFFFFF" />}
                    onPress={onClose}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
  );
});

