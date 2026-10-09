/**
 * Atomic Design System Component Architecture
 * 
 * 1. ATOMS:      Fundamental primitives (Text, Badge, Logo, Skeleton, IconTile, MeshBackground, Avatar, Divider, ProgressBar, PaginationDots)
 * 2. MOLECULES:  Interactive unit controls (Button, Input, Select, SearchBar, Switch, Checkbox, Radio, Chip, OtpInput, Rating, ListItem, EmptyState, SegmentedControl)
 * 3. ORGANISMS:   Complex feature sections (Card, AppleGlassCard, ConfirmDialog, Accordion, BottomSheet, Toast, ActionSheet, Header, etc.)

 * 4. TEMPLATES:  Screen framing & layout wrappers (ScreenWrapper)
 */

// ============================================================================
// 1. ATOMS (Nguyên Tử)
// ============================================================================
export * from './AppText';
export * from './AppBadge';
export * from './AppLogo';
export * from './Skeleton';
export * from './CupertinoIconTile';
export * from './AppleMeshBackground';
export * from './AppAvatar';
export * from './AppDivider';
export * from './AppProgressBar';
export * from './PaginationDots';

import { AppText } from './AppText';
import { AppBadge } from './AppBadge';
import { AppLogo } from './AppLogo';
import { Skeleton } from './Skeleton';
import { CupertinoIconTile } from './CupertinoIconTile';
import { AppleMeshBackground } from './AppleMeshBackground';
import { AppAvatar, AppAvatarGroup } from './AppAvatar';
import { AppDivider } from './AppDivider';
import { AppProgressBar } from './AppProgressBar';
import { PaginationDots } from './PaginationDots';

export const Atoms = {
  AppText,
  AppBadge,
  AppLogo,
  Skeleton,
  CupertinoIconTile,
  AppleMeshBackground,
  AppAvatar,
  AppAvatarGroup,
  AppDivider,
  AppProgressBar,
  PaginationDots,
} as const;

// ============================================================================
// 2. MOLECULES (Phân Tử)
// ============================================================================
export * from './AppButton';
export * from './AppInput';
export * from './AppSelect';
export * from './AppSearchBar';
export * from './AppSwitch';
export * from './AppCheckbox';
export * from './AppRadio';
export * from './AppChip';
export * from './AppOtpInput';
export * from './AppRating';
export * from './AppListItem';
export * from './EmptyState';
export * from './AppSegmentedControl';
export * from './surfaceUtils';

import { AppButton } from './AppButton';
import { AppInput } from './AppInput';
import { AppSelect } from './AppSelect';
import { AppSearchBar } from './AppSearchBar';
import { AppSwitch } from './AppSwitch';
import { AppCheckbox } from './AppCheckbox';
import { AppRadio, AppRadioGroup } from './AppRadio';
import { AppChip } from './AppChip';
import { AppOtpInput } from './AppOtpInput';
import { AppRating } from './AppRating';
import { AppListItem, AppListGroup } from './AppListItem';
import { EmptyState } from './EmptyState';
import { AppSegmentedControl } from './AppSegmentedControl';

export const Molecules = {
  AppButton,
  AppInput,
  AppSelect,
  AppSearchBar,
  AppSwitch,
  AppCheckbox,
  AppRadio,
  AppRadioGroup,
  AppChip,
  AppOtpInput,
  AppRating,
  AppListItem,
  AppListGroup,
  EmptyState,
  AppSegmentedControl,
} as const;

// ============================================================================
// 3. ORGANISMS (Sinh Vật)
// ============================================================================
export * from './AppCard';
export * from './AppleGlassCard';
export * from './GlassTile';
export * from './WidgetCard';
export * from './GestureCard';
export * from './AppHeader';
export * from './ConfirmDialog';
export * from './AppToast';
export * from './AppAccordion';
export * from './AppBottomSheet';
export * from './LoadingOverlay';
export * from './OfflineBanner';
export * from './OptimizedList';
export * from './ThemeStudioModal';
export * from './AppActionSheet';
export * from './ErrorBoundary';
export * from './AppWebView';
export * from './AppBottomNav';

import { AppCard } from './AppCard';
import { AppleGlassCard } from './AppleGlassCard';
import { GlassTile } from './GlassTile';
import { WidgetCard } from './WidgetCard';
import { GestureCard } from './GestureCard';
import { AppHeader } from './AppHeader';
import { AppBottomNav } from './AppBottomNav';
import { ConfirmDialog } from './ConfirmDialog';
import { AppToast, ToastProvider } from './AppToast';
import { AppAccordion } from './AppAccordion';
import { AppBottomSheet } from './AppBottomSheet';
import { AppActionSheet } from './AppActionSheet';
import { LoadingOverlay } from './LoadingOverlay';
import { OfflineBanner } from './OfflineBanner';
import { OptimizedList } from './OptimizedList';
import { ThemeStudioModal } from './ThemeStudioModal';
import { ErrorBoundary } from './ErrorBoundary';
import { AppWebView } from './AppWebView';

export const Organisms = {
  AppCard,
  AppleGlassCard,
  GlassTile,
  WidgetCard,
  GestureCard,
  AppHeader,
  AppBottomNav,
  ConfirmDialog,
  AppToast,
  ToastProvider,
  AppAccordion,
  AppBottomSheet,
  AppActionSheet,
  LoadingOverlay,
  OfflineBanner,
  OptimizedList,
  ThemeStudioModal,
  ErrorBoundary,
  AppWebView,
} as const;

// ============================================================================
// 4. TEMPLATES (Bố Cục / Khung Mẫu)
// ============================================================================
export * from './ScreenWrapper';
export * from './AppScrollView';

import { ScreenWrapper } from './ScreenWrapper';
import { AppScrollView } from './AppScrollView';

export const Templates = {
  ScreenWrapper,
  AppScrollView,
} as const;