import { StyleSheet } from 'react-native';
import type { RadiusPresetConfig } from '@/constants/theme';

export const createAppleGlassStyles = (radius: RadiusPresetConfig) =>
  StyleSheet.create({
    container: {
      gap: 16,
      marginBottom: 20,
    },

    // 1. HERO CARD
    heroCard: {
      padding: 18,
      borderRadius: radius.card,
      position: 'relative',
      overflow: 'hidden',
    },
    heroContentWrapper: {
      gap: 16,
    },
    heroHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    appleTag: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: radius.badge,
      borderWidth: 1,
    },
    appleTagLight: {
      backgroundColor: 'rgba(0, 122, 255, 0.08)',
      borderColor: 'rgba(0, 122, 255, 0.22)',
    },
    appleTagDark: {
      backgroundColor: 'rgba(0, 122, 255, 0.16)',
      borderColor: 'rgba(0, 122, 255, 0.35)',
    },
    appleTagText: {
      fontSize: 10.5,
      fontWeight: '800',
      color: '#007AFF',
      letterSpacing: 0.8,
    },
    readyPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: radius.badge,
      borderWidth: 1,
    },
    readyPillLight: {
      backgroundColor: 'rgba(16, 185, 129, 0.08)',
      borderColor: 'rgba(16, 185, 129, 0.22)',
    },
    readyPillDark: {
      backgroundColor: 'rgba(16, 185, 129, 0.14)',
      borderColor: 'rgba(16, 185, 129, 0.3)',
    },
    badgePulseRing: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgePulseDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#10B981',
    },
    readyPillText: {
      fontSize: 10,
      fontWeight: '800',
      color: '#059669',
      letterSpacing: 0.8,
    },
    heroTitleGroup: {
      gap: 6,
    },
    heroTitle: {
      fontSize: 22,
      fontWeight: '800',
      letterSpacing: -0.5,
    },
    heroDesc: {
      fontSize: 13,
      lineHeight: 20,
    },
    heroSegmentBar: {
      flexDirection: 'row',
      borderRadius: radius.control,
      padding: 4,
      borderWidth: 1,
    },
    heroSegmentBarLight: {
      backgroundColor: 'rgba(238, 242, 246, 0.85)',
      borderColor: 'rgba(203, 213, 225, 0.8)',
    },
    heroSegmentBarDark: {
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      borderColor: 'rgba(51, 65, 85, 0.7)',
    },
    heroSegmentItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      borderRadius: Math.max(radius.control - 4, radius.smControl),
      gap: 7,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    heroSegmentActiveLight: {
      backgroundColor: '#FFFFFF',
      borderColor: 'rgba(0, 122, 255, 0.25)',
      shadowColor: '#000000',
      shadowOpacity: 0.12,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    heroSegmentActiveDark: {
      backgroundColor: 'rgba(30, 41, 59, 0.95)',
      borderColor: 'rgba(0, 122, 255, 0.4)',
      shadowColor: '#000000',
      shadowOpacity: 0.35,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    heroSegmentText: {
      fontSize: 13,
      fontWeight: '600',
    },
    heroSegmentTextActive: {
      color: '#007AFF',
      fontWeight: '700',
    },
    specBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 4,
    },
    specBarLight: {
      backgroundColor: 'transparent',
    },
    specBarDark: {
      backgroundColor: 'transparent',
    },
    specCol: {
      flex: 1,
      alignItems: 'center',
      gap: 2,
    },
    specDivider: {
      width: StyleSheet.hairlineWidth,
      height: 28,
    },
    specDividerLight: {
      backgroundColor: 'rgba(203, 213, 225, 0.6)',
    },
    specDividerDark: {
      backgroundColor: 'rgba(71, 85, 105, 0.6)',
    },
    specVal: {
      fontSize: 17,
      fontWeight: '800',
      letterSpacing: -0.3,
    },
    specValBlue: {
      color: '#007AFF',
    },
    specValPurple: {
      color: '#8B5CF6',
    },
    specValGreen: {
      color: '#10B981',
    },
    specLabel: {
      fontSize: 11,
      fontWeight: '700',
    },
    specSub: {
      fontSize: 9.5,
      fontWeight: '500',
    },
    heroFooterRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      paddingTop: 2,
    },
    heroFooterItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    heroFooterText: {
      fontSize: 11,
      fontWeight: '600',
      letterSpacing: 0.2,
    },
    heroFooterDot: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
    },
    heroFooterDotLight: {
      backgroundColor: '#CBD5E1',
    },
    heroFooterDotDark: {
      backgroundColor: '#475569',
    },

    // 2. BACKDROP MESH OPTICAL LAB
    meshLabContainer: {
      borderRadius: radius.card,
      overflow: 'hidden',
      position: 'relative',
      padding: 16,
      borderWidth: 1,
    },
    meshLabContainerLight: {
      backgroundColor: '#F8FAFC',
      borderColor: '#E2E8F0',
      shadowColor: '#000000',
      shadowOpacity: 0.04,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
    },
    meshLabContainerDark: {
      backgroundColor: '#090D16',
      borderColor: '#1E293B',
    },
    labHeader: {
      marginBottom: 12,
    },
    labHeaderTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 4,
    },
    labHeaderIconBadge: {
      width: 20,
      height: 20,
      borderRadius: Math.min(radius.smControl, 6),
      backgroundColor: 'rgba(0, 122, 255, 0.12)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    labOverline: {
      fontSize: 10.5,
      fontWeight: '800',
      color: '#007AFF',
      letterSpacing: 0.8,
    },
    labTitle: {
      fontSize: 16,
      fontWeight: '800',
      letterSpacing: -0.2,
    },
    labSubtitle: {
      fontSize: 12,
      lineHeight: 17,
      marginTop: 2,
    },
    themeSelectorScroll: {
      flexGrow: 0,
      marginBottom: 14,
      marginHorizontal: -16,
    },
    themeSelectorContent: {
      gap: 8,
      paddingHorizontal: 16,
    },
    themePill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      height: 32,
      borderRadius: radius.control,
      borderWidth: 1.2,
    },
    themePillLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderColor: 'rgba(226, 232, 240, 0.9)',
    },
    themePillDark: {
      backgroundColor: 'rgba(30, 41, 59, 0.55)',
      borderColor: 'rgba(51, 65, 85, 0.6)',
    },
    themeDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    themePillText: {
      fontSize: 12,
      fontWeight: '600',
    },
    themePillTextActive: {
      fontWeight: '700',
    },
    cardWrapper: {
      marginBottom: 14,
    },
    bentoGrid: {
      flexDirection: 'row',
      gap: 10,
    },
    bentoCol: {
      flex: 1,
      gap: 10,
    },

    // 3. INTERACTIVE COMPARISON
    compareCard: {
      borderRadius: radius.card,
      padding: 16,
      borderWidth: 1,
      gap: 12,
    },
    compareCardLight: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E2E8F0',
    },
    compareCardDark: {
      backgroundColor: '#111827',
      borderColor: '#1F2937',
    },
    compareTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    compareTitle: {
      fontSize: 15.5,
      fontWeight: '700',
      letterSpacing: -0.2,
    },
    compareDesc: {
      fontSize: 12.5,
      lineHeight: 18,
      marginTop: -4,
    },
    segmentedBar: {
      flexDirection: 'row',
      borderRadius: radius.control,
      padding: 3,
      borderWidth: 1,
    },
    segmentedBarLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    segmentedBarDark: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    segmentItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 34,
      borderRadius: Math.max(radius.control - 3, radius.smControl),
      gap: 6,
    },
    segmentItemActiveLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      shadowColor: '#000000',
      shadowOpacity: 0.08,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    segmentItemActiveDark: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      shadowColor: '#000000',
      shadowOpacity: 0.25,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    segmentText: {
      fontSize: 12,
      fontWeight: '600',
    },
    segmentTextActive: {
      color: '#007AFF',
      fontWeight: '700',
    },
    previewStage: {
      height: 195,
      borderRadius: Math.min(radius.card, 14),
      overflow: 'hidden',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 12,
    },
    previewCard: {
      width: '100%',
      padding: 14,
      borderRadius: Math.min(radius.card, 14),
      borderWidth: 1.2,
      position: 'relative',
      overflow: 'hidden',
    },
    previewCardGlassLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.68)',
      borderColor: 'rgba(255, 255, 255, 0.95)',
      shadowColor: '#000000',
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
    },
    previewCardGlassDark: {
      backgroundColor: 'rgba(24, 27, 38, 0.72)',
      borderColor: 'rgba(255, 255, 255, 0.25)',
      shadowColor: '#000000',
      shadowOpacity: 0.35,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 4 },
    },
    previewCardFlatLight: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E2E8F0',
    },
    previewCardFlatDark: {
      backgroundColor: '#1E293B',
      borderColor: '#334155',
    },
    previewGlassSpecular: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 1.2,
    },
    previewGlassSpecularLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    },
    previewGlassSpecularDark: {
      backgroundColor: 'rgba(255, 255, 255, 0.45)',
    },
    previewTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    previewHeading: {
      fontSize: 13,
      fontWeight: '700',
    },
    previewBadge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: radius.badge,
    },
    previewBadgeGlass: {
      backgroundColor: 'rgba(0, 122, 255, 0.15)',
    },
    previewBadgeFlat: {
      backgroundColor: '#F1F5F9',
    },
    previewBadgeText: {
      fontSize: 9.5,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    previewBadgeTextGlass: {
      color: '#007AFF',
    },
    previewBadgeTextFlat: {
      color: '#64748B',
    },
    previewBody: {
      fontSize: 11.5,
      lineHeight: 16,
      marginBottom: 10,
    },
    codeBox: {
      borderRadius: radius.smControl,
      padding: 8,
    },
    codeBoxLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.45)',
    },
    codeBoxDark: {
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    codeText: {
      fontSize: 10,
      fontFamily: 'monospace',
      color: '#0284C7',
      lineHeight: 14,
    },
  });
