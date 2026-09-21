import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { AppCheckboxProps } from './types';
import { styles } from './styles';

export const AppCheckbox: React.FC<AppCheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  style,
}) => {
  const { theme: themeColors } = useThemeMode();

  const handlePress = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const boxColors = checked
    ? {
        backgroundColor: themeColors.primary,
        borderColor: themeColors.primary,
      }
    : {
        backgroundColor: 'transparent',
        borderColor: themeColors.border,
      };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={disabled}
      style={[styles.container, disabled && styles.disabled, style]}
    >
      <View style={[styles.box, boxColors]}>
        {checked && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
      </View>

      {label ? (
        <AppText
          variant="body"
          color={disabled ? themeColors.textSecondary : themeColors.text}
          style={styles.label}
        >
          {label}
        </AppText>
      ) : null}
    </TouchableOpacity>
  );
};
