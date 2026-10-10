import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Eye,
  ArrowUpDown,
  Sparkles,
  Mail,
  Send,
  Trash2,
  Shield,
  User,
  Bell,
  CheckCircle2,
  Activity,
  WifiOff,
  Plus,
  Music,
  Play,
  Pause,
  X,
  ScanLine,
  Mic,
} from 'lucide-react-native';
import {
  AppText,
  AppButton,
  AppInput,
  AppSelect,
  AppSearchBar,
  AppBadge,
  AppSwitch,
  AppCheckbox,
  AppCard,
  AppleGlassCard,
  AppHeader,
  AppBottomNav,
  ConfirmDialog,
  AppActionSheet,
  Skeleton,
  CupertinoIconTile,
  GlassTile,
  EmptyState,
  AppSegmentedControl,
  AppAvatar,
  AppAvatarGroup,
  AppDivider,
  AppProgressBar,
  PaginationDots,
  AppRadioGroup,
  AppChip,
  AppOtpInput,
  AppRating,
  AppListItem,
  AppListGroup,
  AppToast,
  AppAccordion,
  AppBottomSheet,
  WidgetCard,
  GestureCard,
  OfflineBanner,
  LoadingOverlay,
} from '@/components';
import { ControlSize } from '@/constants/theme';
import type { PreviewCanvasBackground } from '../../../types';
import { haptics } from '@/utils';
import type { PreviewCanvasCardProps } from '../types';
import {
  canvasBgOptions,
  sampleSelectOptions,
  STATIC_BOTTOM_NAV_ITEMS,
} from '../constants';

