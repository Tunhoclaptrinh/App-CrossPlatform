import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import type { CupertinoIconTileProps } from './types';
import { styles } from './styles';

export const CupertinoIconTile: React.FC<CupertinoIconTileProps> = ({
  icon: IconComponent,
  size = 44,
  iconSize,
  gradientColors,
  baseColor = '#007AFF',
  style,
}) => {
  const actualIconSize = iconSize ?? Math.round(size * 0.52);
  const borderRadius = Math.round(size * 0.28); // Standard Apple Continuous Squircle ratio

  // Derive subtle gradient if not provided
  const colors: [string, string] = gradientColors || [baseColor, shadeColor(baseColor, -20)];
  const gradId = `tileGrad_${baseColor.replace(/[^a-zA-Z0-9]/g, '')}_${size}`;

  return (
    <View
      style={[
        styles.tile,
        {
          width: size,
          height: size,
          borderRadius,
          shadowColor: baseColor,
        },
        style,
      ]}
    >
      {/* 1. Rich Vector Gradient Background */}
      <Svg
        width={size}
        height={size}
        style={[styles.tileSvg, { borderRadius }]}
      >
        <Defs>
          <LinearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={colors[0]} stopOpacity="1" />
            <Stop offset="100%" stopColor={colors[1]} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect width={size} height={size} rx={borderRadius} ry={borderRadius} fill={`url(#${gradId})`} />
      </Svg>

      {/* 2. Top Specular Reflection Highlight Line */}
      <View
        style={[
          styles.specularLine,
          {
            left: Math.round(size * 0.18),
            right: Math.round(size * 0.18),
          },
        ]}
      />

      {/* 3. Crisp High-Contrast Icon Glyph */}
      <IconComponent size={actualIconSize} color="#FFFFFF" strokeWidth={2.2} />
    </View>
  );
};

// Helper to darken hex color for 3D depth without bitwise ops
function shadeColor(color: string, percent: number): string {
  if (!color.startsWith('#') || color.length < 7) return color;
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const amt = Math.round(2.55 * percent);
  const clampR = Math.min(255, Math.max(0, r + amt)).toString(16).padStart(2, '0');
  const clampG = Math.min(255, Math.max(0, g + amt)).toString(16).padStart(2, '0');
  const clampB = Math.min(255, Math.max(0, b + amt)).toString(16).padStart(2, '0');
  return `#${clampR}${clampG}${clampB}`;
}

export type { CupertinoIconTileProps } from './types';
