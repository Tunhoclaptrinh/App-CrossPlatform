import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius, Typography } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.md,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    ...Typography.body,
    paddingVertical: 0,
  },
  iconButton: {
    padding: Spacing.xxs,
    marginLeft: Spacing.xs,
  },
  filterButton: {
    paddingLeft: Spacing.sm,
    borderLeftWidth: 1,
    marginLeft: Spacing.sm,
  },
});

export const getSearchBarThemedContainer = (colors: ThemeColors) => ({
  backgroundColor: colors.card,
  borderColor: colors.border,
});

export const getFilterButtonThemedStyle = (colors: ThemeColors) => ({
  borderLeftColor: colors.border,
});
