import { StyleSheet } from 'react-native';
import { Spacing } from '@/constants/theme';
import type { Colors } from '@/constants/colors';
import type { ControlContrast } from '../surfaceUtils';
import type { WidgetCardSize } from './types';

export const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    marginRight: Spacing.sm,
  },
  titleText: {
    fontWeight: '700',
  },
  badgeWrapper: {
    marginLeft: Spacing.xs,
  },
  contentArea: {
    marginTop: Spacing.xs,
  },
  subtitleText: {
    marginTop: Spacing.xxs,
  },
});

export const createWidgetCardStyles = (
  _themeColors?: typeof Colors.light,
  _isDark: boolean = false,
  _size: WidgetCardSize = 'md',
  _contrast: ControlContrast = 'normal',
  _cardRadius?: number
) => styles;

