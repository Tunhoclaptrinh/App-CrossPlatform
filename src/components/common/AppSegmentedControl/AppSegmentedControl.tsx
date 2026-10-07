import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import type { AppSegmentedControlProps, SegmentOption } from './types';
import { createSegmentedStyles, getSizeStyles } from './styles';

export const AppSegmentedControl = <T extends string | number = string>({
  options,
  value,
  onChange,
  size = 'md',
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
  } = useThemeMode();

  const effectiveContrast = contrast ?? globalContrast ?? 'normal';
  const effectiveShadow = shadow ?? (globalShadow !== 'none' ? globalShadow : undefined);

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

  const getItemActiveStyle = () => {
    switch (variant) {
      case 'glass':
        return isDark ? styles.itemActiveGlassDark : styles.itemActiveGlassLight;
      case 'pill':
        return isDark ? styles.itemActivePillDark : styles.itemActivePillLight;
      case 'tonal':
        return isDark ? styles.itemActiveTonalDark : styles.itemActiveTonalLight;
      case 'outline':
        return isDark ? styles.itemActiveOutlineDark : styles.itemActiveOutlineLight;
      case 'standard':
      default:
        return isDark ? styles.itemActiveDark : styles.itemActiveLight;
    }
  };

  const resolvedActiveColor = activeColor || themeColors.primary;
  const resolvedInactiveColor = inactiveColor || themeColors.textSecondary;

  return (
    <View
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
      {options.map((option) => {
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
            style={[
              styles.item,
              fullWidth ? styles.itemFullWidth : styles.itemAuto,
              itemHeight ? { height: itemHeight } : undefined,
              itemStyle,
              isActive && [
                getItemActiveStyle(),
                activeThumbColor ? { backgroundColor: activeThumbColor } : undefined,
                activeBorderColor ? { borderColor: activeBorderColor } : undefined,
                activeItemStyle,
              ],
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
