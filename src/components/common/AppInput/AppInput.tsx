import React, { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
import { ControlSize } from '@/constants/theme';
import { AppText } from '../AppText';
import type { AppInputProps } from './types';
import {
  styles,
  getInputStateStyle,
  getInputSizeStyle,
  getInputTextSizeStyle,
} from './styles';

export const AppInput: React.FC<AppInputProps> = React.memo(({
  label,
  error,
  size: propSize,
  disabled = false,
  leftIcon,
  rightIcon,
  containerStyle,
  isPassword = false,
  style,
  editable,
  multiline = false,
  variant,
  contrast,
  shadow,
  borderRadius,
  borderWidth,
  borderColor,
  backgroundColor,
  ...props
}) => {
  const {
    theme: themeColors,
    isDark,
    radiusTokens,
    globalContrast,
    globalShadow,
    globalControlVariant,
    globalControlSize,
  } = useThemeMode();
  const size = propSize ?? globalControlSize ?? 'md';
  const { themeStyle } = useAppStore();
  const isGlassMode = themeStyle === 'apple-glass';

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!isPassword);

  const stateStyle = React.useMemo(
    () =>
      getInputStateStyle({
        colors: themeColors,
        isDark,
        isGlassMode,
        isFocused,
        hasError: !!error,
        radiusTokens,
        globalContrast,
        globalShadow,
        globalControlVariant,
        variant,
        contrast,
        shadow,
        borderRadius: borderRadius ?? (multiline ? radiusTokens.card : undefined),
        borderWidth,
        borderColor,
        backgroundColor,
      }),
    [
      themeColors,
      isDark,
      isGlassMode,
      isFocused,
      error,
      radiusTokens,
      globalContrast,
      globalShadow,
      globalControlVariant,
      variant,
      contrast,
      shadow,
      borderRadius,
      multiline,
      borderWidth,
      borderColor,
      backgroundColor,
    ]
  );

  const sizeContainerStyle = React.useMemo(() => getInputSizeStyle(size), [size]);
  const sizeInputStyle = React.useMemo(() => getInputTextSizeStyle(size), [size]);
  const iconSize = ControlSize[size].iconSize;
  const isInputEditable = editable !== undefined ? editable : !disabled;

  return (
    <View style={[styles.wrapper, disabled && styles.disabled, containerStyle]}>
      {label && (
        <AppText variant="caption" style={styles.label} color={themeColors.textSecondary}>
          {label}
        </AppText>
      )}

      <View style={[styles.inputContainer, sizeContainerStyle, multiline && styles.multilineContainer, stateStyle]}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

        <TextInput
          multiline={multiline}
          placeholderTextColor={themeColors.textSecondary}
          editable={isInputEditable}
          style={[
            styles.input,
            sizeInputStyle,
            multiline && styles.multilineInput,
            { color: themeColors.text },
            style,
          ]}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {isPassword ? (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.7}
            disabled={disabled}
          >
            {showPassword ? (
              <EyeOff size={iconSize} color={themeColors.textSecondary} />
            ) : (
              <Eye size={iconSize} color={themeColors.textSecondary} />
            )}
          </TouchableOpacity>
        ) : (
          rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>
        )}
      </View>

      {error && (
        <AppText variant="caption" color={themeColors.error} style={styles.errorText}>
          {error}
        </AppText>
      )}
    </View>
  );
});

