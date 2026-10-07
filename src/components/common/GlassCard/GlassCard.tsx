import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import type { GlassCardProps } from './types';
import { createGlassCardStyles } from './styles';

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  accentColor,
  contrast,
  onPress,
}) => {
  const { isDark, radiusTokens, globalContrast } = useThemeMode();
  const cardRadius = Math.min(radiusTokens.card, 16);
  const effectiveContrast = contrast ?? globalContrast ?? 'normal';
  const styles = createGlassCardStyles(isDark, accentColor, cardRadius, effectiveContrast);

  const handlePress = () => {
    if (onPress) {
      haptics.light();
      onPress();
    }
  };

  const CardContent = (
    <View style={[styles.container, style]}>
      {/* Card Content */}
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
