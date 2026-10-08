import React, { useState } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Zap,
  Activity,
  Cpu,
  RotateCcw,
  Sparkles,
  Layers,
  MessageSquare,
  Bell,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  Sliders,
  Play,
  Palette,
} from 'lucide-react-native';
import {
  AppText,
  AppCard,
  AppButton,
  AppSwitch,
  AppSegmentedControl,
  AppChip,
  Skeleton,
  AppAccordion,
  AppProgressBar,
  ConfirmDialog,
  AppToast,
  AppleGlassCard,
  GlassTile,
  AppActionSheet,
  AppBottomSheet,
  type ToastType,
} from '@/components';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { ThemeColors } from '@/constants/colors';
import type { RadiusPresetConfig } from '@/constants/theme';
import { haptics } from '@/utils';

interface MotionLabViewProps {
  themeColors: ThemeColors;
  radiusTokens: RadiusPresetConfig;
  isDark: boolean;
}

const createStyles = (
  themeColors: ThemeColors,
  radiusTokens: RadiusPresetConfig,
  isDark: boolean
) =>
  StyleSheet.create({
    container: {
      gap: 16,
      paddingBottom: 40,
    },
    heroCard: {
      padding: 16,
      gap: 12,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(99, 102, 241, 0.35)' : 'rgba(99, 102, 241, 0.2)',
      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.04)',
    },
    heroHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    heroTag: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.15)',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: radiusTokens.pill,
      flexShrink: 0,
    },
    heroTagText: {
      fontSize: 11,
      fontWeight: '700',
      color: '#6366F1',
      letterSpacing: 0.5,
    },
    gpuBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.12)',
      paddingHorizontal: 9,
      paddingVertical: 4,
      borderRadius: radiusTokens.pill,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.25)',
      flexShrink: 0,
    },
    gpuBadgeText: {
      fontSize: 10.5,
      fontWeight: '700',
      color: '#10B981',
    },
    heroTitle: {
      fontSize: 18,
      fontWeight: '700',
      letterSpacing: -0.2,
    },
    heroDesc: {
      fontSize: 13,
      lineHeight: 18,
    },
    controlCard: {
      padding: 14,
      gap: 12,
    },
    controlRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    controlLabelCol: {
      flex: 1,
      paddingRight: 12,
      gap: 2,
    },
    controlTitle: {
      fontSize: 14,
      fontWeight: '600',
    },
    controlDesc: {
      fontSize: 12,
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: themeColors.border,
      marginVertical: 4,
    },
    demoCard: {
      padding: 16,
      gap: 14,
    },
    demoHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    demoTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      flex: 1,
    },
    demoTitle: {
      fontSize: 14,
      fontWeight: '700',
      flexShrink: 1,
    },
    demoSpecBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4.5,
      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.18)' : 'rgba(99, 102, 241, 0.1)',
      paddingHorizontal: 8,
      paddingVertical: 3.5,
      borderRadius: radiusTokens.pill,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(99, 102, 241, 0.35)' : 'rgba(99, 102, 241, 0.2)',
      flexShrink: 0,
      alignSelf: 'center',
    },
    demoSpecText: {
      fontSize: 10.5,
      fontWeight: '700',
      color: '#6366F1',
    },
    demoDesc: {
      fontSize: 12.5,
      lineHeight: 17,
    },
    segmentInfoBox: {
      padding: 12,
      borderRadius: radiusTokens.control,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
    },
    segmentInfoRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
    },
    segmentInfoText: {
      fontSize: 12,
      lineHeight: 17,
      flex: 1,
    },
    segmentBold: {
      fontWeight: '700',
    },
    segmentGreenBold: {
      fontWeight: '700',
      color: '#10B981',
    },
    segmentPinkBold: {
      fontWeight: '700',
      color: '#EC4899',
    },
    grid2Col: {
      flexDirection: 'row',
      gap: 10,
      flexWrap: 'wrap',
    },
    btnWrapper: {
      flex: 1,
      minWidth: 140,
    },
    chipsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    selectedChipsBox: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 6,
      paddingTop: 4,
    },
    selectedChipsLabel: {
      fontSize: 12,
      fontWeight: '600',
    },
    activePillBadge: {
      paddingHorizontal: 7,
      paddingVertical: 2,
      borderRadius: radiusTokens.pill,
      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.12)',
    },
    activePillText: {
      fontSize: 10,
      fontWeight: '700',
      color: '#6366F1',
    },
    progressControls: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    toastBtnRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    specsTable: {
      gap: 8,
    },
    specRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 7,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: themeColors.border,
      gap: 10,
    },
    specName: {
      fontSize: 12,
      fontWeight: '600',
      flex: 1,
    },
    specVal: {
      fontSize: 11,
      fontFamily: 'monospace',
      color: themeColors.textSecondary,
      textAlign: 'right',
    },
    skeletonBox: {
      gap: 10,
    },
    skeletonHeaderRow: {
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
    },
    skeletonTextCol: {
      flex: 1,
      gap: 6,
    },
    loadedBox: {
      gap: 4,
      padding: 12,
      borderRadius: radiusTokens.control,
      backgroundColor: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.05)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.15)',
    },
    loadedTitle: {
      fontWeight: '700',
      fontSize: 13.5,
      color: '#10B981',
    },
    loadedDesc: {
      fontSize: 12.5,
      color: themeColors.textSecondary,
    },
    accordionDesc: {
      fontSize: 13,
      color: themeColors.textSecondary,
      lineHeight: 18,
    },
    sheetContentBox: {
      gap: 12,
      paddingVertical: 10,
    },
    sheetDesc: {
      fontSize: 13,
      color: themeColors.textSecondary,
      lineHeight: 18,
    },
  });

