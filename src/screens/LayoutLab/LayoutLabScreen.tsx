import React, { useState, useMemo, useCallback } from 'react';
import { View, TouchableOpacity, LayoutAnimation } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Sparkles,
  Compass,
  Home,
  Folder,
  User,
  Bell,
  Heart,
  ArrowUpDown,
  Palette,
  ScanLine,
  Mic,
  Plus,
  Sliders,
  Layers,
  Sun,
  Moon,
  RotateCcw,
  Zap,
  Box,
} from 'lucide-react-native';
import {
  AppHeader,
  AppBottomNav,
  AppText,
  AppCard,
  AppBadge,
  AppSwitch,
  AppRadio,
  AppActionSheet,
  AppSegmentedControl,
  type SegmentOption,
  ScreenWrapper,
  BottomNavItem,
  type MeshVariant,
} from '@/components';
import { useThemeMode } from '@/hooks';
import { haptics } from '@/utils';

import type { LayoutLabScreenProps } from '@/navigation/types';
import type { RadiusPreset, ControlSizeKey } from '@/constants/theme';
import type { AccentColor } from '@/constants/colors';
import type { ControlContrast, ControlVariant } from '@/components/common/surfaceUtils';
import type { FontScale, ThemeMode } from '@/hooks/useAppStore';
import type {
  AppHeaderVariant,
  AppHeaderBackStyle,
  AppHeaderActionStyle,
  HeaderTitleAlign,
} from '@/components/common/AppHeader/types';
import type {
  BottomNavVariant,
  BottomNavIndicator,
  BottomNavItemLayout,
  BottomNavSize,
  BottomNavFabShape,
  BottomNavFabPlacement,
  BottomNavMode,
} from '@/components/common/AppBottomNav/types';
import { createLayoutLabScreenStyles } from './styles';

type StudioTab = 'theme' | 'header' | 'nav' | 'fab' | 'presets';
type CustomFabType = 'ai-orb' | 'qr-radar' | 'voice-wave' | 'standard';

interface ColorOption {
  label: string;
  color: string;
  value?: string;
}

const STUDIO_SEGMENT_OPTIONS: SegmentOption<StudioTab>[] = [
  { value: 'theme', label: 'Theme', icon: <Palette size={13} /> },
  { value: 'header', label: 'Header', icon: <Layers size={13} /> },
  { value: 'nav', label: 'Nav', icon: <Compass size={13} /> },
  { value: 'fab', label: 'FAB', icon: <Plus size={13} /> },
  { value: 'presets', label: 'Presets', icon: <Sparkles size={13} /> },
];

const APPEARANCE_SEGMENT_OPTIONS: SegmentOption<ThemeMode>[] = [
  { value: 'light', label: 'Sáng', icon: <Sun size={13} /> },
  { value: 'dark', label: 'Tối', icon: <Moon size={13} /> },
  { value: 'system', label: 'Tự Động', icon: <Sliders size={13} /> },
];

const RADIUS_SEGMENT_OPTIONS: SegmentOption<RadiusPreset>[] = [
  { value: 'sharp', label: '8px Sharp' },
  { value: 'compact', label: '12px Gọn' },
  { value: 'standard', label: '16px Chuẩn' },
  { value: 'smooth', label: '20px Mềm' },
];

const FONT_SCALE_SEGMENT_OPTIONS: SegmentOption<FontScale>[] = [
  { value: 'small', label: 'Nhỏ (90%)' },
  { value: 'standard', label: 'Chuẩn (100%)' },
  { value: 'large', label: 'Lớn (115%)' },
];

const CONTROL_SIZE_SEGMENT_OPTIONS: SegmentOption<ControlSizeKey>[] = [
  { value: 'sm', label: 'Nhỏ (36px)' },
  { value: 'md', label: 'Chuẩn (44px)' },
  { value: 'lg', label: 'Lớn (52px)' },
];

const CONTRAST_SEGMENT_OPTIONS: SegmentOption<ControlContrast>[] = [
  { value: 'normal', label: 'Chuẩn' },
  { value: 'high', label: 'Cao' },
  { value: 'subtle', label: 'Dịu' },
];

const SHADOW_SEGMENT_OPTIONS: SegmentOption<'none' | 'sm' | 'md' | 'lg'>[] = [
  { value: 'none', label: 'Không Đổ' },
  { value: 'sm', label: 'Mềm (sm)' },
  { value: 'md', label: 'Chuẩn (md)' },
  { value: 'lg', label: 'Nổi Bật (lg)' },
];

const HEADER_VARIANT_SEGMENT_OPTIONS: SegmentOption<AppHeaderVariant>[] = [
  { value: 'floating-pill', label: 'Floating Pill' },
  { value: 'frosted-capsule', label: 'Frosted Capsule' },
  { value: 'standard', label: 'Standard' },
];

const HEADER_BACK_SEGMENT_OPTIONS: SegmentOption<AppHeaderBackStyle>[] = [
  { value: 'text', label: 'Text' },
  { value: 'circle', label: 'Circle' },
  { value: 'glass-capsule', label: 'Glass Capsule' },
];

const HEADER_ACTION_SEGMENT_OPTIONS: SegmentOption<AppHeaderActionStyle>[] = [
  { value: 'capsule', label: 'Gom Khối' },
  { value: 'individual', label: 'Rời Nút' },
];

const HEADER_ALIGN_SEGMENT_OPTIONS: SegmentOption<HeaderTitleAlign>[] = [
  { value: 'center', label: 'Căn Giữa' },
  { value: 'left', label: 'Căn Trái' },
];

const SIZE_SEGMENT_OPTIONS: SegmentOption<'sm' | 'md' | 'lg'>[] = [
  { value: 'sm', label: 'Nhỏ (sm)' },
  { value: 'md', label: 'Chuẩn (md)' },
  { value: 'lg', label: 'Lớn (lg)' },
];

const NAV_VARIANT_SEGMENT_OPTIONS: SegmentOption<BottomNavVariant>[] = [
  { value: 'floating-pill', label: 'Floating Pill' },
  { value: 'frosted-glass', label: 'Frosted Glass' },
  { value: 'standard', label: 'Standard Đáy' },
];

const NAV_INDICATOR_SEGMENT_OPTIONS: SegmentOption<BottomNavIndicator>[] = [
  { value: 'pill', label: 'Pill' },
  { value: 'glow', label: 'Glow' },
  { value: 'dot', label: 'Dot' },
  { value: 'line', label: 'Line' },
  { value: 'none', label: 'None' },
];

const NAV_MODE_SEGMENT_OPTIONS: SegmentOption<BottomNavMode>[] = [
  { value: 'tabs', label: 'Tab Bar + FAB' },
  { value: 'menu', label: 'Thuần Menu (Max 6)' },
];

const NAV_ITEM_COUNT_SEGMENT_OPTIONS: SegmentOption<number>[] = [
  { value: 3, label: '3 Mục' },
  { value: 4, label: '4 Mục' },
  { value: 5, label: '5 Mục' },
  { value: 6, label: '6 Mục (Tối Đa)' },
];

const NAV_LAYOUT_SEGMENT_OPTIONS: SegmentOption<BottomNavItemLayout>[] = [
  { value: 'vertical', label: 'Dọc (Chuẩn)' },
  { value: 'horizontal', label: 'Ngang (Dock)' },
  { value: 'icon-only', label: 'Chỉ Icon' },
];

const FAB_SHAPE_SEGMENT_OPTIONS: SegmentOption<BottomNavFabShape>[] = [
  { value: 'circle', label: 'Tròn (Circle)' },
  { value: 'squircle', label: 'Khối (Squircle)' },
];

const FAB_PLACEMENT_SEGMENT_OPTIONS: SegmentOption<BottomNavFabPlacement>[] = [
  { value: 'lifted', label: 'Nhô Lên' },
  { value: 'embedded', label: 'Chìm Vào' },
];

const FAB_TYPE_SEGMENT_OPTIONS: SegmentOption<CustomFabType>[] = [
  { value: 'standard', label: 'Nút (+)' },
  { value: 'ai-orb', label: 'AI Orb' },
  { value: 'qr-radar', label: 'QR Radar' },
  { value: 'voice-wave', label: 'Voice' },
];


const ACCENT_COLORS: Array<{ id: AccentColor; label: string; color: string }> = [
  { id: 'blue', label: 'Xanh Blue', color: '#2563EB' },
  { id: 'emerald', label: 'Lục Emerald', color: '#059669' },
  { id: 'violet', label: 'Tím Violet', color: '#7C3AED' },
  { id: 'amber', label: 'Vàng Amber', color: '#D97706' },
  { id: 'rose', label: 'Hồng Rose', color: '#E11D48' },
  { id: 'cyan', label: 'Lam Cyan', color: '#0891B2' },
];


interface RadioOptionItem<T = number | 'auto'> {
  id: T;
  label: string;
  sublabel?: string;
}

const CARD_RADIUS_OPTIONS: RadioOptionItem[] = [
  { id: 'auto', label: 'Theo Preset', sublabel: 'Mặc định hệ thống' },
  { id: 0, label: '0px Vuông Vức', sublabel: 'Cạnh sắc nét' },
  { id: 8, label: '8px Nhỏ Gọn', sublabel: 'Tối ưu không gian' },
  { id: 16, label: '16px Chuẩn Mực', sublabel: 'Cân bằng hài hòa' },
  { id: 24, label: '24px Mềm Mại', sublabel: 'Phong cách hiện đại' },
  { id: 32, label: '32px Siêu Bo', sublabel: 'Bo tròn lớn' },
];

const HEADER_RADIUS_OPTIONS: RadioOptionItem[] = [
  { id: 'auto', label: 'Theo Preset', sublabel: 'Mặc định hệ thống' },
  { id: 0, label: '0px Vuông Vức', sublabel: 'Tràn viền sắc nét' },
  { id: 14, label: '14px Gọn Gàng', sublabel: 'Bo nhẹ tinh tế' },
  { id: 24, label: '24px Island', sublabel: 'Khối đảo đảo vị' },
  { id: 32, label: '32px Bo Lớn', sublabel: 'Mềm mại cong tròn' },
  { id: 9999, label: 'Full Pill', sublabel: 'Viên thuốc khép kín' },
];

const NAV_RADIUS_OPTIONS: RadioOptionItem[] = [
  { id: 'auto', label: 'Theo Preset', sublabel: 'Mặc định hệ thống' },
  { id: 0, label: '0px Vuông Vức', sublabel: 'Tràn viền màn hình' },
  { id: 14, label: '14px Gọn Gàng', sublabel: 'Bo nhẹ tinh tế' },
  { id: 24, label: '24px Bo Lớn', sublabel: 'Mềm mại hiện đại' },
  { id: 36, label: '36px Bo Tròn', sublabel: 'Cong nổi bật' },
  { id: 9999, label: 'Full Pill', sublabel: 'Dock viên thuốc' },
];

const INDICATOR_RADIUS_OPTIONS: RadioOptionItem[] = [
  { id: 'auto', label: 'Tự Động Thích Ứng', sublabel: 'Standard 14px / Dock Pill' },
  { id: 27, label: '27px Đồng Tâm', sublabel: 'Concentric cong đều' },
  { id: 20, label: '20px Mềm Mại', sublabel: 'Bo mềm hài hòa' },
  { id: 16, label: '16px Squircle', sublabel: 'Khối bo vuông' },
  { id: 8, label: '8px Nhỏ Gọn', sublabel: 'Gọn gàng vừa vặn' },
  { id: 0, label: '0px Vuông Vức', sublabel: 'Góc vuông sắc nét' },
];

