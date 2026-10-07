import { StyleSheet } from 'react-native';
import type { RadiusPresetConfig } from '@/constants/theme';

export const createRealtimeStyles = (radius: RadiusPresetConfig) =>
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
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
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
    terminalBox: {
      backgroundColor: '#0F172A',
      borderRadius: Math.max(4, Math.min(radius.card, 16) - 4),
      borderWidth: 1,
      borderColor: '#1E293B',
      padding: 12,
    },
    terminalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#1E293B',
      marginBottom: 8,
    },
    terminalDots: {
      flexDirection: 'row',
      gap: 5,
    },
    terminalDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    dotRed: {
      backgroundColor: '#EF4444',
    },
    dotYellow: {
      backgroundColor: '#F59E0B',
    },
    dotGreen: {
      backgroundColor: '#10B981',
    },
    terminalStatus: {
      fontSize: 10,
      fontWeight: '700',
      color: '#64748B',
      letterSpacing: 0.8,
    },
    terminalContent: {
      fontSize: 12,
      fontFamily: 'monospace',
      color: '#38BDF8',
      lineHeight: 18,
    },
    terminalEmpty: {
      fontSize: 12,
      fontFamily: 'monospace',
      color: '#475569',
      fontStyle: 'italic',
    },
    grid2: {
      flexDirection: 'row',
      gap: 8,
    },
    gridItem: {
      flex: 1,
    },
  });
