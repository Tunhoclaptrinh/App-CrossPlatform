import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, RadialGradient, Rect, Stop } from 'react-native-svg';
import { useThemeMode } from '@/hooks/useThemeMode';

export type MeshVariant = 'aurora' | 'sunset' | 'ocean' | 'minimal';

export interface AppleMeshBackgroundProps {
  variant?: MeshVariant;
  style?: ViewStyle;
  children?: React.ReactNode;
}

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
              linear: ['#171E2E', '#101624', '#0B0F19'],
              radial1: { color: '#334155', opacity: 0.45, cx: '80%', cy: '15%', r: '60%' },
              radial2: { color: '#1E293B', opacity: 0.45, cx: '20%', cy: '85%', r: '65%' },
              radial3: { color: '#475569', opacity: 0.30, cx: '50%', cy: '50%', r: '50%' },
            }
          : {
              base: '#F1F5F9',
              linear: ['#E2E8F0', '#F1F5F9', '#CBD5E1'],
              radial1: { color: '#94A3B8', opacity: 0.45, cx: '80%', cy: '15%', r: '60%' },
              radial2: { color: '#CBD5E1', opacity: 0.50, cx: '20%', cy: '85%', r: '65%' },
              radial3: { color: '#64748B', opacity: 0.25, cx: '50%', cy: '50%', r: '50%' },
            };

      case 'aurora':
      default:
        return isDark
          ? {
              base: '#0B0D1B',
              linear: ['#181236', '#0F0E24', '#080814'],
              radial1: { color: '#8B5CF6', opacity: 0.58, cx: '85%', cy: '12%', r: '65%' },
              radial2: { color: '#3B82F6', opacity: 0.52, cx: '15%', cy: '78%', r: '70%' },
              radial3: { color: '#06B6D4', opacity: 0.42, cx: '50%', cy: '45%', r: '55%' },
            }
          : {
              base: '#EEF2FF',
              linear: ['#C7D2FE', '#DDD6FE', '#BAE6FD'],
              radial1: { color: '#7C3AED', opacity: 0.48, cx: '85%', cy: '12%', r: '65%' },
              radial2: { color: '#2563EB', opacity: 0.45, cx: '15%', cy: '78%', r: '70%' },
              radial3: { color: '#06B6D4', opacity: 0.38, cx: '50%', cy: '45%', r: '55%' },
            };
    }
  };

  const g = getGradients();

  return (
    <View style={[styles.container, style]} pointerEvents="box-none">
      <Svg style={styles.svg} width="100%" height="100%" preserveAspectRatio="none">
        <Defs>
          {/* Main Diagonal Linear Base */}
          <LinearGradient id="meshLinearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={g.linear[0]} stopOpacity="1" />
            <Stop offset="50%" stopColor={g.linear[1]} stopOpacity="1" />
            <Stop offset="100%" stopColor={g.linear[2]} stopOpacity="1" />
          </LinearGradient>

          {/* Organic Fluid Radial Glow 1 (Top-Right) */}
          <RadialGradient
            id="meshRadial1"
            cx={g.radial1.cx}
            cy={g.radial1.cy}
            r={g.radial1.r}
            fx={g.radial1.cx}
            fy={g.radial1.cy}
          >
            <Stop offset="0%" stopColor={g.radial1.color} stopOpacity={g.radial1.opacity} />
            <Stop offset="50%" stopColor={g.radial1.color} stopOpacity={g.radial1.opacity * 0.45} />
            <Stop offset="100%" stopColor={g.radial1.color} stopOpacity="0" />
          </RadialGradient>

          {/* Organic Fluid Radial Glow 2 (Bottom-Left) */}
          <RadialGradient
            id="meshRadial2"
            cx={g.radial2.cx}
            cy={g.radial2.cy}
            r={g.radial2.r}
            fx={g.radial2.cx}
            fy={g.radial2.cy}
          >
            <Stop offset="0%" stopColor={g.radial2.color} stopOpacity={g.radial2.opacity} />
            <Stop offset="50%" stopColor={g.radial2.color} stopOpacity={g.radial2.opacity * 0.45} />
            <Stop offset="100%" stopColor={g.radial2.color} stopOpacity="0" />
          </RadialGradient>

          {/* Organic Fluid Radial Glow 3 (Center Refraction) */}
          <RadialGradient
            id="meshRadial3"
            cx={g.radial3.cx}
            cy={g.radial3.cy}
            r={g.radial3.r}
            fx={g.radial3.cx}
            fy={g.radial3.cy}
          >
            <Stop offset="0%" stopColor={g.radial3.color} stopOpacity={g.radial3.opacity} />
            <Stop offset="60%" stopColor={g.radial3.color} stopOpacity={g.radial3.opacity * 0.35} />
            <Stop offset="100%" stopColor={g.radial3.color} stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* 1. Base Gradient Canvas */}
        <Rect width="100%" height="100%" fill="url(#meshLinearGrad)" />

        {/* 2. Overlapping Fluid Color Centers without harsh edges */}
        <Rect width="100%" height="100%" fill="url(#meshRadial1)" />
        <Rect width="100%" height="100%" fill="url(#meshRadial2)" />
        <Rect width="100%" height="100%" fill="url(#meshRadial3)" />
      </Svg>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
