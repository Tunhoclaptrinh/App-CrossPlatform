import React, { useMemo, useRef } from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  View,
  ViewStyle,
  GestureResponderEvent,
  Animated,
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

const AppButtonComponent: React.FC<AppButtonProps> = ({
  title,
  variant = 'primary',
  size: propSize,
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
    globalControlSize,
    reduceMotion,
  } = useThemeMode();
  const size = propSize ?? globalControlSize ?? 'md';
  const styles = useMemo(
    () => createButtonStyles(themeColors, radiusTokens, isDark),
    [themeColors, radiusTokens, isDark]
  );
  const textColor = useMemo(
    () => getButtonTextColor(variant, themeColors),
    [variant, themeColors]
  );
  const effectiveContrast = contrast ?? globalContrast ?? 'normal';
  const effectiveShadow = shadow ?? (globalShadow !== 'none' ? globalShadow : undefined);

  const scaleAnim = useRef(new Animated.Value(1)).current;

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

  const handlePressIn = () => {
    if (reduceMotion) return;
    Animated.spring(scaleAnim, {
      toValue: 0.975,
      speed: 50,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    if (reduceMotion) return;
    Animated.spring(scaleAnim, {
      toValue: 1.0,
      speed: 35,
      bounciness: 4,
      useNativeDriver: true,
    }).start();
  };

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
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, fullWidth && styles.fullWidth]}>
      <TouchableOpacity
        activeOpacity={0.80}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
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
    </Animated.View>
  );
};

export const AppButton = React.memo(AppButtonComponent);


