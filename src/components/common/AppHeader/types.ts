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

export interface AppHeaderProps {
  title: string;
  subtitle?: string;
  titleAlign?: HeaderTitleAlign;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;

  // Header Variant (Standard iOS navbar, Floating Pill with Island Capsule, or Frosted Capsule)
  variant?: AppHeaderVariant;

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
  rightAction?: React.ReactNode;
  rightActions?: AppHeaderAction[];
  actionStyle?: AppHeaderActionStyle; // 'individual' (mặc định cho standard) | 'capsule' (nhóm viên thuốc liền mạch có vách ngăn)

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
