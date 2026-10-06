import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Sliders, CheckCircle2 } from 'lucide-react-native';
import { AppText, AppButton } from '@/components';
import { AccentPalettes, type AccentColor, type ThemeColors } from '@/constants/colors';
import { RadiusPresets, type RadiusPreset, type RadiusPresetConfig } from '@/constants/theme';
import { haptics } from '@/utils';
import type { ThemeStyle } from '@/hooks';

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
  return (
    <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
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
            variant="tonal"
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
            variant="tonal"
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
                isDark ? styles.accentBtnDark : styles.accentBtnLight,
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
                isDark ? styles.radiusCardDark : styles.radiusCardLight,
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
                  preset.id === 'sharp' && { borderRadius: 3 },
                  preset.id === 'compact' && { borderRadius: 6 },
                  preset.id === 'standard' && { borderRadius: 9 },
                  preset.id === 'smooth' && { borderRadius: 12 },
                  isSelected
                    ? { borderColor: themeColors.primary, borderStyle: 'solid' }
                    : { borderColor: themeColors.textSecondary },
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
      <View style={[styles.summaryBox, isDark ? styles.summaryBoxDark : styles.summaryBoxLight]}>
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
        variant="primary"
        size="md"
        leftIcon={<Sliders size={16} color="#FFFFFF" strokeWidth={2.2} />}
        onPress={onOpenStudioModal}
      />
    </View>
  );
};

const createThemeStudioStyles = (radius: RadiusPresetConfig) =>
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
    grid2: {
      flexDirection: 'row',
      gap: 8,
    },
    gridItem: {
      flex: 1,
    },
    sectionLabel: {
      fontSize: 10.5,
      fontWeight: '800',
      letterSpacing: 0.6,
      marginTop: 2,
    },
    accentGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      justifyContent: 'space-between',
    },
    accentBtn: {
      width: '31%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      height: 38,
      paddingHorizontal: 10,
      borderRadius: radius.smControl,
      borderWidth: 1.4,
    },
    accentBtnLight: {
      backgroundColor: '#F8FAFC',
      borderColor: '#E2E8F0',
    },
    accentBtnDark: {
      backgroundColor: '#1E293B',
      borderColor: '#334155',
    },
    accentDot: {
      width: 14,
      height: 14,
      borderRadius: 7,
    },
    accentName: {
      fontSize: 11.5,
      fontWeight: '600',
      flex: 1,
    },
    accentNameActive: {
      fontWeight: '700',
    },
    radiusGrid: {
      flexDirection: 'row',
      gap: 8,
    },
    radiusCard: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 4,
      alignItems: 'center',
      borderRadius: radius.control,
      borderWidth: 1.4,
      gap: 5,
    },
    radiusCardLight: {
      backgroundColor: '#F8FAFC',
      borderColor: '#E2E8F0',
    },
    radiusCardDark: {
      backgroundColor: '#1E293B',
      borderColor: '#334155',
    },
    radiusPreview: {
      width: 24,
      height: 24,
      borderWidth: 1.8,
      borderStyle: 'dashed',
    },
    radiusName: {
      fontSize: 11,
      fontWeight: '700',
    },
    radiusNameActive: {
      fontWeight: '800',
    },
    radiusPx: {
      fontSize: 9.5,
    },
    summaryBox: {
      borderRadius: radius.card,
      padding: 12,
      gap: 8,
      borderWidth: 1,
    },
  summaryBoxLight: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  summaryBoxDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryText: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
});
