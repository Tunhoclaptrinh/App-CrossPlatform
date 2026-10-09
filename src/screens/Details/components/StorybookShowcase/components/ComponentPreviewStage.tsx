import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Mail,
  Globe,
  Code2,
  SlidersHorizontal,
  Send,
  Trash2,
  Shield,
  Eye,
  Copy,
  Check,
  User,
  Bell,
  CheckCircle2,
  Activity,
  WifiOff,
  RotateCcw,
  Home,
  Compass,
  Plus,
  Folder,
  Music,
  Play,
  Pause,
  X,
  ArrowUpDown,
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
  AppScrollView,
  type LoadingPosition,
  type LoadingVariant,
  type LoadingAnimationType,
  type AppSelectOption,
  type SegmentOption,
  type ControlVariant,
  type ControlContrast,
  type ChipVariant,
  type ToastType,
  type BottomNavItem,
  type BottomNavVariant,
  type BottomNavIndicator,
  type BottomNavItemLayout,
  type BottomNavFabShape,
  type BottomNavFabPlacement,
  type BottomNavPlacement,
} from '@/components';
import {
  ControlSize,
  RadiusPresets,
  type ControlSizeKey,
  type RadiusPreset,
  type RadiusPresetConfig,
} from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';
import type { ComponentId, ComponentMeta, PreviewCanvasBackground } from '../types';
import { haptics } from '@/utils';
import { InteractiveScrubber } from './InteractiveScrubber';

interface ComponentPreviewStageProps {
  component: ComponentMeta;
  allComponents: ComponentMeta[];
  onBackToCatalog: () => void;
  onSelectComponent: (id: ComponentId) => void;
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass?: boolean;
  onResetScroll?: () => void;
}