const INDICATOR_INSET_SEGMENT_OPTIONS: SegmentOption<number>[] = [
  { value: 0, label: '0px Khít Hẳn' },
  { value: 2, label: '2px Ôm Sát' },
  { value: 3.5, label: '3.5px Chuẩn' },
  { value: 5, label: '5px Thoáng' },
];

const INDICATOR_BORDER_WIDTH_OPTIONS: SegmentOption<number>[] = [
  { value: 0.8, label: '0.8px Mảnh' },
  { value: 1, label: '1px Chuẩn' },
  { value: 1.5, label: '1.5px Vừa' },
  { value: 2, label: '2px Đậm' },
];

const INDICATOR_BORDER_OPACITY_OPTIONS: SegmentOption<number>[] = [
  { value: 0.15, label: '15% Dịu' },
  { value: 0.3, label: '30% Chuẩn' },
  { value: 0.6, label: '60% Rõ' },
  { value: 1, label: '100% Đặc' },
];

const INDICATOR_BORDER_COLORS: ColorOption[] = [
  { value: undefined, label: 'Theme Auto', color: '#6366F1' },
  { value: '#FFFFFF', label: 'Trắng Tinh', color: '#FFFFFF' },
  { value: '#000000', label: 'Đen Tuyền', color: '#000000' },
  { value: '#EF4444', label: 'Đỏ Ruby', color: '#EF4444' },
  { value: '#8B5CF6', label: 'Tím Violet', color: '#8B5CF6' },
  { value: '#3B82F6', label: 'Xanh Blue', color: '#3B82F6' },
  { value: '#10B981', label: 'Lục Emerald', color: '#10B981' },
  { value: '#F59E0B', label: 'Vàng Amber', color: '#F59E0B' },
  { value: '#06B6D4', label: 'Lam Cyan', color: '#06B6D4' },
];

const LABEL_GAP_SEGMENT_OPTIONS: SegmentOption<number>[] = [
  { value: 0, label: '0px Sát' },
  { value: 2, label: '2px Chuẩn' },
  { value: 3.5, label: '3.5px Vừa' },
  { value: 5, label: '5px Thoáng' },
];

const FAB_LIFT_SEGMENT_OPTIONS: SegmentOption<number>[] = [
  { value: 0, label: '0px Phẳng' },
  { value: 14, label: '+14px Nhẹ' },
  { value: 22, label: '+22px Chuẩn' },
  { value: 30, label: '+30px Cao' },
];

const CONTROL_VARIANT_OPTIONS: Array<{ id: ControlVariant; label: string }> = [
  { id: 'standard', label: 'Standard' },
  { id: 'filled', label: 'Filled' },
  { id: 'outline', label: 'Outline' },
  { id: 'glass', label: 'Glass' },
  { id: 'elevated', label: 'Elevated' },
];

const MESH_SEGMENT_OPTIONS: SegmentOption<MeshVariant>[] = [
  { value: 'aurora', label: 'Cực Quang' },
  { value: 'sunset', label: 'Hoàng Hôn' },
  { value: 'ocean', label: 'Đại Dương' },
  { value: 'minimal', label: 'Tối Giản' },
];



// Header specific color options
const HEADER_TITLE_COLORS: ColorOption[] = [
  { label: 'Theme Auto', color: '#94A3B8', value: undefined },
  { label: 'Trắng Tinh', color: '#FFFFFF', value: '#FFFFFF' },
  { label: 'Đen Tuyền', color: '#0F172A', value: '#0F172A' },
  { label: 'Màu Nhấn (Accent)', color: '#6366F1', value: 'ACCENT' },
  { label: 'Vàng Hổ Phách', color: '#F59E0B', value: '#F59E0B' },
  { label: 'Lam Cyan', color: '#06B6D4', value: '#06B6D4' },
  { label: 'Hồng Rose', color: '#E11D48', value: '#E11D48' },
  { label: 'Lục Emerald', color: '#10B981', value: '#10B981' },
];

const HEADER_TINT_COLORS: ColorOption[] = [
  { label: 'Theme Auto', color: '#94A3B8', value: undefined },
  { label: 'Trắng Tinh', color: '#FFFFFF', value: '#FFFFFF' },
  { label: 'Đen Tuyền', color: '#0F172A', value: '#0F172A' },
  { label: 'Vàng Gold', color: '#F59E0B', value: '#F59E0B' },
  { label: 'Tím Violet', color: '#8B5CF6', value: '#8B5CF6' },
  { label: 'Lục Emerald', color: '#10B981', value: '#10B981' },
  { label: 'Hồng Ruby', color: '#F43F5E', value: '#F43F5E' },
  { label: 'Lam Cyan', color: '#0891B2', value: '#0891B2' },
];

const HEADER_BG_COLORS: ColorOption[] = [
  { label: 'Kính Mờ Tự Động', color: 'rgba(255, 255, 255, 0.2)', value: undefined },
  { label: 'Đen Mờ (Glass Dark)', color: '#0F172A', value: 'rgba(15, 23, 42, 0.88)' },
  { label: 'Trắng Mờ (Glass Light)', color: '#F8FAFC', value: 'rgba(255, 255, 255, 0.88)' },
  { label: 'Đen Tuyệt Đối', color: '#090D16', value: '#090D16' },
  { label: 'Trắng Tinh', color: '#FFFFFF', value: '#FFFFFF' },
  { label: 'Tím Midnight', color: '#1E1B4B', value: 'rgba(30, 27, 75, 0.88)' },
  { label: 'Lam Navy', color: '#0F2140', value: 'rgba(15, 33, 64, 0.88)' },
];


const NAV_ACTIVE_COLORS: ColorOption[] = [
  { label: 'Theme Auto', color: '#94A3B8', value: undefined },
  { label: 'Xanh Blue', color: '#2563EB', value: '#2563EB' },
  { label: 'Lục Emerald', color: '#10B981', value: '#10B981' },
  { label: 'Tím Violet', color: '#7C3AED', value: '#7C3AED' },
  { label: 'Vàng Amber', color: '#F59E0B', value: '#F59E0B' },
  { label: 'Đỏ Ruby', color: '#E11D48', value: '#E11D48' },
  { label: 'Lam Cyan', color: '#0891B2', value: '#0891B2' },
  { label: 'Trắng Tinh', color: '#FFFFFF', value: '#FFFFFF' },
];

const NAV_INACTIVE_COLORS: ColorOption[] = [
  { label: 'Theme Auto', color: '#94A3B8', value: undefined },
  { label: 'Xám Sáng (Slate)', color: '#94A3B8', value: '#94A3B8' },
  { label: 'Xám Trầm (Steel)', color: '#64748B', value: '#64748B' },
  { label: 'Trắng Mờ 50%', color: 'rgba(255, 255, 255, 0.5)', value: 'rgba(255, 255, 255, 0.5)' },
  { label: 'Đen Mờ 40%', color: 'rgba(0, 0, 0, 0.4)', value: 'rgba(0, 0, 0, 0.4)' },
  { label: 'Tím Nhạt', color: 'rgba(139, 92, 246, 0.6)', value: 'rgba(139, 92, 246, 0.6)' },
];

const NAV_BG_COLORS: ColorOption[] = [
  { label: 'Kính Mờ Tự Động', color: 'rgba(255, 255, 255, 0.2)', value: undefined },
  { label: 'Đen Mờ (Glass Dark)', color: '#0F172A', value: 'rgba(15, 23, 42, 0.88)' },
  { label: 'Trắng Mờ (Glass Light)', color: '#F8FAFC', value: 'rgba(255, 255, 255, 0.92)' },
  { label: 'Đen Tuyền Opaque', color: '#090D16', value: '#090D16' },
  { label: 'Trắng Tinh Opaque', color: '#FFFFFF', value: '#FFFFFF' },
  { label: 'Tím Đậm Opaque', color: '#181230', value: 'rgba(24, 18, 48, 0.95)' },
];


const FAB_BG_COLORS: ColorOption[] = [
  { label: 'Theme Auto', color: '#94A3B8', value: undefined },
  { label: 'Đỏ Ruby', color: '#E11D48', value: '#E11D48' },
  { label: 'Tím Violet', color: '#7C3AED', value: '#7C3AED' },
  { label: 'Xanh Blue', color: '#2563EB', value: '#2563EB' },
  { label: 'Lục Emerald', color: '#10B981', value: '#10B981' },
  { label: 'Vàng Hổ Phách', color: '#F59E0B', value: '#F59E0B' },
  { label: 'Lam Cyan', color: '#06B6D4', value: '#06B6D4' },
  { label: 'Hồng Hot Pink', color: '#EC4899', value: '#EC4899' },
  { label: 'Đen Carbon', color: '#18181B', value: '#18181B' },
  { label: 'Trắng Tinh', color: '#FFFFFF', value: '#FFFFFF' },
];

const FAB_ICON_COLORS: ColorOption[] = [
  { label: 'Trắng Tinh', color: '#FFFFFF', value: '#FFFFFF' },
  { label: 'Đen Tuyền', color: '#000000', value: '#000000' },
  { label: 'Vàng Gold', color: '#FBBF24', value: '#FBBF24' },
  { label: 'Lam Neon', color: '#22D3EE', value: '#22D3EE' },
  { label: 'Xanh Mint', color: '#4ADE80', value: '#4ADE80' },
  { label: 'Đỏ Ruby', color: '#E11D48', value: '#E11D48' },
];

// Dynamic Nav Items forwarding active/inactive icon color and adaptive sizing
const renderHomeIcon = ({ color, size }: { color: string; size?: number }) => <Home size={size || 19} color={color} />;
const renderCompassIcon = ({ color, size }: { color: string; size?: number }) => <Compass size={size || 19} color={color} />;
const renderBellIcon = ({ color, size }: { color: string; size?: number }) => <Bell size={size || 19} color={color} />;
const renderFolderIcon = ({ color, size }: { color: string; size?: number }) => <Folder size={size || 19} color={color} />;
const renderHeartIcon = ({ color, size }: { color: string; size?: number }) => <Heart size={size || 19} color={color} />;
const renderUserIcon = ({ color, size }: { color: string; size?: number }) => <User size={size || 19} color={color} />;

const STORYBOOK_NAV_ITEMS: BottomNavItem[] = [
  { key: 'home', label: 'Trang chủ', icon: renderHomeIcon },
  { key: 'explore', label: 'Khám phá', icon: renderCompassIcon, badge: 3 },
  { key: 'files', label: 'Tài liệu', icon: renderFolderIcon },
  { key: 'profile', label: 'Cá nhân', icon: renderUserIcon, badgeDot: true },
];

const STORYBOOK_6_NAV_ITEMS: BottomNavItem[] = [
  { key: 'home', label: 'Trang chủ', icon: renderHomeIcon },
  { key: 'explore', label: 'Khám phá', icon: renderCompassIcon, badge: 3 },
  { key: 'notifications', label: 'Thông báo', icon: renderBellIcon, badge: '9+' },
  { key: 'files', label: 'Tài liệu', icon: renderFolderIcon },
  { key: 'favorites', label: 'Yêu thích', icon: renderHeartIcon },
  { key: 'profile', label: 'Cá nhân', icon: renderUserIcon, badgeDot: true },
];

