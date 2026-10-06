import { StyleSheet } from 'react-native';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

export const createStorybookStyles = (
  colors: ThemeColors,
  radius: RadiusPresetConfig,
  isDark: boolean
) =>
  StyleSheet.create({
    container: {
      gap: 16,
      marginBottom: 32,
    },

    // 1. HERO CARD
    heroCard: {
      padding: 18,
      borderRadius: Math.min(radius.card, 16),
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      position: 'relative',
      overflow: 'hidden',
    },
    heroCardGlass: {
      padding: 18,
      borderRadius: Math.min(radius.card, 16),
      borderWidth: 1.2,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.88)',
      backgroundColor: isDark ? 'rgba(24, 27, 38, 0.70)' : 'rgba(255, 255, 255, 0.72)',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: isDark ? 0.35 : 0.08,
      shadowRadius: 16,
      elevation: 2,
      position: 'relative',
      overflow: 'hidden',
    },
    specularHighlight: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 1.2,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.38)' : 'rgba(255, 255, 255, 0.95)',
    },
    heroHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    heroTag: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: Math.min(radius.badge, 12),
      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.18)' : 'rgba(99, 102, 241, 0.1)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(99, 102, 241, 0.35)' : 'rgba(99, 102, 241, 0.25)',
    },
    heroTagText: {
      fontSize: 10.5,
      fontWeight: '800',
      color: '#6366F1',
      letterSpacing: 0.8,
    },
    heroVersionBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 9,
      paddingVertical: 4,
      borderRadius: Math.min(radius.badge, 12),
      backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.08)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)',
    },
    heroVersionText: {
      fontSize: 10,
      fontWeight: '700',
      color: '#10B981',
      letterSpacing: 0.5,
    },
    heroTitleGroup: {
      gap: 6,
      marginBottom: 14,
    },
    heroTitle: {
      fontSize: 21,
      fontWeight: '800',
      letterSpacing: -0.4,
    },
    heroDesc: {
      fontSize: 13,
      lineHeight: 19,
    },
    sizeSwitcherContainer: {
      gap: 6,
    },
    sizeSwitcherLabel: {
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 0.8,
    },
    sizeSwitcherBar: {
      flexDirection: 'row',
      borderRadius: Math.min(radius.control, 16),
      backgroundColor: isDark ? '#1F2937' : '#F1F5F9',
      padding: 3,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#E2E8F0',
    },
    sizeSwitcherItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 36,
      borderRadius: Math.min(radius.smControl, 12),
    },
    sizeSwitcherItemActive: {
      backgroundColor: isDark ? '#374151' : '#FFFFFF',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1.5 },
      shadowOpacity: 0.12,
      shadowRadius: 3,
      elevation: 2,
    },
    sizeSwitcherItemText: {
      fontSize: 12,
      fontWeight: '600',
    },
    sizeSwitcherItemTextActive: {
      color: '#6366F1',
      fontWeight: '700',
    },

    // 2. CATEGORY HORIZONTAL SELECTOR
    categoryScroll: {
      flexGrow: 0,
      marginHorizontal: -16,
    },
    categoryScrollContent: {
      paddingHorizontal: 16,
      gap: 8,
    },
    categoryChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 13,
      paddingVertical: 7,
      borderRadius: radius.pill,
      borderWidth: 1,
    },
    categoryChipActive: {
      backgroundColor: '#6366F1',
      borderColor: '#6366F1',
    },
    categoryChipInactive: {
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
      borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
    },
    categoryChipText: {
      fontSize: 12.5,
      fontWeight: '600',
    },
    categoryChipTextActive: {
      color: '#FFFFFF',
      fontWeight: '700',
    },

    // 3. SECTION CARDS
    sectionCard: {
      backgroundColor: colors.card,
      borderRadius: Math.min(radius.card, 16),
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      gap: 12,
      position: 'relative',
      overflow: 'hidden',
    },
    sectionCardGlass: {
      borderRadius: Math.min(radius.card, 16),
      borderWidth: 1.2,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.88)',
      backgroundColor: isDark ? 'rgba(24, 27, 38, 0.70)' : 'rgba(255, 255, 255, 0.72)',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: isDark ? 0.35 : 0.08,
      shadowRadius: 16,
      elevation: 2,
      padding: 16,
      gap: 12,
      position: 'relative',
      overflow: 'hidden',
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sectionHeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flex: 1,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
    },
    sectionDesc: {
      fontSize: 12.5,
      lineHeight: 18,
    },
    parityPill: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: Math.min(radius.badge, 12),
      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)',
    },
    parityPillText: {
      fontSize: 9.5,
      fontWeight: '800',
      color: '#6366F1',
      letterSpacing: 0.5,
    },
    parityDemoBox: {
      backgroundColor: isDark ? 'rgba(0,0,0,0.25)' : 'rgba(248, 250, 252, 0.8)',
      padding: 12,
      borderRadius: Math.min(radius.card, 14),
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
      gap: 8,
    },
    demoSubheading: {
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 0.7,
      marginBottom: 2,
    },
    sideBySideRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    sideColInput: {
      flex: 1,
    },
    sideColButton: {
      width: 90,
    },
    inputNoMargin: {
      marginBottom: 0,
    },
    colWide: {
      flex: 1.2,
    },
    colMid: {
      flex: 1.1,
    },
    colNarrow: {
      flex: 0.9,
    },
    spacerSm: {
      height: 4,
    },

    // BUTTONS GRID
    buttonsGrid: {
      gap: 10,
    },
    btnRow: {
      flexDirection: 'row',
      gap: 10,
    },
    btnCol: {
      flex: 1,
    },

    // INPUTS STACK
    inputsStack: {
      gap: 4,
    },

    // BADGES & SWITCHES
    badgesWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    togglesBox: {
      gap: 10,
      backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(248, 250, 252, 0.8)',
      padding: 12,
      borderRadius: Math.min(radius.card, 14),
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.border,
      marginVertical: 4,
    },

    // SURFACES & CARDS
    surfacesStack: {
      gap: 10,
    },
    surfaceItem: {
      borderRadius: Math.min(radius.card, 16),
    },
    surfaceInner: {
      padding: 14,
      gap: 4,
    },
    surfaceTitle: {
      fontSize: 14.5,
      fontWeight: '700',
    },
    surfaceBody: {
      fontSize: 12.5,
      lineHeight: 17,
    },
    glassHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
  });
