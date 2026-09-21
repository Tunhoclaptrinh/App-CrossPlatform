import AsyncStorage from '@react-native-async-storage/async-storage';
import { cryptoHelper } from '@/utils/crypto';

const SECURE_PREFIX = '@secure/';
const DEFAULT_SECRET = 'app_secure_salt_key_2026';

/**
 * Secure Storage Layer
 * Tự động mã hóa đối xứng chuỗi JSON trước khi ghi xuống AsyncStorage
 * và tự động giải mã khi đọc ra, bảo vệ API key, token và mật khẩu.
 */
export const secureStorage = {
  async setItem<T>(key: string, value: T, secretKey: string = DEFAULT_SECRET): Promise<void> {
    try {
      const storageKey = key.startsWith(SECURE_PREFIX) ? key : `${SECURE_PREFIX}${key}`;
      const rawJson = JSON.stringify(value);
      const encrypted = cryptoHelper.encrypt(rawJson, secretKey);
      await AsyncStorage.setItem(storageKey, encrypted);
    } catch (e) {
      console.error(`[secureStorage] Error setting ${key}:`, e);
    }
  },

  async getItem<T>(key: string, defaultValue: T | null = null, secretKey: string = DEFAULT_SECRET): Promise<T | null> {
    try {
      const storageKey = key.startsWith(SECURE_PREFIX) ? key : `${SECURE_PREFIX}${key}`;
      const encrypted = await AsyncStorage.getItem(storageKey);
      if (!encrypted) return defaultValue;

      const decrypted = cryptoHelper.decrypt(encrypted, secretKey);
      if (!decrypted) {
        console.warn(`[secureStorage] Decryption failed or tampered data for ${key}`);
        return defaultValue;
      }

      return JSON.parse(decrypted) as T;
    } catch (e) {
      console.error(`[secureStorage] Error getting ${key}:`, e);
      return defaultValue;
    }
  },

  async removeItem(key: string): Promise<void> {
    const storageKey = key.startsWith(SECURE_PREFIX) ? key : `${SECURE_PREFIX}${key}`;
    await AsyncStorage.removeItem(storageKey);
  },
};
