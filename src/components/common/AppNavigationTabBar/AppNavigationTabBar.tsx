import React from 'react';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useThemeMode } from '@/hooks/useThemeMode';
import { AppBottomNav } from '../AppBottomNav';
import { resolveSurfaceColors } from '../surfaceUtils';
import type { AppNavigationTabBarProps } from './types';

export const AppNavigationTabBar = React.memo(function AppNavigationTabBarComponent({
  state,
  navigation,
  items,
  surface = 'theme',
  variant = 'standard',
  hideOnKeyboard = true,
}: AppNavigationTabBarProps) {
  const { theme, isDark } = useThemeMode();
  const { isKeyboardVisible } = useKeyboard();
  const colors = resolveSurfaceColors(theme, isDark, surface);
  return (
    <AppBottomNav
      variant={variant}
      backgroundColor={colors.card}
      activeColor={colors.primary}
      activeKey={state.routes[state.index].name}
      hidden={hideOnKeyboard && isKeyboardVisible}
      items={items
        .filter(item => state.routes.some(route => route.name === item.key))
        .map(item => ({
          ...item,
          onLongPress: () => {
            const route = state.routes.find(
              candidate => candidate.name === item.key,
            );
            if (route)
              navigation.emit({ type: 'tabLongPress', target: route.key });
          },
        }))}
      onChange={name => {
        const route = state.routes.find(candidate => candidate.name === name);
        if (!route) return;
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });
        if (
          !event.defaultPrevented &&
          route.key !== state.routes[state.index].key
        ) {
          navigation.navigate(route.name, route.params);
        }
      }}
    />
  );
});
