import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Layers,
  Sliders,
  Box,
  Sparkles,
  Maximize2,
  Zap,
} from 'lucide-react-native';
import { AppText } from '@/components';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';
import type { StoryCategory } from '../types';
import { haptics } from '@/utils';

interface CategoryFilterChipsProps {
  activeCategory: StoryCategory;
  onSelectCategory: (category: StoryCategory) => void;
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
}

export const CategoryFilterChips: React.FC<CategoryFilterChipsProps> = ({
  activeCategory,
  onSelectCategory,
  themeColors,
  radiusTokens,
  isDark,
}) => {
  const categories: { id: StoryCategory; label: string; icon: any }[] = [
    { id: 'all', label: 'Tất Cả Linh Kiện', icon: Layers },
    { id: 'motion', label: 'Hiệu Ứng (Motion Lab)', icon: Zap },
    { id: 'molecules', label: 'Form & Nút (Molecules)', icon: Sliders },
    { id: 'organisms', label: 'Bề Mặt & Header (Organisms)', icon: Box },
    { id: 'atoms', label: 'Chỉ Số & Khung (Atoms)', icon: Sparkles },
    { id: 'parity', label: 'Ma Trận Tỷ Lệ (1:1 Scale)', icon: Maximize2 },
  ];

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        scroll: {
          flexGrow: 0,
          marginHorizontal: -16,
        },
        scrollContent: {
          paddingHorizontal: 16,
          gap: 8,
          paddingVertical: 2,
        },
        chip: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: 13,
          paddingVertical: 7,
          borderRadius: radiusTokens.pill,
          borderWidth: 1,
        },
        chipActive: {
          backgroundColor: '#6366F1',
          borderColor: '#6366F1',
        },
        chipInactive: {
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
        },
        chipText: {
          fontSize: 12.5,
          fontWeight: '600',
        },
        chipTextActive: {
          color: '#FFFFFF',
          fontWeight: '700',
        },
      }),
    [radiusTokens, isDark]
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled
      keyboardShouldPersistTaps="handled"
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
    >

      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        const IconComponent = cat.icon;
        return (
          <TouchableOpacity
            key={cat.id}
            activeOpacity={0.75}
            style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
            onPress={() => {
              haptics.light();
              onSelectCategory(cat.id);
            }}
          >
            <IconComponent
              size={13.5}
              color={isActive ? '#FFFFFF' : themeColors.textSecondary}
              strokeWidth={isActive ? 2.4 : 2}
            />
            <AppText
              style={[
                styles.chipText,
                isActive ? styles.chipTextActive : { color: themeColors.textSecondary },
              ]}
            >
              {cat.label}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
