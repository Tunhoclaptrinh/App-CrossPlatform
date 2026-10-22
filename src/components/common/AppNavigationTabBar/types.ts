import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { BottomNavItem, AppBottomNavProps } from '../AppBottomNav';
import type { SurfaceMode } from '../surfaceUtils';

export interface AppNavigationTabBarProps
  extends Pick<BottomTabBarProps, 'state' | 'navigation'> {
  /** Keys are route names; navigator route keys remain internal to the adapter. */
  items: Omit<BottomNavItem, 'onPress' | 'onLongPress'>[];
  surface?: SurfaceMode;
  variant?: AppBottomNavProps['variant'];
  hideOnKeyboard?: boolean;
}
