import { StyleSheet } from 'react-native';
import { Spacing } from '@/constants';
import type { ThemeState } from '@/hooks/useThemeMode';
export const createStyles = (appearance: ThemeState) =>
  StyleSheet.create({
    body: { flex: 1 },
    content: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.base,
      paddingBottom: Spacing.xxl,
      gap: Spacing.base,
    },
    headerTitle: {
      color:
        appearance.headerTitleColor === 'ACCENT'
          ? appearance.theme.primary
          : appearance.headerTitleColor ?? appearance.theme.text,
    },
    headerSubtitle: {
      color:
        appearance.headerSubtitleColor === 'ACCENT'
          ? appearance.theme.primary
          : appearance.headerSubtitleColor ?? appearance.theme.textSecondary,
    },
  });
