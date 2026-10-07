/**
 * Atomic Design System Component Architecture
 * 
 * 1. ATOMS:      Fundamental primitives (Text, Badge, Logo, Skeleton, IconTile, MeshBackground)
 * 2. MOLECULES:  Interactive unit controls (Button, Input, Select, SearchBar, Switch, Checkbox, EmptyState)
 * 3. ORGANISMS:   Complex feature sections (Card, GlassCard, AppleGlassCard, ConfirmDialog, etc.)
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

import { AppText } from './AppText';
import { AppBadge } from './AppBadge';
import { AppLogo } from './AppLogo';
import { Skeleton } from './Skeleton';
import { CupertinoIconTile } from './CupertinoIconTile';
import { AppleMeshBackground } from './AppleMeshBackground';

export const Atoms = {
  AppText,
  AppBadge,
  AppLogo,
  Skeleton,
  CupertinoIconTile,
  AppleMeshBackground,
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
export * from './EmptyState';
export * from './AppSegmentedControl';
export * from './surfaceUtils';

import { AppButton } from './AppButton';
import { AppInput } from './AppInput';
import { AppSelect } from './AppSelect';
import { AppSearchBar } from './AppSearchBar';
import { AppSwitch } from './AppSwitch';
import { AppCheckbox } from './AppCheckbox';
import { EmptyState } from './EmptyState';
import { AppSegmentedControl } from './AppSegmentedControl';

export const Molecules = {
  AppButton,
  AppInput,
  AppSelect,
  AppSearchBar,
  AppSwitch,
  AppCheckbox,
  EmptyState,
  AppSegmentedControl,
} as const;

// ============================================================================
// 3. ORGANISMS (Sinh Vật)
// ============================================================================
export * from './AppCard';
export * from './GlassCard';
export * from './AppleGlassCard';
export * from './GlassTile';
export * from './WidgetCard';
export * from './GestureCard';
export * from './AppHeader';
export * from './ConfirmDialog';
export * from './LoadingOverlay';
export * from './OfflineBanner';
export * from './OptimizedList';
export * from './ThemeStudioModal';
export * from './AppActionSheet';
export * from './ErrorBoundary';
export * from './AppWebView';

import { AppCard } from './AppCard';
import { GlassCard } from './GlassCard';
import { AppleGlassCard } from './AppleGlassCard';
import { GlassTile } from './GlassTile';
import { WidgetCard } from './WidgetCard';
import { GestureCard } from './GestureCard';
import { AppHeader } from './AppHeader';
import { ConfirmDialog } from './ConfirmDialog';
import { AppActionSheet } from './AppActionSheet';
import { LoadingOverlay } from './LoadingOverlay';
import { OfflineBanner } from './OfflineBanner';
import { OptimizedList } from './OptimizedList';
import { ThemeStudioModal } from './ThemeStudioModal';
import { ErrorBoundary } from './ErrorBoundary';
import { AppWebView } from './AppWebView';

export const Organisms = {
  AppCard,
  GlassCard,
  AppleGlassCard,
  GlassTile,
  WidgetCard,
  GestureCard,
  AppHeader,
  ConfirmDialog,
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

import { ScreenWrapper } from './ScreenWrapper';

export const Templates = {
  ScreenWrapper,
} as const;