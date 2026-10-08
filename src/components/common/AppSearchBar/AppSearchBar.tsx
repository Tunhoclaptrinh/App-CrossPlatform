import React, { useState, useEffect, useMemo } from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Search, X, SlidersHorizontal } from 'lucide-react-native';
import { useDebounce } from '@/hooks/useDebounce';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
import { AppText } from '../AppText';
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
  onFocus,
  onBlur,
  autoFocus,
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

  const containerSurfaceStyle = useMemo(
    () =>
      getSearchBarThemedContainer({
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
      }),
    [
      themeColors,
      isDark,
      isGlass,
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
    ]
  );

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

      <View style={styles.inputWrapper}>
        <TextInput
          value={text}
          onChangeText={handleChangeText}
          placeholder=""
          style={[styles.input, getSearchBarInputSizeStyle(size), { color: themeColors.text }]}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          multiline={false}
          numberOfLines={1}
          autoFocus={autoFocus}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {!text && Boolean(placeholder) && (
          <AppText
            numberOfLines={1}
            ellipsizeMode="tail"
            pointerEvents="none"
            style={[
              styles.placeholderOverlay,
              getSearchBarInputSizeStyle(size),
              { color: themeColors.textSecondary },
            ]}
          >
            {placeholder}
          </AppText>
        )}
      </View>

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
