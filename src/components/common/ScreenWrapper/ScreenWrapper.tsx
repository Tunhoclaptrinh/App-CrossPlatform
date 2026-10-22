import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ScrollViewInstance } from 'react-native';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
import { AppleMeshBackground } from '../AppleMeshBackground';
import { AppScrollView } from '../AppScrollView';
import type { ScreenWrapperProps } from './types';
import { styles, createBackgroundStyle } from './styles';

export const ScreenWrapper = React.memo(React.forwardRef<ScrollViewInstance, ScreenWrapperProps>(({
  children,
  header,
  footer,
  scrollable = false,
  contentContainerStyle,
  disableKeyboardDismiss = false,
  backgroundColor,
  style,
  edges = ['top', 'bottom', 'left', 'right'],
  showsScrollIndicator = true,
  nestedScrollEnabled = true,
  disableMeshBackground = false,
  scrollRef,
  indicatorMode,
  indicatorThickness,
  indicatorLength,
  minIndicatorLength,
  maxIndicatorLength,
  indicatorColor,
  indicatorInsets,
  idleOpacity,
  activeOpacity,
  showTrack,
  draggableIndicator,
  dragHitSlop,
  enableGrabFeedback,
  onDragStart,
  onDragEnd,
  ...props
}, ref) => {

  const { theme: themeColors, meshVariant } = useThemeMode();
  const { themeStyle } = useAppStore();
  const isGlass = themeStyle === 'apple-glass';

  // In Apple Glass mode, background defaults to transparent with Dynamic Mesh underneath
  const shouldRenderMesh = isGlass && !disableMeshBackground;
  const defaultBg = shouldRenderMesh ? 'transparent' : themeColors.background;
  const resolvedBgColor = backgroundColor !== undefined ? backgroundColor : defaultBg;

  const resolvedScrollRef = (ref || scrollRef) as React.Ref<ScrollViewInstance> | undefined;

  const content = scrollable ? (
    <AppScrollView
      ref={resolvedScrollRef}
      style={styles.scroll}
      contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      indicatorVisible={showsScrollIndicator}
      indicatorMode={indicatorMode ?? (showsScrollIndicator ? 'faint-to-bright' : 'hidden')}
      indicatorThickness={indicatorThickness ?? 4.5}
      indicatorLength={indicatorLength}
      minIndicatorLength={minIndicatorLength ?? 52}
      maxIndicatorLength={maxIndicatorLength ?? 82}
      indicatorColor={indicatorColor}
      indicatorInsets={indicatorInsets ?? { top: 8, bottom: 8, right: 1.5 }}
      idleOpacity={idleOpacity ?? 0.25}
      activeOpacity={activeOpacity ?? 0.90}
      showTrack={showTrack}
      nestedScrollEnabled={nestedScrollEnabled}
      draggableIndicator={draggableIndicator}
      dragHitSlop={dragHitSlop}
      enableGrabFeedback={enableGrabFeedback}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {children}
    </AppScrollView>
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
      {shouldRenderMesh && <AppleMeshBackground variant={meshVariant || 'aurora'} />}
      <SafeAreaView
        edges={edges}
        style={[styles.container, createBackgroundStyle(resolvedBgColor).background, style]}
        {...props}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          {header}
          {wrappedWithKeyboard}
          {footer}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}));

ScreenWrapper.displayName = 'ScreenWrapper';
