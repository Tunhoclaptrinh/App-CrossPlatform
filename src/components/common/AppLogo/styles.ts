import { StyleSheet } from 'react-native';
import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  vertical: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  textContainer: {
    justifyContent: 'center',
  },
  verticalText: {
    alignItems: 'center',
  },
  brandTitle: {
    fontWeight: '700',
  },
});
