import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export type HeaderTitleAlign = 'left' | 'center' | 'right';

export interface AppHeaderAction {
  id?: string;
  icon?: React.ReactNode;
  title?: string;
  onPress: () => void;
  accessibilityLabel?: string;
  disabled?: boolean;
}

export type AppHeaderVariant = 'standard' | 'floating-pill' | 'frosted-capsule';
export type AppHeaderBackStyle = 'text' | 'circle' | 'glass-capsule';
export type AppHeaderActionStyle = 'individual' | 'capsule';
export type AppHeaderSize = 'sm' | 'md' | 'lg';

export interface AppHeaderSuggestion {
  id?: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  onPress: () => void;
}

export interface AppHeaderSearchHelpers {
  searchValue: string;
  onSearchChange: (text: string) => void;
  closeSearch: () => void;
}

export type AppHeaderExpansionPosition = 'inner' | 'bottom' | 'both';

export interface AppHeaderExpansionHelpers {
  close: () => void;
  isExpanded: boolean;
  searchValue?: string;
  onSearchChange?: (text: string) => void;
}

export interface AppHeaderCustomHelpers {
  close: () => void;
  insets: { top: number; bottom: number; left: number; right: number };
  isDark: boolean;
  themeColors: import('@/constants/colors').ThemeColors;
}

export interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  titleAlign?: HeaderTitleAlign;
  subtitleAlign?: HeaderTitleAlign;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  centerContent?: React.ReactNode; // Slot tùy biến cho khu vực ở giữa (Select, SearchBar, SegmentedControl, v.v.)

  // Header Variant (Standard iOS navbar, Floating Pill with Island Capsule, or Frosted Capsule)
  variant?: AppHeaderVariant;
  size?: AppHeaderSize;
  borderRadius?: number;

  // Left action / Back button
  showBack?: boolean;
  backTitle?: string; // Text 'Back' cạnh chevron kiểu iOS
  backStyle?: AppHeaderBackStyle; // 'text' (mặc định iOS) | 'circle' (nút tròn mờ Cupertino) | 'glass-capsule'
  onBack?: () => void;
  leftAction?: React.ReactNode;
  leftActions?: AppHeaderAction[];

  // Right actions / More button
  showMore?: boolean;
  onMore?: () => void;
  moreTitle?: string;
  moreMessage?: string;
  moreActions?: Array<{
    id: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    onPress: () => void;
    destructive?: boolean;
    disabled?: boolean;
  }>;
  moreSearchable?: boolean;
  moreSearchPlaceholder?: string;
  moreMaxHeight?: number | string;
  rightAction?: React.ReactNode;
  rightActions?: AppHeaderAction[];
  actionStyle?: AppHeaderActionStyle; // 'individual' (mặc định cho standard) | 'capsule' (nhóm viên thuốc liền mạch có vách ngăn)

  // Search Mode in Header (Header biến hình thành thanh tìm kiếm trực tiếp)
  searchable?: boolean;
  isSearching?: boolean;
  onSearchToggle?: (active: boolean) => void;
  searchValue?: string;
  onSearchChange?: (text: string) => void;
  onSearchDebounceChange?: (text: string) => void;
  searchPlaceholder?: string;
  onSearchClear?: () => void;
  searchAutoFocus?: boolean;
  searchVariant?: import('../surfaceUtils').ControlVariant;       // Tùy biến kiểu bề mặt (mặc định tự đồng bộ: capsule/island -> 'glass', standard -> 'filled')
  searchContrast?: import('../surfaceUtils').ControlContrast;    // Tùy biến tương phản ('normal' | 'high' | 'subtle', mặc định kế thừa Header)
  searchBorderRadius?: number;                                    // Tùy biến bo góc (mặc định đồng bộ theo variant của Header)
  searchStyle?: ViewStyle;                                        // Style trực tiếp của search input
  searchContainerStyle?: ViewStyle;                               // Style của hàng tìm kiếm trên Header
  searchProps?: Partial<import('../AppSearchBar').AppSearchBarProps>; // Tùy chỉnh chi tiết mọi prop của AppSearchBar
  searchContainerMode?: 'auto' | 'pill' | 'bar';                  // 'auto': tự động đồng bộ (floating-pill -> giữ pill container, standard -> full bar), 'pill': cưỡng chế đảo nổi pill, 'bar': thanh ngang
  searchPillStyle?: ViewStyle;                                    // Tùy biến style khối pill khi ở chế độ pill search
  searchBg?: string;                                              // Tùy biến màu nền riêng cho ô tìm kiếm
  searchBorderColor?: string;                                     // Tùy biến viền cho ô tìm kiếm
  searchBorderWidth?: number;                                     // Tùy biến độ dày viền cho ô tìm kiếm
  searchCancelText?: string;                                      // Tùy biến nhãn nút hủy (mặc định "Hủy")
  searchCancelStyle?: ViewStyle;                                  // Tùy biến container nút hủy
  searchCancelTextStyle?: TextStyle;                              // Tùy biến text nút hủy
  searchBackButtonStyle?: ViewStyle;                              // Tùy biến nút back đóng tìm kiếm
  showSearchCancel?: boolean;                                     // Ẩn/hiện nút hủy (mặc định true)
  showSearchBackButton?: boolean;                                 // Ẩn/hiện nút back khi đang tìm kiếm (mặc định true)

  // Custom Search Component & Suggestions (Tùy biến thanh search hoặc gợi ý tìm kiếm truyền từ ngoài)
  customSearchComponent?: React.ReactNode;                        // Nhúng nguyên 1 thanh tìm kiếm tùy ý vào
  renderSearch?: (helpers: AppHeaderSearchHelpers) => React.ReactNode; // Render prop tùy biến toàn diện giao diện tìm kiếm
  suggestions?: AppHeaderSuggestion[];                            // Danh sách gợi ý tìm kiếm tự động lọc & hiển thị thẻ nổi
  searchSuggestions?: React.ReactNode | ((query: string) => React.ReactNode); // Slot gợi ý hoàn toàn tùy biến
  suggestionsContainerStyle?: ViewStyle;                          // Style cho khung danh sách gợi ý nổi

  // Generalized Header Expansion & Morphing System (Hệ thống mở rộng Header tổng quát hóa)
  expanded?: boolean;                                             // Trạng thái mở rộng tùy biến (ngoài hoặc tích hợp cùng search)
  isExpanded?: boolean;                                           // Alias cho expanded
  onExpandChange?: (expanded: boolean) => void;                   // Callback khi đóng/mở trạng thái mở rộng
  expansionPosition?: AppHeaderExpansionPosition;                 // 'both' (mặc định) | 'inner' (chỉ thay ruột header) | 'bottom' (chỉ thả thẻ nổi bên dưới)
  expandedInnerContent?: React.ReactNode;                         // Component thay thế ruột Header khi ở trạng thái mở rộng
  renderExpandedInner?: (helpers: AppHeaderExpansionHelpers) => React.ReactNode; // Render prop thay thế ruột Header
  expandedBottomContent?: React.ReactNode;                        // Component thả nổi bên dưới Header (thay thế hoặc bổ trợ gợi ý)
  renderExpandedBottom?: (helpers: AppHeaderExpansionHelpers) => React.ReactNode; // Render prop thả nổi bên dưới Header
  expandedBottomStyle?: ViewStyle;                                // Tùy biến style cho khung nổi bên dưới
  expandedBottomOffset?: number;                                  // Khoảng cách đẩy khung nổi tách biệt bên dưới Header (mặc định 14px)

  // Full Custom Header Replacement System (Thay thế hoàn toàn Header nhưng ở đúng vị trí Header)
  customHeader?: React.ReactNode;                                  // Component thay thế trọn vẹn toàn bộ Header (vẫn giữ chuẩn safe area, layout height và vị trí)
  renderCustomHeader?: (helpers: AppHeaderCustomHelpers) => React.ReactNode; // Render prop thay thế trọn vẹn Header với các helper (close, insets, theme...)
  isCustomMode?: boolean;                                         // Cờ bật/tắt chế độ thay thế Header theo sự kiện (ví dụ: chế độ chọn nhiều ảnh, player, vẽ...)
  customMode?: boolean;                                           // Alias cho isCustomMode
  onCustomModeChange?: (active: boolean) => void;                 // Callback khi bật/tắt chế độ custom mode
  replacementScope?: 'full' | 'inner';                            // 'full' (mặc định: chiếm 100% diện tích Header từ mép trái sang phải) | 'inner' (vẫn giữ khung pill/capsule bên ngoài)

  placement?: 'top' | 'bottom';                                   // 'top' (mặc định) | 'bottom' (Bottom Command Bar phong cách Safari / Arc)
  bottomContent?: React.ReactNode;
  children?: React.ReactNode;

  // Styling & Surfaces
  transparent?: boolean;
  backgroundColor?: string;        // Màu nền tùy chỉnh (VD: '#FFFFFF', 'rgba(...)', hex, rgb)
  backgroundOpacity?: number;      // Tinh chỉnh độ trong suốt của nền (0.0 -> 1.0) không làm mờ chữ/nút
  glass?: boolean;
  borderBottom?: boolean;
  contrast?: import('../surfaceUtils').ControlContrast;
  tintColor?: string;              // Màu nhấn chủ đạo cho back / action text

  // Granular Sub-Element Style Overrides (Cho phép chèn style tùy chỉnh từ bên ngoài)
  style?: ViewStyle;               // Root container style
  containerStyle?: ViewStyle;      // Alias cho root container style
  leftContainerStyle?: ViewStyle;  // Tùy chỉnh slot bên trái
  rightContainerStyle?: ViewStyle; // Tùy chỉnh slot bên phải
  centerContainerStyle?: ViewStyle;// Tùy chỉnh slot tiêu đề ở giữa
  capsuleStyle?: ViewStyle;        // Tùy chỉnh cụm viên thuốc nhóm action
  backButtonStyle?: ViewStyle;     // Tùy chỉnh nút back
  islandStyle?: ViewStyle;         // Tùy chỉnh đảo Dynamic Island khi ở chế độ floating-pill
}
