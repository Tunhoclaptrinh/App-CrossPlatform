import type {
  ComponentId,
  ComponentMeta,
  PreviewCanvasBackground,
} from '../../types';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig, RadiusPreset, ControlSizeKey } from '@/constants/theme';
import type {
  ControlVariant,
  ControlContrast,
  ChipVariant,
  ToastType,
  BottomNavVariant,
  BottomNavIndicator,
  BottomNavItemLayout,
  BottomNavFabShape,
  BottomNavFabPlacement,
  BottomNavPlacement,
  LoadingPosition,
  LoadingVariant,
  LoadingAnimationType,
} from '@/components';

export type ShadowLevel = 'none' | 'sm' | 'md' | 'lg';

export interface ComponentPreviewStageProps {
  component: ComponentMeta;
  allComponents: ComponentMeta[];
  onBackToCatalog: () => void;
  onSelectComponent: (id: ComponentId) => void;
  onOpenLayoutLab?: () => void;
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass?: boolean;
  onResetScroll?: () => void;
}

export interface PreviewStageHeaderProps {
  component: ComponentMeta;
  prevComponent: ComponentMeta | null;
  nextComponent: ComponentMeta | null;
  onBackToCatalog: () => void;
  onSelectComponent: (id: ComponentId) => void;
  themeColors: ThemeColors;
  styles: any;
}

export interface PreviewCanvasCardProps {
  component: ComponentMeta;
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  activeRadiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass: boolean;
  isGlassPreview: boolean;
  styles: any;
  canvasBg: PreviewCanvasBackground;
  setCanvasBg: (bg: PreviewCanvasBackground) => void;
  getCanvasBackground: () => string;
  onOpenLayoutLab?: () => void;

  // Control Props
  controlSize: ControlSizeKey;
  effectiveControlVariant: ControlVariant;
  effectiveButtonVariant: 'primary' | 'secondary' | 'outline' | 'tonal' | 'glass' | 'danger' | 'success';
  controlContrast: ControlContrast;
  controlShadow: ShadowLevel;
  buttonIconColor: string;
  hasIcon: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  isFullWidth: boolean;
  hasError: boolean;

  // State Props
  textVal: string;
  setTextVal: (v: string) => void;
  searchVal: string;
  setSearchVal: (v: string) => void;
  selectVal: string;
  setSelectVal: (v: string) => void;
  switchVal: boolean;
  setSwitchVal: (v: boolean) => void;
  checkboxVal: boolean;
  setCheckboxVal: (v: boolean) => void;

  // Header Props
  headerVariant: 'standard' | 'floating-pill' | 'frosted-capsule';
  headerPlacement: 'top' | 'bottom';
  setHeaderPlacement: React.Dispatch<React.SetStateAction<'top' | 'bottom'>>;
  headerActionStyle: 'individual' | 'capsule';
  headerCenterSlot: 'title' | 'select' | 'searchbar';
  headerExpansionPosition: 'both' | 'inner' | 'bottom';
  headerCustomMode: boolean;
  setHeaderCustomMode: (v: boolean) => void;

  // BottomNav Props
  bottomNavVariant: BottomNavVariant;
  bottomNavPlacement: BottomNavPlacement;
  setBottomNavPlacement: React.Dispatch<React.SetStateAction<BottomNavPlacement>>;
  bottomNavIndicator: BottomNavIndicator;
  bottomNavItemLayout: BottomNavItemLayout;
  bottomNavFabShape: BottomNavFabShape;
  bottomNavFabPlacement: BottomNavFabPlacement;
  bottomNavLiftOffset: number;
  bottomNavCustomFabType: 'standard' | 'ai-orb' | 'qr-radar' | 'voice-wave';
  bottomNavShowLabels: boolean;
  bottomNavHasFab: boolean;
  bottomNavHasTopContent: boolean;
  bottomNavCustomMode: boolean;
  setBottomNavCustomMode: (v: boolean) => void;
  activeBottomTab: string;
  setActiveBottomTab: (tab: string) => void;
  miniPlayerPlaying: boolean;
  setMiniPlayerPlaying: React.Dispatch<React.SetStateAction<boolean>>;

