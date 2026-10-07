import { StyleSheet } from 'react-native';
import { Spacing, RadiusPresetConfig, ControlSize } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';
import type { AppInputSize } from './types';

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
    borderWidth: 1,
    overflow: 'hidden',
  },
  sizeSm: {
    height: ControlSize.sm.height,
    minHeight: ControlSize.sm.height,
    paddingHorizontal: ControlSize.sm.paddingHorizontal,
  },
  sizeMd: {
    height: ControlSize.md.height,
    minHeight: ControlSize.md.height,
    paddingHorizontal: ControlSize.md.paddingHorizontal,
  },
  sizeLg: {
    height: ControlSize.lg.height,
    minHeight: ControlSize.lg.height,
    paddingHorizontal: ControlSize.lg.paddingHorizontal,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
  inputSm: {
    fontSize: ControlSize.sm.fontSize,
    lineHeight: ControlSize.sm.lineHeight,
  },
  inputMd: {
    fontSize: ControlSize.md.fontSize,
    lineHeight: ControlSize.md.lineHeight,
  },
  inputLg: {
    fontSize: ControlSize.lg.fontSize,
    lineHeight: ControlSize.lg.lineHeight,
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
  disabled: {
    opacity: 0.5,
  },
  errorText: {
    marginTop: 4,
    fontSize: 11,
  },
});

export const getInputSizeStyle = (size: AppInputSize = 'md') => {
  switch (size) {
    case 'sm':
      return styles.sizeSm;
    case 'lg':
      return styles.sizeLg;
    case 'md':
    default:
      return styles.sizeMd;
  }
};

export const getInputTextSizeStyle = (size: AppInputSize = 'md') => {
  switch (size) {
    case 'sm':
      return styles.inputSm;
    case 'lg':
      return styles.inputLg;
    case 'md':
    default:
      return styles.inputMd;
  }
};

export const getInputStateStyle = (
  colors: ThemeColors,
  isFocused: boolean,
  hasError: boolean,
  radius?: RadiusPresetConfig
) => {
  const bg = colors.surface;

  const borderColor = hasError
    ? colors.error
    : isFocused
    ? colors.primary
    : colors.border;

  return {
    backgroundColor: bg,
    borderRadius: radius ? radius.control : 12,
    borderColor,
  };
};


