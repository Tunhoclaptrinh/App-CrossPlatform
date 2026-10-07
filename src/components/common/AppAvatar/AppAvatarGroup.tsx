import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '../AppText';
import { AppAvatar } from './AppAvatar';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import type { AppAvatarGroupProps } from './types';
import { getAvatarPixelSize, createAvatarStyles } from './styles';

export const AppAvatarGroup: React.FC<AppAvatarGroupProps> = ({
  items,
  max = 4,
  size = 'md',
  spacing = -10,
  contrast,
  style,
  onMorePress,
}) => {
  const { theme, isDark, globalContrast } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const pixelSize = getAvatarPixelSize(size);
  const styles = createAvatarStyles(theme, isDark, pixelSize, resolvedContrast);

  const visibleItems = items.slice(0, max);
  const remainingCount = Math.max(0, items.length - max);

  const handleMorePress = () => {
    if (onMorePress) {
      haptics.light();
      onMorePress();
    }
  };

  const getItemLayerStyle = (index: number) => ({
    marginLeft: index === 0 ? 0 : spacing,
    zIndex: visibleItems.length - index,
  });

  const overflowStyle = { marginLeft: spacing };

  return (
    <View style={[groupStyles.row, style]}>
      {visibleItems.map((item, index) => {
        return (
          <View
            key={item.id ?? index}
            style={getItemLayerStyle(index)}
          >
            <AppAvatar
              source={item.source}
              name={item.name}
              size={size}
              contrast={resolvedContrast}
            />
          </View>
        );
      })}

      {remainingCount > 0 && (
        <TouchableOpacity
          activeOpacity={onMorePress ? 0.75 : 1}
          onPress={handleMorePress}
          disabled={!onMorePress}
          style={[styles.overflowChip, overflowStyle]}
        >
          <AppText style={styles.overflowText}>+{remainingCount}</AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const groupStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
