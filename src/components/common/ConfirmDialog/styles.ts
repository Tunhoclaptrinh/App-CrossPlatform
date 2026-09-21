import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius, Shadows } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  dialogContainer: {
    width: '100%',
    maxWidth: 340,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.xl,
    alignItems: 'center',
    ...Shadows.lg,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
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
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    width: '100%',
  },
  buttonFlex: {
    flex: 1,
  },
});

export const getDialogContainerThemedStyle = (colors: ThemeColors) => ({
  backgroundColor: colors.card,
  borderColor: colors.border,
});

export const getDialogIconThemedStyle = (colors: ThemeColors, destructive: boolean) => ({
  backgroundColor: destructive ? colors.errorLight : colors.primaryLight,
});
