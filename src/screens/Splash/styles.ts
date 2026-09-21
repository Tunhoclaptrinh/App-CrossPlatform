import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius } from '@/constants/theme';

export const createSplashStyles = (colors: {
  background: string;
  primary: string;
  primaryLight: string;
  text: string;
  textSecondary: string;
}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      padding: Spacing.xl,
    },
    content: {
      alignItems: 'center',
    },
    iconWrapper: {
      width: 96,
      height: 96,
      borderRadius: BorderRadius.lg * 1.5,
      backgroundColor: colors.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Spacing.lg,
    },
    title: {
      color: colors.text,
      marginBottom: Spacing.xs,
      textAlign: 'center',
    },
    subtitle: {
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: Spacing.xl,
    },
    footer: {
      position: 'absolute',
      bottom: Spacing.xxl,
      alignItems: 'center',
    },
    footerText: {
      color: colors.textSecondary,
      marginTop: Spacing.sm,
    },
  });