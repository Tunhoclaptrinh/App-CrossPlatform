/**
 * Apple iOS 18 Cupertino Design System & Liquid Glass Tokens
 * Định nghĩa bảng màu System Colors, hiệu ứng Frosted Glassmorphism,
 * viền phản quang và độ cong liên tục (Apple Squircles) đặc trưng của Apple.
 */

export const AppleColors = {
  // Apple Dynamic System Colors
  systemBlue: '#007AFF',
  systemPurple: '#AF52DE',
  systemIndigo: '#5856D6',
  systemTeal: '#30B0C7',
  systemMint: '#00C7BE',
  systemGreen: '#34C759',
  systemYellow: '#FFCC00',
  systemOrange: '#FF9500',
  systemPink: '#FF2D55',
  systemRed: '#FF3B30',

  // Liquid Glass Backgrounds
  glassLight: 'rgba(255, 255, 255, 0.72)',
  glassDark: 'rgba(30, 30, 35, 0.75)',

  // Specular Reflection Highlight Borders
  glassBorderLight: 'rgba(255, 255, 255, 0.65)',
  glassBorderDark: 'rgba(255, 255, 255, 0.14)',

  // Liquid Glass Cards Subtle Gradient Accents
  glassAccentLight: 'rgba(0, 122, 255, 0.08)',
  glassAccentDark: 'rgba(0, 122, 255, 0.15)',
} as const;

export const AppleGlassTokens = {
  blurIntensity: 25,
  borderRadius: 22, // Apple Squircle curvature
  borderWidth: 1.2,
  shadows: {
    light: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.08,
      shadowRadius: 20,
      elevation: 6,
    },
    dark: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.35,
      shadowRadius: 24,
      elevation: 8,
    },
  },
} as const;
