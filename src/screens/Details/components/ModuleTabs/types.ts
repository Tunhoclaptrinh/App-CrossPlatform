import type { LucideIcon } from 'lucide-react-native';
import type { RadiusPresetConfig } from '@/constants/theme';

export interface ModuleTabItem {
  id: string;
  label: string;
  fullTitle: string;
  desc: string;
  icon: LucideIcon;
  color: string;
}

export interface ModuleTabsProps {
  tabs: ModuleTabItem[];
  activeModule: string;
  onSelectTab: (id: string) => void;
  isDark: boolean;
  radiusTokens: RadiusPresetConfig;
  isGlass?: boolean;
}
