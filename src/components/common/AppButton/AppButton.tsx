import React, { useMemo } from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  View,
  ViewStyle,
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
  getIconOnlySizeStyle,
} from './styles';

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  contrast,
  shadow,
  borderRadius,
  borderWidth,
  borderColor,
  backgroundColor,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  haptic = true,
  onPress,
  ...props
}) => {
  const {
    theme: themeColors,
    radiusTokens,
    isDark,
    globalContrast,
    globalShadow,
  } = useThemeMode();
  const styles = createButtonStyles(themeColors, radiusTokens, isDark);
  const textColor = getButtonTextColor(variant, themeColors);
  const effectiveContrast = contrast ?? globalContrast ?? 'normal';
  const effectiveShadow = shadow ?? (globalShadow !== 'none' ? globalShadow : undefined);

  const customSurfaceStyle: ViewStyle = useMemo(() => {
    let shadowStyle: ViewStyle = {};
    if (effectiveShadow === 'sm') {
      shadowStyle = {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: isDark ? 0.30 : 0.08,
        shadowRadius: 3,
        elevation: 1,
      };
    } else if (effectiveShadow === 'md' || effectiveShadow === true) {
      shadowStyle = {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.40 : 0.12,
        shadowRadius: 5,
        elevation: 2,
      };
    } else if (effectiveShadow === 'lg') {
      shadowStyle = {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDark ? 0.50 : 0.18,
        shadowRadius: 8,
        elevation: 4,
      };
    }

    const extraBorderWidth =
      effectiveContrast === 'high' && (variant === 'outline' || variant === 'glass')
        ? (borderWidth ?? 1) + 0.8
        : borderWidth;

    return {
      ...(borderRadius !== undefined ? { borderRadius } : {}),
      ...(extraBorderWidth !== undefined ? { borderWidth: extraBorderWidth } : {}),
      ...(borderColor !== undefined ? { borderColor } : {}),
      ...(backgroundColor !== undefined ? { backgroundColor } : {}),
      ...shadowStyle,
    };
  }, [borderRadius, borderWidth, borderColor, backgroundColor, effectiveContrast, variant, effectiveShadow, isDark]);

  const handlePress = (e: GestureResponderEvent) => {
    if (haptic) {
      haptics.light();
    }
    onPress?.(e);
  };

  const isInteractiveDisabled = disabled || loading;
  const isIconOnly = !title && (!!leftIcon || !!rightIcon);

  const renderIcon = (iconNode: React.ReactNode) => {
    if (React.isValidElement(iconNode)) {
      const iconElement = iconNode as React.ReactElement<any>;
      return React.cloneElement(iconElement, {
        color: iconElement.props?.color || textColor,
      });
    }
    return iconNode;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[
        styles.base,
        getSizeStyle(size, styles),
        getVariantStyle(variant, styles),
        isIconOnly && styles.iconOnly,
        isIconOnly && getIconOnlySizeStyle(size, styles),
        fullWidth && styles.fullWidth,
        isInteractiveDisabled && styles.disabled,
        customSurfaceStyle,
        style,
      ]}
      disabled={isInteractiveDisabled}
      onPress={handlePress}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {leftIcon ? (
            <View style={[styles.leftIconWrapper, isIconOnly && styles.iconOnlyWrapper]}>
              {renderIcon(leftIcon)}
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
          {rightIcon ? <View style={styles.rightIconWrapper}>{renderIcon(rightIcon)}</View> : null}
        </>
      )}
    </TouchableOpacity>
  );
};
