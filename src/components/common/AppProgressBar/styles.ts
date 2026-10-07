import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  track: {
    flex: 1,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
  labelTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  labelRightText: {
    minWidth: 38,
    textAlign: 'right',
  },
});
