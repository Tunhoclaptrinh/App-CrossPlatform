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
      gap: 14,
      marginBottom: 32,
    },
    heroCard: {
      gap: 12,
    },
    heroHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    heroTag: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: Math.max(4, Math.min(radius.badge, 12)),
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
      borderRadius: Math.max(4, Math.min(radius.badge, 12)),
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
      gap: 5,
    },
    heroTitle: {
      fontSize: 20,
      fontWeight: '800',
      letterSpacing: -0.4,
    },
    heroDesc: {
      fontSize: 13,
      lineHeight: 18.5,
    },
    catalogHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 2,
    },
    catalogHeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    catalogHeaderTitle: {
      fontSize: 13,
      fontWeight: '700',
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
    catalogCountPill: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: radius.pill,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
    },
    catalogCountText: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.textSecondary,
    },
    catalogList: {
      gap: 10,
    },
    emptyContainer: {
      paddingVertical: 32,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    emptyTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text,
    },
    emptyDesc: {
      fontSize: 13,
      color: colors.textSecondary,
      textAlign: 'center',
      maxWidth: 260,
    },
  });
