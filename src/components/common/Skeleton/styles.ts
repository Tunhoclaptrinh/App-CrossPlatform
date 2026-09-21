import { StyleSheet } from 'react-native';
import { BorderRadius, Spacing } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';
import type { SkeletonVariant } from './types';

export const getSkeletonRadius = (variant: SkeletonVariant = 'rectangular', customRadius?: number) => {
  if (customRadius !== undefined) return customRadius;
  if (variant === 'circular') return BorderRadius.full;
  if (variant === 'text') return BorderRadius.sm;
  return BorderRadius.md;
};

export const styles = StyleSheet.create({
  cardContainer: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm + 4,
  },
  cardHeaderTexts: {
    marginLeft: Spacing.sm + 4,
    flex: 1,
  },
  mbSm: {
    marginBottom: Spacing.sm,
  },
});

export const getSkeletonCardThemedStyle = (colors: ThemeColors) => ({
  backgroundColor: colors.card,
  borderColor: colors.border,
});
