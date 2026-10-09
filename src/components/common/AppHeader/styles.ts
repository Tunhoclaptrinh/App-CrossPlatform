import { StyleSheet, Platform } from 'react-native';
import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.sm,
    position: 'relative',
    zIndex: 10,
  },
  borderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  borderBottomLight: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
  },
  borderBottomDark: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255, 255, 255, 0.14)',
  },
  borderBottomHighLight: {
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.28)',
  },
  borderBottomHighDark: {
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(255, 255, 255, 0.32)',
  },
  standardBgLight: {
    backgroundColor: '#FFFFFF',
  },
  standardBgDark: {
    backgroundColor: '#0F172A',
  },
  backgroundLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  glassLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
  },
  glassDark: {
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
  },

  // Left Section
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 70,
    justifyContent: 'flex-start',
    gap: 4,
    zIndex: 2,
  },
  iosBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingRight: 8,
    paddingLeft: 2,
    gap: 2,
  },
  iosBackText: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: -0.3,
  },

  // Center / Title Section
  centerAbsolute: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  centerFlex: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
    zIndex: 1,
  },
  alignLeft: {
    alignItems: 'flex-start',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 1,
    textAlign: 'center',
  },

  // Right Section
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 70,
    justifyContent: 'flex-end',
    gap: 6,
    zIndex: 2,
  },
  actionCircleBtn: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  standardMoreBtn: {
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 36,
    minHeight: 36,
  },
  actionCircleBtnLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderColor: 'rgba(255, 255, 255, 0.75)',
  },
  actionCircleBtnDark: {
    backgroundColor: 'rgba(30, 41, 59, 0.60)',
    borderColor: 'rgba(255, 255, 255, 0.16)',
  },
  actionTextBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
  },
  actionDisabled: {
    opacity: 0.4,
  },

  // Apple Capsule Action Group (Nhóm các icon trong 1 capsule kính mờ chung kiểu Apple iOS 18)
  capsuleActionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    gap: 2,
  },
  capsuleActionGroupLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    borderColor: 'rgba(255, 255, 255, 0.88)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: Platform.OS === 'android' ? 0 : 3,
  },
  capsuleActionGroupDark: {
    backgroundColor: 'rgba(30, 36, 51, 0.60)',
    borderColor: 'rgba(255, 255, 255, 0.22)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: Platform.OS === 'android' ? 0 : 3,
  },
  capsuleStandardLight: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  capsuleStandardDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  capsuleActionItem: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  capsuleActionDivider: {
    width: 1,
    height: 14,
  },
  capsuleActionDividerLight: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  capsuleActionDividerDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },

  // Apple Glass Circle Back Button (Nút back tròn mờ độc lập)
  backCircleBtn: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  backCircleBtnLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    borderColor: 'rgba(255, 255, 255, 0.88)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: Platform.OS === 'android' ? 0 : 2,
  },
  backCircleBtnDark: {
    backgroundColor: 'rgba(30, 36, 51, 0.60)',
    borderColor: 'rgba(255, 255, 255, 0.22)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: Platform.OS === 'android' ? 0 : 2,
  },

  // Floating Pill Header Variant (Transparent stage)
  floatingContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
  },
  floatingPillBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  // Dynamic Island Unified Pill (Kiểu 2: Floating Pill Island liền khối)
  dynamicIslandPill: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  dynamicIslandPillLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    borderColor: 'rgba(0, 0, 0, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: Platform.OS === 'android' ? 0 : 2,
  },
  dynamicIslandPillDark: {
    backgroundColor: 'rgba(20, 26, 40, 0.88)',
    borderColor: 'rgba(255, 255, 255, 0.22)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.40,
    shadowRadius: 18,
    elevation: Platform.OS === 'android' ? 0 : 4,
  },
  islandLeft: {
    minWidth: 36,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  islandBackBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    overflow: 'hidden',
  },
  islandBackBtnLight: {},
  islandBackBtnDark: {},
  islandCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  islandTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  islandSubtitle: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 0.5,
    textAlign: 'center',
  },
  islandRight: {
    minWidth: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  islandActionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    overflow: 'hidden',
  },
  islandActionBtnLight: {},
  islandActionBtnDark: {},
  islandCapsuleGroup: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  islandCapsuleGroupLight: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  islandCapsuleGroupDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderColor: 'rgba(255, 255, 255, 0.22)',
  },
  islandCapsuleItem: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  islandCapsuleDivider: {
    width: 1,
    height: 16,
  },
  islandCapsuleDividerLight: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  islandCapsuleDividerDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
  },
  islandSpacer: {
    width: 32,
    height: 32,
  },

  // Search Header Morphing styles
  searchHeaderRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
    zIndex: 2,
  },
  searchBackBtn: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarFlex: {
    flex: 1,
    justifyContent: 'center',
  },
  searchCancelBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchCancelText: {
    fontSize: 15,
    fontWeight: '600',
  },

  // Island Unified Pill Search (Chế độ tìm kiếm liền khối Dynamic Island)
  islandSearchFlex: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  islandCancelBtn: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  islandCancelText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
  },

  // Capsule Cancel Button (Nút hủy chuẩn pill kính cho Frosted Capsule)
  capsuleCancelBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  capsuleCancelBtnLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    borderColor: 'rgba(255, 255, 255, 0.88)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: Platform.OS === 'android' ? 0 : 2,
  },
  capsuleCancelBtnDark: {
    backgroundColor: 'rgba(30, 36, 51, 0.60)',
    borderColor: 'rgba(255, 255, 255, 0.22)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: Platform.OS === 'android' ? 0 : 2,
  },

  // Floating Suggestions & Expanded Bottom Dropdown (Thẻ nổi tách biệt bên dưới Header)
  suggestionsDropdown: {
    position: 'absolute',
    left: 16,
    right: 16,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    zIndex: 9999,
  },
  suggestionsDropdownLight: {
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(0, 0, 0, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: Platform.OS === 'android' ? 3 : 2,
  },
  suggestionsDropdownDark: {
    backgroundColor: '#1E293B',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: Platform.OS === 'android' ? 3 : 2,
  },
  suggestionsScrollView: {
    maxHeight: 380,
  },
  suggestionsList: {
    paddingVertical: 6,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  suggestionBorderLight: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
  },
  suggestionBorderDark: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255, 255, 255, 0.10)',
  },
  suggestionIcon: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionTextContainer: {
    flex: 1,
  },
  suggestionLabel: {
    fontSize: 14.5,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  suggestionSublabel: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },

  // Bottom dock slot (Thanh phụ kiện bên dưới Header)
  bottomContentContainer: {
    width: '100%',
    paddingTop: 4,
    paddingBottom: 6,
  },
});

export const getHeaderBackgroundStyle = (color: string, opacity?: number) => ({
  backgroundColor: color,
  ...(opacity !== undefined ? { opacity } : null),
});

export const getCenterTitlePadding = (
  topInset: number,
  leftClearance: number,
  rightClearance?: number
) => ({
  paddingTop: topInset,
  paddingLeft: leftClearance,
  paddingRight: rightClearance !== undefined ? rightClearance : leftClearance,
});

export const getContainerHeight = (topInset: number, baseHeight?: number) => ({
  paddingTop: topInset,
  ...(baseHeight !== undefined
    ? { height: baseHeight + topInset }
    : { minHeight: 48 + topInset }),
});
