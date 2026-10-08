import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  verticalContainer: {
    position: 'relative',
    flexGrow: 1,
  },
  horizontalContainer: {
    position: 'relative',
    flexGrow: 0,
  },
  innerScrollView: {
    flexGrow: 1,
  },
  innerScrollViewHorizontal: {
    flexGrow: 0,
  },
  track: {
    position: 'absolute',
    borderRadius: 999,
    pointerEvents: 'none',
    zIndex: 98,
  },
  thumb: {
    position: 'absolute',
    borderRadius: 999,
    pointerEvents: 'none',
    zIndex: 99,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.28,
    shadowRadius: 2.5,
    elevation: 3,
  },
});
