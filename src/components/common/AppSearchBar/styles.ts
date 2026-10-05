import { StyleSheet } from 'react-native';
import { Spacing, Typography, RadiusPresetConfig, ControlSize } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    height: ControlSize.md.height,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
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

export const getSearchBarThemedContainer = (
  colors: ThemeColors,
  radius?: RadiusPresetConfig
) => ({
  backgroundColor: colors.card,
  borderColor: colors.border,
  borderRadius: radius ? radius.control : 12,
});

export const getFilterButtonThemedStyle = (colors: ThemeColors) => ({
  borderLeftColor: colors.border,
});
