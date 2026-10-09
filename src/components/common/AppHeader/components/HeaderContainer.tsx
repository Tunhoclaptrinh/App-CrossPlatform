import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { useThemeMode } from '@/hooks/useThemeMode';
import { styles, getContainerHeight, getHeaderBackgroundStyle } from '../styles';
import type { AppHeaderVariant } from '../types';
import type { ControlContrast } from '../../surfaceUtils';

export interface HeaderContainerProps {
  children?: React.ReactNode;
  variant?: AppHeaderVariant;
  placement?: 'top' | 'bottom';
  transparent?: boolean;
  borderBottom?: boolean;
  backgroundColor?: string;
  backgroundOpacity?: number;
  contrast?: ControlContrast;
  hasBottomContent?: boolean;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const HeaderContainer: React.FC<HeaderContainerProps> = React.memo(({
  children,
  variant = 'standard',
  placement = 'top',
  transparent = false,
  borderBottom,
  backgroundColor,
  backgroundOpacity,
  contrast,
  hasBottomContent = false,
  style,
  containerStyle,
}) => {
  const insets = useSafeAreaInsets();
  const { isDark, globalContrast } = useThemeMode();
  const isBottom = placement === 'bottom';
  const isCapsuleVariant = variant === 'frosted-capsule';
  const isStandardVariant = variant === 'standard';
  const resolvedContrast = contrast ?? globalContrast;
  const isHighContrast = resolvedContrast === 'high';

  const defaultStandardBg = isDark ? Colors.dark.card : '#FFFFFF';
  const resolvedBgColor = backgroundColor ?? (isStandardVariant ? defaultStandardBg : 'transparent');
  const shouldRenderBgLayer = !transparent && resolvedBgColor !== 'transparent';
  const showBorderBottom =
    borderBottom !== undefined ? borderBottom : (isStandardVariant && !transparent);

  const effectiveInset = isBottom ? insets.bottom : insets.top;

  return (
    <View
      style={[
        styles.container,
        getContainerHeight(effectiveInset, hasBottomContent ? undefined : 48, isBottom),
        isCapsuleVariant || transparent ? styles.floatingContainer : null,
        showBorderBottom
          ? isBottom
            ? isHighContrast
              ? isDark
                ? styles.borderTopHighDark
                : styles.borderTopHighLight
              : isDark
                ? styles.borderTopDark
                : styles.borderTopLight
            : isHighContrast
              ? isDark
                ? styles.borderBottomHighDark
                : styles.borderBottomHighLight
              : isDark
                ? styles.borderBottomDark
                : styles.borderBottomLight
          : null,
        style,
        containerStyle,
      ]}
    >
      {shouldRenderBgLayer && (
        <View
          style={[
            styles.backgroundLayer,
            getHeaderBackgroundStyle(resolvedBgColor, backgroundOpacity),
          ]}
          pointerEvents="none"
        />
      )}
      {children}
    </View>
  );
});

HeaderContainer.displayName = 'HeaderContainer';
