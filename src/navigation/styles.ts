import { StyleSheet } from 'react-native';
import { Spacing } from '@/constants';
import { getNavHeight } from '@/components/common/AppBottomNav/styles';
import type { BottomNavSize } from '@/components/common/AppBottomNav/types';
export const navigationStyles = StyleSheet.create({
  frame: { flex: 1 },
  scene: { backgroundColor: 'transparent' },
});
export const getStudyTabBarHeight = (
  size: BottomNavSize,
  floating: boolean,
  bottom: number,
) =>
  getNavHeight(size, floating) +
  (floating ? Math.max(bottom, Spacing.md) : bottom);

export const createTabBarStyles = (
  size: BottomNavSize,
  floating: boolean,
  bottom: number,
) =>
  StyleSheet.create({
    overlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
      height: getStudyTabBarHeight(size, floating, bottom),
      backgroundColor: 'transparent',
    },
  });
