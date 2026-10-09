import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { AppText } from '../../AppText';
import { haptics } from '@/utils/haptics';
import { styles } from '../styles';
import type { AppHeaderAction, AppHeaderActionStyle, AppHeaderVariant } from '../types';

export interface HeaderActionGroupProps {
  actions: AppHeaderAction[];
  style?: AppHeaderActionStyle;
  variant?: AppHeaderVariant;
  isDark?: boolean;
  tintColor?: string;
  capsuleRadius?: number;
  actionRadius?: number;
  capsuleStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const HeaderActionGroup: React.FC<HeaderActionGroupProps> = React.memo(({
  actions,
  style = 'individual',
  variant = 'standard',
  isDark = false,
  tintColor,
  capsuleRadius = 19,
  actionRadius = 19,
  capsuleStyle,
  containerStyle,
}) => {
  const isIsland = variant === 'floating-pill';
  const isCapsule = style === 'capsule';
  const isStandard = variant === 'standard';
  const effectiveTintColor = tintColor || (isDark ? '#38BDF8' : '#007AFF');

  if (!actions || actions.length === 0) {
    if (isIsland) {
      return <View style={styles.islandSpacer} />;
    }
    return null;
  }

  // 1. Dynamic Island Capsule Mode
  if (isIsland && isCapsule && actions.length > 1) {
    return (
      <View
        style={[
          styles.islandCapsuleGroup,
          isDark ? styles.islandCapsuleGroupDark : styles.islandCapsuleGroupLight,
          capsuleStyle,
          containerStyle,
        ]}
      >
        {actions.map((action, idx) => (
          <React.Fragment key={action.id || idx}>
            {idx > 0 && (
              <View
                style={[
                  styles.islandCapsuleDivider,
                  isDark ? styles.islandCapsuleDividerDark : styles.islandCapsuleDividerLight,
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

  // 2. Dynamic Island Individual Mode
  if (isIsland) {
    const islandBtnStyle = {
      borderRadius: 16,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.05)',
      borderColor: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.08)',
    };

    return (
      <View style={[localStyles.islandRow, containerStyle]}>
        {actions.map((action, idx) => (
          <TouchableOpacity
            key={action.id || idx}
            activeOpacity={0.7}
            disabled={action.disabled}
            onPress={() => {
              haptics.light();
              action.onPress();
            }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityLabel={action.accessibilityLabel || action.title}
            style={[
              styles.islandActionBtn,
              islandBtnStyle,
              action.disabled && styles.actionDisabled,
            ]}
          >
            {action.icon}
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  // 3. Standard / Frosted Capsule Actions Mode
  if (isCapsule && actions.length > 0) {
    return (
      <View
        style={[
          styles.capsuleActionGroup,
          isStandard
            ? isDark
              ? styles.capsuleStandardDark
              : styles.capsuleStandardLight
            : isDark
              ? styles.capsuleActionGroupDark
              : styles.capsuleActionGroupLight,
          { borderRadius: capsuleRadius },
          capsuleStyle,
          containerStyle,
        ]}
      >
        {actions.map((action, idx) => (
          <React.Fragment key={action.id || idx}>
            {idx > 0 && (
              <View
                style={[
                  styles.capsuleActionDivider,
                  isDark
                    ? styles.capsuleActionDividerDark
                    : styles.capsuleActionDividerLight,
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
                styles.capsuleActionItem,
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

  // 4. Individual Actions Style (Matches original renderAction 100%)
  return (
    <View style={[localStyles.standardRow, containerStyle]}>
      {actions.map((action, idx) => {
        const isIconOnly = Boolean(action.icon && !action.title);

        return (
          <TouchableOpacity
            key={action.id || idx}
            activeOpacity={0.7}
            disabled={action.disabled}
            onPress={() => {
              haptics.light();
              action.onPress();
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel={action.accessibilityLabel || action.title}
            style={[
              isIconOnly
                ? isStandard
                  ? styles.standardMoreBtn
                  : [
                    styles.actionCircleBtn,
                    isDark ? styles.actionCircleBtnDark : styles.actionCircleBtnLight,
                    { borderRadius: actionRadius },
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
      })}
    </View>
  );
});

const localStyles = StyleSheet.create({
  islandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  standardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});

HeaderActionGroup.displayName = 'HeaderActionGroup';
