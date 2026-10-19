import { StyleSheet } from 'react-native';
import { Spacing } from '@/constants';
export const styles = StyleSheet.create({
  fields: { gap: Spacing.sm },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  part: { flex: 1, minWidth: Spacing.massive * 2 },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    paddingVertical: Spacing.base,
  },
  scoreRow: { gap: Spacing.sm, marginBottom: Spacing.base },
});
