import { StyleSheet } from 'react-native';
import { Spacing, Typography } from '@/constants';
export const styles = StyleSheet.create({
  card: { marginBottom: Spacing.md },
  body: { gap: Spacing.sm },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: { ...Typography.subtitle },
  toggle: { marginTop: Spacing.md, alignSelf: 'flex-start' },
});
