import { StyleSheet } from 'react-native';
import type { RadiusPresetConfig } from '@/constants/theme';

export const createHeaderCardStyles = (radius: RadiusPresetConfig) =>
  StyleSheet.create({
    card: {
      padding: 18,
      gap: 12,
      marginBottom: 16,
    },

    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    iconBox: {
      width: 44,
      height: 44,
      borderRadius: Math.min(radius.smControl * 1.8, 14),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },
    readyBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: Math.min(radius.badge, 12),
      backgroundColor: 'rgba(16, 185, 129, 0.12)',
      borderWidth: 1,
      borderColor: 'rgba(16, 185, 129, 0.25)',
    },
    badgePulseDot: {
      width: 7,
      height: 7,
      borderRadius: 3.5,
      backgroundColor: '#10B981',
    },
    readyBadgeText: {
      fontSize: 10.5,
      fontWeight: '700',
      color: '#059669',
      letterSpacing: 0.6,
    },
    title: {
      fontSize: 20,
      fontWeight: '800',
      letterSpacing: -0.4,
      marginTop: -2,
    },
    desc: {
      fontSize: 13.5,
      lineHeight: 20,
      marginTop: -4,
    },
    tagsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    tagPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 9,
      paddingVertical: 5,
      borderRadius: Math.min(radius.smControl, 14),
      borderWidth: 1,
    },
    tagPillLight: {
      backgroundColor: '#F1F5F9',
      borderColor: '#E2E8F0',
    },
    tagPillDark: {
      backgroundColor: 'rgba(30, 41, 59, 0.55)',
      borderColor: 'rgba(51, 65, 85, 0.6)',
    },
    tagPillGlassLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.65)',
      borderColor: 'rgba(255, 255, 255, 0.85)',
    },
    tagPillGlassDark: {
      backgroundColor: 'rgba(30, 41, 59, 0.50)',
      borderColor: 'rgba(255, 255, 255, 0.14)',
    },
    tagText: {
      fontSize: 11,
      fontWeight: '600',
    },
  });
