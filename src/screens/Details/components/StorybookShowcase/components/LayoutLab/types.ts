import type { ReactNode } from 'react';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';
import type { BottomNavItem } from '@/components';

export type LayoutPresetKey = 'classic' | 'inverted' | 'floating' | 'glass' | 'bottom-only' | 'top-only';
export type MiddleContentMode = 'sensors' | 'article' | 'bento' | 'forms' | 'feed';
export type CenterFabType = 'standard' | 'ai-orb' | 'qr-radar' | 'voice-wave' | 'pill-badge';

export interface LayoutLabViewProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  isGlass?: boolean;
  onOpenFullScreen?: () => void;
}

export interface SensorsFeedProps {
  themeColors: ThemeColors;
  styles: any;
  fanRunning: boolean;
  setFanRunning: (val: boolean) => void;
  alarmActive: boolean;
  setAlarmActive: (val: boolean) => void;
  pumpActive: boolean;
  setPumpActive: (val: boolean) => void;
}

export interface ArticleFeedProps {
  themeColors: ThemeColors;
  styles: any;
}

export interface BentoDashboardProps {
  themeColors: ThemeColors;
  styles: any;
}

export interface FormsSandboxProps {
  themeColors: ThemeColors;
  styles: any;
  formInputText: string;
  setFormInputText: (val: string) => void;
  formEmailText: string;
  setFormEmailText: (val: string) => void;
  formOffice: string;
  setFormOffice: (val: string) => void;
  form2FA: boolean;
  setForm2FA: (val: boolean) => void;
}

export interface TransactionsFeedProps {
  themeColors: ThemeColors;
  styles: any;
}

export interface LayoutLabStageProps {
  themeColors: ThemeColors;
  isDark: boolean;
  styles: any;
  isStageExpanded: boolean;
  showTopDock: boolean;
  showBottomDock: boolean;
  isTopNav: boolean;
  dockVariant: any;
  headerVariant: any;
  dockBorderRadius: number;
  dynamicDockMarginStyle: any;
  navItems: BottomNavItem[];
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
  fabShape: 'circle' | 'squircle';
  fabPlacement: 'lifted' | 'embedded';
  fabLiftOffset: number;
  renderCenterFabComponent: ReactNode | undefined;
  dynamicMiddleScrollStyle: any;
  contentMode: MiddleContentMode;
  renderContentNode: ReactNode;
}

export interface LayoutLabControlsDeckProps {
  themeColors: ThemeColors;
  isDark: boolean;
  styles: any;
  fabLiftOffset: number;
  setFabLiftOffset: (val: number) => void;
  dockEdgeMargin: number;
  setDockEdgeMargin: (val: number) => void;
  dockBorderRadius: number;
  setDockBorderRadius: (val: number) => void;
  autoClearance: boolean;
  setAutoClearance: (val: boolean) => void;
  manualPaddingTop: number;
  setManualPaddingTop: (val: number) => void;
  manualPaddingBottom: number;
  setManualPaddingBottom: (val: number) => void;
  centerFabType: CenterFabType;
  setCenterFabType: (val: CenterFabType) => void;
  fabShape: 'circle' | 'squircle';
  setFabShape: (val: 'circle' | 'squircle') => void;
  fabPlacement: 'lifted' | 'embedded';
  setFabPlacement: (val: 'lifted' | 'embedded') => void;
}
