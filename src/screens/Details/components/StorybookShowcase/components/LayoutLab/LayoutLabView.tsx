import React, { useState, useMemo, useCallback } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import {
  LayoutGrid,
  ArrowUpDown,
  Maximize2,
  Minimize2,
  Sparkles,
  QrCode,
  Mic,
  Zap,
  ExternalLink,
} from 'lucide-react-native';
import { AppText, AppCard, AppButton, type BottomNavItem } from '@/components';
import { haptics } from '@/utils';

import type {
  LayoutLabViewProps,
  LayoutPresetKey,
  MiddleContentMode,
  CenterFabType,
} from './types';
import {
  PRESET_OPTIONS,
  CONTENT_MODES,
  renderNavHomeIcon,
  renderNavTelemetryIcon,
  renderNavReportsIcon,
  renderNavSettingsIcon,
} from './constants';
import { createLayoutLabStyles } from './styles';

import { SensorsFeed } from './components/SensorsFeed';
import { ArticleFeed } from './components/ArticleFeed';
import { BentoDashboard } from './components/BentoDashboard';
import { FormsSandbox } from './components/FormsSandbox';
import { TransactionsFeed } from './components/TransactionsFeed';
import { LayoutLabStage } from './components/LayoutLabStage';
import { LayoutLabControlsDeck } from './components/LayoutLabControlsDeck';

