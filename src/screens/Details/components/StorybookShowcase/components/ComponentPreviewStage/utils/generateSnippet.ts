import type { ComponentMeta } from '../../../types';
import { ControlSize, type RadiusPresetConfig, type ControlSizeKey } from '@/constants/theme';
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
import type { ShadowLevel } from '../types';

export interface GenerateSnippetParams {
  component: ComponentMeta;
  activeRadiusTokens: RadiusPresetConfig;
  customRadiusValue: number | null;
  controlContrast: ControlContrast;
  controlSize: ControlSizeKey;
  effectiveButtonVariant: string;
  effectiveControlVariant: ControlVariant;
  controlShadow: ShadowLevel;
  isLoading: boolean;
  isDisabled: boolean;
  isFullWidth: boolean;
  hasIcon: boolean;
  buttonIconColor: string;
  hasError: boolean;
  headerVariant: string;
  headerPlacement: 'top' | 'bottom';
  headerActionStyle: 'individual' | 'capsule';
  headerCenterSlot: 'title' | 'select' | 'searchbar';
  headerExpansionPosition: 'both' | 'inner' | 'bottom';
  headerCustomMode: boolean;
  bottomNavPlacement: BottomNavPlacement;
  bottomNavHasFab: boolean;
  bottomNavCustomFabType: 'standard' | 'ai-orb' | 'qr-radar' | 'voice-wave';
  bottomNavFabPlacement: BottomNavFabPlacement;
  bottomNavLiftOffset: number;
  bottomNavFabShape: BottomNavFabShape;
  bottomNavItemLayout: BottomNavItemLayout;
  bottomNavHasTopContent: boolean;
  miniPlayerPlaying: boolean;
  bottomNavCustomMode: boolean;
  activeBottomTab: string;
  bottomNavVariant: BottomNavVariant;
  bottomNavIndicator: BottomNavIndicator;
  bottomNavShowLabels: boolean;
  cardVariant: string;
  badgeVariant: string;
  segmentedVariant: string;
  avatarStatus: string;
  avatarBadgeCount: number;
  dividerDashed: boolean;
  dividerThickness: number;
  progressVal: number;
  activeDot: number;
  radioVal: string;
  chipVariant: ChipVariant;
  chipSelected: boolean;
  otpVal: string;
  otpSecure: boolean;
  ratingVal: number;
  toastType: ToastType;
  widgetRefreshing: boolean;
  gestureAction: string;
  loadingPosition: LoadingPosition;
  loadingVariant: LoadingVariant;
  loadingAnimType: LoadingAnimationType;
  loadingShowProgress: boolean;
  loadingProgressVal: number;
}

export const generateSnippet = ({
  component,
  activeRadiusTokens,
  customRadiusValue,
  controlContrast,
  controlSize,
  effectiveButtonVariant,
  effectiveControlVariant,
  controlShadow,
  isLoading,
  isDisabled,
  isFullWidth,
  hasIcon,
  buttonIconColor,
  hasError,
  headerVariant,
  headerPlacement,
  headerActionStyle,
  headerCenterSlot,
  headerExpansionPosition,
  headerCustomMode,
  bottomNavPlacement,
  bottomNavHasFab,
  bottomNavCustomFabType,
  bottomNavFabPlacement,
  bottomNavLiftOffset,
  bottomNavFabShape,
  bottomNavItemLayout,
  bottomNavHasTopContent,
  miniPlayerPlaying,
  bottomNavCustomMode,
  activeBottomTab,
  bottomNavVariant,
  bottomNavIndicator,
  bottomNavShowLabels,
  cardVariant,
  badgeVariant,
  segmentedVariant,
  avatarStatus,
  avatarBadgeCount,
  dividerDashed,
  dividerThickness,
  progressVal,
  activeDot,
  radioVal,
  chipVariant,
  chipSelected,
  otpVal,
  otpSecure,
  ratingVal,
  toastType,
  widgetRefreshing,
  gestureAction,
  loadingPosition,
  loadingVariant,
  loadingAnimType,
  loadingShowProgress,
  loadingProgressVal,
}: GenerateSnippetParams): string => {
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
