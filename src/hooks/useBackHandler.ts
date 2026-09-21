import { useEffect } from 'react';
import { BackHandler } from 'react-native';

/**
 * Hook xử lý nút Back cứng trên thiết bị Android
 * 
 * @param handler Hàm callback trả về `true` nếu muốn chặn hành động back mặc định, hoặc `false` nếu cho phép back tiếp
 * 
 * @example
 * // Chặn back khi đang nhập form chưa lưu:
 * useBackHandler(() => {
 *   if (hasUnsavedChanges) {
 *     Alert.alert('Chưa lưu dữ liệu', 'Bạn có chắc muốn thoát?', [
 *       { text: 'Ở lại', style: 'cancel' },
 *       { text: 'Thoát', onPress: () => navigation.goBack() }
 *     ]);
 *     return true; // Chặn back mặc định
 *   }
 *   return false; // Cho phép back bình thường
 * });
 */
export function useBackHandler(handler: () => boolean) {
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', handler);
    return () => {
      subscription.remove();
    };
  }, [handler]);
}