import React from 'react';
import { Text } from 'react-native';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { AppTextProps } from './types';
import { styles } from './styles';

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color,
  style,
  children,
  ...props
}) => {
  const { theme: themeColors } = useThemeMode();
  const defaultColor = themeColors.text;

  return (
    <Text
      style={[styles[variant], { color: color || defaultColor }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};
