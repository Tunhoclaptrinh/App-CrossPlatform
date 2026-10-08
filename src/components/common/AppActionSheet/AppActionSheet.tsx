import React, { useState, useEffect, useMemo } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Platform,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { ChevronRight } from 'lucide-react-native';
import { AppText } from '../AppText';
import { AppScrollView } from '../AppScrollView';
import { AppSearchBar } from '../AppSearchBar';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import { removeVietnameseTones } from '@/utils/formatters';
import type { AppActionSheetProps } from './types';
import { createActionSheetStyles } from './styles';

export const AppActionSheet: React.FC<AppActionSheetProps> = React.memo(({
  visible,
  onClose,
  title,
  message,
  actions,
  showCancel = true,
  cancelLabel = 'Hủy bỏ',
  size = 'md',
  contrast,
  borderRadius,
  style,
  searchable = false,
  searchPlaceholder = 'Tìm kiếm tùy chọn...',
  maxHeight,
}) => {
  const { height: windowHeight } = useWindowDimensions();
  const { theme, radiusTokens, isDark, globalContrast, isGlassTheme, reduceMotion } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const styles = createActionSheetStyles(
    theme,
    radiusTokens,
    isDark,
    resolvedContrast,
    isGlassTheme,
    size,
    borderRadius
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (e) => {
      const h = e.endCoordinates ? e.endCoordinates.height : 0;
      setKeyboardHeight(h);
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
    if (!visible) {
      setSearchQuery('');
      setKeyboardHeight(0);
      setIsInputFocused(false);
    }
  }, [visible]);

  // Compute effective keyboard height: if keyboard listener reported height, use it;
  // If input is focused but Android Modal layout didn't report height, fallback to standard keyboard height (including Gboard toolbar)
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

  const effectiveMaxHeight = useMemo(() => {
    if (maxHeight !== undefined) return maxHeight;
    if (isKeyboardOpen) {
      const available = windowHeight - effectiveKeyboardHeight - 190;
      return Math.max(120, Math.min(220, available));
    }
    return Math.min(380, windowHeight * 0.46);
  }, [maxHeight, isKeyboardOpen, effectiveKeyboardHeight, windowHeight]);

  const filteredActions = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return actions;
    const q = removeVietnameseTones(searchQuery.trim().toLowerCase());
    return actions.filter((act) => {
      const matchLabel = removeVietnameseTones(act.label.toLowerCase()).includes(q);
      const matchDesc = act.description
        ? removeVietnameseTones(act.description.toLowerCase()).includes(q)
        : false;
      return matchLabel || matchDesc;
    });
  }, [actions, searchable, searchQuery]);

  const handleAction = (onPress: () => void) => {
    Keyboard.dismiss();
    setIsInputFocused(false);
    haptics.light();
    onClose();
    setTimeout(() => {
      onPress();
    }, 120);
  };

  const handleCancel = () => {
    Keyboard.dismiss();
    setIsInputFocused(false);
    haptics.light();
    onClose();
  };

  const dynamicPaddingBottom = isKeyboardOpen
    ? effectiveKeyboardHeight + 30
    : (Platform.OS === 'ios' ? 34 : 20);

  const dynamicWrapperStyle = useMemo(
    () => ({ paddingBottom: dynamicPaddingBottom }),
    [dynamicPaddingBottom]
  );

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      hardwareAccelerated
      animationType={reduceMotion ? 'none' : 'fade'}
      onRequestClose={handleCancel}
    >
      <View style={styles.modalRoot}>
        {/* 1. Visual Backdrop: Dark overlay / Blur with pointerEvents="none" so it NEVER blocks touches */}
        <View
          style={[
            StyleSheet.absoluteFill,
            isDark ? styles.backdropDark : styles.backdropLight,
          ]}
          pointerEvents="none"
        >
          {Platform.OS === 'ios' && (
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType={isDark ? 'dark' : 'light'}
              blurAmount={20}
              reducedTransparencyFallbackColor={
                isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.4)'
              }
            />
          )}
        </View>

        {/* 2. Top area: Tap outside to dismiss */}
        <Pressable
          style={styles.backdropDismissArea}
          onPress={handleCancel}
          accessibilityLabel="Đóng tùy chọn"
        />

        {/* 3. Sheet Content on top */}
        <View
          style={[
            styles.sheetWrapper,
            dynamicWrapperStyle,
            style,
          ]}
        >
          {/* Main Actions Container */}
          <View style={styles.contentBlock}>
            {(title || message) && (
              <View style={styles.headerBox}>
                {title && <AppText style={styles.title}>{title}</AppText>}
                {message && <AppText style={styles.message}>{message}</AppText>}
              </View>
            )}

            {searchable && (
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

            <AppScrollView
              nestedScrollEnabled
              showTrack={true}
              indicatorVisible={true}
              indicatorMode="always-visible"
              indicatorThickness={4}
              indicatorInsets={{ top: 8, bottom: 8, right: 3 }}
              trackColor={isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'}
              indicatorColor={isDark ? 'rgba(255, 255, 255, 0.65)' : theme.primary}
              keyboardShouldPersistTaps="handled"
              style={[
                styles.scrollContainer,
                { maxHeight: effectiveMaxHeight },
              ]}
              contentContainerStyle={styles.scrollContent}
            >
              {filteredActions.length === 0 ? (
                <View style={styles.emptyStateBox}>
                  <AppText style={styles.emptyStateText}>
                    Không tìm thấy tùy chọn phù hợp
                  </AppText>
                </View>
              ) : (
                filteredActions.map((act, index) => {
                  const isLast = index === filteredActions.length - 1;
                  return (
                    <TouchableOpacity
                      key={act.id || index}
                      activeOpacity={0.7}
                      disabled={act.disabled}
                      onPress={() => handleAction(act.onPress)}
                      style={[
                        styles.actionItem,
                        isLast && styles.actionItemLast,
                        act.disabled && styles.actionItemDisabled,
                      ]}
                    >
                      <View style={styles.actionLeft}>
                        {act.icon && (
                          <View
                            style={[
                              styles.iconContainer,
                              act.destructive && styles.iconContainerDestructive,
                            ]}
                          >
                            {act.icon}
                          </View>
                        )}
                        <View style={styles.actionTextCol}>
                          <AppText
                            style={[
                              styles.actionLabel,
                              act.destructive && styles.actionLabelDestructive,
                            ]}
                          >
                            {act.label}
                          </AppText>
                          {act.description && (
                            <AppText style={styles.actionDesc}>
                              {act.description}
                            </AppText>
                          )}
                        </View>
                      </View>
                      <ChevronRight
                        size={16}
                        color={act.destructive ? '#EF4444' : theme.textSecondary}
                        opacity={0.6}
                      />
                    </TouchableOpacity>
                  );
                })
              )}
            </AppScrollView>
          </View>

          {/* iOS-Style Separate Cancel Button: Tự động ẩn khi bàn phím đang mở */}
          {showCancel && !isKeyboardOpen && (
            <View style={styles.cancelBlock}>
              {Platform.OS === 'ios' && (
                <BlurView
                  style={StyleSheet.absoluteFill}
                  blurType={isDark ? 'dark' : 'light'}
                  blurAmount={20}
                  reducedTransparencyFallbackColor={
                    isDark ? 'rgba(30, 41, 59, 0.75)' : 'rgba(255, 255, 255, 0.75)'
                  }
                />
              )}
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={handleCancel}
                style={styles.cancelButton}
              >
                <AppText style={styles.cancelText}>{cancelLabel}</AppText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
});
