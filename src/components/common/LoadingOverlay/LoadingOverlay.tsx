import React from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { LoadingOverlayProps } from './types';
import { styles } from './styles';

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible = true,
  message = 'Đang tải dữ liệu...',
  fullscreen = false,
  style,
}) => {
  const { theme: themeColors } = useThemeMode();

  if (!visible) return null;

  const bgStyle: ViewStyle = {
    backgroundColor: fullscreen ? themeColors.overlay : 'transparent',
  };

  const boxStyle: ViewStyle = {
    backgroundColor: themeColors.card,
    borderColor: themeColors.border,
  };

  return (
    <View
      style={[
        fullscreen ? styles.fullscreenContainer : styles.inlineContainer,
        bgStyle,
        style,
      ]}
    >
      <View style={[styles.box, boxStyle]}>
        <ActivityIndicator size="large" color={themeColors.primary} />
        {message ? (
          <AppText variant="subtitle" color={themeColors.text} style={styles.message}>
            {message}
          </AppText>
        ) : null}
      </View>
    </View>
  );
};
