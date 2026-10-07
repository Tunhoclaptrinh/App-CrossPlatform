import { StyleSheet } from 'react-native';
import type { RadiusPresetConfig } from '@/constants/theme';

export const createGesturesStyles = (radius: RadiusPresetConfig) =>
  StyleSheet.create({
    container: {
      gap: 16,
      marginBottom: 20,
    },
    cardContent: {
      gap: 14,
    },
    cardLight: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E2E8F0',
    },
    cardDark: {
      backgroundColor: '#111827',
      borderColor: '#1F2937',
    },
    cardGlassLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.72)',
      borderColor: 'rgba(255, 255, 255, 0.88)',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 0,
    },
    cardGlassDark: {
      backgroundColor: 'rgba(24, 27, 38, 0.70)',
      borderColor: 'rgba(255, 255, 255, 0.22)',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 0,
    },
    specularHighlight: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 1.2,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    },
    specularHighlightDark: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 1.2,
      backgroundColor: 'rgba(255, 255, 255, 0.38)',
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
    iconBoxAmber: {
      backgroundColor: 'rgba(245, 158, 11, 0.15)',
    },
    iconBoxBlue: {
      backgroundColor: 'rgba(0, 122, 255, 0.15)',
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
    stepperCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: Math.max(4, Math.min(radius.card, 16) - 4),
      padding: 14,
      borderWidth: 1,
    },
    stepperCardLight: {
      backgroundColor: '#F8FAFC',
      borderColor: '#E2E8F0',
    },
    stepperCardDark: {
      backgroundColor: '#1E293B',
      borderColor: '#334155',
    },
    stepperCardGlassLight: {
      backgroundColor: 'rgba(255, 255, 255, 0.65)',
      borderColor: 'rgba(255, 255, 255, 0.85)',
    },
    stepperCardGlassDark: {
      backgroundColor: 'rgba(30, 41, 59, 0.55)',
      borderColor: 'rgba(255, 255, 255, 0.16)',
    },
    stepperTextBlock: {
      gap: 2,
    },
    stepperLabel: {
      fontSize: 11.5,
      fontWeight: '600',
    },
    stepperNumber: {
      fontSize: 26,
      lineHeight: 32,
      fontWeight: '800',
    },
    stepperActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    grid3: {
      flexDirection: 'row',
      gap: 8,
    },
    gridItem: {
      flex: 1,
    },
  });
