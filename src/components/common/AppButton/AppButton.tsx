import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  View,
  GestureResponderEvent,
} from 'react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import { ControlSize } from '@/constants/theme';
import type { AppButtonProps } from './types';
import {
  createButtonStyles,
  getButtonTextColor,
  getVariantStyle,
  getSizeStyle,
  getTextSizeStyle,
} from './styles';

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  haptic = true,
  onPress,
  ...props
}) => {
  const { theme: themeColors, radiusTokens, isDark } = useThemeMode();
  const styles = createButtonStyles(themeColors, radiusTokens, isDark);
  const textColor = getButtonTextColor(variant, themeColors);

  const handlePress = (e: GestureResponderEvent) => {
    if (haptic) {
      haptics.light();
    }
    onPress?.(e);
  };

  const isInteractiveDisabled = disabled || loading;
  const isIconOnly = !title && (!!leftIcon || !!rightIcon);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[
        styles.base,
        getSizeStyle(size, styles),
        getVariantStyle(variant, styles),
        isIconOnly && styles.iconOnly,
        isIconOnly && { width: ControlSize[size].height },
        isInteractiveDisabled && styles.disabled,
        style,
      ]}
      disabled={isInteractiveDisabled}
      onPress={handlePress}
      {...props}
    >
      {variant === 'glass' && <View style={styles.specularHighlight} />}
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {leftIcon ? (
            <View style={[styles.leftIconWrapper, isIconOnly && styles.iconOnlyWrapper]}>
              {leftIcon}
            </View>
          ) : null}
          {title ? (
            <AppText
              variant="subtitle"
              color={textColor}
              style={[styles.textBase, getTextSizeStyle(size, styles), textStyle]}
            >
              {title}
            </AppText>
          ) : null}
          {rightIcon ? <View style={styles.rightIconWrapper}>{rightIcon}</View> : null}
        </>
      )}
    </TouchableOpacity>
  );
};

