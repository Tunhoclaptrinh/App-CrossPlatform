import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { AppText } from '@/components';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';
import { haptics } from '@/utils';

interface StorybookSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  resultCount: number;
  totalCount: number;
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
}

export const StorybookSearchBar: React.FC<StorybookSearchBarProps> = React.memo(({
  value,
  onChangeText,
  resultCount,
  totalCount,
  themeColors,
  radiusTokens,
  isDark,
}) => {
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.04)',
          borderRadius: radiusTokens.control,
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
          paddingHorizontal: 12,
          height: 44,
          gap: 8,
        },
        inputWrapper: {
          flex: 1,
          justifyContent: 'center',
          position: 'relative',
        },
        input: {
          width: '100%',
          fontSize: 14,
          color: themeColors.text,
          paddingVertical: 0,
          fontWeight: '500',
        },
        placeholderOverlay: {
          position: 'absolute',
          left: 0,
          right: 0,
          fontSize: 14,
          fontWeight: '500',
          color: themeColors.textTertiary || '#94A3B8',
        },
        clearButton: {
          padding: 4,
          borderRadius: 12,
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
        },
        countBadge: {
          paddingHorizontal: 8,
          paddingVertical: 3,
          borderRadius: radiusTokens.pill,
          backgroundColor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)',
        },
        countText: {
          fontSize: 11,
          fontWeight: '700',
          color: '#6366F1',
        },
      }),
    [themeColors, radiusTokens, isDark]
  );

  return (
    <View style={styles.container}>
      <Search size={18} color={themeColors.textSecondary} strokeWidth={2.2} />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="never"
          multiline={false}
          numberOfLines={1}
        />
        {!value && (
          <AppText
            numberOfLines={1}
            ellipsizeMode="tail"
            pointerEvents="none"
            style={styles.placeholderOverlay}
          >
            Tìm kiếm linh kiện (VD: Button, Input, Glass...)
          </AppText>
        )}
      </View>
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            haptics.light();
            onChangeText('');
          }}
          style={styles.clearButton}
          activeOpacity={0.7}
          accessibilityLabel="Xóa tìm kiếm"
        >
          <X size={13} color={themeColors.text} strokeWidth={2.5} />
        </TouchableOpacity>
      )}
      <View style={styles.countBadge}>
        <AppText style={styles.countText}>
          {value.trim() ? `${resultCount}/${totalCount}` : `${totalCount} mục`}
        </AppText>
      </View>
    </View>
  );
});

