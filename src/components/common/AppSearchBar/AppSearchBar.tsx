import React, { useState, useEffect } from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Search, X, SlidersHorizontal } from 'lucide-react-native';
import { useDebounce } from '@/hooks/useDebounce';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { AppSearchBarProps } from './types';
import { DEFAULT_SEARCH_DEBOUNCE_MS, DEFAULT_SEARCH_PLACEHOLDER } from './constants';
import { styles, getSearchBarThemedContainer, getFilterButtonThemedStyle } from './styles';

export const AppSearchBar: React.FC<AppSearchBarProps> = ({
  value: controlledValue,
  onChangeText,
  onDebounceChange,
  debounceDelay = DEFAULT_SEARCH_DEBOUNCE_MS,
  placeholder = DEFAULT_SEARCH_PLACEHOLDER,
  onFilterPress,
  onClear,
  style,
}) => {
  const { theme: themeColors } = useThemeMode();

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

  return (
    <View
      style={[
        styles.container,
        getSearchBarThemedContainer(themeColors),
        style,
      ]}
    >
      <Search size={18} color={themeColors.textSecondary} style={styles.searchIcon} />

      <TextInput
        value={text}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor={themeColors.textSecondary}
        style={[styles.input, { color: themeColors.text }]}
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
};
