import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  SlidersHorizontal,
  RotateCcw,
  LayoutGrid,
  ArrowRight,
} from 'lucide-react-native';
import {
  AppText,
  AppButton,
  AppSelect,
  AppSwitch,
  AppCard,
  AppSegmentedControl,
} from '@/components';
import { type RadiusPreset } from '@/constants/theme';
import { haptics } from '@/utils';
import { InteractiveScrubber } from '../../InteractiveScrubber';
import type { PreviewControlsCardProps, ShadowLevel } from '../types';
import {
  sizeOptions,
  segmentedVariantOptions,
  buttonVariantOptions,
  controlVariantOptions,
  contrastOptions,
  shadowOptions,
  cardVariantOptions,
  headerVariantOptions,
  headerPlacementOptions,
  headerActionStyleOptions,
  headerCenterSlotOptions,
  headerExpansionPositionOptions,
  bottomNavVariantOptions,
  bottomNavPlacementOptions,
  bottomNavIndicatorOptions,
  bottomNavItemLayoutOptions,
  bottomNavFabShapeOptions,
  bottomNavFabPlacementOptions,
  bottomNavCustomFabTypeOptions,
  badgeVariantOptions,
  loadingPositionOptions,
  loadingVariantOptions,
  loadingAnimOptions,
} from '../constants';

const formatRadiusScrubber = (val: number) =>
  val === 0 ? '0px (Vuông)' : val >= 24 ? `${val}px (Pill)` : `${val}px`;

const formatLiftOffsetScrubber = (val: number) =>
  val === 0 ? '0px (Chìm)' : val === 22 ? '22px (Chuẩn)' : `${val}px (${val > 22 ? 'Nhô cao' : 'Nhô nhẹ'})`;

const formatBadgeCountScrubber = (val: number) =>
  val === 0 ? 'Tắt huy hiệu' : `${val} thông báo`;

const formatPaginationScrubber = (val: number) => `Trang ${val + 1} / 5`;

const RADIUS_PRESET_SEGMENT_OPTIONS = [
  { label: 'Hệ Thống', value: 'system' as const },
  { label: 'Sắc Nét', value: 'sharp' as const },
  { label: 'Gọn Gàng', value: 'compact' as const },
  { label: 'Chuẩn', value: 'standard' as const },
  { label: 'Pill', value: 'smooth' as const },
];

const CHIP_VARIANT_OPTIONS = [
  { label: 'Filled (Nền Đầy)', value: 'filled' },
  { label: 'Outline (Viền Mảnh)', value: 'outline' },
  { label: 'Glass (Kính Mờ)', value: 'glass' },
];

const TOAST_TYPE_OPTIONS = [
  { label: 'Success', value: 'success' as const },
  { label: 'Error', value: 'error' as const },
  { label: 'Warning', value: 'warning' as const },
  { label: 'Info', value: 'info' as const },
];

const AVATAR_STATUS_OPTIONS = [
  { label: 'Online', value: 'online' as const },
  { label: 'Bận', value: 'busy' as const },
  { label: 'Vắng', value: 'away' as const },
  { label: 'Ẩn', value: 'offline' as const },
];

const LOADING_PROGRESS_OPTIONS = [
  { label: '25%', value: '25' },
  { label: '50%', value: '50' },
  { label: '68%', value: '68' },
  { label: '85%', value: '85' },
  { label: '100%', value: '100' },
];

