import React, { useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  Animated,
  LayoutChangeEvent,
  StyleSheet,
} from 'react-native';
import { AppText } from '../../AppText';
import { haptics } from '@/utils/haptics';
import { BottomNavBadge } from './BottomNavBadge';
import { styles } from '../styles';
import type {
  BottomNavItem as ItemType,
  BottomNavIndicator,
  BottomNavItemLayout,
} from '../types';

const itemStyles = StyleSheet.create({
  itemDense: {
    paddingHorizontal: 1.5,
  },
  itemVeryDense: {
    paddingHorizontal: 1,
  },
  labelDense: {
    fontSize: 10.5,
    lineHeight: 13,
  },
  labelVeryDense: {
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: -0.3,
  },
});

export interface BottomNavItemProps {
  item: ItemType;
  isActive: boolean;
  onPress: () => void;
  showLabel?: boolean;
  itemLayout?: BottomNavItemLayout;
  activeColor: string;
  inactiveColor: string;
  indicatorStyle?: BottomNavIndicator;
  isDark?: boolean;
  itemStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  activeLabelStyle?: StyleProp<TextStyle>;
  indicatorBorderRadius?: number;
  indicatorInset?: number;
  indicatorBorderWidth?: number;
  indicatorBorderColor?: string;
  labelGap?: number;
  onLayout?: (e: LayoutChangeEvent) => void;
  hasSlidingIndicator?: boolean;
  totalItems?: number;
}

export const BottomNavItemComponent: React.FC<BottomNavItemProps> = React.memo(({
  item,
  isActive,
  onPress,
  showLabel = true,
  itemLayout = 'vertical',
  activeColor,
  inactiveColor,
  indicatorStyle = 'none',
  isDark = false,
  itemStyle,
  labelStyle,
  activeLabelStyle,
  indicatorBorderRadius,
  indicatorInset,
  indicatorBorderWidth,
  indicatorBorderColor,
  labelGap,
  onLayout,
  hasSlidingIndicator = false,
  totalItems,
}) => {
  const pillScale = useRef(new Animated.Value(isActive ? 1 : 0.75)).current;
  const pillOpacity = useRef(new Animated.Value(isActive ? 1 : 0)).current;
  const iconScale = useRef(new Animated.Value(isActive ? 1.05 : 1)).current;

  useEffect(() => {
    if (isActive) {
      Animated.parallel([
        Animated.spring(pillScale, {
          toValue: 1,
          friction: 6,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.timing(pillOpacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.spring(iconScale, {
            toValue: 1.14,
            friction: 4,
            tension: 140,
            useNativeDriver: true,
          }),
          Animated.spring(iconScale, {
            toValue: 1.04,
            friction: 6,
            tension: 80,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(pillScale, {
          toValue: 0.75,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.timing(pillOpacity, {
          toValue: 0,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.timing(iconScale, {
          toValue: 1,
          duration: 140,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isActive, pillScale, pillOpacity, iconScale]);

  const handlePress = () => {
    if (item.disabled) return;
    haptics.light();
    if (item.onPress) {
      item.onPress();
    }
    onPress();
  };

  const iconColor = isActive ? activeColor : inactiveColor;
  const isDense = (totalItems ?? 4) >= 5;
  const isVeryDense = (totalItems ?? 4) >= 6;
  const isHorizontal = itemLayout === 'horizontal';
  const isIconOnly = itemLayout === 'icon-only';

  const iconSize = isHorizontal
    ? (isVeryDense ? 16 : isDense ? 18 : 20)
    : (isVeryDense ? 19 : isDense ? 20 : 22);

  const renderIcon = () => {
    if (isActive && item.activeIcon) {
      return item.activeIcon;
    }
    if (typeof item.icon === 'function') {
      return item.icon({ focused: isActive, color: iconColor, size: iconSize });
    }
    if (React.isValidElement(item.icon)) {
      return React.cloneElement(item.icon as React.ReactElement<{ color?: string; size?: number }>, {
        color: iconColor,
        size: iconSize,
      });
    }
    return item.icon;
  };

  const effectiveRadius = indicatorBorderRadius !== undefined ? indicatorBorderRadius : 9999;
  const inset = indicatorInset !== undefined ? indicatorInset : 3.5;
  const insetV = inset;
  const insetH = inset;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={item.disabled}
      onPress={handlePress}
      onLayout={onLayout}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive, disabled: item.disabled }}
      accessibilityLabel={item.accessibilityLabel || item.label}
      testID={item.testID}
      style={[
        styles.item,
        isDense && itemStyles.itemDense,
        isVeryDense && itemStyles.itemVeryDense,
        isHorizontal && styles.itemHorizontal,
        item.disabled && styles.itemDisabled,
        itemStyle,
      ]}
    >
      {/* 1. Animated Pill Indicator Background (only when not handled by dock container sliding thumb) */}
      {indicatorStyle === 'pill' && !hasSlidingIndicator && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.indicatorPill,
            {
              backgroundColor: `${activeColor}16`,
              borderColor: indicatorBorderColor ?? `${activeColor}28`,
              borderWidth: indicatorBorderWidth ?? 1,
              borderRadius: effectiveRadius,
              top: insetV,
              bottom: insetV,
              left: insetH,
              right: insetH,
              opacity: pillOpacity,
              transform: [{ scale: pillScale }],
            },
          ]}
        />
      )}

      {/* 2. Glow Indicator Background */}
      {indicatorStyle === 'glow' && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.indicatorGlow,
            {
              backgroundColor: activeColor,
              opacity: pillOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.28],
              }),
              transform: [{ scale: pillScale }],
            },
            indicatorBorderRadius !== undefined && { borderRadius: indicatorBorderRadius },
          ]}
        />
      )}

      {/* Icon with Badge */}
      <Animated.View style={[styles.iconContainer, { transform: [{ scale: iconScale }] }]}>
        {renderIcon()}
        <BottomNavBadge
          badge={item.badge}
          badgeDot={item.badgeDot}
          isDark={isDark}
          isCompact={isVeryDense}
        />
      </Animated.View>

      {/* Optional Label (Hidden if icon-only or showLabel=false) */}
      {!isIconOnly && showLabel && item.label ? (
        <AppText
          style={[
            styles.label,
            isDense && itemStyles.labelDense,
            isVeryDense && itemStyles.labelVeryDense,
            isHorizontal && styles.labelHorizontal,
            !isHorizontal && labelGap !== undefined && { marginTop: labelGap },
            { color: iconColor },
            isActive && styles.labelActive,
            labelStyle,
            isActive && activeLabelStyle,
          ]}
          numberOfLines={1}
        >
          {item.label}
        </AppText>
      ) : null}

      {/* 3. Dot Indicator */}
      {indicatorStyle === 'dot' && (
        <Animated.View
          style={[
            styles.indicatorDot,
            {
              backgroundColor: activeColor,
              opacity: pillOpacity,
              transform: [{ scale: pillScale }],
            },
          ]}
        />
      )}

      {/* 4. Line Indicator */}
      {indicatorStyle === 'line' && (
        <Animated.View
          style={[
            styles.indicatorLine,
            {
              backgroundColor: activeColor,
              opacity: pillOpacity,
              transform: [{ scaleX: pillScale }],
            },
          ]}
        />
      )}
    </TouchableOpacity>
  );
});

BottomNavItemComponent.displayName = 'BottomNavItem';
