import React, { useMemo } from 'react';
import { View } from 'react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { AppListGroupProps } from './types';
import { createListGroupStyles } from './styles';
import { resolveSurfaceColors } from '../surfaceUtils';

export const AppListGroup: React.FC<AppListGroupProps> = ({
  title,
  footer,
  children,
  variant,
  surface = 'theme',
  size,
  contrast,
  borderRadius,
  style,
}) => {
  const { theme, radiusTokens, isDark, globalContrast, isGlassTheme } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const effectiveVariant = surface === 'solid' ? (variant === 'clean' ? 'clean' : 'card') : variant ?? (isGlassTheme ? 'glass' : 'card');
  const colors = useMemo(() => resolveSurfaceColors(theme, isDark, surface), [theme, isDark, surface]);

  const styles = useMemo(
    () =>
      createListGroupStyles(
        colors,
        isDark,
        radiusTokens.card,
        effectiveVariant,
        resolvedContrast,
        borderRadius
      ),
    [colors, isDark, radiusTokens.card, effectiveVariant, resolvedContrast, borderRadius]
  );

  // Automatically pass showDivider and group size to all children except the last one
  const childrenArray = React.Children.toArray(children);
  const enhancedChildren = childrenArray.map((child, index) => {
    if (React.isValidElement(child)) {
      const isLast = index === childrenArray.length - 1;
      const childProps = child.props as any;
      return React.cloneElement(child, {
        showDivider: childProps.showDivider !== undefined ? childProps.showDivider : !isLast,
        size: childProps.size !== undefined ? childProps.size : size,
        contrast: childProps.contrast !== undefined ? childProps.contrast : resolvedContrast,
      } as any);
    }
    return child;
  });

  return (
    <View style={[styles.groupWrapper, style]}>
      {title && (
        <AppText style={styles.groupHeaderTitle}>{title}</AppText>
      )}

      <View style={styles.groupContainer}>
        {enhancedChildren}
      </View>

      {footer && (
        <AppText style={styles.groupFooterText}>{footer}</AppText>
      )}
    </View>
  );
};
