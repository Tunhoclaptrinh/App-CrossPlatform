import { useState, useEffect, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export interface NetworkStatus {
  isConnected: boolean;
  isChecking: boolean;
  checkConnection: () => Promise<boolean>;
}

/**
 * Hook kiểm tra trạng thái kết nối Internet (Online / Offline)
 * Tự động kiểm tra lại khi người dùng quay lại ứng dụng từ background.
 */
export function useNetworkStatus(pingUrl: string = 'https://clients3.google.com/generate_204'): NetworkStatus {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  const checkConnection = useCallback(async (): Promise<boolean> => {
    setIsChecking(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const targetUrl = `${pingUrl}?_t=${Date.now()}`;
      const res = await fetch(targetUrl, {
        method: 'HEAD',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const online = res.status >= 200 && res.status < 400;
      setIsConnected(online);
      return online;
    } catch {
      setIsConnected(false);
      return false;
    } finally {
      setIsChecking(false);
    }
  }, [pingUrl]);

  useEffect(() => {
    checkConnection();

    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === 'active') {
        checkConnection();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [checkConnection]);

  return { isConnected, isChecking, checkConnection };
}
