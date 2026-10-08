import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Zap,
  Cpu,
  Play,
} from 'lucide-react-native';
import { AppText, AppCard, AppButton, AppSwitch } from '@/components';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';
import type { ComponentId } from '../types';
import { haptics } from '@/utils';

interface ComponentMotionInspectorProps {
  componentId: ComponentId;
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
  onTriggerAction?: (actionId: string) => void;
}

interface MotionProfile {
  title: string;
  type: string;
  mechanism: string;
  parameters: string;
  description: string;
  actionLabel?: string;
  actionId?: string;
}

const MOTION_PROFILES: Record<ComponentId, MotionProfile> = {
  button: {
    title: 'Elastic Spring Press Feedback',
    type: 'Vật lý Lò xo Đàn hồi',
    mechanism: 'GPU Scale Transform',
    parameters: 'scale: 0.975 (speed: 50, bounciness: 4)',
    description: 'Nút co lại nhẹ khi nhấn giữ và bật nảy đàn hồi tự nhiên khi nhả tay, chạy 100% trên luồng C++ Native Driver.',
    actionLabel: 'Thử Hoạt Ảnh Nhấn Nút',
    actionId: 'press-test',
  },
  'segmented-control': {
    title: 'Sliding Pill Spring Physics',
    type: 'Phương trình Lò xo GPU',
    mechanism: 'TranslateX Matrix',
    parameters: 'stiffness: 280, damping: 24, mass: 0.65',
    description: 'Con trỏ viên thuốc trượt tức thì đến vị trí tab mới theo phương trình vi phân lò xo, mượt mà ở 120 FPS không nghẽn JS.',
    actionLabel: 'Đổi Tab Thử Sliding Pill',
    actionId: 'cycle-tab',
  },
  chip: {
    title: 'Micro-elastic Scale Press',
    type: 'Vật lý Lò xo Vi mô',
    mechanism: 'GPU Scale Transform',
    parameters: 'scale: 0.96 (speed: 50, bounciness: 4)',
    description: 'Thẻ lọc Chip phản hồi xúc giác kết hợp co giãn nhẹ, giúp người dùng cảm nhận rõ phản hồi chạm khi lọc dữ liệu.',
    actionLabel: 'Thử Hoạt Ảnh Nhấn Chip',
    actionId: 'press-test',
  },
  'apple-glass-card': {
    title: 'Tactile Apple Glass Spring',
    type: 'Đàn hồi Quang học',
    mechanism: 'GPU Scale & Refraction',
    parameters: 'scale: 0.985 (speed: 45, bounciness: 3)',
    description: 'Thẻ kính Apple Glass phản hồi độ lún mượt mà tạo cảm giác chiều sâu vật liệu cao cấp.',
    actionLabel: 'Thử Chạm Thẻ Apple Glass',
    actionId: 'press-test',
  },
  'confirm-dialog': {
    title: 'Spring Pop Modal Entry',
    type: 'Bật nảy Trung tâm',
    mechanism: 'Scale & Opacity Interpolation',
    parameters: 'scale: 0.94 ➔ 1.0 (tension: 60, friction: 8)',
    description: 'Hộp thoại mở ra từ tâm màn hình với độ nảy nhẹ tạo cảm giác sống động và dứt khoát.',
    actionLabel: 'Mở Thử Confirm Dialog',
    actionId: 'open-dialog',
  },
  skeleton: {
    title: 'Wave Shimmer Opacity Loop',
    type: 'Sóng mờ Vòng lặp',
    mechanism: 'Animated Timing Loop',
    parameters: 'opacity: 0.45 ➔ 0.95 (duration: 750ms)',
    description: 'Hoạt cảnh sóng mờ chạy trên GPU, tự động dừng (freeze) khi bật Reduce Motion để bảo vệ mắt và tiết kiệm pin.',
    actionLabel: 'Đổi Trạng Thái Skeleton',
    actionId: 'toggle-skeleton',
  },
  accordion: {
    title: '180° Chevron Matrix Rotation',
    type: 'Góc quay Ma trận',
    mechanism: 'Matrix Transform RotateZ',
    parameters: 'angle: 0° ➔ 180° (duration: 220ms)',
    description: 'Mũi tên Chevron xoay mượt mà 180 độ theo chiều kim đồng hồ khi mở rộng/thu gọn.',
    actionLabel: 'Mở/Đóng Accordion',
    actionId: 'toggle-accordion',
  },
  progress: {
    title: 'Linear Width Smooth Flow',
    type: 'Nội suy Độ dài',
    mechanism: 'Interpolated Progress Width',
    parameters: 'duration: 240ms (ease-in-out)',
    description: 'Thanh tiến trình tăng giảm êm ái không bị nhảy sốc giữa các mốc phần trăm.',
    actionLabel: 'Chạy Thử Tiến Trình 0-100%',
    actionId: 'simulate-progress',
  },
  toast: {
    title: 'Spring Slide Down & Dismiss',
    type: 'Trượt thả Trọng lực',
    mechanism: 'TranslateY Spring',
    parameters: 'tension: 65, friction: 9',
    description: 'Thông báo trượt êm từ đỉnh màn hình xuống với gia tốc tự nhiên và mờ dần khi đóng.',
    actionLabel: 'Bắn Toast Thử Nghiệm',
    actionId: 'trigger-toast',
  },
  'action-sheet': {
    title: 'ActionSheet Slide & Fade',
    type: 'Trượt đáy Màn hình',
    mechanism: 'Modal Transition & Backdrop Blur',
    parameters: 'tension: 60, friction: 8',
    description: 'Khung thao tác trượt từ đáy lên kết hợp làm tối nền mờ tự nhiên.',
    actionLabel: 'Mở Thử ActionSheet',
    actionId: 'open-sheet',
  },
  'bottom-sheet': {
    title: 'Cupertino BottomSheet Motion',
    type: 'Khung kéo Cử chỉ iOS',
    mechanism: 'Slide Transition & Drag Handle',
    parameters: 'spring: tension 50, friction: 7',
    description: 'Khung kéo BottomSheet mở lên với đường cong gia tốc chuẩn Apple iOS.',
    actionLabel: 'Mở Thử BottomSheet',
    actionId: 'open-bottom-sheet',
  },
  'icon-tile': {
    title: 'GlassTile Tactile Press',
    type: 'Lò xo Bề mặt Kính',
    mechanism: 'GPU Scale Transform',
    parameters: 'scale: 0.96 (speed: 50, bounciness: 4)',
    description: 'Ô kính GlassTile co giãn đàn hồi khi chạm giữ.',
    actionLabel: 'Thử Chạm Ô Kính',
    actionId: 'press-test',
  },
  input: {
    title: 'Focus Border & Clean Feedback',
    type: 'Phản hồi Trọng tâm',
    mechanism: 'Border Highlight & Haptics',
    parameters: 'instant 0ms GPU render',
    description: 'Đổi màu viền và làm sáng khung nhập liệu tức thì không gây trễ bàn phím.',
  },
  select: {
    title: 'Dropdown Sheet Spring Slide',
    type: 'Trượt Danh sách',
    mechanism: 'Cupertino Modal Flow',
    parameters: 'tension: 60, friction: 8',
    description: 'Cửa sổ lựa chọn trượt mở êm ái với danh sách phần tử hỗ trợ haptics.',
  },
  searchbar: {
    title: 'Search Focus & Clear Pop',
    type: 'Phản hồi Nhanh',
    mechanism: 'Filter Icon Tap & Clear Feedback',
    parameters: 'instant response with haptics',
    description: 'Nút xóa và lọc phản hồi xúc giác nhẹ nhàng khi tương tác.',
  },
  header: {
    title: 'Navbar Elevation & Blur Transition',
    type: 'Chuyển đổi Kiểu dáng',
    mechanism: 'Dynamic Island & Frosted Capsule',
    parameters: 'native backdrop filter',
    description: 'Header mờ đục hoặc nổi liền khối hỗ trợ đổi biến thể tức thì.',
  },
  card: {
    title: 'Surface Elevation & Shadow Layering',
    type: 'Bề mặt Phẳng / Kính',
    mechanism: 'GPU Layer Compositing',
    parameters: 'multi-layer shadow / border',
    description: 'Thẻ chứa nội dung với bóng đổ và viền phản quang tính toán trực tiếp trên GPU.',
  },
  badge: {
    title: 'Status Badge Render',
    type: 'Chỉ số Tinh gọn',
    mechanism: 'Zero-latency GPU Pill',
    parameters: 'solid / tonal border',
    description: 'Huy hiệu trạng thái hiển thị rõ nét không chiếm dụng CPU.',
  },
  switch: {
    title: 'Thumb Slide Switch Flow',
    type: 'Gạt Lò xo Công tắc',
    mechanism: 'Native Switch Track',
    parameters: 'smooth thumb transition',
    description: 'Công tắc trượt mượt mà đồng bộ cùng phản hồi rung xúc giác.',
  },
  checkbox: {
    title: 'Checkbox Checkmark Toggle',
    type: 'Đánh dấu Tức thì',
    mechanism: 'GPU Opacity & Scale',
    parameters: 'instant 0ms feedback',
    description: 'Ô chọn đánh dấu phản hồi xúc giác và hiển thị dấu tích chuẩn xác.',
  },
  avatar: {
    title: 'Avatar Ring & Status Dot',
    type: 'Hình ảnh Đại diện',
    mechanism: 'Rounded Masking',
    parameters: 'anti-aliased squircle',
    description: 'Khung ảnh đại diện bo tròn mượt mà kèm chấm trạng thái hoạt động.',
  },
  divider: {
    title: 'Divider Line Composite',
    type: 'Đường phân cách',
    mechanism: '1px Hairline Sub-pixel',
    parameters: 'hairlineWidth crisp render',
    description: 'Đường kẻ phân cách nét căng không bị mờ nhòe điểm ảnh.',
  },
  pagination: {
    title: 'Dot Active Morphing',
    type: 'Chấm chuyển trang',
    mechanism: 'Width & Opacity Interpolation',
    parameters: 'smooth active pill expansion',
    description: 'Chấm trang thái đổi độ dài thành viên thuốc khi trượt trang.',
  },
  radio: {
    title: 'Radio Selection Ripple',
    type: 'Nút chọn đơn',
    mechanism: 'Inner Dot Transition',
    parameters: 'instant selection feedback',
    description: 'Vòng tròn chọn đơn với phản hồi haptics chuẩn xác.',
  },
  otp: {
    title: 'OTP Focused Cell Wave',
    type: 'Ô nhập mã xác thực',
    mechanism: 'Active Cell Highlight',
    parameters: 'auto-advance haptic jump',
    description: 'Tự động nhảy ô kế tiếp với phản hồi rung nhẹ.',
  },
  rating: {
    title: 'Star Rating Tactile Pop',
    type: 'Đánh giá sao',
    mechanism: 'Scale Bounce on Tap',
    parameters: 'haptics.selection feedback',
    description: 'Ngôi sao bừng sáng khi người dùng chạm vuốt điểm đánh giá.',
  },
  'list-item': {
    title: 'List Item Highlight Flow',
    type: 'Hàng danh sách',
    mechanism: 'Opacity Highlight on Press',
    parameters: 'activeOpacity: 0.7',
    description: 'Hàng danh sách đổi màu mờ nhẹ báo hiệu phản hồi chạm.',
  },
  'widget-card': {
    title: 'Widget Refresh Spin & Scale',
    type: 'Thẻ điều khiển',
    mechanism: 'Refresh Spinner Animation',
    parameters: 'smooth rotate & haptics',
    description: 'Thẻ tiện ích hỗ trợ nút làm mới xoay vòng và phản hồi rung khi cập nhật.',
  },
  'gesture-card': {
    title: 'Multi-touch Gesture Response',
    type: 'Bàn di cảm ứng',
    mechanism: 'Swipe / Double Tap Detect',
    parameters: 'real-time gesture velocity',
    description: 'Nhận diện cử chỉ vuốt đa hướng và chạm đúp với phản hồi tức thì.',
  },
  'offline-banner': {
    title: 'Offline Banner Slide Down',
    type: 'Thanh cảnh báo mạng',
    mechanism: 'Top Slide In / Out',
    parameters: 'duration: 200ms',
    description: 'Thanh thông báo mất mạng trượt xuống nhẹ nhàng và thu gọn khi kết nối lại.',
  },
  'empty-state': {
    title: 'Empty State Illustrations',
    type: 'Trạng thái trống',
    mechanism: 'Static GPU Canvas',
    parameters: 'vector icon render',
    description: 'Khung trạng thái trống tối ưu không tiêu tốn tài nguyên chuyển động.',
  },
};

