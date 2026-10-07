import { StyleSheet } from 'react-native';
import { Spacing } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  containerLight: {
    backgroundColor: '#F1F5F9',
  },
  containerDark: {
    backgroundColor: '#0B0F19',
  },
  card: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconWrapperLight: {
    backgroundColor: 'rgba(239, 68, 68, 0.10)',
    borderColor: 'rgba(239, 68, 68, 0.22)',
  },
  iconWrapperDark: {
    backgroundColor: 'rgba(239, 68, 68, 0.16)',
    borderColor: 'rgba(239, 68, 68, 0.35)',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginBottom: 22,
    paddingHorizontal: 8,
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
