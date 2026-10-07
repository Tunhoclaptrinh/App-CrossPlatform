import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
import { AppleMeshBackground } from '../AppleMeshBackground';
import type { ScreenWrapperProps } from './types';
import { styles } from './styles';

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scrollable = false,
  contentContainerStyle,
  disableKeyboardDismiss = false,
  backgroundColor,
  style,
  edges = ['top', 'bottom', 'left', 'right'],
  disableMeshBackground = false,
  ...props
}) => {
  const { theme: themeColors } = useThemeMode();
  const { themeStyle } = useAppStore();
  const isGlass = themeStyle === 'apple-glass';

  // In Apple Glass mode, background defaults to transparent with Aurora Mesh underneath
  const shouldRenderMesh = isGlass && !disableMeshBackground;
  const defaultBg = shouldRenderMesh ? 'transparent' : themeColors.background;
  const resolvedBgColor = backgroundColor !== undefined ? backgroundColor : defaultBg;

  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.staticContent, contentContainerStyle]}>{children}</View>
  );

  const wrappedWithKeyboard = disableKeyboardDismiss || scrollable ? (
    content
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {content}
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.outerContainer}>
      {shouldRenderMesh && <AppleMeshBackground variant="aurora" />}
      <SafeAreaView
        edges={edges}
        style={[styles.container, { backgroundColor: resolvedBgColor }, style]}
        {...props}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardAvoid}
        >
          {wrappedWithKeyboard}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};
