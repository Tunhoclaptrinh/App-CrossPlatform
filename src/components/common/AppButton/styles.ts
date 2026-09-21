import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/theme';
import type { AppButtonVariant } from './types';

export const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.md - 2,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.light.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.light.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.light.primary,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontWeight: '600',
  },
});

export const getButtonVariantStyle = (variant: AppButtonVariant = 'primary') => {
  switch (variant) {
    case 'secondary':
      return styles.secondaryButton;
    case 'outline':
      return styles.outlineButton;
    default:
      return styles.primaryButton;
  }
};

export const getButtonTextColor = (variant: AppButtonVariant = 'primary') => {
  switch (variant) {
    case 'outline':
      return Colors.light.primary;
    default:
      return '#FFFFFF';
  }
};
