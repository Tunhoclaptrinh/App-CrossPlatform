import { StyleSheet } from 'react-native';
import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xs + 2,
    paddingHorizontal: Spacing.md,
    backgroundColor: '#DC2626',
  },
  icon: {
    marginRight: Spacing.xs,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});
