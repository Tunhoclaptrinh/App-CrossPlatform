import { ViewStyle } from 'react-native';
import type { ControlContrast } from '../surfaceUtils';

export type LoadingPosition = 'center' | 'top' | 'bottom' | 'fullscreen';
export type LoadingVariant = 'card' | 'glass' | 'pill' | 'minimal';
export type LoadingAnimationType = 'spinner' | 'pulse' | 'dots';

export interface LoadingOverlayProps {
  /** Hiển thị hoặc ẩn loading */
  visible?: boolean;
  /** Thông điệp hiển thị (mặc định: 'Đang xử lý...') */
  message?: string;
  /** Mô tả phụ hoặc trạng thái chi tiết */
  subMessage?: string;
  /** Chế độ toàn màn hình khóa tương tác (mặc định: false) */
  fullscreen?: boolean;
  /** Vị trí hiển thị: 'center' | 'top' | 'bottom' | 'fullscreen' (mặc định: 'center') */
  position?: LoadingPosition;
  /** Phong cách bề mặt: 'card' | 'glass' | 'pill' | 'minimal' (mặc định: 'card') */
  variant?: LoadingVariant;
  /** Kiểu hoạt cảnh: 'spinner' | 'pulse' | 'dots' (mặc định: 'spinner') */
  animationType?: LoadingAnimationType;
  /** Tiến độ % từ 0 đến 100 (tùy chọn) */
  progress?: number;
  /** Màu sắc spinner / indicator (mặc định: theme.primary) */
  indicatorColor?: string;
  /** Kích thước indicator: 'small' | 'large' (mặc định: 'large') */
  indicatorSize?: 'small' | 'large';
  /** Bo góc tùy biến theo Design System tokens */
  borderRadius?: number;
  /** Cấp độ tương phản viền bề mặt */
  contrast?: ControlContrast;
  /** Nền trong suốt không làm mờ/tối màn hình */
  transparentBackdrop?: boolean;
  /** Tùy chỉnh style container */
  style?: ViewStyle;
  /** Callback khi người dùng chạm backdrop để hủy (nếu cho phép) */
  onDismiss?: () => void;
}
