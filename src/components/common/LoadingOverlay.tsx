import React from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle, useColorScheme } from 'react-native';
import { AppText } from './AppText';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/theme';

export interface LoadingOverlayProps {
  visible?: boolean;
  message?: string;
  fullscreen?: boolean;
  style?: ViewStyle;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible = true,
  message = 'Đang tải dữ liệu...',
  fullscreen = false,
  style,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

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
          <AppText variant="subtitle2" color={themeColors.text} style={styles.message}>
            {message}
          </AppText>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  inlineContainer: {
    padding: Spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.xxl,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  message: {
    marginTop: Spacing.md,
    textAlign: 'center',
  },
});