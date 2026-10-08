import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import type { AppSegmentedControlProps, SegmentOption } from './types';
import { createSegmentedStyles, getSizeStyles } from './styles';

const AppSegmentedControlComponent = <T extends string | number = string>({
  options,
  value,
  onChange,
  size: propSize,
  variant = 'standard',
  contrast,
  shadow,
  haptic = true,
  fullWidth = true,
  activeColor,
  inactiveColor,
  activeThumbColor,
  trackColor,
  borderColor,
  activeBorderColor,
  borderRadius,
  itemHeight,
  style,
  itemStyle,
  activeItemStyle,
  labelStyle,
  activeLabelStyle,
  iconStyle,
  badgeStyle,
  activeBadgeStyle,
  badgeTextStyle,
  activeBadgeTextStyle,
  disabled = false,
}: AppSegmentedControlProps<T>): React.ReactElement => {
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
  const effectiveContrast = contrast ?? globalContrast ?? 'normal';
  const effectiveShadow = shadow ?? (globalShadow !== 'none' ? globalShadow : undefined);

  const activeIndex = Math.max(0, options.findIndex((opt) => opt.value === value));

  const [containerWidth, setContainerWidth] = useState(0);
  const [customLayouts, setCustomLayouts] = useState<Record<number, { x: number; width: number }>>({});

  const animatedTranslateX = useRef(new Animated.Value(0)).current;
  const isInitialMount = useRef(true);

  const customContrastStyle = useMemo(() => {
    let shadowStyle = {};
    if (effectiveShadow === 'sm') {
      shadowStyle = {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: isDark ? 0.25 : 0.06,
        shadowRadius: 3,
        elevation: 1,
      };
    } else if (effectiveShadow === 'md' || effectiveShadow === true) {
      shadowStyle = {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.35 : 0.08,
        shadowRadius: 5,
        elevation: 2,
      };
    } else if (effectiveShadow === 'lg') {
      shadowStyle = {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDark ? 0.45 : 0.12,
        shadowRadius: 8,
        elevation: 4,
      };
    }

    let borderModifier = {};
    if (effectiveContrast === 'high') {
      borderModifier = {
        borderWidth: 1.5,
        borderColor: isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.25)',
      };
    } else if (effectiveContrast === 'subtle') {
      borderModifier = {
        borderWidth: 0.8,
      };
    }

    return {
      ...borderModifier,
      ...shadowStyle,
    };
  }, [effectiveContrast, effectiveShadow, isDark]);

  const styles = useMemo(
    () => createSegmentedStyles(themeColors, radiusTokens, isDark, borderRadius),
    [themeColors, radiusTokens, isDark, borderRadius]
  );

  const sizeStyle = useMemo(() => getSizeStyles(size, styles), [size, styles]);

  const numOptions = options.length || 1;
  const availableWidth = Math.max(0, containerWidth - 6);
  const itemWidth = fullWidth ? availableWidth / numOptions : (customLayouts[activeIndex]?.width ?? 0);
  const targetX = fullWidth ? activeIndex * itemWidth : (customLayouts[activeIndex]?.x ?? 0);

  // Animate the thumb position using 100% Native Driver (Zero JS thread bottleneck)
  useEffect(() => {
    if (containerWidth <= 0 && fullWidth) return;

    if (isInitialMount.current) {
      animatedTranslateX.setValue(targetX);
      isInitialMount.current = false;
      return;
    }

    if (reduceMotion) {
      animatedTranslateX.setValue(targetX);
    } else {
      Animated.spring(animatedTranslateX, {
        toValue: targetX,
        damping: 24,
        mass: 0.65,
        stiffness: 280,
        useNativeDriver: true,
      }).start();
    }
  }, [activeIndex, targetX, containerWidth, fullWidth, reduceMotion, animatedTranslateX]);

  const handleContainerLayout = useCallback((e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    if (width > 0) {
      setContainerWidth(width);
    }
  }, []);

  const handleItemLayout = useCallback((index: number, e: LayoutChangeEvent) => {
    if (fullWidth) return;
    const { x, width } = e.nativeEvent.layout;
    setCustomLayouts((prev) => {
      if (prev[index]?.x === x && prev[index]?.width === width) return prev;
      return { ...prev, [index]: { x, width } };
    });
  }, [fullWidth]);

  const handleSelect = (option: SegmentOption<T>) => {
    if (disabled || option.disabled || option.value === value) return;
    if (haptic) {
      haptics.light();
    }
    onChange(option.value);
  };

  const getTrackVariantStyle = () => {
    switch (variant) {
      case 'glass':
        return isDark ? styles.trackGlassDark : styles.trackGlassLight;
      case 'pill':
        return isDark ? styles.trackPillDark : styles.trackPillLight;
      case 'tonal':
        return isDark ? styles.trackTonalDark : styles.trackTonalLight;
      case 'outline':
        return isDark ? styles.trackOutlineDark : styles.trackOutlineLight;
      case 'standard':
      default:
        return isDark ? styles.trackStandardDark : styles.trackStandardLight;
    }
  };

  const getThumbVariantStyle = () => {
    switch (variant) {
      case 'glass':
        return isDark ? styles.thumbActiveGlassDark : styles.thumbActiveGlassLight;
      case 'pill':
        return isDark ? styles.thumbActivePillDark : styles.thumbActivePillLight;
      case 'tonal':
        return isDark ? styles.thumbActiveTonalDark : styles.thumbActiveTonalLight;
      case 'outline':
        return isDark ? styles.thumbActiveOutlineDark : styles.thumbActiveOutlineLight;
      case 'standard':
      default:
        return isDark ? styles.thumbActiveStandardDark : styles.thumbActiveStandardLight;
    }
  };

  const resolvedActiveColor = activeColor || (variant === 'outline' ? themeColors.primary : (isDark ? '#FFFFFF' : themeColors.text));
  const resolvedInactiveColor = inactiveColor || themeColors.textSecondary;

  return (
    <View
      onLayout={handleContainerLayout}
      style={[
        styles.container,
        getTrackVariantStyle(),
        sizeStyle.container,
        fullWidth && styles.fullWidth,
        trackColor ? { backgroundColor: trackColor } : undefined,
        borderColor ? { borderColor } : undefined,
        customContrastStyle,
        disabled && styles.containerDisabled,
        style,
      ]}
    >
      {/* 60fps Native Driver GPU-Accelerated Sliding Thumb Indicator */}
      {containerWidth > 0 && itemWidth > 0 && (
        <Animated.View
          style={[
            styles.thumbBase,
            getThumbVariantStyle(),
            {
              width: itemWidth,
              transform: [{ translateX: animatedTranslateX }],
            },
            activeThumbColor ? { backgroundColor: activeThumbColor } : undefined,
            activeBorderColor ? { borderColor: activeBorderColor } : undefined,
            activeItemStyle,
          ]}
          pointerEvents="none"
        />
      )}

      {options.map((option, index) => {
        const isActive = option.value === value;
        const isDisabled = disabled || option.disabled;

        const renderIcon = () => {
          if (!option.icon) return null;
          const resolvedIconColor = isActive ? resolvedActiveColor : resolvedInactiveColor;
          if (React.isValidElement(option.icon)) {
            const iconElement = option.icon as React.ReactElement<any>;
            return (
              <View style={iconStyle}>
                {React.cloneElement(iconElement, {
                  color: iconElement.props?.color || resolvedIconColor,
                  size:
                    iconElement.props?.size ||
                    (size === 'sm' ? 13 : size === 'lg' ? 17 : 15),
                })}
              </View>
            );
          }
          return <View style={iconStyle}>{option.icon}</View>;
        };

        return (
          <TouchableOpacity
            key={String(option.value)}
            activeOpacity={0.7}
            disabled={isDisabled}
            onLayout={(e) => handleItemLayout(index, e)}
            style={[
              styles.item,
              fullWidth ? styles.itemFullWidth : styles.itemAuto,
              itemHeight ? { height: itemHeight } : undefined,
              itemStyle,
              isDisabled && styles.itemDisabled,
            ]}
            onPress={() => handleSelect(option)}
          >
            {renderIcon()}

            <AppText
              style={[
                styles.labelText,
                sizeStyle.text,
                inactiveColor ? { color: inactiveColor } : undefined,
                labelStyle,
                isActive && [
                  styles.labelActiveText,
                  { color: resolvedActiveColor },
                  activeLabelStyle,
                ],
              ]}
              numberOfLines={1}
            >
              {option.label}
            </AppText>

            {option.badge !== undefined && (
              <View
                style={[
                  styles.badge,
                  badgeStyle,
                  isActive && [styles.badgeActive, activeBadgeStyle],
                ]}
              >
                <AppText
                  style={[
                    styles.badgeText,
                    badgeTextStyle,
                    isActive && [
                      styles.badgeTextActive,
                      { color: resolvedActiveColor },
                      activeBadgeTextStyle,
                    ],
                  ]}
                >
                  {option.badge}
                </AppText>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export const AppSegmentedControl = React.memo(AppSegmentedControlComponent) as typeof AppSegmentedControlComponent;
