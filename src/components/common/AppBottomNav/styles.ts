import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  // Root outer wrapper
  wrapper: {
    width: '100%',
    zIndex: 100,
  },
  floatingWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 999,
  },
  floatingWrapperTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 999,
  },

  // Accessory top content (Docked above/below BottomNav, e.g. Mini Player, Cart summary)
  topContentWrapper: {
    width: '100%',
    maxWidth: 480,
    marginBottom: 8,
    alignItems: 'center',
  },
  topContentWrapperBelow: {
    width: '100%',
    maxWidth: 480,
    marginTop: 8,
    alignItems: 'center',
  },

  // Main Bar Container
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },

  // Standard Variant (Fixed bottom bar)
  standardContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: Platform.OS === 'android' ? 6 : 0,
  },
  standardContainerTop: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
    borderTopWidth: 0,
    shadowOffset: { width: 0, height: 3 },
  },
  standardLight: {
    backgroundColor: '#FFFFFF',
    borderTopColor: 'rgba(0, 0, 0, 0.08)',
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
  },
  standardDark: {
    backgroundColor: '#0F172A',
    borderTopColor: 'rgba(255, 255, 255, 0.12)',
    borderBottomColor: 'rgba(255, 255, 255, 0.12)',
    shadowOpacity: 0.35,
  },

  // Floating Pill Variant (Dynamic Island style bottom dock)
  // Note: On Android, elevation is set to 0 for floating pills to prevent ugly rectangular shadow artifacts
  floatingPill: {
    borderRadius: 34,
    borderWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: '100%',
    maxWidth: 480,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: Platform.OS === 'android' ? 0 : 4,
  },
  floatingPillLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  floatingPillDark: {
    backgroundColor: 'rgba(15, 23, 42, 0.94)',
    borderColor: 'rgba(255, 255, 255, 0.18)',
    shadowOpacity: 0.45,
  },

  // Frosted Glass Variant (Liquid Glass)
  frostedGlass: {
    borderRadius: 30,
    borderWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: '100%',
    maxWidth: 480,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: Platform.OS === 'android' ? 0 : 2,
  },
  frostedGlassLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.78)',
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  frostedGlassDark: {
    backgroundColor: 'rgba(30, 41, 59, 0.78)',
    borderColor: 'rgba(255, 255, 255, 0.20)',
    shadowOpacity: 0.35,
  },

  // Contrast Overrides
  contrastHighLight: {
    borderTopColor: 'rgba(0, 0, 0, 0.22)',
    borderColor: 'rgba(0, 0, 0, 0.22)',
  },
  contrastHighDark: {
    borderTopColor: 'rgba(255, 255, 255, 0.30)',
    borderColor: 'rgba(255, 255, 255, 0.30)',
  },
  contrastSubtle: {
    borderTopColor: 'transparent',
    borderColor: 'transparent',
    shadowOpacity: 0.06,
  },

  // Tab Item
  item: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 2,
    position: 'relative',
  },
  itemHorizontal: {
    flexDirection: 'row',
    gap: 6,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  itemDisabled: {
    opacity: 0.4,
  },

  // Icon container
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Labels
  label: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    marginTop: 2,
    letterSpacing: -0.1,
    textAlign: 'center',
    includeFontPadding: false,
  },
  labelHorizontal: {
    marginTop: 0,
    fontSize: 12,
    lineHeight: 15,
    includeFontPadding: false,
  },
  labelActive: {
    fontWeight: '700',
  },

  // Indicators
  // 1. Sliding Segmented Pill Indicator (Continuous spring motion across dock)
  slidingIndicatorPill: {
    position: 'absolute',
    left: 0,
    borderWidth: 1,
    zIndex: 0,
  },
  // 2. Pill Indicator (Soft colored capsule behind the item)
  indicatorPill: {
    position: 'absolute',
    top: 2,
    bottom: 2,
    left: 3,
    right: 3,
    borderRadius: 9999,
    borderWidth: 1,
    zIndex: -1,
  },
  // 2. Glow Indicator
  indicatorGlow: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    opacity: 0.25,
    zIndex: -1,
  },
  // 3. Dot Indicator
  indicatorDot: {
    width: 4.5,
    height: 4.5,
    borderRadius: 2.25,
    marginTop: 3,
  },
  // 4. Line Indicator
  indicatorLine: {
    position: 'absolute',
    bottom: 0,
    width: 20,
    height: 2.5,
    borderRadius: 1.25,
  },

  // Badge Styles
  badge: {
    position: 'absolute',
    top: -3,
    right: -6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    zIndex: 10,
  },
  badgeDark: {
    borderColor: '#0F172A',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: 12,
  },
  badgeDot: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    zIndex: 10,
  },
  badgeDotDark: {
    borderColor: '#0F172A',
  },

  // Center FAB Button
  fabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    zIndex: 100,
  },
  fabCustomWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  fabButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: Platform.OS === 'android' ? 4 : 2,
    borderWidth: 2,
  },
  fabButtonLight: {
    borderColor: '#FFFFFF',
  },
  fabButtonDark: {
    borderColor: '#0F172A',
  },
  fabSquircle: {
    borderRadius: 18,
  },
  fabButtonLifted: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3.5,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: Platform.OS === 'android' ? 8 : 5,
    transform: [{ translateY: -22 }],
  },
  fabButtonLiftedTop: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3.5,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: Platform.OS === 'android' ? 8 : 5,
    transform: [{ translateY: 22 }],
  },
  fabEmbedded: {
    transform: [{ translateY: 0 }],
  },
  fabLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    marginTop: 3,
    textAlign: 'center',
  },
  fabLabelDark: {
    color: '#E2E8F0',
  },
  fabLabelLight: {
    color: '#475569',
  },

  // Custom Replacement Mode Styles
  customContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  customInnerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
});

export const getNavHeight = (size: 'sm' | 'md' | 'lg' = 'md', isFloating = false) => {
  switch (size) {
    case 'sm':
      return isFloating ? 54 : 52;
    case 'lg':
      return isFloating ? 70 : 68;
    case 'md':
    default:
      return isFloating ? 62 : 60;
  }
};
