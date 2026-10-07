import { StyleSheet } from 'react-native';
import type { ThemeColors } from '@/constants/colors';
import type { AvatarSize, AvatarStatus } from './types';
import type { ControlContrast } from '../surfaceUtils';

export const AVATAR_SIZE_MAP: Record<string, number> = {
  xs: 26,
  sm: 34,
  md: 42,
  lg: 52,
  xl: 68,
};

export const AVATAR_FONT_SIZE_MAP: Record<string, number> = {
  xs: 11,
  sm: 13,
  md: 16,
  lg: 20,
  xl: 26,
};

export const STATUS_COLORS: Record<AvatarStatus, string> = {
  online: '#10B981',
  busy: '#EF4444',
  away: '#F59E0B',
  offline: '#94A3B8',
};

const PALETTE = [
  '#3B82F6',
  '#8B5CF6',
  '#EC4899',
  '#10B981',
  '#F59E0B',
  '#6366F1',
  '#06B6D4',
  '#14B8A6',
];

export const getAvatarColorByName = (name?: string): string => {
  if (!name || name.trim().length === 0) return PALETTE[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash * 31) - hash);
  }
  const index = Math.abs(hash) % PALETTE.length;
  return PALETTE[index];
};

export const getInitials = (name?: string): string => {
  if (!name || name.trim().length === 0) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const getAvatarPixelSize = (size: AvatarSize = 'md'): number => {
  if (typeof size === 'number') return size;
  return AVATAR_SIZE_MAP[size] || AVATAR_SIZE_MAP.md;
};

export const getAvatarFontSize = (size: AvatarSize = 'md'): number => {
  if (typeof size === 'number') return Math.max(10, Math.round(size * 0.38));
  return AVATAR_FONT_SIZE_MAP[size] || AVATAR_FONT_SIZE_MAP.md;
};

export const createAvatarStyles = (
  theme: ThemeColors,
  isDark: boolean,
  size: number,
  contrast: ControlContrast = 'normal'
) => {
  const isHigh = contrast === 'high';
  const borderWidth = isHigh ? 2 : 1;
  const borderColor = isHigh
    ? isDark
      ? 'rgba(255, 255, 255, 0.45)'
      : 'rgba(0, 0, 0, 0.35)'
    : isDark
      ? 'rgba(255, 255, 255, 0.12)'
      : 'rgba(0, 0, 0, 0.08)';

  const statusSize = Math.max(8, Math.round(size * 0.28));

  return StyleSheet.create({
    container: {
      width: size,
      height: size,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarInner: {
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth,
      borderColor,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    initialsText: {
      color: '#FFFFFF',
      fontWeight: '700',
    },
    statusBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: statusSize,
      height: statusSize,
      borderRadius: statusSize / 2,
      borderWidth: 2,
      borderColor: isDark ? '#0F172A' : '#FFFFFF',
    },
    countBadge: {
      position: 'absolute',
      top: -3,
      right: -3,
      paddingHorizontal: 4,
      minWidth: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: '#EF4444',
      borderWidth: 1.5,
      borderColor: isDark ? '#0F172A' : '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    countBadgeText: {
      fontSize: 9,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    overflowChip: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: isDark ? '#334155' : '#E2E8F0',
      borderWidth,
      borderColor,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 0,
    },
    overflowText: {
      fontSize: Math.max(10, Math.round(size * 0.32)),
      fontWeight: '700',
      color: theme.text,
    },
  });
};
