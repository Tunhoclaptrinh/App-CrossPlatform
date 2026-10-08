import React, { useState, useEffect } from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Search, X, SlidersHorizontal } from 'lucide-react-native';
import { useDebounce } from '@/hooks/useDebounce';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
import type { AppSearchBarProps } from './types';
import { DEFAULT_SEARCH_DEBOUNCE_MS, DEFAULT_SEARCH_PLACEHOLDER } from './constants';
import {
  styles,
  getSearchBarThemedContainer,
  getFilterButtonThemedStyle,
  getSearchBarSizeStyle,
  getSearchBarInputSizeStyle,
} from './styles';
import { ControlSize } from '@/constants/theme';

export const AppSearchBar: React.FC<AppSearchBarProps> = React.memo(({
  value: controlledValue,
  onChangeText,
  onDebounceChange,
  debounceDelay = DEFAULT_SEARCH_DEBOUNCE_MS,
  placeholder = DEFAULT_SEARCH_PLACEHOLDER,
  size: propSize,
  onFilterPress,
  onClear,
  style,
  variant,
  contrast,
  shadow,
  borderRadius,
  borderWidth,
  borderColor,
  backgroundColor,
}) => {
  const {
    theme: themeColors,
    isDark,
    radiusTokens,
    globalContrast,
    globalShadow,
    globalControlVariant,
    globalControlSize,
  } = useThemeMode();
  const size = propSize ?? globalControlSize ?? 'md';
  const { themeStyle } = useAppStore();
  const isGlass = themeStyle === 'apple-glass';
  const iconSize = ControlSize[size].iconSize;

  const [text, setText] = useState(controlledValue || '');
  const debouncedText = useDebounce(text, debounceDelay);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setText(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    if (onDebounceChange) {
      onDebounceChange(debouncedText);
    }
  }, [debouncedText, onDebounceChange]);

  const handleChangeText = (val: string) => {
    setText(val);
    if (onChangeText) {
      onChangeText(val);
    }
  };

  const handleClear = () => {
    setText('');
    if (onChangeText) onChangeText('');
    if (onClear) onClear();
  };

  const containerSurfaceStyle = getSearchBarThemedContainer({
    colors: themeColors,
    isDark,
    isGlassMode: isGlass,
    radiusTokens,
    globalContrast,
    globalShadow,
    globalControlVariant,
    variant,
    contrast,
    shadow,
    borderRadius,
    borderWidth,
    borderColor,
    backgroundColor,
  });

  return (
    <View
      style={[
        styles.container,
        getSearchBarSizeStyle(size),
        containerSurfaceStyle,
        style,
      ]}
    >
      <Search size={iconSize} color={themeColors.textSecondary} style={styles.searchIcon} />

      <TextInput
        value={text}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor={themeColors.textSecondary}
        style={[styles.input, getSearchBarInputSizeStyle(size), { color: themeColors.text }]}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {text.length > 0 && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleClear}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.iconButton}
        >
          <X size={16} color={themeColors.textSecondary} />
        </TouchableOpacity>
      )}

      {onFilterPress && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onFilterPress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={[styles.iconButton, styles.filterButton, getFilterButtonThemedStyle(themeColors)]}
        >
          <SlidersHorizontal size={18} color={themeColors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
});
