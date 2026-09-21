import { useState, useRef, useCallback } from 'react';
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

export interface UseShakeDetectionOptions {
  onShake?: () => void;
  threshold?: number;
  timeout?: number;
}

export interface UseShakeDetectionResult {
  shakeCount: number;
  lastShakeTime: number | null;
  simulateShake: () => void;
  resetShakeCount: () => void;
}

/**
 * Universal Shake Detection Hook (Device Motion Gesture)
 * Nhận diện chuyển động lắc điện thoại, kích hoạt rung phản hồi xúc giác Haptics
 * và cung cấp hàm mô phỏng lắc máy tiện lợi cho kiểm thử / lập trình viên.
 */
export function useShakeDetection(options: UseShakeDetectionOptions = {}): UseShakeDetectionResult {
  const { onShake, timeout = 1000 } = options;
  const [shakeCount, setShakeCount] = useState<number>(0);
  const [lastShakeTime, setLastShakeTime] = useState<number | null>(null);
  const lastTriggerRef = useRef<number>(0);

  const triggerShake = useCallback(() => {
    const now = Date.now();
    if (now - lastTriggerRef.current < timeout) {
      return; // Đang trong thời gian cooldown
    }

    lastTriggerRef.current = now;
    haptics.heavy();
    setShakeCount((prev) => prev + 1);
    setLastShakeTime(now);

    if (onShake) {
      onShake();
    }
  }, [onShake, timeout]);

  const resetShakeCount = useCallback(() => {
    setShakeCount(0);
    setLastShakeTime(null);
  }, []);

  return {
    shakeCount,
    lastShakeTime,
    simulateShake: triggerShake,
    resetShakeCount,
  };
}
