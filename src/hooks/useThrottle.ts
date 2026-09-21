import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook gioi han tan suat cap nhat gia tri (Throttle Value)
 * 
 * @example
 * const throttledScrollY = useThrottle(scrollY, 200);
 */
export function useThrottle<T>(value: T, limitMs: number = 300): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limitMs) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limitMs - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limitMs]);

  return throttledValue;
}

/**
 * Hook gioi han tan suat goi ham (Throttle Callback)
 * Rat huu ich de chong spam click lien tuc vao nut Goi / Mua hang / Submit API.
 * 
 * @example
 * const handleBuyPress = useThrottleCallback(() => {
 *   callPaymentApi();
 * }, 1500); // Chi cho phep kich hoat 1 lan moi 1.5 giay
 */
export function useThrottleCallback<T extends (...args: any[]) => any>(
  callback: T,
  limitMs: number = 500
): (...args: Parameters<T>) => void {
  const lastRan = useRef<number>(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastRan.current >= limitMs) {
        lastRan.current = now;
        callback(...args);
      }
    },
    [callback, limitMs]
  );
}
