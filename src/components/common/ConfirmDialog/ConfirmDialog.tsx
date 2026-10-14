import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Pressable,
  StyleSheet,
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

  const sizeConfig = React.useMemo(() => {
    switch (size) {
      case 'sm':
        return { maxWidth: 300, padding: 16, iconBoxSize: 44, iconGlyphSize: 22, btnSize: 'sm' as const };
      case 'lg':
        return { maxWidth: 380, padding: 30, iconBoxSize: 64, iconGlyphSize: 32, btnSize: 'lg' as const };
      default:
        return { maxWidth: 340, padding: 24, iconBoxSize: 56, iconGlyphSize: 28, btnSize: 'md' as const };
    }
  }, [size]);

  const defaultIcon = React.useMemo(
    () =>
      destructive ? (
        <Trash2 size={sizeConfig.iconGlyphSize} color={themeColors.error} />
      ) : (
        <AlertCircle size={sizeConfig.iconGlyphSize} color={themeColors.primary} />
      ),
    [destructive, sizeConfig.iconGlyphSize, themeColors.error, themeColors.primary]
  );

  const cardRadius = borderRadius !== undefined ? borderRadius : radiusTokens.card;

  const containerThemedStyle = React.useMemo(
    () => getDialogContainerThemedStyle(isDark, radiusTokens, false, effectiveContrast),
    [isDark, radiusTokens, effectiveContrast]
  );

  const iconThemedStyle = React.useMemo(
    () => getDialogIconThemedStyle(themeColors, destructive),
    [themeColors, destructive]
  );

  const dialogDimensionStyle = React.useMemo(
    () => ({
      maxWidth: sizeConfig.maxWidth,
      padding: sizeConfig.padding,
      borderRadius: cardRadius,
    }),
    [sizeConfig.maxWidth, sizeConfig.padding, cardRadius]
  );

  const handleCancel = React.useCallback(() => {
    if (!loading) {
      onCancel();
    }
  }, [loading, onCancel]);

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      hardwareAccelerated
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <View style={styles.backdrop}>
        <Pressable
          style={[
            StyleSheet.absoluteFill,
            isDark ? styles.backdropDark : styles.backdropLight,
          ]}
          onPress={handleCancel}
          accessibilityRole="button"
          accessibilityLabel="Đóng"
        />
        <Animated.View
          style={[
            styles.dialogContainer,
            containerThemedStyle,
            dialogDimensionStyle,
            { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
            style,
          ]}
        >
          <View
            style={[
              styles.iconWrapper,
              iconThemedStyle,
              {
                width: sizeConfig.iconBoxSize,
                height: sizeConfig.iconBoxSize,
                borderRadius: sizeConfig.iconBoxSize / 2,
              },
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
                size={sizeConfig.btnSize}
                contrast={effectiveContrast}
                onPress={handleCancel}
                disabled={loading}
              />
            </View>

            <View style={styles.buttonFlex}>
              <AppButton
                title={confirmText}
                variant={destructive ? 'danger' : 'primary'}
                size={sizeConfig.btnSize}
                contrast={effectiveContrast}
                loading={loading}
                onPress={onConfirm}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export const ConfirmDialog = React.memo(ConfirmDialogComponent);

