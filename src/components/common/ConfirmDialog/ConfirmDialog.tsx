import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { AlertCircle, Trash2 } from 'lucide-react-native';
import { AppText } from '../AppText';
import { AppButton } from '../AppButton';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { ConfirmDialogProps } from './types';
import { styles, getDialogContainerThemedStyle, getDialogIconThemedStyle } from './styles';

const ConfirmDialogComponent: React.FC<ConfirmDialogProps> = ({
  visible,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy bỏ',
  onConfirm,
  onCancel,
  destructive = false,
  loading = false,
  size: propSize,
  borderRadius,
  icon,
  contrast,
  style,
}) => {
  const {
    theme: themeColors,
    isDark,
    radiusTokens,
    globalContrast,
    globalControlSize,
    reduceMotion,
  } = useThemeMode();
  const size = propSize ?? globalControlSize ?? 'md';
  const effectiveContrast = contrast ?? globalContrast ?? 'normal';

  const scaleAnim = useRef(new Animated.Value(0.94)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      if (reduceMotion) {
        scaleAnim.setValue(1);
        opacityAnim.setValue(1);
      } else {
        scaleAnim.setValue(0.94);
        opacityAnim.setValue(0);
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            damping: 24,
            mass: 0.65,
            stiffness: 280,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 180,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }
  }, [visible, reduceMotion, scaleAnim, opacityAnim]);

  let maxWidth = 340;
  let padding = 24;
  let iconBoxSize = 56;
  let iconGlyphSize = 28;
  let btnSize: 'sm' | 'md' | 'lg' = 'md';

  if (size === 'sm') {
    maxWidth = 300;
    padding = 16;
    iconBoxSize = 44;
    iconGlyphSize = 22;
    btnSize = 'sm';
  } else if (size === 'lg') {
    maxWidth = 380;
    padding = 30;
    iconBoxSize = 64;
    iconGlyphSize = 32;
    btnSize = 'lg';
  }

  const defaultIcon = destructive ? (
    <Trash2 size={iconGlyphSize} color={themeColors.error} />
  ) : (
    <AlertCircle size={iconGlyphSize} color={themeColors.primary} />
  );

  const cardRadius = borderRadius !== undefined ? borderRadius : radiusTokens.card;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View
          style={[
            styles.backdrop,
            isDark ? styles.backdropDark : styles.backdropLight,
          ]}
        >
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.dialogContainer,
                getDialogContainerThemedStyle(isDark, radiusTokens, false, effectiveContrast),
                { maxWidth, padding, borderRadius: cardRadius },
                { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
                style,
              ]}
            >
              <View
                style={[
                  styles.iconWrapper,
                  getDialogIconThemedStyle(themeColors, destructive),
                  { width: iconBoxSize, height: iconBoxSize, borderRadius: iconBoxSize / 2 },
                ]}
              >
                {icon || defaultIcon}
              </View>

              <AppText variant="title" color={themeColors.text} style={styles.title}>
                {title}
              </AppText>

              <AppText
                variant="body"
                color={effectiveContrast === 'high' ? (isDark ? '#E2E8F0' : '#1E293B') : themeColors.textSecondary}
                style={styles.message}
              >
                {message}
              </AppText>

              <View style={styles.actionsRow}>
                <View style={styles.buttonFlex}>
                  <AppButton
                    title={cancelText}
                    variant="outline"
                    size={btnSize}
                    contrast={effectiveContrast}
                    onPress={onCancel}
                    disabled={loading}
                  />
                </View>

                <View style={styles.buttonFlex}>
                  <AppButton
                    title={confirmText}
                    variant={destructive ? 'danger' : 'primary'}
                    size={btnSize}
                    contrast={effectiveContrast}
                    loading={loading}
                    onPress={onConfirm}
                  />
                </View>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export const ConfirmDialog = React.memo(ConfirmDialogComponent);

