import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Sparkles,
  Plus,
  QrCode,
  Mic,
  Zap,
} from 'lucide-react-native';
import { AppText, AppCard, AppSwitch } from '@/components';
import { haptics } from '@/utils';
import { InteractiveScrubber } from '../../InteractiveScrubber';
import type { LayoutLabControlsDeckProps, CenterFabType } from '../types';

const FAB_COMPONENT_OPTIONS = [
  { id: 'standard' as CenterFabType, label: 'Icon Cộng Chuẩn', icon: Plus },
  { id: 'ai-orb' as CenterFabType, label: 'Quả Cầu AI Orb', icon: Sparkles },
  { id: 'qr-radar' as CenterFabType, label: 'Máy Quét QR Radar', icon: QrCode },
  { id: 'voice-wave' as CenterFabType, label: 'Sóng Âm Voice', icon: Mic },
  { id: 'pill-badge' as CenterFabType, label: 'Viên Thuốc Pill', icon: Zap },
];

const formatFabLift = (v: number) => `${v}px (Nhô ra khỏi viền)`;
const formatDockMargin = (v: number) => (v === 0 ? '0px (Dính sát viền)' : `${v}px (Ốc đảo nổi)`);
const formatBorderRadius = (v: number) => (v === 0 ? '0px (Sắc cạnh)' : `${v}px (Bo tròn)`);

