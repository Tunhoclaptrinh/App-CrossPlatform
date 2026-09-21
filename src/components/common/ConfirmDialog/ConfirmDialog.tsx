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
  icon,
  style,
}) => {
  const { theme: themeColors } = useThemeMode();

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
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.dialogContainer,
                getDialogContainerThemedStyle(themeColors),
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
