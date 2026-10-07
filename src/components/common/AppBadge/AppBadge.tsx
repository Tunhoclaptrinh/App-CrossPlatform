import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { AppBadgeProps } from './types';
import { styles, getBadgeColors, getBadgeContainerStyle } from './styles';

export const AppBadge: React.FC<AppBadgeProps> = ({
  label,
  variant = 'primary',
  shape = 'pill',
  size = 'md',
  icon,
  contrast,
  style,
}) => {
  const { theme: themeColors, radiusTokens, globalContrast } = useThemeMode();
  const effectiveContrast = contrast ?? globalContrast ?? 'normal';
  const colors = getBadgeColors(variant, themeColors);
  const isSm = size === 'sm';

  const contrastStyle: ViewStyle = useMemo(() => {
    if (effectiveContrast === 'high') {
      return {
        borderWidth: 1,
        borderColor: `${colors.text}60`,
      };
    }
    return {};
  }, [effectiveContrast, colors.text]);

  return (
    <View
      style={[
        getBadgeContainerStyle(shape, size, colors.bg, radiusTokens),
        contrastStyle,
        style,
      ]}
    >
      {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}
      <AppText
        variant={isSm ? 'caption' : 'subtitle'}
        style={styles.label}
        color={colors.text}
      >
        {label}
      </AppText>
    </View>
  );
};
