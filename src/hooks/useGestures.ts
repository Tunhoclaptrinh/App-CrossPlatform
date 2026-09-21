import { useRef, useCallback } from 'react';
import { PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import { haptics } from '@/utils/haptics';

export interface SwipeCallbacks {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
}

/**
 * Hook xử lý nhận diện cử chỉ Vuốt (Swipe) 4 hướng bằng PanResponder chuẩn New Architecture
 */
export function useSwipeGesture({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 40,
}: SwipeCallbacks) {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;
        return Math.abs(dx) > 10 || Math.abs(dy) > 10;
      },
      onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
        const { dx, dy } = gestureState;

        if (Math.abs(dx) > Math.abs(dy)) {
          // Vuốt theo trục ngang
          if (dx > threshold && onSwipeRight) {
            haptics.light();
            onSwipeRight();
          } else if (dx < -threshold && onSwipeLeft) {
            haptics.light();
            onSwipeLeft();
          }
        } else {
          // Vuốt theo trục dọc
          if (dy > threshold && onSwipeDown) {
            haptics.light();
            onSwipeDown();
          } else if (dy < -threshold && onSwipeUp) {
            haptics.light();
            onSwipeUp();
          }
        }
      },
    })
  ).current;

  return panResponder.panHandlers;
}

/**
 * Hook nhận diện Chạm đúp (Double Tap)
 */
export function useDoubleTap(onDoubleTap: () => void, delay: number = 300) {
  const lastTapRef = useRef<number>(0);

  const handlePress = useCallback(
    (_event?: GestureResponderEvent) => {
      const now = Date.now();
      if (lastTapRef.current && now - lastTapRef.current < delay) {
        haptics.success();
        onDoubleTap();
        lastTapRef.current = 0;
      } else {
        lastTapRef.current = now;
      }
    },
    [delay, onDoubleTap]
  );

  return handlePress;
}
