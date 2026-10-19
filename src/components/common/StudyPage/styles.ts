import { StyleSheet } from 'react-native';
import { Spacing } from '@/constants';
import type { ThemeState } from '@/hooks/useThemeMode';
export const createStyles = (
  appearance: ThemeState,
  bottomInset: number,
) =>
  StyleSheet.create({
    body: { flex: 1 },
    contentInsets: {
      paddingTop: Spacing.base,
      paddingBottom: bottomInset + Spacing.xxl,
    },
    content: {
      paddingHorizontal: Spacing.base,
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