export const LayoutLabView: React.FC<LayoutLabViewProps> = React.memo(({
  themeColors,
  radiusTokens,
  isDark,
  onOpenFullScreen,
}) => {
  // 1. Layout Presets & Dock Swapping
  const [activePreset, setActivePreset] = useState<LayoutPresetKey>('classic');
  const [isSwappedDocks, setIsSwappedDocks] = useState(false);
  const [isStageExpanded, setIsStageExpanded] = useState(false);

  // 2. Middle Content Mode
  const [contentMode, setContentMode] = useState<MiddleContentMode>('sensors');

  // 3. Offset & Customization State (Interactive Scrubbers)
  const [fabLiftOffset, setFabLiftOffset] = useState<number>(22);
  const [dockEdgeMargin, setDockEdgeMargin] = useState<number>(0);
  const [dockBorderRadius, setDockBorderRadius] = useState<number>(radiusTokens.card ?? 24);
  const [fabShape, setFabShape] = useState<'circle' | 'squircle'>('circle');
  const [centerFabType, setCenterFabType] = useState<CenterFabType>('ai-orb');
  const [fabPlacement, setFabPlacement] = useState<'lifted' | 'embedded'>('lifted');
  const [autoClearance, setAutoClearance] = useState<boolean>(true);
  const [manualPaddingTop, setManualPaddingTop] = useState<number>(64);
  const [manualPaddingBottom, setManualPaddingBottom] = useState<number>(84);

  // 4. Interactive State for Middle Views
  const [activeNavTab, setActiveNavTab] = useState<string>('home');
  const [fanRunning, setFanRunning] = useState<boolean>(true);
  const [alarmActive, setAlarmActive] = useState<boolean>(false);
  const [pumpActive, setPumpActive] = useState<boolean>(true);
  const [formInputText, setFormInputText] = useState('Nguyễn Văn Tuấn');
  const [formEmailText, setFormEmailText] = useState('tuan.dev@enterprise.vn');
  const [formOffice, setFormOffice] = useState<string>('hn');
  const [form2FA, setForm2FA] = useState<boolean>(true);

  // Handle Preset Selection
  const applyPreset = useCallback((preset: LayoutPresetKey) => {
    setActivePreset(preset);
    haptics.light();

    switch (preset) {
      case 'classic':
        setIsSwappedDocks(false);
        setDockEdgeMargin(0);
        setDockBorderRadius(0);
        setFabPlacement('lifted');
        setFabLiftOffset(22);
        break;
      case 'inverted':
        setIsSwappedDocks(true);
        setDockEdgeMargin(0);
        setDockBorderRadius(0);
        setFabPlacement('lifted');
        setFabLiftOffset(20);
        break;
      case 'floating':
        setIsSwappedDocks(false);
        setDockEdgeMargin(14);
        setDockBorderRadius(26);
        setFabPlacement('lifted');
        setFabLiftOffset(24);
        break;
      case 'glass':
        setIsSwappedDocks(false);
        setDockEdgeMargin(12);
        setDockBorderRadius(24);
        setFabPlacement('lifted');
        setFabLiftOffset(20);
        break;
      case 'bottom-only':
        setIsSwappedDocks(false);
        setDockEdgeMargin(0);
        setDockBorderRadius(0);
        setFabPlacement('lifted');
        setFabLiftOffset(22);
        break;
      case 'top-only':
        setIsSwappedDocks(false);
        setDockEdgeMargin(0);
        setDockBorderRadius(0);
        break;
    }
  }, []);

  const styles = useMemo(
    () => createLayoutLabStyles(themeColors, radiusTokens, isDark),
    [themeColors, radiusTokens, isDark]
  );

  // Bottom Nav Items Configuration
  const navItems = useMemo<BottomNavItem[]>(
    () => [
      {
        key: 'home',
        label: 'Giám Sát',
        icon: renderNavHomeIcon,
        badge: 3,
      },
      {
        key: 'telemetry',
        label: 'Viễn Trắc',
        icon: renderNavTelemetryIcon,
      },
      {
        key: 'reports',
        label: 'Báo Cáo',
        icon: renderNavReportsIcon,
      },
      {
        key: 'settings',
        label: 'Thiết Lập',
        icon: renderNavSettingsIcon,
      },
    ],
    []
  );

  // Center FAB Custom Renderer
  const renderCenterFabComponent = useMemo(() => {
    switch (centerFabType) {
      case 'ai-orb':
        return (
          <View
            style={[
              styles.aiOrbWrapper,
              fabShape === 'squircle' && styles.squircleRadius,
            ]}
          >
            <View style={styles.aiOrbCore}>
              <Sparkles size={20} color="#FFFFFF" strokeWidth={2.4} />
            </View>
          </View>
        );
      case 'qr-radar':
        return (
          <View
            style={[
              styles.qrRadarWrapper,
              fabShape === 'squircle' && styles.squircleRadius,
            ]}
          >
            <QrCode size={20} color="#FFFFFF" strokeWidth={2.3} />
          </View>
        );
      case 'voice-wave':
        return (
          <View
            style={[
              styles.voiceWaveWrapper,
              fabShape === 'squircle' && styles.squircleRadius,
            ]}
          >
            <Mic size={20} color="#FFFFFF" strokeWidth={2.3} />
          </View>
        );
      case 'pill-badge':
        return (
          <View style={styles.pillBadgeWrapper}>
            <Zap size={14} color="#FFFFFF" strokeWidth={2.4} />
            <AppText style={styles.pillBadgeText}>AI LIVE</AppText>
          </View>
        );
      case 'standard':
      default:
        return undefined; // uses standard BottomNavCenterFab icon
    }
  }, [centerFabType, fabShape, styles]);

  // Dynamic Clearance Calculations
  const effectivePaddingTop = useMemo(() => {
    if (!autoClearance) return manualPaddingTop;
    if (activePreset === 'bottom-only') return 16;
    return 74;
  }, [autoClearance, manualPaddingTop, activePreset]);

  const effectivePaddingBottom = useMemo(() => {
    if (!autoClearance) return manualPaddingBottom;
    if (activePreset === 'top-only') return 20;
    const baseNav = 62;
    const extraLift = fabPlacement === 'lifted' ? Math.max(0, fabLiftOffset - 10) : 0;
    return baseNav + extraLift + dockEdgeMargin + 24;
  }, [autoClearance, manualPaddingBottom, activePreset, fabPlacement, fabLiftOffset, dockEdgeMargin]);

  const dynamicMiddleScrollStyle = useMemo(
    () => [
      styles.middleScrollContent,
      {
        paddingTop: effectivePaddingTop,
        paddingBottom: effectivePaddingBottom,
      },
    ],
    [styles.middleScrollContent, effectivePaddingTop, effectivePaddingBottom]
  );

  const dynamicDockMarginStyle = useMemo(
    () => ({ marginHorizontal: dockEdgeMargin }),
    [dockEdgeMargin]
  );

  // Determine which dock is at Top and which is at Bottom
  const isTopNav = isSwappedDocks;
  const showTopDock = activePreset !== 'bottom-only';
  const showBottomDock = activePreset !== 'top-only';

  const dockVariant = useMemo(() => {
    if (activePreset === 'floating') return 'floating-pill';
    if (activePreset === 'glass') return 'frosted-glass';
    return 'standard';
  }, [activePreset]);

  const headerVariant = useMemo(() => {
    if (activePreset === 'floating') return 'floating-pill';
    if (activePreset === 'glass') return 'frosted-capsule';
    return 'standard';
  }, [activePreset]);

  const renderContentNode = useMemo(() => {
    switch (contentMode) {
      case 'sensors':
        return (
          <SensorsFeed
            themeColors={themeColors}
            styles={styles}
            fanRunning={fanRunning}
            setFanRunning={setFanRunning}
            alarmActive={alarmActive}
            setAlarmActive={setAlarmActive}
            pumpActive={pumpActive}
            setPumpActive={setPumpActive}
          />
        );
      case 'article':
        return <ArticleFeed themeColors={themeColors} styles={styles} />;
      case 'bento':
        return <BentoDashboard themeColors={themeColors} styles={styles} />;
      case 'forms':
        return (
          <FormsSandbox
            themeColors={themeColors}
            styles={styles}
            formInputText={formInputText}
            setFormInputText={setFormInputText}
            formEmailText={formEmailText}
            setFormEmailText={setFormEmailText}
            formOffice={formOffice}
            setFormOffice={setFormOffice}
            form2FA={form2FA}
            setForm2FA={setForm2FA}
          />
        );
      case 'feed':
        return <TransactionsFeed themeColors={themeColors} styles={styles} />;
      default:
        return null;
    }
  }, [
    contentMode,
    themeColors,
    styles,
    fanRunning,
    alarmActive,
    pumpActive,
    formInputText,
    formEmailText,
    formOffice,
    form2FA,
  ]);

  return (
    <View style={styles.container}>
      {/* 1. TOP HEADER & INTRO BANNER */}
      <AppCard style={styles.heroCard}>
        <View style={styles.heroHeaderRow}>
          <View style={styles.heroTag}>
            <LayoutGrid size={13} color="#6366F1" strokeWidth={2.4} />
            <AppText style={styles.heroTagText}>LAYOUT LAB • BỐ CỤC ĐA DẠNG</AppText>
          </View>
          <View style={styles.heroLiveBadge}>
            <View style={styles.liveDot} />
            <AppText style={styles.heroLiveText}>TEST TRỰC TIẾP</AppText>
          </View>
        </View>

        <AppText style={styles.heroTitle}>
          Phòng Thí Nghiệm Bố Cục & Đảo Vị Trí Dock
        </AppText>
        <AppText style={styles.heroDesc}>
          Thử nghiệm thanh Header và BottomNav ở các vị trí khác nhau, kiểm tra nội dung cuộn ở giữa với 5 chế độ thực tế, kéo thả tùy chỉnh độ nhô FAB và khoảng cách mép viền tự do.
        </AppText>

        {/* Quick Dock Swap Action Button */}
        <View style={styles.quickSwapRow}>
          <AppButton
            title={isSwappedDocks ? 'Đang Đảo: Nav Ở Trên ⇄ Header Ở Dưới' : 'Đang Chuẩn: Header Ở Trên ⇄ Nav Ở Dưới'}
            leftIcon={<ArrowUpDown size={15} color="#FFFFFF" strokeWidth={2.4} />}
            variant="primary"
            size="sm"
            onPress={() => {
              haptics.light();
              setIsSwappedDocks((prev) => !prev);
            }}
          />
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.expandToggleBtn}
            onPress={() => {
              haptics.light();
              setIsStageExpanded((prev) => !prev);
            }}
          >
            {isStageExpanded ? (
              <Minimize2 size={16} color={themeColors.text} strokeWidth={2.2} />
            ) : (
              <Maximize2 size={16} color={themeColors.text} strokeWidth={2.2} />
            )}
          </TouchableOpacity>
        </View>

        {onOpenFullScreen && (
          <View style={styles.fullScreenBtnWrap}>
            <AppButton
              title="Mở Phòng Thí Nghiệm Toàn Màn Hình (Áp Dụng Thật)"
              leftIcon={<ExternalLink size={15} color="#FFFFFF" strokeWidth={2.4} />}
              variant="tonal"
              size="sm"
              onPress={() => {
                haptics.medium();
                onOpenFullScreen();
              }}
            />
          </View>
        )}
      </AppCard>

      {/* 2. PRESET SELECTION CHIPS */}
      <View style={styles.presetSection}>
        <AppText style={styles.sectionHeading}>
          1. Chọn Phong Cách Bố Cục (Layout Presets)
        </AppText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.presetScrollContent}
        >
          {PRESET_OPTIONS.map((item) => {
            const isActive = activePreset === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.75}
                style={[
                  styles.presetChip,
                  isActive
                    ? styles.presetChipActive
                    : isDark
                    ? styles.presetChipDark
                    : styles.presetChipLight,
                ]}
                onPress={() => applyPreset(item.id)}
              >
                <AppText
                  style={[
                    styles.presetChipText,
                    isActive ? styles.textWhite : styles.textNormal,
                  ]}
                >
                  {item.label}
                </AppText>
                <View
                  style={[
                    styles.presetBadge,
                    isActive
                      ? styles.presetBadgeActive
                      : isDark
                      ? styles.presetBadgeDark
                      : styles.presetBadgeLight,
                  ]}
                >
                  <AppText
                    style={[
                      styles.presetBadgeText,
                      isActive ? styles.textWhite : styles.textSecondary,
                    ]}
                  >
                    {item.badge}
                  </AppText>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 3. MIDDLE CONTENT MODE SWITCHER */}
      <View style={styles.contentModeSection}>
        <AppText style={styles.sectionHeading}>
          2. Chế Độ Nội Dung Vùng Giữa (Middle Scroll Body)
        </AppText>
        <View style={styles.contentModeRow}>
          {CONTENT_MODES.map((mode) => {
            const isActive = contentMode === mode.id;
            const IconCmp = mode.icon;
            return (
              <TouchableOpacity
                key={mode.id}
                activeOpacity={0.75}
                style={[
                  styles.modeButton,
                  isActive
                    ? styles.modeButtonActive
                    : isDark
                    ? styles.modeButtonDark
                    : styles.modeButtonLight,
                ]}
                onPress={() => {
                  haptics.light();
                  setContentMode(mode.id);
                }}
              >
                <IconCmp
                  size={14}
                  color={isActive ? '#FFFFFF' : themeColors.textSecondary}
                  strokeWidth={isActive ? 2.4 : 2}
                />
                <AppText
                  style={[
                    styles.modeButtonText,
                    isActive ? styles.textWhite : styles.textSecondary,
                  ]}
                >
                  {mode.label}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* 4. THE LIVE SIMULATOR STAGE */}
      <LayoutLabStage
        themeColors={themeColors}
        isDark={isDark}
        styles={styles}
        isStageExpanded={isStageExpanded}
        showTopDock={showTopDock}
        showBottomDock={showBottomDock}
        isTopNav={isTopNav}
        dockVariant={dockVariant}
        headerVariant={headerVariant}
        dockBorderRadius={dockBorderRadius}
        dynamicDockMarginStyle={dynamicDockMarginStyle}
        navItems={navItems}
        activeNavTab={activeNavTab}
        setActiveNavTab={setActiveNavTab}
        fabShape={fabShape}
        fabPlacement={fabPlacement}
        fabLiftOffset={fabLiftOffset}
        renderCenterFabComponent={renderCenterFabComponent}
        dynamicMiddleScrollStyle={dynamicMiddleScrollStyle}
        contentMode={contentMode}
        renderContentNode={renderContentNode}
      />

      {/* 5. INTERACTIVE SCRUBBERS & TUNING DECK */}
      <LayoutLabControlsDeck
        themeColors={themeColors}
        isDark={isDark}
        styles={styles}
        fabLiftOffset={fabLiftOffset}
        setFabLiftOffset={setFabLiftOffset}
        dockEdgeMargin={dockEdgeMargin}
        setDockEdgeMargin={setDockEdgeMargin}
        dockBorderRadius={dockBorderRadius}
        setDockBorderRadius={setDockBorderRadius}
        autoClearance={autoClearance}
        setAutoClearance={setAutoClearance}
        manualPaddingTop={manualPaddingTop}
        setManualPaddingTop={setManualPaddingTop}
        manualPaddingBottom={manualPaddingBottom}
        setManualPaddingBottom={setManualPaddingBottom}
        centerFabType={centerFabType}
        setCenterFabType={setCenterFabType}
        fabShape={fabShape}
        setFabShape={setFabShape}
        fabPlacement={fabPlacement}
        setFabPlacement={setFabPlacement}
      />
    </View>
  );
});
