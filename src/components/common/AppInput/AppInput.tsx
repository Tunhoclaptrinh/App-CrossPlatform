import React, { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useThemeMode } from '@/hooks/useThemeMode';
import { ControlSize } from '@/constants/theme';
import { AppText } from '../AppText';
import type { AppInputProps } from './types';
import {
  styles,
  getInputStateStyle,
  getInputSizeStyle,
  getInputTextSizeStyle,
} from './styles';

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  size = 'md',
  disabled = false,
  leftIcon,
  rightIcon,
  containerStyle,
  isPassword = false,
  style,
  editable,
  ...props
}) => {
  const { theme: themeColors, radiusTokens } = useThemeMode();

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!isPassword);

  const stateStyle = getInputStateStyle(themeColors, isFocused, !!error, radiusTokens);
  const sizeContainerStyle = getInputSizeStyle(size);
  const sizeInputStyle = getInputTextSizeStyle(size);
  const iconSize = ControlSize[size].iconSize;
  const isInputEditable = editable !== undefined ? editable : !disabled;

  return (
    <View style={[styles.wrapper, disabled && styles.disabled, containerStyle]}>
      {label && (
        <AppText variant="caption" style={styles.label} color={themeColors.textSecondary}>
          {label}
        </AppText>
      )}

      <View style={[styles.inputContainer, sizeContainerStyle, stateStyle]}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

        <TextInput
          placeholderTextColor={themeColors.textSecondary}
          editable={isInputEditable}
          style={[
            styles.input,
            sizeInputStyle,
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
};

