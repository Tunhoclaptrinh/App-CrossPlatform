import React, { useMemo } from 'react';
import { TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import { AppText } from '../../AppText';
import { haptics } from '@/utils/haptics';
import { BottomNavBadge } from './BottomNavBadge';
import { styles } from '../styles';
import type {
  BottomNavCenterFab as FabType,
  BottomNavCenterFabHelpers,
  BottomNavFabShape,
  BottomNavFabPlacement,
  BottomNavPlacement,
} from '../types';

export interface BottomNavCenterFabProps {
  fab?:
    | React.ReactNode
    | FabType
    | ((helpers: BottomNavCenterFabHelpers) => React.ReactNode);
  renderCenterFab?: (helpers: BottomNavCenterFabHelpers) => React.ReactNode;
  primaryColor: string;
  isDark?: boolean;
  isFloating?: boolean;
  shape?: BottomNavFabShape;
  placement?: BottomNavFabPlacement;
  navPlacement?: BottomNavPlacement;
  liftOffset?: number;
}

export const BottomNavCenterFabComponent: React.FC<BottomNavCenterFabProps> = React.memo(({
  fab,
  renderCenterFab,
  primaryColor,
  isDark = false,
  isFloating = false,
  shape = 'circle',
  placement = 'lifted',
  navPlacement = 'bottom',
  liftOffset,
}) => {
  const isTop = navPlacement === 'top';
  const fabConfig =
    typeof fab === 'object' && !React.isValidElement(fab) ? (fab as FabType) : undefined;

  const effectivePlacement = fabConfig?.placement || placement;
  const isEmbedded = effectivePlacement === 'embedded';
  const effectiveLiftOffset = fabConfig?.liftOffset ?? liftOffset ?? 22;

  const dynamicLiftTransformStyle = useMemo<StyleProp<ViewStyle>>(() => {
    if (isEmbedded) return { transform: [{ translateY: 0 }] };
    const translateY = isTop ? effectiveLiftOffset : -effectiveLiftOffset;
    return { transform: [{ translateY }] };
  }, [isEmbedded, isTop, effectiveLiftOffset]);

  const helpers: BottomNavCenterFabHelpers = useMemo(
    () => ({
      isDark,
      primaryColor,
      isTop,
      isFloating,
      liftOffset: effectiveLiftOffset,
      placement: effectivePlacement,
    }),
    [isDark, primaryColor, isTop, isFloating, effectiveLiftOffset, effectivePlacement]
  );

  // 1. Full custom render prop via renderCenterFab
  if (renderCenterFab) {
    return (
      <View style={styles.fabContainer}>
        <View style={[styles.fabCustomWrapper, dynamicLiftTransformStyle]}>
          {renderCenterFab(helpers)}
        </View>
      </View>
    );
  }

  // 2. Functional fab: (helpers) => React.ReactNode
  if (typeof fab === 'function') {
    return (
      <View style={styles.fabContainer}>
        <View style={[styles.fabCustomWrapper, dynamicLiftTransformStyle]}>
          {fab(helpers)}
        </View>
      </View>
    );
  }

  // 3. Raw React Element passed directly: <CustomComponent />
  if (React.isValidElement(fab)) {
    return (
      <View style={styles.fabContainer}>
        <View style={[styles.fabCustomWrapper, dynamicLiftTransformStyle]}>
          {fab}
        </View>
      </View>
    );
  }

  // 4. Object with customComponent: { customComponent: <CustomComponent /> }
  if (fabConfig?.customComponent) {
    const customContent =
      typeof fabConfig.customComponent === 'function'
        ? fabConfig.customComponent(helpers)
        : fabConfig.customComponent;
    return (
      <View style={styles.fabContainer}>
        <View style={[styles.fabCustomWrapper, dynamicLiftTransformStyle]}>
          {customContent}
        </View>
      </View>
    );
  }

  // 5. Standard Fab Config (Default button with custom size, icon, shape, badge, label...)
  if (!fabConfig) return null;

  const handlePress = () => {
    haptics.medium();
    if (fabConfig.onPress) fabConfig.onPress();
  };

  const bgColor = fabConfig.backgroundColor || primaryColor;
  const iconColor = fabConfig.iconColor || '#FFFFFF';
  const effectiveShape = fabConfig.shape || shape;
  const isSquircle = effectiveShape === 'squircle';

  const customSize = fabConfig.size;
  const customSizeStyle: StyleProp<ViewStyle> = customSize
    ? {
        width: customSize,
        height: customSize,
        borderRadius: isSquircle ? Math.round(customSize * 0.35) : Math.round(customSize / 2),
      }
    : null;

  return (
    <View style={styles.fabContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={fabConfig.accessibilityLabel || fabConfig.label || 'Action'}
        style={[
          styles.fabButton,
          isDark ? styles.fabButtonDark : styles.fabButtonLight,
          isEmbedded ? styles.fabEmbedded : isTop ? styles.fabButtonLiftedTop : styles.fabButtonLifted,
          dynamicLiftTransformStyle,
          isSquircle && styles.fabSquircle,
          customSizeStyle,
          { backgroundColor: bgColor },
        ]}
      >
        {React.isValidElement(fabConfig.icon)
          ? React.cloneElement(fabConfig.icon as React.ReactElement<{ color?: string; size?: number }>, {
              color: iconColor,
              size: isEmbedded ? 22 : 24,
            })
          : fabConfig.icon}
        <BottomNavBadge
          badge={fabConfig.badge}
          badgeDot={fabConfig.badgeDot}
          isDark={isDark}
        />
      </TouchableOpacity>
      {fabConfig.label ? (
        <AppText
          style={[styles.fabLabel, isDark ? styles.fabLabelDark : styles.fabLabelLight]}
          numberOfLines={1}
        >
          {fabConfig.label}
        </AppText>
      ) : null}
    </View>
  );
});

BottomNavCenterFabComponent.displayName = 'BottomNavCenterFab';
