import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { EdgeInsets } from 'react-native-safe-area-context';
import type { ControlContrast } from '../surfaceUtils';

export type BottomNavVariant = 'standard' | 'floating-pill' | 'frosted-glass';
export type BottomNavSize = 'sm' | 'md' | 'lg';
export type BottomNavIndicator = 'none' | 'pill' | 'glow' | 'dot' | 'line';
export type BottomNavItemLayout = 'vertical' | 'horizontal' | 'icon-only';
export type BottomNavFabShape = 'circle' | 'squircle';
export type BottomNavFabPlacement = 'lifted' | 'embedded';
export type BottomNavPlacement = 'bottom' | 'top';
export type BottomNavMode = 'tabs' | 'menu';

export interface AppBottomNavCustomHelpers {
  close: () => void;
  insets: EdgeInsets;
  isDark: boolean;
  themeColors: Record<string, string>;
}

export interface BottomNavItem {
  key: string;
  label?: string;
  icon:
    | React.ReactNode
    | ((props: { focused: boolean; color: string; size: number }) => React.ReactNode);
  activeIcon?: React.ReactNode;
  badge?: number | string;
  badgeDot?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  testID?: string;
}

export interface BottomNavCenterFabHelpers {
  isDark: boolean;
  primaryColor: string;
  isTop: boolean;
  isFloating: boolean;
  liftOffset: number;
  placement: BottomNavFabPlacement;
}

export interface BottomNavCenterFab {
  icon?: React.ReactNode;
  onPress?: () => void;
  label?: string;
  accessibilityLabel?: string;
  backgroundColor?: string;
  iconColor?: string;
  badge?: number | string;
  badgeDot?: boolean;
  shape?: BottomNavFabShape;
  placement?: BottomNavFabPlacement;
  /**
   * Độ cao nhô ra ngoài mép viền thanh dock (pixel). Mặc định: 22px
   */
  liftOffset?: number;
  /**
   * Kích thước đường kính nút FAB (pixel). Mặc định: 52px (khi nhô), 46px (khi chìm)
   */
  size?: number;
  /**
   * Component tùy biến hoàn toàn để hiển thị thay thế nút chuẩn nhưng vẫn tự động hưởng lợi từ cơ chế nhô cao và đảo chiều
   */
  customComponent?:
    | React.ReactNode
    | ((helpers: BottomNavCenterFabHelpers) => React.ReactNode);
}

export interface AppBottomNavProps {
  /**
   * Chế độ hoạt động của thanh điều hướng:
   * - tabs: Tab điều hướng chuẩn (hỗ trợ nút hành động FAB ở giữa)
   * - menu: Thanh menu thuần túy (không có nút ở giữa, dàn trải đều tối đa 6 mục)
   * @default 'tabs'
   */
  mode?: BottomNavMode;

  /**
   * Giới hạn số lượng mục tối đa hiển thị (mặc định: 6 trong chế độ menu)
   * @default 6
   */
  maxItems?: number;

  /**
   * Danh sách các mục điều hướng (2 - 5 tabs cho tab bar, tối đa 6 cho menu)
   */
  items: BottomNavItem[];

  /**
   * Khóa mục tab hiện đang được kích hoạt
   */
  activeKey: string;

  /**
   * Callback khi người dùng chuyển sang tab khác
   */
  onChange: (key: string) => void;

  /**
   * Biến thể phong cách giao diện:
   * - standard: Thanh tab chuẩn iOS HIG cố định mép đáy có vách ngăn hairline
   * - floating-pill: Khối dock đảo nổi lơ lửng tự do bo tròn (Dynamic Dock)
   * - frosted-glass: Kính mờ khúc xạ quang học đa tầng Liquid Glass
   * @default 'standard'
   */
  variant?: BottomNavVariant;

  /**
   * Vị trí gắn thanh điều hướng trên màn hình:
   * - 'bottom': Mép đáy truyền thống (mặc định)
   * - 'top': Đỉnh màn hình (Top Navigation Tabs)
   * @default 'bottom'
   */
  placement?: BottomNavPlacement;

  /**
   * Cấp độ tương phản viền và bề mặt ('normal' | 'high' | 'subtle')
   */
  contrast?: ControlContrast;

  /**
   * Kích thước chiều cao thanh điều hướng
   * @default 'md'
   */
  size?: BottomNavSize;

  /**
   * Hiển thị nhãn chữ bên dưới icon
   * @default true
   */
  showLabels?: boolean;

  /**
   * Bố cục hiển thị mục tab:
   * - vertical: Icon trên, nhãn dưới (chuẩn tab bar mobile)
   * - horizontal: Icon bên trái, nhãn bên phải (dạng dock rộng hoặc tablet)
   * - icon-only: Chỉ hiển thị icon, ẩn nhãn chữ
   * @default 'vertical'
   */
  itemLayout?: BottomNavItemLayout;

  /**
   * Kiểu chỉ báo mục tab đang kích hoạt
   * - none: Tối giản sạch sẽ (mặc định) - chỉ làm nổi bật màu icon/text bằng primary color
   * - pill: Khối viên thuốc mờ mềm mại bao quanh mục tab
   * - glow: Chấm sáng phát quang dịu mắt
   * - dot: Dấu chấm tròn nhỏ bên dưới
   * - line: Vạch viền tinh tế
   * @default 'none'
   */
  indicatorStyle?: BottomNavIndicator;

