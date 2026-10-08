import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

export interface StorybookShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass?: boolean;
  onResetScroll?: () => void;
  externalSearchQuery?: string;
  onExternalSearchQueryChange?: (query: string) => void;
}

export type StoryCategory = 'all' | 'molecules' | 'organisms' | 'atoms' | 'parity' | 'motion';

export type ComponentId =
  | 'button'
  | 'input'
  | 'select'
  | 'searchbar'
  | 'header'
  | 'apple-glass-card'
  | 'card'
  | 'widget-card'

  | 'gesture-card'
  | 'badge'
  | 'switch'
  | 'checkbox'
  | 'confirm-dialog'
  | 'action-sheet'
  | 'skeleton'
  | 'icon-tile'
  | 'segmented-control'
  | 'empty-state'
  | 'avatar'
  | 'divider'
  | 'progress'
  | 'pagination'
  | 'radio'
  | 'chip'
  | 'otp'
  | 'rating'
  | 'list-item'
  | 'toast'
  | 'accordion'
  | 'bottom-sheet'
  | 'loading-overlay'
  | 'offline-banner';

export interface ComponentMeta {
  id: ComponentId;
  name: string;
  category: 'molecules' | 'organisms' | 'atoms';
  description: string;
  tags: string[];
  icon: any;
  hasParity?: boolean;
}

export type PreviewCanvasBackground = 'default' | 'card' | 'contrast' | 'mesh';
