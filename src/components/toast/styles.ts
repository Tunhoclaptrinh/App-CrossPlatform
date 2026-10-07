import { StyleSheet } from 'react-native';
import { BorderRadius, Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    left: Spacing.base,
    right: Spacing.base,
    top: 0,
    zIndex: 99999,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.2,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 12,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: Spacing.sm,
    gap: 2,
  },
  title: {
    fontWeight: '700',
    fontSize: 14,
  },
  message: {
    fontSize: 12.5,
    lineHeight: 17,
  },
});
