import type { ScrollViewProps, StyleProp, ViewStyle, Insets } from 'react-native';

export type IndicatorMode = 'faint-to-bright' | 'auto-fade' | 'always-visible' | 'hidden';

export interface IndicatorInsets {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export interface AppScrollViewProps extends ScrollViewProps {
  /**
   * Whether custom scroll indicator is enabled.
   * Defaults to true.
   */
  indicatorVisible?: boolean;

  /**
   * Indicator display mode:
   * - 'faint-to-bright' (default): idle is faint (default 0.25), active scroll is bright (0.85).
   * - 'auto-fade': idle is invisible (0), active scroll is bright (0.85).
   * - 'always-visible': always bright (0.85).
   * - 'hidden': indicator never displays.
   */
  indicatorMode?: IndicatorMode;

  /**
   * Indicator thickness in pixels (width for vertical, height for horizontal).
   * Default: 3.5 for vertical, 3.0 for horizontal.
   */
  indicatorThickness?: number;

  /**
   * Fixed length of the thumb (height for vertical, width for horizontal).
   * Overrides dynamic length calculation.
   */
  indicatorLength?: number;

  /**
   * Minimum length (height for vertical, width for horizontal) of the thumb.
   * Default: 32 for vertical, 24 for horizontal.
   */
  minIndicatorLength?: number;

  /**
   * Maximum length (height for vertical, width for horizontal) of the thumb.
   * Keeps the thumb compact and prevents it from stretching excessively.
   * Default: 54 for vertical, 38 for horizontal.
   */
  maxIndicatorLength?: number;

  /**
   * Custom color for the indicator thumb.
   * If omitted, adapts dynamically to theme (dark mode vs light mode).
   */
  indicatorColor?: string;

  /**
   * Insets around the indicator track.
   * Default for vertical: { top: 6, bottom: 6, right: 3 }
   * Default for horizontal: { left: 6, right: 6, bottom: 2 }
   */
  indicatorInsets?: IndicatorInsets;

  /**
   * Custom style for the indicator thumb.
   */
  indicatorThumbStyle?: StyleProp<ViewStyle>;

  /**
   * Whether to show a subtle track behind the thumb.
   * Default: false.
   */
  showTrack?: boolean;

  /**
   * Custom track color when showTrack is true.
   */
  trackColor?: string;

  /**
   * Idle opacity when not scrolling.
   * Default: 0.25 (mờ).
   */
  idleOpacity?: number;

  /**
   * Active opacity while scrolling.
   * Default: 0.85 (rõ).
   */
  activeOpacity?: number;

  /**
   * Milliseconds after scrolling stops before fading back to idle opacity.
   * Default: 800.
   */
  idleTimeoutMs?: number;

  /**
   * Custom style for the outer container wrapping ScrollView and indicator.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Whether the indicator thumb can be touched and dragged to fast-scroll the page.
   * When true, uses PanResponder with smart non-blocking tap detection.
   * When false, reverts to pure visual indicator (pointerEvents="none") with 0 gesture overhead.
   * Default: true.
   */
  draggableIndicator?: boolean;

  /**
   * Custom hitSlop around the thumb to make grabbing effortless on touchscreens.
   * Defaults to smart edges (vertical: { top: 8, bottom: 8, left: 24, right: 12 }, horizontal: { top: 20, bottom: 8, left: 8, right: 8 }).
   */
  dragHitSlop?: Insets | number;

  /**
   * Whether to enlarge and highlight the thumb when actively dragged.
   * Default: true.
   */
  enableGrabFeedback?: boolean;

  /**
   * Callback fired when thumb dragging starts.
   */
  onDragStart?: () => void;

  /**
   * Callback fired when thumb dragging ends.
   */
  onDragEnd?: () => void;
}
