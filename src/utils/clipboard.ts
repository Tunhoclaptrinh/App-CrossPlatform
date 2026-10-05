import { haptics } from './haptics';

let inMemoryClipboard = '';

/**
 * Universal In-App Clipboard Helper
 * Hỗ trợ sao chép chuỗi ký tự kèm phản hồi Haptic và ghi nhớ nội dung.
 */
export const clipboardHelper = {
  /**
   * Sao chép nội dung văn bản
   */
  async setString(text: string): Promise<boolean> {
    inMemoryClipboard = text;
    haptics.light();
    return true;
  },

  /**
   * Alias ngắn gọn cho setString
   */
  async copy(text: string): Promise<boolean> {
    return this.setString(text);
  },

  /**
   * Lấy nội dung đã sao chép gần nhất
   */
  async getString(): Promise<string> {
    return inMemoryClipboard;
  },
};
