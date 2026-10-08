import React from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { AppText } from '../AppText';
import { AppScrollView } from '../AppScrollView';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import type { AppBottomSheetProps } from './types';
import { createBottomSheetStyles, getSheetHeight } from './styles';

export const AppBottomSheet: React.FC<AppBottomSheetProps> = React.memo(({
  visible,
  onClose,
  title,
  subtitle,
  headerRight,
  children,
  snapPoint = 'auto',
  showHandle = true,
  size = 'md',
  contrast,
  borderRadius,
  style,
  contentStyle,
}) => {
  const { theme, radiusTokens, isDark, globalContrast, isGlassTheme, reduceMotion } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;

  const styles = createBottomSheetStyles(
    theme,
    isDark,
    radiusTokens.card,
    resolvedContrast,
    isGlassTheme,
    size,
    borderRadius
  );

  const effectiveSnapPoint = snapPoint === 'auto' && size === 'lg' ? 'half' : snapPoint;
  const height = getSheetHeight(effectiveSnapPoint);

  const handleClose = () => {
    haptics.light();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      hardwareAccelerated
      animationType={reduceMotion ? 'none' : 'slide'}
      onRequestClose={handleClose}
    >
      <View style={styles.modalRoot}>
        {/* Backdrop overlay */}
        <TouchableWithoutFeedback onPress={handleClose}>
          <View
            style={[
              StyleSheet.absoluteFill,
              isDark ? styles.backdropDark : styles.backdropLight,
            ]}
          >
            {Platform.OS === 'ios' && (
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType={isDark ? 'dark' : 'light'}
                blurAmount={20}
              />
            )}
          </View>
        </TouchableWithoutFeedback>

        {/* Sheet Surface */}
        <View style={[styles.sheet, height ? { height } : undefined, style]}>
          {showHandle && (
            <View style={styles.handleArea}>
              <View style={styles.handle} />
            </View>
          )}

          {(title || headerRight) && (
            <View style={styles.header}>
              <View style={styles.titleCol}>
                {typeof title === 'string' ? (
                  <AppText style={styles.title}>{title}</AppText>
                ) : (
                  title
                )}
                {subtitle && (
                  <AppText style={styles.subtitle}>{subtitle}</AppText>
                )}
              </View>

              {headerRight && <View>{headerRight}</View>}
            </View>
          )}

          <AppScrollView
            indicatorVisible={true}
            indicatorThickness={3.5}
            indicatorInsets={{ top: 8, bottom: 8, right: 3 }}
            nestedScrollEnabled={true}
            contentContainerStyle={[styles.content, contentStyle]}
            bounces={false}
          >
            {children}
          </AppScrollView>
        </View>
      </View>
    </Modal>
  );
});
