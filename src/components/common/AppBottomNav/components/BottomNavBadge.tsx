import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from '../styles';

export interface BottomNavBadgeProps {
  badge?: number | string;
  badgeDot?: boolean;
  isDark?: boolean;
  isCompact?: boolean;
}

const badgeStyles = StyleSheet.create({
  badgeDotCompact: {
    top: -2,
    right: -4,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeCompact: {
    top: -3,
    right: -6,
    minWidth: 14,
    height: 14,
    paddingHorizontal: 2.5,
  },
  badgeTextCompact: {
    fontSize: 8.5,
    lineHeight: 10,
  },
});

export const BottomNavBadge: React.FC<BottomNavBadgeProps> = React.memo(({
  badge,
  badgeDot,
  isDark = false,
  isCompact = false,
}) => {
  if (badgeDot) {
    return (
      <View
        style={[
          styles.badgeDot,
          isCompact && badgeStyles.badgeDotCompact,
          isDark && styles.badgeDotDark,
        ]}
      />
    );
  }

  if (badge !== undefined && badge !== null && badge !== '') {
    const displayBadge = typeof badge === 'number' && badge > 99 ? '99+' : String(badge);
    return (
      <View
        style={[
          styles.badge,
          isCompact && badgeStyles.badgeCompact,
          isDark && styles.badgeDark,
        ]}
      >
        <Text
          style={[styles.badgeText, isCompact && badgeStyles.badgeTextCompact]}
          numberOfLines={1}
        >
          {displayBadge}
        </Text>
      </View>
    );
  }

  return null;
});

BottomNavBadge.displayName = 'BottomNavBadge';
