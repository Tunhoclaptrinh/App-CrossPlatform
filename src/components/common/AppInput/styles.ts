import { StyleSheet, ViewStyle } from 'react-native';
import { Spacing, RadiusPresetConfig, ControlSize } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';
import { getControlSurfaceStyle, type GetControlSurfaceOptions } from '../surfaceUtils';
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
  },
  multilineContainer: {
    height: undefined,
    minHeight: ControlSize.lg.height * 2,
    alignItems: 'flex-start',
    paddingVertical: Spacing.md,
  },
  multilineInput: {
    minHeight: ControlSize.lg.height * 2 - Spacing.xl,
    textAlignVertical: 'top',
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

export function getInputStateStyle(
  colorsOrOptions: ThemeColors | GetControlSurfaceOptions,
  isFocused?: boolean,
  hasError?: boolean,
  radius?: RadiusPresetConfig
): ViewStyle {
  if (typeof colorsOrOptions === 'object' && 'colors' in colorsOrOptions) {
    return getControlSurfaceStyle(colorsOrOptions as GetControlSurfaceOptions);
  }
  return getControlSurfaceStyle({
    colors: colorsOrOptions as ThemeColors,
    isFocused: !!isFocused,
    hasError: !!hasError,
    radiusTokens: radius,
  });
}
