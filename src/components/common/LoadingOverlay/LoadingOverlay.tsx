import React, { useEffect, useRef, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { BlurView } from '@react-native-community/blur';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useAppStore } from '@/hooks/useAppStore';
import type { LoadingOverlayProps } from './types';
import { styles, getVariantContainerStyle } from './styles';

export const LoadingOverlay: React.FC<LoadingOverlayProps> = React.memo(({
  visible = true,
  message = 'Đang tải dữ liệu...',
  subMessage,
  fullscreen = false,
  position = 'center',
  variant = 'card',
  animationType = 'spinner',
  progress,
  indicatorColor,
  indicatorSize = 'large',
  borderRadius,
  contrast = 'normal',
  transparentBackdrop = false,
  style,
  onDismiss,
}) => {
  const { theme: themeColors, radiusTokens, isDark, reduceMotion } = useThemeMode();
  const { themeStyle } = useAppStore();
  const isGlassTheme = themeStyle === 'apple-glass';

  // Modal Entry / Exit spring animation
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Apple Spinner continuous 360° rotation (100% GPU Native Driver)
  const spinValue = useRef(new Animated.Value(0)).current;

  // Pulse animation values
  const pulseScale = useRef(new Animated.Value(1)).current;
  const pulseOpacity = useRef(new Animated.Value(0.7)).current;

  // Dots animation values (staggered 3 dots)
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  // Entry animation
  useEffect(() => {
    if (visible) {
      if (reduceMotion) {
        scaleAnim.setValue(1);
        opacityAnim.setValue(1);
      } else {
        scaleAnim.setValue(0.92);
        opacityAnim.setValue(0);
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            damping: 24,
            stiffness: 280,
            mass: 0.65,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 180,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }
  }, [visible, reduceMotion, scaleAnim, opacityAnim]);

  // Spinner rotation loop
  useEffect(() => {
    if (!visible || animationType !== 'spinner' || reduceMotion) return;

    spinValue.setValue(0);
    const spinLoop = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 920,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    spinLoop.start();
    return () => spinLoop.stop();
  }, [visible, animationType, reduceMotion, spinValue]);

  // Pulse animation loop
  useEffect(() => {
    if (!visible || animationType !== 'pulse' || reduceMotion) return;

    const pulseAnim = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseScale, {
            toValue: 1.75,
            duration: 1100,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseScale, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(pulseOpacity, {
            toValue: 0,
            duration: 1100,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseOpacity, {
            toValue: 0.7,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    pulseAnim.start();
    return () => pulseAnim.stop();
  }, [visible, animationType, reduceMotion, pulseScale, pulseOpacity]);

  // Dots wave animation loop
  useEffect(() => {
    if (!visible || animationType !== 'dots' || reduceMotion) return;

    const createDotAnim = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: -8,
            duration: 260,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 260,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.delay(300),
        ])
      );

    const anim1 = createDotAnim(dot1, 0);
    const anim2 = createDotAnim(dot2, 130);
    const anim3 = createDotAnim(dot3, 260);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, [visible, animationType, reduceMotion, dot1, dot2, dot3]);

  const activeColor = indicatorColor || themeColors.primary;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const isPill = variant === 'pill';
  const isEffectiveGlass = variant === 'glass' || (isGlassTheme && variant === 'card');
  const hasBackdrop = fullscreen || position === 'fullscreen';

  // Concentric radii calculation: Inner elements match the outer card radius rhythm
  const resolvedCardRadius = borderRadius !== undefined ? borderRadius : radiusTokens.card;
  const badgeRadius = radiusTokens.badge || 8;
  const trackRadius = Math.min(resolvedCardRadius / 2, 999);

  // Memoized variant container styles
  const variantContainerStyle = useMemo(
    () =>
      getVariantContainerStyle(
        variant,
        themeColors,
        radiusTokens,
        isDark,
        isGlassTheme,
        borderRadius,
        contrast
      ),
    [variant, themeColors, radiusTokens, isDark, isGlassTheme, borderRadius, contrast]
  );

  const positionStyle = useMemo(() => {
    switch (position) {
      case 'top':
        return styles.posTop;
      case 'bottom':
        return styles.posBottom;
      case 'center':
      case 'fullscreen':
      default:
        return styles.posCenter;
    }
  }, [position]);

  const boxVariantStyle = useMemo(() => {
    switch (variant) {
      case 'glass':
        return styles.boxGlass;
      case 'pill':
        return styles.boxPill;
      case 'minimal':
        return styles.boxMinimal;
      case 'card':
      default:
        return isEffectiveGlass ? styles.boxGlass : styles.boxCard;
    }
  }, [variant, isEffectiveGlass]);

  if (!visible) return null;

  // Render indicator graphic with seamless housing directly on the card surface
  const renderIndicator = () => {
    if (animationType === 'pulse') {
      return (
        <View style={isPill ? styles.indicatorHousingPill : styles.indicatorHousing}>
          <View style={styles.pulseContainer}>
            <Animated.View
              style={[
                styles.pulseRing,
                {
                  borderColor: activeColor,
                  transform: [{ scale: pulseScale }],
                  opacity: pulseOpacity,
                },
              ]}
            />
            <View style={[styles.pulseCore, { backgroundColor: activeColor }]} />
          </View>
        </View>
      );
    }

    if (animationType === 'dots') {
      return (
        <View style={isPill ? styles.indicatorHousingPill : styles.indicatorHousing}>
          <View style={styles.dotsRow}>
            <Animated.View
              style={[styles.dot, { backgroundColor: activeColor, transform: [{ translateY: dot1 }] }]}
            />
            <Animated.View
              style={[styles.dot, { backgroundColor: activeColor, transform: [{ translateY: dot2 }] }]}
            />
            <Animated.View
              style={[styles.dot, { backgroundColor: activeColor, transform: [{ translateY: dot3 }] }]}
            />
          </View>
        </View>
      );
    }

    // Default 'spinner': Apple Fluid Orbit SVG Spinner
    if (isPill || indicatorSize === 'small') {
      return (
        <View style={styles.indicatorHousingPill}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <Svg width={20} height={20} viewBox="0 0 20 20">
              <Defs>
                <LinearGradient id="appleSpinGradMini" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor={activeColor} stopOpacity="1" />
                  <Stop offset="70%" stopColor={activeColor} stopOpacity="0.3" />
                  <Stop offset="100%" stopColor={activeColor} stopOpacity="0.05" />
                </LinearGradient>
              </Defs>
              <Circle
                cx="10"
                cy="10"
                r="7.5"
                stroke={activeColor}
                strokeOpacity={0.14}
                strokeWidth="2.2"
                fill="none"
              />
              <Circle
                cx="10"
                cy="10"
                r="7.5"
                stroke="url(#appleSpinGradMini)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeDasharray="26 22"
                fill="none"
              />
            </Svg>
          </Animated.View>
        </View>
      );
    }

    return (
      <View style={styles.indicatorHousing}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Svg width={36} height={36} viewBox="0 0 36 36">
            <Defs>
              <LinearGradient id="appleSpinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor={activeColor} stopOpacity="1" />
                <Stop offset="65%" stopColor={activeColor} stopOpacity="0.4" />
                <Stop offset="100%" stopColor={activeColor} stopOpacity="0.05" />
              </LinearGradient>
            </Defs>
            <Circle
              cx="18"
              cy="18"
              r="14"
              stroke={activeColor}
              strokeOpacity={0.12}
              strokeWidth="3.2"
              fill="none"
            />
            <Circle
              cx="18"
              cy="18"
              r="14"
              stroke="url(#appleSpinGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeDasharray="50 40"
              fill="none"
            />
          </Svg>
        </Animated.View>
        <View style={[styles.spinnerCenterDot, { backgroundColor: activeColor }]} />
      </View>
    );
  };

  const clampedProgress = progress !== undefined ? Math.min(100, Math.max(0, Math.round(progress))) : undefined;

  const contentNode = (
    <Animated.View
      style={[
        styles.boxBase,
        boxVariantStyle,
        variantContainerStyle,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
        style,
      ]}
    >
      {/* Indicator Graphic */}
      {renderIndicator()}

      {/* Message & Sub-message */}
      {isPill ? (
        <View style={styles.messageRow}>
          {message ? (
            <AppText style={[styles.messageText, { color: themeColors.text }]} numberOfLines={1}>
              {message}
            </AppText>
          ) : null}
          {clampedProgress !== undefined && (
            <View
              style={[
                styles.pillProgressBadge,
                { backgroundColor: `${activeColor}16`, borderRadius: badgeRadius },
              ]}
            >
              <AppText style={[styles.progressBadgeText, { color: activeColor }]}>
                {clampedProgress}%
              </AppText>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.messageCol}>
          {message ? (
            <AppText style={[styles.messageText, { color: themeColors.text }]} numberOfLines={2}>
              {message}
            </AppText>
          ) : null}

          {subMessage ? (
            <AppText style={[styles.subMessageText, { color: themeColors.textSecondary }]} numberOfLines={2}>
              {subMessage}
            </AppText>
          ) : null}

          {clampedProgress !== undefined && (
            <View style={styles.progressSection}>
              <View style={styles.progressHeaderRow}>
                <AppText style={[styles.progressStatusLabel, { color: themeColors.textSecondary }]}>
                  Tiến độ hoàn thành
                </AppText>
                <View
                  style={[
                    styles.progressBadge,
                    { backgroundColor: `${activeColor}16`, borderRadius: badgeRadius },
                  ]}
                >
                  <AppText style={[styles.progressBadgeText, { color: activeColor }]}>
                    {clampedProgress}%
                  </AppText>
                </View>
              </View>
              <View
                style={[
                  styles.progressBarTrack,
                  isDark ? styles.progressBarTrackDark : styles.progressBarTrackLight,
                  { borderRadius: trackRadius },
                ]}
              >
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${clampedProgress}%`,
                      backgroundColor: activeColor,
                      borderRadius: trackRadius,
                    },
                  ]}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </Animated.View>
  );

  if (hasBackdrop) {
    const backdropColor = transparentBackdrop
      ? 'transparent'
      : isDark
      ? 'rgba(0, 0, 0, 0.55)'
      : 'rgba(0, 0, 0, 0.28)';

    return (
      <View style={styles.fullscreenRoot} pointerEvents="auto">
        <TouchableWithoutFeedback onPress={onDismiss}>
          <View style={[styles.backdrop, { backgroundColor: backdropColor }]}>
            {Platform.OS === 'ios' && !transparentBackdrop && (
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType={isDark ? 'dark' : 'light'}
                blurAmount={14}
                reducedTransparencyFallbackColor={backdropColor}
              />
            )}
          </View>
        </TouchableWithoutFeedback>

        <View style={[styles.contentWrapper, positionStyle]} pointerEvents="box-none">
          {contentNode}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.inlineRoot, positionStyle]} pointerEvents="box-none">
      {contentNode}
    </View>
  );
});
