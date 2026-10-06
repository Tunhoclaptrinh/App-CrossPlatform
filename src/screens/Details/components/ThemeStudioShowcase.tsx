import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Sliders, CheckCircle2 } from 'lucide-react-native';
import { AppText, AppButton } from '@/components';
import { AccentPalettes, type AccentColor, type ThemeColors } from '@/constants/colors';
import { RadiusPresets, type RadiusPreset, type RadiusPresetConfig } from '@/constants/theme';
import { haptics } from '@/utils';
import type { ThemeStyle } from '@/hooks';
import { createThemeStudioStyles } from './ThemeStudioShowcase.styles';

interface ThemeStudioShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  accentColor: AccentColor;
  setAccentColor: (accent: AccentColor) => void;
  radiusPreset: RadiusPreset;
  setRadiusPreset: (preset: RadiusPreset) => void;
  isDark: boolean;
  toggleTheme: () => void;
  themeStyle: ThemeStyle;
  onToggleThemeStyle: () => void;
  onOpenStudioModal: () => void;
}

export const ThemeStudioShowcase: React.FC<ThemeStudioShowcaseProps> = ({
  themeColors,
  radiusTokens,
  accentColor,
  setAccentColor,
  radiusPreset,
  setRadiusPreset,
  isDark,
  toggleTheme,
  themeStyle,
  onToggleThemeStyle,
  onOpenStudioModal,
}) => {
  const styles = useMemo(() => createThemeStudioStyles(radiusTokens), [radiusTokens]);
  const isGlass = themeStyle === 'apple-glass';

  return (
    <View
      style={[
        styles.card,
        isGlass
          ? isDark
            ? styles.cardGlassDark
            : styles.cardGlassLight
          : isDark
          ? styles.cardDark
          : styles.cardLight,
      ]}
    >
      {isGlass && (
        <View style={isDark ? styles.specularHighlightDark : styles.specularHighlight} />
      )}

      {/* Title Header */}
      <View style={styles.titleRow}>
        <View style={[styles.iconBox, { backgroundColor: `${themeColors.primary}18` }]}>
          <Sliders size={18} color={themeColors.primary} strokeWidth={2.4} />
        </View>
        <View style={styles.titleTextCol}>
          <AppText style={[styles.title, { color: themeColors.text }]}>
            Studio Bo Góc & Màu Sắc Chủ Đạo
          </AppText>
          <AppText style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Điều chỉnh giao diện trong thời gian thực, tự động áp dụng toàn app
          </AppText>
        </View>
      </View>

      {/* Mode Switches */}
      <View style={styles.grid2}>
        <View style={styles.gridItem}>
          <AppButton
            title={isDark ? 'Chế độ Tối (Dark)' : 'Chế độ Sáng (Light)'}
            variant={isGlass ? 'glass' : 'tonal'}
            size="sm"
            onPress={() => {
              haptics.light();
              toggleTheme();
            }}
          />
        </View>
        <View style={styles.gridItem}>
          <AppButton
            title={themeStyle === 'apple-glass' ? 'Kính Apple Glass' : 'Giao diện Flat UI'}
            variant={isGlass ? 'glass' : 'tonal'}
            size="sm"
            onPress={onToggleThemeStyle}
          />
        </View>
      </View>

      {/* Accent Colors */}
      <AppText style={[styles.sectionLabel, { color: themeColors.textSecondary }]}>
        MÀU SẮC CHỦ ĐẠO (ACCENT COLOR)
      </AppText>
      <View style={styles.accentGrid}>
        {Object.values(AccentPalettes).map((acc) => {
          const isSelected = accentColor === acc.id;
          return (
            <TouchableOpacity
              key={acc.id}
              style={[
                styles.accentBtn,
                isGlass
                  ? isDark
                    ? styles.accentBtnGlassDark
                    : styles.accentBtnGlassLight
                  : isDark
                  ? styles.accentBtnDark
                  : styles.accentBtnLight,
                isSelected && {
                  borderColor: acc.hex,
                  backgroundColor: `${acc.hex}15`,
                },
              ]}
              onPress={() => {
                haptics.light();
                setAccentColor(acc.id);
              }}
              activeOpacity={0.75}
            >
              <View style={[styles.accentDot, { backgroundColor: acc.hex }]} />
              <AppText
                numberOfLines={1}
                style={[
                  styles.accentName,
                  { color: isSelected ? acc.hex : themeColors.text },
                  isSelected && styles.accentNameActive,
                ]}
              >
                {acc.nameVi.split(' ')[1] || acc.nameVi}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Radius Presets */}
      <AppText style={[styles.sectionLabel, { color: themeColors.textSecondary }]}>
        CẤP ĐỘ BO GÓC (MAX 16PX AN TOÀN)
      </AppText>
      <View style={styles.radiusGrid}>
        {Object.values(RadiusPresets).map((preset) => {
          const isSelected = radiusPreset === preset.id;
          return (
            <TouchableOpacity
              key={preset.id}
              style={[
                styles.radiusCard,
                isGlass
                  ? isDark
                    ? styles.radiusCardGlassDark
                    : styles.radiusCardGlassLight
                  : isDark
                  ? styles.radiusCardDark
                  : styles.radiusCardLight,
                isSelected && {
                  borderColor: themeColors.primary,
                  backgroundColor: `${themeColors.primary}12`,
                },
              ]}
              onPress={() => {
                haptics.light();
                setRadiusPreset(preset.id);
              }}
              activeOpacity={0.75}
            >
              <View
                style={[
                  styles.radiusPreview,
                  preset.id === 'sharp' && styles.radiusSharp,
                  preset.id === 'compact' && styles.radiusCompact,
                  preset.id === 'standard' && styles.radiusStandard,
                  preset.id === 'smooth' && styles.radiusSmooth,
                  isSelected ? styles.radiusBorderSelected : styles.radiusBorderDefault,
                  isSelected && { borderColor: themeColors.primary },
                ]}
              />
              <AppText
                style={[
                  styles.radiusName,
                  { color: isSelected ? themeColors.primary : themeColors.text },
                  isSelected && styles.radiusNameActive,
                ]}
              >
                {preset.name}
              </AppText>
              <AppText style={[styles.radiusPx, { color: themeColors.textSecondary }]}>
                {preset.control >= 999 ? '16px/Pill' : `${preset.card}px`}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Current tokens summary */}
      <View
        style={[
          styles.summaryBox,
          isGlass
            ? isDark
              ? styles.summaryBoxGlassDark
              : styles.summaryBoxGlassLight
            : isDark
            ? styles.summaryBoxDark
            : styles.summaryBoxLight,
        ]}
      >
        <View style={styles.summaryRow}>
          <CheckCircle2 size={15} color={themeColors.primary} strokeWidth={2.4} />
          <AppText style={[styles.summaryText, { color: themeColors.text }]}>
            Bo góc: {radiusTokens.name} (Card: {radiusTokens.card}px, Control: {radiusTokens.control}px)
          </AppText>
        </View>
        <View style={styles.summaryRow}>
          <CheckCircle2 size={15} color={themeColors.primary} strokeWidth={2.4} />
          <AppText style={[styles.summaryText, { color: themeColors.text }]}>
            Màu chủ đạo: {AccentPalettes[accentColor]?.nameVi} ({themeColors.primary})
          </AppText>
        </View>
      </View>

      <AppButton
        title="Mở Bảng Tinh Chỉnh Nổi (Studio Modal)"
        variant={isGlass ? 'glass' : 'primary'}
        size="md"
        leftIcon={
          <Sliders
            size={16}
            color={isGlass ? themeColors.text : '#FFFFFF'}
            strokeWidth={2.2}
          />
        }
        onPress={onOpenStudioModal}
      />
    </View>
  );
};


