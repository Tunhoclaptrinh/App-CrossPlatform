import React from 'react';
import { ActivityIndicator, View, ViewStyle, StyleSheet, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';
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
  const { theme: themeColors, isDark, themeStyle } = useThemeMode();
  const isGlass = themeStyle === 'apple-glass';

  if (!visible) return null;

  const bgStyle: ViewStyle = {
    backgroundColor: fullscreen && !isGlass ? themeColors.overlay : 'transparent',
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
      {fullscreen && Platform.OS === 'ios' && (
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType={isDark ? 'dark' : 'light'}
          blurAmount={isGlass ? 15 : 5}
          reducedTransparencyFallbackColor={themeColors.overlay}
        />
      )}
      <View style={[styles.box, boxStyle]}>
        {isGlass && Platform.OS === 'ios' && (
          <BlurView
            style={styles.boxGlassBlur}
            blurType={isDark ? 'dark' : 'light'}
            blurAmount={25}
            reducedTransparencyFallbackColor={themeColors.card}
          />
        )}
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
