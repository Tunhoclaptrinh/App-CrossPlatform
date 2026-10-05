import { StyleSheet } from 'react-native';
import { Spacing, Typography, RadiusPresetConfig, ControlSize } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.md,
  },
  label: {
    marginBottom: Spacing.xs,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    paddingHorizontal: Spacing.md,
    height: ControlSize.md.height,
  },
  input: {
    flex: 1,
    ...Typography.body,
    paddingVertical: 0,
  },
  leftIconContainer: {
    marginRight: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIconContainer: {
    marginLeft: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    marginTop: 4,
    fontSize: 11,
  },
});

export const getInputStateStyle = (
  colors: ThemeColors,
  isFocused: boolean,
  hasError: boolean,
  radius?: RadiusPresetConfig
) => ({
  backgroundColor: colors.card,
  borderRadius: radius ? radius.control : 12,
  borderColor: hasError
    ? colors.error
    : isFocused
    ? colors.primary
    : colors.border,
});
