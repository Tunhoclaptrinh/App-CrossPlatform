import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
  useImperativeHandle,
} from 'react';
import {
  ScrollView,
  View,
  Animated,
  PanResponder,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
} from 'react-native';
import type { ScrollViewInstance, Insets } from 'react-native';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
import type { AppScrollViewProps } from './types';
import { styles } from './styles';

export const AppScrollView = React.forwardRef<ScrollViewInstance, AppScrollViewProps>(({
  children,
  horizontal = false,
  indicatorVisible = true,
  indicatorMode = 'faint-to-bright',
  indicatorThickness,
  indicatorLength,
  minIndicatorLength,
  maxIndicatorLength,
  indicatorColor,
  indicatorInsets,
  indicatorThumbStyle,
  showTrack = false,
  trackColor,
  idleOpacity = 0.25,
  activeOpacity = 0.85,
  idleTimeoutMs = 800,
  containerStyle,
  style,
  draggableIndicator = true,
  dragHitSlop,
  enableGrabFeedback = true,
  onDragStart,
  onDragEnd,
  onScroll,
  onLayout,
  onContentSizeChange,
  ...restProps
}, ref) => {
  const { isDark } = useThemeMode();
  const { themeStyle } = useAppStore();
  const isGlass = themeStyle === 'apple-glass';

  // Effective dimensions: Độ dày tăng, hiện đại, sát viền
  const defaultThickness = horizontal ? 3.5 : 4.5;
  const thickness = indicatorThickness ?? defaultThickness;
  const defaultMinLength = horizontal ? 26 : 52;
  const defaultMaxLength = horizontal ? 42 : 82;
  const minLength = minIndicatorLength ?? defaultMinLength;
  const maxLength = maxIndicatorLength ?? defaultMaxLength;

  // Resolved insets - Sát viền màn hình khi cuộn
  const insets = useMemo(() => {
    if (horizontal) {
      return {
        left: indicatorInsets?.left ?? 6,
        right: indicatorInsets?.right ?? 6,
        bottom: indicatorInsets?.bottom ?? 1.5,
        top: indicatorInsets?.top ?? 0,
      };
    }
    return {
      top: indicatorInsets?.top ?? 6,
      bottom: indicatorInsets?.bottom ?? 6,
      right: indicatorInsets?.right ?? 1.5,
      left: indicatorInsets?.left ?? 0,
    };
  }, [horizontal, indicatorInsets]);

  // Inner scroll ref exposed via useImperativeHandle
  const internalScrollRef = useRef<ScrollViewInstance | null>(null);
  useImperativeHandle(ref, () => internalScrollRef.current as ScrollViewInstance);

  // Target opacities based on mode
  const effectiveMode = indicatorMode;
  const targetIdleOpacity = useMemo(() => {
    if (!indicatorVisible || effectiveMode === 'hidden') return 0;
    if (effectiveMode === 'auto-fade') return 0;
    if (effectiveMode === 'always-visible') return activeOpacity;
    return idleOpacity;
  }, [indicatorVisible, effectiveMode, activeOpacity, idleOpacity]);

  const targetActiveOpacity = useMemo(() => {
    if (!indicatorVisible || effectiveMode === 'hidden') return 0;
    return activeOpacity;
  }, [indicatorVisible, effectiveMode, activeOpacity]);

  // Animated values
  const indicatorPos = useRef(new Animated.Value(0)).current;
  const activeAnim = useRef(new Animated.Value(effectiveMode === 'always-visible' ? 1 : 0)).current;
  const grabAnim = useRef(new Animated.Value(0)).current;
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dragging interaction state
  const isDraggingRef = useRef(false);
  const dragStartScrollOffsetRef = useRef(0);
  const dragStartThumbPosRef = useRef(0);

  // Resolved hit slop for effortless touch grabbing
  const resolvedHitSlop = useMemo<Insets>(() => {
    if (typeof dragHitSlop === 'number') {
      return {
        top: dragHitSlop,
        bottom: dragHitSlop,
        left: dragHitSlop,
        right: dragHitSlop,
      };
    }
    if (dragHitSlop) {
      return dragHitSlop;
    }
    if (horizontal) {
      return { top: 20, bottom: 10, left: 10, right: 10 };
    }
    return { top: 10, bottom: 10, left: 24, right: 10 };
  }, [dragHitSlop, horizontal]);

  // Sync active state when mode changes
  useEffect(() => {
    activeAnim.setValue(effectiveMode === 'always-visible' ? 1 : 0);
  }, [effectiveMode, activeAnim]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  // Measurement states
  const [containerDimension, setContainerDimension] = useState({ width: 0, height: 0 });
  const [contentDimension, setContentDimension] = useState({ width: 0, height: 0 });

  // Store metrics in refs for zero-render scroll updates
  const maxScrollRef = useRef(0);
  const maxTravelRef = useRef(0);
  const lastOffsetRef = useRef(0);

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    onLayout?.(e);
    const { width, height } = e.nativeEvent.layout;
    setContainerDimension({ width, height });
  }, [onLayout]);

  const handleContentSizeChange = useCallback((w: number, h: number) => {
    onContentSizeChange?.(w, h);
    setContentDimension({ width: w, height: h });
  }, [onContentSizeChange]);

  // Calculations
  const viewportSize = horizontal ? containerDimension.width : containerDimension.height;
  const totalContentSize = horizontal ? contentDimension.width : contentDimension.height;

  const isScrollable = totalContentSize > viewportSize + 2 && viewportSize > 0;
  const shouldShow = indicatorVisible && effectiveMode !== 'hidden' && isScrollable;

  const trackLength = useMemo(() => {
    if (!isScrollable) return 0;
    if (horizontal) {
      return Math.max(0, viewportSize - insets.left - insets.right);
    }
    return Math.max(0, viewportSize - insets.top - insets.bottom);
  }, [isScrollable, horizontal, viewportSize, insets]);

  const thumbLength = useMemo(() => {
    if (!isScrollable || trackLength <= 0) return 0;
    if (indicatorLength) {
      return Math.min(trackLength, Math.max(14, indicatorLength));
    }
    const ratio = viewportSize / totalContentSize;
    const dynamicLength = minLength + (maxLength - minLength) * Math.min(1, Math.max(0, ratio));
    return Math.min(trackLength, Math.max(minLength, dynamicLength));
  }, [
    isScrollable,
    trackLength,
    indicatorLength,
    viewportSize,
    totalContentSize,
    minLength,
    maxLength,
  ]);

  const maxTravel = Math.max(0, trackLength - thumbLength);
  const maxScroll = Math.max(1, totalContentSize - viewportSize);

  // Keep refs up to date
  useEffect(() => {
    maxTravelRef.current = maxTravel;
    maxScrollRef.current = maxScroll;

    // Re-adjust thumb position if already scrolled
    if (maxScroll > 0) {
      const clamped = Math.max(0, Math.min(maxScroll, lastOffsetRef.current));
      indicatorPos.setValue((clamped / maxScroll) * maxTravel);
    }
  }, [maxTravel, maxScroll, indicatorPos]);

  // High-performance scroll handler (0 re-renders during scrolling)
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    onScroll?.(event);

    // Skip updating indicator from ScrollView events while dragging to avoid jitter
    if (isDraggingRef.current) {
      return;
    }

    const nativeEvt = event.nativeEvent;
    const offset = horizontal ? nativeEvt.contentOffset.x : nativeEvt.contentOffset.y;
    lastOffsetRef.current = offset;

    const currentMaxScroll = maxScrollRef.current;
    const currentMaxTravel = maxTravelRef.current;

    if (currentMaxScroll > 0) {
      const clampedOffset = Math.max(0, Math.min(currentMaxScroll, offset));
      const targetPos = (clampedOffset / currentMaxScroll) * currentMaxTravel;
      indicatorPos.setValue(targetPos);
    }

    // Trigger active expansion & opacity animation
    if (effectiveMode !== 'always-visible' && effectiveMode !== 'hidden') {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
      Animated.timing(activeAnim, {
        toValue: 1,
        duration: 90,
        useNativeDriver: true,
      }).start();

      fadeTimeoutRef.current = setTimeout(() => {
        Animated.timing(activeAnim, {
          toValue: 0,
          duration: 320,
          useNativeDriver: true,
        }).start();
      }, idleTimeoutMs);
    }
  }, [
    onScroll,
    horizontal,
    indicatorPos,
    effectiveMode,
    activeAnim,
    idleTimeoutMs,
  ]);

  // Interactive PanResponder for touch & drag (Fast-Scroller)
  const panResponder = useMemo(() => {
    if (!draggableIndicator) return null;

    return PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (!shouldShow) return false;
        const delta = horizontal ? gestureState.dx : gestureState.dy;
        const crossDelta = horizontal ? gestureState.dy : gestureState.dx;
        return Math.abs(delta) > 3 && Math.abs(delta) > Math.abs(crossDelta);
      },
      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        if (!shouldShow) return false;
        const delta = horizontal ? gestureState.dx : gestureState.dy;
        const crossDelta = horizontal ? gestureState.dy : gestureState.dx;
        return Math.abs(delta) > 3 && Math.abs(delta) > Math.abs(crossDelta);
      },
      onPanResponderGrant: () => {
        isDraggingRef.current = true;
        dragStartScrollOffsetRef.current = lastOffsetRef.current;

        const currentMaxScroll = maxScrollRef.current;
        const currentMaxTravel = maxTravelRef.current;
        if (currentMaxScroll > 0) {
          dragStartThumbPosRef.current = (lastOffsetRef.current / currentMaxScroll) * currentMaxTravel;
        } else {
          dragStartThumbPosRef.current = 0;
        }

        if (fadeTimeoutRef.current) {
          clearTimeout(fadeTimeoutRef.current);
        }
        activeAnim.setValue(1);
        if (enableGrabFeedback) {
          Animated.spring(grabAnim, {
            toValue: 1,
            friction: 7,
            tension: 50,
            useNativeDriver: true,
          }).start();
        }

        onDragStart?.();
      },
      onPanResponderMove: (_, gestureState) => {
        if (!isDraggingRef.current) return;
        const delta = horizontal ? gestureState.dx : gestureState.dy;
        const currentMaxTravel = maxTravelRef.current;
        const currentMaxScroll = maxScrollRef.current;
        if (currentMaxTravel <= 0 || currentMaxScroll <= 0) return;

        const newThumbPos = Math.max(0, Math.min(currentMaxTravel, dragStartThumbPosRef.current + delta));
        const targetScrollOffset = (newThumbPos / currentMaxTravel) * currentMaxScroll;

        indicatorPos.setValue(newThumbPos);
        lastOffsetRef.current = targetScrollOffset;

        internalScrollRef.current?.scrollTo({
          [horizontal ? 'x' : 'y']: targetScrollOffset,
          animated: false,
        });
      },
      onPanResponderRelease: () => {
        isDraggingRef.current = false;
        if (enableGrabFeedback) {
          Animated.timing(grabAnim, {
            toValue: 0,
            duration: 160,
            useNativeDriver: true,
          }).start();
        }

        onDragEnd?.();

        if (fadeTimeoutRef.current) {
          clearTimeout(fadeTimeoutRef.current);
        }
        fadeTimeoutRef.current = setTimeout(() => {
          Animated.timing(activeAnim, {
            toValue: 0,
            duration: 320,
            useNativeDriver: true,
          }).start();
        }, idleTimeoutMs);
      },
      onPanResponderTerminate: () => {
        isDraggingRef.current = false;
        if (enableGrabFeedback) {
          Animated.timing(grabAnim, {
            toValue: 0,
            duration: 160,
            useNativeDriver: true,
          }).start();
        }

        onDragEnd?.();

        if (fadeTimeoutRef.current) {
          clearTimeout(fadeTimeoutRef.current);
        }
        fadeTimeoutRef.current = setTimeout(() => {
          Animated.timing(activeAnim, {
            toValue: 0,
            duration: 320,
            useNativeDriver: true,
          }).start();
        }, idleTimeoutMs);
      },
    });
  }, [
    draggableIndicator,
    shouldShow,
    horizontal,
    activeAnim,
    grabAnim,
    indicatorPos,
    idleTimeoutMs,
    enableGrabFeedback,
    onDragStart,
    onDragEnd,
  ]);

  // Color resolution
  const resolvedThumbColor = useMemo(() => {
    if (indicatorColor) return indicatorColor;
    if (isDark) {
      return isGlass ? 'rgba(255, 255, 255, 0.90)' : 'rgba(255, 255, 255, 0.85)';
    }
    return isGlass ? 'rgba(0, 122, 255, 0.85)' : 'rgba(15, 23, 42, 0.80)';
  }, [indicatorColor, isDark, isGlass]);

  const resolvedTrackColor = useMemo(() => {
    if (trackColor) return trackColor;
    return isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
  }, [trackColor, isDark]);

  // Position styles for track and thumb
  const trackStyle = useMemo(() => {
    if (horizontal) {
      return {
        left: insets.left,
        bottom: insets.bottom,
        width: trackLength,
        height: thickness,
        backgroundColor: resolvedTrackColor,
      };
    }
    return {
      top: insets.top,
      right: insets.right,
      height: trackLength,
      width: thickness,
      backgroundColor: resolvedTrackColor,
    };
  }, [horizontal, insets, trackLength, thickness, resolvedTrackColor]);

  // Specular hairline border for frosted glass effect
  const specularBorder = useMemo(() => ({
    borderWidth: 0.5,
    borderColor: isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(255, 255, 255, 0.60)',
  }), [isDark]);

  const thumbBaseStyle = useMemo(() => {
    if (horizontal) {
      return {
        left: insets.left,
        bottom: insets.bottom,
        width: thumbLength,
        height: thickness,
        backgroundColor: resolvedThumbColor,
        ...specularBorder,
      };
    }
    return {
      top: insets.top,
      right: insets.right,
      height: thumbLength,
      width: thickness,
      backgroundColor: resolvedThumbColor,
      ...specularBorder,
    };
  }, [horizontal, insets, thumbLength, thickness, resolvedThumbColor, specularBorder]);

  // Combined anim for active scroll (1) + grab feedback (2)
  const combinedAnim = useMemo(() => Animated.add(activeAnim, grabAnim), [activeAnim, grabAnim]);

  // Dynamic opacity: mờ khi nghỉ, sáng khi cuộn, 100% khi grab
  const dynamicOpacity = useMemo(() => {
    return combinedAnim.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [targetIdleOpacity, targetActiveOpacity, 1.0],
    });
  }, [combinedAnim, targetIdleOpacity, targetActiveOpacity]);

  // Dynamic scale (độ dày tăng khi cuộn/kéo) & edge shift (sát viền hơn khi cuộn/kéo)
  const dynamicTransform = useMemo(() => {
    if (horizontal) {
      const scaleY = combinedAnim.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [1, 1.28, enableGrabFeedback ? 1.70 : 1.28],
      });
      const shiftY = combinedAnim.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 0.8, enableGrabFeedback ? 1.0 : 0.8],
      });
      return [
        { translateX: indicatorPos },
        { translateY: shiftY },
        { scaleY },
      ];
    }
    const scaleX = combinedAnim.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, 1.33, enableGrabFeedback ? 1.78 : 1.33],
    });
    const shiftX = combinedAnim.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1.0, enableGrabFeedback ? 1.2 : 1.0],
    });
    return [
      { translateY: indicatorPos },
      { translateX: shiftX },
      { scaleX },
    ];
  }, [horizontal, combinedAnim, indicatorPos, enableGrabFeedback]);

  return (
    <View
      style={[
        horizontal ? styles.horizontalContainer : styles.verticalContainer,
        containerStyle,
        style,
      ]}
      onLayout={handleLayout}
    >
      <ScrollView
        ref={internalScrollRef}
        horizontal={horizontal}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        onContentSizeChange={handleContentSizeChange}
        style={horizontal ? styles.innerScrollViewHorizontal : styles.innerScrollView}
        {...restProps}
      >
        {children}
      </ScrollView>

      {/* Optional faint background track */}
      {shouldShow && showTrack && (
        <View
          pointerEvents="none"
          style={[styles.track, trackStyle]}
        />
      )}

      {/* Sleek, Slender Animated Thumb (Draggable Fast-Scroller) */}
      {shouldShow && (
        <Animated.View
          {...(draggableIndicator && panResponder ? panResponder.panHandlers : {})}
          pointerEvents={draggableIndicator ? 'box-only' : 'none'}
          hitSlop={draggableIndicator ? resolvedHitSlop : undefined}
          style={[
            styles.thumb,
            thumbBaseStyle,
            indicatorThumbStyle,
            {
              opacity: dynamicOpacity,
              transform: dynamicTransform,
            },
          ]}
        />
      )}
    </View>
  );
});

AppScrollView.displayName = 'AppScrollView';
