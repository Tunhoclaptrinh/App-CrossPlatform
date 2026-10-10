import React from 'react';
import { Globe, Home, Compass, Folder, User } from 'lucide-react-native';
import {
  type AppSelectOption,
  type SegmentOption,
  type ControlVariant,
  type ControlContrast,
  type BottomNavItem,
  type LoadingPosition,
  type LoadingVariant,
  type LoadingAnimationType,
} from '@/components';
import { ControlSize, type ControlSizeKey } from '@/constants/theme';
import type { ShadowLevel } from './types';
import type { PreviewCanvasBackground } from '../../types';

export const sampleSelectOptions: AppSelectOption<string>[] = [
  { label: 'Việt Nam', value: 'vn', icon: <Globe size={15} color="#007AFF" />, sublabel: '+84 Quốc gia' },
  { label: 'Hoa Kỳ', value: 'us', icon: <Globe size={15} color="#10B981" />, sublabel: '+1 North America' },
  { label: 'Nhật Bản', value: 'jp', icon: <Globe size={15} color="#EC4899" />, sublabel: '+81 Asia Pacific' },
];

export const buttonVariantOptions: AppSelectOption<string>[] = [
  { label: 'Primary (Nút Chính)', value: 'primary', sublabel: 'Nổi bật, màu thương hiệu nền đặc' },
  { label: 'Secondary (Nút Phụ)', value: 'secondary', sublabel: 'Nền trung tính, tương phản nhẹ nhàng' },
  { label: 'Outline (Viền Đơn)', value: 'outline', sublabel: 'Nền trong suốt, viền mảnh 1px' },
  { label: 'Tonal (Bề Mặt Mờ)', value: 'tonal', sublabel: 'Nền dịu mắt với độ mờ trong suốt' },
  { label: 'Glass (Kính Lỏng Apple)', value: 'glass', sublabel: 'Kính mờ khúc xạ Liquid Glass iOS' },
  { label: 'Danger (Cảnh Báo)', value: 'danger', sublabel: 'Màu đỏ dành cho thao tác xóa hoặc hủy' },
];

export const cardVariantOptions: AppSelectOption<string>[] = [
  { label: 'Elevated (Bóng Đổ)', value: 'elevated', sublabel: 'Bề mặt nổi với bóng đổ mềm nhiều tầng' },
  { label: 'Outlined (Viền Đơn)', value: 'outlined', sublabel: 'Bề mặt phẳng viền phân cách 1px' },
  { label: 'Flat (Phẳng)', value: 'flat', sublabel: 'Bề mặt phẳng tối giản không viền' },
  { label: 'Glass (Kính Mờ Apple)', value: 'glass', sublabel: 'Bề mặt kính mờ quang học đa tầng viền phản quang' },
];

export const headerVariantOptions: AppSelectOption<string>[] = [
  { label: 'Standard (Thanh Chuẩn iOS)', value: 'standard', sublabel: 'Navbar cố định truyền thống' },
  { label: 'Frosted Capsule (Viên Thuốc Kính)', value: 'frosted-capsule', sublabel: 'Viên thuốc nổi mờ nền' },
  { label: 'Floating Pill (Đảo Động)', value: 'floating-pill', sublabel: 'Dynamic Island nổi độc lập' },
];

export const headerPlacementOptions: AppSelectOption<string>[] = [
  { label: 'Top (Trên đỉnh - Tiêu chuẩn)', value: 'top', sublabel: 'Thanh điều hướng tiêu chuẩn trên cùng màn hình' },
  { label: 'Bottom (Dưới đáy - Command Bar)', value: 'bottom', sublabel: 'Thanh lệnh tầm với một tay kiểu Safari / Arc' },
];

export const headerActionStyleOptions: AppSelectOption<string>[] = [
  { label: 'Capsule (Viên Thuốc Gom Nhóm)', value: 'capsule', sublabel: 'Nút tìm kiếm & more thành khối pill liền mạch' },
  { label: 'Individual (Nút Tròn Rời)', value: 'individual', sublabel: 'Mỗi nút hành động là một khối tròn độc lập' },
];

export const headerCenterSlotOptions: AppSelectOption<string>[] = [
  { label: 'Tiêu Đề Tĩnh (Title & Subtitle)', value: 'title', sublabel: 'Hiển thị title và subtitle văn bản mặc định' },
  { label: 'Nhúng Menu Xổ Xuống (AppSelect)', value: 'select', sublabel: 'Nhúng nguyên 1 dropdown chọn node cảm biến vào giữa Header' },
  { label: 'Nhúng Thanh Search (AppSearchBar)', value: 'searchbar', sublabel: 'Nhúng trực tiếp ô tìm kiếm thường trực vào giữa Header' },
];

