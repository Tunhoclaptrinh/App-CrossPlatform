import { Share, ShareContent, ShareOptions } from 'react-native';

/**
 * Universal Mobile Share Sheet Helper
 */
export const shareHelper = {
  /**
   * Mo Native Share Sheet de chia se noi dung, tin nhan, link hoac file
   */
  async share(content: ShareContent, options?: ShareOptions): Promise<boolean> {
    try {
      const result = await Share.share(content, options);
      return result.action === Share.sharedAction;
    } catch (err) {
      console.warn('[shareHelper] Error sharing content:', err);
      return false;
    }
  },

  /**
   * Chia se van ban nhanh kem tieu de
   */
  async shareText(title: string, message: string, url?: string): Promise<boolean> {
    return this.share({
      title,
      message: url ? `${message}\n${url}` : message,
      url,
    });
  },
};
