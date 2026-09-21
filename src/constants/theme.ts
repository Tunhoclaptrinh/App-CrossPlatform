import { Dimensions, Platform } from 'react-native';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

/**
 * Global Spacing Scale (in px)
 */
export const Spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
  massive: 64,
};

/**
 * Global Border Radius System
 * From sharp/square (none) to rounded to full capsule/pill.
 */
export const BorderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  pill: 9999,
  full: 9999,
  circle: 9999,
};

/**
 * Global Typography Scale
 */
export const Typography = {
  display: {
    fontSize: 34,
    fontWeight: '800' as const,
    lineHeight: 42,
  },
  h1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  header: {
    fontSize: 26,
    fontWeight: '700' as const,
    lineHeight: 34,
  },
  title: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 26,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 22,
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  body: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  body2: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  overline: {
    fontSize: 10,
    fontWeight: '700' as const,
    lineHeight: 14,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
  },
};

/**
 * Cross-platform Shadow Tokens
 */
export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 10,
  },
};

/**
 * Touch Target Expansion (HitSlop)
 */
export const HitSlop = {
  xs: { top: 6, bottom: 6, left: 6, right: 6 },
  sm: { top: 10, bottom: 10, left: 10, right: 10 },
  md: { top: 16, bottom: 16, left: 16, right: 16 },
  lg: { top: 24, bottom: 24, left: 24, right: 24 },
};

/**
 * Layout & Device Dimensions
 */
export const Layout = {
  window: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  isSmallDevice: WINDOW_WIDTH < 375,
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
};