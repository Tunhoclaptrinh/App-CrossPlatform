import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, RadialGradient, Rect, Stop } from 'react-native-svg';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { AppleMeshBackgroundProps, MeshVariant } from './types';
import { styles } from './styles';

export const AppleMeshBackground: React.FC<AppleMeshBackgroundProps> = ({
  variant = 'aurora',
  style,
  children,
}) => {
  const { isDark } = useThemeMode();

  // Curated Apple iOS 18 Dynamic Wallpaper Mesh Palettes (High contrast for frosted glass)
  const getGradients = () => {
    switch (variant) {
      case 'sunset':
        return isDark
          ? {
              base: '#140C18',
              linear: ['#3A0D28', '#260B1C', '#120816'],
              radial1: { color: '#F43F5E', opacity: 0.55, cx: '85%', cy: '15%', r: '65%' },
              radial2: { color: '#F59E0B', opacity: 0.48, cx: '15%', cy: '75%', r: '70%' },
              radial3: { color: '#EC4899', opacity: 0.42, cx: '50%', cy: '45%', r: '50%' },
            }
          : {
              base: '#FEF2F2',
              linear: ['#FDE68A', '#FECDD3', '#FBCFE8'],
              radial1: { color: '#FB7185', opacity: 0.55, cx: '85%', cy: '15%', r: '65%' },
              radial2: { color: '#FBBF24', opacity: 0.50, cx: '15%', cy: '75%', r: '70%' },
              radial3: { color: '#F43F5E', opacity: 0.40, cx: '50%', cy: '45%', r: '50%' },
            };

      case 'ocean':
        return isDark
          ? {
              base: '#071626',
              linear: ['#0A2540', '#071A2E', '#04101D'],
              radial1: { color: '#0284C7', opacity: 0.55, cx: '90%', cy: '20%', r: '70%' },
              radial2: { color: '#0D9488', opacity: 0.48, cx: '10%', cy: '80%', r: '75%' },
              radial3: { color: '#06B6D4', opacity: 0.40, cx: '45%', cy: '40%', r: '50%' },
            }
          : {
              base: '#ECFEFF',
              linear: ['#BAE6FD', '#A7F3D0', '#CFFAFE'],
              radial1: { color: '#0284C7', opacity: 0.50, cx: '90%', cy: '20%', r: '70%' },
              radial2: { color: '#10B981', opacity: 0.48, cx: '10%', cy: '80%', r: '75%' },
              radial3: { color: '#06B6D4', opacity: 0.40, cx: '45%', cy: '40%', r: '50%' },
            };

      case 'minimal':
        return isDark
          ? {
              base: '#0B0F19',
              linear: ['#111827', '#0F172A', '#0B0F19'],
              radial1: { color: '#38BDF8', opacity: 0.18, cx: '80%', cy: '10%', r: '60%' },
              radial2: { color: '#818CF8', opacity: 0.15, cx: '10%', cy: '80%', r: '60%' },
              radial3: { color: '#34D399', opacity: 0.10, cx: '50%', cy: '50%', r: '40%' },
            }
          : {
              base: '#F8FAFC',
              linear: ['#F1F5F9', '#F8FAFC', '#FFFFFF'],
              radial1: { color: '#38BDF8', opacity: 0.25, cx: '80%', cy: '10%', r: '60%' },
              radial2: { color: '#818CF8', opacity: 0.20, cx: '10%', cy: '80%', r: '60%' },
              radial3: { color: '#34D399', opacity: 0.15, cx: '50%', cy: '50%', r: '40%' },
            };

      case 'aurora':
      default:
        return isDark
          ? {
              base: '#0A0E1A',
              linear: ['#130E26', '#091528', '#070C18'],
              radial1: { color: '#6366F1', opacity: 0.55, cx: '80%', cy: '10%', r: '65%' },
              radial2: { color: '#06B6D4', opacity: 0.45, cx: '15%', cy: '65%', r: '75%' },
              radial3: { color: '#EC4899', opacity: 0.35, cx: '50%', cy: '90%', r: '60%' },
            }
          : {
              base: '#EEF2FF',
              linear: ['#E0E7FF', '#CFFAFE', '#FCE7F3'],
              radial1: { color: '#818CF8', opacity: 0.60, cx: '80%', cy: '10%', r: '65%' },
              radial2: { color: '#22D3EE', opacity: 0.50, cx: '15%', cy: '65%', r: '75%' },
              radial3: { color: '#F472B6', opacity: 0.40, cx: '50%', cy: '90%', r: '60%' },
            };
    }
  };

  const current = getGradients();
  const rawId = React.useId();
  const uniqueId = rawId.replace(/[^a-zA-Z0-9]/g, '_');
  const linearGradId = `meshLinearGrad_${uniqueId}`;
  const radial1Id = `meshRadial1_${uniqueId}`;
  const radial2Id = `meshRadial2_${uniqueId}`;
  const radial3Id = `meshRadial3_${uniqueId}`;

  return (
    <View style={[styles.container, { backgroundColor: current.base }, style]} pointerEvents="none">
      <Svg width="100%" height="100%" style={styles.svg}>
        <Defs>
          {/* Base Atmospheric Linear Gradient */}
          <LinearGradient id={linearGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={current.linear[0]} stopOpacity="1" />
            <Stop offset="50%" stopColor={current.linear[1]} stopOpacity="1" />
            <Stop offset="100%" stopColor={current.linear[2]} stopOpacity="1" />
          </LinearGradient>

          {/* Radial Plasma Light Emitters */}
          <RadialGradient
            id={radial1Id}
            cx={current.radial1.cx}
            cy={current.radial1.cy}
            r={current.radial1.r}
            fx={current.radial1.cx}
            fy={current.radial1.cy}
          >
            <Stop offset="0%" stopColor={current.radial1.color} stopOpacity={current.radial1.opacity} />
            <Stop offset="100%" stopColor={current.radial1.color} stopOpacity="0" />
          </RadialGradient>

          <RadialGradient
            id={radial2Id}
            cx={current.radial2.cx}
            cy={current.radial2.cy}
            r={current.radial2.r}
            fx={current.radial2.cx}
            fy={current.radial2.cy}
          >
            <Stop offset="0%" stopColor={current.radial2.color} stopOpacity={current.radial2.opacity} />
            <Stop offset="100%" stopColor={current.radial2.color} stopOpacity="0" />
          </RadialGradient>

          <RadialGradient
            id={radial3Id}
            cx={current.radial3.cx}
            cy={current.radial3.cy}
            r={current.radial3.r}
            fx={current.radial3.cx}
            fy={current.radial3.cy}
          >
            <Stop offset="0%" stopColor={current.radial3.color} stopOpacity={current.radial3.opacity} />
            <Stop offset="100%" stopColor={current.radial3.color} stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* 1. Base Gradient Canvas */}
        <Rect width="100%" height="100%" fill={`url(#${linearGradId})`} />

        {/* 2. Overlapping Fluid Color Centers without harsh edges */}
        <Rect width="100%" height="100%" fill={`url(#${radial1Id})`} />
        <Rect width="100%" height="100%" fill={`url(#${radial2Id})`} />
        <Rect width="100%" height="100%" fill={`url(#${radial3Id})`} />
      </Svg>
      {children}
    </View>
  );
};

export type { AppleMeshBackgroundProps, MeshVariant };
