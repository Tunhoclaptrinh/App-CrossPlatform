import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { BorderRadius, Spacing, Typography } from '@/constants';
import type { RadiusPresetConfig } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';
import { useThemeMode } from '@/hooks/useThemeMode';

export const createStudyStyles = (
  theme: ThemeColors,
  radius: RadiusPresetConfig,
) =>
  StyleSheet.create({
    list: { paddingHorizontal: Spacing.xl },
    filters: {
      paddingBottom: Spacing.base,
      gap: Spacing.md,
    },
    chips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.sm,
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: Spacing.md,
    },
    sectionHeader: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: Spacing.sm,
    },
    wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
    flex: { flex: 1 },
    stack: { gap: Spacing.md },
    section: { gap: Spacing.md, marginTop: Spacing.sm },
    sectionHeading: { ...Typography.h4 },
    hero: { gap: Spacing.base },
    heroText: { color: theme.text },
    heroName: { ...Typography.h2, color: theme.text },
    heroCaption: { ...Typography.caption, color: theme.textSecondary },
    stats: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
    stat: {
      flex: 1,
      minWidth: 100,
      backgroundColor: theme.surface,
      padding: Spacing.base,
      borderRadius: radius.card,
      gap: Spacing.xs,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.borderStrong,
    },
    statValue: { ...Typography.h2, color: theme.primary },
    note: { ...Typography.caption, color: theme.textSecondary },
    dateRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: Spacing.sm,
      paddingVertical: Spacing.sm,
    },
    dayGrid: { flexDirection: 'row', gap: Spacing.xs },
    day: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: Spacing.md,
      gap: Spacing.sm,
      borderRadius: radius.control,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.borderStrong,
      backgroundColor: theme.surface,
    },
    daySelected: { backgroundColor: theme.primary, borderColor: theme.primary },
    dayTextSelected: { color: theme.textInverse },
    dot: {
      width: Spacing.xs,
      height: Spacing.xs,
      borderRadius: BorderRadius.full,
      backgroundColor: theme.primary,
    },
    dotSelected: { backgroundColor: theme.textInverse },
    dotEmpty: { backgroundColor: 'transparent' },
    metaRow: {
      paddingVertical: Spacing.md,
      gap: Spacing.xs,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: theme.borderStrong,
    },
    metaValue: { ...Typography.subtitle },
    score: { ...Typography.h1, color: theme.primary },
    gradeRow: { marginBottom: Spacing.md },
    separator: { height: Spacing.base },
    themeRow: { gap: Spacing.md },
    editActions: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  });

export function useStudyStyles() {
  const { theme, isDark, radiusTokens } = useThemeMode();
  const styles = useMemo(
    () => createStudyStyles(theme, radiusTokens),
    [theme, radiusTokens],
  );
  return { styles, theme, isDark };
}
