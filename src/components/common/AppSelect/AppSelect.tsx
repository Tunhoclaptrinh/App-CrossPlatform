import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  Platform,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { ChevronDown, Check, X } from 'lucide-react-native';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
import { ControlSize } from '@/constants/theme';
import { haptics } from '@/utils/haptics';
import { removeVietnameseTones } from '@/utils/formatters';
import { AppText } from '../AppText';
import { AppScrollView } from '../AppScrollView';
import { AppSearchBar } from '../AppSearchBar';
import type { AppSelectProps, AppSelectOption } from './types';
import {
  styles,
  getSelectSizeStyle,
  getSelectTextSizeStyle,
  getSelectTriggerStyle,
} from './styles';

export const AppSelect = React.memo(function AppSelectComponent<T = string | number>({
  options,
  value,
  onSelect,
  size: propSize,
  label,
  placeholder = 'Chọn một mục...',
  error,
  disabled = false,
  leftIcon,
  containerStyle,
  sheetTitle,
  variant,
  contrast,
  shadow,
  borderRadius,
  borderWidth,
  borderColor,
  backgroundColor,
  searchable,
  searchPlaceholder = 'Tìm kiếm lựa chọn...',
}: AppSelectProps<T>) {
  const {
    theme: themeColors,
    isDark,
    radiusTokens,
    globalContrast,
    globalShadow,
    globalControlVariant,
    globalControlSize,
    reduceMotion,
  } = useThemeMode();
  const { height: windowHeight } = useWindowDimensions();
  const size = propSize ?? globalControlSize ?? 'md';
  const { themeStyle } = useAppStore();
  const isGlassMode = themeStyle === 'apple-glass';
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const effectiveKeyboardHeight = useMemo(() => {
    if (keyboardHeight > 0) return keyboardHeight;
    if (isInputFocused) {
      return Platform.OS === 'android'
        ? Math.max(320, Math.min(380, Math.round(windowHeight * 0.42)))
        : Math.round(windowHeight * 0.40);
    }
    return 0;
  }, [keyboardHeight, isInputFocused, windowHeight]);

  const isKeyboardOpen = effectiveKeyboardHeight > 0;

  const isSearchEnabled = searchable ?? (options.length > 7);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (e) => {
      setKeyboardHeight(e.endCoordinates ? e.endCoordinates.height : 0);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
      setIsInputFocused(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setKeyboardHeight(0);
      setIsInputFocused(false);
    }
  }, [isOpen]);

  const filteredOptions = useMemo(() => {
    if (!isSearchEnabled || !searchQuery.trim()) return options;
    const q = removeVietnameseTones(searchQuery.trim().toLowerCase());
    return options.filter((opt) => {
      const matchLabel = removeVietnameseTones(opt.label.toLowerCase()).includes(q);
      const matchSub = opt.sublabel
        ? removeVietnameseTones(opt.sublabel.toLowerCase()).includes(q)
        : false;
      return matchLabel || matchSub;
    });
  }, [options, isSearchEnabled, searchQuery]);

  const selectedOption = options.find((opt) => opt.value === value);
  const sizeContainerStyle = getSelectSizeStyle(size);
  const sizeTextStyle = getSelectTextSizeStyle(size);
  const iconSize = ControlSize[size].iconSize;
  const triggerStateStyle = getSelectTriggerStyle({
    colors: themeColors,
    isDark,
    isGlassMode,
    isFocused: isOpen,
    hasError: !!error,
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

  const handleOpen = () => {
    if (!disabled) {
      haptics.light();
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    Keyboard.dismiss();
    setIsInputFocused(false);
    setIsOpen(false);
  };

  const handleSelectOption = (option: AppSelectOption<T>) => {
    if (option.disabled) return;
    Keyboard.dismiss();
    setIsInputFocused(false);
    haptics.light();
    onSelect(option.value);
    setIsOpen(false);
  };

  const sheetKeyboardPaddingStyle = useMemo(() => {
    if (isKeyboardOpen) {
      return { paddingBottom: effectiveKeyboardHeight + 28 };
    }
    return null;
  }, [isKeyboardOpen, effectiveKeyboardHeight]);

  return (
    <View style={[styles.wrapper, disabled && styles.disabled, containerStyle]}>
      {label && (
        <AppText variant="caption" style={styles.label} color={themeColors.textSecondary}>
          {label}
        </AppText>
      )}

      {/* Main Trigger Field */}
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={handleOpen}
        disabled={disabled}
        style={[styles.trigger, sizeContainerStyle, triggerStateStyle]}
      >
        <View style={styles.contentRow}>
          {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
          {selectedOption?.icon && (
            <View style={styles.leftIconContainer}>{selectedOption.icon}</View>
          )}

          <AppText
            style={[
              sizeTextStyle,
              styles.triggerText,
              { color: selectedOption ? themeColors.text : themeColors.textSecondary },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {selectedOption ? selectedOption.label : placeholder}
          </AppText>
        </View>

        <ChevronDown
          size={Math.min(iconSize, 16)}
          color={themeColors.textSecondary}
          style={isOpen ? styles.chevronRotated : styles.chevron}
        />
      </TouchableOpacity>

      {error && (
        <AppText variant="caption" color={themeColors.error} style={styles.errorText}>
          {error}
        </AppText>
      )}

      {/* Cupertino-Style Bottom Sheet Modal */}
      <Modal
        visible={isOpen}
        transparent
        statusBarTranslucent
        hardwareAccelerated
        animationType={reduceMotion ? 'none' : 'fade'}
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={handleClose}
            accessibilityRole="button"
            accessibilityLabel="Đóng"
          >
            <View
              style={[
                StyleSheet.absoluteFill,
                isDark ? styles.modalOverlayDark : styles.modalOverlayLight,
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
          <View
            style={[
              styles.sheetContainer,
              isDark ? styles.sheetContainerDark : styles.sheetContainerLight,
              isKeyboardOpen && styles.sheetContainerKeyboard,
              sheetKeyboardPaddingStyle,
            ]}
          >
            {/* Grab Handle */}
            <View
              style={[
                styles.sheetHandle,
                isDark ? styles.sheetHandleDark : styles.sheetHandleLight,
              ]}
            />

            {/* Header */}
            <View style={[styles.sheetHeader, { borderBottomColor: themeColors.border }]}>
              <AppText style={[styles.sheetTitle, { color: themeColors.text }]}>
                {sheetTitle || label || placeholder}
              </AppText>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.sheetCloseBtn}
                activeOpacity={0.7}
              >
                <X size={18} color={themeColors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Search Input when enabled */}
            {isSearchEnabled && (
              <View style={styles.searchContainer}>
                <AppSearchBar
                  size="sm"
                  variant="filled"
                  backgroundColor={isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.055)'}
                  borderColor={isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}
                  borderWidth={1}
                  borderRadius={Math.max(8, radiusTokens.control)}
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onClear={() => setSearchQuery('')}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  debounceDelay={100}
                />
              </View>
            )}

            {/* Options List */}
            <AppScrollView
              indicatorVisible={true}
              indicatorMode="always-visible"
              showTrack={true}
              indicatorThickness={4}
              indicatorInsets={{ top: 4, bottom: 4, right: 3 }}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
            >
              {filteredOptions.length === 0 ? (
                <View style={styles.emptyStateBox}>
                  <AppText style={styles.emptyStateText}>
                    Không tìm thấy mục phù hợp
                  </AppText>
                </View>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <TouchableOpacity
                      key={String(option.value)}
                      activeOpacity={0.7}
                      onPress={() => handleSelectOption(option)}
                      disabled={option.disabled}
                      style={[
                        styles.optionItem,
                        isSelected && (isDark ? styles.optionItemSelectedDark : styles.optionItemSelectedLight),
                        option.disabled && styles.disabled,
                      ]}
                    >
                    <View style={styles.optionLeft}>
                      {option.icon && (
                        <View style={styles.optionIcon}>{option.icon}</View>
                      )}
                      <View style={styles.optionTextCol}>
                        <AppText
                          style={[
                            styles.optionLabel,
                            isSelected && styles.optionLabelSelected,
                            { color: isSelected ? themeColors.primary : themeColors.text },
                          ]}
                        >
                          {option.label}
                        </AppText>
                        {option.sublabel && (
                          <AppText
                            style={[
                              styles.optionSublabel,
                              { color: themeColors.textSecondary },
                            ]}
                          >
                            {option.sublabel}
                          </AppText>
                        )}
                      </View>
                    </View>

                    {isSelected && (
                      <Check size={18} color={themeColors.primary} strokeWidth={2.4} />
                    )}
                  </TouchableOpacity>
                );
              }))}
            </AppScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}) as <T = string | number>(props: AppSelectProps<T>) => React.ReactElement | null;
