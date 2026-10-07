import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import { AppText } from '../AppText';
import type { GlassTileProps } from './types';
import { createGlassTileStyles } from './styles';

export const GlassTile: React.FC<GlassTileProps> = ({
  icon: IconComponent,
  iconColor,
  badgeBgColor,
  value,
  label,
  style,
  onPress,
}) => {
  const { isDark, radiusTokens } = useThemeMode();
  const styles = createGlassTileStyles(isDark, radiusTokens.card);
  const badgeColor = badgeBgColor || `${iconColor}18`;

  const handlePress = () => {
    if (onPress) {
      haptics.light();
      onPress();
    }
  };

  const TileContent = (
    <View style={[styles.tile, style]}>
      {Platform.OS === 'ios' ? (
        <BlurView
          style={styles.blurBackdrop}
          blurType={isDark ? 'dark' : 'light'}
          blurAmount={30}
          reducedTransparencyFallbackColor={isDark ? 'rgba(30, 41, 59, 0.55)' : 'rgba(255, 255, 255, 0.65)'}
        />
      ) : (
        <View
          style={isDark ? styles.androidBackdropDark : styles.androidBackdropLight}
        />
      )}
      <View style={styles.specularHairline} />
      <View style={[styles.iconBadge, { backgroundColor: badgeColor }]}>
        <IconComponent size={18} color={iconColor} strokeWidth={2.2} />
      </View>
      <AppText style={styles.valueText}>{value}</AppText>
      <AppText style={styles.labelText}>{label}</AppText>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.75} onPress={handlePress} style={style}>
        {TileContent}
      </TouchableOpacity>
    );
  }

  return TileContent;
};