export const headerExpansionPositionOptions: AppSelectOption<string>[] = [
  { label: 'Cả Hai (Both - Inner & Bottom Dropdown)', value: 'both', sublabel: 'Biến hình ruột thanh search và thả thẻ gợi ý nổi bên dưới' },
  { label: 'Chỉ Bên Trong (Inner Only)', value: 'inner', sublabel: 'Chỉ biến hình ruột Header (thanh search), không hiện dropdown' },
  { label: 'Chỉ Thả Dưới (Bottom Dropdown Only)', value: 'bottom', sublabel: 'Giữ nguyên Header tiêu đề/select và thả dropdown gợi ý bên dưới' },
];

export const bottomNavVariantOptions: AppSelectOption<string>[] = [
  { label: 'Floating Pill (Đảo Nổi Độc Lập)', value: 'floating-pill', sublabel: 'Dock viên thuốc bo tròn nổi bồng bềnh' },
  { label: 'Standard (Thanh Chuẩn iOS)', value: 'standard', sublabel: 'Navbar mép đáy cố định, vách ngăn hairline' },
  { label: 'Frosted Glass (Kính Mờ Apple)', value: 'frosted-glass', sublabel: 'Kính lỏng Liquid Glass quang học khúc xạ' },
];

export const bottomNavPlacementOptions: AppSelectOption<string>[] = [
  { label: 'Bottom (Dưới đáy - Tiêu chuẩn)', value: 'bottom', sublabel: 'Thanh dock điều hướng nằm sát đáy màn hình' },
  { label: 'Top (Trên đỉnh - Category Tabs)', value: 'top', sublabel: 'Thanh dock nằm trên đỉnh phân loại danh mục' },
];

export const bottomNavIndicatorOptions: AppSelectOption<string>[] = [
  { label: 'None (Tối Giản Sạch Sẽ - Mặc định)', value: 'none', sublabel: 'Chỉ làm nổi bật màu icon/text bằng primary color' },
  { label: 'Pill (Khối Viên Thuốc Mờ)', value: 'pill', sublabel: 'Nền viên thuốc êm dịu bao quanh mục tab' },
  { label: 'Glow (Chấm Sáng Phát Quang)', value: 'glow', sublabel: 'Vầng hào quang phát quang nhẹ' },
  { label: 'Dot (Chấm Tròn Tinh Tế)', value: 'dot', sublabel: 'Dấu chấm chỉ báo nhỏ phía dưới' },
  { label: 'Line (Vạch Viền Đáy)', value: 'line', sublabel: 'Vạch sáng thanh mảnh hiện đại' },
];

export const bottomNavItemLayoutOptions: AppSelectOption<string>[] = [
  { label: 'Vertical (Icon trên, Chữ dưới)', value: 'vertical', sublabel: 'Bố cục tab mobile kinh điển' },
  { label: 'Horizontal (Icon trái, Chữ phải)', value: 'horizontal', sublabel: 'Bố cục dạng dock ngang gọn gàng' },
  { label: 'Icon Only (Chỉ biểu tượng)', value: 'icon-only', sublabel: 'Ẩn nhãn chữ, tối đa hóa không gian' },
];

export const bottomNavFabShapeOptions: AppSelectOption<string>[] = [
  { label: 'Circle (Tròn hoàn hảo)', value: 'circle', sublabel: 'Bo tròn bán kính 26px' },
  { label: 'Squircle (Apple Squircle)', value: 'squircle', sublabel: 'Bo góc mềm mại bán kính 16px' },
];

export const bottomNavFabPlacementOptions: AppSelectOption<string>[] = [
  { label: 'Lifted (Nhô cao mép trên)', value: 'lifted', sublabel: 'Nổi bật nhô lên 22px bên trên dock' },
  { label: 'Embedded (Chìm phẳng ngang bằng)', value: 'embedded', sublabel: 'Nằm phẳng cân đối bên trong thân dock' },
];

export const bottomNavCustomFabTypeOptions: AppSelectOption<string>[] = [
  { label: 'Tiêu Chuẩn (Action Button +)', value: 'standard', sublabel: 'Nút hành động tròn / squircle với biểu tượng Plus' },
  { label: 'AI Copilot Orb (Viên Cầu Đa Sắc)', value: 'ai-orb', sublabel: 'Khối cầu AI phát sáng gradient với icon Sparkles' },
  { label: 'QR Scanner Radar (Máy Quét)', value: 'qr-radar', sublabel: 'Nút quét mã công nghệ cao với viền quét radar xanh ngọc' },
  { label: 'Voice Visualizer (Sóng Âm)', value: 'voice-wave', sublabel: 'Nút thu âm với icon micro đa sắc' },
];

const renderBottomNavHomeIcon = () => <Home size={19} />;
const renderBottomNavCompassIcon = () => <Compass size={19} />;
const renderBottomNavFolderIcon = () => <Folder size={19} />;
const renderBottomNavUserIcon = () => <User size={19} />;

