import { StyleSheet } from 'react-native';
import { Spacing } from '@/constants';
import type { ThemeState } from '@/hooks/useThemeMode';
export const createStyles = (
  appearance: ThemeState,
  headerHeight: number,
  bottomInset: number,
) =>
  StyleSheet.create({
    body: { flex: 1 },
    headerOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
    contentInsets: {
      paddingTop: headerHeight + Spacing.base,
      paddingBottom: bottomInset + Spacing.xxl,
    },
    content: {
      paddingHorizontal: Spacing.xl,
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
