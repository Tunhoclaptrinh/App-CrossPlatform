import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, MoreHorizontal } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { AppText } from '../AppText';
import { AppActionSheet } from '../AppActionSheet';
import { useThemeMode } from '@/hooks/useThemeMode';
import { Colors } from '@/constants/colors';
import { haptics } from '@/utils/haptics';
import type { AppHeaderProps, AppHeaderAction } from './types';
import {
  styles,
  getHeaderBackgroundStyle,
  getCenterTitlePadding,
  getContainerHeight,
} from './styles';

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  titleAlign = 'center',
  titleStyle,
  subtitleStyle,
  variant = 'standard',
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
  rightAction,
  rightActions,
  actionStyle,
  transparent = false,
  backgroundColor,
  backgroundOpacity,
  glass: _glass,
  borderBottom,
  contrast,
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
  const { theme: themeColors, radiusTokens, isDark, globalContrast } = useThemeMode();
  const resolvedContrast = contrast ?? globalContrast;
  const isHighContrast = resolvedContrast === 'high';
  const { t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const defaultBackTitle = t('common.back', 'Quay lại');
  const defaultMoreLabel = t('common.moreOptions', 'Tùy chọn khác');
  const effectiveBackTitle = backTitle ?? defaultBackTitle;

  // Dynamic border radius synchronized directly with App-wide theme tokens
  const isPill = radiusTokens.pill >= 9999 || radiusTokens.control >= 9999;
  const islandRadius = isPill ? 24 : radiusTokens.card;
  const capsuleRadius = isPill ? 19 : radiusTokens.control;
  const controlRadius = isPill ? 19 : radiusTokens.control;
  const backBtnRadius = controlRadius;
  const actionBtnRadius = controlRadius;
  const islandBtnRadius = isPill ? 16 : radiusTokens.smControl;

  const isCapsuleVariant = variant === 'frosted-capsule';
  const isIslandVariant = variant === 'floating-pill';
  const isStandardVariant = variant === 'standard';
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
          getContainerHeight(insets.top),
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
          <View style={[styles.islandLeft, leftContainerStyle]}>
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
              <View style={styles.islandSpacer} />
            )}
          </View>

          {/* Island Center: Title & Subtitle */}
          <View style={[styles.islandCenter, centerContainerStyle]}>
            <AppText
              style={[styles.islandTitle, { color: islandTextColor }, titleStyle]}
              numberOfLines={1}
            >
              {title}
            </AppText>
            {subtitle ? (
              <AppText
                style={[styles.islandSubtitle, { color: islandSubtextColor }, subtitleStyle]}
                numberOfLines={1}
              >
                {subtitle}
              </AppText>
            ) : null}
          </View>

          {/* Island Right: Actions and More */}
          <View style={[styles.islandRight, rightContainerStyle]}>
            {rightAction ? (
              rightAction
            ) : (() => {
              const islandActions: AppHeaderAction[] = [
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
              if (isCapsuleActions) {
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
          />
        )}
      </View>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 1 (FROSTED CAPSULE) & VARIANT 3 (STANDARD NAVBAR)
  // -------------------------------------------------------------
  const isCenterMode = titleAlign === 'center';

  const allRightActionList: AppHeaderAction[] = [
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
      ? (backTitle ? 108 : 92)
      : 52
    : leftAction
    ? 52
    : leftActions?.length
    ? leftActions.length * 40 + 16
    : 16;

  const rightClearance = allRightActionList.length > 0
    ? isCapsuleActions
      ? allRightActionList.length * 32 + 28
      : allRightActionList.length * 40 + 16
    : showMore
    ? 52
    : rightAction
    ? 52
    : 16;

  const titleClearance = Math.max(leftClearance, rightClearance, 72);

  return (
    <View
      style={[
        styles.container,
        getContainerHeight(insets.top),
        isCapsuleVariant || transparent ? styles.floatingContainer : null,
        showBorderBottom
          ? isHighContrast
            ? isDark
              ? styles.borderBottomHighDark
              : styles.borderBottomHighLight
            : isDark
              ? styles.borderBottomDark
              : styles.borderBottomLight
          : null,
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
      <View style={[styles.leftContainer, leftContainerStyle]}>
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

      {/* 2. Center / Title Slot */}
      <View
        style={[
          isCenterMode
            ? [
              styles.centerAbsolute,
              getCenterTitlePadding(insets.top, titleClearance),
            ]
            : styles.centerFlex,
          titleAlign === 'left' && styles.alignLeft,
          titleAlign === 'center' && styles.alignCenter,
          titleAlign === 'right' && styles.alignRight,
          centerContainerStyle,
        ]}
        pointerEvents={isCenterMode ? 'none' : 'auto'}
      >
        <AppText
          style={[styles.title, { color: themeColors.text }, titleStyle]}
          numberOfLines={1}
        >
          {title}
        </AppText>
        {subtitle ? (
          <AppText
            style={[styles.subtitle, { color: themeColors.textSecondary }, subtitleStyle]}
            numberOfLines={1}
          >
            {subtitle}
          </AppText>
        ) : null}
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
        />
      )}
    </View>
  );
};