export const LayoutLabScreen: React.FC<LayoutLabScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const {
    theme: themeColors,
    isDark,
    mode: themeMode,
    setThemeMode,
    toggleTheme,
    accentColor,
    setAccentColor,
    radiusPreset,
    setRadiusPreset,
    radiusTokens,
    setThemeStyle,
    isGlassTheme,
    meshVariant,
    setMeshVariant,
    customCardRadius,
    setCustomCardRadius,
    headerVariant,
    setHeaderVariant,
    headerBackStyle,
    setHeaderBackStyle,
    headerActionStyle,
    setHeaderActionStyle,
    headerTitleAlign,
    setHeaderTitleAlign,
    headerSize,
    setHeaderSize,
    headerTitleColor,
    setHeaderTitleColor,
    headerSubtitleColor,
    setHeaderSubtitleColor,
    headerTintColor,
    setHeaderTintColor,
    headerBgColor,
    setHeaderBgColor,
    headerBorderRadius,
    setHeaderBorderRadius,
    globalContrast,
    setGlobalContrast,
    globalShadow,
    setGlobalShadow,
    globalControlVariant,
    setGlobalControlVariant,
    globalControlSize,
    setGlobalControlSize,
    fontScale,
    setFontScale,
    reduceMotion,
    setReduceMotion,
    hapticsEnabled,
    setHapticsEnabled,
    resetThemeSettings,
  } = useThemeMode();

  // Studio Category Tab
  const [activeStudioTab, setActiveStudioTab] = useState<StudioTab>('theme');

  // Dock Swap (Header top, Nav bottom ⇄ Nav top, Header bottom)
  const [isSwappedDocks, setIsSwappedDocks] = useState(false);

  // Active Bottom Nav tab (Sandbox demo only)
  const [activeTab, setActiveTab] = useState('explore');

  // Local Header Search toggle for preview
  const [headerSearchable, setHeaderSearchable] = useState(false);

  // Bottom Nav Demo State (Kept local for Sandbox preview)
  const [navMode, setNavMode] = useState<BottomNavMode>('tabs');
  const [navMenuItemCount, setNavMenuItemCount] = useState<number>(6);
  const [navVariant, setNavVariant] = useState<BottomNavVariant>('floating-pill');
  const [navIndicator, setNavIndicator] = useState<BottomNavIndicator>('pill');
  const [navLayout, setNavLayout] = useState<BottomNavItemLayout>('vertical');
  const [navSize, setNavSize] = useState<BottomNavSize>('md');

  // Bottom Nav Color Customization
  const [navActiveColor, setNavActiveColor] = useState<string | undefined>(undefined);
  const [navInactiveColor, setNavInactiveColor] = useState<string | undefined>(undefined);
  const [navBgColor, setNavBgColor] = useState<string | undefined>(undefined);

  const handleSelectNavMode = useCallback(
    (mode: BottomNavMode) => {
      haptics.light();
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setNavMode(mode);
      const items = mode === 'menu' ? STORYBOOK_6_NAV_ITEMS.slice(0, navMenuItemCount) : STORYBOOK_NAV_ITEMS;
      if (!items.some((i) => i.key === activeTab)) {
        setActiveTab(items[0]?.key || 'home');
      }
    },
    [activeTab, navMenuItemCount]
  );

  const handleSelectMenuItemCount = useCallback(
    (count: number) => {
      haptics.light();
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setNavMenuItemCount(count);
      const items = STORYBOOK_6_NAV_ITEMS.slice(0, count);
      if (!items.some((i) => i.key === activeTab)) {
        setActiveTab(items[0]?.key || 'home');
      }
    },
    [activeTab]
  );

  const currentNavItems = useMemo(() => {
    if (navMode === 'menu') {
      return STORYBOOK_6_NAV_ITEMS.slice(0, Math.min(navMenuItemCount, 6));
    }
    return STORYBOOK_NAV_ITEMS;
  }, [navMode, navMenuItemCount]);

  // FAB State & Color Customization
  const [navHasFab, setNavHasFab] = useState(true);
  const [fabType, setFabType] = useState<CustomFabType>('ai-orb');
  const [fabLift, setFabLift] = useState(22);
  const [fabShape, setFabShape] = useState<BottomNavFabShape>('squircle');
  const [fabPlacement, setFabPlacement] = useState<BottomNavFabPlacement>('lifted');
  const [fabBgColor, setFabBgColor] = useState<string | undefined>(undefined);
  const [fabIconColor, setFabIconColor] = useState<string>('#FFFFFF');

  // Granular Nav Border Radius Overrides (Sandbox preview)
  const [navBorderRadius, setNavBorderRadius] = useState<number | undefined>(undefined);
  const [navIndicatorRadius, setNavIndicatorRadius] = useState<number | undefined>(undefined);
  const [navIndicatorInset, setNavIndicatorInset] = useState<number>(3.5);
  const [navLabelGap, setNavLabelGap] = useState<number>(2);

  // Selected indicator border customization
  const [navIndicatorBorderEnabled, setNavIndicatorBorderEnabled] = useState<boolean>(true);
  const [navIndicatorBorderWidth, setNavIndicatorBorderWidth] = useState<number>(1);
  const [navIndicatorBorderOpacity, setNavIndicatorBorderOpacity] = useState<number>(0.28);
  const [navIndicatorBorderColor, setNavIndicatorBorderColor] = useState<string | undefined>(undefined);

  // Studio Quick Options Action Sheet
  const [isOptionsSheetOpen, setIsOptionsSheetOpen] = useState(false);

  const cardEffectiveRadius = customCardRadius !== undefined ? customCardRadius : radiusTokens.card;

  const handleSelectStudioTab = useCallback((tabId: StudioTab) => {
    haptics.light();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveStudioTab(tabId);
  }, []);

  const handleToggleSwapDocks = useCallback((swapped: boolean) => {
    haptics.medium();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsSwappedDocks(swapped);
  }, []);

  const styles = useMemo(
    () => createLayoutLabScreenStyles(themeColors, radiusTokens, isDark, customCardRadius),
    [themeColors, radiusTokens, isDark, customCardRadius]
  );

  const handleToggleGlass = useCallback(
    (enabled: boolean) => {
      haptics.light();
      setThemeStyle(enabled ? 'apple-glass' : 'default');
    },
    [setThemeStyle]
  );

  // Resolved dynamic colors
  const resolvedHeaderTitleColor = headerTitleColor === 'ACCENT' ? themeColors.primary : headerTitleColor;
  const resolvedHeaderSubtitleColor = headerSubtitleColor;
  const resolvedHeaderTintColor = headerTintColor || themeColors.primary;

  const resolvedNavActiveColor = navActiveColor || themeColors.primary;
  const resolvedNavInactiveColor = navInactiveColor || themeColors.textSecondary;
  const resolvedFabBgColor = fabBgColor || themeColors.primary;

  // Unified Header Right Actions (Guaranteed identical for both top & bottom docks)
  const headerRightActions = useMemo(
    () => [
      {
        id: 'theme-toggle',
        icon: isDark ? <Sun size={17} color="#F59E0B" /> : <Moon size={17} color="#6366F1" />,
        onPress: () => {
          haptics.light();
          toggleTheme();
        },
        accessibilityLabel: 'Chuyển Chế Độ Sáng/Tối',
      },
      {
        id: 'header-options',
        icon: <Sliders size={16} color={resolvedHeaderTintColor || themeColors.textSecondary} />,
        onPress: () => {
          haptics.light();
          setIsOptionsSheetOpen(true);
        },
        accessibilityLabel: 'Tùy Chọn Studio',
      },
      {
        id: 'reset-defaults',
        icon: <RotateCcw size={16} color={resolvedHeaderTintColor || themeColors.textSecondary} />,
        onPress: () => {
          haptics.warning();
          resetThemeSettings();
          setHeaderTitleColor(undefined);
          setHeaderSubtitleColor(undefined);
          setHeaderTintColor(undefined);
          setHeaderBgColor(undefined);
          setNavActiveColor(undefined);
          setNavInactiveColor(undefined);
          setNavBgColor(undefined);
          setFabBgColor(undefined);
          setFabIconColor('#FFFFFF');
          setNavBorderRadius(undefined);
          setNavIndicatorInset(3.5);
          setNavIndicatorBorderEnabled(true);
          setNavIndicatorBorderWidth(1);
          setNavIndicatorBorderOpacity(0.28);
          setNavIndicatorBorderColor(undefined);
          setNavLabelGap(2);
          setNavMode('tabs');
          setNavMenuItemCount(6);
          setHeaderBorderRadius(undefined);
          setCustomCardRadius(undefined);
        },
        accessibilityLabel: 'Khôi Phục Mặc Định',
      },
    ],
    [
      isDark,
      resolvedHeaderTintColor,
      themeColors.textSecondary,
      toggleTheme,
      resetThemeSettings,
      setCustomCardRadius,
      setHeaderBgColor,
      setHeaderBorderRadius,
      setHeaderSubtitleColor,
      setHeaderTintColor,
      setHeaderTitleColor,
    ]
  );

  // Center FAB Component: Guaranteed visible icon with custom icon color & background
  const centerFabConfig = useMemo(() => {
    if (!navHasFab) return undefined;

    let iconNode: React.ReactNode;
    if (fabType === 'ai-orb') {
      iconNode = <Sparkles size={22} color={fabIconColor} strokeWidth={2.4} />;
    } else if (fabType === 'qr-radar') {
      iconNode = <ScanLine size={21} color={fabIconColor} strokeWidth={2.4} />;
    } else if (fabType === 'voice-wave') {
      iconNode = <Mic size={21} color={fabIconColor} strokeWidth={2.4} />;
    } else {
      iconNode = <Plus size={24} color={fabIconColor} strokeWidth={2.6} />;
    }

    return {
      icon: iconNode,
      backgroundColor: resolvedFabBgColor,
      iconColor: fabIconColor,
      liftOffset: fabLift,
      shape: fabShape,
      placement: fabPlacement,
      onPress: () => {
        haptics.medium();
      },
    };
  }, [navHasFab, fabType, fabIconColor, resolvedFabBgColor, fabLift, fabShape, fabPlacement]);

  // Quick Preset Definitions
  const presets = useMemo(
    () => [
      {
        id: 'apple-vision',
        name: 'Apple Vision Glass',
        tag: 'VisionOS',
        desc: 'Nền kính cực quang Aurora + Tím Violet + Bo góc mềm mại + Floating Pill + AI Orb rực rỡ',
        apply: () => {
          setThemeMode('dark');
          setThemeStyle('apple-glass');
          setMeshVariant('aurora');
          setAccentColor('violet');
          setRadiusPreset('smooth');
          setHeaderVariant('floating-pill');
          setHeaderBackStyle('glass-capsule');
          setHeaderActionStyle('capsule');
          setHeaderTitleColor('#FFFFFF');
          setHeaderTintColor('#C084FC');
          setHeaderBgColor(undefined);
          setNavVariant('floating-pill');
          setNavIndicator('pill');
          setNavActiveColor('#A855F7');
          setNavInactiveColor('rgba(255, 255, 255, 0.55)');
          setNavBgColor(undefined);
          setNavHasFab(true);
          setFabType('ai-orb');
          setFabLift(22);
          setFabShape('squircle');
          setFabPlacement('lifted');
          setFabBgColor('#7C3AED');
          setFabIconColor('#FFFFFF');
        },
      },
      {
        id: 'emerald-pro',
        name: 'Emerald Pro Work',
        tag: 'Productivity',
        desc: 'Nền kính đại dương Ocean + Ngọc lục bảo Emerald + Bo chuẩn + Glow Indicator + QR Radar',
        apply: () => {
          setThemeMode('dark');
          setThemeStyle('apple-glass');
          setMeshVariant('ocean');
          setAccentColor('emerald');
          setRadiusPreset('standard');
          setHeaderVariant('frosted-capsule');
          setHeaderBackStyle('circle');
          setHeaderActionStyle('capsule');
          setHeaderTitleColor('#FFFFFF');
          setHeaderTintColor('#34D399');
          setHeaderBgColor(undefined);
          setNavVariant('frosted-glass');
          setNavIndicator('glow');
          setNavActiveColor('#10B981');
          setNavInactiveColor('#94A3B8');
          setNavBgColor(undefined);
          setNavHasFab(true);
          setFabType('qr-radar');
          setFabLift(14);
          setFabShape('circle');
          setFabPlacement('lifted');
          setFabBgColor('#059669');
          setFabIconColor('#FFFFFF');
        },
      },
      {
        id: 'cyber-minimal',
        name: 'Cyber Minimalist',
        tag: 'High-Tech',
        desc: 'Nền Solid đen sâu + Sắc cạnh Sharp 8px + Lam Cyan + High Contrast + Nút cộng viền phẳng',
        apply: () => {
          setThemeMode('dark');
          setThemeStyle('default');
          setMeshVariant('minimal');
          setAccentColor('cyan');
          setRadiusPreset('sharp');
          setGlobalContrast('high');
          setHeaderVariant('standard');
          setHeaderBackStyle('circle');
          setHeaderActionStyle('individual');
          setHeaderTitleColor('#22D3EE');
          setHeaderTintColor('#22D3EE');
          setHeaderBgColor('#090D16');
          setNavVariant('standard');
          setNavIndicator('line');
          setNavActiveColor('#06B6D4');
          setNavInactiveColor('#64748B');
          setNavBgColor('#090D16');
          setNavHasFab(true);
          setFabType('standard');
          setFabLift(0);
          setFabShape('circle');
          setFabPlacement('embedded');
          setFabBgColor('#0891B2');
          setFabIconColor('#000000');
        },
      },
      {
        id: 'sunset-luxe',
        name: 'Sunset Warm Luxe',
        tag: 'Editorial',
        desc: 'Kính mờ hoàng hôn Sunset + Vàng Hổ Phách + Bo gọn Compact + Voice Wave FAB',
        apply: () => {
          setThemeMode('dark');
          setThemeStyle('apple-glass');
          setMeshVariant('sunset');
          setAccentColor('amber');
          setRadiusPreset('compact');
          setHeaderVariant('floating-pill');
          setHeaderBackStyle('glass-capsule');
          setHeaderActionStyle('capsule');
          setHeaderTitleColor('#FDE68A');
          setHeaderTintColor('#F59E0B');
          setHeaderBgColor(undefined);
          setNavVariant('floating-pill');
          setNavIndicator('dot');
          setNavActiveColor('#F59E0B');
          setNavInactiveColor('rgba(255, 255, 255, 0.5)');
          setNavBgColor(undefined);
          setNavHasFab(true);
          setFabType('voice-wave');
          setFabLift(22);
          setFabShape('squircle');
          setFabPlacement('lifted');
          setFabBgColor('#D97706');
          setFabIconColor('#FFFFFF');
        },
      },
      {
        id: 'clean-daybreak',
        name: 'Clean Daybreak Light',
        tag: 'Minimal Light',
        desc: 'Giao diện sáng tinh khôi + Xanh Blue chuẩn + Bo tròn Standard + Nền Solid tinh tế',
        apply: () => {
          setThemeMode('light');
          setThemeStyle('default');
          setMeshVariant('minimal');
          setAccentColor('blue');
          setRadiusPreset('standard');
          setGlobalContrast('normal');
          setHeaderVariant('standard');
          setHeaderBackStyle('text');
          setHeaderActionStyle('individual');
          setHeaderTitleColor('#0F172A');
          setHeaderTintColor('#2563EB');
          setHeaderBgColor('#FFFFFF');
          setNavVariant('standard');
          setNavIndicator('pill');
          setNavActiveColor('#2563EB');
          setNavInactiveColor('#64748B');
          setNavBgColor('#FFFFFF');
          setNavHasFab(true);
          setFabType('standard');
          setFabLift(14);
          setFabShape('circle');
          setFabPlacement('lifted');
          setFabBgColor('#2563EB');
          setFabIconColor('#FFFFFF');
        },
      },
    ],
    [
      setThemeMode,
      setThemeStyle,
      setAccentColor,
      setRadiusPreset,
      setGlobalContrast,
      setHeaderActionStyle,
      setHeaderBackStyle,
      setHeaderBgColor,
      setHeaderTintColor,
      setHeaderTitleColor,
      setHeaderVariant,
      setMeshVariant,
    ]
  );

  return (
    <View style={styles.screenRoot}>
      {/* 1. SCROLLABLE SCREEN CONTENT WRAPPER */}
      <ScreenWrapper
        scrollable
        edges={['left', 'right']}
        style={styles.scrollContainer}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + (headerSize === 'lg' ? 76 : headerSize === 'sm' ? 56 : 64),
            paddingBottom: insets.bottom + (navSize === 'lg' ? 90 : navSize === 'sm' ? 68 : 78) + 16,
          },
        ]}
      >
        {/* Executive Studio Hero Banner */}
        <AppCard style={styles.controlCard} borderRadius={Math.min(cardEffectiveRadius, 18)}>
          <View style={styles.heroBannerTopRow}>
            <View style={styles.heroBadgeRow}>
              <Sparkles size={14} color={themeColors.primary} />
              <AppText style={styles.heroCategoryText} numberOfLines={1}>
                Hệ Thống Giao Diện • Live Engine
              </AppText>
            </View>
            <View style={styles.heroLivePill}>
              <View style={styles.heroLiveDot} />
              <AppText style={styles.heroLiveText}>TRỰC TIẾP</AppText>
            </View>
          </View>

          <AppText style={styles.heroMainTitle}>
            Trung Tâm Quản Trị Theme & Thiết Kế
          </AppText>

          <AppText style={styles.heroSubtitle}>
            Mọi tinh chỉnh về chất liệu kính, hình nền, bảng màu, bo góc bề mặt và phông chữ được áp dụng đồng bộ tức thì trên toàn bộ ứng dụng.
          </AppText>

          <View style={styles.heroStatsGrid}>
            <View style={styles.heroStatItem}>
              <AppText style={styles.heroStatLabel}>Chế độ:</AppText>
              <AppText style={styles.heroStatValue}>{isDark ? 'Tối (Dark)' : 'Sáng (Light)'}</AppText>
            </View>
            <View style={styles.heroStatItem}>
              <AppText style={styles.heroStatLabel}>Chất liệu:</AppText>
              <AppText style={styles.heroStatValue}>{isGlassTheme ? 'Apple Glass' : 'Solid Base'}</AppText>
            </View>
            <View style={styles.heroStatItem}>
              <AppText style={styles.heroStatLabel}>Hình nền:</AppText>
              <AppText style={styles.heroStatValue}>{meshVariant.toUpperCase()}</AppText>
            </View>
            <View style={styles.heroStatItem}>
              <AppText style={styles.heroStatLabel}>Bo góc thẻ:</AppText>
              <AppText style={styles.heroStatValue}>
                {customCardRadius !== undefined ? `${customCardRadius}px` : `${radiusTokens.card}px (Chuẩn)`}
              </AppText>
            </View>
          </View>
        </AppCard>

        {/* Base Design System AppSegmentedControl with GPU-accelerated sliding thumb */}
        <AppSegmentedControl<StudioTab>
          size="sm"
          variant={isGlassTheme ? 'glass' : 'pill'}
          options={STUDIO_SEGMENT_OPTIONS}
          value={activeStudioTab}
          onChange={(val) => handleSelectStudioTab(val)}
          activeColor={resolvedHeaderTintColor || themeColors.primary}
          haptic={hapticsEnabled}
        />

        {/* TAB 1: GLOBAL THEME & ACCENTS */}
        {activeStudioTab === 'theme' && (
          <>
            {/* Chế độ Sáng / Tối */}
            <AppCard style={styles.controlCard} borderRadius={cardEffectiveRadius}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>1. Chế Độ Hiển Thị (Appearance)</AppText>
                <AppBadge label={themeMode.toUpperCase()} variant="info" />
              </View>
              <AppSegmentedControl<ThemeMode>
                size="sm"
                variant={isGlassTheme ? 'glass' : 'pill'}
                options={APPEARANCE_SEGMENT_OPTIONS}
                value={themeMode}
                onChange={(val) => setThemeMode(val)}
                activeColor={resolvedHeaderTintColor || themeColors.primary}
                haptic={hapticsEnabled}
              />
            </AppCard>

            {/* Màu Nhấn (Theme Accent Color) */}
            <AppCard style={styles.controlCard} borderRadius={cardEffectiveRadius}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>2. Bảng Màu Nhấn Toàn Cầu (Theme Accent)</AppText>
                <AppBadge label={accentColor.toUpperCase()} variant="primary" />
              </View>
              <View style={styles.colorSwatchesRow}>
                {ACCENT_COLORS.map((item) => {
                  const isSelected = accentColor === item.id;
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[styles.colorSwatchBtn, isSelected && styles.colorSwatchBtnActive]}
                      onPress={() => {
                        haptics.light();
                        setAccentColor(item.id);
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                      <AppText style={[styles.colorSwatchText, isSelected && styles.colorSwatchTextActive]}>
                        {item.label}
                      </AppText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </AppCard>

            {/* Phong Cách Kính Apple Glass & Mesh Wallpaper */}
            <AppCard style={styles.controlCard} borderRadius={cardEffectiveRadius}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>3. Chất Liệu Kính Mờ (Apple Glass)</AppText>
                <AppBadge
                  label={isGlassTheme ? 'Apple Glass' : 'Solid Base'}
                  variant={isGlassTheme ? 'success' : 'neutral'}
                />
              </View>

              <View style={styles.toggleRow}>
                <View style={styles.toggleInfo}>
                  <AppText style={styles.toggleTitle}>Hiệu Ứng Apple Liquid Glass</AppText>
                  <AppText style={styles.toggleDesc}>
                    Bật nền kính bán trong suốt và kích hoạt Dynamic Mesh Wallpaper
                  </AppText>
                </View>
                <AppSwitch
                  value={isGlassTheme}
                  onValueChange={handleToggleGlass}
                />
              </View>

              {isGlassTheme && (
                <View style={styles.meshSelectorBox}>
                  <AppText style={styles.meshSelectorTitle}>Hình Nền Apple Mesh (Áp dụng toàn cục):</AppText>
                  <AppSegmentedControl<MeshVariant>
                    size="sm"
                    variant={isGlassTheme ? 'glass' : 'pill'}
                    options={MESH_SEGMENT_OPTIONS}
                    value={meshVariant}
                    onChange={(val) => setMeshVariant(val)}
                    activeColor={resolvedHeaderTintColor || themeColors.primary}
                    haptic={hapticsEnabled}
                  />
                </View>
              )}
            </AppCard>

            {/* Bo góc (Radius Presets) */}
            <AppCard style={styles.controlCard} borderRadius={cardEffectiveRadius}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>4. Bo Góc Hệ Thống (Radius Tokens)</AppText>
                <AppBadge label={radiusPreset.toUpperCase()} variant="primary" />
              </View>
              <AppSegmentedControl<RadiusPreset>
                size="sm"
                variant={isGlassTheme ? 'glass' : 'pill'}
                options={RADIUS_SEGMENT_OPTIONS}
                value={radiusPreset}
                onChange={(val) => setRadiusPreset(val)}
                activeColor={resolvedHeaderTintColor || themeColors.primary}
                haptic={hapticsEnabled}
              />
            </AppCard>

            {/* Tinh Chỉnh Bo Góc Bề Mặt Thẻ (Card Radius) */}
            <AppCard style={styles.controlCard} borderRadius={cardEffectiveRadius}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>5. Bo Góc Bề Mặt Thẻ (Card Radius)</AppText>
                <AppBadge
                  label={customCardRadius === undefined ? 'MẶC ĐỊNH' : `${customCardRadius}px`}
                  variant="primary"
                />
              </View>
              <AppText style={styles.meshSelectorTitle}>Cấu hình bo góc bề mặt thẻ (Áp dụng toàn cục):</AppText>
              <View style={styles.radioGrid2Col}>
                {CARD_RADIUS_OPTIONS.map((opt) => {
                  const isSelected =
                    opt.id === 'auto'
                      ? customCardRadius === undefined
                      : customCardRadius === opt.id;
                  return (
                    <View
                      key={String(opt.id)}
                      style={[styles.radioCardItem, isSelected && styles.radioCardItemActive]}
                    >
                      <AppRadio
                        selected={isSelected}
                        onSelect={() => {
                          setCustomCardRadius(opt.id === 'auto' ? undefined : opt.id);
                        }}
                        label={opt.label}
                        sublabel={opt.sublabel}
                        size="sm"
                        style={styles.radioInnerFill}
                      />
                    </View>
                  );
                })}
              </View>
            </AppCard>

            {/* Tỷ Lệ Chữ & Kích Thước Nút */}
            <AppCard style={styles.controlCard} borderRadius={cardEffectiveRadius}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>6. Tỷ Lệ Chữ & Kích Thước Điều Khiển</AppText>
                <AppBadge label={`${fontScale.toUpperCase()} • ${globalControlSize.toUpperCase()}`} variant="neutral" />
              </View>

              <AppText style={styles.meshSelectorTitle}>Tỷ lệ phông chữ (Typography):</AppText>
              <AppSegmentedControl<FontScale>
                size="sm"
                variant={isGlassTheme ? 'glass' : 'pill'}
                options={FONT_SCALE_SEGMENT_OPTIONS}
                value={fontScale}
                onChange={(val) => setFontScale(val)}
                activeColor={resolvedHeaderTintColor || themeColors.primary}
                haptic={hapticsEnabled}
              />

              <AppText style={styles.subSectionTitle}>Kích thước nút điều khiển:</AppText>
              <AppSegmentedControl<ControlSizeKey>
                size="sm"
                variant={isGlassTheme ? 'glass' : 'pill'}
                options={CONTROL_SIZE_SEGMENT_OPTIONS}
                value={globalControlSize}
                onChange={(val) => setGlobalControlSize(val)}
                activeColor={resolvedHeaderTintColor || themeColors.primary}
                haptic={hapticsEnabled}
              />

              <AppText style={styles.subSectionTitle}>Kiểu dáng Control Variant:</AppText>
              <View style={styles.chipsRow}>
                {CONTROL_VARIANT_OPTIONS.map((opt) => {
                  const isSelected = globalControlVariant === opt.id;
                  return (
                    <TouchableOpacity
                      key={opt.id}
                      style={[styles.chipBtn, isSelected && styles.chipBtnActive]}
                      onPress={() => {
                        haptics.light();
                        setGlobalControlVariant(opt.id);
                      }}
                      activeOpacity={0.7}
                    >
                      <Box size={13} color={isSelected ? themeColors.primary : themeColors.textSecondary} />
                      <AppText style={[styles.chipText, isSelected && styles.chipTextActive]}>
                        {opt.label}
                      </AppText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </AppCard>

            {/* Độ Tương Phản & Đổ Bóng */}
            <AppCard style={styles.controlCard} borderRadius={cardEffectiveRadius}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>7. Tương Phản, Đổ Bóng & Xúc Giác</AppText>
                <AppBadge label={`${globalContrast} • ${globalShadow}`} variant="neutral" />
              </View>

              <AppText style={styles.meshSelectorTitle}>Độ tương phản (Contrast):</AppText>
              <AppSegmentedControl<ControlContrast>
                size="sm"
                variant={isGlassTheme ? 'glass' : 'pill'}
                options={CONTRAST_SEGMENT_OPTIONS}
                value={globalContrast}
                onChange={(val) => setGlobalContrast(val)}
                activeColor={resolvedHeaderTintColor || themeColors.primary}
                haptic={hapticsEnabled}
              />

              <AppText style={styles.subSectionTitle}>Độ sâu đổ bóng (Shadow):</AppText>
              <AppSegmentedControl<'none' | 'sm' | 'md' | 'lg'>
                size="sm"
                variant={isGlassTheme ? 'glass' : 'pill'}
                options={SHADOW_SEGMENT_OPTIONS}
                value={typeof globalShadow === 'string' ? globalShadow : globalShadow ? 'md' : 'none'}
                onChange={(val) => setGlobalShadow(val)}
                activeColor={resolvedHeaderTintColor || themeColors.primary}
                haptic={hapticsEnabled}
              />

              <View style={styles.toggleRowSpaced}>
                <View style={styles.toggleInfo}>
                  <AppText style={styles.toggleTitle}>Phản Hồi Rung Haptics</AppText>
                  <AppText style={styles.toggleDesc}>Rung nhẹ công thái học khi chạm nút và chuyển tab</AppText>
                </View>
                <AppSwitch
                  value={hapticsEnabled}
                  onValueChange={(val) => {
                    haptics.light();
                    setHapticsEnabled(val);
                  }}
                />
              </View>

              <View style={styles.toggleRow}>
                <View style={styles.toggleInfo}>
                  <AppText style={styles.toggleTitle}>Giảm Chuyển Động (Reduce Motion)</AppText>
                  <AppText style={styles.toggleDesc}>Tối ưu hóa hiệu năng, giảm animation trên thiết bị</AppText>
                </View>
                <AppSwitch
                  value={reduceMotion}
                  onValueChange={(val) => {
                    haptics.light();
                    setReduceMotion(val);
                  }}
                />
              </View>
            </AppCard>
          </>
        )}

        {/* TAB 2: HEADER STUDIO (COLORS & LAYOUT) */}
        {activeStudioTab === 'header' && (
          <>
            {/* Tùy chỉnh Màu sắc Header */}
            <AppCard style={styles.controlCard}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>1. Màu Sắc Header (Text, Icon & Nền)</AppText>
                <Sparkles size={16} color={themeColors.primary} />
              </View>

              <AppText style={styles.meshSelectorTitle}>Màu chữ Tiêu đề (Title Color):</AppText>
              <View style={styles.colorPaletteRow}>
                {HEADER_TITLE_COLORS.map((opt, idx) => {
                  const isSelected = headerTitleColor === opt.value;
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.colorDotItem, isSelected && styles.colorDotItemActive]}
                      onPress={() => {
                        haptics.light();
                        setHeaderTitleColor(opt.value);
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.colorDotPreview, { backgroundColor: opt.color }]} />
                      <AppText style={[styles.colorDotLabel, isSelected && styles.colorDotLabelActive]}>
                        {opt.label}
                      </AppText>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.sectionDivider} />

              <AppText style={styles.meshSelectorTitle}>Màu Icon & Nút Bấm (Header Tint Color):</AppText>
              <View style={styles.colorPaletteRow}>
                {HEADER_TINT_COLORS.map((opt, idx) => {
                  const isSelected = headerTintColor === opt.value;
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.colorDotItem, isSelected && styles.colorDotItemActive]}
                      onPress={() => {
                        haptics.light();
                        setHeaderTintColor(opt.value);
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.colorDotPreview, { backgroundColor: opt.color }]} />
                      <AppText style={[styles.colorDotLabel, isSelected && styles.colorDotLabelActive]}>
                        {opt.label}
                      </AppText>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.sectionDivider} />

              <AppText style={styles.meshSelectorTitle}>Màu Nền Header (Background Color):</AppText>
              <View style={styles.colorPaletteRow}>
                {HEADER_BG_COLORS.map((opt, idx) => {
                  const isSelected = headerBgColor === opt.value;
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.colorDotItem, isSelected && styles.colorDotItemActive]}
                      onPress={() => {
                        haptics.light();
                        setHeaderBgColor(opt.value);
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.colorDotPreview, { backgroundColor: opt.color }]} />
                      <AppText style={[styles.colorDotLabel, isSelected && styles.colorDotLabelActive]}>
                        {opt.label}
                      </AppText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </AppCard>

            {/* Kiểu Dáng Header */}
            <AppCard style={styles.controlCard}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>2. Kiểu Dáng Header (Variant)</AppText>
                <AppBadge label={headerVariant} variant="primary" />
              </View>
              <AppSegmentedControl<AppHeaderVariant>
                size="sm"
                variant={isGlassTheme ? 'glass' : 'pill'}
                options={HEADER_VARIANT_SEGMENT_OPTIONS}
                value={headerVariant}
                onChange={(val) => setHeaderVariant(val)}
                activeColor={resolvedHeaderTintColor || themeColors.primary}
                haptic={hapticsEnabled}
              />
            </AppCard>

            {/* Nút Quay Lại & Nhóm Nút Phụ */}
            <AppCard style={styles.controlCard}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>3. Nút Quay Lại & Nhóm Nút Phụ</AppText>
                <AppBadge label={`${headerBackStyle} • ${headerActionStyle}`} variant="neutral" />
              </View>

              <AppText style={styles.meshSelectorTitle}>Nút Quay Lại (Back Style):</AppText>
              <AppSegmentedControl<AppHeaderBackStyle>
                size="sm"
                variant={isGlassTheme ? 'glass' : 'pill'}
                options={HEADER_BACK_SEGMENT_OPTIONS}
                value={headerBackStyle}
                onChange={(val) => setHeaderBackStyle(val)}
                activeColor={resolvedHeaderTintColor || themeColors.primary}
                haptic={hapticsEnabled}
              />

              <AppText style={styles.subSectionTitle}>Nhóm Nút Phụ (Action Group):</AppText>
              <AppSegmentedControl<AppHeaderActionStyle>
                size="sm"
                variant={isGlassTheme ? 'glass' : 'pill'}
                options={HEADER_ACTION_SEGMENT_OPTIONS}
                value={headerActionStyle}
                onChange={(val) => setHeaderActionStyle(val)}
                activeColor={resolvedHeaderTintColor || themeColors.primary}
                haptic={hapticsEnabled}
              />
            </AppCard>

            {/* Căn Lề, Kích Thước & Tìm Kiếm */}
            <AppCard style={styles.controlCard}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>4. Căn Lề, Kích Thước & Tìm Kiếm</AppText>
                <AppBadge label={`${headerTitleAlign} • ${headerSize}`} variant="info" />
              </View>

              <AppText style={styles.meshSelectorTitle}>Căn lề tiêu đề:</AppText>
              <AppSegmentedControl<HeaderTitleAlign>
                size="sm"
                variant={isGlassTheme ? 'glass' : 'pill'}
                options={HEADER_ALIGN_SEGMENT_OPTIONS}
                value={headerTitleAlign}
                onChange={(val) => setHeaderTitleAlign(val)}
                activeColor={resolvedHeaderTintColor || themeColors.primary}
                haptic={hapticsEnabled}
              />

              <AppText style={styles.subSectionTitle}>Kích thước Header:</AppText>
              <AppSegmentedControl<'sm' | 'md' | 'lg'>
                size="sm"
                variant={isGlassTheme ? 'glass' : 'pill'}
                options={SIZE_SEGMENT_OPTIONS}
                value={headerSize}
                onChange={(val) => setHeaderSize(val)}
                activeColor={resolvedHeaderTintColor || themeColors.primary}
                haptic={hapticsEnabled}
              />

              <View style={styles.toggleRowSpaced}>
                <View style={styles.toggleInfo}>
                  <AppText style={styles.toggleTitle}>Thanh Tìm Kiếm (Search Bar)</AppText>
                  <AppText style={styles.toggleDesc}>Tích hợp thanh search và gợi ý trực tiếp trên Header</AppText>
                </View>
                <AppSwitch
                  value={headerSearchable}
                  onValueChange={(val) => {
                    haptics.light();
                    setHeaderSearchable(val);
                  }}
                />
              </View>
            </AppCard>

            {/* Tùy Chỉnh Bo Góc Header */}
            <AppCard style={styles.controlCard} borderRadius={cardEffectiveRadius}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>5. Bo Góc Khung Header (Container Radius)</AppText>
                <AppBadge
                  label={headerBorderRadius === undefined ? 'MẶC ĐỊNH' : `${headerBorderRadius}px`}
                  variant="primary"
                />
              </View>
              <AppText style={styles.meshSelectorTitle}>
                Độ cong bo góc khối Header (Áp dụng toàn cục hệ thống):
              </AppText>
              <View style={styles.radioGrid2Col}>
                {HEADER_RADIUS_OPTIONS.map((opt) => {
                  const isSelected =
                    opt.id === 'auto'
                      ? headerBorderRadius === undefined
                      : headerBorderRadius === opt.id;
                  return (
                    <View
                      key={String(opt.id)}
                      style={[styles.radioCardItem, isSelected && styles.radioCardItemActive]}
                    >
                      <AppRadio
                        selected={isSelected}
                        onSelect={() => {
                          setHeaderBorderRadius(opt.id === 'auto' ? undefined : opt.id);
                        }}
                        label={opt.label}
                        sublabel={opt.sublabel}
                        size="sm"
                        style={styles.radioInnerFill}
                      />
                    </View>
                  );
                })}
              </View>
            </AppCard>
          </>
        )}

        {/* TAB 3: NAV BAR STUDIO (COLORS & LAYOUT) */}
        {activeStudioTab === 'nav' && (
          <>
            {/* Chế Độ Điều Hướng: Tab Bar + FAB hoặc Thuần Menu (Tối đa 6 mục) */}
            <AppCard style={styles.controlCard} borderRadius={cardEffectiveRadius}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>1. Chế Độ Điều Hướng & Menu Tối Đa 6 Mục</AppText>
                <AppBadge
                  label={navMode === 'menu' ? `${navMenuItemCount} Mục Menu` : 'Tabs + FAB'}
                  variant="primary"
                />
              </View>

              <AppText style={styles.meshSelectorTitle}>Chế độ hiển thị thanh điều hướng:</AppText>
              <AppSegmentedControl<BottomNavMode>
                size="sm"
                variant={isGlassTheme ? 'glass' : 'pill'}
                options={NAV_MODE_SEGMENT_OPTIONS}
                value={navMode}
                onChange={handleSelectNavMode}
                activeColor={resolvedHeaderTintColor || themeColors.primary}
                haptic={hapticsEnabled}
              />

              {navMode === 'menu' && (
                <>
                  <AppText style={styles.subSectionTitle}>
                    Số lượng mục Menu hiển thị (Tối đa 6 mục):
                  </AppText>
                  <AppSegmentedControl<number>
                    size="sm"
                    variant={isGlassTheme ? 'glass' : 'pill'}
                    options={NAV_ITEM_COUNT_SEGMENT_OPTIONS}
                    value={navMenuItemCount}
                    onChange={handleSelectMenuItemCount}
                    activeColor={resolvedHeaderTintColor || themeColors.primary}
                    haptic={hapticsEnabled}
                  />
                  <AppText style={styles.menuModeDesc}>
                    Chế độ Menu thuần túy không có nút ở giữa, dàn trải đều 100% bề ngang. Kích thước icon, nhãn chữ và huy hiệu tự động co giãn thông minh khi hiển thị tối đa 6 mục.
                  </AppText>
                </>
              )}
            </AppCard>

            {/* Tùy chỉnh Màu sắc Nav Bar */}
            <AppCard style={styles.controlCard} borderRadius={cardEffectiveRadius}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>2. Màu Sắc Nav Bar (Icon, Nhãn & Nền)</AppText>
                <Sparkles size={16} color={themeColors.primary} />
              </View>

              <AppText style={styles.meshSelectorTitle}>Màu Mục Đang Chọn (Active Icon & Text):</AppText>
              <View style={styles.colorPaletteRow}>
                {NAV_ACTIVE_COLORS.map((opt, idx) => {
                  const isSelected = navActiveColor === opt.value;
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.colorDotItem, isSelected && styles.colorDotItemActive]}
                      onPress={() => {
                        haptics.light();
                        setNavActiveColor(opt.value);
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.colorDotPreview, { backgroundColor: opt.color }]} />
                      <AppText style={[styles.colorDotLabel, isSelected && styles.colorDotLabelActive]}>
                        {opt.label}
                      </AppText>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.sectionDivider} />

              <AppText style={styles.meshSelectorTitle}>Màu Mục Chưa Chọn (Inactive Color):</AppText>
              <View style={styles.colorPaletteRow}>
                {NAV_INACTIVE_COLORS.map((opt, idx) => {
                  const isSelected = navInactiveColor === opt.value;
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.colorDotItem, isSelected && styles.colorDotItemActive]}
                      onPress={() => {
                        haptics.light();
                        setNavInactiveColor(opt.value);
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.colorDotPreview, { backgroundColor: opt.color }]} />
                      <AppText style={[styles.colorDotLabel, isSelected && styles.colorDotLabelActive]}>
                        {opt.label}
                      </AppText>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.sectionDivider} />

              <AppText style={styles.meshSelectorTitle}>Màu Nền Nav Bar (Background Color):</AppText>
              <View style={styles.colorPaletteRow}>
                {NAV_BG_COLORS.map((opt, idx) => {
                  const isSelected = navBgColor === opt.value;
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.colorDotItem, isSelected && styles.colorDotItemActive]}
                      onPress={() => {
                        haptics.light();
                        setNavBgColor(opt.value);
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.colorDotPreview, { backgroundColor: opt.color }]} />
                      <AppText style={[styles.colorDotLabel, isSelected && styles.colorDotLabelActive]}>
                        {opt.label}
                      </AppText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </AppCard>

            {/* Kiểu Dáng Nav & Chỉ Báo */}
            <AppCard style={styles.controlCard} borderRadius={cardEffectiveRadius}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>3. Kiểu Dáng Nav & Chỉ Báo Tab</AppText>
                <AppBadge label={`${navVariant} • ${navIndicator}`} variant="primary" />
              </View>

              <AppText style={styles.meshSelectorTitle}>Kiểu Dáng Variant:</AppText>
              <AppSegmentedControl<BottomNavVariant>
                size="sm"
                variant={isGlassTheme ? 'glass' : 'pill'}
                options={NAV_VARIANT_SEGMENT_OPTIONS}
                value={navVariant}
                onChange={(val) => setNavVariant(val)}
                activeColor={resolvedHeaderTintColor || themeColors.primary}
                haptic={hapticsEnabled}
              />

              <AppText style={styles.subSectionTitle}>Chỉ Báo Tab Active (Indicator):</AppText>
              <AppSegmentedControl<BottomNavIndicator>
                size="sm"
                variant={isGlassTheme ? 'glass' : 'pill'}
                options={NAV_INDICATOR_SEGMENT_OPTIONS}
                value={navIndicator}
                onChange={(val) => setNavIndicator(val)}
                activeColor={resolvedHeaderTintColor || themeColors.primary}
                haptic={hapticsEnabled}
              />
            </AppCard>

            {/* Bố Cục Item & Kích Thước Nav */}
            <AppCard style={styles.controlCard} borderRadius={cardEffectiveRadius}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>4. Bố Cục Item & Kích Thước Nav</AppText>
                <AppBadge label={`${navLayout} • ${navSize}`} variant="neutral" />
              </View>

              <AppText style={styles.meshSelectorTitle}>Bố cục các mục trong Nav:</AppText>
              <AppSegmentedControl<BottomNavItemLayout>
                size="sm"
                variant={isGlassTheme ? 'glass' : 'pill'}
                options={NAV_LAYOUT_SEGMENT_OPTIONS}
                value={navLayout}
                onChange={(val) => setNavLayout(val)}
                activeColor={resolvedHeaderTintColor || themeColors.primary}
                haptic={hapticsEnabled}
              />

              <AppText style={styles.subSectionTitle}>Kích Thước Nav:</AppText>
              <AppSegmentedControl<BottomNavSize>
                size="sm"
                variant={isGlassTheme ? 'glass' : 'pill'}
                options={SIZE_SEGMENT_OPTIONS}
                value={navSize}
                onChange={(val) => setNavSize(val)}
                activeColor={resolvedHeaderTintColor || themeColors.primary}
                haptic={hapticsEnabled}
              />
            </AppCard>

            {/* Tùy Chỉnh Bo Góc Nav & Tab Indicator Pill */}
            <AppCard style={styles.controlCard} borderRadius={cardEffectiveRadius}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>5. Tùy Chỉnh Bo Góc Nav & Nút Đang Chọn</AppText>
                <AppBadge
                  label={`${navIndicatorRadius === undefined ? 'Full Pill' : `${navIndicatorRadius}px`} • Inset ${navIndicatorInset}px`}
                  variant="primary"
                />
              </View>

              <AppText style={styles.meshSelectorTitle}>Bo góc viên thuốc mục đang chọn (Selected Indicator):</AppText>
              <View style={styles.radioGrid2Col}>
                {INDICATOR_RADIUS_OPTIONS.map((opt) => {
                  const isSelected =
                    opt.id === 'auto'
                      ? navIndicatorRadius === undefined
                      : navIndicatorRadius === opt.id;
                  return (
                    <View
                      key={String(opt.id)}
                      style={[styles.radioCardItem, isSelected && styles.radioCardItemActive]}
                    >
                      <AppRadio
                        selected={isSelected}
                        onSelect={() => {
                          setNavIndicatorRadius(opt.id === 'auto' ? undefined : opt.id);
                        }}
                        label={opt.label}
                        sublabel={opt.sublabel}
                        size="sm"
                        style={styles.radioInnerFill}
                      />
                    </View>
                  );
                })}
              </View>

              <AppText style={styles.subSectionTitle}>Khoảng cách lọt lòng viền (Indicator Inset):</AppText>
              <AppSegmentedControl<number>
                size="sm"
                variant={isGlassTheme ? 'glass' : 'pill'}
                options={INDICATOR_INSET_SEGMENT_OPTIONS}
                value={navIndicatorInset}
                onChange={(val) => setNavIndicatorInset(val)}
                activeColor={resolvedHeaderTintColor || themeColors.primary}
                haptic={hapticsEnabled}
              />

              <AppText style={styles.subSectionTitle}>Khoảng cách Icon và Chữ (Label Gap):</AppText>
              <AppSegmentedControl<number>
                size="sm"
                variant={isGlassTheme ? 'glass' : 'pill'}
                options={LABEL_GAP_SEGMENT_OPTIONS}
                value={navLabelGap}
                onChange={(val) => setNavLabelGap(val)}
                activeColor={resolvedHeaderTintColor || themeColors.primary}
                haptic={hapticsEnabled}
              />

              <AppText style={styles.subSectionTitle}>Bo góc khung thanh Nav Bar (Container Radius):</AppText>
              <View style={styles.radioGrid2Col}>
                {NAV_RADIUS_OPTIONS.map((opt) => {
                  const isSelected =
                    opt.id === 'auto'
                      ? navBorderRadius === undefined
                      : navBorderRadius === opt.id;
                  return (
                    <View
                      key={String(opt.id)}
                      style={[styles.radioCardItem, isSelected && styles.radioCardItemActive]}
                    >
                      <AppRadio
                        selected={isSelected}
                        onSelect={() => {
                          setNavBorderRadius(opt.id === 'auto' ? undefined : opt.id);
                        }}
                        label={opt.label}
                        sublabel={opt.sublabel}
                        size="sm"
                        style={styles.radioInnerFill}
                      />
                    </View>
                  );
                })}
              </View>

              <View style={styles.sectionDivider} />

              <View style={styles.toggleRow}>
                <View style={styles.toggleInfo}>
                  <AppText style={styles.toggleTitle}>Viền Nút Đang Chọn (Indicator Border):</AppText>
                  <AppText style={styles.toggleDesc}>
                    Bật / tắt và tinh chỉnh độ dày, độ đậm nhạt viền của viên thuốc
                  </AppText>
                </View>
                <AppSwitch
                  value={navIndicatorBorderEnabled}
                  onValueChange={(val) => {
                    haptics.light();
                    setNavIndicatorBorderEnabled(val);
                  }}
                />
              </View>

              {navIndicatorBorderEnabled && (
                <>
                  <AppText style={styles.subSectionTitle}>Độ Dày Viền (Border Width):</AppText>
                  <AppSegmentedControl<number>
                    size="sm"
                    variant={isGlassTheme ? 'glass' : 'pill'}
                    options={INDICATOR_BORDER_WIDTH_OPTIONS}
                    value={navIndicatorBorderWidth}
                    onChange={(val) => setNavIndicatorBorderWidth(val)}
                    activeColor={resolvedHeaderTintColor || themeColors.primary}
                    haptic={hapticsEnabled}
                  />

                  <AppText style={styles.subSectionTitle}>Độ Đậm Nhạt Viền (Border Opacity):</AppText>
                  <AppSegmentedControl<number>
                    size="sm"
                    variant={isGlassTheme ? 'glass' : 'pill'}
                    options={INDICATOR_BORDER_OPACITY_OPTIONS}
                    value={navIndicatorBorderOpacity}
                    onChange={(val) => setNavIndicatorBorderOpacity(val)}
                    activeColor={resolvedHeaderTintColor || themeColors.primary}
                    haptic={hapticsEnabled}
                  />

                  <AppText style={styles.subSectionTitle}>Màu Sắc Viền Nút Chọn (Border Color):</AppText>
                  <View style={styles.colorPaletteRow}>
                    {INDICATOR_BORDER_COLORS.map((opt, idx) => {
                      const isSelected = navIndicatorBorderColor === opt.value;
                      return (
                        <TouchableOpacity
                          key={idx}
                          style={[styles.colorDotItem, isSelected && styles.colorDotItemActive]}
                          onPress={() => {
                            haptics.light();
                            setNavIndicatorBorderColor(opt.value);
                          }}
                          activeOpacity={0.7}
                        >
                          <View style={[styles.colorDotPreview, { backgroundColor: opt.color }]} />
                          <AppText style={[styles.colorDotLabel, isSelected && styles.colorDotLabelActive]}>
                            {opt.label}
                          </AppText>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </>
              )}
            </AppCard>

            {/* Hoán Đổi Vị Trí (Dock Swap) */}
            <AppCard style={styles.controlCard} borderRadius={cardEffectiveRadius}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>6. Hoán Đổi Vị Trí Dock (Layout Inversion)</AppText>
                <AppBadge
                  label={isSwappedDocks ? 'Nav Trên • Header Dưới' : 'Header Trên • Nav Dưới'}
                  variant="info"
                />
              </View>
              <View style={styles.chipsRow}>
                <TouchableOpacity
                  style={[styles.chipBtn, !isSwappedDocks && styles.chipBtnActive]}
                  onPress={() => handleToggleSwapDocks(false)}
                  activeOpacity={0.7}
                >
                  <ArrowUpDown size={14} color={!isSwappedDocks ? themeColors.primary : themeColors.textSecondary} />
                  <AppText style={[styles.chipText, !isSwappedDocks && styles.chipTextActive]}>
                    Mặc Định (Header Trên)
                  </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.chipBtn, isSwappedDocks && styles.chipBtnActive]}
                  onPress={() => handleToggleSwapDocks(true)}
                  activeOpacity={0.7}
                >
                  <ArrowUpDown size={14} color={isSwappedDocks ? themeColors.primary : themeColors.textSecondary} />
                  <AppText style={[styles.chipText, isSwappedDocks && styles.chipTextActive]}>
                    Đảo Ngược (Nav Trên)
                  </AppText>
                </TouchableOpacity>
              </View>
            </AppCard>
          </>
        )}

        {/* TAB 4: FAB STUDIO (COLORS, ICONS & ELEVATION) */}
        {activeStudioTab === 'fab' && (
          <>
            {/* Tùy chỉnh Màu sắc Nút FAB */}
            <AppCard style={styles.controlCard}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>1. Màu Sắc Nút Nổi FAB (Background & Icon)</AppText>
                <AppBadge label={navHasFab ? 'Đang Bật' : 'Đã Ẩn'} variant={navHasFab ? 'success' : 'neutral'} />
              </View>

              <View style={styles.toggleRow}>
                <View style={styles.toggleInfo}>
                  <AppText style={styles.toggleTitle}>Hiển Thị Nút FAB</AppText>
                  <AppText style={styles.toggleDesc}>Gắn nút hành động nổi bật ngay chính giữa thanh Nav</AppText>
                </View>
                <AppSwitch
                  value={navHasFab}
                  onValueChange={(val) => {
                    haptics.light();
                    setNavHasFab(val);
                  }}
                />
              </View>

              {navHasFab && (
                <>
                  <View style={styles.sectionDivider} />

                  <AppText style={styles.meshSelectorTitle}>Màu Nền Nút FAB (Background Color):</AppText>
                  <View style={styles.colorPaletteRow}>
                    {FAB_BG_COLORS.map((opt, idx) => {
                      const isSelected = fabBgColor === opt.value;
                      return (
                        <TouchableOpacity
                          key={idx}
                          style={[styles.colorDotItem, isSelected && styles.colorDotItemActive]}
                          onPress={() => {
                            haptics.light();
                            setFabBgColor(opt.value);
                          }}
                          activeOpacity={0.7}
                        >
                          <View style={[styles.colorDotPreview, { backgroundColor: opt.color }]} />
                          <AppText style={[styles.colorDotLabel, isSelected && styles.colorDotLabelActive]}>
                            {opt.label}
                          </AppText>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <View style={styles.sectionDivider} />

                  <AppText style={styles.meshSelectorTitle}>Màu Icon Nút FAB (Icon Color):</AppText>
                  <View style={styles.colorPaletteRow}>
                    {FAB_ICON_COLORS.map((opt, idx) => {
                      const isSelected = fabIconColor === opt.value;
                      return (
                        <TouchableOpacity
                          key={idx}
                          style={[styles.colorDotItem, isSelected && styles.colorDotItemActive]}
                          onPress={() => {
                            haptics.light();
                            setFabIconColor(opt.value || '#FFFFFF');
                          }}
                          activeOpacity={0.7}
                        >
                          <View style={[styles.colorDotPreview, { backgroundColor: opt.color }]} />
                          <AppText style={[styles.colorDotLabel, isSelected && styles.colorDotLabelActive]}>
                            {opt.label}
                          </AppText>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </>
              )}
            </AppCard>

            {/* Kiểu Dáng, Hình Thức & Độ Nhô FAB */}
            {navHasFab && (
              <AppCard style={styles.controlCard}>
                <View style={styles.cardHeaderRow}>
                  <AppText style={styles.cardTitle}>2. Kiểu Icon, Hình Dáng & Độ Nhô Cao</AppText>
                  <AppBadge label={`${fabType} • +${fabLift}px`} variant="primary" />
                </View>

                <AppText style={styles.meshSelectorTitle}>Chọn Component / Icon FAB:</AppText>
                <AppSegmentedControl<CustomFabType>
                  size="sm"
                  variant={isGlassTheme ? 'glass' : 'pill'}
                  options={FAB_TYPE_SEGMENT_OPTIONS}
                  value={fabType}
                  onChange={(val) => setFabType(val)}
                  activeColor={resolvedHeaderTintColor || themeColors.primary}
                  haptic={hapticsEnabled}
                />

                <AppText style={styles.subSectionTitle}>
                  Độ Nhô Cao FAB ({fabLift}px):
                </AppText>
                <AppSegmentedControl<number>
                  size="sm"
                  variant={isGlassTheme ? 'glass' : 'pill'}
                  options={FAB_LIFT_SEGMENT_OPTIONS}
                  value={fabLift}
                  onChange={(val) => setFabLift(val)}
                  activeColor={resolvedHeaderTintColor || themeColors.primary}
                  haptic={hapticsEnabled}
                />

                <AppText style={styles.subSectionTitle}>Hình Dáng Nút FAB:</AppText>
                <AppSegmentedControl<BottomNavFabShape>
                  size="sm"
                  variant={isGlassTheme ? 'glass' : 'pill'}
                  options={FAB_SHAPE_SEGMENT_OPTIONS}
                  value={fabShape}
                  onChange={(val) => setFabShape(val)}
                  activeColor={resolvedHeaderTintColor || themeColors.primary}
                  haptic={hapticsEnabled}
                />

                <AppText style={styles.subSectionTitle}>Vị Trí Cấu Trúc:</AppText>
                <AppSegmentedControl<BottomNavFabPlacement>
                  size="sm"
                  variant={isGlassTheme ? 'glass' : 'pill'}
                  options={FAB_PLACEMENT_SEGMENT_OPTIONS}
                  value={fabPlacement}
                  onChange={(val) => setFabPlacement(val)}
                  activeColor={resolvedHeaderTintColor || themeColors.primary}
                  haptic={hapticsEnabled}
                />
              </AppCard>
            )}
          </>
        )}

        {/* TAB 5: PRESETS STUDIO */}
        {activeStudioTab === 'presets' && (
          <>
            <AppCard style={styles.controlCard}>
              <View style={styles.cardHeaderRow}>
                <AppText style={styles.cardTitle}>Bộ Cấu Hình Tuyệt Mỹ (Curated Presets)</AppText>
                <Sparkles size={16} color={themeColors.primary} />
              </View>
              <AppText style={styles.sampleDesc}>
                Các bộ preset được phối sẵn đồng bộ mọi màu chữ, màu icon, màu nền, bo góc, Kính Apple Glass, Header và Nav Bar chỉ trong 1 chạm:
              </AppText>

              {presets.map((preset) => (
                <View key={preset.id} style={styles.presetCard}>
                  <View style={styles.presetCardHeader}>
                    <View style={styles.presetTitleRow}>
                      <AppText style={styles.presetTitle}>{preset.name}</AppText>
                      <AppBadge label={preset.tag} variant="primary" />
                    </View>
                  </View>
                  <AppText style={styles.presetDesc}>{preset.desc}</AppText>
                  <TouchableOpacity
                    style={styles.presetApplyBtn}
                    onPress={() => {
                      haptics.success();
                      preset.apply();
                    }}
                    activeOpacity={0.8}
                  >
                    <Zap size={13} color="#FFFFFF" />
                    <AppText style={styles.presetApplyText}>Áp Dụng Phong Cách Này</AppText>
                  </TouchableOpacity>
                </View>
              ))}
            </AppCard>
          </>
        )}

        {/* TRỰC QUAN HÓA TOKENS ĐANG HOẠT ĐỘNG */}
        <AppCard style={styles.sampleCard}>
          <View style={styles.sampleHeader}>
            <AppText style={styles.sampleTitle}>Trực Quan Hóa Design Tokens</AppText>
            <Sparkles size={16} color={themeColors.primary} />
          </View>
          <AppText style={styles.sampleDesc}>
            Các component bên dưới đang tự động kế thừa màu nhấn, bán kính bo góc và độ tương phản bạn vừa chọn:
          </AppText>

          {/* Interactive button variants demo */}
          <View style={styles.tokensDemoGrid}>
            <View style={styles.tokenDemoRow}>
              <TouchableOpacity
                style={[styles.demoBtn, styles.demoBtnFilled]}
                onPress={() => haptics.light()}
                activeOpacity={0.8}
              >
                <AppText style={styles.demoBtnTextFilled}>Filled Button</AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.demoBtn, styles.demoBtnTinted]}
                onPress={() => haptics.light()}
                activeOpacity={0.8}
              >
                <AppText style={styles.demoBtnTextTinted}>Tinted Button</AppText>
              </TouchableOpacity>
            </View>

            <View style={styles.tokenDemoRow}>
              <TouchableOpacity
                style={[styles.demoBtn, styles.demoBtnOutline]}
                onPress={() => haptics.light()}
                activeOpacity={0.8}
              >
                <AppText style={styles.demoBtnTextOutline}>Outline Button</AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.demoBtn, styles.demoBtnGlass]}
                onPress={() => haptics.light()}
                activeOpacity={0.8}
              >
                <AppText style={styles.demoBtnTextGlass}>Glass Button</AppText>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sampleItem}>
            <AppText style={styles.sampleItemLabel}>Màu Nhấn (Accent Color)</AppText>
            <AppText style={[styles.sampleItemValue, { color: themeColors.primary }]}>
              {accentColor.toUpperCase()}
            </AppText>
          </View>

          <View style={styles.sampleItem}>
            <AppText style={styles.sampleItemLabel}>Màu Chữ Tiêu Đề Header</AppText>
            <AppText style={[styles.sampleItemValue, { color: resolvedHeaderTitleColor || themeColors.text }]}>
              {headerTitleColor || 'Tự động (Theme)'}
            </AppText>
          </View>

          <View style={styles.sampleItem}>
            <AppText style={styles.sampleItemLabel}>Màu Active Nav Bar</AppText>
            <AppText style={[styles.sampleItemValue, { color: resolvedNavActiveColor }]}>
              {navActiveColor || 'Tự động (Accent)'}
            </AppText>
          </View>

          <View style={styles.sampleItem}>
            <AppText style={styles.sampleItemLabel}>Nút FAB Trung Tâm</AppText>
            <AppText style={[styles.sampleItemValue, { color: resolvedFabBgColor }]}>
              {navHasFab ? `${fabType} (+${fabLift}px, Icon: ${fabIconColor})` : 'Đã ẩn'}
            </AppText>
          </View>

          <View style={styles.sampleItem}>
            <AppText style={styles.sampleItemLabel}>Bo Góc (Radius Tokens)</AppText>
            <AppText style={styles.sampleItemValue}>
              {radiusPreset.toUpperCase()} ({radiusTokens.card}px Card • {radiusTokens.control}px Button)
            </AppText>
          </View>
        </AppCard>
      </ScreenWrapper>

      {/* 2. ACTUAL TOP DOCK */}
      <View style={styles.topDockFixedWrapper} pointerEvents="box-none">
        {isSwappedDocks ? (
          // Inverted: BottomNav mounted at Top (Category Tabs)
          <AppBottomNav
            items={currentNavItems}
            activeKey={activeTab}
            onChange={(k) => {
              haptics.light();
              setActiveTab(k);
            }}
            placement="top"
            mode={navMode}
            maxItems={6}
            variant={navVariant}
            indicatorStyle={navIndicator}
            itemLayout={navLayout}
            size={navSize}
            borderRadius={navBorderRadius}
            indicatorBorderRadius={navIndicatorRadius}
            indicatorInset={navIndicatorInset}
            indicatorBorderEnabled={navIndicatorBorderEnabled}
            indicatorBorderWidth={navIndicatorBorderWidth}
            indicatorBorderColor={navIndicatorBorderColor}
            indicatorBorderOpacity={navIndicatorBorderOpacity}
            labelGap={navLabelGap}
            contrast={globalContrast}
            activeColor={resolvedNavActiveColor}
            inactiveColor={resolvedNavInactiveColor}
            backgroundColor={navBgColor}
            centerFab={centerFabConfig}
          />
        ) : (
          // Standard: AppHeader mounted at Top
          <AppHeader
            title="Theme Studio"
            subtitle="Design System & Live Engine"
            titleStyle={resolvedHeaderTitleColor ? { color: resolvedHeaderTitleColor } : undefined}
            subtitleStyle={resolvedHeaderSubtitleColor ? { color: resolvedHeaderSubtitleColor } : undefined}
            tintColor={resolvedHeaderTintColor}
            backgroundColor={headerBgColor}
            variant={headerVariant}
            borderRadius={headerBorderRadius}
            backStyle={headerBackStyle}
            actionStyle={headerActionStyle}
            titleAlign={headerTitleAlign}
            size={headerSize}
            searchable={headerSearchable}
            contrast={globalContrast}
            showBack
            backTitle="Quay lại"
            onBack={() => {
              haptics.light();
              navigation.goBack();
            }}
            rightActions={headerRightActions}
          />
        )}
      </View>

      {/* 3. ACTUAL BOTTOM DOCK */}
      <View style={styles.bottomDockFixedWrapper} pointerEvents="box-none">
        {isSwappedDocks ? (
          // Inverted: AppHeader mounted at Bottom as Reachability Command Bar
          <AppHeader
            title="Theme Studio"
            subtitle="Design System & Live Engine"
            titleStyle={resolvedHeaderTitleColor ? { color: resolvedHeaderTitleColor } : undefined}
            subtitleStyle={resolvedHeaderSubtitleColor ? { color: resolvedHeaderSubtitleColor } : undefined}
            tintColor={resolvedHeaderTintColor}
            backgroundColor={headerBgColor}
            variant={headerVariant}
            borderRadius={headerBorderRadius}
            backStyle={headerBackStyle}
            actionStyle={headerActionStyle}
            titleAlign={headerTitleAlign}
            size={headerSize}
            searchable={headerSearchable}
            contrast={globalContrast}
            showBack
            backTitle="Quay lại"
            onBack={() => {
              haptics.light();
              navigation.goBack();
            }}
            placement="bottom"
            rightActions={headerRightActions}
          />
        ) : (
          // Standard: AppBottomNav mounted at Bottom
          <AppBottomNav
            items={currentNavItems}
            activeKey={activeTab}
            onChange={(k) => {
              haptics.light();
              setActiveTab(k);
            }}
            placement="bottom"
            mode={navMode}
            maxItems={6}
            variant={navVariant}
            indicatorStyle={navIndicator}
            itemLayout={navLayout}
            size={navSize}
            borderRadius={navBorderRadius}
            indicatorBorderRadius={navIndicatorRadius}
            indicatorInset={navIndicatorInset}
            indicatorBorderEnabled={navIndicatorBorderEnabled}
            indicatorBorderWidth={navIndicatorBorderWidth}
            indicatorBorderColor={navIndicatorBorderColor}
            indicatorBorderOpacity={navIndicatorBorderOpacity}
            labelGap={navLabelGap}
            contrast={globalContrast}
            activeColor={resolvedNavActiveColor}
            inactiveColor={resolvedNavInactiveColor}
            backgroundColor={navBgColor}
            centerFab={centerFabConfig}
          />
        )}
      </View>

      {/* Studio Quick Options Action Sheet */}
      <AppActionSheet
        visible={isOptionsSheetOpen}
        onClose={() => setIsOptionsSheetOpen(false)}
        title="Tùy Chọn Theme Studio"
        message="Các thao tác nhanh cho hệ thống giao diện và điều hướng"
        borderRadius={cardEffectiveRadius}
        actions={[
          {
            id: 'swap-dock',
            label: isSwappedDocks ? 'Chuyển về Bố Cục Chuẩn (Header Trên, Nav Dưới)' : 'Đảo Vị Trí Dock (Nav Trên, Header Dưới)',
            icon: <ArrowUpDown size={18} color={themeColors.primary} />,
            onPress: () => handleToggleSwapDocks(!isSwappedDocks),
          },
          {
            id: 'toggle-search',
            label: headerSearchable ? 'Tắt Thanh Tìm Kiếm Header' : 'Bật Thanh Tìm Kiếm Header',
            icon: <Sliders size={18} color={themeColors.text} />,
            onPress: () => {
              setHeaderSearchable((prev) => !prev);
            },
          },
          {
            id: 'toggle-theme',
            label: isDark ? 'Chuyển sang Chế Độ Sáng' : 'Chuyển sang Chế Độ Tối',
            icon: isDark ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} color="#6366F1" />,
            onPress: toggleTheme,
          },
          {
            id: 'reset-theme',
            label: 'Khôi Phục Mặc Định Toàn Bộ',
            destructive: true,
            icon: <RotateCcw size={18} color="#EF4444" />,
            onPress: () => {
              resetThemeSettings();
              setHeaderTitleColor(undefined);
              setHeaderSubtitleColor(undefined);
              setHeaderTintColor(undefined);
              setHeaderBgColor(undefined);
              setNavActiveColor(undefined);
              setNavInactiveColor(undefined);
              setNavBgColor(undefined);
              setFabBgColor(undefined);
              setFabIconColor('#FFFFFF');
              setNavBorderRadius(undefined);
              setNavIndicatorRadius(undefined);
              setNavIndicatorInset(3.5);
              setNavIndicatorBorderEnabled(true);
              setNavIndicatorBorderWidth(1);
              setNavIndicatorBorderOpacity(0.28);
              setNavIndicatorBorderColor(undefined);
              setNavLabelGap(2);
              setNavMode('tabs');
              setNavMenuItemCount(6);
              setHeaderBorderRadius(undefined);
              setCustomCardRadius(undefined);
            },
          },
        ]}
      />
    </View>
  );
};
