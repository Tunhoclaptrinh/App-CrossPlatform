import React from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { AlertCircle, Trash2 } from 'lucide-react-native';
import { AppText } from '../AppText';
import { AppButton } from '../AppButton';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { ConfirmDialogProps } from './types';
import { styles, getDialogContainerThemedStyle, getDialogIconThemedStyle } from './styles';

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  visible,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy bỏ',
  onConfirm,
  onCancel,
  destructive = false,
  loading = false,
  size = 'md',
  borderRadius,
  icon,
  contrast,
  style,
}) => {
  const { theme: themeColors, isDark, radiusTokens, globalContrast } = useThemeMode();
  const effectiveContrast = contrast ?? globalContrast ?? 'normal';

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
            <View
              style={[
                styles.dialogContainer,
                getDialogContainerThemedStyle(isDark, radiusTokens, false, effectiveContrast),
                { maxWidth, padding, borderRadius: cardRadius },
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
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