export const PreviewControlsCard: React.FC<PreviewControlsCardProps> = React.memo(({
  component,
  themeColors,
  radiusTokens,
  activeRadiusTokens,
  isDark,
  isGlass,
  isGlassPreview,
  setIsGlassPreview,
  styles,
  overrideRadius,
  setOverrideRadius,
  setCustomRadiusValue,
  currentScrubberValue,
  isFullySystemSynced,
  handleResetToSystem,
  onOpenLayoutLab,
  controlSize,
  setControlSize,
  controlContrast,
  setControlContrast,
  controlShadow,
  setControlShadow,
  controlVariant,
  setControlVariant,
  buttonVariant,
  setButtonVariant,
  isLoading,
  setIsLoading,
  isDisabled,
  setIsDisabled,
  hasIcon,
  setHasIcon,
  hasError,
  setHasError,
  isFullWidth,
  setIsFullWidth,
  cardVariant,
  setCardVariant,
  badgeVariant,
  setBadgeVariant,
  segmentedVariant,
  setSegmentedVariant,
  headerVariant,
  setHeaderVariant,
  headerPlacement,
  setHeaderPlacement,
  headerActionStyle,
  setHeaderActionStyle,
  headerCenterSlot,
  setHeaderCenterSlot,
  headerExpansionPosition,
  setHeaderExpansionPosition,
  headerCustomMode,
  setHeaderCustomMode,
  bottomNavVariant,
  setBottomNavVariant,
  bottomNavPlacement,
  setBottomNavPlacement,
  bottomNavIndicator,
  setBottomNavIndicator,
  bottomNavItemLayout,
  setBottomNavItemLayout,
  bottomNavFabShape,
  setBottomNavFabShape,
  bottomNavFabPlacement,
  setBottomNavFabPlacement,
  bottomNavLiftOffset,
  setBottomNavLiftOffset,
  bottomNavCustomFabType,
  setBottomNavCustomFabType,
  bottomNavShowLabels,
  setBottomNavShowLabels,
  bottomNavHasFab,
  setBottomNavHasFab,
  bottomNavHasTopContent,
  setBottomNavHasTopContent,
  bottomNavCustomMode,
  setBottomNavCustomMode,
  chipVariant,
  setChipVariant,
  otpSecure,
  setOtpSecure,
  toastType,
  setToastType,
  dividerDashed,
  setDividerDashed,
  dividerThickness,
  setDividerThickness,
  avatarBadgeCount,
  setAvatarBadgeCount,
  avatarStatus,
  setAvatarStatus,
  progressVal,
  setProgressVal,
  ratingVal,
  setRatingVal,
  activeDot,
  setActiveDot,
  widgetRefreshing,
  setWidgetRefreshing,
  setGestureAction,
  loadingPosition,
  setLoadingPosition,
  loadingVariant,
  setLoadingVariant,
  loadingAnimType,
  setLoadingAnimType,
  loadingShowProgress,
  setLoadingShowProgress,
  loadingProgressVal,
  setLoadingProgressVal,
}) => {
  return (
    <AppCard style={styles.controlsCard}>
      <View style={styles.sectionHeaderRow}>
        <SlidersHorizontal size={14} color={themeColors.primary} strokeWidth={2.4} />
        <AppText style={[styles.sectionLabel, { color: themeColors.text }]}>
          BẢNG ĐIỀU KHIỂN THUỘC TÍNH (PROPS INSPECTOR)
        </AppText>
      </View>

      {/* Universal Theme & Surface Lab (Chế độ Kính & Bo Góc Đồng Bộ) */}
      <View style={styles.controlGroup}>
        <View style={styles.sectionHeaderBetween}>
          <AppText style={[styles.specTileLabel, { color: themeColors.textSecondary }]}>
            BO GÓC LINH KIỆN (CORNER RADIUS)
          </AppText>
          {!isFullySystemSynced && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleResetToSystem}
              style={[
                styles.resetSystemBtn,
                isDark ? styles.resetSystemBtnDark : styles.resetSystemBtnLight,
              ]}
            >
              <RotateCcw size={11} color={themeColors.primary} strokeWidth={2.4} />
              <AppText style={[styles.resetSystemBtnText, { color: themeColors.primary }]}>
                Khôi phục hệ thống
              </AppText>
            </TouchableOpacity>
          )}
        </View>

        {/* Sync Status Banner */}
        <View
          style={[
            styles.syncStatusBanner,
            isFullySystemSynced
              ? isDark
                ? styles.syncStatusBannerSystemDark
                : styles.syncStatusBannerSystemLight
              : isDark
              ? styles.syncStatusBannerCustomDark
              : styles.syncStatusBannerCustomLight,
          ]}
        >
          <View style={styles.syncStatusLeft}>
            <View
              style={[
                styles.syncStatusDot,
                isFullySystemSynced
                  ? styles.syncStatusDotSystem
                  : styles.syncStatusDotCustom,
              ]}
            />
            <AppText
              style={
                isFullySystemSynced
                  ? styles.syncStatusTextSystem
                  : styles.syncStatusTextCustom
              }
            >
              {isFullySystemSynced
                ? `Mặc định theo hệ thống: ${radiusTokens.name} (${activeRadiusTokens.control >= 999 ? 'Pill' : `${activeRadiusTokens.control}px`})`
                : `Đang thử nghiệm độc lập: ${activeRadiusTokens.control >= 999 ? 'Pill' : `${activeRadiusTokens.control}px`}`}
            </AppText>
          </View>
        </View>

        <AppSegmentedControl<RadiusPreset | 'system'>
          size="md"
          options={RADIUS_PRESET_SEGMENT_OPTIONS}
          value={overrideRadius}
          onChange={(val) => {
            haptics.light();
            setCustomRadiusValue(null);
            setOverrideRadius(val);
          }}
        />
      </View>

      {/* Live Drag Scrubber for Corner Radius */}
      <View style={styles.controlGroup}>
        <InteractiveScrubber
          label="Kéo Chỉnh Radius Độc Lập"
          value={currentScrubberValue}
          min={0}
          max={32}
          step={1}
          unit="px"
          formatValue={formatRadiusScrubber}
          themeColors={themeColors}
          isDark={isDark}
          onChange={(val) => {
            setCustomRadiusValue(val);
          }}
        />
      </View>

      {/* Live Liquid Glass Mode Switch */}
      <View style={styles.controlGroup}>
        <AppSwitch
          label="Chế Độ Kính Mờ (Apple Liquid Glass)"
          sublabel={
            isGlassPreview === isGlass
              ? `Mặc định theo hệ thống: ${isGlass ? 'Đang bật' : 'Đang tắt'}`
              : 'Đang thử nghiệm độc lập trong Storybook'
          }
          value={isGlassPreview}
          onValueChange={setIsGlassPreview}
        />
      </View>

      {/* Size Switcher (Standardized via AppSegmentedControl) */}
      {component.hasParity && (
        <View style={styles.controlGroup}>
          <AppText style={[styles.specTileLabel, { color: themeColors.textSecondary }]}>
            KÍCH THƯỚC CHUẨN HOÁ (CONTROL SIZE)
          </AppText>
          <AppSegmentedControl
            size="md"
            options={sizeOptions}
            value={controlSize}
            onChange={setControlSize}
          />
        </View>
      )}

      {/* Segmented Variant Selector */}
      {component.id === 'segmented-control' && (
        <View style={styles.controlGroup}>
          <AppSelect
            label="BIẾN THỂ PHÂN ĐOẠN (VARIANT)"
            options={segmentedVariantOptions}
            value={segmentedVariant}
            onSelect={(val) => {
              haptics.light();
              setSegmentedVariant(val as any);
            }}
            sheetTitle="Chọn Biến Thể AppSegmentedControl"
          />
        </View>
      )}

      {/* Button Variant Selector */}
      {component.id === 'button' && (
        <View style={styles.controlGroup}>
          <AppSelect
            label="BIẾN THỂ BUTTON (VARIANT)"
            options={buttonVariantOptions}
            value={buttonVariant}
            onSelect={(val) => {
              haptics.light();
              setButtonVariant(val as any);
            }}
            sheetTitle="Chọn Biến Thể Button"
          />
        </View>
      )}

      {/* Surface Variant Selector for Inputs, Selects, and SearchBar */}
      {(component.id === 'input' || component.id === 'select' || component.id === 'searchbar') && (
        <View style={styles.controlGroup}>
          <AppSelect
            label="BIẾN THỂ BỀ MẶT (SURFACE VARIANT)"
            options={controlVariantOptions}
            value={controlVariant}
            onSelect={(val) => {
              haptics.light();
              setControlVariant(val as any);
            }}
            sheetTitle="Chọn Biến Thể Bề Mặt (Surface Variant)"
          />
        </View>
      )}

      {/* Contrast Level Control for All UI Components */}
      <View style={styles.controlGroup}>
        <AppText style={[styles.specTileLabel, { color: themeColors.textSecondary }]}>
          MỨC ĐỘ TƯƠNG PHẢN (CONTRAST LEVEL)
        </AppText>
        <AppSegmentedControl
          size="md"
          options={contrastOptions}
          value={controlContrast}
          onChange={setControlContrast}
        />
      </View>

      {/* Shadow Elevation Control for Form Primitives and Button */}
      {(component.id === 'input' ||
        component.id === 'select' ||
        component.id === 'searchbar' ||
        component.id === 'button') && (
        <View style={styles.controlGroup}>
          <AppText style={[styles.specTileLabel, { color: themeColors.textSecondary }]}>
            BÓNG ĐỔ KHỐI NỔI (SHADOW ELEVATION)
          </AppText>
          <AppSegmentedControl<ShadowLevel>
            size="md"
            options={shadowOptions}
            value={controlShadow}
            onChange={setControlShadow}
          />
        </View>
      )}

      {component.id === 'card' && (
        <View style={styles.controlGroup}>
          <AppSelect
            label="BIẾN THỂ THẺ (CARD VARIANT)"
            options={cardVariantOptions}
            value={cardVariant}
            onSelect={(val) => {
              haptics.light();
              setCardVariant(val as any);
            }}
            sheetTitle="Chọn Biến Thể Thẻ Bề Mặt"
          />
        </View>
      )}

      {component.id === 'header' && (
        <>
          {onOpenLayoutLab && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.layoutLabBanner}
              onPress={() => {
                haptics.light();
                onOpenLayoutLab();
              }}
            >
              <View style={styles.layoutLabBannerLeft}>
                <View style={styles.layoutLabBannerIcon}>
                  <LayoutGrid size={16} color="#FFFFFF" strokeWidth={2.4} />
                </View>
                <View style={styles.layoutLabBannerTextCol}>
                  <AppText style={styles.layoutLabBannerTitle}>
                    Phòng Thí Nghiệm Bố Cục (Layout Lab)
                  </AppText>
                  <AppText style={styles.layoutLabBannerSub}>
                    Mở trang test tương tác toàn diện: cuộn giữa 5 chế độ & kéo offset live
                  </AppText>
                </View>
              </View>
              <ArrowRight size={16} color="#6366F1" strokeWidth={2.4} />
            </TouchableOpacity>
          )}
          <View style={styles.controlGroup}>
            <AppSelect
              label="KIỂU THANH TIÊU ĐỀ (HEADER VARIANT)"
              options={headerVariantOptions}
              value={headerVariant}
              onSelect={(val) => {
                haptics.light();
                setHeaderVariant(val as any);
              }}
              sheetTitle="Chọn Kiểu Biến Thể Thanh Tiêu Đề"
            />
          </View>
          <View style={styles.controlGroup}>
            <AppSelect
              label="VỊ TRÍ THANH TIÊU ĐỀ (PLACEMENT)"
              options={headerPlacementOptions}
              value={headerPlacement}
              onSelect={(val) => {
                haptics.light();
                setHeaderPlacement(val as 'top' | 'bottom');
              }}
              sheetTitle="Chọn Vị Trí Thanh Tiêu Đề"
            />
          </View>
          <View style={styles.controlGroup}>
            <AppSelect
              label="KIỂU NÚT HÀNH ĐỘNG (ACTION STYLE)"
              options={headerActionStyleOptions}
              value={headerActionStyle}
              onSelect={(val) => {
                haptics.light();
                setHeaderActionStyle(val as any);
              }}
              sheetTitle="Chọn Kiểu Nút Hành Động"
            />
          </View>
          <View style={styles.controlGroup}>
            <AppSelect
              label="THÀNH PHẦN TRUNG TÂM (CENTER SLOT)"
              options={headerCenterSlotOptions}
              value={headerCenterSlot}
              onSelect={(val) => {
                haptics.light();
                setHeaderCenterSlot(val as any);
              }}
              sheetTitle="Chọn Thành Phần Trung Tâm"
            />
          </View>
          <View style={styles.controlGroup}>
            <AppSelect
              label="VỊ TRÍ MỞ RỘNG (EXPANSION POSITION)"
              options={headerExpansionPositionOptions}
              value={headerExpansionPosition}
              onSelect={(val) => {
                haptics.light();
                setHeaderExpansionPosition(val as any);
              }}
              sheetTitle="Chọn Vị Trí Mở Rộng Header"
            />
          </View>
          <View style={styles.controlGroup}>
            <AppSwitch
              label="CHẾ ĐỘ THAY THẾ TOÀN PHẦN (FULL REPLACEMENT)"
              sublabel="Thay thế vị trí Header bằng Bulk Action Toolbar linh hoạt"
              value={headerCustomMode}
              onValueChange={(val) => {
                haptics.light();
                setHeaderCustomMode(val);
              }}
            />
          </View>
        </>
      )}

      {component.id === 'bottom-nav' && (
        <>
          {onOpenLayoutLab && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.layoutLabBanner}
              onPress={() => {
                haptics.light();
                onOpenLayoutLab();
              }}
            >
              <View style={styles.layoutLabBannerLeft}>
                <View style={styles.layoutLabBannerIcon}>
                  <LayoutGrid size={16} color="#FFFFFF" strokeWidth={2.4} />
                </View>
                <View style={styles.layoutLabBannerTextCol}>
                  <AppText style={styles.layoutLabBannerTitle}>
                    Phòng Thí Nghiệm Bố Cục (Layout Lab)
                  </AppText>
                  <AppText style={styles.layoutLabBannerSub}>
                    Mở trang test tương tác toàn diện: cuộn giữa 5 chế độ & kéo offset live
                  </AppText>
                </View>
              </View>
              <ArrowRight size={16} color="#6366F1" strokeWidth={2.4} />
            </TouchableOpacity>
          )}
          <View style={styles.controlGroup}>
            <AppSelect
              label="BIẾN THỂ PHONG CÁCH (VARIANT)"
              options={bottomNavVariantOptions}
              value={bottomNavVariant}
              onSelect={(val) => {
                haptics.light();
                setBottomNavVariant(val as any);
              }}
              sheetTitle="Chọn Biến Thể Thanh Điều Hướng Dưới"
            />
          </View>
          <View style={styles.controlGroup}>
            <AppSelect
              label="VỊ TRÍ THANH ĐIỀU HƯỚNG (PLACEMENT)"
              options={bottomNavPlacementOptions}
              value={bottomNavPlacement}
              onSelect={(val) => {
                haptics.light();
                setBottomNavPlacement(val as any);
              }}
              sheetTitle="Chọn Vị Trí Thanh Điều Hướng"
            />
          </View>
          <View style={styles.controlGroup}>
            <AppSelect
              label="CHỈ BÁO TAB KÍCH HOẠT (INDICATOR)"
              options={bottomNavIndicatorOptions}
              value={bottomNavIndicator}
              onSelect={(val) => {
                haptics.light();
                setBottomNavIndicator(val as any);
              }}
              sheetTitle="Chọn Kiểu Chỉ Báo Active Tab"
            />
          </View>
          <View style={styles.controlGroup}>
            <AppSelect
              label="BỐ CỤC MỤC TAB (ITEM LAYOUT)"
              options={bottomNavItemLayoutOptions}
              value={bottomNavItemLayout}
              onSelect={(val) => {
                haptics.light();
                setBottomNavItemLayout(val as any);
              }}
              sheetTitle="Chọn Bố Cục Hiển Thị Mục Tab"
            />
          </View>
          <View style={styles.controlGroup}>
            <AppSwitch
              label="HIỂN THỊ NHÃN CHỮ (LABELS)"
              sublabel="Hiển thị văn bản chú thích bên dưới biểu tượng"
              value={bottomNavShowLabels}
              onValueChange={(val) => {
                haptics.light();
                setBottomNavShowLabels(val);
              }}
            />
          </View>
          <View style={styles.controlGroup}>
            <AppSwitch
              label="NÚT HÀNH ĐỘNG NỔI TRUNG TÂM (CENTER FAB)"
              sublabel="Thêm nút Floating Action Button nhô cao ở giữa"
              value={bottomNavHasFab}
              onValueChange={(val) => {
                haptics.light();
                setBottomNavHasFab(val);
              }}
            />
          </View>
          {bottomNavHasFab && (
            <>
              <View style={styles.controlGroup}>
                <AppSelect
                  label="LOẠI COMPONENT TRUNG TÂM (FAB TYPE)"
                  options={bottomNavCustomFabTypeOptions}
                  value={bottomNavCustomFabType}
                  onSelect={(val) => {
                    haptics.light();
                    setBottomNavCustomFabType(val as any);
                  }}
                  sheetTitle="Chọn Component Nút Trung Tâm"
                />
              </View>
              {bottomNavCustomFabType === 'standard' && (
                <View style={styles.controlGroup}>
                  <AppSelect
                    label="HÌNH DÁNG NÚT FAB (FAB SHAPE)"
                    options={bottomNavFabShapeOptions}
                    value={bottomNavFabShape}
                    onSelect={(val) => {
                      haptics.light();
                      setBottomNavFabShape(val as any);
                    }}
                    sheetTitle="Chọn Hình Dáng FAB Trung Tâm"
                  />
                </View>
              )}
              <View style={styles.controlGroup}>
                <AppSelect
                  label="VỊ TRÍ NÚT FAB (FAB PLACEMENT)"
                  options={bottomNavFabPlacementOptions}
                  value={bottomNavFabPlacement}
                  onSelect={(val) => {
                    haptics.light();
                    setBottomNavFabPlacement(val as any);
                  }}
                  sheetTitle="Chọn Vị Trí Nhô/Chìm FAB"
                />
              </View>
              {bottomNavFabPlacement === 'lifted' && (
                <View style={styles.controlGroup}>
                  <InteractiveScrubber
                    label="KÉO CHỈNH ĐỘ NHÔ CAO (LIFT OFFSET)"
                    value={bottomNavLiftOffset}
                    min={0}
                    max={46}
                    step={2}
                    unit="px"
                    formatValue={formatLiftOffsetScrubber}
                    themeColors={themeColors}
                    isDark={isDark}
                    onChange={setBottomNavLiftOffset}
                  />
                </View>
              )}
            </>
          )}
          <View style={styles.controlGroup}>
            <AppSwitch
              label="SLOT PHỤ KIỆN PHÍA TRÊN (TOP ACCESSORY DOCK)"
              sublabel="Thanh Mini-Player nhạc nổi docked ngay phía trên dock"
              value={bottomNavHasTopContent}
              onValueChange={(val) => {
                haptics.light();
                setBottomNavHasTopContent(val);
              }}
            />
          </View>
          <View style={styles.controlGroup}>
            <AppSwitch
              label="CHẾ ĐỘ TÙY CHỈNH THAY THẾ (CUSTOM REPLACEMENT MODE)"
              sublabel="Bật thanh tác vụ chọn nhiều mục (Bulk Action Bar) với [Hủy] và [Xóa]"
              value={bottomNavCustomMode}
              onValueChange={(val) => {
                haptics.light();
                setBottomNavCustomMode(val);
              }}
            />
          </View>
        </>
      )}

      {component.id === 'badge' && (
        <View style={styles.controlGroup}>
          <AppSelect
            label="MÀU SẮC TRẠNG THÁI (STATUS VARIANT)"
            options={badgeVariantOptions}
            value={badgeVariant}
            onSelect={(val) => {
              haptics.light();
              setBadgeVariant(val as any);
            }}
            sheetTitle="Chọn Màu Sắc Trạng Thái"
          />
        </View>
      )}

      {component.id === 'chip' && (
        <View style={styles.controlGroup}>
          <AppSelect
            label="BIẾN THỂ CHIP (CHIP VARIANT)"
            options={CHIP_VARIANT_OPTIONS}
            value={chipVariant}
            onSelect={(val) => {
              haptics.light();
              setChipVariant(val as any);
            }}
            sheetTitle="Chọn Biến Thể Chip"
          />
        </View>
      )}

      {component.id === 'toast' && (
        <View style={styles.controlGroup}>
          <AppText style={[styles.specTileLabel, { color: themeColors.textSecondary }]}>
            LOẠI THÔNG ĐIỆP TOAST (TOAST TYPE)
          </AppText>
          <AppSegmentedControl
            size="md"
            options={TOAST_TYPE_OPTIONS}
            value={toastType}
            onChange={setToastType}
          />
        </View>
      )}

      {/* Live Drag & Touch Scrubber for Progress Bar */}
      {component.id === 'progress' && (
        <View style={styles.controlGroup}>
          <InteractiveScrubber
            label="Tiến trình (Progress)"
            value={progressVal}
            min={0}
            max={100}
            step={5}
            unit="%"
            themeColors={themeColors}
            isDark={isDark}
            onChange={setProgressVal}
          />
        </View>
      )}

      {/* Live Drag & Touch Scrubber for Rating */}
      {component.id === 'rating' && (
        <View style={styles.controlGroup}>
          <InteractiveScrubber
            label="Đánh giá sao (Rating)"
            value={ratingVal}
            min={0.5}
            max={5}
            step={0.5}
            unit="★"
            themeColors={themeColors}
            isDark={isDark}
            onChange={setRatingVal}
          />
        </View>
      )}

      {/* Live Drag & Touch Scrubber for Pagination Dots */}
      {component.id === 'pagination' && (
        <View style={styles.controlGroup}>
          <InteractiveScrubber
            label="Chuyển trang (Pagination)"
            value={activeDot}
            min={0}
            max={4}
            step={1}
            formatValue={formatPaginationScrubber}
            themeColors={themeColors}
            isDark={isDark}
            onChange={setActiveDot}
          />
        </View>
      )}

      {/* Live Drag & Touch Scrubber and Status Selector for Avatar */}
      {component.id === 'avatar' && (
        <>
          <View style={styles.controlGroup}>
            <AppText style={[styles.specTileLabel, { color: themeColors.textSecondary }]}>
              TRẠNG THÁI HOẠT ĐỘNG (AVATAR STATUS)
            </AppText>
            <AppSegmentedControl
              size="md"
              options={AVATAR_STATUS_OPTIONS}
              value={avatarStatus}
              onChange={setAvatarStatus}
            />
          </View>
          <View style={styles.controlGroup}>
            <InteractiveScrubber
              label="Số huy hiệu (Badge count)"
              value={avatarBadgeCount}
              min={0}
              max={15}
              step={1}
              formatValue={formatBadgeCountScrubber}
              themeColors={themeColors}
              isDark={isDark}
              onChange={setAvatarBadgeCount}
            />
          </View>
        </>
      )}

      {/* Live Drag & Touch Scrubber for Divider Thickness */}
      {component.id === 'divider' && (
        <View style={styles.controlGroup}>
          <InteractiveScrubber
            label="Độ dày kẻ (Thickness)"
            value={dividerThickness}
            min={1}
            max={6}
            step={0.5}
            unit="px"
            themeColors={themeColors}
            isDark={isDark}
            onChange={setDividerThickness}
          />
        </View>
      )}

      {/* Live Refresh Switch for WidgetCard */}
      {component.id === 'widget-card' && (
        <View style={styles.controlGroup}>
          <AppSwitch
            label="Trạng Thái Đang Tải (isRefreshing)"
            sublabel="Bật vòng xoay tải lại của widget"
            value={widgetRefreshing}
            onValueChange={setWidgetRefreshing}
          />
        </View>
      )}

      {/* Live Reset for GestureCard */}
      {component.id === 'gesture-card' && (
        <View style={styles.controlGroup}>
          <AppButton
            title="Đặt Lại Thông Điệp Cử Chỉ"
            variant="outline"
            size="sm"
            onPress={() => {
              haptics.light();
              setGestureAction('Chạm đúp hoặc vuốt trái/phải lên vùng cảm ứng này');
            }}
          />
        </View>
      )}

      {/* Loading Overlay Controls */}
      {component.id === 'loading-overlay' && (
        <>
          <View style={styles.controlGroup}>
            <AppText style={[styles.specTileLabel, { color: themeColors.textSecondary }]}>
              VỊ TRÍ HIỂN THỊ (POSITION)
            </AppText>
            <AppSegmentedControl
              size="md"
              options={loadingPositionOptions}
              value={loadingPosition}
              onChange={setLoadingPosition}
            />
          </View>

          <View style={styles.controlGroup}>
            <AppText style={[styles.specTileLabel, { color: themeColors.textSecondary }]}>
              PHONG CÁCH BỀ MẶT (VARIANT)
            </AppText>
            <AppSegmentedControl
              size="md"
              options={loadingVariantOptions}
              value={loadingVariant}
              onChange={setLoadingVariant}
            />
          </View>

          <View style={styles.controlGroup}>
            <AppText style={[styles.specTileLabel, { color: themeColors.textSecondary }]}>
              KIỂU HOẠT CẢNH (ANIMATION TYPE)
            </AppText>
            <AppSegmentedControl
              size="md"
              options={loadingAnimOptions}
              value={loadingAnimType}
              onChange={setLoadingAnimType}
            />
          </View>

          {loadingShowProgress && (
            <View style={styles.controlGroup}>
              <AppText style={[styles.specTileLabel, { color: themeColors.textSecondary }]}>
                MỨC TIẾN ĐỘ THỬ NGHIỆM ({loadingProgressVal}%)
              </AppText>
              <AppSegmentedControl
                size="sm"
                options={LOADING_PROGRESS_OPTIONS}
                value={String(loadingProgressVal)}
                onChange={(val) => setLoadingProgressVal(Number(val))}
              />
            </View>
          )}
        </>
      )}

      {/* Standardized Interactive States via AppSwitch */}
      <View style={styles.controlGroup}>
        <AppText style={[styles.specTileLabel, { color: themeColors.textSecondary }]}>
          TRẠNG THÁI TƯƠNG TÁC (INTERACTIVE STATES)
        </AppText>
        <View style={styles.statesGroup}>
          {component.id === 'loading-overlay' && (
            <>
              <AppSwitch
                label="Hiển Thị Tiến Độ % (Progress)"
                sublabel="Hiện chỉ số phần trăm tiến độ đang tải"
                value={loadingShowProgress}
                onValueChange={setLoadingShowProgress}
              />
              <View style={styles.divider} />
            </>
          )}
          {component.id === 'otp' && (
            <>
              <AppSwitch
                label="Ẩn Mã PIN (Secure Mode)"
                sublabel="Che dấu ký tự dạng chấm tròn bảo mật"
                value={otpSecure}
                onValueChange={setOtpSecure}
              />
              <View style={styles.divider} />
            </>
          )}

          {component.id === 'divider' && (
            <>
              <AppSwitch
                label="Đường Kẻ Nét Đứt (Dashed)"
                sublabel="Chuyển kiểu nét liền sang nét đứt"
                value={dividerDashed}
                onValueChange={setDividerDashed}
              />
              <View style={styles.divider} />
            </>
          )}

          {(component.id === 'button' || component.id === 'input') && (
            <>
              <AppSwitch
                label="Biểu Tượng (Icon)"
                sublabel="Hiển thị icon phụ kèm nhãn chữ"
                value={hasIcon}
                onValueChange={setHasIcon}
              />
              <View style={styles.divider} />
            </>
          )}

          {component.id === 'button' && (
            <>
              <AppSwitch
                label="Tràn Chiều Ngang (Full Width)"
                sublabel="Kéo giãn nút chiếm 100% bề rộng"
                value={isFullWidth}
                onValueChange={setIsFullWidth}
              />
              <View style={styles.divider} />
            </>
          )}

          {component.id === 'button' && (
            <>
              <AppSwitch
                label="Đang Xử Lý (Loading)"
                sublabel="Bật vòng xoay chỉ báo tác vụ đang tải"
                value={isLoading}
                onValueChange={setIsLoading}
              />
              <View style={styles.divider} />
            </>
          )}

          {(component.id === 'button' ||
            component.id === 'input' ||
            component.id === 'select' ||
            component.id === 'switch' ||
            component.id === 'checkbox') && (
            <AppSwitch
              label="Vô Hiệu Hóa (Disabled)"
              sublabel="Khóa tương tác chạm của người dùng"
              value={isDisabled}
              onValueChange={setIsDisabled}
            />
          )}

          {component.id === 'input' && (
            <>
              <View style={styles.divider} />
              <AppSwitch
                label="Báo Lỗi (Error State)"
                sublabel="Hiển thị viền cảnh báo và dòng thông điệp lỗi"
                value={hasError}
                onValueChange={setHasError}
              />
            </>
          )}
        </View>
      </View>
    </AppCard>
  );
});
