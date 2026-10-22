import type { ReactNode } from 'react';
import type { AppHeaderProps } from '../AppHeader';
import type { ScreenWrapperProps } from '../ScreenWrapper';
import type { SurfaceMode } from '../surfaceUtils';

export interface AppScreenLayoutProps
  extends Omit<
    ScreenWrapperProps,
    'header' | 'footer' | 'edges' | 'disableMeshBackground' | 'backgroundColor'
  > {
  header: AppHeaderProps;
  footer?: ReactNode;
  /** Solid chrome or the current theme, without changing persisted preferences. */
  surface?: SurfaceMode;
  /** Set false when a navigator's tab bar owns the bottom safe area. */
  bottomInset?: boolean;
}
