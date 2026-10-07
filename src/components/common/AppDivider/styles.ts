import { StyleSheet } from 'react-native';
import type { ThemeColors } from '@/constants/colors';
import type { ControlContrast } from '../surfaceUtils';

export const getDividerColor = (
  theme: ThemeColors,
  isDark: boolean,
  contrast: ControlContrast = 'normal',
  overrideColor?: string
): string => {
  if (overrideColor) return overrideColor;
  if (contrast === 'high') {
    return isDark ? 'rgba(255, 255, 255, 0.40)' : 'rgba(0, 0, 0, 0.30)';
  }
  if (contrast === 'subtle') {
    return isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  }
  return isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.14)';
};

export const styles = StyleSheet.create({
  horizontalContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalContainer: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  line: {
    flex: 1,
  },
  fullWidthLine: {
    width: '100%',
  },
  labelBox: {
    paddingHorizontal: 12,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
});
