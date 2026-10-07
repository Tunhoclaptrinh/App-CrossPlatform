import { StyleSheet } from 'react-native';
import type { RadiusPresetConfig } from '@/constants/theme';

export const createModuleTabsStyles = (radius: RadiusPresetConfig) =>
  StyleSheet.create({
    scroll: {
      flexGrow: 0,
      marginBottom: 14,
      marginHorizontal: -16,
    },
    scrollContent: {
      paddingHorizontal: 16,
      gap: 8,
      alignItems: 'center',
    },
    tabChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      paddingHorizontal: 16,
      height: 38,
      borderRadius: radius.pill,
      borderWidth: 1,
      overflow: 'hidden',
      flexShrink: 0,
    },
    tabChipLight: {
      backgroundColor: '#FFFFFF',
      borderColor: 'rgba(226, 232, 240, 0.9)',
      shadowColor: '#000000',
      shadowOpacity: 0.04,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    tabChipDark: {
      backgroundColor: 'rgba(30, 41, 59, 0.65)',
      borderColor: 'rgba(51, 65, 85, 0.7)',
    },
    tabChipGlassLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.70)',
      borderColor: 'rgba(255, 255, 255, 0.88)',
      shadowColor: '#000000',
      shadowOpacity: 0.06,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
    },
    tabChipGlassDark: {
      backgroundColor: 'rgba(25, 30, 45, 0.65)',
      borderColor: 'rgba(255, 255, 255, 0.18)',
    },
    tabChipActive: {
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 0,
    },
    tabChipActiveLight: {
      shadowOpacity: 0.28,
    },
    tabChipActiveDark: {
      shadowOpacity: 0.45,
    },
    tabLabel: {
      fontSize: 13,
      fontWeight: '600',
      letterSpacing: -0.2,
    },
    tabLabelLight: {
      color: '#475569',
    },
    tabLabelDark: {
      color: '#CBD5E1',
    },
    tabLabelActive: {
      color: '#FFFFFF',
      fontWeight: '700',
    },
  });
