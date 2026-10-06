import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 0.8,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  tileSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  specularLine: {
    position: 'absolute',
    top: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 1,
  },
});
