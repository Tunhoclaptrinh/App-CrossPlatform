import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius, RadiusPresetConfig } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';
import type { ControlContrast } from '../surfaceUtils';

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  backdropLight: {
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
  },
  backdropDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  dialogContainer: {
    width: '100%',
    maxWidth: 340,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.30,
    shadowRadius: 24,
    elevation: 10,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.xs,
    fontSize: 18,
    fontWeight: '700',
  },
  message: {
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: Spacing.xl,
    fontSize: 13.5,
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

export const getDialogContainerThemedStyle = (
  isDark: boolean,
  radius?: RadiusPresetConfig,
  _isGlass?: boolean,
  contrast: ControlContrast = 'normal'
) => {
  const borderWidth = contrast === 'high' ? 1.5 : contrast === 'subtle' ? 0.8 : 1;
  const borderColor =
    contrast === 'high'
      ? isDark ? '#64748B' : '#94A3B8'
      : contrast === 'subtle'
      ? isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'
      : isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';

  const backgroundColor = isDark ? '#1E2433' : '#FFFFFF';

  return {
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius: radius ? radius.card : 16,
    position: 'relative' as const,
    overflow: 'hidden' as const,
  };
};


export const getDialogIconThemedStyle = (colors: ThemeColors, destructive: boolean) => ({
  backgroundColor: destructive ? colors.errorLight : colors.primaryLight,
});

