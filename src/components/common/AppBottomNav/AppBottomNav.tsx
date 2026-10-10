import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  LayoutAnimation,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeMode } from '@/hooks/useThemeMode';
import {
  BottomNavItemComponent,
  BottomNavBadge,
  BottomNavCenterFabComponent,
} from './components';
import { styles, getNavHeight } from './styles';
import type {
  AppBottomNavProps,
  AppBottomNavCustomHelpers,
} from './types';

const AppBottomNavComponent: React.FC<AppBottomNavProps> = React.memo(({
  items,
  activeKey,
  onChange,
  variant = 'standard',
  placement = 'bottom',
  contrast,
  size = 'md',
  showLabels = true,
  itemLayout = 'vertical',
  indicatorStyle = 'none',
  activeColor,
  inactiveColor,
  backgroundColor,
  backgroundOpacity,
  centerFab,
  fabShape = 'circle',
  fabPlacement = 'lifted',
  fabLiftOffset,
  renderCenterFab,
  topContent,
  customBottomNav,
  renderCustomBottomNav,
  isCustomMode,
  customMode,
  onCustomModeChange,
  replacementScope = 'full',
  hidden = false,
  safeArea = true,
  borderRadius,
  indicatorBorderRadius,
  indicatorInset,
  indicatorBorderEnabled = true,
  indicatorBorderWidth,
  indicatorBorderColor,
  indicatorBorderOpacity,
  labelGap,
  style,
  containerStyle,
  itemStyle,
  labelStyle,
  activeLabelStyle,
}) => {
  const insets = useSafeAreaInsets();
  const { theme: themeColors, isDark, globalContrast, reduceMotion } = useThemeMode();

  const isTop = placement === 'top';
  const isFloating = variant === 'floating-pill' || variant === 'frosted-glass';
  const resolvedContrast = contrast ?? globalContrast;

  const effectiveActiveColor = activeColor || themeColors.primary;
  const effectiveInactiveColor = inactiveColor || themeColors.textSecondary;

  // Segmented Sliding Indicator Layout State & Physics (Concentric 60fps continuous thumb)
  const [itemLayouts, setItemLayouts] = useState<Record<string, { x: number; width: number }>>({});
  const indicatorTranslateX = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;
  const isInitialIndicatorMount = useRef(true);

  const handleItemLayout = useCallback((key: string, e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    if (width > 0) {
      setItemLayouts((prev) => {
        if (prev[key]?.x === x && prev[key]?.width === width) return prev;
        return { ...prev, [key]: { x, width } };
      });
    }
  }, []);

  useEffect(() => {
    const layout = itemLayouts[activeKey];
    if (!layout) return;

    if (isInitialIndicatorMount.current) {
      indicatorTranslateX.setValue(layout.x);
      indicatorWidth.setValue(layout.width);
      isInitialIndicatorMount.current = false;
      return;
    }

    if (reduceMotion) {
      indicatorTranslateX.setValue(layout.x);
      indicatorWidth.setValue(layout.width);
    } else {
      Animated.parallel([
        Animated.spring(indicatorTranslateX, {
          toValue: layout.x,
          damping: 24,
          mass: 0.65,
          stiffness: 280,
          useNativeDriver: false,
        }),
        Animated.spring(indicatorWidth, {
          toValue: layout.width,
          damping: 24,
          mass: 0.65,
          stiffness: 280,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [activeKey, itemLayouts, reduceMotion, indicatorTranslateX, indicatorWidth]);

  // Corner radius calculation synchronized with Theme Tokens
  const effectiveRadius = useMemo(() => {
    if (borderRadius !== undefined) return borderRadius;
    if (variant === 'floating-pill' || variant === 'frosted-glass') {
      return 9999;
    }
    return 0;
  }, [borderRadius, variant]);

  const effectiveIndicatorRadius = useMemo(() => {
    if (indicatorBorderRadius !== undefined) return indicatorBorderRadius;
    if (variant === 'standard') {
      // Trong thanh đáy phẳng standard, bo góc 14px hài hòa, không bị phình thành khối tròn khổng lồ
      return 14;
    }
    // Default to true full pill (capsule) matching the dock's concentric curved cap
    return 9999;
  }, [indicatorBorderRadius, variant]);

  const showIndicatorBorder =
    indicatorBorderEnabled !== false &&
    (indicatorBorderWidth === undefined || indicatorBorderWidth > 0);
  const effectiveBorderWidth = showIndicatorBorder ? (indicatorBorderWidth ?? 1) : 0;

  const effectiveBorderColor = useMemo(() => {
    if (!showIndicatorBorder) return 'transparent';
    const toAlphaHex = (opacity: number) => {
      const v = Math.round(Math.max(0, Math.min(1, opacity)) * 255);
      return v.toString(16).padStart(2, '0');
    };
    const defaultAlpha = indicatorBorderOpacity ?? 0.28;
    if (indicatorBorderColor) {
      if (
        indicatorBorderOpacity !== undefined &&
        indicatorBorderColor.startsWith('#') &&
        indicatorBorderColor.length === 7
      ) {
        return `${indicatorBorderColor}${toAlphaHex(indicatorBorderOpacity)}`;
      }
      return indicatorBorderColor;
    }
    if (effectiveActiveColor.startsWith('#') && effectiveActiveColor.length === 7) {
      return `${effectiveActiveColor}${toAlphaHex(defaultAlpha)}`;
    }
    return `${effectiveActiveColor}28`;
  }, [
    showIndicatorBorder,
    indicatorBorderColor,
    indicatorBorderOpacity,
    effectiveActiveColor,
  ]);

  const navBaseHeight = getNavHeight(size, isFloating);
  const effectiveInset = safeArea ? (isTop ? insets.top : insets.bottom) : 0;

  // Split items around centerFab if provided
  const { leftItems, rightItems, hasSplitFab } = useMemo(() => {
    const hasFabElement = Boolean(centerFab || renderCenterFab);
    if (!hasFabElement || items.length <= 1) {
      return { leftItems: items, rightItems: [], hasSplitFab: false };
    }
    const midPoint = Math.ceil(items.length / 2);
    return {
      leftItems: items.slice(0, midPoint),
      rightItems: items.slice(midPoint),
      hasSplitFab: true,
    };
  }, [items, centerFab, renderCenterFab]);

  // Variant styling
  const variantContainerStyle = useMemo(() => {
    if (variant === 'floating-pill') {
      return [
        styles.floatingPill,
        isDark ? styles.floatingPillDark : styles.floatingPillLight,
        { borderRadius: effectiveRadius },
      ];
    }
    if (variant === 'frosted-glass') {
      return [
        styles.frostedGlass,
        isDark ? styles.frostedGlassDark : styles.frostedGlassLight,
        { borderRadius: effectiveRadius },
      ];
    }
    return [
      styles.standardContainer,
      isDark ? styles.standardDark : styles.standardLight,
    ];
  }, [variant, isDark, effectiveRadius]);

  // Contrast styling
  const contrastStyle = useMemo(() => {
    if (resolvedContrast === 'high') {
      return isDark ? styles.contrastHighDark : styles.contrastHighLight;
    }
    if (resolvedContrast === 'subtle') {
      return styles.contrastSubtle;
    }
    return null;
  }, [resolvedContrast, isDark]);

  // Custom background override
  const customBgStyle: StyleProp<ViewStyle> = useMemo(() => {
    if (!backgroundColor) return null;
    return {
      backgroundColor,
      ...(backgroundOpacity !== undefined ? { opacity: backgroundOpacity } : null),
    };
  }, [backgroundColor, backgroundOpacity]);

  // Custom Replacement Helpers
  const handleCloseCustomMode = useCallback(() => {
    if (onCustomModeChange) onCustomModeChange(false);
  }, [onCustomModeChange]);

  const customHelpers: AppBottomNavCustomHelpers = useMemo(
    () => ({
      close: handleCloseCustomMode,
      insets,
      isDark,
      themeColors: themeColors as unknown as Record<string, string>,
    }),
    [handleCloseCustomMode, insets, isDark, themeColors]
  );

  const isCustomControlled = isCustomMode !== undefined ? isCustomMode : customMode;
  const isCustomActive =
    isCustomControlled !== undefined
      ? isCustomControlled
      : Boolean(customBottomNav || renderCustomBottomNav);

  // Render Top/Accessory Slot (Mini-Player, Cart, Filter chips...)
  const renderTopContentSlot = () => {
    if (!topContent) return null;
    return (
      <View style={isTop ? styles.topContentWrapperBelow : styles.topContentWrapper}>
        {topContent}
      </View>
    );
  };

  // If hidden is true, collapse and render nothing
  if (hidden) {
    return null;
  }

  // -------------------------------------------------------------
  // FULL CUSTOM BOTTOM NAV REPLACEMENT MODE
  // -------------------------------------------------------------
  if (isCustomActive && (customBottomNav || renderCustomBottomNav)) {
    const customContent = renderCustomBottomNav
      ? renderCustomBottomNav(customHelpers)
      : customBottomNav;

    if (isFloating) {
      return (
        <View
          style={[
            isTop ? styles.floatingWrapperTop : styles.floatingWrapper,
            { [isTop ? 'paddingTop' : 'paddingBottom']: Math.max(effectiveInset, 12) },
            style,
          ]}
        >
          {!isTop && renderTopContentSlot()}
          {replacementScope === 'inner' ? (
            <View
              style={[
                styles.container,
                { minHeight: navBaseHeight },
                variantContainerStyle,
                contrastStyle,
                customBgStyle,
                containerStyle,
              ]}
            >
              {customContent}
            </View>
          ) : (
            <View
              style={[
                styles.floatingPill,
                styles.customContainer,
                isDark ? styles.floatingPillDark : styles.floatingPillLight,
                { borderRadius: effectiveRadius },
                contrastStyle,
                customBgStyle,
                containerStyle,
              ]}
            >
              {customContent}
            </View>
          )}
          {isTop && renderTopContentSlot()}
        </View>
      );
    }

    return (
      <View style={[styles.wrapper, style]}>
        {!isTop && renderTopContentSlot()}
        <View
          style={[
            styles.container,
            {
              minHeight: navBaseHeight + effectiveInset,
              [isTop ? 'paddingTop' : 'paddingBottom']: effectiveInset,
            },
            isTop && styles.standardContainerTop,
            variantContainerStyle,
            contrastStyle,
            customBgStyle,
            containerStyle,
          ]}
        >
          {customContent}
        </View>
        {isTop && renderTopContentSlot()}
      </View>
    );
  }

  const hasSlidingIndicator = indicatorStyle === 'pill' && Boolean(itemLayouts[activeKey]);

  const renderSlidingIndicator = () => {
    if (indicatorStyle !== 'pill' || !itemLayouts[activeKey]) return null;
    const inset = indicatorInset !== undefined ? indicatorInset : 3.5;
    const topOffset = (isTop && !isFloating && safeArea ? insets.top : 0) + inset;
    const bottomOffset = (!isTop && !isFloating && safeArea ? insets.bottom : 0) + inset;
    return (
      <Animated.View
        pointerEvents="none"
        style={[
          styles.slidingIndicatorPill,
          {
            top: topOffset,
            bottom: bottomOffset,
            transform: [
              {
                translateX: Animated.add(indicatorTranslateX, inset),
              },
            ],
            width: Animated.add(indicatorWidth, -inset * 2),
            borderRadius: effectiveIndicatorRadius,
            backgroundColor: `${effectiveActiveColor}16`,
            borderColor: effectiveBorderColor,
            borderWidth: effectiveBorderWidth,
          },
        ]}
      />
    );
  };

  const renderItem = (item: (typeof items)[0]) => {
    const isActive = item.key === activeKey;
    return (
      <BottomNavItemComponent
        key={item.key}
        item={item}
        isActive={isActive}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          onChange(item.key);
        }}
        onLayout={(e) => handleItemLayout(item.key, e)}
        hasSlidingIndicator={hasSlidingIndicator}
        showLabel={showLabels}
        itemLayout={itemLayout}
        activeColor={effectiveActiveColor}
        inactiveColor={effectiveInactiveColor}
        indicatorStyle={indicatorStyle}
        isDark={isDark}
        itemStyle={itemStyle}
        labelStyle={labelStyle}
        activeLabelStyle={activeLabelStyle}
        indicatorBorderRadius={effectiveIndicatorRadius}
        indicatorInset={indicatorInset}
        indicatorBorderWidth={effectiveBorderWidth}
        indicatorBorderColor={effectiveBorderColor}
        labelGap={labelGap}
      />
    );
  };

  const renderFabComponent = (floating: boolean) => {
    if (!centerFab && !renderCenterFab) return null;
    return (
      <BottomNavCenterFabComponent
        fab={centerFab}
        renderCenterFab={renderCenterFab}
        primaryColor={effectiveActiveColor}
        isDark={isDark}
        isFloating={floating}
        shape={fabShape}
        placement={fabPlacement}
        navPlacement={placement}
        liftOffset={fabLiftOffset}
      />
    );
  };

  // 1. Floating Variants (Floating Pill or Frosted Glass Island Dock)
  if (isFloating) {
    return (
      <View
        style={[
          isTop ? styles.floatingWrapperTop : styles.floatingWrapper,
          { [isTop ? 'paddingTop' : 'paddingBottom']: Math.max(effectiveInset, 12) },
          style,
        ]}
      >
        {!isTop && renderTopContentSlot()}
        <View
          style={[
            styles.container,
            { height: navBaseHeight },
            variantContainerStyle,
            contrastStyle,
            customBgStyle,
            containerStyle,
          ]}
        >
          {renderSlidingIndicator()}
          {hasSplitFab ? (
            <>
              {leftItems.map(renderItem)}
              {renderFabComponent(true)}
              {rightItems.map(renderItem)}
            </>
          ) : (
            <>
              {items.map(renderItem)}
              {renderFabComponent(true)}
            </>
          )}
        </View>
        {isTop && renderTopContentSlot()}
      </View>
    );
  }

  // 2. Standard Variant (Fixed bottom/top bar with SafeArea padding)
  return (
    <View style={[styles.wrapper, style]}>
      {!isTop && renderTopContentSlot()}
      <View
        style={[
          styles.container,
          {
            height: navBaseHeight + effectiveInset,
            [isTop ? 'paddingTop' : 'paddingBottom']: effectiveInset,
          },
          isTop && styles.standardContainerTop,
          variantContainerStyle,
          contrastStyle,
          customBgStyle,
          containerStyle,
        ]}
      >
        {renderSlidingIndicator()}
        {hasSplitFab ? (
          <>
            {leftItems.map(renderItem)}
            {renderFabComponent(false)}
            {rightItems.map(renderItem)}
          </>
        ) : (
          <>
            {items.map(renderItem)}
            {renderFabComponent(false)}
          </>
        )}
      </View>
      {isTop && renderTopContentSlot()}
    </View>
  );
});

AppBottomNavComponent.displayName = 'AppBottomNav';

export const AppBottomNav = Object.assign(AppBottomNavComponent, {
  Item: BottomNavItemComponent,
  Badge: BottomNavBadge,
  CenterFab: BottomNavCenterFabComponent,
});
