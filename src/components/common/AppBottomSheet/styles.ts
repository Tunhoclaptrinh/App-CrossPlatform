import { StyleSheet, Dimensions } from 'react-native';
import type { ThemeColors } from '@/constants/colors';
import type { BottomSheetSnapPoint, AppBottomSheetSize } from './types';
import type { ControlContrast } from '../surfaceUtils';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const getSheetHeight = (snapPoint: BottomSheetSnapPoint = 'auto'): number | undefined => {
  if (snapPoint === 'half') return SCREEN_HEIGHT * 0.52;
  if (snapPoint === 'full') return SCREEN_HEIGHT * 0.90;
  if (typeof snapPoint === 'number') return snapPoint;
  return undefined; // auto
};

export const createBottomSheetStyles = (
  theme: ThemeColors,
  isDark: boolean,
  cardRadius: number,
  contrast: ControlContrast = 'normal',
  isGlass: boolean = false,
  size: AppBottomSheetSize = 'md',
  borderRadiusOverride?: number
) => {
  const isHigh = contrast === 'high';

  let backgroundColor = isDark ? '#181C28' : '#FFFFFF';
  let borderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
  let borderWidth = isHigh ? 1.5 : 1;

  if (isGlass) {
    backgroundColor = isDark ? 'rgba(24, 28, 42, 0.90)' : 'rgba(255, 255, 255, 0.92)';
    borderColor = isDark ? 'rgba(255, 255, 255, 0.20)' : 'rgba(255, 255, 255, 0.85)';
  } else if (isHigh) {
    borderColor = isDark ? 'rgba(255, 255, 255, 0.40)' : 'rgba(0, 0, 0, 0.30)';
  }

  const topRadius = borderRadiusOverride !== undefined ? borderRadiusOverride : Math.min(cardRadius, 24);

  let titleSize = 17;
  let contentPaddingH = 20;
  let contentPaddingV = 16;
  if (size === 'sm') {
    titleSize = 15;
    contentPaddingH = 16;
    contentPaddingV = 12;
  } else if (size === 'lg') {
    titleSize = 19;
    contentPaddingH = 24;
    contentPaddingV = 20;
  }

  return StyleSheet.create({
    modalRoot: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      flex: 1,
    },
    backdropLight: {
      backgroundColor: 'rgba(15, 23, 42, 0.50)',
    },
    backdropDark: {
      backgroundColor: 'rgba(0, 0, 0, 0.70)',
    },
    sheet: {
      backgroundColor,
      borderTopLeftRadius: topRadius,
      borderTopRightRadius: topRadius,
      borderTopWidth: borderWidth,
      borderLeftWidth: borderWidth,
      borderRightWidth: borderWidth,
      borderColor,
      maxHeight: SCREEN_HEIGHT * 0.92,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: isHigh ? 0.25 : 0.15,
      shadowRadius: 16,
      elevation: 12,
    },
    handleArea: {
      alignItems: 'center',
      paddingVertical: 10,
    },
    handle: {
      width: 40,
      height: 4.5,
      borderRadius: 2.5,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.25)',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: contentPaddingH,
      paddingBottom: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(0, 0, 0, 0.08)',
    },
    titleCol: {
      flex: 1,
    },
    title: {
      fontSize: titleSize,
      fontWeight: '700',
      color: theme.text,
      letterSpacing: -0.3,
    },
    subtitle: {
      fontSize: 12,
      color: isHigh
        ? (isDark ? 'rgba(255, 255, 255, 0.85)' : '#334155')
        : theme.textSecondary,
      marginTop: 2,
    },
    content: {
      paddingHorizontal: contentPaddingH,
      paddingVertical: contentPaddingV,
    },
  });
};
