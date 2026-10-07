import { StyleSheet } from 'react-native';
import type { RadiusPresetConfig } from '@/constants/theme';

export const createThemeStudioStyles = (radius: RadiusPresetConfig) =>
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
    grid2: {
      flexDirection: 'row',
      gap: 8,
    },
    gridItem: {
      flex: 1,
    },
    sectionLabel: {
      fontSize: 10.5,
      fontWeight: '800',
      letterSpacing: 0.6,
      marginTop: 2,
    },
    accentGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      justifyContent: 'space-between',
    },
    accentBtn: {
      width: '31%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      height: 38,
      paddingHorizontal: 10,
      borderRadius: Math.max(4, Math.min(radius.smControl, 10)),
      borderWidth: 1.4,
    },
    accentBtnLight: {
      backgroundColor: '#F8FAFC',
      borderColor: '#E2E8F0',
    },
    accentBtnDark: {
      backgroundColor: '#1E293B',
      borderColor: '#334155',
    },
    accentBtnGlassLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.62)',
      borderColor: 'rgba(255, 255, 255, 0.82)',
    },
    accentBtnGlassDark: {
      backgroundColor: 'rgba(30, 41, 59, 0.50)',
      borderColor: 'rgba(255, 255, 255, 0.14)',
    },
    accentDot: {
      width: 14,
      height: 14,
      borderRadius: 7,
    },
    accentName: {
      fontSize: 11.5,
      fontWeight: '600',
      flex: 1,
    },
    accentNameActive: {
      fontWeight: '700',
    },
    radiusGrid: {
      flexDirection: 'row',
      gap: 8,
    },
    radiusCard: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 4,
      alignItems: 'center',
      borderRadius: Math.max(4, Math.min(radius.card, 16) - 4),
      borderWidth: 1.4,
      gap: 5,
    },
    radiusCardLight: {
      backgroundColor: '#F8FAFC',
      borderColor: '#E2E8F0',
    },
    radiusCardDark: {
      backgroundColor: '#1E293B',
      borderColor: '#334155',
    },
    radiusCardGlassLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.65)',
      borderColor: 'rgba(255, 255, 255, 0.85)',
    },
    radiusCardGlassDark: {
      backgroundColor: 'rgba(30, 41, 59, 0.55)',
      borderColor: 'rgba(255, 255, 255, 0.16)',
    },
    radiusPreview: {
      width: 24,
      height: 24,
      borderWidth: 1.8,
      borderStyle: 'dashed',
    },
    radiusSharp: {
      borderRadius: 3,
    },
    radiusCompact: {
      borderRadius: 6,
    },
    radiusStandard: {
      borderRadius: 9,
    },
    radiusSmooth: {
      borderRadius: 12,
    },
    radiusBorderSelected: {
      borderStyle: 'solid',
    },
    radiusBorderDefault: {
      borderStyle: 'dashed',
    },
    radiusName: {
      fontSize: 11,
      fontWeight: '700',
    },
    radiusNameActive: {
      fontWeight: '800',
    },
    radiusPx: {
      fontSize: 9.5,
    },
    summaryBox: {
      borderRadius: Math.max(4, Math.min(radius.card, 16) - 4),
      padding: 12,
      gap: 8,
      borderWidth: 1,
    },
    summaryBoxLight: {
      backgroundColor: '#F8FAFC',
      borderColor: '#E2E8F0',
    },
    summaryBoxDark: {
      backgroundColor: '#1E293B',
      borderColor: '#334155',
    },
    summaryBoxGlassLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.62)',
      borderColor: 'rgba(255, 255, 255, 0.82)',
    },
    summaryBoxGlassDark: {
      backgroundColor: 'rgba(30, 41, 59, 0.50)',
      borderColor: 'rgba(255, 255, 255, 0.14)',
    },
    summaryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    summaryText: {
      fontSize: 12,
      fontWeight: '500',
      flex: 1,
    },
  });
