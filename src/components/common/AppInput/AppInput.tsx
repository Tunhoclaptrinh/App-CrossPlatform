import React, { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useThemeMode } from '@/hooks/useThemeMode';
import { AppText } from '../AppText';
import type { AppInputProps } from './types';
import { styles, getInputStateStyle } from './styles';

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  isPassword = false,
  style,
  ...props
}) => {
  const { theme: themeColors } = useThemeMode();

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!isPassword);

  const stateStyle = getInputStateStyle(themeColors, isFocused, !!error);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <AppText variant="caption" style={styles.label} color={themeColors.textSecondary}>
          {label}
        </AppText>
      )}

      <View style={[styles.inputContainer, stateStyle]}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

        <TextInput
          placeholderTextColor={themeColors.textSecondary}
          style={[
            styles.input,
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
          >
            {showPassword ? (
              <EyeOff size={20} color={themeColors.textSecondary} />
            ) : (
              <Eye size={20} color={themeColors.textSecondary} />
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
