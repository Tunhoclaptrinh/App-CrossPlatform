import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
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
  ...props
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;
  const bgColor = backgroundColor || themeColors.background;

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

  const wrappedWithKeyboard = disableKeyboardDismiss ? (
    content
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {content}
    </TouchableWithoutFeedback>
  );

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.container, { backgroundColor: bgColor }, style]}
      {...props}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoid}
      >
        {wrappedWithKeyboard}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
