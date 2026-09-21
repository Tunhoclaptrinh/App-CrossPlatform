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
  const { theme: themeColors } = useThemeMode();
  const styles = createButtonStyles(themeColors);
  const textColor = getButtonTextColor(variant, themeColors);

  const handlePress = (e: GestureResponderEvent) => {
    if (haptic) {
      haptics.light();
    }
    onPress?.(e);
  };

  const isInteractiveDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[
        styles.base,
        getSizeStyle(size, styles),
        getVariantStyle(variant, styles),
        isInteractiveDisabled && styles.disabled,
        style,
      ]}
      disabled={isInteractiveDisabled}
      onPress={handlePress}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size={size === 'sm' ? 'small' : 'small'} />
      ) : (
        <>
          {leftIcon ? <View style={styles.leftIconWrapper}>{leftIcon}</View> : null}
          <AppText
            variant="subtitle"
            color={textColor}
            style={[styles.textBase, getTextSizeStyle(size, styles), textStyle]}
          >
            {title}
          </AppText>
          {rightIcon ? <View style={styles.rightIconWrapper}>{rightIcon}</View> : null}
        </>
      )}
    </TouchableOpacity>
  );
};
