import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfStarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    overflow: 'hidden',
  },
  fullStarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    overflow: 'hidden',
  },
  scoreText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '700',
  },
});
