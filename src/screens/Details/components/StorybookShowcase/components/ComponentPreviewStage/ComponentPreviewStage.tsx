import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import {
  ControlSize,
  RadiusPresets,
  type ControlSizeKey,
  type RadiusPreset,
  type RadiusPresetConfig,
} from '@/constants/theme';
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
import { haptics } from '@/utils';
import type { PreviewCanvasBackground } from '../../types';
import type { ComponentPreviewStageProps, ShadowLevel } from './types';
import { createComponentPreviewStyles } from './styles';
import { generateSnippet } from './utils/generateSnippet';

import { PreviewStageHeader } from './components/PreviewStageHeader';
import { PreviewCanvasCard } from './components/PreviewCanvasCard';
import { PreviewControlsCard } from './components/PreviewControlsCard';
import { CodeSnippetCard } from './components/CodeSnippetCard';

export const ComponentPreviewStage: React.FC<ComponentPreviewStageProps> = ({
  component,
  allComponents,
  onBackToCatalog,
  onSelectComponent,
  onOpenLayoutLab,
  themeColors,
  radiusTokens,
  isDark,
  isGlass = false,
  onResetScroll,
}) => {
  // Reset scroll to top immediately on mount and after layout pass
  useEffect(() => {
    onResetScroll?.();
    const frame = requestAnimationFrame(() => {
      onResetScroll?.();
    });
    const timer = setTimeout(() => {
      onResetScroll?.();
    }, 60);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [component.id, onResetScroll]);

  // Navigation between components
  const currentIndex = allComponents.findIndex((c) => c.id === component.id);
  const prevComponent = currentIndex > 0 ? allComponents[currentIndex - 1] : null;
  const nextComponent =
    currentIndex < allComponents.length - 1 ? allComponents[currentIndex + 1] : null;

  // Interactive Props States
  const [controlSize, setControlSize] = useState<ControlSizeKey>('md');
  const [buttonVariant, setButtonVariant] = useState<
    'primary' | 'secondary' | 'outline' | 'tonal' | 'glass' | 'danger'
  >('primary');
  const [cardVariant, setCardVariant] = useState<'elevated' | 'outlined' | 'flat' | 'glass'>('elevated');

  const [headerVariant, setHeaderVariant] = useState<'standard' | 'floating-pill' | 'frosted-capsule'>('standard');
  const [headerPlacement, setHeaderPlacement] = useState<'top' | 'bottom'>('top');
  const [headerActionStyle, setHeaderActionStyle] = useState<'individual' | 'capsule'>('capsule');
  const [headerCenterSlot, setHeaderCenterSlot] = useState<'title' | 'select' | 'searchbar'>('title');
  const [headerExpansionPosition, setHeaderExpansionPosition] = useState<'both' | 'inner' | 'bottom'>('both');
  const [headerCustomMode, setHeaderCustomMode] = useState<boolean>(false);
  const [activeBottomTab, setActiveBottomTab] = useState('home');
  const [bottomNavVariant, setBottomNavVariant] = useState<BottomNavVariant>('floating-pill');
  const [bottomNavPlacement, setBottomNavPlacement] = useState<BottomNavPlacement>('bottom');
  const [bottomNavIndicator, setBottomNavIndicator] = useState<BottomNavIndicator>('none');
  const [bottomNavItemLayout, setBottomNavItemLayout] = useState<BottomNavItemLayout>('vertical');
  const [bottomNavFabShape, setBottomNavFabShape] = useState<BottomNavFabShape>('circle');
  const [bottomNavFabPlacement, setBottomNavFabPlacement] = useState<BottomNavFabPlacement>('lifted');
  const [bottomNavLiftOffset, setBottomNavLiftOffset] = useState<number>(22);
  const [bottomNavCustomFabType, setBottomNavCustomFabType] = useState<
    'standard' | 'ai-orb' | 'qr-radar' | 'voice-wave'
  >('standard');
  const [bottomNavShowLabels, setBottomNavShowLabels] = useState(true);
  const [bottomNavHasFab, setBottomNavHasFab] = useState(true);
  const [bottomNavHasTopContent, setBottomNavHasTopContent] = useState(false);
  const [bottomNavCustomMode, setBottomNavCustomMode] = useState(false);
  const [miniPlayerPlaying, setMiniPlayerPlaying] = useState(true);
  const [badgeVariant, setBadgeVariant] = useState<
    'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  >('primary');
  const [segmentedVariant, setSegmentedVariant] = useState<
    'standard' | 'glass' | 'pill' | 'tonal' | 'outline'
  >('pill');
  const [segmentedVal, setSegmentedVal] = useState<string>('all');

  // Surface Controls for Form Primitives (Input, Select, SearchBar, Button)
  const [controlVariant, setControlVariant] = useState<ControlVariant>('standard');
  const [controlContrast, setControlContrast] = useState<ControlContrast>('normal');
  const [controlShadow, setControlShadow] = useState<ShadowLevel>('none');

  // Interactive Boolean Flags
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasIcon, setHasIcon] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form Inputs live state
  const [textVal, setTextVal] = useState('John Doe');
  const [searchVal, setSearchVal] = useState('');
  const [selectVal, setSelectVal] = useState('vn');
  const [switchVal, setSwitchVal] = useState(true);
  const [checkboxVal, setCheckboxVal] = useState(true);

  // Dialogs live state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Interactive States
  const [progressVal, setProgressVal] = useState(65);
  const [activeDot, setActiveDot] = useState(1);
  const [radioVal, setRadioVal] = useState('card');
  const [chipSelected, setChipSelected] = useState(true);
  const [chipVariant, setChipVariant] = useState<ChipVariant>('filled');
  const [otpVal, setOtpVal] = useState('8429');
  const [otpSecure, setOtpSecure] = useState(false);
  const [ratingVal, setRatingVal] = useState(4.5);
  const [listSwitchVal, setListSwitchVal] = useState(true);
  const [toastType, setToastType] = useState<ToastType>('success');
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [accordionExpanded, setAccordionExpanded] = useState(true);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [dividerDashed, setDividerDashed] = useState(false);
  const [dividerThickness, setDividerThickness] = useState(1.5);
  const [avatarBadgeCount, setAvatarBadgeCount] = useState(3);
  const [avatarStatus, setAvatarStatus] = useState<'online' | 'busy' | 'away' | 'offline'>('online');
  const [widgetRefreshing, setWidgetRefreshing] = useState(false);
  const [gestureAction, setGestureAction] = useState('Chạm đúp hoặc vuốt trái/phải lên vùng cảm ứng này');
  const [isOfflineBannerVisible, setIsOfflineBannerVisible] = useState(false);

  // Universal Design System & Theme Lab States (Isolated Demo Sandbox)
  const [overrideRadius, setOverrideRadius] = useState<RadiusPreset | 'system'>('system');
  const [customRadiusValue, setCustomRadiusValue] = useState<number | null>(null);
  const [isGlassPreview, setIsGlassPreview] = useState<boolean>(isGlass);

  // Synchronization status relative to current system state
  const isSystemRadius = overrideRadius === 'system' && customRadiusValue === null;
  const isSystemGlass = isGlassPreview === isGlass;
  const isFullySystemSynced = isSystemRadius && isSystemGlass;

  // Always reset sandbox overrides back to current system default whenever navigating to another component
  useEffect(() => {
    setOverrideRadius('system');
    setCustomRadiusValue(null);
    setIsGlassPreview(isGlass);
  }, [component.id, isGlass]);

  const handleResetToSystem = useCallback(() => {
    haptics.light();
    setOverrideRadius('system');
    setCustomRadiusValue(null);
    setIsGlassPreview(isGlass);
  }, [isGlass]);

  // Loading Overlay states
  const [loadingPosition, setLoadingPosition] = useState<LoadingPosition>('center');
  const [loadingVariant, setLoadingVariant] = useState<LoadingVariant>(isGlass ? 'glass' : 'card');
  const [loadingAnimType, setLoadingAnimType] = useState<LoadingAnimationType>('spinner');
  const [loadingShowProgress, setLoadingShowProgress] = useState(true);
  const [loadingProgressVal, setLoadingProgressVal] = useState<number>(68);
  const [isFullscreenLoading, setIsFullscreenLoading] = useState(false);

  // Canvas background
  const [canvasBg, setCanvasBg] = useState<PreviewCanvasBackground>('default');

  const handleCopyCode = () => {
    haptics.light();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentHeight = ControlSize[controlSize].height;

  // Compute active radius tokens dynamically based on preset or custom drag scrubber
  const activeRadiusTokens: RadiusPresetConfig = useMemo(() => {
    if (customRadiusValue !== null) {
      return {
        id: 'standard' as RadiusPreset,
        name: `Tùy Chỉnh (${customRadiusValue}px)`,
        card: Math.min(customRadiusValue, 20),
        control: customRadiusValue,
        smControl: Math.max(4, customRadiusValue - 4),
        badge: Math.min(customRadiusValue, 8),
        pill: customRadiusValue >= 24 ? 9999 : customRadiusValue,
        desc: `Bo góc tùy chỉnh thủ công: ${customRadiusValue}px`,
      };
    }
    return overrideRadius === 'system' ? radiusTokens : RadiusPresets[overrideRadius];
  }, [overrideRadius, radiusTokens, customRadiusValue]);

  // Dynamic scrubber value synchronized with active token
  const currentScrubberValue = useMemo(() => {
    if (customRadiusValue !== null) return customRadiusValue;
    const targetToken = component.category === 'organisms'
      ? activeRadiusTokens.card
      : activeRadiusTokens.control;
    return targetToken >= 999 ? 24 : targetToken;
  }, [customRadiusValue, component.category, activeRadiusTokens]);

  const effectiveControlVariant: ControlVariant = controlVariant;
  const effectiveButtonVariant = buttonVariant;
  const cardDynamicRadiusStyle = useMemo(
    () => ({ borderRadius: activeRadiusTokens.card }),
    [activeRadiusTokens.card]
  );

  // Icon color synchronized with button state
  const buttonIconColor =
    buttonVariant === 'primary' || buttonVariant === 'danger'
      ? '#FFFFFF'
      : themeColors.text;

  const getCanvasBackground = () => {
    switch (canvasBg) {
      case 'card':
        return isDark ? '#1E293B' : '#F1F5F9';
      case 'contrast':
        return isDark ? '#000000' : '#E2E8F0';
      case 'mesh':
        return isDark ? '#0F172A' : '#F8FAFC';
      default:
        return isDark ? 'rgba(0, 0, 0, 0.35)' : 'rgba(248, 250, 252, 0.9)';
    }
  };

  const snippet = useMemo(() => {
    return generateSnippet({
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
    });
  }, [
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
  ]);

  const styles = useMemo(
    () => createComponentPreviewStyles(themeColors, activeRadiusTokens, isDark),
    [themeColors, activeRadiusTokens, isDark]
  );

  return (
    <View style={styles.container}>
      {/* 1 & 2. Top Nav & Overview Header */}
      <PreviewStageHeader
        component={component}
        prevComponent={prevComponent}
        nextComponent={nextComponent}
        onBackToCatalog={onBackToCatalog}
        onSelectComponent={onSelectComponent}
        themeColors={themeColors}
        styles={styles}
      />

      {/* 3. Dedicated Preview Canvas Stage */}
      <PreviewCanvasCard
        component={component}
        themeColors={themeColors}
        radiusTokens={radiusTokens}
        activeRadiusTokens={activeRadiusTokens}
        isDark={isDark}
        isGlass={isGlass}
        isGlassPreview={isGlassPreview}
        styles={styles}
        canvasBg={canvasBg}
        setCanvasBg={setCanvasBg}
        getCanvasBackground={getCanvasBackground}
        onOpenLayoutLab={onOpenLayoutLab}
        controlSize={controlSize}
        effectiveControlVariant={effectiveControlVariant}
        effectiveButtonVariant={effectiveButtonVariant}
        controlContrast={controlContrast}
        controlShadow={controlShadow}
        buttonIconColor={buttonIconColor}
        hasIcon={hasIcon}
        isLoading={isLoading}
        isDisabled={isDisabled}
        isFullWidth={isFullWidth}
        hasError={hasError}
        textVal={textVal}
        setTextVal={setTextVal}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        selectVal={selectVal}
        setSelectVal={setSelectVal}
        switchVal={switchVal}
        setSwitchVal={setSwitchVal}
        checkboxVal={checkboxVal}
        setCheckboxVal={setCheckboxVal}
        headerVariant={headerVariant}
        headerPlacement={headerPlacement}
        setHeaderPlacement={setHeaderPlacement}
        headerActionStyle={headerActionStyle}
        headerCenterSlot={headerCenterSlot}
        headerExpansionPosition={headerExpansionPosition}
        headerCustomMode={headerCustomMode}
        setHeaderCustomMode={setHeaderCustomMode}
        bottomNavVariant={bottomNavVariant}
        bottomNavPlacement={bottomNavPlacement}
        setBottomNavPlacement={setBottomNavPlacement}
        bottomNavIndicator={bottomNavIndicator}
        bottomNavItemLayout={bottomNavItemLayout}
        bottomNavFabShape={bottomNavFabShape}
        bottomNavFabPlacement={bottomNavFabPlacement}
        bottomNavLiftOffset={bottomNavLiftOffset}
        bottomNavCustomFabType={bottomNavCustomFabType}
        bottomNavShowLabels={bottomNavShowLabels}
        bottomNavHasFab={bottomNavHasFab}
        bottomNavHasTopContent={bottomNavHasTopContent}
        bottomNavCustomMode={bottomNavCustomMode}
        setBottomNavCustomMode={setBottomNavCustomMode}
        activeBottomTab={activeBottomTab}
        setActiveBottomTab={setActiveBottomTab}
        miniPlayerPlaying={miniPlayerPlaying}
        setMiniPlayerPlaying={setMiniPlayerPlaying}
        cardVariant={cardVariant}
        cardDynamicRadiusStyle={cardDynamicRadiusStyle}
        badgeVariant={badgeVariant}
        segmentedVariant={segmentedVariant}
        segmentedVal={segmentedVal}
        setSegmentedVal={setSegmentedVal}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        progressVal={progressVal}
        setProgressVal={setProgressVal}
        activeDot={activeDot}
        setActiveDot={setActiveDot}
        radioVal={radioVal}
        setRadioVal={setRadioVal}
        chipSelected={chipSelected}
        setChipSelected={setChipSelected}
        chipVariant={chipVariant}
        otpVal={otpVal}
        setOtpVal={setOtpVal}
        otpSecure={otpSecure}
        ratingVal={ratingVal}
        setRatingVal={setRatingVal}
        listSwitchVal={listSwitchVal}
        setListSwitchVal={setListSwitchVal}
        isToastOpen={isToastOpen}
        setIsToastOpen={setIsToastOpen}
        toastType={toastType}
        accordionExpanded={accordionExpanded}
        setAccordionExpanded={setAccordionExpanded}
        isBottomSheetOpen={isBottomSheetOpen}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
        dividerDashed={dividerDashed}
        dividerThickness={dividerThickness}
        avatarBadgeCount={avatarBadgeCount}
        avatarStatus={avatarStatus}
        widgetRefreshing={widgetRefreshing}
        setWidgetRefreshing={setWidgetRefreshing}
        gestureAction={gestureAction}
        setGestureAction={setGestureAction}
        isOfflineBannerVisible={isOfflineBannerVisible}
        setIsOfflineBannerVisible={setIsOfflineBannerVisible}
        loadingPosition={loadingPosition}
        loadingVariant={loadingVariant}
        loadingAnimType={loadingAnimType}
        loadingShowProgress={loadingShowProgress}
        loadingProgressVal={loadingProgressVal}
        isFullscreenLoading={isFullscreenLoading}
        setIsFullscreenLoading={setIsFullscreenLoading}
      />

      {/* 4. Interactive Props Controls Panel */}
      <PreviewControlsCard
        component={component}
        themeColors={themeColors}
        radiusTokens={radiusTokens}
        activeRadiusTokens={activeRadiusTokens}
        isDark={isDark}
        isGlass={isGlass}
        isGlassPreview={isGlassPreview}
        setIsGlassPreview={setIsGlassPreview}
        styles={styles}
        overrideRadius={overrideRadius}
        setOverrideRadius={setOverrideRadius}
        customRadiusValue={customRadiusValue}
        setCustomRadiusValue={setCustomRadiusValue}
        currentScrubberValue={currentScrubberValue}
        isFullySystemSynced={isFullySystemSynced}
        handleResetToSystem={handleResetToSystem}
        onOpenLayoutLab={onOpenLayoutLab}
        controlSize={controlSize}
        setControlSize={setControlSize}
        controlContrast={controlContrast}
        controlShadow={controlShadow}
        setControlShadow={setControlShadow}
        controlVariant={controlVariant}
        setControlVariant={setControlVariant}
        buttonVariant={buttonVariant}
        setButtonVariant={setButtonVariant}
        setControlContrast={setControlContrast}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        hasIcon={hasIcon}
        setHasIcon={setHasIcon}
        hasError={hasError}
        setHasError={setHasError}
        isFullWidth={isFullWidth}
        setIsFullWidth={setIsFullWidth}
        cardVariant={cardVariant}
        setCardVariant={setCardVariant}
        badgeVariant={badgeVariant}
        setBadgeVariant={setBadgeVariant}
        segmentedVariant={segmentedVariant}
        setSegmentedVariant={setSegmentedVariant}
        headerVariant={headerVariant}
        setHeaderVariant={setHeaderVariant}
        headerPlacement={headerPlacement}
        setHeaderPlacement={setHeaderPlacement}
        headerActionStyle={headerActionStyle}
        setHeaderActionStyle={setHeaderActionStyle}
        headerCenterSlot={headerCenterSlot}
        setHeaderCenterSlot={setHeaderCenterSlot}
        headerExpansionPosition={headerExpansionPosition}
        setHeaderExpansionPosition={setHeaderExpansionPosition}
        headerCustomMode={headerCustomMode}
        setHeaderCustomMode={setHeaderCustomMode}
        bottomNavVariant={bottomNavVariant}
        setBottomNavVariant={setBottomNavVariant}
        bottomNavPlacement={bottomNavPlacement}
        setBottomNavPlacement={setBottomNavPlacement}
        bottomNavIndicator={bottomNavIndicator}
        setBottomNavIndicator={setBottomNavIndicator}
        bottomNavItemLayout={bottomNavItemLayout}
        setBottomNavItemLayout={setBottomNavItemLayout}
        bottomNavFabShape={bottomNavFabShape}
        setBottomNavFabShape={setBottomNavFabShape}
        bottomNavFabPlacement={bottomNavFabPlacement}
        setBottomNavFabPlacement={setBottomNavFabPlacement}
        bottomNavLiftOffset={bottomNavLiftOffset}
        setBottomNavLiftOffset={setBottomNavLiftOffset}
        bottomNavCustomFabType={bottomNavCustomFabType}
        setBottomNavCustomFabType={setBottomNavCustomFabType}
        bottomNavShowLabels={bottomNavShowLabels}
        setBottomNavShowLabels={setBottomNavShowLabels}
        bottomNavHasFab={bottomNavHasFab}
        setBottomNavHasFab={setBottomNavHasFab}
        bottomNavHasTopContent={bottomNavHasTopContent}
        setBottomNavHasTopContent={setBottomNavHasTopContent}
        bottomNavCustomMode={bottomNavCustomMode}
        setBottomNavCustomMode={setBottomNavCustomMode}
        chipVariant={chipVariant}
        setChipVariant={setChipVariant}
        otpSecure={otpSecure}
        setOtpSecure={setOtpSecure}
        toastType={toastType}
        setToastType={setToastType}
        dividerDashed={dividerDashed}
        setDividerDashed={setDividerDashed}
        dividerThickness={dividerThickness}
        setDividerThickness={setDividerThickness}
        avatarBadgeCount={avatarBadgeCount}
        setAvatarBadgeCount={setAvatarBadgeCount}
        avatarStatus={avatarStatus}
        setAvatarStatus={setAvatarStatus}
        progressVal={progressVal}
        setProgressVal={setProgressVal}
        ratingVal={ratingVal}
        setRatingVal={setRatingVal}
        activeDot={activeDot}
        setActiveDot={setActiveDot}
        widgetRefreshing={widgetRefreshing}
        setWidgetRefreshing={setWidgetRefreshing}
        setGestureAction={setGestureAction}
        loadingPosition={loadingPosition}
        setLoadingPosition={setLoadingPosition}
        loadingVariant={loadingVariant}
        setLoadingVariant={setLoadingVariant}
        loadingAnimType={loadingAnimType}
        setLoadingAnimType={setLoadingAnimType}
        loadingShowProgress={loadingShowProgress}
        setLoadingShowProgress={setLoadingShowProgress}
        loadingProgressVal={loadingProgressVal}
        setLoadingProgressVal={setLoadingProgressVal}
      />

      {/* 5. Design Tokens & Usage Code Snippet */}
      <CodeSnippetCard
        component={component}
        themeColors={themeColors}
        activeRadiusTokens={activeRadiusTokens}
        currentHeight={currentHeight}
        isDark={isDark}
        isGlassPreview={isGlassPreview}
        isSystemRadius={isSystemRadius}
        styles={styles}
        snippet={snippet}
        copied={copied}
        onCopyCode={handleCopyCode}
      />
    </View>
  );
};
