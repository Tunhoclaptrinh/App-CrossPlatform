import {
  HeaderBackButton,
  HeaderActionGroup,
  HeaderTitle,
  HeaderSearchRow,
  HeaderDropdownSuggestions,
  HeaderContainer,
} from './components';
import React, { useState, useMemo, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, MoreHorizontal, Search } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { AppText } from '../AppText';
import { AppActionSheet } from '../AppActionSheet';
import { AppSearchBar } from '../AppSearchBar';
import { AppScrollView } from '../AppScrollView';
import { useThemeMode } from '@/hooks/useThemeMode';
import { ControlSize, Spacing } from '@/constants/theme';
import { Colors } from '@/constants/colors';
import { haptics } from '@/utils/haptics';
import type { AppHeaderProps, AppHeaderAction, AppHeaderExpansionHelpers, AppHeaderCustomHelpers } from './types';
import {
  styles,
  getHeaderBackgroundStyle,
  getCenterTitlePadding,
  getContainerHeight,
} from './styles';

const AppHeaderComponent: React.FC<AppHeaderProps> = React.memo(({
  title,
  subtitle,
  titleAlign = 'center',
  subtitleAlign,
  titleStyle,
  subtitleStyle,
  centerContent,
  variant = 'standard',
  size = 'md',
  placement = 'top',
  showBack = false,
  backTitle,
  backStyle,
  onBack,
  leftAction,
  leftActions,
  showMore = false,
  onMore,
  moreTitle,
  moreMessage,
  moreActions,
  moreSearchable,
  moreSearchPlaceholder,
  moreMaxHeight,
  rightAction,
  rightActions,
  actionStyle,
  searchable = false,
  isSearching,
  onSearchToggle,
  searchValue,
  onSearchChange,
  onSearchDebounceChange,
  searchPlaceholder,
  onSearchClear,
  searchAutoFocus,
  searchVariant,
  searchContrast,
  searchBorderRadius,
  searchStyle,
  searchContainerStyle,
  searchProps,
  searchContainerMode,
  searchPillStyle,
  searchBg,
  searchBorderColor,
  searchBorderWidth,
  searchCancelText,
  searchCancelStyle,
  searchCancelTextStyle,
  searchBackButtonStyle,
  showSearchCancel = true,
  showSearchBackButton = true,
  customSearchComponent,
  renderSearch,
  suggestions,
  searchSuggestions,
  suggestionsContainerStyle,
  expanded,
  isExpanded,
  onExpandChange,
  expansionPosition = 'both',
  expandedInnerContent,
  renderExpandedInner,
  expandedBottomContent,
  renderExpandedBottom,
  expandedBottomStyle,
  expandedBottomOffset = 14,
  customHeader,
  renderCustomHeader,
  isCustomMode,
  customMode,
  onCustomModeChange,
  replacementScope = 'full',
  bottomContent,
  children,
  transparent = false,
  backgroundColor,
  backgroundOpacity,
  glass: _glass,
  borderBottom,
  contrast,
  borderRadius,
  tintColor,
  style,
  containerStyle,
  leftContainerStyle,
  rightContainerStyle,
  centerContainerStyle,
  capsuleStyle,
  backButtonStyle,
  islandStyle,
}) => {
  const insets = useSafeAreaInsets();
  const { theme: themeColors, radiusTokens, isDark, globalContrast, isGlassTheme } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const isHighContrast = resolvedContrast === 'high';
  const { t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isBottom = placement === 'bottom';
  const effectiveInset = isBottom ? insets.bottom : insets.top;

  const headerContainerHeightStyle = useMemo(
    () => getContainerHeight(effectiveInset, bottomContent ? undefined : ControlSize[size].height + Spacing.xs, isBottom),
    [effectiveInset, bottomContent, isBottom, size]
  );

  const defaultBackTitle = t('common.back', 'Quay lại');
  const defaultMoreLabel = t('common.moreOptions', 'Tùy chọn khác');
  const effectiveBackTitle = backTitle ?? defaultBackTitle;

  // Dynamic border radius synchronized directly with App-wide theme tokens or custom prop
  const isPill = radiusTokens.pill >= 9999 || radiusTokens.control >= 9999;
  const islandRadius = borderRadius !== undefined ? borderRadius : (isPill ? 24 : radiusTokens.card);
  const capsuleRadius = borderRadius !== undefined ? borderRadius : (isPill ? 19 : radiusTokens.control);
  const controlRadius = borderRadius !== undefined ? Math.min(borderRadius, 19) : (isPill ? 19 : radiusTokens.control);
  const backBtnRadius = controlRadius;
  const actionBtnRadius = controlRadius;
  const islandBtnRadius = borderRadius !== undefined ? Math.min(borderRadius, 16) : 16;

  const isCapsuleVariant = variant === 'frosted-capsule';
  const isIslandVariant = variant === 'floating-pill';
  const isStandardVariant = variant === 'standard';
  const collapseEmptyLeft = titleAlign === 'left' && !showBack && !leftAction && !leftActions?.length;
  const effectiveBackStyle = backStyle || (isCapsuleVariant ? 'circle' : 'text');
  const effectiveActionStyle = actionStyle || (isCapsuleVariant ? 'capsule' : 'individual');
  const isCapsuleActions = effectiveActionStyle === 'capsule';
  const effectiveTintColor = tintColor || themeColors.primary;

  // Background and border resolution:
  // Standard variant is 100% solid, opaque by default unless transparent or custom background is passed.
  const defaultStandardBg = isDark ? Colors.dark.card : '#FFFFFF';
  const resolvedBgColor = backgroundColor ?? (isStandardVariant ? defaultStandardBg : 'transparent');
  const shouldRenderBgLayer = !transparent && resolvedBgColor !== 'transparent';
  const showBorderBottom =
    borderBottom !== undefined
      ? borderBottom
      : (isStandardVariant && !transparent);

  const borderPlacementStyle = showBorderBottom
    ? isBottom
      ? isHighContrast
        ? isDark
          ? styles.borderTopHighDark
          : styles.borderTopHighLight
        : isDark
          ? styles.borderTopDark
          : styles.borderTopLight
      : isHighContrast
        ? isDark
          ? styles.borderBottomHighDark
          : styles.borderBottomHighLight
        : isDark
          ? styles.borderBottomDark
          : styles.borderBottomLight
    : null;

  const handleBack = () => {
    haptics.light();
    if (onBack) onBack();
  };

  const handleMore = () => {
    haptics.light();
    if (onMore) {
      onMore();
    } else if (moreActions && moreActions.length > 0) {
      setIsSheetOpen(true);
    }
  };

  const renderAction = (action: AppHeaderAction, index: number) => {
    const isIconOnly = Boolean(action.icon && !action.title);
    return (
      <TouchableOpacity
        key={action.id || index}
        activeOpacity={0.7}
        disabled={action.disabled}
        onPress={() => {
          haptics.light();
          action.onPress();
        }}
        accessibilityLabel={action.accessibilityLabel || action.title}
        style={[
          isIconOnly
            ? isStandardVariant
              ? styles.standardMoreBtn
              : [
                styles.actionCircleBtn,
                isDark ? styles.actionCircleBtnDark : styles.actionCircleBtnLight,
                { borderRadius: actionBtnRadius },
              ]
            : styles.actionTextBtn,
          action.disabled && styles.actionDisabled,
        ]}
      >
        {action.icon}
        {action.title && (
          <AppText style={[styles.actionText, { color: effectiveTintColor }]}>
            {action.title}
          </AppText>
        )}
      </TouchableOpacity>
    );
  };

  const renderCapsuleActionItem = (
    icon: React.ReactNode,
    onPress: () => void,
    key: string | number,
    label?: string,
    disabled?: boolean
  ) => {
    return (
      <TouchableOpacity
        key={key}
        activeOpacity={0.7}
        disabled={disabled}
        onPress={() => {
          haptics.light();
          onPress();
        }}
        accessibilityLabel={label}
        style={[
          styles.capsuleActionItem,
          { borderRadius: Math.max(4, capsuleRadius - 3) },
          disabled && styles.actionDisabled,
        ]}
      >
        {icon}
      </TouchableOpacity>
    );
  };

  const [internalExpanded, setInternalExpanded] = useState(false);
  const controlledExpanded = isExpanded !== undefined ? isExpanded : expanded;
  const isCustomExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const [internalSearching, setInternalSearching] = useState(false);
  const isSearchActive = isSearching !== undefined ? isSearching : internalSearching;

  // Header active state (can be triggered by search mode OR custom expansion)
  const isModeActive = isSearchActive || isCustomExpanded;

  const handleOpenSearch = () => {
    haptics.light();
    if (onSearchToggle) onSearchToggle(true);
    else setInternalSearching(true);
  };

  const handleCloseSearch = useCallback(() => {
    haptics.light();
    if (onSearchToggle) onSearchToggle(false);
    else setInternalSearching(false);
    if (onSearchChange) onSearchChange('');
    if (onSearchClear) onSearchClear();
  }, [onSearchToggle, onSearchChange, onSearchClear]);

  const handleCloseExpansion = useCallback(() => {
    haptics.light();
    if (isSearchActive) {
      handleCloseSearch();
    }
    if (onExpandChange) {
      onExpandChange(false);
    } else {
      setInternalExpanded(false);
    }
  }, [isSearchActive, handleCloseSearch, onExpandChange]);

  const expansionHelpers: AppHeaderExpansionHelpers = useMemo(
    () => ({
      close: handleCloseExpansion,
      isExpanded: isModeActive,
      searchValue: searchValue || '',
      onSearchChange: (text: string) => {
        if (onSearchChange) onSearchChange(text);
      },
    }),
    [handleCloseExpansion, isModeActive, searchValue, onSearchChange]
  );

  const handleCloseCustomMode = useCallback(() => {
    haptics.light();
    if (onCustomModeChange) onCustomModeChange(false);
  }, [onCustomModeChange]);

  const customHelpers: AppHeaderCustomHelpers = useMemo(
    () => ({
      close: handleCloseCustomMode,
      insets,
      isDark,
      themeColors,
    }),
    [handleCloseCustomMode, insets, isDark, themeColors]
  );

  const isCustomControlled = isCustomMode !== undefined ? isCustomMode : customMode;
  const isCustomHeaderActive =
    isCustomControlled !== undefined
      ? isCustomControlled
      : Boolean(customHeader || renderCustomHeader);

  const searchActionItem: AppHeaderAction = {
    id: '__search_btn__',
    icon: (
      <Search
        size={isStandardVariant ? 20 : 18}
        color={tintColor || (isIslandVariant && isDark ? '#FFFFFF' : themeColors.text)}
        strokeWidth={2.2}
      />
    ),
    onPress: handleOpenSearch,
    accessibilityLabel: 'Tìm kiếm',
  };

  // Resolve search appearance: automatically harmonizes with the header's variant by default
  const defaultSearchVariant: import('../surfaceUtils').ControlVariant =
    (isCapsuleVariant || isIslandVariant || _glass || isGlassTheme) ? 'glass' : 'filled';
  const effectiveSearchVariant = searchVariant ?? defaultSearchVariant;
  const effectiveSearchContrast = searchContrast ?? resolvedContrast;

  const defaultSearchRadius = isIslandVariant
    ? islandRadius
    : isCapsuleVariant
      ? capsuleRadius
      : radiusTokens.control;
  const effectiveSearchRadius = searchBorderRadius ?? defaultSearchRadius;

  const defaultSearchBg = effectiveSearchVariant === 'glass'
    ? (isDark ? 'rgba(30, 41, 59, 0.75)' : 'rgba(255, 255, 255, 0.78)')
    : (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.055)');

  const defaultSearchBorderColor = effectiveSearchVariant === 'glass'
    ? (isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.85)')
    : (isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)');

  // -------------------------------------------------------------
  // MORPHING SEARCH HEADER (When Search Mode is Active)
  // -------------------------------------------------------------
  const renderSearchInputField = (isPillContainer: boolean) => {
    if (customSearchComponent) {
      return customSearchComponent;
    }
    if (renderSearch) {
      return renderSearch({
        searchValue: searchValue || '',
        onSearchChange: (text: string) => {
          if (onSearchChange) onSearchChange(text);
        },
        closeSearch: handleCloseSearch,
      });
    }

    if (isPillContainer) {
      const defaultIslandSearchBg =
        searchBg !== undefined
          ? searchBg
          : isDark
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.035)';

      const defaultIslandSearchBorderColor =
        searchBorderColor !== undefined
          ? searchBorderColor
          : isDark
            ? 'rgba(255, 255, 255, 0.12)'
            : 'rgba(0, 0, 0, 0.05)';

      const defaultIslandSearchBorderWidth =
        searchBorderWidth !== undefined ? searchBorderWidth : 1;

      return (
        <AppSearchBar
          size="sm"
          variant={effectiveSearchVariant}
          contrast={effectiveSearchContrast}
          borderRadius={searchBorderRadius ?? (isPill ? 18 : radiusTokens.smControl)}
          value={searchValue}
          onChangeText={onSearchChange}
          onDebounceChange={onSearchDebounceChange}
          placeholder={searchPlaceholder || 'Tìm kiếm...'}
          onClear={onSearchClear}
          autoFocus={searchAutoFocus ?? true}
          backgroundColor={defaultIslandSearchBg}
          borderColor={defaultIslandSearchBorderColor}
          borderWidth={defaultIslandSearchBorderWidth}
          style={StyleSheet.flatten([{ height: 34 }, searchStyle])}
          {...searchProps}
        />
      );
    }

    return (
      <AppSearchBar
        size="sm"
        variant={effectiveSearchVariant}
        contrast={effectiveSearchContrast}
        borderRadius={effectiveSearchRadius}
        value={searchValue}
        onChangeText={onSearchChange}
        onDebounceChange={onSearchDebounceChange}
        placeholder={searchPlaceholder || 'Tìm kiếm...'}
        onClear={onSearchClear}
        autoFocus={searchAutoFocus ?? true}
        backgroundColor={searchBg ?? defaultSearchBg}
        borderColor={searchBorderColor ?? defaultSearchBorderColor}
        borderWidth={searchBorderWidth ?? 1}
        style={searchStyle}
        {...searchProps}
      />
    );
  };

  const renderInnerActiveContent = (isPillContainer: boolean) => {
    if (renderExpandedInner) {
      return renderExpandedInner(expansionHelpers);
    }
    if (expandedInnerContent) {
      return expandedInnerContent;
    }
    return renderSearchInputField(isPillContainer);
  };

  const renderExpandedBottomSlot = () => {
    if (!isModeActive) return null;
    if (expansionPosition === 'inner') return null;

    const filteredSuggestions = suggestions
      ? suggestions.filter(
        (s) =>
          !searchValue ||
          s.label.toLowerCase().includes(searchValue.toLowerCase()) ||
          (s.sublabel && s.sublabel.toLowerCase().includes(searchValue.toLowerCase()))
      )
      : [];

    const hasBottomCustom = Boolean(
      expandedBottomContent ||
      renderExpandedBottom ||
      searchSuggestions ||
      (suggestions && filteredSuggestions.length > 0)
    );

    if (!hasBottomCustom) return null;

    const headerBarHeight = 48 + insets.top;
    const resolvedGap = expandedBottomOffset ?? 14;
    const dynamicPositionStyle = {
      top: headerBarHeight + resolvedGap,
    };

    return (
      <View
        style={[
          styles.suggestionsDropdown,
          isDark ? styles.suggestionsDropdownDark : styles.suggestionsDropdownLight,
          dynamicPositionStyle,
          expandedBottomStyle,
          suggestionsContainerStyle,
        ]}
      >
        <AppScrollView
          style={styles.suggestionsScrollView}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          indicatorThickness={2.5}
        >
          {renderExpandedBottom
            ? renderExpandedBottom(expansionHelpers)
            : expandedBottomContent
              ? expandedBottomContent
              : typeof searchSuggestions === 'function'
                ? searchSuggestions(searchValue || '')
                : searchSuggestions
                  ? searchSuggestions
                  : (
                    <View style={styles.suggestionsList}>
                      {filteredSuggestions.map((item, idx) => (
                        <TouchableOpacity
                          key={item.id || idx}
                          activeOpacity={0.7}
                          onPress={() => {
                            haptics.light();
                            item.onPress();
                          }}
                          style={[
                            styles.suggestionItem,
                            idx > 0 && (isDark ? styles.suggestionBorderDark : styles.suggestionBorderLight),
                          ]}
                        >
                          {item.icon && <View style={styles.suggestionIcon}>{item.icon}</View>}
                          <View style={styles.suggestionTextContainer}>
                            <AppText
                              style={[styles.suggestionLabel, { color: themeColors.text }]}
                              numberOfLines={1}
                            >
                              {item.label}
                            </AppText>
                            {item.sublabel && (
                              <AppText
                                style={[styles.suggestionSublabel, { color: themeColors.textSecondary }]}
                                numberOfLines={1}
                              >
                                {item.sublabel}
                              </AppText>
                            )}
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
        </AppScrollView>
      </View>
    );
  };

  // -------------------------------------------------------------
  // FULL CUSTOM HEADER REPLACEMENT (Thay thế 100% Header ở đúng vị trí Header)
  // -------------------------------------------------------------
  if (isCustomHeaderActive && (customHeader || renderCustomHeader)) {
    const customContent = renderCustomHeader
      ? renderCustomHeader(customHelpers)
      : customHeader;

    if (replacementScope === 'inner' && isIslandVariant) {
      return (
        <View
          style={[
            styles.container,
            styles.floatingContainer,
            headerContainerHeightStyle,
            style,
            containerStyle,
          ]}
        >
          <View
            style={[
              styles.dynamicIslandPill,
              isDark ? styles.dynamicIslandPillDark : styles.dynamicIslandPillLight,
              { borderRadius: islandRadius },
              islandStyle,
            ]}
          >
            {customContent}
          </View>
          {renderExpandedBottomSlot()}
          {bottomContent && (
            <View style={styles.bottomContentContainer}>{bottomContent}</View>
          )}
          {children}
        </View>
      );
    }

    return (
      <View
        style={[
          styles.container,
          headerContainerHeightStyle,
          isCapsuleVariant || transparent ? styles.floatingContainer : null,
          borderPlacementStyle,
          style,
          containerStyle,
        ]}
      >
        {shouldRenderBgLayer && (
          <View
            style={[
              styles.backgroundLayer,
              getHeaderBackgroundStyle(resolvedBgColor, backgroundOpacity),
            ]}
            pointerEvents="none"
          />
        )}
        {customContent}
        {renderExpandedBottomSlot()}
        {bottomContent && (
          <View style={styles.bottomContentContainer}>{bottomContent}</View>
        )}
        {children}
      </View>
    );
  }

  const shouldMorphInner = isModeActive && expansionPosition !== 'bottom';

  if (shouldMorphInner) {
    const isPillSearch =
      searchContainerMode === 'pill' ||
      (searchContainerMode !== 'bar' && isIslandVariant);

    if (isPillSearch) {
      const islandIconColor = tintColor || (isDark ? '#FFFFFF' : themeColors.text);
      const islandBtnStyle = {
        borderRadius: islandBtnRadius,
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.05)',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.08)',
      };

      return (
        <View
          style={[
            styles.container,
            styles.floatingContainer,
            headerContainerHeightStyle,
            style,
            containerStyle,
          ]}
        >
          <View
            style={[
              styles.dynamicIslandPill,
              isDark ? styles.dynamicIslandPillDark : styles.dynamicIslandPillLight,
              { borderRadius: islandRadius },
              islandStyle,
              searchPillStyle,
            ]}
          >
            {showSearchBackButton && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleCloseExpansion}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={[
                  styles.islandBackBtn,
                  islandBtnStyle,
                  backButtonStyle,
                  searchBackButtonStyle,
                ]}
                accessibilityLabel="Đóng"
              >
                <ChevronLeft size={18} color={islandIconColor} strokeWidth={2.4} />
              </TouchableOpacity>
            )}

            <View style={[styles.islandSearchFlex, searchContainerStyle]}>
              {renderInnerActiveContent(true)}
            </View>

            {showSearchCancel && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleCloseExpansion}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={[styles.islandCancelBtn, searchCancelStyle]}
                accessibilityLabel={searchCancelText || t('common.cancel', 'Hủy')}
              >
                <AppText
                  style={[
                    styles.islandCancelText,
                    { color: effectiveTintColor },
                    searchCancelTextStyle,
                  ]}
                >
                  {searchCancelText || t('common.cancel', 'Hủy')}
                </AppText>
              </TouchableOpacity>
            )}
          </View>
          {renderExpandedBottomSlot()}
          {bottomContent && (
            <View style={styles.bottomContentContainer}>{bottomContent}</View>
          )}
          {children}
        </View>
      );
    }

    // Standard Navbar or Capsule Bar Search mode:
    return (
      <View
        style={[
          styles.container,
          headerContainerHeightStyle,
          isCapsuleVariant || transparent ? styles.floatingContainer : null,
          borderPlacementStyle,
          style,
          containerStyle,
        ]}
      >
        {shouldRenderBgLayer && (
          <View
            style={[
              styles.backgroundLayer,
              getHeaderBackgroundStyle(resolvedBgColor, backgroundOpacity),
            ]}
            pointerEvents="none"
          />
        )}

        <View style={[styles.searchHeaderRow, searchContainerStyle]}>
          {showSearchBackButton && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleCloseExpansion}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={[
                styles.searchBackBtn,
                isCapsuleVariant && [
                  styles.actionCircleBtn,
                  isDark ? styles.actionCircleBtnDark : styles.actionCircleBtnLight,
                  { borderRadius: actionBtnRadius },
                ],
                searchBackButtonStyle,
              ]}
              accessibilityLabel="Đóng"
            >
              <ChevronLeft
                size={20}
                color={effectiveTintColor}
                strokeWidth={2.4}
              />
            </TouchableOpacity>
          )}

          <View style={styles.searchBarFlex}>
            {renderInnerActiveContent(false)}
          </View>

          {showSearchCancel && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleCloseExpansion}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={[
                styles.searchCancelBtn,
                isCapsuleVariant && [
                  styles.capsuleCancelBtn,
                  isDark ? styles.capsuleCancelBtnDark : styles.capsuleCancelBtnLight,
                ],
                searchCancelStyle,
              ]}
              accessibilityLabel={searchCancelText || t('common.cancel', 'Hủy')}
            >
              <AppText
                style={[
                  styles.searchCancelText,
                  { color: effectiveTintColor },
                  searchCancelTextStyle,
                ]}
              >
                {searchCancelText || t('common.cancel', 'Hủy')}
              </AppText>
            </TouchableOpacity>
          )}
        </View>
        {renderExpandedBottomSlot()}
        {bottomContent && (
          <View style={styles.bottomContentContainer}>{bottomContent}</View>
        )}
        {children}
      </View>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 2: FLOATING PILL (Unified Dynamic Island Navbar)
  // -------------------------------------------------------------
  if (isIslandVariant) {
    const islandTextColor = isDark ? '#FFFFFF' : themeColors.text;
    const islandSubtextColor = isDark ? 'rgba(255, 255, 255, 0.70)' : themeColors.textSecondary;
    const islandIconColor = tintColor || (isDark ? '#FFFFFF' : themeColors.text);
    const islandBtnStyle = {
      borderRadius: islandBtnRadius,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.05)',
      borderColor: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.08)',
    };

    return (
      <View
        style={[
          styles.container,
          styles.floatingContainer,
          headerContainerHeightStyle,
          style,
          containerStyle,
        ]}
      >
        <View
          style={[
            styles.dynamicIslandPill,
            isDark ? styles.dynamicIslandPillDark : styles.dynamicIslandPillLight,
            { borderRadius: islandRadius },
            islandStyle,
          ]}
        >
          {/* Island Left: Back Button or Left Action */}
          <View style={[styles.islandLeft, collapseEmptyLeft && styles.emptyLeading, leftContainerStyle]}>
            {showBack ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleBack}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={[styles.islandBackBtn, islandBtnStyle, backButtonStyle]}
                accessibilityLabel={effectiveBackTitle}
              >
                <ChevronLeft size={18} color={islandIconColor} strokeWidth={2.4} />
              </TouchableOpacity>
            ) : leftAction ? (
              leftAction
            ) : leftActions?.length ? (
              renderAction(leftActions[0], 0)
            ) : (
              !collapseEmptyLeft && <View style={styles.islandSpacer} />
            )}
          </View>

          {/* Island Center: Custom Component (e.g. AppSelect, SearchBar) OR Title & Subtitle */}
          <View
            style={[
              styles.islandCenter,
              titleAlign === 'left' && styles.alignLeft,
              titleAlign === 'center' && styles.alignCenter,
              titleAlign === 'right' && styles.alignRight,
              centerContainerStyle,
            ]}
          >
            {centerContent ? (
              centerContent
            ) : (
              <>
                {title ? (
                  <AppText
                    style={[
                      styles.islandTitle,
                      titleAlign === 'left' && styles.textLeft,
                      titleAlign === 'right' && styles.textRight,
                      { color: islandTextColor },
                      titleStyle,
                    ]}
                    numberOfLines={1}
                  >
                    {title}
                  </AppText>
                ) : null}
                {subtitle ? (
                  <AppText
                    style={[
                      styles.islandSubtitle,
                      (subtitleAlign || titleAlign) === 'left' && styles.textLeft,
                      (subtitleAlign || titleAlign) === 'right' && styles.textRight,
                      { color: islandSubtextColor },
                      subtitleStyle,
                    ]}
                    numberOfLines={1}
                  >
                    {subtitle}
                  </AppText>
                ) : null}
              </>
            )}
          </View>

          {/* Island Right: Actions and More */}
          <View style={[styles.islandRight, rightContainerStyle]}>
            {rightAction ? (
              rightAction
            ) : (() => {
              const islandActions: AppHeaderAction[] = [
                ...(searchable ? [searchActionItem] : []),
                ...(rightActions || []),
                ...(showMore
                  ? [
                    {
                      id: '__island_more_btn__',
                      icon: <MoreHorizontal size={18} color={islandIconColor} strokeWidth={2.2} />,
                      onPress: handleMore,
                      accessibilityLabel: defaultMoreLabel,
                    },
                  ]
                  : []),
              ];
              if (islandActions.length === 0) return <View style={styles.islandSpacer} />;

              // Support Capsule Action Style inside Dynamic Island
              if (isCapsuleActions && islandActions.length > 1) {
                return (
                  <View
                    style={[
                      styles.islandCapsuleGroup,
                      isDark ? styles.islandCapsuleGroupDark : styles.islandCapsuleGroupLight,
                      { borderRadius: islandBtnRadius },
                      capsuleStyle,
                    ]}
                  >
                    {islandActions.map((action, idx) => (
                      <React.Fragment key={action.id || idx}>
                        {idx > 0 && (
                          <View
                            style={[
                              styles.islandCapsuleDivider,
                              isDark
                                ? styles.islandCapsuleDividerDark
                                : styles.islandCapsuleDividerLight,
                            ]}
                          />
                        )}
                        <TouchableOpacity
                          activeOpacity={0.7}
                          disabled={action.disabled}
                          onPress={() => {
                            haptics.light();
                            action.onPress();
                          }}
                          accessibilityLabel={action.accessibilityLabel || action.title}
                          style={[
                            styles.islandCapsuleItem,
                            action.disabled && styles.actionDisabled,
                          ]}
                        >
                          {action.icon}
                        </TouchableOpacity>
                      </React.Fragment>
                    ))}
                  </View>
                );
              }

              // Individual Action Style
              return islandActions.map((action, idx) => (
                <TouchableOpacity
                  key={action.id || idx}
                  activeOpacity={0.7}
                  disabled={action.disabled}
                  onPress={() => {
                    haptics.light();
                    action.onPress();
                  }}
                  accessibilityLabel={action.accessibilityLabel || action.title}
                  style={[
                    styles.islandActionBtn,
                    islandBtnStyle,
                    action.disabled && styles.actionDisabled,
                  ]}
                >
                  {action.icon}
                </TouchableOpacity>
              ));
            })()}
          </View>
        </View>

        {/* ActionSheet when moreActions are provided */}
        {moreActions && moreActions.length > 0 && (
          <AppActionSheet
            visible={isSheetOpen}
            onClose={() => setIsSheetOpen(false)}
            title={moreTitle || title}
            message={moreMessage}
            actions={moreActions}
            searchable={moreSearchable}
            searchPlaceholder={moreSearchPlaceholder}
            maxHeight={moreMaxHeight}
          />
        )}

        {/* Expanded Bottom Slot (Suggestions or custom bottom dropdown) */}
        {renderExpandedBottomSlot()}

        {/* Bottom Dock Content (Chips, Tabs, Secondary Bar) */}
        {bottomContent && (
          <View style={styles.bottomContentContainer}>
            {bottomContent}
          </View>
        )}
        {children}
      </View>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 1 (FROSTED CAPSULE) & VARIANT 3 (STANDARD NAVBAR)
  // -------------------------------------------------------------
  const isCenterMode = titleAlign === 'center';

  const allRightActionList: AppHeaderAction[] = [
    ...(searchable ? [searchActionItem] : []),
    ...(rightActions || []),
    ...(showMore
      ? [
        {
          id: '__more_btn__',
          icon: <MoreHorizontal size={18} color={themeColors.text} strokeWidth={2.2} />,
          onPress: handleMore,
          accessibilityLabel: defaultMoreLabel,
          title: undefined,
          disabled: false,
        },
      ]
      : []),
  ];

  const leftClearance = showBack
    ? effectiveBackStyle === 'text'
      ? (backTitle ? 84 : 70)
      : 44
    : leftAction
      ? 44
      : leftActions?.length
        ? leftActions.length * 36 + 12
        : 16;

  const rightClearance = allRightActionList.length > 0
    ? isCapsuleActions
      ? allRightActionList.length * 32 + 20
      : allRightActionList.length * 36 + 12
    : showMore
      ? 44
      : rightAction
        ? 44
        : 16;

  return (
    <View
      style={[
        styles.container,
        headerContainerHeightStyle,
        isCapsuleVariant || transparent ? styles.floatingContainer : null,
        borderPlacementStyle,
        style,
        containerStyle,
      ]}
    >
      {/* 0. Background Layer with independent opacity (keeps titles & buttons 100% crisp) */}
      {shouldRenderBgLayer && (
        <View
          style={[
            styles.backgroundLayer,
            getHeaderBackgroundStyle(resolvedBgColor, backgroundOpacity),
          ]}
          pointerEvents="none"
        />
      )}

      {/* 1. Left Slot: Back Button / Custom Left Actions */}
      <View style={[styles.leftContainer, collapseEmptyLeft && styles.emptyLeading, leftContainerStyle]}>
        {showBack ? (
          effectiveBackStyle === 'circle' ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleBack}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={[
                styles.backCircleBtn,
                isDark ? styles.backCircleBtnDark : styles.backCircleBtnLight,
                { borderRadius: backBtnRadius },
                backButtonStyle,
              ]}
              accessibilityLabel={effectiveBackTitle}
            >
              <ChevronLeft
                size={20}
                color={tintColor || (isDark ? '#FFFFFF' : themeColors.text)}
                strokeWidth={2.4}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleBack}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={[styles.iosBackBtn, backButtonStyle]}
              accessibilityLabel={effectiveBackTitle}
            >
              <ChevronLeft size={24} color={effectiveTintColor} strokeWidth={2.4} />
              {(backTitle || variant === 'standard') ? (
                <AppText style={[styles.iosBackText, { color: effectiveTintColor }]}>
                  {effectiveBackTitle}
                </AppText>
              ) : null}
            </TouchableOpacity>
          )
        ) : leftAction ? (
          leftAction
        ) : leftActions?.length ? (
          leftActions.map(renderAction)
        ) : null}
      </View>

      {/* 2. Center Slot: Custom Component (e.g. AppSelect, SearchBar) OR Title & Subtitle */}
      <View
        style={[
          isCenterMode && !centerContent
            ? [
              styles.centerAbsolute,
              getCenterTitlePadding(insets.top, leftClearance, rightClearance),
            ]
            : styles.centerFlex,
          titleAlign === 'left' && styles.alignLeft,
          titleAlign === 'center' && styles.alignCenter,
          titleAlign === 'right' && styles.alignRight,
          centerContainerStyle,
        ]}
        pointerEvents={isCenterMode && !centerContent ? 'none' : 'auto'}
      >
        {centerContent ? (
          centerContent
        ) : (
          <>
            {title ? (
              <AppText
                style={[
                  styles.title,
                  titleAlign === 'left' && styles.textLeft,
                  titleAlign === 'right' && styles.textRight,
                  { color: themeColors.text },
                  titleStyle,
                ]}
                numberOfLines={1}
              >
                {title}
              </AppText>
            ) : null}
            {subtitle ? (
              <AppText
                style={[
                  styles.subtitle,
                  (subtitleAlign || titleAlign) === 'left' && styles.textLeft,
                  (subtitleAlign || titleAlign) === 'right' && styles.textRight,
                  { color: themeColors.textSecondary },
                  subtitleStyle,
                ]}
                numberOfLines={1}
              >
                {subtitle}
              </AppText>
            ) : null}
          </>
        )}
      </View>

      {/* 3. Right Slot: Frosted Capsule / Standard Actions / More Button */}
      <View style={[styles.rightContainer, rightContainerStyle]}>
        {rightAction ? (
          rightAction
        ) : isCapsuleActions && allRightActionList.length > 0 ? (
          <View
            style={[
              styles.capsuleActionGroup,
              isStandardVariant
                ? isDark
                  ? styles.capsuleStandardDark
                  : styles.capsuleStandardLight
                : isDark
                  ? styles.capsuleActionGroupDark
                  : styles.capsuleActionGroupLight,
              { borderRadius: capsuleRadius },
              capsuleStyle,
            ]}
          >
            {allRightActionList.map((action, idx) => (
              <React.Fragment key={action.id || idx}>
                {idx > 0 && (
                  <View
                    style={[
                      styles.capsuleActionDivider,
                      isDark ? styles.capsuleActionDividerDark : styles.capsuleActionDividerLight,
                    ]}
                  />
                )}
                {renderCapsuleActionItem(
                  action.icon,
                  action.onPress,
                  action.id || idx,
                  action.accessibilityLabel || action.title,
                  action.disabled
                )}
              </React.Fragment>
            ))}
          </View>
        ) : rightActions?.length ? (
          rightActions.map(renderAction)
        ) : showMore ? (
          isStandardVariant ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleMore}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={styles.standardMoreBtn}
              accessibilityLabel={defaultMoreLabel}
            >
              <MoreHorizontal size={22} color={effectiveTintColor} strokeWidth={2.2} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleMore}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={[
                styles.actionCircleBtn,
                isDark ? styles.actionCircleBtnDark : styles.actionCircleBtnLight,
                { borderRadius: actionBtnRadius },
              ]}
              accessibilityLabel={defaultMoreLabel}
            >
              <MoreHorizontal size={20} color={themeColors.text} strokeWidth={2.2} />
            </TouchableOpacity>
          )
        ) : null}
      </View>

      {/* Pop-up ActionSheet when tapping ... More button (if moreActions provided) */}
      {moreActions && moreActions.length > 0 && (
        <AppActionSheet
          visible={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          title={moreTitle || title}
          message={moreMessage}
          contrast={resolvedContrast}
          actions={moreActions}
          searchable={moreSearchable}
          searchPlaceholder={moreSearchPlaceholder}
          maxHeight={moreMaxHeight}
        />
      )}

      {/* Expanded Bottom Slot (Suggestions or custom bottom dropdown) */}
      {renderExpandedBottomSlot()}

      {/* Bottom Dock Content (Chips, Tabs, Secondary Bar) */}
      {bottomContent && (
        <View style={styles.bottomContentContainer}>{bottomContent}</View>
      )}
      {children}
    </View>
  );
});

export const AppHeaderContainer = HeaderContainer;
export type { HeaderContainerProps as AppHeaderContainerProps } from './components/HeaderContainer';

export const AppHeader = Object.assign(AppHeaderComponent, {
  BackButton: HeaderBackButton,
  ActionGroup: HeaderActionGroup,
  Title: HeaderTitle,
  SearchRow: HeaderSearchRow,
  Dropdown: HeaderDropdownSuggestions,
  Container: AppHeaderContainer,
});

