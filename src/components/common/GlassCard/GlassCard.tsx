import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import type { GlassCardProps } from './types';
import { createGlassCardStyles } from './styles';

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  accentColor,
  onPress,
}) => {
  const { isDark, radiusTokens } = useThemeMode();
  const cardRadius = Math.min(radiusTokens.card, 16);
  const styles = createGlassCardStyles(isDark, accentColor, cardRadius);

  const handlePress = () => {
    if (onPress) {
      haptics.light();
      onPress();
    }
  };

  const rawId = React.useId();
  const uniqueId = rawId.replace(/[^a-zA-Z0-9]/g, '_');
  const glassGradId = `glassSurfaceGrad_${uniqueId}`;

  const CardContent = (
    <View style={[styles.container, style]}>
      {/* 0. Hardware-Accelerated Blur Backdrop on iOS / Translucent Surface on Android */}
      {Platform.OS === 'ios' ? (
        <BlurView
          style={styles.blurBackdrop}
          blurType={isDark ? 'dark' : 'light'}
          blurAmount={25}
          reducedTransparencyFallbackColor={isDark ? '#151722' : '#F8FAFC'}
        />
      ) : (
        <View
          style={isDark ? styles.androidBackdropDark : styles.androidBackdropLight}
        />
      )}

      {/* 1. Seamless Vertical Translucent Glass Gradient */}
      <Svg
        width="100%"
        height="100%"
        style={styles.gradientSurface}
        preserveAspectRatio="none"
      >
        <Defs>
          <LinearGradient id={glassGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop
              offset="0%"
              stopColor={isDark ? '#282C3C' : '#FFFFFF'}
              stopOpacity={isDark ? 0.65 : 0.60}
            />
            <Stop
              offset="100%"
              stopColor={isDark ? '#151722' : '#F8FAFC'}
              stopOpacity={isDark ? 0.48 : 0.42}
            />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" rx={cardRadius} ry={cardRadius} fill={`url(#${glassGradId})`} />
      </Svg>

      {/* 2. Card Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.82} onPress={handlePress}>
        {CardContent}
      </TouchableOpacity>
    );
  }

  return CardContent;
};