  /**
   * Màu nhấn khi mục được kích hoạt (mặc định lấy theo theme primary)
   */
  activeColor?: string;

  /**
   * Màu mục khi chưa kích hoạt (mặc định lấy theo theme textSecondary)
   */
  inactiveColor?: string;

  /**
   * Tùy biến màu nền riêng cho thanh điều hướng
   */
  backgroundColor?: string;

  /**
   * Độ mờ trong suốt của nền (0.0 -> 1.0)
   */
  backgroundOpacity?: number;

  /**
   * Nút hành động nổi nhô lên chính giữa thanh điều hướng:
   * - Đối tượng cấu hình BottomNavCenterFab
   * - React.ReactNode component tùy chỉnh
   * - Render function: (helpers: BottomNavCenterFabHelpers) => React.ReactNode
   */
  centerFab?:
    | React.ReactNode
    | BottomNavCenterFab
    | ((helpers: BottomNavCenterFabHelpers) => React.ReactNode);

  /**
   * Độ cao nhô ra ngoài mép viền thanh dock (pixel).
   * @default 22
   */
  fabLiftOffset?: number;

  /**
   * Hàm render toàn phần component trung tâm với các helper theme, đảo chiều và liftOffset
   */
  renderCenterFab?: (helpers: BottomNavCenterFabHelpers) => React.ReactNode;

  /**
   * Hình dáng nút FAB trung tâm:
   * - circle: Tròn hoàn hảo (mặc định)
   * - squircle: Bo góc mềm mại kiểu Apple Squircle
   * @default 'circle'
   */
  fabShape?: BottomNavFabShape;

  /**
   * Vị trí nút FAB trung tâm:
   * - lifted: Nhô cao lên trên mép viền (mặc định)
   * - embedded: Nằm phẳng chìm vừa vặn bên trong thanh dock
   * @default 'lifted'
   */
  fabPlacement?: BottomNavFabPlacement;

  /**
   * Slot phụ kiện docked ngay phía trên thanh điều hướng (ví dụ: mini-player nhạc, tóm tắt giỏ hàng, chip lọc)
   */
  topContent?: React.ReactNode;

  /**
   * Component thay thế toàn bộ BottomNav (giữ vị trí và safe area đáy)
   */
  customBottomNav?: React.ReactNode;

  /**
   * Render prop thay thế BottomNav với các helper { close, insets, isDark, themeColors }
   */
  renderCustomBottomNav?: (helpers: AppBottomNavCustomHelpers) => React.ReactNode;

  /**
   * Bật/tắt chế độ BottomNav tùy chỉnh (ví dụ: Bulk Action Bar "Đã chọn 3 mục" + [Xóa][Hủy])
   */
  isCustomMode?: boolean;

  /**
   * Alias cho isCustomMode
   */
  customMode?: boolean;

  /**
   * Callback khi người dùng thoát hoặc thay đổi trạng thái custom mode
   */
  onCustomModeChange?: (active: boolean) => void;

  /**
   * Phạm vi thay thế giao diện custom:
   * - 'full': Chiếm trọn bề ngang mép đáy (mặc định)
   * - 'inner': Giữ nguyên khung dock floating/frosted glass và thay thế nội dung bên trong
   * @default 'full'
   */
  replacementScope?: 'full' | 'inner';

  /**
   * Ẩn toàn bộ thanh BottomNav (phù hợp khi cuộn trang hoặc full-screen view)
   * @default false
   */
  hidden?: boolean;

  /**
   * Bật rung phản hồi xúc giác nhẹ khi chạm chuyển tab
   * @default true
   */
  hapticFeedback?: boolean;

  /**
   * Tự động bù khoảng đệm safe area mép đáy màn hình (Home Indicator)
   * @default true
   */
  safeArea?: boolean;

  /**
   * Tùy biến bán kính bo góc tùy ý (ví dụ: 16, 24, 9999)
   */
  borderRadius?: number;

  /**
   * Tùy biến bán kính bo góc cho chỉ báo tab chọn (Pill indicator)
   */
  indicatorBorderRadius?: number;

  /**
   * Khoảng đệm mép của chỉ báo viên thuốc (khoảng cách viền ôm sát, pixel)
   * @default 2
   */
  indicatorInset?: number;

  /**
   * Khoảng cách giữa icon và chữ nhãn (pixel)
   * @default 1.5
   */
  labelGap?: number;

  /**
   * Bật/tắt đường viền bao quanh chỉ báo mục tab đang chọn
   * @default true
   */
  indicatorBorderEnabled?: boolean;

  /**
   * Độ dày đường viền chỉ báo (pixel)
   * @default 1
   */
  indicatorBorderWidth?: number;

  /**
   * Màu viền tùy chỉnh của chỉ báo viên thuốc (mặc định lấy theo activeColor)
   */
  indicatorBorderColor?: string;

  /**
   * Độ đậm nhạt / trong suốt của đường viền chỉ báo (0.0 -> 1.0)
   * @default 0.28
   */
  indicatorBorderOpacity?: number;

  // Custom style overrides
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  activeLabelStyle?: StyleProp<TextStyle>;
}