export const ComponentPreviewStage: React.FC<ComponentPreviewStageProps> = ({
  component,
  allComponents,
  onBackToCatalog,
  onSelectComponent,
  themeColors,
  radiusTokens,
  isDark,
  isGlass = false,
  onResetScroll,
}) => {
  // Reset scroll to top immediately on mount and after layout pass
  React.useEffect(() => {
    onResetScroll?.();
    const frame = requestAnimationFrame(() => {
      onResetScroll?.();
    });
    const timer = setTimeout(() => {
      onResetScroll?.();
    }, 60);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [component.id, onResetScroll]);

  // Navigation between components
  const currentIndex = allComponents.findIndex((c) => c.id === component.id);
  const prevComponent = currentIndex > 0 ? allComponents[currentIndex - 1] : null;
  const nextComponent =
    currentIndex < allComponents.length - 1 ? allComponents[currentIndex + 1] : null;

  // Interactive Props States
  const [controlSize, setControlSize] = useState<ControlSizeKey>('md');
  const [buttonVariant, setButtonVariant] = useState<
    'primary' | 'secondary' | 'outline' | 'tonal' | 'glass' | 'danger'
  >('primary');
  const [cardVariant, setCardVariant] = useState<'elevated' | 'outlined' | 'flat' | 'glass'>('elevated');

  const [headerVariant, setHeaderVariant] = useState<'standard' | 'floating-pill' | 'frosted-capsule'>('standard');
  const [headerPlacement, setHeaderPlacement] = useState<'top' | 'bottom'>('top');
  const [headerActionStyle, setHeaderActionStyle] = useState<'individual' | 'capsule'>('capsule');
  const [headerCenterSlot, setHeaderCenterSlot] = useState<'title' | 'select' | 'searchbar'>('title');
  const [headerExpansionPosition, setHeaderExpansionPosition] = useState<'both' | 'inner' | 'bottom'>('both');
  const [headerCustomMode, setHeaderCustomMode] = useState<boolean>(false);
  const [activeBottomTab, setActiveBottomTab] = useState('home');
  const [bottomNavVariant, setBottomNavVariant] = useState<BottomNavVariant>('floating-pill');
  const [bottomNavPlacement, setBottomNavPlacement] = useState<BottomNavPlacement>('bottom');
  const [bottomNavIndicator, setBottomNavIndicator] = useState<BottomNavIndicator>('none');
  const [bottomNavItemLayout, setBottomNavItemLayout] = useState<BottomNavItemLayout>('vertical');
  const [bottomNavFabShape, setBottomNavFabShape] = useState<BottomNavFabShape>('circle');
  const [bottomNavFabPlacement, setBottomNavFabPlacement] = useState<BottomNavFabPlacement>('lifted');
  const [bottomNavLiftOffset, setBottomNavLiftOffset] = useState<number>(22);
  const [bottomNavCustomFabType, setBottomNavCustomFabType] = useState<
    'standard' | 'ai-orb' | 'qr-radar' | 'voice-wave'
  >('standard');
  const [bottomNavShowLabels, setBottomNavShowLabels] = useState(true);
  const [bottomNavHasFab, setBottomNavHasFab] = useState(true);
  const [bottomNavHasTopContent, setBottomNavHasTopContent] = useState(false);
  const [bottomNavCustomMode, setBottomNavCustomMode] = useState(false);
  const [miniPlayerPlaying, setMiniPlayerPlaying] = useState(true);
  const [badgeVariant, setBadgeVariant] = useState<
    'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  >('primary');
  const [segmentedVariant, setSegmentedVariant] = useState<
    'standard' | 'glass' | 'pill' | 'tonal' | 'outline'
  >('pill');
  const [segmentedVal, setSegmentedVal] = useState<string>('all');

  // Surface Controls for Form Primitives (Input, Select, SearchBar, Button)
  type ShadowLevel = 'none' | 'sm' | 'md' | 'lg';
  const [controlVariant, setControlVariant] = useState<ControlVariant>('standard');
  const [controlContrast, setControlContrast] = useState<ControlContrast>('normal');
  const [controlShadow, setControlShadow] = useState<ShadowLevel>('none');

  // Interactive Boolean Flags
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasIcon, setHasIcon] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form Inputs live state
  const [textVal, setTextVal] = useState('John Doe');
  const [searchVal, setSearchVal] = useState('');
  const [selectVal, setSelectVal] = useState('vn');
  const [switchVal, setSwitchVal] = useState(true);
  const [checkboxVal, setCheckboxVal] = useState(true);

  // Dialogs live state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // New Components Interactive States
  const [progressVal, setProgressVal] = useState(65);
  const [activeDot, setActiveDot] = useState(1);
  const [radioVal, setRadioVal] = useState('card');
  const [chipSelected, setChipSelected] = useState(true);
  const [chipVariant, setChipVariant] = useState<ChipVariant>('filled');
  const [otpVal, setOtpVal] = useState('8429');
  const [otpSecure, setOtpSecure] = useState(false);
  const [ratingVal, setRatingVal] = useState(4.5);
  const [listSwitchVal, setListSwitchVal] = useState(true);
  const [toastType, setToastType] = useState<ToastType>('success');
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [accordionExpanded, setAccordionExpanded] = useState(true);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [dividerDashed, setDividerDashed] = useState(false);
  const [dividerThickness, setDividerThickness] = useState(1.5);
  const [avatarBadgeCount, setAvatarBadgeCount] = useState(3);
  const [avatarStatus, setAvatarStatus] = useState<'online' | 'busy' | 'away' | 'offline'>('online');
  const [widgetRefreshing, setWidgetRefreshing] = useState(false);
  const [gestureAction, setGestureAction] = useState('Chạm đúp hoặc vuốt trái/phải lên vùng cảm ứng này');
  const [isOfflineBannerVisible, setIsOfflineBannerVisible] = useState(false);

  // Universal Design System & Theme Lab States (Isolated Demo Sandbox)
  const [overrideRadius, setOverrideRadius] = useState<RadiusPreset | 'system'>('system');
  const [customRadiusValue, setCustomRadiusValue] = useState<number | null>(null);
  const [isGlassPreview, setIsGlassPreview] = useState<boolean>(isGlass);

  // Synchronization status relative to current system state
  const isSystemRadius = overrideRadius === 'system' && customRadiusValue === null;
  const isSystemGlass = isGlassPreview === isGlass;
  const isFullySystemSynced = isSystemRadius && isSystemGlass;

  // Always reset sandbox overrides back to current system default whenever navigating to another component
  useEffect(() => {
    setOverrideRadius('system');
    setCustomRadiusValue(null);
    setIsGlassPreview(isGlass);
  }, [component.id, isGlass]);

  const handleResetToSystem = useCallback(() => {
    haptics.light();
    setOverrideRadius('system');
    setCustomRadiusValue(null);
    setIsGlassPreview(isGlass);
  }, [isGlass]);

  // Loading Overlay states
  const [loadingPosition, setLoadingPosition] = useState<LoadingPosition>('center');
  const [loadingVariant, setLoadingVariant] = useState<LoadingVariant>(isGlass ? 'glass' : 'card');
  const [loadingAnimType, setLoadingAnimType] = useState<LoadingAnimationType>('spinner');
  const [loadingShowProgress, setLoadingShowProgress] = useState(true);
  const [loadingProgressVal, setLoadingProgressVal] = useState<number>(68);
  const [isFullscreenLoading, setIsFullscreenLoading] = useState(false);

  // Canvas background
  const [canvasBg, setCanvasBg] = useState<PreviewCanvasBackground>('default');

  const handleCopyCode = () => {
    haptics.light();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Sample options for live testing
  const sampleSelectOptions: AppSelectOption<string>[] = [
    { label: 'Việt Nam', value: 'vn', icon: <Globe size={15} color="#007AFF" />, sublabel: '+84 Quốc gia' },
    { label: 'Hoa Kỳ', value: 'us', icon: <Globe size={15} color="#10B981" />, sublabel: '+1 North America' },
    { label: 'Nhật Bản', value: 'jp', icon: <Globe size={15} color="#EC4899" />, sublabel: '+81 Asia Pacific' },
  ];

  // Options for selecting Button Variant via AppSelect
  const buttonVariantOptions: AppSelectOption<string>[] = [
    { label: 'Primary (Nút Chính)', value: 'primary', sublabel: 'Nổi bật, màu thương hiệu nền đặc' },
    { label: 'Secondary (Nút Phụ)', value: 'secondary', sublabel: 'Nền trung tính, tương phản nhẹ nhàng' },
    { label: 'Outline (Viền Đơn)', value: 'outline', sublabel: 'Nền trong suốt, viền mảnh 1px' },
    { label: 'Tonal (Bề Mặt Mờ)', value: 'tonal', sublabel: 'Nền dịu mắt với độ mờ trong suốt' },
    { label: 'Glass (Kính Lỏng Apple)', value: 'glass', sublabel: 'Kính mờ khúc xạ Liquid Glass iOS' },
    { label: 'Danger (Cảnh Báo)', value: 'danger', sublabel: 'Màu đỏ dành cho thao tác xóa hoặc hủy' },
  ];

  // Options for selecting Card Variant
  const cardVariantOptions: AppSelectOption<string>[] = [
    { label: 'Elevated (Bóng Đổ)', value: 'elevated', sublabel: 'Bề mặt nổi với bóng đổ mềm nhiều tầng' },
    { label: 'Outlined (Viền Đơn)', value: 'outlined', sublabel: 'Bề mặt phẳng viền phân cách 1px' },
    { label: 'Flat (Phẳng)', value: 'flat', sublabel: 'Bề mặt phẳng tối giản không viền' },
    { label: 'Glass (Kính Mờ Apple)', value: 'glass', sublabel: 'Bề mặt kính mờ quang học đa tầng viền phản quang' },
  ];


  // Options for selecting Header Variant
  const headerVariantOptions: AppSelectOption<string>[] = [
    { label: 'Standard (Thanh Chuẩn iOS)', value: 'standard', sublabel: 'Navbar cố định truyền thống' },
    { label: 'Frosted Capsule (Viên Thuốc Kính)', value: 'frosted-capsule', sublabel: 'Viên thuốc nổi mờ nền' },
    { label: 'Floating Pill (Đảo Động)', value: 'floating-pill', sublabel: 'Dynamic Island nổi độc lập' },
  ];
 
  // Options for selecting Header Placement (Top vs Bottom Inversion)
  const headerPlacementOptions: AppSelectOption<string>[] = [
    { label: 'Top (Trên đỉnh - Tiêu chuẩn)', value: 'top', sublabel: 'Thanh điều hướng tiêu chuẩn trên cùng màn hình' },
    { label: 'Bottom (Dưới đáy - Command Bar)', value: 'bottom', sublabel: 'Thanh lệnh tầm với một tay kiểu Safari / Arc' },
  ];

  // Options for selecting Header Action Style (Grouped Pill Capsule vs Individual Circles)
  const headerActionStyleOptions: AppSelectOption<string>[] = [
    { label: 'Capsule (Viên Thuốc Gom Nhóm)', value: 'capsule', sublabel: 'Nút tìm kiếm & more thành khối pill liền mạch' },
    { label: 'Individual (Nút Tròn Rời)', value: 'individual', sublabel: 'Mỗi nút hành động là một khối tròn độc lập' },
  ];

  // Options for selecting Header Center Slot (Custom Embedded Components)
  const headerCenterSlotOptions: AppSelectOption<string>[] = [
    { label: 'Tiêu Đề Tĩnh (Title & Subtitle)', value: 'title', sublabel: 'Hiển thị title và subtitle văn bản mặc định' },
    { label: 'Nhúng Menu Xổ Xuống (AppSelect)', value: 'select', sublabel: 'Nhúng nguyên 1 dropdown chọn node cảm biến vào giữa Header' },
    { label: 'Nhúng Thanh Search (AppSearchBar)', value: 'searchbar', sublabel: 'Nhúng trực tiếp ô tìm kiếm thường trực vào giữa Header' },
  ];

  // Options for selecting Header Expansion Position
  const headerExpansionPositionOptions: AppSelectOption<string>[] = [
    { label: 'Cả Hai (Both - Inner & Bottom Dropdown)', value: 'both', sublabel: 'Biến hình ruột thanh search và thả thẻ gợi ý nổi bên dưới' },
    { label: 'Chỉ Bên Trong (Inner Only)', value: 'inner', sublabel: 'Chỉ biến hình ruột Header (thanh search), không hiện dropdown' },
    { label: 'Chỉ Thả Dưới (Bottom Dropdown Only)', value: 'bottom', sublabel: 'Giữ nguyên Header tiêu đề/select và thả dropdown gợi ý bên dưới' },
  ];

  // Options for selecting BottomNav Variant
  const bottomNavVariantOptions: AppSelectOption<string>[] = [
    { label: 'Floating Pill (Đảo Nổi Độc Lập)', value: 'floating-pill', sublabel: 'Dock viên thuốc bo tròn nổi bồng bềnh' },
    { label: 'Standard (Thanh Chuẩn iOS)', value: 'standard', sublabel: 'Navbar mép đáy cố định, vách ngăn hairline' },
    { label: 'Frosted Glass (Kính Mờ Apple)', value: 'frosted-glass', sublabel: 'Kính lỏng Liquid Glass quang học khúc xạ' },
  ];

  // Options for selecting BottomNav Placement (Bottom vs Top Inversion)
  const bottomNavPlacementOptions: AppSelectOption<string>[] = [
    { label: 'Bottom (Dưới đáy - Tiêu chuẩn)', value: 'bottom', sublabel: 'Thanh dock điều hướng nằm sát đáy màn hình' },
    { label: 'Top (Trên đỉnh - Category Tabs)', value: 'top', sublabel: 'Thanh dock nằm trên đỉnh phân loại danh mục' },
  ];

  // Options for selecting BottomNav Indicator
  const bottomNavIndicatorOptions: AppSelectOption<string>[] = [
    { label: 'None (Tối Giản Sạch Sẽ - Mặc định)', value: 'none', sublabel: 'Chỉ làm nổi bật màu icon/text bằng primary color' },
    { label: 'Pill (Khối Viên Thuốc Mờ)', value: 'pill', sublabel: 'Nền viên thuốc êm dịu bao quanh mục tab' },
    { label: 'Glow (Chấm Sáng Phát Quang)', value: 'glow', sublabel: 'Vầng hào quang phát quang nhẹ' },
    { label: 'Dot (Chấm Tròn Tinh Tế)', value: 'dot', sublabel: 'Dấu chấm chỉ báo nhỏ phía dưới' },
    { label: 'Line (Vạch Viền Đáy)', value: 'line', sublabel: 'Vạch sáng thanh mảnh hiện đại' },
  ];

  // Options for selecting BottomNav Item Layout
  const bottomNavItemLayoutOptions: AppSelectOption<string>[] = [
    { label: 'Vertical (Icon trên, Chữ dưới)', value: 'vertical', sublabel: 'Bố cục tab mobile kinh điển' },
    { label: 'Horizontal (Icon trái, Chữ phải)', value: 'horizontal', sublabel: 'Bố cục dạng dock ngang gọn gàng' },
    { label: 'Icon Only (Chỉ biểu tượng)', value: 'icon-only', sublabel: 'Ẩn nhãn chữ, tối đa hóa không gian' },
  ];

  // Options for selecting BottomNav FAB Shape
  const bottomNavFabShapeOptions: AppSelectOption<string>[] = [
    { label: 'Circle (Tròn hoàn hảo)', value: 'circle', sublabel: 'Bo tròn bán kính 26px' },
    { label: 'Squircle (Apple Squircle)', value: 'squircle', sublabel: 'Bo góc mềm mại bán kính 16px' },
  ];

  // Options for selecting BottomNav FAB Placement
  const bottomNavFabPlacementOptions: AppSelectOption<string>[] = [
    { label: 'Lifted (Nhô cao mép trên)', value: 'lifted', sublabel: 'Nổi bật nhô lên 22px bên trên dock' },
    { label: 'Embedded (Chìm phẳng ngang bằng)', value: 'embedded', sublabel: 'Nằm phẳng cân đối bên trong thân dock' },
  ];

  // Options for selecting Custom Center FAB component type
  const bottomNavCustomFabTypeOptions: AppSelectOption<string>[] = [
    { label: 'Tiêu Chuẩn (Action Button +)', value: 'standard', sublabel: 'Nút hành động tròn / squircle với biểu tượng Plus' },
    { label: 'AI Copilot Orb (Viên Cầu Đa Sắc)', value: 'ai-orb', sublabel: 'Khối cầu AI phát sáng gradient với icon Sparkles' },
    { label: 'QR Scanner Radar (Máy Quét)', value: 'qr-radar', sublabel: 'Nút quét mã công nghệ cao với viền quét radar xanh ngọc' },
    { label: 'Voice Visualizer (Sóng Âm)', value: 'voice-wave', sublabel: 'Nút thu âm với icon micro đa sắc' },
  ];

  // Sample items for BottomNav live preview
  const bottomNavItems: BottomNavItem[] = useMemo(
    () => [
      { key: 'home', label: 'Trang chủ', icon: <Home size={19} /> },
      { key: 'explore', label: 'Khám phá', icon: <Compass size={19} />, badge: 3 },
      { key: 'files', label: 'Tài liệu', icon: <Folder size={19} /> },
      { key: 'profile', label: 'Cá nhân', icon: <User size={19} />, badgeDot: true },
    ],
    []
  );

  // Options for selecting Badge Variant
  const badgeVariantOptions: AppSelectOption<string>[] = [
    { label: 'Primary (Chính)', value: 'primary', sublabel: 'Màu thương hiệu chủ đạo' },
    { label: 'Success (Thành Công)', value: 'success', sublabel: 'Màu xanh lá hoàn thành' },
    { label: 'Warning (Cảnh Báo)', value: 'warning', sublabel: 'Màu vàng cam nhắc nhở' },
    { label: 'Error (Thất Bại / Lỗi)', value: 'error', sublabel: 'Màu đỏ báo lỗi' },
    { label: 'Info (Thông Tin)', value: 'info', sublabel: 'Màu xanh dương tin tức' },
    { label: 'Neutral (Trung Tính)', value: 'neutral', sublabel: 'Màu xám nhãn phụ' },
  ];

  const segmentedVariantOptions: AppSelectOption<string>[] = [
    { label: 'Pill (Viên Thuốc Nổi)', value: 'pill', sublabel: 'Capsule nổi bật với viền specular và bóng đổ mềm' },
    { label: 'Glass (Kính Mờ Cupertino)', value: 'glass', sublabel: 'Bề mặt kính quang học mờ xuyên thấu frosted' },
    { label: 'Standard (Chuẩn Apple HIG)', value: 'standard', sublabel: 'Bề mặt xám trung tính với phím trượt màu tương phản' },
    { label: 'Tonal (Màu Nhạt Pha)', value: 'tonal', sublabel: 'Nền dịu mắt hòa cùng tông màu thương hiệu' },
    { label: 'Outline (Viền Tối Giản)', value: 'outline', sublabel: 'Khung viền mảnh thanh lịch, nền trong suốt' },
  ];

  const controlVariantOptions: AppSelectOption<ControlVariant>[] = [
    { label: 'Standard (Nền Tiêu Chuẩn)', value: 'standard', sublabel: 'Nền đặc chuẩn mực, viền phân cách 1px thanh lịch' },
    { label: 'Filled (Phủ Nền Dịu Mắt)', value: 'filled', sublabel: 'Nền phủ màu xám tint hiện đại theo chuẩn iOS HIG' },
    { label: 'Glass (Kính Lỏng Apple)', value: 'glass', sublabel: 'Kính mờ quang học đa tầng Liquid Glass với viền Specular' },
    { label: 'Elevated (Bóng Nổi 3D)', value: 'elevated', sublabel: 'Bề mặt thẻ nổi với bóng đổ mềm tự nhiên' },
    { label: 'Outline (Viền Tối Giản)', value: 'outline', sublabel: 'Nền trong suốt tuyệt đối với viền nét 1.5px' },
  ];

  const contrastOptions: SegmentOption<ControlContrast>[] = [
    { label: 'Dịu Nhẹ', value: 'subtle' },
    { label: 'Chuẩn', value: 'normal' },
    { label: 'Đậm Nét', value: 'high' },
  ];

  const shadowOptions: SegmentOption<ShadowLevel>[] = [
    { label: 'Phẳng', value: 'none' },
    { label: 'Nhẹ', value: 'sm' },
    { label: 'Vừa', value: 'md' },
    { label: 'Nổi', value: 'lg' },
  ];

  const sizeOptions: SegmentOption<ControlSizeKey>[] = [
    { label: `SM (${ControlSize.sm.height}px)`, value: 'sm' },
    { label: `MD (${ControlSize.md.height}px)`, value: 'md' },
    { label: `LG (${ControlSize.lg.height}px)`, value: 'lg' },
  ];

  const canvasBgOptions: SegmentOption<PreviewCanvasBackground>[] = [
    { label: 'Chuẩn', value: 'default' },
    { label: 'Thẻ', value: 'card' },
    { label: 'Đậm', value: 'contrast' },
  ];

  const loadingPositionOptions: SegmentOption<LoadingPosition>[] = [
    { label: 'Giữa (Center)', value: 'center' },
    { label: 'Đỉnh (Top)', value: 'top' },
    { label: 'Đáy (Bottom)', value: 'bottom' },
  ];

  const loadingVariantOptions: SegmentOption<LoadingVariant>[] = [
    { label: 'Card', value: 'card' },
    { label: 'Glass', value: 'glass' },
    { label: 'Pill', value: 'pill' },
    { label: 'Minimal', value: 'minimal' },
  ];

  const loadingAnimOptions: SegmentOption<LoadingAnimationType>[] = [
    { label: 'Spinner', value: 'spinner' },
    { label: 'Pulse', value: 'pulse' },
    { label: 'Dots', value: 'dots' },
  ];

  const currentHeight = ControlSize[controlSize].height;

  // Compute active radius tokens dynamically based on preset or custom drag scrubber
  const activeRadiusTokens: RadiusPresetConfig = useMemo(() => {
    if (customRadiusValue !== null) {
      return {
        id: 'standard' as RadiusPreset,
        name: `Tùy Chỉnh (${customRadiusValue}px)`,
        card: Math.min(customRadiusValue, 20),
        control: customRadiusValue,
        smControl: Math.max(4, customRadiusValue - 4),
        badge: Math.min(customRadiusValue, 8),
        pill: customRadiusValue >= 24 ? 9999 : customRadiusValue,
        desc: `Bo góc tùy chỉnh thủ công: ${customRadiusValue}px`,
      };
    }
    return overrideRadius === 'system' ? radiusTokens : RadiusPresets[overrideRadius];
  }, [overrideRadius, radiusTokens, customRadiusValue]);

  // Dynamic scrubber value synchronized with active token
  const currentScrubberValue = useMemo(() => {
    if (customRadiusValue !== null) return customRadiusValue;
    const targetToken = component.category === 'organisms'
      ? activeRadiusTokens.card
      : activeRadiusTokens.control;
    return targetToken >= 999 ? 24 : targetToken;
  }, [customRadiusValue, component.category, activeRadiusTokens]);

  const effectiveControlVariant: ControlVariant = controlVariant;
  const effectiveButtonVariant = buttonVariant;
  const cardDynamicRadiusStyle = useMemo(
    () => ({ borderRadius: activeRadiusTokens.card }),
    [activeRadiusTokens.card]
  );

  // Icon color synchronized with button state
  const buttonIconColor =
    buttonVariant === 'primary' || buttonVariant === 'danger'
      ? '#FFFFFF'
      : themeColors.text;

  // Generate dynamic usage code snippet
  const generateSnippet = (): string => {
    const customRadiusSnippet = customRadiusValue !== null ? `\n  borderRadius={${activeRadiusTokens.control}}` : '';
    const contrastSnippet = controlContrast !== 'normal' ? `\n  contrast="${controlContrast}"` : '';
    const sizeSnippet = `\n  size="${controlSize}"`;

    switch (component.id) {
      case 'button':
        return `<AppButton${sizeSnippet}\n  variant="${effectiveButtonVariant}"${contrastSnippet}${controlShadow !== 'none' ? `\n  shadow="${controlShadow}"` : ''}${customRadiusSnippet}\n  title="Bấm vào đây"\n  loading={${isLoading}}\n  disabled={${isDisabled}}${isFullWidth ? '\n  fullWidth' : ''}${hasIcon ? `\n  leftIcon={<Sparkles size={${ControlSize[controlSize].iconSize}} color="${buttonIconColor}" />}` : ''}\n  onPress={() => {}}\n/>`;
      case 'input':
        return `<AppInput${sizeSnippet}${effectiveControlVariant !== 'standard' ? `\n  variant="${effectiveControlVariant}"` : ''}${contrastSnippet}${controlShadow !== 'none' ? `\n  shadow="${controlShadow}"` : ''}${customRadiusSnippet}\n  label="Họ và tên"\n  placeholder="Nhập thông tin..."\n  value={text}\n  onChangeText={setText}${hasIcon ? '\n  leftIcon={<Mail size={16} />}' : ''}${hasError ? '\n  error="Trường này không được để trống"' : ''}${isDisabled ? '\n  disabled' : ''}\n/>`;
      case 'select':
        return `<AppSelect${sizeSnippet}${effectiveControlVariant !== 'standard' ? `\n  variant="${effectiveControlVariant}"` : ''}${contrastSnippet}${controlShadow !== 'none' ? `\n  shadow="${controlShadow}"` : ''}${customRadiusSnippet}\n  label="Quốc gia"\n  options={options}\n  value={value}\n  onSelect={setValue}\n  sheetTitle="Chọn quốc gia"\n/>`;
      case 'searchbar':
        return `<AppSearchBar${sizeSnippet}${effectiveControlVariant !== 'standard' ? `\n  variant="${effectiveControlVariant}"` : ''}${contrastSnippet}${controlShadow !== 'none' ? `\n  shadow="${controlShadow}"` : ''}${customRadiusSnippet}\n  placeholder="Tìm kiếm..."\n  value={query}\n  onChangeText={setQuery}\n  onFilterPress={() => {}}\n/>`;
      case 'header': {
        const centerSnippet =
          headerCenterSlot === 'select'
            ? '\n  centerContent={<AppSelect size="sm" variant="filled" options={options} value="1" onSelect={() => {}} />}'
            : headerCenterSlot === 'searchbar'
            ? '\n  centerContent={<AppSearchBar size="sm" variant="filled" placeholder="Tìm node..." style={{ height: 34 }} />}'
            : '';
        const expansionSnippet = headerExpansionPosition !== 'both' ? `\n  expansionPosition="${headerExpansionPosition}"` : '';
        const placementSnippet = headerPlacement !== 'top' ? `\n  placement="${headerPlacement}"` : '';
        const customSnippet = headerCustomMode
          ? '\n  isCustomMode={true}\n  renderCustomHeader={({ close }) => <CustomToolbar onDismiss={close} />}'
          : '';
        return `<AppHeader\n  title="EveSense Hub"\n  subtitle="Node điều phối cảm biến"\n  variant="${headerVariant}"${placementSnippet}\n  actionStyle="${headerActionStyle}"${contrastSnippet}${centerSnippet}${expansionSnippet}${customSnippet}\n  searchable\n  suggestions={[\n    { id: '1', label: 'Cảm biến nhiệt độ DHT22', sublabel: 'Node #01', onPress: () => {} },\n    { id: '2', label: 'Cảm biến khí BME688', sublabel: 'Node #02', onPress: () => {} },\n  ]}\n  showBack\n  showMore\n  onBack={() => {}}\n/>`;
      }
      case 'bottom-nav': {
        const placementSnippet = bottomNavPlacement !== 'bottom' ? `\n  placement="${bottomNavPlacement}"` : '';
        const fabSnippet = bottomNavHasFab
          ? bottomNavCustomFabType === 'ai-orb'
            ? `\n  centerFab={{\n    placement: '${bottomNavFabPlacement}',${bottomNavLiftOffset !== 22 ? `\n    liftOffset: ${bottomNavLiftOffset},` : ''}\n    customComponent: <AiCopilotOrb />,\n  }}`
            : bottomNavCustomFabType === 'qr-radar'
            ? `\n  centerFab={{\n    placement: '${bottomNavFabPlacement}',${bottomNavLiftOffset !== 22 ? `\n    liftOffset: ${bottomNavLiftOffset},` : ''}\n    customComponent: <QrScannerRadar />,\n  }}`
            : bottomNavCustomFabType === 'voice-wave'
            ? `\n  centerFab={{\n    placement: '${bottomNavFabPlacement}',${bottomNavLiftOffset !== 22 ? `\n    liftOffset: ${bottomNavLiftOffset},` : ''}\n    customComponent: <VoiceVisualizer />,\n  }}`
            : `\n  centerFab={{\n    icon: <Plus size={22} color="#FFFFFF" strokeWidth={2.5} />,\n    onPress: () => {},\n    accessibilityLabel: 'Tạo mới',\n    shape: '${bottomNavFabShape}',\n    placement: '${bottomNavFabPlacement}',${bottomNavLiftOffset !== 22 ? `\n    liftOffset: ${bottomNavLiftOffset},` : ''}\n  }}`
          : '';
        const liftOffsetSnippet = (bottomNavHasFab && bottomNavLiftOffset !== 22)
          ? `\n  fabLiftOffset={${bottomNavLiftOffset}}`
          : '';
        const layoutSnippet = bottomNavItemLayout !== 'vertical'
          ? `\n  itemLayout="${bottomNavItemLayout}"`
          : '';
        const topContentSnippet = bottomNavHasTopContent
          ? `\n  topContent={<MiniPlayer playing={${miniPlayerPlaying}} />}`
          : '';
        const customModeSnippet = bottomNavCustomMode
          ? `\n  isCustomMode={true}\n  renderCustomBottomNav={({ close }) => (\n    <BulkActionBar count={3} onClose={close} onDelete={() => {}} />\n  )}`
          : '';
        return `<AppBottomNav\n  items={[\n    { key: 'home', label: 'Trang chủ', icon: <Home size={19} /> },\n    { key: 'explore', label: 'Khám phá', icon: <Compass size={19} />, badge: 3 },\n    { key: 'files', label: 'Tài liệu', icon: <Folder size={19} /> },\n    { key: 'profile', label: 'Cá nhân', icon: <User size={19} />, badgeDot: true },\n  ]}\n  activeKey="${activeBottomTab}"\n  onChange={setActiveBottomTab}\n  variant="${bottomNavVariant}"${placementSnippet}\n  indicatorStyle="${bottomNavIndicator}"${layoutSnippet}${contrastSnippet}\n  showLabels={${bottomNavShowLabels}}${fabSnippet}${liftOffsetSnippet}${topContentSnippet}${customModeSnippet}\n/>`;
      }
      case 'apple-glass-card':
        return `<AppleGlassCard${sizeSnippet}${contrastSnippet}\n  balance="45,280.00"\n  balanceLabel="SỐ DƯ KHẢ DỤNG"\n  cardNumber="•••• 8829"\n  cardHolder="EVE SENSE"\n  brandName="Apple Glass"\n  onPress={() => {}}\n/>`;
      case 'card':
        return `<AppCard${sizeSnippet}${contrastSnippet}\n  variant="${cardVariant}"\n  style={{ padding: 16 }}\n>\n  <AppText>Nội dung thẻ bề mặt</AppText>\n</AppCard>`;
      case 'badge':

        return `<AppBadge${sizeSnippet}\n  label="Trạng thái"\n  variant="${badgeVariant}"${contrastSnippet}\n/>`;
      case 'switch':
        return `<AppSwitch${sizeSnippet}${contrastSnippet}\n  label="Thông báo đẩy"\n  sublabel="Nhận thông báo sự kiện"\n  value={enabled}\n  onValueChange={setEnabled}\n/>`;
      case 'checkbox':
        return `<AppCheckbox${sizeSnippet}${contrastSnippet}\n  label="Tôi đồng ý với điều khoản"\n  checked={checked}\n  onChange={setChecked}\n/>`;
      case 'confirm-dialog':
        return `<ConfirmDialog${sizeSnippet}${contrastSnippet}\n  visible={isOpen}\n  title="Xác nhận thao tác"\n  message="Bạn có chắc chắn muốn thực hiện hành động này?"\n  onConfirm={() => setIsOpen(false)}\n  onCancel={() => setIsOpen(false)}\n/>`;
      case 'action-sheet':
        return `<AppActionSheet${sizeSnippet}${contrastSnippet}\n  visible={isOpen}\n  title="Tùy chọn thao tác"\n  actions={[\n    { id: '1', label: 'Lưu thay đổi', onPress: () => {} },\n    { id: '2', label: 'Xóa mục', destructive: true, onPress: () => {} }\n  ]}\n  onClose={() => setIsOpen(false)}\n/>`;
      case 'skeleton':
        return `<View style={{ gap: 8 }}>\n  <Skeleton width={120} height={18} />\n  <Skeleton width="100%" height={12} />\n  <Skeleton width="80%" height={12} />\n</View>`;
      case 'icon-tile':
        return `<CupertinoIconTile${sizeSnippet}${contrastSnippet}\n  icon={Sparkles}\n  baseColor="#007AFF"\n/>\n<GlassTile${sizeSnippet}${contrastSnippet}\n  icon={Shield}\n  iconColor="#10B981"\n  value="100%"\n  label="Bảo Mật"\n/>`;
      case 'empty-state':
        return `<EmptyState${sizeSnippet}${contrastSnippet}\n  title="Chưa có dữ liệu"\n  description="Hãy thêm mới mục đầu tiên để bắt đầu."\n  actionText="Thêm ngay"\n  onActionPress={() => {}}\n/>`;
      case 'segmented-control':
        return `<AppSegmentedControl${sizeSnippet}${contrastSnippet}\n  variant="${segmentedVariant}"\n  options={[\n    { label: 'Tất cả', value: 'all', badge: 14 },\n    { label: 'Đang chờ', value: 'pending', badge: 3 },\n    { label: 'Hoàn thành', value: 'completed' },\n  ]}\n  value={tab}\n  onChange={setTab}\n  disabled={${isDisabled}}\n/>`;
      case 'avatar':
        return `<AppAvatar${sizeSnippet}\n  name="Nguyen Van A"\n  status="${avatarStatus}"${avatarBadgeCount > 0 ? `\n  badgeCount={${avatarBadgeCount}}` : ''}\n/>\n\n<AppAvatarGroup${sizeSnippet}\n  items={[\n    { name: "Eve Sense" },\n    { name: "John Doe" },\n    { name: "Alice Smith" },\n    { name: "Robert Taylor" },\n    { name: "Emma Watson" },\n  ]}\n  max={4}\n/>`;
      case 'divider':
        return `<AppDivider${sizeSnippet}${contrastSnippet} label="HOẶC TIẾP TỤC VỚI" />\n\n<AppDivider${sizeSnippet}${contrastSnippet} dashed={${dividerDashed}} thickness={${dividerThickness}} />`;
      case 'progress':
        return `<AppProgressBar${sizeSnippet}${contrastSnippet}\n  progress={${progressVal}}\n  showLabel\n  animated\n/>`;
      case 'pagination':
        return `<PaginationDots${sizeSnippet}${contrastSnippet}\n  count={5}\n  activeIndex={${activeDot}}\n  onDotPress={(idx) => setActive(idx)}\n/>`;
      case 'radio':
        return `<AppRadioGroup${sizeSnippet}${contrastSnippet}\n  options={[\n    { label: 'Thanh toán thẻ Visa / Master', value: 'card' },\n    { label: 'Chuyển khoản QR ngân hàng', value: 'bank' },\n    { label: 'Ví MoMo / Apple Pay', value: 'wallet' },\n  ]}\n  value="${radioVal}"\n  onChange={setPaymentMethod}\n/>`;
      case 'chip':
        return `<AppChip${sizeSnippet}${contrastSnippet}\n  label="Công nghệ"\n  variant="${chipVariant}"\n  selected={${chipSelected}}\n  onPress={() => setSelected(!selected)}\n  onRemove={() => {}}\n/>`;
      case 'otp':
        return `<AppOtpInput${sizeSnippet}${contrastSnippet}\n  length={6}\n  value="${otpVal}"\n  secureTextEntry={${otpSecure}}\n  onChange={setOtp}\n  onComplete={(code) => verifyOtp(code)}\n/>`;
      case 'rating':
        return `<AppRating${sizeSnippet}${contrastSnippet}\n  value={${ratingVal}}\n  onChange={setRating}\n  showScore\n/>`;
      case 'list-item':
        return `<AppListGroup${sizeSnippet}${contrastSnippet} title="Tài Khoản & Bảo Mật">\n  <AppListItem\n    leading={<User size={18} />}\n    title="Thông tin cá nhân"\n    subtitle="Cập nhật hồ sơ và ảnh đại diện"\n    onPress={() => {}}\n  />\n  <AppListItem\n    leading={<Bell size={18} />}\n    title="Thông báo đẩy"\n    trailing={<AppSwitch value={enabled} onValueChange={setEnabled} />}\n  />\n  <AppListItem\n    leading={<Trash2 size={18} color="#EF4444" />}\n    title="Đăng xuất khỏi thiết bị"\n    destructive\n    onPress={() => {}}\n  />\n</AppListGroup>`;
      case 'toast':
        return `// Gọi trực tiếp từ hook ở bất kỳ đâu:\nconst toast = useToast();\ntoast.success('Dữ liệu đã được lưu trữ an toàn!');\n\n// Hoặc dùng component độc lập:\n<AppToast${sizeSnippet}${contrastSnippet}\n  visible={isOpen}\n  type="${toastType}"\n  title="Thông Báo"\n  message="Thao tác đã được đồng bộ"\n  onDismiss={() => setIsOpen(false)}\n/>`;
      case 'accordion':
        return `<AppAccordion${sizeSnippet}${contrastSnippet}\n  title="Câu hỏi thường gặp FAQ"\n  subtitle="Chạm để mở rộng nội dung">\n  <AppText>Nội dung chi tiết giải thích cho người dùng...</AppText>\n</AppAccordion>`;
      case 'bottom-sheet':
        return `<AppBottomSheet${sizeSnippet}${contrastSnippet}\n  visible={isOpen}\n  title="Bộ Lọc Nâng Cao"\n  snapPoint="half"\n  onClose={() => setIsOpen(false)}\n>\n  <AppText>Đặt bất kỳ Form hoặc UI nào vào đây</AppText>\n</AppBottomSheet>`;
      case 'widget-card':
        return `<WidgetCard${sizeSnippet}${contrastSnippet}\n  title="Cảm Biến BME688"\n  subtitle="Phòng Server Node #01"\n  badge="Online"\n  icon={<Activity size={18} color="#007AFF" />}\n  isRefreshing={${widgetRefreshing}}\n  onRefresh={() => handleRefresh()}\n>\n  <AppText>Nhiệt độ: 24.5°C • Độ ẩm: 55%</AppText>\n</WidgetCard>`;
      case 'gesture-card':
        return `<GestureCard${sizeSnippet}${contrastSnippet}\n  title="Bàn Di Cảm Ứng Đa Điểm"\n  description="${gestureAction}"\n  onSwipeLeft={() => setAction('Vuốt trái')}\n  onSwipeRight={() => setAction('Vuốt phải')}\n  onDoubleTap={() => setAction('Chạm đúp')}\n/>`;
      case 'offline-banner':
        return `<OfflineBanner${sizeSnippet}${contrastSnippet}\n  message="Không có kết nối mạng Internet. Đang sử dụng SQLite cục bộ."\n  onRetry={() => retryConnection()}\n/>`;
      case 'loading-overlay':
        return `<LoadingOverlay\n  visible={true}\n  message="Đang đồng bộ dữ liệu..."\n  subMessage="Đang xử lý qua New Architecture JSI"\n  position="${loadingPosition}"\n  variant="${loadingVariant}"\n  animationType="${loadingAnimType}"\n  borderRadius={${activeRadiusTokens.card}}${loadingShowProgress ? `\n  progress={${loadingProgressVal}}` : ''}\n/>`;
      default:
        return `<${component.name} />`;
    }
  };

  const getCanvasBackground = () => {
    switch (canvasBg) {
      case 'card':
        return isDark ? '#1E293B' : '#F1F5F9';
      case 'contrast':
        return isDark ? '#000000' : '#E2E8F0';
      case 'mesh':
        return isDark ? '#0F172A' : '#F8FAFC';
      default:
        return isDark ? 'rgba(0, 0, 0, 0.35)' : 'rgba(248, 250, 252, 0.9)';
    }
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          gap: 16,
        },
        topNav: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        backButton: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: Math.min(activeRadiusTokens.pill, 16),
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
        },
        backButtonText: {
          fontSize: 12.5,
          fontWeight: '600',
          color: themeColors.text,
        },
        stepperGroup: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        },
        stepperBtn: {
          width: 32,
          height: 32,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
        },
        stepperBtnDisabled: {
          opacity: 0.3,
        },
        headerCard: {
          gap: 6,
        },
        titleRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        },
        componentTitle: {
          fontSize: 20,
          fontWeight: '800',
          letterSpacing: -0.3,
          flexShrink: 1,
        },
        categoryTag: {
          paddingHorizontal: 8,
          paddingVertical: 3,
          borderRadius: Math.min(activeRadiusTokens.pill, 14),
          backgroundColor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)',
          flexShrink: 0,
        },
        categoryTagText: {
          fontSize: 10,
          fontWeight: '700',
          color: '#6366F1',
          textTransform: 'uppercase',
        },
        componentDesc: {
          fontSize: 13,
          color: themeColors.textSecondary,
          lineHeight: 18,
        },
        stageCard: {
          gap: 12,
        },
        stageHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        },
        stageHeaderLeft: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          flex: 1,
          flexShrink: 1,
        },
        stageTitle: {
          fontSize: 12,
          fontWeight: '700',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          color: themeColors.textSecondary,
        },
        canvasViewport: {
          borderRadius: Math.max(6, Math.min(activeRadiusTokens.card, 16) - 2),
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
          paddingVertical: 18,
          paddingHorizontal: 16,
          alignItems: 'stretch',
          justifyContent: 'center',
          minHeight: 140,
        },
        canvasInner: {
          width: '100%',
          alignItems: 'stretch',
          justifyContent: 'center',
        },
        canvasScrollContent: {
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '100%',
          paddingVertical: 4,
        },
        buttonPreviewBox: {
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 4,
        },
        segmentedPreviewBox: {
          width: '100%',
          paddingVertical: 12,
          alignItems: 'center',
          justifyContent: 'center',
        },
        controlsCard: {
          gap: 14,
        },
        sectionLabel: {
          fontSize: 11,
          fontWeight: '800',
          letterSpacing: 0.7,
          textTransform: 'uppercase',
          marginBottom: 2,
        },
        controlGroup: {
          gap: 6,
        },
        // Standardized Apple-style Grouped Container for State Toggles
        statesGroup: {
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
          borderRadius: Math.min(activeRadiusTokens.card, 12),
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
          padding: 12,
          gap: 8,
        },
        divider: {
          height: StyleSheet.hairlineWidth,
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
          marginVertical: 4,
        },
        specsCard: {
          gap: 12,
        },
        specsGrid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
        },
        specTile: {
          flex: 1,
          minWidth: 90,
          padding: 9,
          borderRadius: Math.min(activeRadiusTokens.card, 12),
          backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
        },
        specTileLabel: {
          fontSize: 9.5,
          fontWeight: '700',
          color: themeColors.textSecondary,
          letterSpacing: 0.4,
          textTransform: 'uppercase',
        },
        specTileVal: {
          fontSize: 13,
          fontWeight: '800',
          color: themeColors.text,
          marginTop: 2,
        },
        // Polished Terminal-style Code Container
        codeContainer: {
          borderRadius: 12,
          backgroundColor: isDark ? '#080C14' : '#0F172A',
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.2)',
          overflow: 'hidden',
        },
        codeHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.1)',
          backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.05)',
        },
        codeHeaderLeft: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
        codeDots: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4.5,
        },
        codeDot: {
          width: 7.5,
          height: 7.5,
          borderRadius: 4,
        },
        dotRed: {
          backgroundColor: '#EF4444',
        },
        dotYellow: {
          backgroundColor: '#F59E0B',
        },
        dotGreen: {
          backgroundColor: '#10B981',
        },
        codeHeaderTitle: {
          fontSize: 10,
          fontWeight: '700',
          color: '#94A3B8',
          letterSpacing: 0.6,
          textTransform: 'uppercase',
        },
        copyBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4.5,
          paddingHorizontal: 8,
          paddingVertical: 3.5,
          borderRadius: 6,
          backgroundColor: 'rgba(255,255,255,0.08)',
        },
        copyBtnText: {
          fontSize: 10.5,
          fontWeight: '600',
          color: '#CBD5E1',
        },
        copyBtnTextSuccess: {
          fontSize: 10.5,
          fontWeight: '700',
          color: '#10B981',
        },
        codeScrollContent: {
          padding: 12,
        },
        codeText: {
          fontFamily: 'monospace',
          fontSize: 12,
          lineHeight: 18,
          color: '#38BDF8',
        },
        // Component-specific scoped styles
        headerWrapper: {
          borderRadius: Math.min(activeRadiusTokens.card, 14),
          overflow: 'hidden',
        },
        placementToggleBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          paddingHorizontal: 8,
          paddingVertical: 3.5,
          borderRadius: 8,
          backgroundColor: isDark ? 'rgba(99, 102, 241, 0.16)' : 'rgba(99, 102, 241, 0.10)',
          borderWidth: 1,
          borderColor: isDark ? 'rgba(99, 102, 241, 0.32)' : 'rgba(99, 102, 241, 0.22)',
        },
        placementToggleText: {
          fontSize: 10.5,
          fontWeight: '700',
          color: isDark ? '#A5B4FC' : '#4F46E5',
          letterSpacing: 0.2,
        },
        bottomNavPreviewWrapper: {
          width: '100%',
          paddingTop: 28,
          paddingBottom: 16,
          justifyContent: 'center',
          alignItems: 'center',
        },
        bottomNavRelative: {
          position: 'relative',
          width: '100%',
          paddingHorizontal: 0,
        },
        customFabOrb: {
          width: 52,
          height: 52,
          borderRadius: 26,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#6366F1',
          borderWidth: 3.5,
          shadowColor: '#6366F1',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.45,
          shadowRadius: 12,
          elevation: 8,
        },
        customFabRadar: {
          width: 52,
          height: 52,
          borderRadius: 26,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDark ? '#020617' : '#0F172A',
          borderWidth: 2.5,
          borderColor: '#06B6D4',
          shadowColor: '#06B6D4',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.45,
          shadowRadius: 10,
          elevation: 8,
        },
        customFabVoice: {
          width: 52,
          height: 52,
          borderRadius: 26,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#EC4899',
          borderWidth: 3.5,
          shadowColor: '#EC4899',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.45,
          shadowRadius: 12,
          elevation: 8,
        },
        customFabHaloLight: {
          borderColor: '#FFFFFF',
        },
        customFabHaloDark: {
          borderColor: '#0F172A',
        },
        bottomNavMiniPlayer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 420,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 20,
          borderWidth: 1,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.12,
          shadowRadius: 8,
          elevation: 3,
        },
        bottomNavMiniPlayerLight: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: 'rgba(0, 0, 0, 0.08)',
        },
        bottomNavMiniPlayerDark: {
          backgroundColor: 'rgba(30, 41, 59, 0.92)',
          borderColor: 'rgba(255, 255, 255, 0.16)',
        },
        bottomNavMiniPlayerLeft: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          flex: 1,
        },
        bottomNavMusicIconBox: {
          width: 32,
          height: 32,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
        },
        bottomNavMiniPlayerInfo: {
          flex: 1,
        },
        bottomNavTrackTitle: {
          fontSize: 12.5,
          fontWeight: '700',
          color: themeColors.text,
        },
        bottomNavTrackSubtitle: {
          fontSize: 10.5,
          color: themeColors.textSecondary,
          marginTop: 1,
        },
        bottomNavMiniPlayerControls: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          marginLeft: 8,
        },
        bottomNavMiniPlayerBtn: {
          padding: 4,
        },
        bottomNavBulkBar: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 8,
          paddingVertical: 4,
        },
        bottomNavBulkLeft: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
        bottomNavBulkText: {
          fontSize: 13,
          fontWeight: '500',
        },
        bottomNavBulkRight: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
        bottomNavBulkCancelBtn: {
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 14,
          borderWidth: 1,
        },
        bottomNavBulkCancelBtnLight: {
          backgroundColor: '#F1F5F9',
          borderColor: 'rgba(0, 0, 0, 0.08)',
        },
        bottomNavBulkCancelBtnDark: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.15)',
        },
        bottomNavBulkCancelText: {
          fontSize: 12,
          fontWeight: '600',
        },
        bottomNavBulkDeleteBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 14,
          backgroundColor: '#EF4444',
        },
        bottomNavBulkDeleteText: {
          fontSize: 12,
          fontWeight: '700',
          color: '#FFFFFF',
        },
        bottomNavBulkCount: {
          fontWeight: '700',
          color: themeColors.primary,
        },
        cardContentGap: {
          gap: 6,
        },
        cardTitle: {
          fontSize: 15,
          fontWeight: '700',
          color: themeColors.text,
        },
        cardSubtitle: {
          fontSize: 13,
          color: themeColors.textSecondary,
        },
        glassCardPadding: {
          padding: 16,
        },
        glassHeaderRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        },
        glassTitle: {
          fontSize: 15,
          fontWeight: '700',
          color: themeColors.text,
        },
        glassDesc: {
          fontSize: 13,
          color: themeColors.textSecondary,
        },
        badgeCenterRow: {
          flexDirection: 'row',
          justifyContent: 'center',
        },
        dialogPreviewBox: {
          alignItems: 'center',
          gap: 10,
        },
        sheetPreviewBox: {
          alignItems: 'center',
          gap: 10,
        },
        skeletonStack: {
          gap: 10,
        },
        skeletonHeaderRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        },
        skeletonCol: {
          gap: 6,
          flex: 1,
        },
        iconTileRow: {
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 16,
        },
        avatarPreviewBox: {
          alignItems: 'center',
          gap: 16,
        },
        avatarRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        },
        dividerStack: {
          width: '100%',
          gap: 16,
        },
        progressStack: {
          width: '100%',
          gap: 12,
        },
        progressControlRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          flexWrap: 'wrap',
        },
        paginationBox: {
          alignItems: 'center',
          gap: 12,
        },
        chipRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          flexWrap: 'wrap',
        },
        otpBox: {
          alignItems: 'center',
          gap: 12,
        },
        ratingBox: {
          alignItems: 'center',
          gap: 12,
        },
        ratingButtonRow: {
          flexDirection: 'row',
          gap: 6,
          justifyContent: 'center',
        },
        toastBox: {
          alignItems: 'center',
          gap: 12,
        },
        loadingPreviewBox: {
          width: '100%',
          minHeight: 280,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 16,
          gap: 14,
        },
        fullscreenTestBtn: {
          marginBottom: 4,
        },
        accordionBox: {
          width: '100%',
        },
        listItemGroupBox: {
          width: '100%',
        },
        previewListGroup: {
          marginBottom: 0,
        },
        sectionHeaderRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        },
        sectionHeaderBetween: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        },
        resetSystemBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4.5,
          paddingHorizontal: 8,
          paddingVertical: 3.5,
          borderRadius: 6,
        },
        resetSystemBtnLight: {
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
        },
        resetSystemBtnDark: {
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
        },
        resetSystemBtnText: {
          fontSize: 10.5,
          fontWeight: '700',
        },
        syncStatusBanner: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingVertical: 6,
          borderRadius: 8,
          borderWidth: 1,
        },
        syncStatusBannerSystemLight: {
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          borderColor: 'rgba(16, 185, 129, 0.2)',
        },
        syncStatusBannerSystemDark: {
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          borderColor: 'rgba(16, 185, 129, 0.25)',
        },
        syncStatusBannerCustomLight: {
          backgroundColor: 'rgba(245, 158, 11, 0.08)',
          borderColor: 'rgba(245, 158, 11, 0.2)',
        },
        syncStatusBannerCustomDark: {
          backgroundColor: 'rgba(245, 158, 11, 0.12)',
          borderColor: 'rgba(245, 158, 11, 0.25)',
        },
        syncStatusLeft: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          flex: 1,
        },
        syncStatusDot: {
          width: 6,
          height: 6,
          borderRadius: 3,
        },
        syncStatusDotSystem: {
          backgroundColor: '#10B981',
        },
        syncStatusDotCustom: {
          backgroundColor: '#F59E0B',
        },
        syncStatusTextSystem: {
          fontSize: 11,
          fontWeight: '600',
          color: '#10B981',
          flex: 1,
        },
        syncStatusTextCustom: {
          fontSize: 11,
          fontWeight: '600',
          color: '#F59E0B',
          flex: 1,
        },
        specTileSub: {
          fontSize: 9,
          fontWeight: '700',
          marginTop: 2,
          letterSpacing: 0.2,
        },
        specTileSubSystem: {
          color: '#10B981',
        },
        specTileSubCustom: {
          color: '#F59E0B',
        },
        headerCenterSelect: {
          maxWidth: 210,
        },
        headerCenterSearchBar: {
          height: 34,
          maxWidth: 220,
        },
        headerCustomBulkRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 4,
        },
        headerCustomBulkLeft: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
        headerCustomBulkBadge: {
          backgroundColor: '#6366F1',
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 12,
        },
        headerCustomBulkBadgeText: {
          color: '#FFFFFF',
          fontSize: 12,
          fontWeight: '700',
        },
        headerCustomBulkTitle: {
          fontSize: 13,
          fontWeight: '600',
          color: themeColors.text,
        },
        headerCustomBulkRight: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
        headerCustomBulkSaveBtn: {
          backgroundColor: '#6366F1',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
        },
        headerCustomBulkSaveText: {
          color: '#FFFFFF',
          fontSize: 12,
          fontWeight: '600',
        },
        headerCustomBulkCancelBtn: {
          backgroundColor: isDark ? '#334155' : '#E2E8F0',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
        },
        headerCustomBulkCancelText: {
          color: themeColors.textSecondary,
          fontSize: 12,
          fontWeight: '600',
        },
      }),
    [themeColors, activeRadiusTokens, isDark]
  );

  return (
    <View style={styles.container}>
      {/* 1. TOP BREADCRUMB & STEPPER */}
      <View style={styles.topNav}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            haptics.light();
            onBackToCatalog();
          }}
          activeOpacity={0.7}
        >
          <ArrowLeft size={14} color={themeColors.text} strokeWidth={2.5} />
          <AppText style={styles.backButtonText}>Danh mục linh kiện</AppText>
        </TouchableOpacity>

        <View style={styles.stepperGroup}>
          <TouchableOpacity
            style={[styles.stepperBtn, !prevComponent && styles.stepperBtnDisabled]}
            disabled={!prevComponent}
            onPress={() => {
              if (prevComponent) {
                haptics.light();
                onSelectComponent(prevComponent.id);
              }
            }}
          >
            <ChevronLeft size={16} color={themeColors.text} strokeWidth={2.2} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.stepperBtn, !nextComponent && styles.stepperBtnDisabled]}
            disabled={!nextComponent}
            onPress={() => {
              if (nextComponent) {
                haptics.light();
                onSelectComponent(nextComponent.id);
              }
            }}
          >
            <ChevronRight size={16} color={themeColors.text} strokeWidth={2.2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. COMPONENT OVERVIEW HEADER */}
      <AppCard style={styles.headerCard}>
        <View style={styles.titleRow}>
          <AppText style={[styles.componentTitle, { color: themeColors.text }]} numberOfLines={1}>
            {component.name}
          </AppText>
          <View style={styles.categoryTag}>
            <AppText style={styles.categoryTagText}>{component.category}</AppText>
          </View>
        </View>
        <AppText style={styles.componentDesc}>{component.description}</AppText>
      </AppCard>

      {/* 3. DEDICATED PREVIEW CANVAS STAGE */}
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
                  items={bottomNavItems}
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
                              setBottomNavHasTopContent(false);
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
                    onPress={() => setProgressVal(Math.max(0, progressVal - 10))}
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
                    onPress={() => setProgressVal(Math.min(100, progressVal + 10))}
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
                  leftIcon={<SlidersHorizontal size={16} color="#FFFFFF" />}
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

      {/* 4. INTERACTIVE PROPS CONTROLS PANEL */}
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
            options={[
              { label: 'Hệ Thống', value: 'system' },
              { label: 'Sắc Nét', value: 'sharp' },
              { label: 'Gọn Gàng', value: 'compact' },
              { label: 'Chuẩn', value: 'standard' },
              { label: 'Pill', value: 'smooth' },
            ]}
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
            formatValue={(val) =>
              val === 0
                ? '0px (Vuông)'
                : val >= 24
                ? `${val}px (Pill)`
                : `${val}px`
            }
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
            <AppSegmentedControl<ControlSizeKey>
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
                setControlVariant(val as ControlVariant);
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
          <AppSegmentedControl<ControlContrast>
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
            <View style={styles.controlGroup}>
              <AppSelect
                label="BIẾN THỂ PHONG CÁCH (VARIANT)"
                options={bottomNavVariantOptions}
                value={bottomNavVariant}
                onSelect={(val) => {
                  haptics.light();
                  setBottomNavVariant(val as BottomNavVariant);
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
                  setBottomNavPlacement(val as BottomNavPlacement);
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
                  setBottomNavIndicator(val as BottomNavIndicator);
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
                  setBottomNavItemLayout(val as BottomNavItemLayout);
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
                        setBottomNavFabShape(val as BottomNavFabShape);
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
                      setBottomNavFabPlacement(val as BottomNavFabPlacement);
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
                      formatValue={(val) =>
                        val === 0
                          ? '0px (Chìm)'
                          : val === 22
                          ? '22px (Chuẩn)'
                          : `${val}px (${val > 22 ? 'Nhô cao' : 'Nhô nhẹ'})`
                      }
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
              options={[
                { label: 'Filled (Nền Đầy)', value: 'filled' },
                { label: 'Outline (Viền Mảnh)', value: 'outline' },
                { label: 'Glass (Kính Mờ)', value: 'glass' },
              ]}
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
            <AppSegmentedControl<ToastType>
              size="md"
              options={[
                { label: 'Success', value: 'success' },
                { label: 'Error', value: 'error' },
                { label: 'Warning', value: 'warning' },
                { label: 'Info', value: 'info' },
              ]}
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
              formatValue={(val) => `Trang ${val + 1} / 5`}
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
              <AppSegmentedControl<'online' | 'busy' | 'away' | 'offline'>
                size="md"
                options={[
                  { label: 'Online', value: 'online' },
                  { label: 'Bận', value: 'busy' },
                  { label: 'Vắng', value: 'away' },
                  { label: 'Ẩn', value: 'offline' },
                ]}
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
                formatValue={(val) => (val === 0 ? 'Tắt huy hiệu' : `${val} thông báo`)}
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
              <AppSegmentedControl<LoadingPosition>
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
              <AppSegmentedControl<LoadingVariant>
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
              <AppSegmentedControl<LoadingAnimationType>
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
                <AppSegmentedControl<string>
                  size="sm"
                  options={[
                    { label: '25%', value: '25' },
                    { label: '50%', value: '50' },
                    { label: '68%', value: '68' },
                    { label: '85%', value: '85' },
                    { label: '100%', value: '100' },
                  ]}
                  value={String(loadingProgressVal)}
                  onChange={(val) => setLoadingProgressVal(Number(val))}
                />
              </View>
            )}
          </>
        )}

        {/* Standardized Interactive States via AppSwitch (Chuẩn hóa toàn diện phong cách Apple Settings) */}
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

      {/* 5. DESIGN TOKENS & USAGE CODE SNIPPET */}
      <AppCard style={styles.specsCard}>
        <View style={styles.sectionHeaderRow}>
          <Code2 size={14} color="#10B981" strokeWidth={2.4} />
          <AppText style={[styles.sectionLabel, { color: themeColors.text }]}>
            THÔNG SỐ TOKENS & CODE MẪU
          </AppText>
        </View>

        <View style={styles.specsGrid}>
          {component.hasParity && (
            <View style={styles.specTile}>
              <AppText style={styles.specTileLabel}>Chiều Cao</AppText>
              <AppText style={styles.specTileVal}>{currentHeight}px</AppText>
            </View>
          )}
          <View style={styles.specTile}>
            <AppText style={styles.specTileLabel}>Bo Góc (Radius)</AppText>
            <AppText style={styles.specTileVal}>
              {component.category === 'organisms'
                ? `${activeRadiusTokens.card}px`
                : activeRadiusTokens.control >= 999
                ? 'Full Pill'
                : `${activeRadiusTokens.control}px`}
            </AppText>
            <AppText
              style={[
                styles.specTileSub,
                isSystemRadius ? styles.specTileSubSystem : styles.specTileSubCustom,
              ]}
            >
              {isSystemRadius ? 'Chuẩn Hệ Thống' : 'Thử Nghiệm Sandbox'}
            </AppText>
          </View>
          <View style={styles.specTile}>
            <AppText style={styles.specTileLabel}>Chế độ giao diện</AppText>
            <AppText style={styles.specTileVal}>
              {isGlassPreview ? 'Liquid Glass' : isDark ? 'Dark Mode' : 'Light Mode'}
            </AppText>
          </View>
        </View>

        {/* Polished Terminal IDE Code Container */}
        <View style={styles.codeContainer}>
          <View style={styles.codeHeader}>
            <View style={styles.codeHeaderLeft}>
              <View style={styles.codeDots}>
                <View style={[styles.codeDot, styles.dotRed]} />
                <View style={[styles.codeDot, styles.dotYellow]} />
                <View style={[styles.codeDot, styles.dotGreen]} />
              </View>
              <AppText style={styles.codeHeaderTitle}>JSX MÃ NGUỒN</AppText>
            </View>
            <TouchableOpacity
              style={styles.copyBtn}
              onPress={handleCopyCode}
              activeOpacity={0.7}
            >
              {copied ? (
                <>
                  <Check size={11} color="#10B981" strokeWidth={2.5} />
                  <AppText style={styles.copyBtnTextSuccess}>Đã chép</AppText>
                </>
              ) : (
                <>
                  <Copy size={11} color="#94A3B8" strokeWidth={2.2} />
                  <AppText style={styles.copyBtnText}>Sao chép</AppText>
                </>
              )}
            </TouchableOpacity>
          </View>
          <AppScrollView
            horizontal
            indicatorVisible={true}
            indicatorThickness={2.5}
            indicatorLength={34}
            indicatorInsets={{ left: 8, right: 8, bottom: 2 }}
            nestedScrollEnabled
            contentContainerStyle={styles.codeScrollContent}
          >
            <AppText style={styles.codeText}>{generateSnippet()}</AppText>
          </AppScrollView>

        </View>
      </AppCard>
    </View>
  );
};