export const STATIC_BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { key: 'home', label: 'Trang chủ', icon: renderBottomNavHomeIcon },
  { key: 'explore', label: 'Khám phá', icon: renderBottomNavCompassIcon, badge: 3 },
  { key: 'files', label: 'Tài liệu', icon: renderBottomNavFolderIcon },
  { key: 'profile', label: 'Cá nhân', icon: renderBottomNavUserIcon, badgeDot: true },
];

export const badgeVariantOptions: AppSelectOption<string>[] = [
  { label: 'Primary (Chính)', value: 'primary', sublabel: 'Màu thương hiệu chủ đạo' },
  { label: 'Success (Thành Công)', value: 'success', sublabel: 'Màu xanh lá hoàn thành' },
  { label: 'Warning (Cảnh Báo)', value: 'warning', sublabel: 'Màu vàng cam nhắc nhở' },
  { label: 'Error (Thất Bại / Lỗi)', value: 'error', sublabel: 'Màu đỏ báo lỗi' },
  { label: 'Info (Thông Tin)', value: 'info', sublabel: 'Màu xanh dương tin tức' },
  { label: 'Neutral (Trung Tính)', value: 'neutral', sublabel: 'Màu xám nhãn phụ' },
];

export const segmentedVariantOptions: AppSelectOption<string>[] = [
  { label: 'Pill (Viên Thuốc Nổi)', value: 'pill', sublabel: 'Capsule nổi bật với viền specular và bóng đổ mềm' },
  { label: 'Glass (Kính Mờ Cupertino)', value: 'glass', sublabel: 'Bề mặt kính quang học mờ xuyên thấu frosted' },
  { label: 'Standard (Chuẩn Apple HIG)', value: 'standard', sublabel: 'Bề mặt xám trung tính với phím trượt màu tương phản' },
  { label: 'Tonal (Màu Nhạt Pha)', value: 'tonal', sublabel: 'Nền dịu mắt hòa cùng tông màu thương hiệu' },
  { label: 'Outline (Viền Tối Giản)', value: 'outline', sublabel: 'Khung viền mảnh thanh lịch, nền trong suốt' },
];

export const controlVariantOptions: AppSelectOption<ControlVariant>[] = [
  { label: 'Standard (Nền Tiêu Chuẩn)', value: 'standard', sublabel: 'Nền đặc chuẩn mực, viền phân cách 1px thanh lịch' },
  { label: 'Filled (Phủ Nền Dịu Mắt)', value: 'filled', sublabel: 'Nền phủ màu xám tint hiện đại theo chuẩn iOS HIG' },
  { label: 'Glass (Kính Lỏng Apple)', value: 'glass', sublabel: 'Kính mờ quang học đa tầng Liquid Glass với viền Specular' },
  { label: 'Elevated (Bóng Nổi 3D)', value: 'elevated', sublabel: 'Bề mặt thẻ nổi với bóng đổ mềm tự nhiên' },
  { label: 'Outline (Viền Tối Giản)', value: 'outline', sublabel: 'Nền trong suốt tuyệt đối với viền nét 1.5px' },
];

export const contrastOptions: SegmentOption<ControlContrast>[] = [
  { label: 'Dịu Nhẹ', value: 'subtle' },
  { label: 'Chuẩn', value: 'normal' },
  { label: 'Đậm Nét', value: 'high' },
];

export const shadowOptions: SegmentOption<ShadowLevel>[] = [
  { label: 'Phẳng', value: 'none' },
  { label: 'Nhẹ', value: 'sm' },
  { label: 'Vừa', value: 'md' },
  { label: 'Nổi', value: 'lg' },
];

export const sizeOptions: SegmentOption<ControlSizeKey>[] = [
  { label: `SM (${ControlSize.sm.height}px)`, value: 'sm' },
  { label: `MD (${ControlSize.md.height}px)`, value: 'md' },
  { label: `LG (${ControlSize.lg.height}px)`, value: 'lg' },
];

export const canvasBgOptions: SegmentOption<PreviewCanvasBackground>[] = [
  { label: 'Chuẩn', value: 'default' },
  { label: 'Thẻ', value: 'card' },
  { label: 'Đậm', value: 'contrast' },
];

export const loadingPositionOptions: SegmentOption<LoadingPosition>[] = [
  { label: 'Giữa (Center)', value: 'center' },
  { label: 'Đỉnh (Top)', value: 'top' },
  { label: 'Đáy (Bottom)', value: 'bottom' },
];

export const loadingVariantOptions: SegmentOption<LoadingVariant>[] = [
  { label: 'Card', value: 'card' },
  { label: 'Glass', value: 'glass' },
  { label: 'Pill', value: 'pill' },
  { label: 'Minimal', value: 'minimal' },
];

export const loadingAnimOptions: SegmentOption<LoadingAnimationType>[] = [
  { label: 'Spinner', value: 'spinner' },
  { label: 'Pulse', value: 'pulse' },
  { label: 'Dots', value: 'dots' },
];