  // Other components
  cardVariant: 'elevated' | 'outlined' | 'flat' | 'glass';
  cardDynamicRadiusStyle: any;
  badgeVariant: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  segmentedVariant: 'standard' | 'glass' | 'pill' | 'tonal' | 'outline';
  segmentedVal: string;
  setSegmentedVal: (v: string) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (v: boolean) => void;
  isSheetOpen: boolean;
  setIsSheetOpen: (v: boolean) => void;
  progressVal: number;
  setProgressVal: React.Dispatch<React.SetStateAction<number>>;
  activeDot: number;
  setActiveDot: (v: number) => void;
  radioVal: string;
  setRadioVal: (v: string) => void;
  chipSelected: boolean;
  setChipSelected: (v: boolean) => void;
  chipVariant: ChipVariant;
  otpVal: string;
  setOtpVal: (v: string) => void;
  otpSecure: boolean;
  ratingVal: number;
  setRatingVal: (v: number) => void;
  listSwitchVal: boolean;
  setListSwitchVal: (v: boolean) => void;
  isToastOpen: boolean;
  setIsToastOpen: (v: boolean) => void;
  toastType: ToastType;
  accordionExpanded: boolean;
  setAccordionExpanded: (v: boolean) => void;
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: (v: boolean) => void;
  dividerDashed: boolean;
  dividerThickness: number;
  avatarBadgeCount: number;
  avatarStatus: 'online' | 'busy' | 'away' | 'offline';
  widgetRefreshing: boolean;
  setWidgetRefreshing: (v: boolean) => void;
  gestureAction: string;
  setGestureAction: (v: string) => void;
  isOfflineBannerVisible: boolean;
  setIsOfflineBannerVisible: (v: boolean) => void;

  // Loading Overlay
  loadingPosition: LoadingPosition;
  loadingVariant: LoadingVariant;
  loadingAnimType: LoadingAnimationType;
  loadingShowProgress: boolean;
  loadingProgressVal: number;
  isFullscreenLoading: boolean;
  setIsFullscreenLoading: (v: boolean) => void;
}

export interface PreviewControlsCardProps {
  component: ComponentMeta;
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  activeRadiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass: boolean;
  isGlassPreview: boolean;
  setIsGlassPreview: (v: boolean) => void;
  styles: any;

  // Radius sandbox
  overrideRadius: RadiusPreset | 'system';
  setOverrideRadius: (r: RadiusPreset | 'system') => void;
  customRadiusValue: number | null;
  setCustomRadiusValue: (v: number | null) => void;
  currentScrubberValue: number;
  isFullySystemSynced: boolean;
  handleResetToSystem: () => void;
  onOpenLayoutLab?: () => void;

  // Common Controls
  controlSize: ControlSizeKey;
  setControlSize: (s: ControlSizeKey) => void;
  controlContrast: ControlContrast;
  setControlContrast: (c: ControlContrast) => void;
  controlShadow: ShadowLevel;
  setControlShadow: (s: ShadowLevel) => void;
  controlVariant: ControlVariant;
  setControlVariant: (v: ControlVariant) => void;
  buttonVariant: 'primary' | 'secondary' | 'outline' | 'tonal' | 'glass' | 'danger' | 'success';
  setButtonVariant: (v: any) => void;

  // Toggles
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  isDisabled: boolean;
  setIsDisabled: (v: boolean) => void;
  hasIcon: boolean;
  setHasIcon: (v: boolean) => void;
  hasError: boolean;
  setHasError: (v: boolean) => void;
  isFullWidth: boolean;
  setIsFullWidth: (v: boolean) => void;

  // Component-specific props
  cardVariant: 'elevated' | 'outlined' | 'flat' | 'glass';
  setCardVariant: (v: any) => void;
  badgeVariant: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  setBadgeVariant: (v: any) => void;
  segmentedVariant: 'standard' | 'glass' | 'pill' | 'tonal' | 'outline';
  setSegmentedVariant: (v: any) => void;

