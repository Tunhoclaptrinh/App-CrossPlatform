import { useRef, useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useBackHandler } from './useBackHandler';
import { useToast } from '@/components/toast';

/**
 * Hook xử lý nhấn nút Back 2 lần để thoát ứng dụng (chuẩn trải nghiệm Android)
 * Thường gắn tại HomeScreen để tránh vô tình thoát app.
 * 
 * @param exitMessage Thông báo nhắc nhở (mặc định: 'Nhấn lần nữa để thoát ứng dụng')
 * @param delay Khoảng thời gian cho phép giữa 2 lần nhấn (ms, mặc định 2000ms)
 * 
 * @example
 * // Trong HomeScreen.tsx:
 * useDoubleBackExit();
 */
export function useDoubleBackExit(
  exitMessage: string = 'Nhấn lần nữa để thoát ứng dụng',
  delay: number = 2000
) {
  const toast = useToast();
  const lastPressRef = useRef<number>(0);

  const handleBack = useCallback(() => {
    const now = Date.now();
    if (now - lastPressRef.current < delay) {
      BackHandler.exitApp();
      return true;
    }

    lastPressRef.current = now;
    toast.show({
      type: 'info',
      message: exitMessage,
      duration: delay,
    });
    return true;
  }, [delay, exitMessage, toast]);

  useBackHandler(handleBack);
}