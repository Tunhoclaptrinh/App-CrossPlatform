import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';

export interface StorybookShowcaseProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass?: boolean;
}

export type StoryCategory = 'all' | 'molecules' | 'organisms' | 'atoms' | 'parity';

export type ComponentId =
  | 'button'
  | 'input'
  | 'select'
  | 'searchbar'
  | 'header'
  | 'apple-glass-card'
  | 'glass-card'
  | 'card'
  | 'badge'
  | 'switch'
  | 'checkbox'
  | 'confirm-dialog'
  | 'action-sheet'
  | 'skeleton'
  | 'icon-tile'
  | 'segmented-control'
  | 'empty-state';

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
