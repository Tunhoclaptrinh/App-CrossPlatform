import React from 'react';
import { Text, useColorScheme } from 'react-native';
import { Colors } from '@/constants/colors';
import type { AppTextProps } from './types';
import { styles } from './styles';

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color,
  style,
  children,
  ...props
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const defaultColor = isDarkMode ? Colors.dark.text : Colors.light.text;

  return (
    <Text
      style={[styles[variant], { color: color || defaultColor }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};
