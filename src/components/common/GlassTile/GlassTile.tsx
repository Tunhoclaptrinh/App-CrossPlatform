import React from 'react';
import { View, TouchableOpacity } from 'react-native';
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