export const ComponentMotionInspector: React.FC<ComponentMotionInspectorProps> = ({
  componentId,
  themeColors,
  radiusTokens,
  isDark,
  onTriggerAction,
}) => {
  const { reduceMotion, setReduceMotion, hapticsEnabled } = useThemeMode();
  const profile = MOTION_PROFILES[componentId] || MOTION_PROFILES.button;

  const styles = StyleSheet.create({
    card: {
      padding: 16,
      gap: 12,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(99, 102, 241, 0.35)' : 'rgba(99, 102, 241, 0.2)',
      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.05)' : 'rgba(99, 102, 241, 0.02)',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      flex: 1,
    },
    headerTitle: {
      fontSize: 12,
      fontWeight: '800',
      letterSpacing: 0.6,
      textTransform: 'uppercase',
      color: '#6366F1',
    },
    gpuBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4.5,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: radiusTokens.pill,
      backgroundColor: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.12)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.25)',
      flexShrink: 0,
    },
    gpuBadgeText: {
      fontSize: 10,
      fontWeight: '700',
      color: '#10B981',
    },
    summaryBox: {
      gap: 4,
    },
    profileTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: themeColors.text,
    },
    profileDesc: {
      fontSize: 12.5,
      lineHeight: 17,
      color: themeColors.textSecondary,
    },
    metricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginVertical: 2,
    },
    metricTile: {
      flex: 1,
      minWidth: 140,
      padding: 9,
      borderRadius: radiusTokens.control,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
      gap: 2,
    },
    metricLabel: {
      fontSize: 9.5,
      fontWeight: '700',
      color: themeColors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
    metricValue: {
      fontSize: 11.5,
      fontWeight: '700',
      color: themeColors.text,
      fontFamily: 'monospace',
    },
    metricGreenValue: {
      fontSize: 11.5,
      fontWeight: '700',
      color: '#10B981',
      fontFamily: 'monospace',
    },
    metricPurpleValue: {
      fontSize: 11.5,
      fontWeight: '700',
      color: '#6366F1',
      fontFamily: 'monospace',
    },
    actionsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap',
      paddingTop: 4,
    },
    testBtnWrapper: {
      flex: 1,
      minWidth: 160,
    },
    toggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: radiusTokens.control,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
    },
    toggleLabelCol: {
      flex: 1,
      paddingRight: 10,
      gap: 1,
    },
    toggleTitle: {
      fontSize: 12.5,
      fontWeight: '600',
      color: themeColors.text,
    },
    toggleSub: {
      fontSize: 11,
      color: themeColors.textSecondary,
    },
  });

  return (
    <AppCard style={styles.card}>
      {/* 1. Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Zap size={14} color="#6366F1" strokeWidth={2.4} />
          <AppText style={styles.headerTitle}>KIỂM THỬ HOẠT ẢNH & CHUYỂN ĐỘNG</AppText>
        </View>
        <View style={styles.gpuBadge}>
          <Cpu size={11} color="#10B981" strokeWidth={2.4} />
          <AppText style={styles.gpuBadgeText}>100% GPU NATIVE</AppText>
        </View>
      </View>

      {/* 2. Mechanism Summary */}
      <View style={styles.summaryBox}>
        <AppText style={styles.profileTitle}>{profile.title}</AppText>
        <AppText style={styles.profileDesc}>{profile.description}</AppText>
      </View>

      {/* 3. Metrics Matrix */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricTile}>
          <AppText style={styles.metricLabel}>Cơ chế</AppText>
          <AppText style={styles.metricValue} numberOfLines={1}>{profile.type}</AppText>
        </View>
        <View style={styles.metricTile}>
          <AppText style={styles.metricLabel}>Thông số vật lý</AppText>
          <AppText style={styles.metricValue} numberOfLines={1}>{profile.parameters}</AppText>
        </View>
        <View style={styles.metricTile}>
          <AppText style={styles.metricLabel}>Luồng xử lý</AppText>
          <AppText style={styles.metricGreenValue}>Native C++ (0 Bridge)</AppText>
        </View>
        <View style={styles.metricTile}>
          <AppText style={styles.metricLabel}>Tần số quét</AppText>
          <AppText style={styles.metricPurpleValue}>60 / 120 FPS</AppText>
        </View>
      </View>

      {/* 4. Interactive Trigger Button */}
      {profile.actionLabel && (
        <View style={styles.actionsRow}>
          <View style={styles.testBtnWrapper}>
            <AppButton
              title={profile.actionLabel}
              variant="tonal"
              size="sm"
              leftIcon={<Play size={13} color={themeColors.primary} strokeWidth={2.2} />}
              onPress={() => {
                haptics.light();
                if (profile.actionId && onTriggerAction) {
                  onTriggerAction(profile.actionId);
                }
              }}
            />
          </View>
        </View>
      )}

      {/* 5. Live Accessibility Reduce Motion Toggle */}
      <View style={styles.toggleRow}>
        <View style={styles.toggleLabelCol}>
          <AppText style={styles.toggleTitle}>Giảm Chuyển Động (Reduce Motion)</AppText>
          <AppText style={styles.toggleSub}>
            {reduceMotion ? 'BẬT: Hoạt cảnh nhảy 0ms không co giãn' : 'TẮT: Hoạt ảnh lò xo GPU đầy đủ'}
          </AppText>
        </View>
        <AppSwitch
          value={reduceMotion}
          onValueChange={(val) => {
            setReduceMotion(val);
            if (hapticsEnabled) haptics.light();
          }}
        />
      </View>
    </AppCard>
  );
};
