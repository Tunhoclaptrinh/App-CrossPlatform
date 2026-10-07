import React from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { AlertCircle, Trash2 } from 'lucide-react-native';
import { AppText } from '../AppText';
import { AppButton } from '../AppButton';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
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
  icon,
  contrast,
  style,
}) => {
  const { theme: themeColors, isDark, radiusTokens, globalContrast } = useThemeMode();
  const { themeStyle } = useAppStore();
  const isGlassTheme = themeStyle === 'apple-glass';
  const effectiveContrast = contrast ?? globalContrast ?? 'normal';

  const defaultIcon = destructive ? (
    <Trash2 size={28} color={themeColors.error} />
  ) : (
    <AlertCircle size={28} color={themeColors.primary} />
  );

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
          {Platform.OS === 'ios' && (
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType={isDark ? 'dark' : 'light'}
              blurAmount={25}
              reducedTransparencyFallbackColor={isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.4)'}
            />
          )}
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.dialogContainer,
                getDialogContainerThemedStyle(isDark, radiusTokens, isGlassTheme, effectiveContrast),
                style,
              ]}
            >
              <View
                style={[
                  styles.iconWrapper,
                  getDialogIconThemedStyle(themeColors, destructive),
                ]}
              >
                {icon || defaultIcon}
              </View>

              <AppText variant="title" color={themeColors.text} style={styles.title}>
                {title}
              </AppText>

              <AppText
                variant="body"
                color={themeColors.textSecondary}
                style={styles.message}
              >
                {message}
              </AppText>

              <View style={styles.actionsRow}>
                <View style={styles.buttonFlex}>
                  <AppButton
                    title={cancelText}
                    variant="outline"
                    onPress={onCancel}
                    disabled={loading}
                  />
                </View>

                <View style={styles.buttonFlex}>
                  <AppButton
                    title={confirmText}
                    variant={destructive ? 'danger' : 'primary'}
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
