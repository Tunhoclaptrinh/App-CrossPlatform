import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppRadio } from './AppRadio';
import type { AppRadioGroupProps } from './types';

export function AppRadioGroup<T = any>({
  options,
  value,
  onChange,
  direction = 'vertical',
  size = 'md',
  contrast,
  borderRadius,
  style,
  gap = 12,
}: AppRadioGroupProps<T>) {
  const isHorizontal = direction === 'horizontal';

  return (
    <View
      style={[
        isHorizontal ? styles.row : styles.column,
        { gap },
        style,
      ]}
      accessibilityRole="radiogroup"
    >
      {options.map((opt, index) => {
        const isSelected = opt.value === value;
        return (
          <AppRadio
            key={String(opt.value ?? index)}
            selected={isSelected}
            onSelect={() => onChange(opt.value)}
            label={opt.label}
            sublabel={opt.sublabel}
            disabled={opt.disabled}
            size={size}
            contrast={contrast}
            borderRadius={borderRadius}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
