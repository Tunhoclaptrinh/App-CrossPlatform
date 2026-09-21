import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

/**
 * Hook theo dõi vòng đời ứng dụng (đang mở active, chạy nền background, hay inactive)
 * Thường dùng để: Refresh dữ liệu khi người dùng mở lại app, dừng video/audio khi ẩn app,
 * hoặc yêu cầu quét FaceID / vân tay sau khi quay lại màn hình.
 * 
 * @example
 * const { appState, isForeground } = useAppState((status) => {
 *   if (status === 'active') {
 *     console.log('App vừa quay lại màn hình chính -> tự động tải lại dữ liệu!');
 *   }
 * });
 */
export function useAppState(onChange?: (status: AppStateStatus) => void) {
  const [appState, setAppState] = useState<AppStateStatus>(
    (AppState.currentState as AppStateStatus) || 'active'
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      setAppState(nextAppState);
      if (onChange) {
        onChange(nextAppState);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [onChange]);

  return {
    appState,
    isForeground: appState === 'active',
    isBackground: appState === 'background',
  };
}