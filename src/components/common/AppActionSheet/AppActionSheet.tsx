import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { ChevronRight } from 'lucide-react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import type { AppActionSheetProps } from './types';
import { createActionSheetStyles } from './styles';

export const AppActionSheet: React.FC<AppActionSheetProps> = ({
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
}) => {
  const { theme, radiusTokens, isDark, globalContrast, isGlassTheme } = useThemeMode();
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

  const handleAction = (onPress: () => void) => {
    haptics.light();
    onClose();
    setTimeout(() => {
      onPress();
    }, 120);
  };

  const handleCancel = () => {
    haptics.light();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
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
        <View style={[styles.sheetWrapper, style]}>
          {/* Main Actions Container */}
          <View style={styles.contentBlock}>
            {(title || message) && (
              <View style={styles.headerBox}>
                {title && <AppText style={styles.title}>{title}</AppText>}
                {message && <AppText style={styles.message}>{message}</AppText>}
              </View>
            )}

            {actions.map((act, index) => {
              const isLast = index === actions.length - 1;
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
            })}
          </View>

          {/* iOS-Style Separate Cancel Button */}
          {showCancel && (
            <View style={styles.cancelBlock}>
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
};
