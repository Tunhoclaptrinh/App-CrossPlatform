import { StyleSheet } from 'react-native';
import { Spacing } from '@/constants';
import { getNavHeight } from '@/components/common/AppBottomNav/styles';
import type { BottomNavSize } from '@/components/common/AppBottomNav/types';
export const navigationStyles = StyleSheet.create({
  frame: { flex: 1 },
  scene: { backgroundColor: 'transparent' },
});
export const createTabBarStyles = (
  size: BottomNavSize,
  floating: boolean,
  bottom: number,
) =>
  StyleSheet.create({
    space: {
      height:
        getNavHeight(size, floating) +
        (floating ? Math.max(bottom, Spacing.md) : bottom),
      backgroundColor: 'transparent',
    },
  });