export const MotionLabView: React.FC<MotionLabViewProps> = React.memo(({
  themeColors,
  radiusTokens,
  isDark,
}) => {
  const { reduceMotion, setReduceMotion, hapticsEnabled, setHapticsEnabled } = useThemeMode();

  // Demo 1: Segmented Control State
  const [activeSegment, setActiveSegment] = useState<'overview' | 'perf' | 'style'>('overview');

  // Demo 4: Confirm Dialog State
  const [dialogVisible, setDialogVisible] = useState(false);

  // Demo 5: Skeleton Pulse State
  const [showSkeleton, setShowSkeleton] = useState(true);

  // Demo 6: Accordion State
  const [accordionOpen, setAccordionOpen] = useState(false);

  // Demo 7: Progress Bar State
  const [progressVal, setProgressVal] = useState(65);

  // Demo 8: Toast State
  const [toastVisible, setToastVisible] = useState(false);
  const [toastType, setToastType] = useState<ToastType>('success');
  const [toastMessage, setToastMessage] = useState('Thao tác hoàn tất thành công!');

  // Demo 9: Sheets State
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  // Demo 10: Selected Chips State
  const [selectedChips, setSelectedChips] = useState<string[]>(['spring', 'gpu']);

  const toggleChip = React.useCallback((id: string) => {
    haptics.light();
    setSelectedChips((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }, []);

  const triggerToast = React.useCallback((type: ToastType, msg: string) => {
    setToastType(type);
    setToastMessage(msg);
    setToastVisible(true);
  }, []);

  const runProgressSimulation = React.useCallback(() => {
    haptics.light();
    setProgressVal(10);
    setTimeout(() => setProgressVal(45), 300);
    setTimeout(() => setProgressVal(80), 600);
    setTimeout(() => setProgressVal(100), 900);
  }, []);

  const styles = React.useMemo(
    () => createStyles(themeColors, radiusTokens, isDark),
    [themeColors, radiusTokens, isDark]
  );

  return (
    <View style={styles.container}>
      {/* 1. HERO BANNER */}
      <AppCard style={styles.heroCard}>
        <View style={styles.heroHeaderRow}>
          <View style={styles.heroTag}>
            <Zap size={12} color="#6366F1" strokeWidth={2.6} />
            <AppText style={styles.heroTagText}>MOTION & ANIMATION LAB</AppText>
          </View>
          <View style={styles.gpuBadge}>
            <Cpu size={11} color="#10B981" strokeWidth={2.4} />
            <AppText style={styles.gpuBadgeText}>GPU 60/120 FPS</AppText>
          </View>
        </View>

        <AppText style={[styles.heroTitle, { color: themeColors.text }]}>
          Phòng Thí Nghiệm Chuyển Động & Hiệu Ứng
        </AppText>
        <AppText style={[styles.heroDesc, { color: themeColors.textSecondary }]}>
          Trực quan hóa và thử nghiệm toàn bộ hệ thống chuyển động vi mô (Micro-interactions, Spring Physics, Elastic Scale, Matrix Rotation) với hỗ trợ kiểm tra trực tiếp khả năng Giảm Chuyển Động (Reduce Motion).
        </AppText>
      </AppCard>

      {/* 2. LIVE CONTROLS PANEL */}
      <AppCard style={styles.controlCard}>
        <View style={styles.controlRow}>
          <View style={styles.controlLabelCol}>
            <AppText style={[styles.controlTitle, { color: themeColors.text }]}>
              Giảm Chuyển Động (Reduce Motion)
            </AppText>
            <AppText style={[styles.controlDesc, { color: themeColors.textSecondary }]}>
              {reduceMotion ? 'ĐANG BẬT: Toàn bộ animation nhảy tức thì (0ms)' : 'ĐANG TẮT: Hoạt cảnh GPU đàn hồi vật lý đầy đủ'}
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

        <View style={styles.divider} />

        <View style={styles.controlRow}>
          <View style={styles.controlLabelCol}>
            <AppText style={[styles.controlTitle, { color: themeColors.text }]}>
              Rung Phản Hồi Xúc Giác (Haptics)
            </AppText>
            <AppText style={[styles.controlDesc, { color: themeColors.textSecondary }]}>
              Rung nhẹ khi chạm nút bấm, đổi tab và mở cửa sổ
            </AppText>
          </View>
          <AppSwitch
            value={hapticsEnabled}
            onValueChange={(val) => {
              setHapticsEnabled(val);
              if (val) haptics.success();
            }}
          />
        </View>
      </AppCard>

      {/* 3. DEMO 1: SEGMENTED CONTROL SPRING */}
      <AppCard style={styles.demoCard}>
        <View style={styles.demoHeader}>
          <View style={styles.demoTitleRow}>
            <Sliders size={16} color="#6366F1" strokeWidth={2.4} />
            <AppText style={[styles.demoTitle, { color: themeColors.text }]}>
              1. AppSegmentedControl
            </AppText>
          </View>
          <View style={styles.demoSpecBadge}>
            <Zap size={11} color="#6366F1" strokeWidth={2.4} />
            <AppText style={styles.demoSpecText}>Spring GPU</AppText>
          </View>
        </View>

        <AppText style={[styles.demoDesc, { color: themeColors.textSecondary }]}>
          Con trỏ viên thuốc trượt bằng vật lý lò xo GPU trên C++ Native Thread. Chạm các tab để kiểm tra độ nhạy:
        </AppText>

        <AppSegmentedControl<any>
          options={[
            {
              label: 'Tổng quan',
              value: 'overview',
              icon: <Layers size={14} color={activeSegment === 'overview' ? themeColors.primary : themeColors.textSecondary} />,
            },
            {
              label: 'Hiệu năng',
              value: 'perf',
              icon: <Zap size={14} color={activeSegment === 'perf' ? themeColors.primary : themeColors.textSecondary} />,
            },
            {
              label: 'Giao diện',
              value: 'style',
              icon: <Palette size={14} color={activeSegment === 'style' ? themeColors.primary : themeColors.textSecondary} />,
            },
          ]}
          value={activeSegment}
          onChange={(val) => {
            haptics.light();
            setActiveSegment(val);
          }}
          size="md"
        />

        <View style={styles.segmentInfoBox}>
          {activeSegment === 'overview' && (
            <View style={styles.segmentInfoRow}>
              <Sparkles size={14} color="#6366F1" />
              <AppText style={[styles.segmentInfoText, { color: themeColors.textSecondary }]}>
                <AppText style={[styles.segmentBold, { color: themeColors.text }]}>Vật Lý Lò Xo GPU: </AppText>
                Con trỏ tính toán tọa độ translateX bằng lò xo Native (k:280, d:24, m:0.65) với 0 độ trễ.
              </AppText>
            </View>
          )}
          {activeSegment === 'perf' && (
            <View style={styles.segmentInfoRow}>
              <Zap size={14} color="#10B981" />
              <AppText style={[styles.segmentInfoText, { color: themeColors.textSecondary }]}>
                <AppText style={styles.segmentGreenBold}>Hiệu Năng Tuyệt Đối: </AppText>
                60/120 FPS ProMotion, 0 frame drop, 0 bridge crossing trên luồng C++.
              </AppText>
            </View>
          )}
          {activeSegment === 'style' && (
            <View style={styles.segmentInfoRow}>
              <Activity size={14} color="#EC4899" />
              <AppText style={[styles.segmentInfoText, { color: themeColors.textSecondary }]}>
                <AppText style={styles.segmentPinkBold}>Xúc Giác & Thẩm Mỹ: </AppText>
                Phản hồi rung haptic đồng bộ chính xác theo từng nhịp chạm chuyển tab.
              </AppText>
            </View>
          )}
        </View>
      </AppCard>

      {/* 4. DEMO 2: ELASTIC BUTTONS & CHIPS */}
      <AppCard style={styles.demoCard}>
        <View style={styles.demoHeader}>
          <View style={styles.demoTitleRow}>
            <Sparkles size={16} color="#6366F1" strokeWidth={2.4} />
            <AppText style={[styles.demoTitle, { color: themeColors.text }]}>
              2. AppButton & AppChip
            </AppText>
          </View>
          <View style={styles.demoSpecBadge}>
            <Activity size={11} color="#6366F1" strokeWidth={2.4} />
            <AppText style={styles.demoSpecText}>Elastic Scale</AppText>
          </View>
        </View>

        <AppText style={[styles.demoDesc, { color: themeColors.textSecondary }]}>
          Chạm và giữ các nút bấm hoặc thẻ lọc bên dưới để cảm nhận hiệu ứng lò xo co giãn phản hồi tức thì:
        </AppText>

        <View style={styles.grid2Col}>
          <View style={styles.btnWrapper}>
            <AppButton
              title="Primary Spring"
              variant="primary"
              size="md"
              leftIcon={<Zap size={16} color="#FFFFFF" />}
              onPress={() => haptics.light()}
            />
          </View>
          <View style={styles.btnWrapper}>
            <AppButton
              title="Tonal Elastic"
              variant="tonal"
              size="md"
              leftIcon={<Activity size={16} color={themeColors.primary} />}
              onPress={() => haptics.light()}
            />
          </View>
          <View style={styles.btnWrapper}>
            <AppButton
              title="Glass Bounce"
              variant="glass"
              size="md"
              leftIcon={<Sparkles size={16} color={themeColors.text} />}
              onPress={() => haptics.light()}
            />
          </View>
          <View style={styles.btnWrapper}>
            <AppButton
              title="Danger Pop"
              variant="danger"
              size="md"
              leftIcon={<AlertCircle size={16} color="#FFFFFF" />}
              onPress={() => haptics.warning()}
            />
          </View>
        </View>

        <View style={styles.chipsContainer}>
          <AppChip
            label="GPU Accelerated"
            icon={<Cpu size={13.5} color={selectedChips.includes('gpu') ? themeColors.primary : themeColors.textSecondary} />}
            selected={selectedChips.includes('gpu')}
            onPress={() => toggleChip('gpu')}
          />
          <AppChip
            label="Native Spring"
            icon={<Zap size={13.5} color={selectedChips.includes('spring') ? themeColors.primary : themeColors.textSecondary} />}
            selected={selectedChips.includes('spring')}
            onPress={() => toggleChip('spring')}
          />
          <AppChip
            label="60/120 FPS"
            icon={<Activity size={13.5} color={selectedChips.includes('fps') ? themeColors.primary : themeColors.textSecondary} />}
            selected={selectedChips.includes('fps')}
            onPress={() => toggleChip('fps')}
          />
          <AppChip
            label="Reduce Motion"
            icon={<ShieldCheck size={13.5} color={selectedChips.includes('reduce') ? themeColors.primary : themeColors.textSecondary} />}
            selected={selectedChips.includes('reduce')}
            onPress={() => toggleChip('reduce')}
          />
        </View>

        <View style={styles.selectedChipsBox}>
          <AppText style={[styles.selectedChipsLabel, { color: themeColors.textSecondary }]}>
            Đang chọn ({selectedChips.length}):
          </AppText>
          {selectedChips.map((chipId) => (
            <View key={chipId} style={styles.activePillBadge}>
              <AppText style={styles.activePillText}>{chipId.toUpperCase()}</AppText>
            </View>
          ))}
        </View>
      </AppCard>

      {/* 5. DEMO 3: APPLE GLASS CARD & TILE SPRING */}
      <AppCard style={styles.demoCard}>
        <View style={styles.demoHeader}>
          <View style={styles.demoTitleRow}>
            <Layers size={16} color="#6366F1" strokeWidth={2.4} />
            <AppText style={[styles.demoTitle, { color: themeColors.text }]}>
              3. AppleGlassCard & GlassTile
            </AppText>
          </View>
          <View style={styles.demoSpecBadge}>
            <Sparkles size={11} color="#6366F1" strokeWidth={2.4} />
            <AppText style={styles.demoSpecText}>Fluid Tactile</AppText>
          </View>
        </View>

        <AppText style={[styles.demoDesc, { color: themeColors.textSecondary }]}>
          Chạm vào thẻ tín dụng Apple Glass hoặc ô GlassTile để kiểm tra độ lún và phản xạ quang học:
        </AppText>

        <AppleGlassCard
          balance="$28,450.80"
          balanceLabel="Số Dư Đàn Hồi GPU"
          cardNumber="•••• •••• •••• 8866"
          cardHolder="MOTION DESIGNER"
          brandName="Apple Glass Motion"
          onPress={() => haptics.success()}
        />

        <View style={styles.grid2Col}>
          <GlassTile
            icon={Zap}
            iconColor="#6366F1"
            value="120 FPS"
            label="Tốc Độ Khung Hình"
            onPress={() => haptics.light()}
          />
          <GlassTile
            icon={ShieldCheck}
            iconColor="#10B981"
            value="0 Bridge"
            label="Native C++ Thread"
            onPress={() => haptics.light()}
          />
        </View>
      </AppCard>

      {/* 6. DEMO 4: CONFIRM DIALOG SPRING POP */}
      <AppCard style={styles.demoCard}>
        <View style={styles.demoHeader}>
          <View style={styles.demoTitleRow}>
            <MessageSquare size={16} color="#6366F1" strokeWidth={2.4} />
            <AppText style={[styles.demoTitle, { color: themeColors.text }]}>
              4. ConfirmDialog Spring Pop
            </AppText>
          </View>
          <View style={styles.demoSpecBadge}>
            <MessageSquare size={11} color="#6366F1" strokeWidth={2.4} />
            <AppText style={styles.demoSpecText}>Pop Scale</AppText>
          </View>
        </View>

        <AppText style={[styles.demoDesc, { color: themeColors.textSecondary }]}>
          Hộp thoại xác nhận mở ra với hiệu ứng lò xo bật nảy từ tâm màn hình:
        </AppText>

        <AppButton
          title="Mở Confirm Dialog (Thử Spring Pop)"
          variant="tonal"
          size="md"
          leftIcon={<Play size={16} color={themeColors.primary} />}
          onPress={() => setDialogVisible(true)}
        />

        <ConfirmDialog
          visible={dialogVisible}
          title="Xác Nhận Kích Hoạt Chế Độ Tối Ưu"
          message="Toàn bộ hoạt ảnh hệ thống đang vận hành hoàn toàn trên bộ xử lý đồ họa Native GPU Driver."
          confirmText="Xác nhận"
          cancelText="Đóng"
          onConfirm={() => {
            haptics.success();
            setDialogVisible(false);
          }}
          onCancel={() => setDialogVisible(false)}
        />
      </AppCard>

      {/* 7. DEMO 5: SKELETON PULSE WAVE */}
      <AppCard style={styles.demoCard}>
        <View style={styles.demoHeader}>
          <View style={styles.demoTitleRow}>
            <Activity size={16} color="#6366F1" strokeWidth={2.4} />
            <AppText style={[styles.demoTitle, { color: themeColors.text }]}>
              5. Skeleton Pulse Shimmer
            </AppText>
          </View>
          <View style={styles.demoSpecBadge}>
            <Activity size={11} color="#6366F1" strokeWidth={2.4} />
            <AppText style={styles.demoSpecText}>Pulse Wave</AppText>
          </View>
        </View>

        <AppText style={[styles.demoDesc, { color: themeColors.textSecondary }]}>
          Vòng lặp sóng mờ tự động dừng (freeze) khi bật Reduce Motion để tiết kiệm pin:
        </AppText>

        {showSkeleton ? (
          <View style={styles.skeletonBox}>
            <View style={styles.skeletonHeaderRow}>
              <Skeleton variant="circular" width={44} height={44} />
              <View style={styles.skeletonTextCol}>
                <Skeleton width="70%" height={14} />
                <Skeleton width="45%" height={11} />
              </View>
            </View>
            <Skeleton width="100%" height={24} />
          </View>
        ) : (
          <View style={styles.loadedBox}>
            <AppText style={styles.loadedTitle}>Dữ liệu đã tải hoàn tất!</AppText>
            <AppText style={styles.loadedDesc}>
              Nội dung thay thế placeholder không gây giật màn hình.
            </AppText>
          </View>
        )}

        <AppButton
          title={showSkeleton ? 'Hiện nội dung thật' : 'Xem lại Skeleton Shimmer'}
          variant="outline"
          size="sm"
          onPress={() => setShowSkeleton(!showSkeleton)}
        />
      </AppCard>

      {/* 8. DEMO 6: ACCORDION 180° MATRIX ROTATION */}
      <AppCard style={styles.demoCard}>
        <View style={styles.demoHeader}>
          <View style={styles.demoTitleRow}>
            <ChevronDown size={16} color="#6366F1" strokeWidth={2.4} />
            <AppText style={[styles.demoTitle, { color: themeColors.text }]}>
              6. AppAccordion
            </AppText>
          </View>
          <View style={styles.demoSpecBadge}>
            <ChevronDown size={11} color="#6366F1" strokeWidth={2.4} />
            <AppText style={styles.demoSpecText}>Matrix 180°</AppText>
          </View>
        </View>

        <AppAccordion
          title="Hiệu ứng xoay biểu tượng mũi tên 180 độ"
          subtitle="Chạm để mở rộng và quan sát chuyển động mượt mà"
          expanded={accordionOpen}
          onToggle={() => setAccordionOpen(!accordionOpen)}
        >
          <AppText style={styles.accordionDesc}>
            Icon Chevron được nội suy góc quay Matrix Transform từ 0° đến 180° trực tiếp trên Native Driver, không chiếm dụng tài nguyên JavaScript.
          </AppText>
        </AppAccordion>
      </AppCard>

      {/* 9. DEMO 7: PROGRESS BAR SMOOTH FLOW */}
      <AppCard style={styles.demoCard}>
        <View style={styles.demoHeader}>
          <View style={styles.demoTitleRow}>
            <Activity size={16} color="#6366F1" strokeWidth={2.4} />
            <AppText style={[styles.demoTitle, { color: themeColors.text }]}>
              7. AppProgressBar
            </AppText>
          </View>
          <View style={styles.demoSpecBadge}>
            <Sliders size={11} color="#6366F1" strokeWidth={2.4} />
            <AppText style={styles.demoSpecText}>{progressVal}% Smooth</AppText>
          </View>
        </View>

        <AppProgressBar progress={progressVal} size="md" color="#6366F1" />

        <View style={styles.progressControls}>
          <AppSegmentedControl<number>
            options={[
              { label: '0%', value: 0 },
              { label: '35%', value: 35 },
              { label: '65%', value: 65 },
              { label: '100%', value: 100 },
            ]}
            value={progressVal}
            onChange={(val) => {
              haptics.light();
              setProgressVal(val);
            }}
            size="sm"
          />
          <AppButton
            title="Chạy 0-100%"
            variant="tonal"
            size="sm"
            leftIcon={<RotateCcw size={13} color={themeColors.primary} />}
            onPress={runProgressSimulation}
          />
        </View>
      </AppCard>

      {/* 10. DEMO 8: TOAST SLIDING SPRING */}
      <AppCard style={styles.demoCard}>
        <View style={styles.demoHeader}>
          <View style={styles.demoTitleRow}>
            <Bell size={16} color="#6366F1" strokeWidth={2.4} />
            <AppText style={[styles.demoTitle, { color: themeColors.text }]}>
              8. Floating AppToast
            </AppText>
          </View>
          <View style={styles.demoSpecBadge}>
            <Bell size={11} color="#6366F1" strokeWidth={2.4} />
            <AppText style={styles.demoSpecText}>Slide Down</AppText>
          </View>
        </View>

        <AppText style={[styles.demoDesc, { color: themeColors.textSecondary }]}>
          Trượt thông báo từ trên xuống với gia tốc tự nhiên và tự động ẩn:
        </AppText>

        <View style={styles.toastBtnRow}>
          <AppButton
            title="Success Toast"
            variant="primary"
            size="sm"
            leftIcon={<CheckCircle2 size={14} color="#FFFFFF" />}
            onPress={() => triggerToast('success', 'Đã lưu cấu hình hoạt cảnh!')}
          />
          <AppButton
            title="Warning Toast"
            variant="tonal"
            size="sm"
            leftIcon={<AlertTriangle size={14} color={themeColors.primary} />}
            onPress={() => triggerToast('warning', 'Tốc độ khung hình đạt đỉnh 120 FPS.')}
          />
          <AppButton
            title="Error Toast"
            variant="danger"
            size="sm"
            leftIcon={<AlertCircle size={14} color="#FFFFFF" />}
            onPress={() => triggerToast('error', 'Có lỗi kết nối mạng tạm thời.')}
          />
          <AppButton
            title="Info Toast"
            variant="outline"
            size="sm"
            leftIcon={<Info size={14} color={themeColors.primary} />}
            onPress={() => triggerToast('info', 'Chế độ Reduce Motion đang sẵn sàng.')}
          />
        </View>

        <AppToast
          visible={toastVisible}
          type={toastType}
          title={toastType.toUpperCase()}
          message={toastMessage}
          onDismiss={() => setToastVisible(false)}
        />
      </AppCard>

      {/* 11. DEMO 9: MODAL & SHEET TRANSITIONS */}
      <AppCard style={styles.demoCard}>
        <View style={styles.demoHeader}>
          <View style={styles.demoTitleRow}>
            <Layers size={16} color="#6366F1" strokeWidth={2.4} />
            <AppText style={[styles.demoTitle, { color: themeColors.text }]}>
              9. ActionSheet & BottomSheet
            </AppText>
          </View>
          <View style={styles.demoSpecBadge}>
            <Layers size={11} color="#6366F1" strokeWidth={2.4} />
            <AppText style={styles.demoSpecText}>Native Sheet</AppText>
          </View>
        </View>

        <View style={styles.grid2Col}>
          <View style={styles.btnWrapper}>
            <AppButton
              title="Mở ActionSheet (Fade)"
              variant="tonal"
              size="md"
              onPress={() => setActionSheetVisible(true)}
            />
          </View>
          <View style={styles.btnWrapper}>
            <AppButton
              title="Mở BottomSheet (Slide)"
              variant="outline"
              size="md"
              onPress={() => setBottomSheetVisible(true)}
            />
          </View>
        </View>

        <AppActionSheet
          visible={actionSheetVisible}
          onClose={() => setActionSheetVisible(false)}
          title="Tùy Chọn Chuyển Động"
          message="Chọn một hành động để kiểm tra animation trượt đóng mở mượt mà:"
          actions={[
            {
              id: '1',
              label: 'Kiểm tra tốc độ 60 FPS',
              description: 'Chạy thử nghiệm mượt mà không rớt khung hình',
              icon: <Zap size={16} color={themeColors.primary} />,
              onPress: () => triggerToast('success', '60 FPS đạt chuẩn mượt mà!'),
            },
            {
              id: '2',
              label: 'Kiểm tra tốc độ 120 FPS ProMotion',
              description: 'Tận dụng tần số quét cao trên màn hình iOS / flagship Android',
              icon: <Activity size={16} color="#10B981" />,
              onPress: () => triggerToast('success', '120 FPS ProMotion hoạt động hoàn hảo!'),
            },
            {
              id: '3',
              label: 'Xóa toàn bộ bộ nhớ đệm hoạt cảnh',
              destructive: true,
              icon: <AlertCircle size={16} color="#EF4444" />,
              onPress: () => triggerToast('warning', 'Đã làm mới bộ nhớ đệm.'),
            },
          ]}
        />

        <AppBottomSheet
          visible={bottomSheetVisible}
          onClose={() => setBottomSheetVisible(false)}
          title="Sân Khấu Bottom Sheet Chuẩn iOS"
          subtitle="Vuốt thanh Drag Handle để đóng hoặc chạm nền mờ"
          size="md"
        >
          <View style={styles.sheetContentBox}>
            <AppText style={styles.sheetDesc}>
              Khung trượt BottomSheet hỗ trợ làm mờ nền bằng BlurView (iOS) và nền mờ bán trong suốt (Android), tự động tắt chuyển động khi bật Reduce Motion.
            </AppText>
            <AppButton
              title="Đóng Bottom Sheet"
              variant="primary"
              size="md"
              onPress={() => setBottomSheetVisible(false)}
            />
          </View>
        </AppBottomSheet>
      </AppCard>

      {/* 12. TECHNICAL MOTION MATRIX TABLE */}
      <AppCard style={styles.demoCard}>
        <View style={styles.demoHeader}>
          <View style={styles.demoTitleRow}>
            <Cpu size={16} color="#6366F1" strokeWidth={2.4} />
            <AppText style={[styles.demoTitle, { color: themeColors.text }]}>
              10. Bảng Thông Số Kỹ Thuật
            </AppText>
          </View>
          <View style={styles.demoSpecBadge}>
            <Cpu size={11} color="#6366F1" strokeWidth={2.4} />
            <AppText style={styles.demoSpecText}>100% GPU</AppText>
          </View>
        </View>

        <View style={styles.specsTable}>
          <View style={styles.specRow}>
            <AppText style={[styles.specName, { color: themeColors.text }]}>AppSegmentedControl</AppText>
            <AppText style={styles.specVal}>Spring (k:280, d:24, m:0.65) • GPU</AppText>
          </View>
          <View style={styles.specRow}>
            <AppText style={[styles.specName, { color: themeColors.text }]}>AppButton & AppChip</AppText>
            <AppText style={styles.specVal}>Elastic (scale:0.975 / 0.96) • GPU</AppText>
          </View>
          <View style={styles.specRow}>
            <AppText style={[styles.specName, { color: themeColors.text }]}>AppleGlassCard & GlassTile</AppText>
            <AppText style={styles.specVal}>Elastic (scale:0.985 / 0.96) • GPU</AppText>
          </View>
          <View style={styles.specRow}>
            <AppText style={[styles.specName, { color: themeColors.text }]}>ConfirmDialog</AppText>
            <AppText style={styles.specVal}>Spring Pop (scale:0.94, t:60) • GPU</AppText>
          </View>
          <View style={styles.specRow}>
            <AppText style={[styles.specName, { color: themeColors.text }]}>Skeleton</AppText>
            <AppText style={styles.specVal}>Timing Loop (750ms) • GPU (Freeze on Reduce)</AppText>
          </View>
          <View style={styles.specRow}>
            <AppText style={[styles.specName, { color: themeColors.text }]}>AppAccordion</AppText>
            <AppText style={styles.specVal}>Matrix Rotate (0° ➔ 180°, 220ms) • GPU</AppText>
          </View>
          <View style={styles.specRow}>
            <AppText style={[styles.specName, { color: themeColors.text }]}>AppProgressBar</AppText>
            <AppText style={styles.specVal}>Linear Interpolation (240ms) • GPU</AppText>
          </View>
          <View style={styles.specRow}>
            <AppText style={[styles.specName, { color: themeColors.text }]}>AppToast</AppText>
            <AppText style={styles.specVal}>Spring Slide (t:65, f:9) • GPU</AppText>
          </View>
        </View>
      </AppCard>
    </View>
  );
});

