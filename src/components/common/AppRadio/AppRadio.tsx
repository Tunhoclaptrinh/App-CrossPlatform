import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AppText } from '../AppText';
import { useThemeMode } from '@/hooks/useThemeMode';
import { haptics } from '@/utils/haptics';
import type { AppRadioProps } from './types';
import { createRadioStyles } from './styles';

export const AppRadio: React.FC<AppRadioProps> = ({
  selected,
  onSelect,
  label,
  sublabel,
  disabled = false,
  size = 'md',
  contrast,
  style,
  labelStyle,
  accessibilityLabel,
}) => {
  const { theme, isDark, globalContrast } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const styles = createRadioStyles(
    theme,
    isDark,
    size,
    selected,
    disabled,
    resolvedContrast
  );

  const handlePress = () => {
    if (!disabled && !selected) {
      haptics.light();
      onSelect();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      onPress={handlePress}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={
        accessibilityLabel ||
        (typeof label === 'string' ? label : 'Radio button')
      }
      style={[styles.container, style]}
    >
      <View style={styles.outerCircle}>
        {selected && <View style={styles.innerDot} />}
      </View>

      {(label || sublabel) && (
        <View style={styles.textCol}>
          {typeof label === 'string' ? (
            <AppText style={[styles.label, labelStyle]}>{label}</AppText>
          ) : (
            label
          )}
          {sublabel && (
            <AppText style={styles.sublabel}>{sublabel}</AppText>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};
