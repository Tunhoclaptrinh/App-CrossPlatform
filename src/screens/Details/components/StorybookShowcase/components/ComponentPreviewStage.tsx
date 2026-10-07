import React, { useState, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
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
  GlassCard,
  AppleGlassCard,
  AppHeader,
  ConfirmDialog,
  AppActionSheet,
  Skeleton,
  CupertinoIconTile,
  GlassTile,
  EmptyState,
  AppSegmentedControl,
  type AppSelectOption,
  type SegmentOption,
  type ControlVariant,
  type ControlContrast,
} from '@/components';
import { ControlSize, type ControlSizeKey } from '@/constants/theme';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';
import type { ComponentId, ComponentMeta, PreviewCanvasBackground } from '../types';
import { haptics } from '@/utils';

interface ComponentPreviewStageProps {
  component: ComponentMeta;
  allComponents: ComponentMeta[];
  onBackToCatalog: () => void;
  onSelectComponent: (id: ComponentId) => void;
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
}

export const ComponentPreviewStage: React.FC<ComponentPreviewStageProps> = ({
  component,
  allComponents,
  onBackToCatalog,
  onSelectComponent,
  themeColors,
  radiusTokens,
  isDark,
}) => {
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
  const [cardVariant, setCardVariant] = useState<'elevated' | 'outlined' | 'flat'>('elevated');
  const [headerVariant, setHeaderVariant] = useState<'standard' | 'floating-pill' | 'frosted-capsule'>('standard');
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
  ];

  // Options for selecting Header Variant
  const headerVariantOptions: AppSelectOption<string>[] = [
    { label: 'Standard (Thanh Chuẩn iOS)', value: 'standard', sublabel: 'Navbar cố định truyền thống' },
    { label: 'Frosted Capsule (Viên Thuốc Kính)', value: 'frosted-capsule', sublabel: 'Viên thuốc nổi mờ nền' },
    { label: 'Floating Pill (Đảo Động)', value: 'floating-pill', sublabel: 'Dynamic Island nổi độc lập' },
  ];

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

  const currentHeight = ControlSize[controlSize].height;

  // Icon color synchronized with button state
  const buttonIconColor =
    buttonVariant === 'primary' || buttonVariant === 'danger'
      ? '#FFFFFF'
      : themeColors.text;

  // Generate dynamic usage code snippet
  const generateSnippet = (): string => {
    switch (component.id) {
      case 'button':
        return `<AppButton\n  size="${controlSize}"\n  variant="${buttonVariant}"${controlContrast !== 'normal' ? `\n  contrast="${controlContrast}"` : ''}${controlShadow !== 'none' ? `\n  shadow="${controlShadow}"` : ''}\n  title="Bấm vào đây"\n  loading={${isLoading}}\n  disabled={${isDisabled}}${isFullWidth ? '\n  fullWidth' : ''}${hasIcon ? `\n  leftIcon={<Sparkles size={${ControlSize[controlSize].iconSize}} color="${buttonIconColor}" />}` : ''}\n  onPress={() => {}}\n/>`;
      case 'input':
        return `<AppInput\n  size="${controlSize}"${controlVariant !== 'standard' ? `\n  variant="${controlVariant}"` : ''}${controlContrast !== 'normal' ? `\n  contrast="${controlContrast}"` : ''}${controlShadow !== 'none' ? `\n  shadow="${controlShadow}"` : ''}\n  label="Họ và tên"\n  placeholder="Nhập thông tin..."\n  value={text}\n  onChangeText={setText}${hasIcon ? '\n  leftIcon={<Mail size={16} />}' : ''}${hasError ? '\n  error="Trường này không được để trống"' : ''}${isDisabled ? '\n  disabled' : ''}\n/>`;
      case 'select':
        return `<AppSelect\n  size="${controlSize}"${controlVariant !== 'standard' ? `\n  variant="${controlVariant}"` : ''}${controlContrast !== 'normal' ? `\n  contrast="${controlContrast}"` : ''}${controlShadow !== 'none' ? `\n  shadow="${controlShadow}"` : ''}\n  label="Quốc gia"\n  options={options}\n  value={value}\n  onSelect={setValue}\n  sheetTitle="Chọn quốc gia"\n/>`;
      case 'searchbar':
        return `<AppSearchBar\n  size="${controlSize}"${controlVariant !== 'standard' ? `\n  variant="${controlVariant}"` : ''}${controlContrast !== 'normal' ? `\n  contrast="${controlContrast}"` : ''}${controlShadow !== 'none' ? `\n  shadow="${controlShadow}"` : ''}\n  placeholder="Tìm kiếm..."\n  value={query}\n  onChangeText={setQuery}\n  onFilterPress={() => {}}\n/>`;
      case 'header':
        return `<AppHeader\n  title="Màn hình chính"\n  subtitle="Hệ thống điều phối"\n  variant="${headerVariant}"\n  showBack\n  showMore\n  onBack={() => {}}\n/>`;
      case 'apple-glass-card':
        return `<AppleGlassCard\n  balance="45,280.00"\n  balanceLabel="SỐ DƯ KHẢ DỤNG"\n  cardNumber="•••• 8829"\n  cardHolder="EVE SENSE"\n  brandName="Apple Glass"\n  onPress={() => {}}\n/>`;
      case 'card':
        return `<AppCard\n  variant="${cardVariant}"\n  style={{ padding: 16 }}\n>\n  <AppText>Nội dung thẻ bề mặt</AppText>\n</AppCard>`;
      case 'glass-card':
        return `<GlassCard style={{ padding: 16 }}>\n  <AppText>Bề mặt kính mờ quang học</AppText>\n</GlassCard>`;
      case 'badge':
        return `<AppBadge\n  label="Trạng thái"\n  variant="${badgeVariant}"\n  size="${controlSize === 'lg' ? 'md' : 'sm'}"\n/>`;
      case 'switch':
        return `<AppSwitch\n  label="Thông báo đẩy"\n  sublabel="Nhận thông báo sự kiện"\n  value={enabled}\n  onValueChange={setEnabled}\n/>`;
      case 'checkbox':
        return `<AppCheckbox\n  label="Tôi đồng ý với điều khoản"\n  checked={checked}\n  onChange={setChecked}\n/>`;
      case 'confirm-dialog':
        return `<ConfirmDialog\n  visible={isOpen}\n  title="Xác nhận thao tác"\n  message="Bạn có chắc chắn muốn thực hiện hành động này?"\n  onConfirm={() => setIsOpen(false)}\n  onCancel={() => setIsOpen(false)}\n/>`;
      case 'action-sheet':
        return `<AppActionSheet\n  visible={isOpen}\n  title="Tùy chọn thao tác"\n  actions={[\n    { id: '1', label: 'Lưu thay đổi', onPress: () => {} },\n    { id: '2', label: 'Xóa mục', destructive: true, onPress: () => {} }\n  ]}\n  onClose={() => setIsOpen(false)}\n/>`;
      case 'skeleton':
        return `<View style={{ gap: 8 }}>\n  <Skeleton width={120} height={18} />\n  <Skeleton width="100%" height={12} />\n  <Skeleton width="80%" height={12} />\n</View>`;
      case 'icon-tile':
        return `<CupertinoIconTile\n  icon={Sparkles}\n  baseColor="#007AFF"\n/>\n<GlassTile\n  icon={Shield}\n  iconColor="#10B981"\n  value="100%"\n  label="Bảo Mật"\n/>`;
      case 'empty-state':
        return `<EmptyState\n  title="Chưa có dữ liệu"\n  description="Hãy thêm mới mục đầu tiên để bắt đầu."\n  actionText="Thêm ngay"\n  onActionPress={() => {}}\n/>`;
      case 'segmented-control':
        return `<AppSegmentedControl\n  size="${controlSize}"\n  variant="${segmentedVariant}"\n  options={[\n    { label: 'Tất cả', value: 'all', badge: 14 },\n    { label: 'Đang chờ', value: 'pending', badge: 3 },\n    { label: 'Hoàn thành', value: 'completed' },\n  ]}\n  value={tab}\n  onChange={setTab}\n  disabled={${isDisabled}}\n/>`;
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
          borderRadius: Math.min(radiusTokens.pill, 16),
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
          borderRadius: Math.min(radiusTokens.pill, 14),
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
          borderRadius: Math.max(6, Math.min(radiusTokens.card, 16) - 2),
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
          padding: 18,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 140,
        },
        canvasInner: {
          width: '100%',
          alignItems: 'stretch',
          justifyContent: 'center',
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
          borderRadius: Math.min(radiusTokens.card, 12),
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
          borderRadius: Math.min(radiusTokens.card, 12),
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
          borderRadius: Math.min(radiusTokens.card, 14),
          overflow: 'hidden',
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
        sectionHeaderRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        },
      }),
    [themeColors, radiusTokens, isDark]
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
                  variant={buttonVariant}
                  contrast={controlContrast}
                  shadow={controlShadow}
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
                variant={controlVariant}
                contrast={controlContrast}
                shadow={controlShadow}
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
                variant={controlVariant}
                contrast={controlContrast}
                shadow={controlShadow}
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
                variant={controlVariant}
                contrast={controlContrast}
                shadow={controlShadow}
                placeholder="Tìm kiếm tài liệu, biên lai..."
                value={searchVal}
                onChangeText={setSearchVal}
                onFilterPress={() => haptics.light()}
              />
            )}

            {component.id === 'header' && (
              <View style={styles.headerWrapper}>
                <AppHeader
                  title="EveSense Preview"
                  subtitle="Node điều phối cảm biến"
                  variant={headerVariant}
                  showBack
                  showMore
                  onBack={() => haptics.light()}
                  onMore={() => haptics.light()}
                />
              </View>
            )}

            {component.id === 'apple-glass-card' && (
              <AppleGlassCard
                balance="45,280.00"
                balanceLabel="SỐ DƯ TÀI KHOẢN"
                cardNumber="•••• 8829"
                cardHolder="EVE SENSE NODE"
                brandName="Apple Glass"
                onPress={() => haptics.light()}
              />
            )}

            {component.id === 'card' && (
              <AppCard variant={cardVariant}>
                <View style={styles.cardContentGap}>
                  <AppText style={styles.cardTitle}>
                    AppCard ({cardVariant.toUpperCase()})
                  </AppText>
                  <AppText style={styles.cardSubtitle}>
                    Khung bề mặt card với token bo góc radius.card ({radiusTokens.card}px).
                  </AppText>
                </View>
              </AppCard>
            )}

            {component.id === 'glass-card' && (
              <GlassCard style={styles.glassCardPadding}>
                <View style={styles.cardContentGap}>
                  <View style={styles.glassHeaderRow}>
                    <Sparkles size={16} color="#007AFF" />
                    <AppText style={styles.glassTitle}>
                      GlassCard (Cupertino Frosted)
                    </AppText>
                  </View>
                  <AppText style={styles.glassDesc}>
                    Kính mờ quang học đa tầng mượt mà với viền Specular phản chiếu ánh sáng.
                  </AppText>
                </View>
              </GlassCard>
            )}

            {component.id === 'badge' && (
              <View style={styles.badgeCenterRow}>
                <AppBadge
                  label={`Badge ${badgeVariant.toUpperCase()}`}
                  variant={badgeVariant}
                  size={controlSize === 'lg' ? 'md' : 'sm'}
                />
              </View>
            )}

            {component.id === 'switch' && (
              <AppSwitch
                label="Thông báo thời gian thực"
                sublabel="Bật để nhận cảnh báo tức thì từ webhook"
                value={switchVal}
                onValueChange={setSwitchVal}
                disabled={isDisabled}
              />
            )}

            {component.id === 'checkbox' && (
              <AppCheckbox
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
                  variant="primary"
                  title="Mở Thử Nghiệm Hộp Thoại"
                  onPress={() => setIsDialogOpen(true)}
                />
                <ConfirmDialog
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
                  variant="tonal"
                  title="Mở Cupertino Action Sheet"
                  onPress={() => setIsSheetOpen(true)}
                />
                <AppActionSheet
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
                  <Skeleton width={44} height={44} borderRadius={22} />
                  <View style={styles.skeletonCol}>
                    <Skeleton width="60%" height={16} />
                    <Skeleton width="40%" height={12} />
                  </View>
                </View>
                <Skeleton width="100%" height={12} />
                <Skeleton width="85%" height={12} />
              </View>
            )}

            {component.id === 'icon-tile' && (
              <View style={styles.iconTileRow}>
                <CupertinoIconTile
                  icon={Sparkles}
                  baseColor="#007AFF"
                />
                <GlassTile
                  icon={Shield}
                  iconColor="#10B981"
                  value="100%"
                  label="Bảo Mật"
                />
              </View>
            )}

            {component.id === 'empty-state' && (
              <EmptyState
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
                  variant={segmentedVariant}
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

        {/* Contrast Level Control for Form Primitives and Button */}
        {(component.id === 'input' ||
          component.id === 'select' ||
          component.id === 'searchbar' ||
          component.id === 'button') && (
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
        )}

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

        {/* Standardized Interactive States via AppSwitch (Chuẩn hóa toàn diện phong cách Apple Settings) */}
        <View style={styles.controlGroup}>
          <AppText style={[styles.specTileLabel, { color: themeColors.textSecondary }]}>
            TRẠNG THÁI TƯƠNG TÁC (INTERACTIVE STATES)
          </AppText>
          <View style={styles.statesGroup}>
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
                ? `${radiusTokens.card}px`
                : radiusTokens.control >= 999
                ? 'Full Pill'
                : `${radiusTokens.control}px`}
            </AppText>
          </View>
          <View style={styles.specTile}>
            <AppText style={styles.specTileLabel}>Chế độ giao diện</AppText>
            <AppText style={styles.specTileVal}>{isDark ? 'Dark Mode' : 'Light Mode'}</AppText>
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.codeScrollContent}
          >
            <AppText style={styles.codeText}>{generateSnippet()}</AppText>
          </ScrollView>
        </View>
      </AppCard>
    </View>
  );
};
