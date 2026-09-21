import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@app/auth_token',
  USER_INFO: '@app/user_info',
  THEME_MODE: '@app/theme_mode',
  AI_API_KEY: '@app/ai_api_key',
  SETTINGS: '@app/settings',
} as const;

export const appStorage = {
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(`[appStorage] Error setting ${key}:`, e);
    }
  },

  async getItem<T>(key: string, defaultValue: T | null = null): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? (JSON.parse(jsonValue) as T) : defaultValue;
    } catch (e) {
      console.error(`[appStorage] Error getting ${key}:`, e);
      return defaultValue;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error(`[appStorage] Error removing ${key}:`, e);
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error('[appStorage] Error clearing storage:', e);
    }
  },
};