  // Header options
  headerVariant: 'standard' | 'floating-pill' | 'frosted-capsule';
  setHeaderVariant: (v: any) => void;
  headerPlacement: 'top' | 'bottom';
  setHeaderPlacement: (v: any) => void;
  headerActionStyle: 'individual' | 'capsule';
  setHeaderActionStyle: (v: any) => void;
  headerCenterSlot: 'title' | 'select' | 'searchbar';
  setHeaderCenterSlot: (v: any) => void;
  headerExpansionPosition: 'both' | 'inner' | 'bottom';
  setHeaderExpansionPosition: (v: any) => void;
  headerCustomMode: boolean;
  setHeaderCustomMode: (v: boolean) => void;

  // BottomNav options
  bottomNavVariant: BottomNavVariant;
  setBottomNavVariant: (v: BottomNavVariant) => void;
  bottomNavPlacement: BottomNavPlacement;
  setBottomNavPlacement: (v: BottomNavPlacement) => void;
  bottomNavIndicator: BottomNavIndicator;
  setBottomNavIndicator: (v: BottomNavIndicator) => void;
  bottomNavItemLayout: BottomNavItemLayout;
  setBottomNavItemLayout: (v: BottomNavItemLayout) => void;
  bottomNavFabShape: BottomNavFabShape;
  setBottomNavFabShape: (v: BottomNavFabShape) => void;
  bottomNavFabPlacement: BottomNavFabPlacement;
  setBottomNavFabPlacement: (v: BottomNavFabPlacement) => void;
  bottomNavLiftOffset: number;
  setBottomNavLiftOffset: (v: number) => void;
  bottomNavCustomFabType: 'standard' | 'ai-orb' | 'qr-radar' | 'voice-wave';
  setBottomNavCustomFabType: (v: any) => void;
  bottomNavShowLabels: boolean;
  setBottomNavShowLabels: (v: boolean) => void;
  bottomNavHasFab: boolean;
  setBottomNavHasFab: (v: boolean) => void;
  bottomNavHasTopContent: boolean;
  setBottomNavHasTopContent: (v: boolean) => void;
  bottomNavCustomMode: boolean;
  setBottomNavCustomMode: (v: boolean) => void;

  // Other components
  chipVariant: ChipVariant;
  setChipVariant: (v: ChipVariant) => void;
  otpSecure: boolean;
  setOtpSecure: (v: boolean) => void;
  toastType: ToastType;
  setToastType: (v: ToastType) => void;
  dividerDashed: boolean;
  setDividerDashed: (v: boolean) => void;
  dividerThickness: number;
  setDividerThickness: (v: number) => void;
  avatarBadgeCount: number;
  setAvatarBadgeCount: (v: number) => void;
  avatarStatus: 'online' | 'busy' | 'away' | 'offline';
  setAvatarStatus: (v: any) => void;
  progressVal: number;
  setProgressVal: React.Dispatch<React.SetStateAction<number>>;
  ratingVal: number;
  setRatingVal: (v: number) => void;
  activeDot: number;
  setActiveDot: (v: number) => void;
  widgetRefreshing: boolean;
  setWidgetRefreshing: (v: boolean) => void;
  setGestureAction: (v: string) => void;

  // Loading Overlay
  loadingPosition: LoadingPosition;
  setLoadingPosition: (v: LoadingPosition) => void;
  loadingVariant: LoadingVariant;
  setLoadingVariant: (v: LoadingVariant) => void;
  loadingAnimType: LoadingAnimationType;
  setLoadingAnimType: (v: LoadingAnimationType) => void;
  loadingShowProgress: boolean;
  setLoadingShowProgress: (v: boolean) => void;
  loadingProgressVal: number;
  setLoadingProgressVal: (v: number) => void;
}

export interface CodeSnippetCardProps {
  component: ComponentMeta;
  themeColors: ThemeColors;
  activeRadiusTokens: RadiusPresetConfig;
  currentHeight: number;
  isDark: boolean;
  isGlassPreview: boolean;
  isSystemRadius: boolean;
  styles: any;
  snippet: string;
  copied: boolean;
  onCopyCode: () => void;
}
