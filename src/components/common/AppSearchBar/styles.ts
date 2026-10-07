import { StyleSheet, ViewStyle } from 'react-native';
import { Spacing, RadiusPresetConfig, ControlSize, ControlSizeKey } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';
import { getControlSurfaceStyle, type GetControlSurfaceOptions } from '../surfaceUtils';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sizeSm: {
    height: ControlSize.sm.height,
    paddingHorizontal: ControlSize.sm.paddingHorizontal,
  },
  sizeMd: {
    height: ControlSize.md.height,
    paddingHorizontal: ControlSize.md.paddingHorizontal,
  },
  sizeLg: {
    height: ControlSize.lg.height,
    paddingHorizontal: ControlSize.lg.paddingHorizontal,
  },
  searchIcon: {
    marginRight: Spacing.sm,
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
  iconButton: {
    padding: Spacing.xxs,
    marginLeft: Spacing.xs,
  },
  filterButton: {
    paddingLeft: Spacing.sm,
    borderLeftWidth: 1,
    marginLeft: Spacing.sm,
  },
});

export const getSearchBarSizeStyle = (size: ControlSizeKey = 'md') => {
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

export const getSearchBarInputSizeStyle = (size: ControlSizeKey = 'md') => {
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

export function getSearchBarThemedContainer(
  colorsOrOptions: ThemeColors | GetControlSurfaceOptions,
  radius?: RadiusPresetConfig,
  isGlass: boolean = false,
  isDark: boolean = false
): ViewStyle {
  if (typeof colorsOrOptions === 'object' && 'colors' in colorsOrOptions) {
    return getControlSurfaceStyle(colorsOrOptions as GetControlSurfaceOptions);
  }
  return getControlSurfaceStyle({
    colors: colorsOrOptions as ThemeColors,
    radiusTokens: radius,
    isGlassMode: isGlass,
    isDark,
  });
}

export const getFilterButtonThemedStyle = (colors: ThemeColors) => ({
  borderLeftColor: colors.border,
});
