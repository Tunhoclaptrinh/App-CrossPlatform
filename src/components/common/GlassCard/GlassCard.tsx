import React from 'react';
import { View, useColorScheme, TouchableOpacity } from 'react-native';
import { haptics } from '@/utils/haptics';
import type { GlassCardProps } from './types';
import { createGlassCardStyles } from './styles';

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  accentColor,
  onPress,
  glowEffect = true,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createGlassCardStyles(isDarkMode, accentColor);

  const handlePress = () => {
    if (onPress) {
      haptics.light();
      onPress();
    }
  };

  const CardContent = (
    <View style={[styles.container, style]}>
      {glowEffect && <View style={styles.accentGlow} />}
      <View style={styles.content}>{children}</View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.85} onPress={handlePress}>
        {CardContent}
      </TouchableOpacity>
    );
  }

  return CardContent;
};
