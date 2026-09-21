import { Linking, Alert } from 'react-native';

/**
 * In-App & External Browser Navigation Utilities
 * Mở liên kết an toàn với cơ chế kiểm tra định dạng URL và fallback thân thiện.
 */
export const browserHelper = {
  /**
   * Mở liên kết web an toàn
   */
  async openUrl(url: string): Promise<boolean> {
    if (!url) return false;
    let target = url.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = `https://${target}`;
    }

    try {
      const supported = await Linking.canOpenURL(target);
      if (supported) {
        await Linking.openURL(target);
        return true;
      } else {
        Alert.alert('Không thể mở liên kết', `Thiết bị không hỗ trợ mở đường dẫn: ${target}`);
        return false;
      }
    } catch (error) {
      console.error('[browserHelper] Error opening URL:', target, error);
      Alert.alert('Lỗi đường dẫn', 'Không thể mở liên kết này trên trình duyệt.');
      return false;
    }
  },
};
