import { StyleSheet } from 'react-native';
import type { RadiusPresetConfig } from '@/constants/theme';

export const createUtilsStyles = (radius: RadiusPresetConfig) =>
  StyleSheet.create({
    cardContent: {
      gap: 14,
      marginBottom: 20,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    iconBox: {
      width: 38,
      height: 38,
      borderRadius: Math.max(4, Math.min(radius.smControl * 1.5, 12)),
      backgroundColor: 'rgba(236, 72, 153, 0.15)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleTextCol: {
      flex: 1,
      gap: 2,
    },
    title: {
      fontSize: 16,
      fontWeight: '800',
      letterSpacing: -0.2,
    },
    subtitle: {
      fontSize: 12,
      lineHeight: 16,
    },
    snippetBox: {
      borderRadius: Math.max(4, Math.min(radius.card, 16) - 4),
      padding: 10,
      borderWidth: 1,
      gap: 4,
    },
    snippetBoxLight: {
      backgroundColor: '#F8FAFC',
      borderColor: '#E2E8F0',
    },
    snippetBoxDark: {
      backgroundColor: '#1E293B',
      borderColor: '#334155',
    },
    snippetBoxGlassLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.62)',
      borderColor: 'rgba(255, 255, 255, 0.82)',
    },
    snippetBoxGlassDark: {
      backgroundColor: 'rgba(30, 41, 59, 0.50)',
      borderColor: 'rgba(255, 255, 255, 0.14)',
    },
    snippetLabel: {
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 0.6,
    },
    snippetText: {
      fontSize: 12,
      fontFamily: 'monospace',
    },
    grid2: {
      flexDirection: 'row',
      gap: 8,
    },
    gridItem: {
      flex: 1,
    },
  });
