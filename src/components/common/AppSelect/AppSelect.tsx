import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { ChevronDown, Check, X } from 'lucide-react-native';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
import { ControlSize } from '@/constants/theme';
import { haptics } from '@/utils/haptics';
import { AppText } from '../AppText';
import type { AppSelectProps, AppSelectOption } from './types';
import {
  styles,
  getSelectSizeStyle,
  getSelectTextSizeStyle,
  getSelectTriggerStyle,
} from './styles';

export function AppSelect<T = string | number>({
  options,
  value,
  onSelect,
  size = 'md',
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
}: AppSelectProps<T>) {
  const {
    theme: themeColors,
    isDark,
    radiusTokens,
    globalContrast,
    globalShadow,
    globalControlVariant,
  } = useThemeMode();
  const { themeStyle } = useAppStore();
  const isGlassMode = themeStyle === 'apple-glass';
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
  };

  const handleSelectOption = (option: AppSelectOption<T>) => {
    if (option.disabled) return;
    haptics.light();
    onSelect(option.value);
    setIsOpen(false);
  };

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
        animationType="fade"
        onRequestClose={handleClose}
      >
        <Pressable
          style={[
            styles.modalOverlay,
            isDark ? styles.modalOverlayDark : styles.modalOverlayLight,
          ]}
          onPress={handleClose}
        >
          {Platform.OS === 'ios' && (
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType={isDark ? 'dark' : 'light'}
              blurAmount={25}
              reducedTransparencyFallbackColor={isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.4)'}
            />
          )}
          <Pressable
            style={[
              styles.sheetContainer,
              isDark ? styles.sheetContainerDark : styles.sheetContainerLight,
            ]}
            onPress={() => {}}
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

            {/* Options List */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {options.map((option) => {
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
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
