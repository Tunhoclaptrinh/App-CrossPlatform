import { StyleSheet } from 'react-native';
import { Spacing } from '@/constants';
export const styles = StyleSheet.create({
  root: { gap: Spacing.xs, marginBottom: Spacing.md },
  picker: { alignSelf: 'stretch' },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
  },
});
