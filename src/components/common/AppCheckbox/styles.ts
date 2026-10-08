import { StyleSheet } from 'react-native';
import { Spacing } from '@/constants/theme';
import type { AppCheckboxSize } from './types';

export const CHECKBOX_SIZES: Record<
  AppCheckboxSize,
  { box: number; icon: number; radius: number; fontSize: number }
> = {
  sm: { box: 18, icon: 12, radius: 4, fontSize: 13.5 },
  md: { box: 22, icon: 14, radius: 6, fontSize: 14.5 },
  lg: { box: 26, icon: 17, radius: 8, fontSize: 16 },
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    flexShrink: 1,
  },
});
