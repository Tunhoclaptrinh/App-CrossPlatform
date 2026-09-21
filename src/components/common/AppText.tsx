import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { Typography } from '@/constants/theme';
import { Colors } from '@/constants/colors';

export interface AppTextProps extends TextProps {
  variant?: keyof typeof Typography;
  color?: string;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color,
  style,
  children,
  ...props
}) => {
  return (
    <Text
      style={[
        Typography[variant],
        color ? { color } : styles.defaultColor,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultColor: {
    color: Colors.light.text,
  },
});
