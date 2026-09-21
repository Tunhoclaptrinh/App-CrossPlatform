/**
 * Global Color Palette & Semantic Color System
 * Supports full light and dark mode schemes with rich scales.
 */

export const Palette = {
  // Primary (Modern Royal Blue)
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  // Neutral (Slate / Charcoal)
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },

  // Success (Emerald)
  emerald: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
  },

  // Warning (Amber)
  amber: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
  },

  // Error (Rose / Red)
  rose: {
    50: '#FFF1F2',
    100: '#FFE4E6',
    200: '#FECDD3',
    500: '#F43F5E',
    600: '#E11D48',
    700: '#BE123C',
  },

  // Info / Cyan
  cyan: {
    50: '#ECFEFF',
    100: '#CFFAFE',
    500: '#06B6D4',
    600: '#0891B2',
  },

  // Purple / Violet
  violet: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    500: '#8B5CF6',
    600: '#7C3AED',
  },
};

export const Colors = {
  light: {
    // Brand
    primary: Palette.primary[600],
    primaryLight: Palette.primary[100],
    primaryDark: Palette.primary[800],
    secondary: Palette.slate[600],
    accent: Palette.violet[500],

    // Surfaces & Backgrounds
    background: Palette.slate[50],
    card: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceSubtle: Palette.slate[100],
    overlay: 'rgba(15, 23, 42, 0.5)',

    // Typography
    text: Palette.slate[900],
    textSecondary: Palette.slate[500],
    textTertiary: Palette.slate[400],
    textInverse: '#FFFFFF',

    // Borders & Dividers
    border: Palette.slate[200],
    borderLight: Palette.slate[100],
    borderStrong: Palette.slate[300],

    // Status / Feedback
    success: Palette.emerald[500],
    successLight: Palette.emerald[50],
    successText: Palette.emerald[700],

    warning: Palette.amber[500],
    warningLight: Palette.amber[50],
    warningText: Palette.amber[700],

    error: Palette.rose[500],
    errorLight: Palette.rose[50],
    errorText: Palette.rose[700],
    notification: Palette.rose[500],

    info: Palette.cyan[500],
    infoLight: Palette.cyan[50],
    infoText: Palette.cyan[600],
  },

  dark: {
    // Brand
    primary: Palette.primary[400],
    primaryLight: Palette.primary[900],
    primaryDark: Palette.primary[600],
    secondary: Palette.slate[400],
    accent: Palette.violet[500],

    // Surfaces & Backgrounds
    background: Palette.slate[950],
    card: Palette.slate[900],
    surface: Palette.slate[800],
    surfaceSubtle: Palette.slate[800],
    overlay: 'rgba(0, 0, 0, 0.75)',

    // Typography
    text: Palette.slate[50],
    textSecondary: Palette.slate[400],
    textTertiary: Palette.slate[500],
    textInverse: Palette.slate[900],

    // Borders & Dividers
    border: Palette.slate[800],
    borderLight: Palette.slate[800],
    borderStrong: Palette.slate[700],

    // Status / Feedback
    success: Palette.emerald[500],
    successLight: 'rgba(16, 185, 129, 0.15)',
    successText: Palette.emerald[200],

    warning: Palette.amber[500],
    warningLight: 'rgba(245, 158, 11, 0.15)',
    warningText: Palette.amber[200],

    error: Palette.rose[500],
    errorLight: 'rgba(244, 63, 94, 0.15)',
    errorText: Palette.rose[200],
    notification: Palette.rose[500],

    info: Palette.cyan[500],
    infoLight: 'rgba(6, 182, 212, 0.15)',
    infoText: Palette.cyan[100],
  },
};

export type ThemeColors = typeof Colors.light;