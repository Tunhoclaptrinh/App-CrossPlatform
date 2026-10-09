import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
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
}) => {
  const handlePress = () => {
    if (item.disabled) return;
    haptics.light();
    if (item.onPress) {
      item.onPress();
    }
    onPress();
  };

  const iconColor = isActive ? activeColor : inactiveColor;
  const iconSize = itemLayout === 'horizontal' ? 20 : 22;
  const isHorizontal = itemLayout === 'horizontal';
  const isIconOnly = itemLayout === 'icon-only';

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

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={item.disabled}
      onPress={handlePress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive, disabled: item.disabled }}
      accessibilityLabel={item.accessibilityLabel || item.label}
      testID={item.testID}
      style={[
        styles.item,
        isHorizontal && styles.itemHorizontal,
        item.disabled && styles.itemDisabled,
        itemStyle,
      ]}
    >
      {/* 1. Pill Indicator Background */}
      {isActive && indicatorStyle === 'pill' && (
        <View
          style={[
            styles.indicatorPill,
            { backgroundColor: `${activeColor}16` },
          ]}
        />
      )}

      {/* 2. Glow Indicator Background */}
      {isActive && indicatorStyle === 'glow' && (
        <View
          style={[
            styles.indicatorGlow,
            { backgroundColor: activeColor },
          ]}
        />
      )}

      {/* Icon with Badge */}
      <View style={styles.iconContainer}>
        {renderIcon()}
        <BottomNavBadge
          badge={item.badge}
          badgeDot={item.badgeDot}
          isDark={isDark}
        />
      </View>

      {/* Optional Label (Hidden if icon-only or showLabel=false) */}
      {!isIconOnly && showLabel && item.label ? (
        <AppText
          style={[
            styles.label,
            isHorizontal && styles.labelHorizontal,
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
      {isActive && indicatorStyle === 'dot' && (
        <View style={[styles.indicatorDot, { backgroundColor: activeColor }]} />
      )}

      {/* 4. Line Indicator */}
      {isActive && indicatorStyle === 'line' && (
        <View style={[styles.indicatorLine, { backgroundColor: activeColor }]} />
      )}
    </TouchableOpacity>
  );
});

BottomNavItemComponent.displayName = 'BottomNavItem';
