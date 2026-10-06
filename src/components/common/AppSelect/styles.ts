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
    borderWidth: 1.5,
  },
  sizeSm: {
    height: ControlSize.sm.height,
    minHeight: ControlSize.sm.height,
    paddingHorizontal: ControlSize.sm.paddingHorizontal,
  },
  sizeMd: {
    height: ControlSize.md.height,
    minHeight: ControlSize.md.height,
    paddingHorizontal: ControlSize.md.paddingHorizontal,
  },
  sizeLg: {
    height: ControlSize.lg.height,
    minHeight: ControlSize.lg.height,
    paddingHorizontal: ControlSize.lg.paddingHorizontal,
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIconContainer: {
    marginRight: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
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

  // Modal Sheet Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.base,
    maxHeight: '70%',
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
) => ({
  backgroundColor: colors.card,
  borderRadius: radius ? radius.control : 12,
  borderColor: hasError
    ? colors.error
    : isOpen
    ? colors.primary
    : colors.border,
});