export const LayoutLabControlsDeck: React.FC<LayoutLabControlsDeckProps> = React.memo(({
  themeColors,
  isDark,
  styles,
  fabLiftOffset,
  setFabLiftOffset,
  dockEdgeMargin,
  setDockEdgeMargin,
  dockBorderRadius,
  setDockBorderRadius,
  autoClearance,
  setAutoClearance,
  manualPaddingTop,
  setManualPaddingTop,
  manualPaddingBottom,
  setManualPaddingBottom,
  centerFabType,
  setCenterFabType,
  fabShape,
  setFabShape,
  fabPlacement,
  setFabPlacement,
}) => {
  return (
    <AppCard style={styles.controlsDeckCard}>
      <View style={styles.deckHeader}>
        <AppText style={styles.deckTitle}>
          4. Kéo Thả Tinh Chỉnh Offset & Tham Số (Offset Scrubbers)
        </AppText>
      </View>

      {/* Scrubber 1: FAB Lift Offset */}
      <View style={styles.scrubberBlock}>
        <InteractiveScrubber
          label="Độ Cao Nhô FAB (fabLiftOffset)"
          value={fabLiftOffset}
          min={0}
          max={52}
          step={1}
          unit="px"
          themeColors={themeColors}
          isDark={isDark}
          onChange={setFabLiftOffset}
          formatValue={formatFabLift}
        />
      </View>

      {/* Scrubber 2: Dock Edge / Floating Margin */}
      <View style={styles.scrubberBlock}>
        <InteractiveScrubber
          label="Khoảng Cách Mép Viền (dockEdgeMargin)"
          value={dockEdgeMargin}
          min={0}
          max={32}
          step={2}
          unit="px"
          themeColors={themeColors}
          isDark={isDark}
          onChange={setDockEdgeMargin}
          formatValue={formatDockMargin}
        />
      </View>

      {/* Scrubber 3: Dock Border Radius */}
      <View style={styles.scrubberBlock}>
        <InteractiveScrubber
          label="Độ Bo Góc Thanh Dock (dockBorderRadius)"
          value={dockBorderRadius}
          min={0}
          max={36}
          step={2}
          unit="px"
          themeColors={themeColors}
          isDark={isDark}
          onChange={setDockBorderRadius}
          formatValue={formatBorderRadius}
        />
      </View>

      {/* Auto Clearance Switch */}
      <View style={styles.switchConfigRow}>
        <View style={styles.switchLabelCol}>
          <AppText style={styles.switchTitle}>
            Tự Động Tính Khoảng Trống (Smart Auto Clearance)
          </AppText>
          <AppText style={styles.switchDesc}>
            {autoClearance
              ? 'ĐANG BẬT: Padding tự đồng bộ theo chiều cao dock và liftOffset.'
              : 'ĐANG TẮT: Sử dụng thanh kéo thủ công bên dưới để test cuộn xuyên thấu.'}
          </AppText>
        </View>
        <AppSwitch
          value={autoClearance}
          onValueChange={(val) => {
            haptics.light();
            setAutoClearance(val);
          }}
        />
      </View>

      {/* Manual Padding Scrubbers if Auto Clearance is OFF */}
      {!autoClearance && (
        <View style={styles.manualPaddingGroup}>
          <InteractiveScrubber
            label="Padding Top Vùng Giữa (manualPaddingTop)"
            value={manualPaddingTop}
            min={0}
            max={120}
            step={4}
            unit="px"
            themeColors={themeColors}
            isDark={isDark}
            onChange={setManualPaddingTop}
          />
          <View style={styles.spacer12} />
          <InteractiveScrubber
            label="Padding Bottom Vùng Giữa (manualPaddingBottom)"
            value={manualPaddingBottom}
            min={0}
            max={140}
            step={4}
            unit="px"
            themeColors={themeColors}
            isDark={isDark}
            onChange={setManualPaddingBottom}
          />
        </View>
      )}

      <View style={styles.dividerWrap}>
        <View style={[styles.hDivider, isDark ? styles.hDividerDark : styles.hDividerLight]} />
      </View>

      {/* Center FAB Component Selector */}
      <AppText style={styles.subOptionsTitle}>
        Linh Kiện Cho Nút FAB Ở Giữa (Center Component)
      </AppText>
      <View style={styles.fabComponentGrid}>
        {FAB_COMPONENT_OPTIONS.map((item) => {
          const isSelected = centerFabType === item.id;
          const IconCmp = item.icon;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.75}
              style={[
                styles.fabOptionChip,
                isSelected
                  ? styles.fabOptionChipSelected
                  : isDark
                  ? styles.fabOptionChipDark
                  : styles.fabOptionChipLight,
              ]}
              onPress={() => {
                haptics.light();
                setCenterFabType(item.id);
              }}
            >
              <IconCmp size={13} color={isSelected ? '#6366F1' : themeColors.textSecondary} />
              <AppText
                style={[
                  styles.fabOptionText,
                  isSelected ? styles.fabOptionTextSelected : styles.textSecondary,
                ]}
              >
                {item.label}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* FAB Shape & Placement Selectors */}
      <View style={styles.fabShapeRow}>
        <View style={styles.fabShapeCol}>
          <AppText style={styles.fabShapeLabel}>
            Hình Dáng Nút FAB:
          </AppText>
          <View style={styles.shapeToggleButtons}>
            <TouchableOpacity
              activeOpacity={0.75}
              style={[
                styles.shapeBtn,
                fabShape === 'circle' && styles.shapeBtnActive,
              ]}
              onPress={() => {
                haptics.light();
                setFabShape('circle');
              }}
            >
              <AppText style={[styles.shapeBtnText, fabShape === 'circle' && styles.shapeBtnTextActive]}>
                Tròn (Circle)
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.75}
              style={[
                styles.shapeBtn,
                fabShape === 'squircle' && styles.shapeBtnActive,
              ]}
              onPress={() => {
                haptics.light();
                setFabShape('squircle');
              }}
            >
              <AppText style={[styles.shapeBtnText, fabShape === 'squircle' && styles.shapeBtnTextActive]}>
                Bo Góc (Squircle)
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.fabShapeCol}>
          <AppText style={styles.fabShapeLabel}>
            Vị Trí Cắm (Placement):
          </AppText>
          <View style={styles.shapeToggleButtons}>
            <TouchableOpacity
              activeOpacity={0.75}
              style={[
                styles.shapeBtn,
                fabPlacement === 'lifted' && styles.shapeBtnActive,
              ]}
              onPress={() => {
                haptics.light();
                setFabPlacement('lifted');
              }}
            >
              <AppText style={[styles.shapeBtnText, fabPlacement === 'lifted' && styles.shapeBtnTextActive]}>
                Nhô Cao (Lifted)
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.75}
              style={[
                styles.shapeBtn,
                fabPlacement === 'embedded' && styles.shapeBtnActive,
              ]}
              onPress={() => {
                haptics.light();
                setFabPlacement('embedded');
              }}
            >
              <AppText style={[styles.shapeBtnText, fabPlacement === 'embedded' && styles.shapeBtnTextActive]}>
                Chìm (Embedded)
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AppCard>
  );
});
