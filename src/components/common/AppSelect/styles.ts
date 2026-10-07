import { StyleSheet } from 'react-native';
import { Spacing, RadiusPresetConfig, ControlSize } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';
import type { AppSelectSize } from './types';

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.md,
  },
  label: {
    marginBottom: Spacing.xs,
    fontWeight: '500',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    overflow: 'hidden',
  },
  sizeSm: {
    height: ControlSize.sm.height,
    minHeight: ControlSize.sm.height,
    paddingHorizontal: 10,
  },
  sizeMd: {
    height: ControlSize.md.height,
    minHeight: ControlSize.md.height,
    paddingHorizontal: 12,
  },
  sizeLg: {
    height: ControlSize.lg.height,
    minHeight: ControlSize.lg.height,
    paddingHorizontal: 16,
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIconContainer: {
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  triggerText: {
    flex: 1,
  },
  valueTextSm: {
    fontSize: ControlSize.sm.fontSize,
    lineHeight: ControlSize.sm.lineHeight,
  },
  valueTextMd: {
    fontSize: ControlSize.md.fontSize,
    lineHeight: ControlSize.md.lineHeight,
  },
  valueTextLg: {
    fontSize: ControlSize.lg.fontSize,
    lineHeight: ControlSize.lg.lineHeight,
  },
  disabled: {
    opacity: 0.5,
  },
  errorText: {
    marginTop: 4,
    fontSize: 11,
  },
  chevron: {
    marginLeft: 4,
  },
  chevronRotated: {
    marginLeft: 4,
    transform: [{ rotate: '180deg' }],
  },

  // Modal Sheet Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlayLight: {
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
  },
  modalOverlayDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  sheetContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.base,
    maxHeight: '70%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  sheetContainerLight: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E2E8F0',
    borderTopWidth: 1,
  },
  sheetContainerDark: {
    backgroundColor: '#1E2433',
    borderTopColor: '#334155',
    borderTopWidth: 1,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  sheetHandleLight: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  sheetHandleDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.base,
    paddingBottom: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  sheetCloseBtn: {
    padding: Spacing.xs,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 4,
  },
  optionItemSelectedLight: {
    backgroundColor: 'rgba(0, 122, 255, 0.08)',
  },
  optionItemSelectedDark: {
    backgroundColor: 'rgba(0, 122, 255, 0.18)',
  },
  optionLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 10,
  },
  optionTextCol: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  optionLabelSelected: {
    fontWeight: '700',
  },
  optionSublabel: {
    fontSize: 12,
    marginTop: 2,
  },
});

export const getSelectSizeStyle = (size: AppSelectSize = 'md') => {
  switch (size) {
    case 'sm':
      return styles.sizeSm;
    case 'lg':
      return styles.sizeLg;
    case 'md':
    default:
      return styles.sizeMd;
  }
};

export const getSelectTextSizeStyle = (size: AppSelectSize = 'md') => {
  switch (size) {
    case 'sm':
      return styles.valueTextSm;
    case 'lg':
      return styles.valueTextLg;
    case 'md':
    default:
      return styles.valueTextMd;
  }
};

export const getSelectTriggerStyle = (
  colors: ThemeColors,
  isOpen: boolean,
  hasError: boolean,
  radius?: RadiusPresetConfig
) => {
  const bg = colors.surface;

  const borderColor = hasError
    ? colors.error
    : isOpen
    ? colors.primary
    : colors.border;

  return {
    backgroundColor: bg,
    borderRadius: radius ? radius.control : 12,
    borderColor,
  };
};

