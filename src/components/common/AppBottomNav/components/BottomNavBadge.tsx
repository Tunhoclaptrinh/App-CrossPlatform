import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

export interface BottomNavBadgeProps {
  badge?: number | string;
  badgeDot?: boolean;
  isDark?: boolean;
}

export const BottomNavBadge: React.FC<BottomNavBadgeProps> = React.memo(({
  badge,
  badgeDot,
  isDark = false,
}) => {
  if (badgeDot) {
    return <View style={[styles.badgeDot, isDark && styles.badgeDotDark]} />;
  }

  if (badge !== undefined && badge !== null && badge !== '') {
    const displayBadge = typeof badge === 'number' && badge > 99 ? '99+' : String(badge);
    return (
      <View style={[styles.badge, isDark && styles.badgeDark]}>
        <Text style={styles.badgeText} numberOfLines={1}>
          {displayBadge}
        </Text>
      </View>
    );
  }

  return null;
});

BottomNavBadge.displayName = 'BottomNavBadge';
