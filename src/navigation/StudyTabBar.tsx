import React, { useContext, useLayoutEffect, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs';
import {
  BookOpen,
  CalendarDays,
  House,
  ListTodo,
  UserRound,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { AppBottomNav } from '@/components/common/AppBottomNav';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useAppStore } from '@/hooks/useAppStore';
import { createTabBarStyles, getStudyTabBarHeight } from './styles';
const icons = {
  Overview: House,
  Courses: BookOpen,
  Timetable: CalendarDays,
  Assignments: ListTodo,
  Profile: UserRound,
};
const titles = {
  Overview: 'overview',
  Courses: 'courses',
  Timetable: 'timetable',
  Assignments: 'assignments',
  Profile: 'profile',
} as const;

export function StudyTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { t } = useTranslation();
  const { isGlassTheme, radiusTokens, globalControlSize } = useThemeMode();
  const { bottom } = useSafeAreaInsets();
  const styles = useMemo(
    () => createTabBarStyles(globalControlSize, isGlassTheme, bottom),
    [globalControlSize, isGlassTheme, bottom],
  );
  const { isKeyboardVisible } = useKeyboard();
  const onHeightChange = useContext(BottomTabBarHeightCallbackContext);
  const height = getStudyTabBarHeight(globalControlSize, isGlassTheme, bottom);
  useLayoutEffect(() => {
    onHeightChange?.(isKeyboardVisible ? 0 : height);
  }, [onHeightChange, isKeyboardVisible, height]);
  const enabled = useAppStore(s => s.hapticsEnabled);
  const items = state.routes.map(route => {
    const name = route.name as keyof typeof icons;
    const Icon = icons[name];
    return {
      key: route.key,
      label: t(`study.${titles[name]}`),
      icon: <Icon pointerEvents="none" />,
      accessibilityLabel:
        descriptors[route.key].options.tabBarAccessibilityLabel ??
        t(`study.${titles[name]}`),
      onLongPress: () =>
        navigation.emit({ type: 'tabLongPress', target: route.key }),
    };
  });
  if (isKeyboardVisible) return null;
  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <AppBottomNav
        items={items}
        activeKey={state.routes[state.index].key}
        variant={isGlassTheme ? 'frosted-glass' : 'standard'}
        indicatorStyle="pill"
        borderRadius={isGlassTheme ? radiusTokens.pill : undefined}
        size={globalControlSize}
        hapticFeedback={enabled}
        onChange={key => {
          const route = state.routes.find(item => item.key === key);
          if (!route) return;
          const event = navigation.emit({
            type: 'tabPress',
            target: key,
            canPreventDefault: true,
          });
          if (!event.defaultPrevented && key !== state.routes[state.index].key)
            navigation.navigate(route.name, route.params);
        }}
      />
    </View>
  );
}

// React Navigation invokes tabBar as a renderer, so mount a component for hooks.
export const renderStudyTabBar = (props: BottomTabBarProps) => (
  <StudyTabBar {...props} />
);