export const PreviewCanvasCard: React.FC<PreviewCanvasCardProps> = React.memo(({
  component,
  themeColors,
  activeRadiusTokens,
  isDark,
  isGlassPreview,
  styles,
  canvasBg,
  setCanvasBg,
  getCanvasBackground,
  controlSize,
  effectiveControlVariant,
  effectiveButtonVariant,
  controlContrast,
  controlShadow,
  buttonIconColor,
  hasIcon,
  isLoading,
  isDisabled,
  isFullWidth,
  hasError,
  textVal,
  setTextVal,
  searchVal,
  setSearchVal,
  selectVal,
  setSelectVal,
  switchVal,
  setSwitchVal,
  checkboxVal,
  setCheckboxVal,
  headerVariant,
  headerPlacement,
  setHeaderPlacement,
  headerActionStyle,
  headerCenterSlot,
  headerExpansionPosition,
  headerCustomMode,
  setHeaderCustomMode,
  bottomNavVariant,
  bottomNavPlacement,
  setBottomNavPlacement,
  bottomNavIndicator,
  bottomNavItemLayout,
  bottomNavFabShape,
  bottomNavFabPlacement,
  bottomNavLiftOffset,
  bottomNavCustomFabType,
  bottomNavShowLabels,
  bottomNavHasFab,
  bottomNavHasTopContent,
  bottomNavCustomMode,
  setBottomNavCustomMode,
  activeBottomTab,
  setActiveBottomTab,
  miniPlayerPlaying,
  setMiniPlayerPlaying,
  cardVariant,
  cardDynamicRadiusStyle,
  badgeVariant,
  segmentedVariant,
  segmentedVal,
  setSegmentedVal,
  isDialogOpen,
  setIsDialogOpen,
  isSheetOpen,
  setIsSheetOpen,
  progressVal,
  setProgressVal,
  activeDot,
  setActiveDot,
  radioVal,
  setRadioVal,
  chipSelected,
  setChipSelected,
  chipVariant,
  otpVal,
  setOtpVal,
  otpSecure,
  ratingVal,
  setRatingVal,
  listSwitchVal,
  setListSwitchVal,
  isToastOpen,
  setIsToastOpen,
  toastType,
  accordionExpanded,
  setAccordionExpanded,
  isBottomSheetOpen,
  setIsBottomSheetOpen,
  dividerDashed,
  dividerThickness,
  avatarBadgeCount,
  avatarStatus,
  widgetRefreshing,
  setWidgetRefreshing,
  gestureAction,
  setGestureAction,
  isOfflineBannerVisible,
  setIsOfflineBannerVisible,
  loadingPosition,
  loadingVariant,
  loadingAnimType,
  loadingShowProgress,
  loadingProgressVal,
  isFullscreenLoading,
  setIsFullscreenLoading,
}) => {
  return (
    <AppCard style={styles.stageCard}>
      <View style={styles.stageHeader}>
        <View style={styles.stageHeaderLeft}>
          <Eye size={14} color="#6366F1" strokeWidth={2.4} />
          <AppText style={styles.stageTitle} numberOfLines={1}>
            SÂN KHẤU PREVIEW
          </AppText>
          {component.id === 'header' && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                haptics.medium();
                setHeaderPlacement((prev) => (prev === 'top' ? 'bottom' : 'top'));
              }}
              style={styles.placementToggleBtn}
            >
              <ArrowUpDown size={12} color={isDark ? '#A5B4FC' : '#4F46E5'} strokeWidth={2.4} />
              <AppText style={styles.placementToggleText}>
                {headerPlacement === 'top' ? 'Vị trí: Top' : 'Vị trí: Bottom'}
              </AppText>
            </TouchableOpacity>
          )}
          {component.id === 'bottom-nav' && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                haptics.medium();
                setBottomNavPlacement((prev) => (prev === 'bottom' ? 'top' : 'bottom'));
              }}
              style={styles.placementToggleBtn}
            >
              <ArrowUpDown size={12} color={isDark ? '#A5B4FC' : '#4F46E5'} strokeWidth={2.4} />
              <AppText style={styles.placementToggleText}>
                {bottomNavPlacement === 'bottom' ? 'Vị trí: Bottom' : 'Vị trí: Top'}
              </AppText>
            </TouchableOpacity>
          )}
        </View>
        <AppSegmentedControl<PreviewCanvasBackground>
          size="sm"
          fullWidth={false}
          options={canvasBgOptions}
          value={canvasBg}
          onChange={setCanvasBg}
        />
      </View>

      {/* The Isolated Canvas Viewport */}
      <View style={[styles.canvasViewport, { backgroundColor: getCanvasBackground() }]}>
        <View style={styles.canvasInner}>
          {/* Component Live Renderer */}
          {component.id === 'button' && (
            <View style={styles.buttonPreviewBox}>
              <AppButton
                size={controlSize}
                variant={effectiveButtonVariant}
                contrast={controlContrast}
                shadow={controlShadow}
                borderRadius={activeRadiusTokens.control}
                title="Bấm vào đây"
                loading={isLoading}
                disabled={isDisabled}
                fullWidth={isFullWidth}
                leftIcon={hasIcon ? <Sparkles size={ControlSize[controlSize].iconSize} color={buttonIconColor} /> : undefined}
                onPress={() => haptics.light()}
              />
            </View>
          )}

          {component.id === 'input' && (
            <AppInput
              size={controlSize}
              variant={effectiveControlVariant}
              contrast={controlContrast}
              shadow={controlShadow}
              borderRadius={activeRadiusTokens.control}
              label="Họ và Tên"
              placeholder="Nhập thông tin người dùng..."
              value={textVal}
              onChangeText={setTextVal}
              leftIcon={hasIcon ? <Mail size={ControlSize[controlSize].iconSize} color={themeColors.textSecondary} /> : undefined}
              error={hasError ? 'Thông tin nhập không hợp lệ' : undefined}
              disabled={isDisabled}
            />
          )}

          {component.id === 'select' && (
            <AppSelect
              size={controlSize}
              variant={effectiveControlVariant}
              contrast={controlContrast}
              shadow={controlShadow}
              borderRadius={activeRadiusTokens.control}
              label="Chọn Quốc Gia"
              options={sampleSelectOptions}
              value={selectVal}
              onSelect={(val) => setSelectVal(String(val))}
              sheetTitle="Danh Sách Quốc Gia"
              disabled={isDisabled}
            />
          )}

          {component.id === 'searchbar' && (
            <AppSearchBar
              size={controlSize}
              variant={effectiveControlVariant}
              contrast={controlContrast}
              shadow={controlShadow}
              borderRadius={activeRadiusTokens.control}
              placeholder="Tìm kiếm tài liệu, biên lai..."
              value={searchVal}
              onChangeText={setSearchVal}
              onFilterPress={() => haptics.light()}
            />
          )}

          {component.id === 'header' && (
            <View style={styles.headerWrapper}>
              <AppHeader
                title="EveSense Hub"
                subtitle="Node điều phối cảm biến"
                placement={headerPlacement}
                variant={headerVariant}
                contrast={controlContrast}
                actionStyle={headerActionStyle}
                showBack
                showMore
                searchable
                expansionPosition={headerExpansionPosition}
                isCustomMode={headerCustomMode}
                onCustomModeChange={setHeaderCustomMode}
                renderCustomHeader={({ close }) => (
                  <View style={styles.headerCustomBulkRow}>
                    <View style={styles.headerCustomBulkLeft}>
                      <View style={styles.headerCustomBulkBadge}>
                        <AppText style={styles.headerCustomBulkBadgeText}>3</AppText>
                      </View>
                      <AppText style={styles.headerCustomBulkTitle}>Bulk Action Bar</AppText>
                    </View>
                    <View style={styles.headerCustomBulkRight}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => haptics.success()}
                        style={styles.headerCustomBulkSaveBtn}
                      >
                        <AppText style={styles.headerCustomBulkSaveText}>Lưu hàng loạt</AppText>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          haptics.light();
                          close();
                        }}
                        style={styles.headerCustomBulkCancelBtn}
                      >
                        <AppText style={styles.headerCustomBulkCancelText}>Thoát</AppText>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                centerContent={
                  headerCenterSlot === 'select' ? (
                    <AppSelect
                      size="sm"
                      variant="filled"
                      backgroundColor="transparent"
                      borderWidth={0}
                      options={[
                        { label: 'EveSense Node #01', value: '1', sublabel: 'Phòng Server' },
                        { label: 'EveSense Node #02', value: '2', sublabel: 'Phòng Thí Nghiệm' },
                        { label: 'EveSense Node #03', value: '3', sublabel: 'Kho Trung Tâm' },
                      ]}
                      value="1"
                      onSelect={() => haptics.light()}
                      containerStyle={styles.headerCenterSelect}
                    />
                  ) : headerCenterSlot === 'searchbar' ? (
                    <AppSearchBar
                      size="sm"
                      variant="filled"
                      backgroundColor="transparent"
                      borderWidth={0}
                      placeholder="Tìm node cảm biến..."
                      style={styles.headerCenterSearchBar}
                    />
                  ) : undefined
                }
                suggestions={[
                  { id: '1', label: 'Cảm biến nhiệt độ DHT22', sublabel: 'Node #01 • Phòng Server', onPress: () => haptics.light() },
                  { id: '2', label: 'Cảm biến khí BME688', sublabel: 'Node #02 • Phòng Lab', onPress: () => haptics.light() },
                  { id: '3', label: 'Cảm biến rung Piezo', sublabel: 'Node #03 • Khu Kỹ Thuật', onPress: () => haptics.light() },
                ]}
                onBack={() => haptics.light()}
                onMore={() => haptics.light()}
              />
            </View>
          )}

          {component.id === 'bottom-nav' && (
            <View style={[styles.bottomNavPreviewWrapper, { paddingTop: Math.max(28, bottomNavLiftOffset + 10) }]}>
              <AppBottomNav
                items={STATIC_BOTTOM_NAV_ITEMS}
                activeKey={activeBottomTab}
                onChange={(key) => {
                  haptics.light();
                  setActiveBottomTab(key);
                }}
                placement={bottomNavPlacement}
                variant={bottomNavVariant}
                indicatorStyle={bottomNavIndicator}
                itemLayout={bottomNavItemLayout}
                contrast={controlContrast}
                showLabels={bottomNavShowLabels}
                safeArea={false}
                style={styles.bottomNavRelative}
                fabShape={bottomNavFabShape}
                fabPlacement={bottomNavFabPlacement}
                fabLiftOffset={bottomNavLiftOffset}
                centerFab={
                  !bottomNavHasFab
                    ? undefined
                    : bottomNavCustomFabType === 'ai-orb'
                    ? {
                        placement: bottomNavFabPlacement,
                        liftOffset: bottomNavLiftOffset,
                        customComponent: (
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => haptics.medium()}
                            style={[
                              styles.customFabOrb,
                              isDark ? styles.customFabHaloDark : styles.customFabHaloLight,
                            ]}
                          >
                            <Sparkles size={24} color="#FFFFFF" strokeWidth={2.2} />
                          </TouchableOpacity>
                        ),
                      }
                    : bottomNavCustomFabType === 'qr-radar'
                    ? {
                        placement: bottomNavFabPlacement,
                        liftOffset: bottomNavLiftOffset,
                        customComponent: (
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => haptics.medium()}
                            style={styles.customFabRadar}
                          >
                            <ScanLine size={23} color="#06B6D4" strokeWidth={2.3} />
                          </TouchableOpacity>
                        ),
                      }
                    : bottomNavCustomFabType === 'voice-wave'
                    ? {
                        placement: bottomNavFabPlacement,
                        liftOffset: bottomNavLiftOffset,
                        customComponent: (
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => haptics.medium()}
                            style={[
                              styles.customFabVoice,
                              isDark ? styles.customFabHaloDark : styles.customFabHaloLight,
                            ]}
                          >
                            <Mic size={22} color="#FFFFFF" strokeWidth={2.3} />
                          </TouchableOpacity>
                        ),
                      }
                    : {
                        icon: <Plus size={22} color="#FFFFFF" strokeWidth={2.5} />,
                        onPress: () => haptics.medium(),
                        accessibilityLabel: 'Tạo mới',
                        shape: bottomNavFabShape,
                        placement: bottomNavFabPlacement,
                        liftOffset: bottomNavLiftOffset,
                      }
                }
                topContent={
                  bottomNavHasTopContent ? (
                    <View
                      style={[
                        styles.bottomNavMiniPlayer,
                        isDark ? styles.bottomNavMiniPlayerDark : styles.bottomNavMiniPlayerLight,
                      ]}
                    >
                      <View style={styles.bottomNavMiniPlayerLeft}>
                        <View
                          style={[
                            styles.bottomNavMusicIconBox,
                            { backgroundColor: `${themeColors.primary}20` },
                          ]}
                        >
                          <Music size={15} color={themeColors.primary} />
                        </View>
                        <View style={styles.bottomNavMiniPlayerInfo}>
                          <AppText style={styles.bottomNavTrackTitle} numberOfLines={1}>
                            Midnight City • M83
                          </AppText>
                          <AppText style={styles.bottomNavTrackSubtitle} numberOfLines={1}>
                            {miniPlayerPlaying ? 'Đang phát • Hi-Res 24-bit' : 'Tạm dừng'}
                          </AppText>
                        </View>
                      </View>
                      <View style={styles.bottomNavMiniPlayerControls}>
                        <TouchableOpacity
                          onPress={() => {
                            haptics.light();
                            setMiniPlayerPlaying(!miniPlayerPlaying);
                          }}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                          style={styles.bottomNavMiniPlayerBtn}
                        >
                          {miniPlayerPlaying ? (
                            <Pause size={17} color={themeColors.text} />
                          ) : (
                            <Play size={17} color={themeColors.primary} fill={themeColors.primary} />
                          )}
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            haptics.light();
                            setMiniPlayerPlaying(false);
                          }}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                          style={styles.bottomNavMiniPlayerBtn}
                        >
                          <X size={16} color={themeColors.textSecondary} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : undefined
                }
                isCustomMode={bottomNavCustomMode}
                onCustomModeChange={setBottomNavCustomMode}
                renderCustomBottomNav={({ close }) => (
                  <View style={styles.bottomNavBulkBar}>
                    <View style={styles.bottomNavBulkLeft}>
                      <CheckCircle2 size={18} color={themeColors.primary} />
                      <AppText style={[styles.bottomNavBulkText, { color: themeColors.text }]}>
                        Đã chọn{' '}
                        <AppText style={styles.bottomNavBulkCount}>
                          3 mục
                        </AppText>
                      </AppText>
                    </View>
                    <View style={styles.bottomNavBulkRight}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          haptics.light();
                          close();
                        }}
                        style={[
                          styles.bottomNavBulkCancelBtn,
                          isDark ? styles.bottomNavBulkCancelBtnDark : styles.bottomNavBulkCancelBtnLight,
                        ]}
                      >
                        <AppText style={[styles.bottomNavBulkCancelText, { color: themeColors.textSecondary }]}>
                          Hủy
                        </AppText>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          haptics.medium();
                          close();
                        }}
                        style={styles.bottomNavBulkDeleteBtn}
                      >
                        <Trash2 size={14} color="#FFFFFF" />
                        <AppText style={styles.bottomNavBulkDeleteText}>Xóa</AppText>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          )}

          {component.id === 'apple-glass-card' && (
            <AppleGlassCard
              size={controlSize}
              contrast={controlContrast}
              borderRadius={activeRadiusTokens.card}
              balance="45,280.00"
              balanceLabel="SỐ DƯ TÀI KHOẢN"
              cardNumber="•••• 8829"
              cardHolder="EVE SENSE NODE"
              brandName="Apple Glass"
              onPress={() => haptics.light()}
            />
          )}

          {component.id === 'widget-card' && (
            <WidgetCard
              size={controlSize}
              contrast={controlContrast}
              borderRadius={activeRadiusTokens.card}
              title="Cảm Biến BME688"
              subtitle="Phòng Server Node #01"
              badge="Online"
              icon={<Activity size={controlSize === 'lg' ? 22 : controlSize === 'sm' ? 15 : 18} color="#007AFF" />}
              isRefreshing={widgetRefreshing}
              onRefresh={() => {
                haptics.light();
                setWidgetRefreshing(true);
                setTimeout(() => setWidgetRefreshing(false), 1200);
              }}
            >
              <View style={styles.cardContentGap}>
                <AppText style={styles.cardTitle}>Nhiệt độ: 24.5°C • Độ ẩm: 55%</AppText>
                <AppText style={styles.cardSubtitle}>Áp suất khí quyển: 1013.25 hPa • Trạng thái: Tốt</AppText>
              </View>
            </WidgetCard>
          )}

          {component.id === 'gesture-card' && (
            <GestureCard
              size={controlSize}
              contrast={controlContrast}
              borderRadius={activeRadiusTokens.card}
              title="Bàn Di Cảm Ứng Đa Điểm"
              description={gestureAction}
              onSwipeLeft={() => {
                haptics.light();
                setGestureAction('👈 Đã nhận diện cử chỉ: VUỐT TRÁI (Swipe Left)');
              }}
              onSwipeRight={() => {
                haptics.light();
                setGestureAction('👉 Đã nhận diện cử chỉ: VUỐT PHẢI (Swipe Right)');
              }}
              onDoubleTap={() => {
                haptics.success();
                setGestureAction('⚡ Đã nhận diện cử chỉ: CHẠM ĐÚP (Double Tap)');
              }}
            />
          )}

          {component.id === 'card' && (
            <AppCard
              size={controlSize}
              variant={cardVariant}
              contrast={controlContrast}
              borderRadius={activeRadiusTokens.card}
              style={cardDynamicRadiusStyle}
            >
              <View style={styles.cardContentGap}>
                <AppText style={styles.cardTitle}>
                  AppCard ({cardVariant.toUpperCase()})
                </AppText>
                <AppText style={styles.cardSubtitle}>
                  Khung bề mặt card với token bo góc radius.card ({activeRadiusTokens.card}px).
                </AppText>
              </View>
            </AppCard>
          )}

          {component.id === 'badge' && (
            <View style={styles.badgeCenterRow}>
              <AppBadge
                label={`Badge ${badgeVariant.toUpperCase()}`}
                variant={badgeVariant}
                contrast={controlContrast}
                size={controlSize}
                borderRadius={activeRadiusTokens.badge}
              />
            </View>
          )}

          {component.id === 'switch' && (
            <AppSwitch
              size={controlSize}
              contrast={controlContrast}
              label="Thông báo thời gian thực"
              sublabel="Bật để nhận cảnh báo tức thì từ webhook"
              value={switchVal}
              onValueChange={setSwitchVal}
              disabled={isDisabled}
            />
          )}

          {component.id === 'checkbox' && (
            <AppCheckbox
              size={controlSize}
              contrast={controlContrast}
              borderRadius={activeRadiusTokens.smControl}
              label="Tôi đồng ý xác nhận lưu sự kiện vào cơ sở dữ liệu SQLite"
              checked={checkboxVal}
              onChange={setCheckboxVal}
              disabled={isDisabled}
            />
          )}

          {component.id === 'confirm-dialog' && (
            <View style={styles.dialogPreviewBox}>
              <AppButton
                size={controlSize}
                contrast={controlContrast}
                variant="primary"
                title="Mở Thử Nghiệm Hộp Thoại"
                onPress={() => setIsDialogOpen(true)}
              />
              <ConfirmDialog
                size={controlSize}
                contrast={controlContrast}
                borderRadius={activeRadiusTokens.card}
                visible={isDialogOpen}
                title="Xác nhận lưu sự kiện?"
                message="Sự kiện này sẽ được ký số bằng HMAC-SHA256 và đưa vào hàng đợi SQLite."
                onConfirm={() => setIsDialogOpen(false)}
                onCancel={() => setIsDialogOpen(false)}
              />
            </View>
          )}

          {component.id === 'action-sheet' && (
            <View style={styles.sheetPreviewBox}>
              <AppButton
                size={controlSize}
                contrast={controlContrast}
                variant="tonal"
                title="Mở Cupertino Action Sheet"
                onPress={() => setIsSheetOpen(true)}
              />
              <AppActionSheet
                size={controlSize}
                contrast={controlContrast}
                borderRadius={activeRadiusTokens.card}
                visible={isSheetOpen}
                title="Tùy chọn Profile Cảm Biến"
                message="Chọn thao tác muốn áp dụng cho profile hiện tại"
                actions={[
                  {
                    id: '1',
                    label: 'Gửi ngay tới n8n Webhook',
                    icon: <Send size={16} color="#007AFF" />,
                    onPress: () => setIsSheetOpen(false),
                  },
                  {
                    id: '2',
                    label: 'Xóa khỏi Hàng Đợi',
                    icon: <Trash2 size={16} color="#EF4444" />,
                    destructive: true,
                    onPress: () => setIsSheetOpen(false),
                  },
                ]}
                onClose={() => setIsSheetOpen(false)}
              />
            </View>
          )}

          {component.id === 'skeleton' && (
            <View style={styles.skeletonStack}>
              <View style={styles.skeletonHeaderRow}>
                <Skeleton
                  width={controlSize === 'lg' ? 52 : controlSize === 'sm' ? 36 : 44}
                  height={controlSize === 'lg' ? 52 : controlSize === 'sm' ? 36 : 44}
                  borderRadius={controlSize === 'lg' ? 26 : controlSize === 'sm' ? 18 : 22}
                  contrast={controlContrast}
                />
                <View style={styles.skeletonCol}>
                  <Skeleton width="60%" height={controlSize === 'lg' ? 18 : controlSize === 'sm' ? 13 : 16} contrast={controlContrast} />
                  <Skeleton width="40%" height={controlSize === 'lg' ? 14 : controlSize === 'sm' ? 10 : 12} contrast={controlContrast} />
                </View>
              </View>
              <Skeleton width="100%" height={controlSize === 'lg' ? 14 : controlSize === 'sm' ? 10 : 12} contrast={controlContrast} />
              <Skeleton width="85%" height={controlSize === 'lg' ? 14 : controlSize === 'sm' ? 10 : 12} contrast={controlContrast} />
            </View>
          )}

          {component.id === 'icon-tile' && (
            <View style={styles.iconTileRow}>
              <CupertinoIconTile
                size={controlSize}
                contrast={controlContrast}
                borderRadius={activeRadiusTokens.control}
                icon={Sparkles}
                baseColor="#007AFF"
              />
              <GlassTile
                size={controlSize}
                contrast={controlContrast}
                borderRadius={activeRadiusTokens.control}
                icon={Shield}
                iconColor="#10B981"
                value="100%"
                label="Bảo Mật"
              />
            </View>
          )}

          {component.id === 'empty-state' && (
            <EmptyState
              size={controlSize}
              contrast={controlContrast}
              borderRadius={activeRadiusTokens.card}
              title="Hàng Đợi Trống"
              description="Không có sự kiện ngoại tuyến nào cần gửi."
              actionText="Chụp ảnh mới"
              onActionPress={() => haptics.light()}
            />
          )}

          {component.id === 'segmented-control' && (
            <View style={styles.segmentedPreviewBox}>
              <AppSegmentedControl<string>
                size={controlSize}
                contrast={controlContrast}
                variant={isGlassPreview ? 'glass' : segmentedVariant}
                borderRadius={activeRadiusTokens.control}
                options={[
                  { label: 'Tất Cả', value: 'all', badge: 14 },
                  { label: 'Đang Chờ', value: 'pending', badge: 3 },
                  { label: 'Hoàn Thành', value: 'completed' },
                ]}
                value={segmentedVal}
                onChange={setSegmentedVal}
                disabled={isDisabled}
              />
            </View>
          )}

          {component.id === 'avatar' && (
            <View style={styles.avatarPreviewBox}>
              <View style={styles.avatarRow}>
                <AppAvatar
                  name="Nguyen Van A"
                  size={controlSize}
                  status={avatarStatus}
                  badgeCount={avatarBadgeCount}
                />
                <AppAvatar
                  name="Eve Sense"
                  size={controlSize}
                  status="busy"
                />
                <AppAvatar
                  name="Tech Lead"
                  size={controlSize}
                  status="away"
                />
              </View>
              <AppAvatarGroup
                items={[
                  { name: 'Eve Sense' },
                  { name: 'John Doe' },
                  { name: 'Alice Smith' },
                  { name: 'Robert Taylor' },
                  { name: 'Emma Watson' },
                ]}
                max={4}
                size={controlSize}
              />
            </View>
          )}

          {component.id === 'divider' && (
            <View style={styles.dividerStack}>
              <AppDivider size={controlSize} label="HOẶC TIẾP TỤC VỚI" contrast={controlContrast} />
              <AppDivider size={controlSize} dashed={dividerDashed} thickness={dividerThickness} contrast={controlContrast} />
            </View>
          )}

          {component.id === 'progress' && (
            <View style={styles.progressStack}>
              <AppProgressBar
                progress={progressVal}
                size={controlSize}
                contrast={controlContrast}
                borderRadius={activeRadiusTokens.pill}
                showLabel
                animated
                labelPosition="top"
              />
              <View style={styles.progressControlRow}>
                <AppButton
                  size="sm"
                  variant="tonal"
                  title="-10%"
                  onPress={() => setProgressVal((p) => Math.max(0, p - 10))}
                />
                <AppButton
                  size="sm"
                  variant={progressVal === 25 ? 'primary' : 'outline'}
                  title="25%"
                  onPress={() => setProgressVal(25)}
                />
                <AppButton
                  size="sm"
                  variant={progressVal === 50 ? 'primary' : 'outline'}
                  title="50%"
                  onPress={() => setProgressVal(50)}
                />
                <AppButton
                  size="sm"
                  variant={progressVal === 75 ? 'primary' : 'outline'}
                  title="75%"
                  onPress={() => setProgressVal(75)}
                />
                <AppButton
                  size="sm"
                  variant={progressVal === 100 ? 'primary' : 'outline'}
                  title="100%"
                  onPress={() => setProgressVal(100)}
                />
                <AppButton
                  size="sm"
                  variant="tonal"
                  title="+10%"
                  onPress={() => setProgressVal((p) => Math.min(100, p + 10))}
                />
              </View>
            </View>
          )}

          {component.id === 'pagination' && (
            <View style={styles.paginationBox}>
              <PaginationDots
                count={5}
                activeIndex={activeDot}
                onDotPress={setActiveDot}
                size={controlSize}
                activeWidth={controlSize === 'lg' ? 30 : controlSize === 'sm' ? 18 : 24}
                contrast={controlContrast}
              />
              <AppText style={styles.cardSubtitle}>
                Chạm vào chấm để chuyển trang: {activeDot + 1} / 5
              </AppText>
            </View>
          )}

          {component.id === 'radio' && (
            <AppRadioGroup
              size={controlSize}
              contrast={controlContrast}
              borderRadius={activeRadiusTokens.control}
              options={[
                {
                  label: 'Thanh toán thẻ Visa / Mastercard',
                  sublabel: 'Phí giao dịch 0% • Xử lý tức thì',
                  value: 'card',
                },
                {
                  label: 'Chuyển khoản QR ngân hàng',
                  sublabel: 'VietQR 24/7 tức thì có hóa đơn VAT',
                  value: 'bank',
                },
                {
                  label: 'Ví điện tử MoMo / Apple Pay',
                  sublabel: 'Xác thực sinh trắc học FaceID',
                  value: 'wallet',
                },
              ]}
              value={radioVal}
              onChange={setRadioVal}
            />
          )}

          {component.id === 'chip' && (
            <View style={styles.chipRow}>
              <AppChip
                size={controlSize}
                contrast={controlContrast}
                borderRadius={activeRadiusTokens.pill}
                label="Công nghệ"
                variant={chipVariant}
                selected={chipSelected}
                icon={<Sparkles size={controlSize === 'lg' ? 16 : controlSize === 'sm' ? 12 : 14} color={chipSelected ? themeColors.primary : themeColors.textSecondary} />}
                onPress={() => setChipSelected(!chipSelected)}
                onRemove={() => haptics.light()}
              />
              <AppChip
                size={controlSize}
                contrast={controlContrast}
                borderRadius={activeRadiusTokens.pill}
                label="Thiết kế UI"
                variant={chipVariant}
                selected={!chipSelected}
                onPress={() => setChipSelected(!chipSelected)}
              />
              <AppChip
                size={controlSize}
                contrast={controlContrast}
                borderRadius={activeRadiusTokens.pill}
                label="Kính Glass"
                variant="glass"
                selected={true}
                icon={<Shield size={controlSize === 'lg' ? 16 : controlSize === 'sm' ? 12 : 14} color={themeColors.primary} />}
              />
            </View>
          )}

          {component.id === 'otp' && (
            <View style={styles.otpBox}>
              <AppOtpInput
                length={6}
                size={controlSize}
                contrast={controlContrast}
                borderRadius={activeRadiusTokens.control}
                value={otpVal}
                onChange={setOtpVal}
                secureTextEntry={otpSecure}
              />
              <AppText style={styles.cardSubtitle}>
                Mã OTP đang nhập: {otpVal || '(trống)'}
              </AppText>
            </View>
          )}

          {component.id === 'rating' && (
            <View style={styles.ratingBox}>
              <AppRating
                value={ratingVal}
                onChange={setRatingVal}
                size={controlSize}
                contrast={controlContrast}
                showScore
              />
              <View style={styles.ratingButtonRow}>
                {[1, 2.5, 3.5, 4, 4.5, 5].map((star) => (
                  <AppButton
                    key={star}
                    size="sm"
                    variant={ratingVal === star ? 'primary' : 'outline'}
                    title={`${star}★`}
                    onPress={() => setRatingVal(star)}
                  />
                ))}
              </View>
            </View>
          )}

          {component.id === 'list-item' && (
            <View style={styles.listItemGroupBox}>
              <AppListGroup
                title="TÀI KHOẢN & BẢO MẬT"
                size={controlSize}
                contrast={controlContrast}
                variant={isGlassPreview ? 'glass' : 'card'}
                borderRadius={activeRadiusTokens.card}
                style={styles.previewListGroup}
              >
                <AppListItem
                  size={controlSize}
                  contrast={controlContrast}
                  leading={<User size={controlSize === 'lg' ? 20 : controlSize === 'sm' ? 16 : 18} color={themeColors.primary} />}
                  title="Thông tin cá nhân"
                  subtitle="Ảnh đại diện, email và số điện thoại"
                  onPress={() => haptics.light()}
                />
                <AppListItem
                  size={controlSize}
                  contrast={controlContrast}
                  leading={<Bell size={controlSize === 'lg' ? 20 : controlSize === 'sm' ? 16 : 18} color="#10B981" />}
                  title="Thông báo tức thời"
                  trailing={<AppSwitch size={controlSize} contrast={controlContrast} value={listSwitchVal} onValueChange={setListSwitchVal} />}
                />
                <AppListItem
                  size={controlSize}
                  contrast={controlContrast}
                  leading={<Trash2 size={controlSize === 'lg' ? 20 : controlSize === 'sm' ? 16 : 18} color="#EF4444" />}
                  title="Đăng xuất khỏi thiết bị"
                  destructive
                  onPress={() => haptics.light()}
                />
              </AppListGroup>
            </View>
          )}

          {component.id === 'toast' && (
            <View style={styles.toastBox}>
              <AppButton
                title="Kích Hoạt Toast Nổi (AppToast)"
                variant="primary"
                size={controlSize}
                contrast={controlContrast}
                leftIcon={<CheckCircle2 size={16} color="#FFFFFF" />}
                onPress={() => setIsToastOpen(true)}
              />
              <AppToast
                visible={isToastOpen}
                type={toastType}
                size={controlSize}
                contrast={controlContrast}
                borderRadius={activeRadiusTokens.card}
                title="EveSense System"
                message="Dữ liệu cảm biến đã được đồng bộ an toàn!"
                onDismiss={() => setIsToastOpen(false)}
              />
            </View>
          )}

          {component.id === 'accordion' && (
            <View style={styles.accordionBox}>
              <AppAccordion
                size={controlSize}
                contrast={controlContrast}
                borderRadius={activeRadiusTokens.card}
                title="Cảm biến EveSense hoạt động thế nào?"
                subtitle="Thông tin giao thức kết nối BLE & Mesh"
                icon={<Shield size={controlSize === 'lg' ? 18 : controlSize === 'sm' ? 14 : 16} color={themeColors.primary} />}
                expanded={accordionExpanded}
                onToggle={setAccordionExpanded}
              >
                <AppText style={styles.cardSubtitle}>
                  Node cảm biến thu thập nhiệt độ, độ ẩm và gia tốc đa trục trong chu kỳ 100ms. Dữ liệu sau đó được mã hóa AES-256 và truyền tới trạm thu phát.
                </AppText>
              </AppAccordion>
            </View>
          )}

          {component.id === 'bottom-sheet' && (
            <View style={styles.toastBox}>
              <AppButton
                title="Mở Bảng Vuốt Trượt (AppBottomSheet)"
                variant="primary"
                size={controlSize}
                contrast={controlContrast}
                leftIcon={<Plus size={16} color="#FFFFFF" />}
                onPress={() => setIsBottomSheetOpen(true)}
              />
              <AppBottomSheet
                visible={isBottomSheetOpen}
                size={controlSize}
                contrast={controlContrast}
                borderRadius={activeRadiusTokens.card}
                title="Bộ Lọc Nâng Cao"
                subtitle="Tùy chỉnh thông số hiển thị"
                snapPoint="half"
                onClose={() => setIsBottomSheetOpen(false)}
              >
                <View style={styles.cardContentGap}>
                  <AppText style={styles.cardTitle}>Nội Dung Bảng Vuốt</AppText>
                  <AppText style={styles.cardSubtitle}>
                    AppBottomSheet cho phép bạn đặt bất kỳ khối điều khiển nào vào bên trong, từ form nhập liệu đến danh sách kiểm tra.
                  </AppText>
                  <AppButton
                    title="Áp Dụng Bộ Lọc"
                    variant="primary"
                    size={controlSize}
                    contrast={controlContrast}
                    onPress={() => setIsBottomSheetOpen(false)}
                  />
                </View>
              </AppBottomSheet>
            </View>
          )}

          {component.id === 'offline-banner' && (
            <View style={styles.toastBox}>
              <AppButton
                title={isOfflineBannerVisible ? 'Ẩn Banner Mất Mạng' : 'Bật Thử Nghiệm Banner Mất Mạng'}
                variant={isOfflineBannerVisible ? 'danger' : 'primary'}
                size={controlSize}
                contrast={controlContrast}
                leftIcon={<WifiOff size={16} color="#FFFFFF" />}
                onPress={() => setIsOfflineBannerVisible(!isOfflineBannerVisible)}
              />
              {isOfflineBannerVisible && (
                <OfflineBanner
                  size={controlSize}
                  contrast={controlContrast}
                  borderRadius={activeRadiusTokens.card}
                  message="Không có kết nối mạng Internet. Đang sử dụng SQLite cục bộ."
                  onRetry={() => {
                    haptics.light();
                    setIsOfflineBannerVisible(false);
                  }}
                />
              )}
            </View>
          )}

          {component.id === 'loading-overlay' && (
            <View style={styles.loadingPreviewBox}>
              <AppButton
                title={isFullscreenLoading ? 'Đang bật HUD Toàn Màn Hình...' : 'Bật Thử Nghiệm Loading Toàn Màn Hình'}
                variant="primary"
                size="sm"
                contrast={controlContrast}
                leftIcon={<Sparkles size={14} color="#FFFFFF" />}
                onPress={() => {
                  haptics.light();
                  setIsFullscreenLoading(true);
                  setTimeout(() => setIsFullscreenLoading(false), 2400);
                }}
                style={styles.fullscreenTestBtn}
              />
              <LoadingOverlay
                visible={true}
                message="Đang đồng bộ dữ liệu..."
                subMessage="Đang xử lý qua New Architecture JSI"
                position={loadingPosition}
                variant={loadingVariant}
                animationType={loadingAnimType}
                borderRadius={activeRadiusTokens.card}
                contrast={controlContrast}
                progress={loadingShowProgress ? loadingProgressVal : undefined}
              />
              {isFullscreenLoading && (
                <LoadingOverlay
                  visible={true}
                  fullscreen
                  position="center"
                  variant={loadingVariant}
                  animationType={loadingAnimType}
                  borderRadius={activeRadiusTokens.card}
                  contrast={controlContrast}
                  message="Đang đồng bộ dữ liệu..."
                  subMessage="Đang xử lý qua New Architecture JSI"
                  progress={loadingShowProgress ? loadingProgressVal : undefined}
                  onDismiss={() => setIsFullscreenLoading(false)}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </AppCard>
  );
});
