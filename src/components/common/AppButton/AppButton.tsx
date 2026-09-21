import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { AppText } from '../AppText';
import type { AppButtonProps } from './types';
import { styles, getButtonVariantStyle, getButtonTextColor } from './styles';

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  style,
  disabled,
  ...props
}) => {
  const textColor = getButtonTextColor(variant);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        getButtonVariantStyle(variant),
        disabled && styles.disabledButton,
        style,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <AppText variant="subtitle" color={textColor} style={styles.buttonText}>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
};
