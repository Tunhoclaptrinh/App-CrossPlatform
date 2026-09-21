import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius, Shadows } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  card: {
    width: '100%',
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    ...Shadows.md,
  },
  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.base,
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  message: {
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.xl,
  },
  resetButton: {
    minWidth: 160,
  },
});

export const getErrorBoundaryThemedStyles = (colors: ThemeColors) => ({
  container: {
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
  },
  iconWrapper: {
    backgroundColor: colors.errorLight,
  },
});
