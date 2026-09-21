import React from 'react';
import { View, Switch, useColorScheme, Platform } from 'react-native';
import { AppText } from '../AppText';
import { Colors } from '@/constants/colors';
import type { AppSwitchProps } from './types';
import { styles } from './styles';

export const AppSwitch: React.FC<AppSwitchProps> = ({
  value,
  onValueChange,
  label,
  sublabel,
  disabled = false,
  style,
  ...props
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, style]}>
      {(label || sublabel) && (
        <View style={styles.textContainer}>
          {label && (
            <AppText
              variant="body"
              color={disabled ? themeColors.textSecondary : themeColors.text}
              style={styles.label}
            >
              {label}
            </AppText>
          )}
          {sublabel && (
            <AppText
              variant="caption"
              color={themeColors.textSecondary}
              style={styles.sublabel}
            >
              {sublabel}
            </AppText>
          )}
        </View>
      )}

      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{
          false: isDarkMode ? '#374151' : '#E5E7EB',
          true: themeColors.primary,
        }}
        thumbColor={
          Platform.OS === 'android'
            ? value
              ? '#FFFFFF'
              : '#F3F4F6'
            : undefined
        }
        ios_backgroundColor={isDarkMode ? '#374151' : '#E5E7EB'}
        {...props}
      />
    </View>
  );
};
