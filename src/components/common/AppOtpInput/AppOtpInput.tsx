import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import type { AppOtpInputProps } from './types';
import { createOtpStyles } from './styles';

export const AppOtpInput: React.FC<AppOtpInputProps> = React.memo(({
  length = 6,
  value,
  onChange,
  onComplete,
  secureTextEntry = false,
  autoFocus = false,
  disabled = false,
  size = 'md',
  borderRadius,
  variant,
  contrast,
  style,
  boxStyle,
  boxTextStyle,
  error = false,
}) => {
  const { theme, isDark, globalContrast, globalControlVariant } = useThemeMode();
  const inputRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);

  const resolvedVariant = variant ?? globalControlVariant;
  const resolvedContrast = contrast ?? globalContrast;

  const styles = createOtpStyles(
    theme,
    isDark,
    size,
    resolvedVariant,
    resolvedContrast,
    error
  );

  const handleChangeText = (text: string) => {
    // Only allow alphanumeric / digits, slice to length
    const cleaned = text.replace(/[^0-9a-zA-Z]/g, '').slice(0, length);
    onChange(cleaned);
    haptics.light();

    if (cleaned.length === length) {
      haptics.success();
      onComplete?.(cleaned);
    }
  };

  const handleContainerPress = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const digits = value.split('');

  return (
    <TouchableWithoutFeedback onPress={handleContainerPress}>
      <View style={[styles.container, style]}>
        {/* Hidden underlying TextInput */}
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={handleChangeText}
          maxLength={length}
          keyboardType="number-pad"
          autoFocus={autoFocus}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          caretHidden
          style={styles.hiddenInput}
        />

        {/* Visual Digit Boxes */}
        {Array.from({ length }).map((_, index) => {
          const char = digits[index];
          const isCurrentActive = isFocused && index === digits.length;
          const isFilled = index < digits.length;

          return (
            <View
              key={index}
              style={[
                styles.box,
                borderRadius !== undefined ? { borderRadius } : null,
                isFilled && styles.boxFilled,
                isCurrentActive && styles.boxFocused,
                boxStyle,
              ]}
            >
              {char ? (
                secureTextEntry ? (
                  <View style={styles.secureDot} />
                ) : (
                  <AppText style={[styles.boxText, boxTextStyle]}>
                    {char}
                  </AppText>
                )
              ) : null}
            </View>
          );
        })}
      </View>
    </TouchableWithoutFeedback>
  );
});
